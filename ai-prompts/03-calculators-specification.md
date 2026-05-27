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

## 3. VAT then add percentage (`vat-then-add-percentage`)

**File:** `vatThenAdditional.ts` / `VatThenAdditionalCalculator.tsx` (operation `add`)

Matches invoice-style flow: base → VAT → extra % **on subtotal** → grand total.

| Input | Output |
|-------|--------|
| Base amount | VAT amount, subtotal, additional amount, grand total |
| Additional % (on subtotal) | |

Uses **VAT % from settings**.

**Formula:**

```
vat_amount = base × VAT / 100
sub_total = base + vat_amount
additional_amount = sub_total × additional_percentage / 100
grand_total = sub_total + additional_amount
```

**Example (18% VAT, 10% add):** base 289,725 → VAT 52,150.50 → subtotal 341,875.50 → +10% 34,187.55 → **376,063.05**

---

## 4. VAT then subtract percentage (`vat-then-subtract-percentage`)

Tab label: **VAT − subtract %**

**File:** `vatThenAdditional.ts` / `VatThenAdditionalCalculator.tsx` (operation `subtract`)

Same as above, but the extra percentage is **subtracted** from the subtotal.

**Formula:**

```
vat_amount = base × VAT / 100
sub_total = base + vat_amount
reduction_amount = sub_total × additional_percentage / 100
grand_total = sub_total - reduction_amount
```

---

## 5. Tax invoice (`tax-invoice`)

**File:** `taxInvoice.ts` / `TaxInvoiceCalculator.tsx`

Supply invoice flow (e.g. office cupboard): Qty × Rate, +VAT, −retention % on subtotal.

| Input | Output |
|-------|--------|
| Quantity | Amount, VAT, subtotal, retention, grand total |
| Rate (Rs.) | |
| Retention % | |

Uses **VAT % from settings**.

**Formula:**

```
amount = qty × rate
vat_amount = amount × VAT / 100
sub_total = amount + vat_amount
retention = sub_total × retention% / 100
grand_total = sub_total - retention
```

**Excel column B (example):** B1=1, B2=211735, B3==B1*B2, B4=18, B5==B3*B4/100, B6==B3+B5, B7=2.5, B8==B6*B7/100, B9==B6-B8 → 243601.12

---

## 6. Discount with VAT (`discount-with-vat`)

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

## 7. Discount without VAT (`discount-without-vat`)

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

## 8. Delivery / fuel cost (`fuel-cost`)

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
