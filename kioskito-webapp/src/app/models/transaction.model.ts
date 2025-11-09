export interface Transaction {
  transactionId: string;
  inventoryId: string;
  userId: string;
  userName: string;
  transactionType: string;
  quantity: number;
  date: string;
  note?: string;
  unitCost: number;
}
