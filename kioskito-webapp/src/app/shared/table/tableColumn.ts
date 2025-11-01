export interface TableColumn {
    field: string;
    header: string;
    type?: 'text' | 'number' | 'boolean' | 'status' | 'date' | 'currency' | 'stock-bar';
    minStockField?: string; // Campo para el stock mínimo (usado en tipo 'stock-bar')
  }

  export interface TableAction {
    action: string;             
    label?: string;              
    icon?: string;               
    type?: ActionDefault;
  }
  
  export enum ActionDefault{
    View = 1,
    Edit = 2,
    Delete = 3
  }
  