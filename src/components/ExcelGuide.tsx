import type { ExcelSheet } from '../types/excelSheet';

type ExcelGuideProps = {
  sheet: ExcelSheet;
};

export function ExcelGuide({ sheet }: ExcelGuideProps) {
  const maxCol = sheet.columns.length;

  return (
    <div className="excel-guide">
      <h3 className="excel-guide__title">Your Excel sheet (copy column B)</h3>
      <p className="excel-guide__intro">{sheet.intro}</p>
      <div className="excel-guide__grid-wrap">
        <table className="excel-guide__grid" aria-label="Excel layout">
          <thead>
            <tr>
              <th scope="col" className="excel-guide__corner" />
              {sheet.columns.map((heading) => (
                <th key={heading} scope="col">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sheet.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th scope="row" className="excel-guide__row-num">
                  {rowIndex + 1}
                </th>
                {row.slice(0, maxCol).map((cell) => (
                  <td
                    key={cell.ref}
                    className={`excel-guide__cell excel-guide__cell--${cell.kind}`}
                  >
                    <span className="excel-guide__ref">{cell.ref}</span>
                    <code
                      className={
                        cell.kind === 'formula'
                          ? 'excel-guide__formula'
                          : 'excel-guide__content'
                      }
                    >
                      {cell.content.trim() || ' '}
                    </code>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sheet.tip ? <p className="excel-guide__tip">{sheet.tip}</p> : null}
      <p className="excel-guide__hint">
        <strong>How to use:</strong> Open Excel → use column B for each row (e.g.
        B1, B2…). Type numbers as shown. For formulas, copy the text starting with{' '}
        <code>=</code> into that cell. Column C shows what you should get if it
        matches this calculator.
      </p>
    </div>
  );
}
