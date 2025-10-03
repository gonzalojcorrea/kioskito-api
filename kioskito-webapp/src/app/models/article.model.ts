export interface Article {
    id: string;
    name: string;
    description?: string;
    sku?: string;
    salePrice?: number;
    consignmentPrice?: number;
    isActive: boolean;
}  