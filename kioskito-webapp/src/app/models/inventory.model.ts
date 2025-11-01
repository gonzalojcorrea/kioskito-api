export interface Inventory {
  inventoryId: string;
  articleId: string;
  sku?: string;
  articleName: string;
  lastPurchasePrice: number;
  salePrice?: number;
  consignmentPrice?: number;
  quantity: number;
  status: string;
}
