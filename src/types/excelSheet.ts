export type ExcelCellKind = 'label' | 'input' | 'formula' | 'result';

export type ExcelCell = {
  ref: string;
  content: string;
  kind: ExcelCellKind;
};

export type ExcelSheet = {
  intro: string;
  columns: [string, string, string];
  rows: ExcelCell[][];
  tip?: string;
};
