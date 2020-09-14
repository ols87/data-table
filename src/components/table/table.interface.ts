export interface TableColumnInterface {
  label: string;
  map: string;
}

export interface TableRowInterface {
  id: number;
  [key: string]: any;
}

export interface TableActionsInterface {
  edit?: Function;
  delete?: Function;
}

export interface TableDataInterface {
  columns: Array<TableColumnInterface>;
  rows: Array<TableRowInterface>;
  actions?: TableActionsInterface;
}
