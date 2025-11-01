export interface Article {
    id: string;
    name: string;
    description?: string;
    sku?: string;
    salePrice?: number;
    consignmentPrice?: number;
    lastPurchasePrice: number;
    initialQuantity: number;
    minStock: number;
    status: boolean;
}  