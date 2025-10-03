export interface TableColumn {
    field: string;
    header: string;
    type?: 'text' | 'number' | 'boolean' | 'status' | 'date' | 'currency';
  }