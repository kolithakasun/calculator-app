# Calculators specification (current behavior)

All monetary outputs use `formatCurrency`. Distances use `formatDistanceKm` where relevant.

## Global settings

| Key | Default | UI location |
|-----|---------|-------------|
| `vatPercentage` | 18 | Settings panel |
| `freeDeliveryDistanceKm` | 15 | Settings panel |

---

## 1. Percentage value (`percentage-value`)

**File:** `percentageValue.ts` / `PercentageValueCalculator.tsx`

| Input | Output |
|-------|--------|
| Base value | Percentage value |
| Percentage (%) | |

**Formula:**

```
percentage_value = base_value × percentage / 100
```

---

## 2. Price before VAT (`base-from-vat`)

**File:** `baseFromVatInclusive.ts` / `BaseFromVatCalculator.tsx`

| Input | Output |
|-------|--------|
| Total including VAT | Base value (before VAT), VAT amount |

Uses **VAT % from settings**.

**Formula:**

```
base = total / (1 + VAT / 100)
vat_amount = total - base
```

---

## 3. Discount with VAT (`discount-with-vat`)

**File:** `discountWithVat.ts` / `DiscountWithVatCalculator.tsx`

Discount applied to the **VAT-inclusive** total.

| Input | Output |
|-------|--------|
| Total including VAT | Discount amount, final price after discount |
| Discount (%) | |

**Formula:**

```
discount = total_with_vat × discount_percentage / 100
final_value = total_with_vat - discount
```

---

## 4. Discount without VAT (`discount-without-vat`)

**File:** `discountWithoutVat.ts` / `DiscountWithoutVatCalculator.tsx`

Discount on amount **before** VAT; VAT recalculated on discounted base.

| Input | Output |
|-------|--------|
| Total without VAT | Discount amount, discounted base, VAT amount, final with VAT |
| Discount (%) | |

Uses **VAT % from settings**.

**Formula:**

```
discount = total_without_vat × discount_percentage / 100
discounted_base = total_without_vat - discount
vat_amount = discounted_base × VAT / 100
final_value = discounted_base + vat_amount
```

---

## 5. Delivery / fuel cost (`fuel-cost`)

**File:** `fuelCost.ts` / `FuelCostCalculator.tsx`

Uses **free delivery distance (km) from settings**.

| Input | Label in UI |
|-------|-------------|
| Total distance (km) | |
| Fuel price | **Fuel price per km** (not per liter) |

| Output | |
|--------|--|
| Chargeable distance | km beyond free threshold |
| Transport cost | currency |

**Formula:**

```
chargeable_distance = max(total_distance - free_delivery_distance, 0)
transport_cost = chargeable_distance × fuel_price_per_km
```

**Important:** UI and parameter names say **per km**. Do not revert to “per liter” unless the product owner explicitly requests it.

---

## UI copy rules

- Tab labels and descriptions: `src/constants/calculators.ts`
- Per-calculator title, description, formula: each `*Calculator.tsx` `Card` props
- Sample placeholders: e.g. `10000`, `15`, `25`, `50` (fuel per km)
- Percentage fields: max 100% validation message when exceeded
