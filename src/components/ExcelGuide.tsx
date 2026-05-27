import type { ExcelGuide as ExcelGuideData } from '../constants/excelExamples';

type ExcelGuideProps = {
  guide: ExcelGuideData;
};

export function ExcelGuide({ guide }: ExcelGuideProps) {
  return (
    <div className="excel-guide">
      <h3 className="excel-guide__title">Excel example</h3>
      <p className="excel-guide__intro">{guide.intro}</p>
      <div className="excel-guide__table-wrap">
        <table className="excel-guide__table">
          <thead>
            <tr>
              <th scope="col">Row</th>
              <th scope="col">What</th>
              <th scope="col">Cell</th>
              <th scope="col">Enter in Excel</th>
            </tr>
          </thead>
          <tbody>
            {guide.rows.map((line) => (
              <tr
                key={line.row}
                className={
                  line.highlight ? 'excel-guide__row--highlight' : undefined
                }
              >
                <td>{line.row}</td>
                <td>{line.label}</td>
                <td>
                  <code className="excel-guide__cell">{line.cell}</code>
                </td>
                <td>
                  <code
                    className={
                      line.isFormula
                        ? 'excel-guide__formula'
                        : 'excel-guide__value'
                    }
                  >
                    {line.entry}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {guide.tip ? <p className="excel-guide__tip">{guide.tip}</p> : null}
    </div>
  );
}
