export interface Consignment {
  consignmentId: string;
  customerId: string;
  customerName: string;
  startDate: string;
  endDate?: string | null;
  status: string;
  total: number;
  totalLines: number;
}

export interface ConsignmentLine {
  lineId: string;
  articleId: string;
  articleName: string;
  articleSku?: string | null;
  deliveredQty: number;
  returnedQty: number;
  soldQty: number;
  unitPrice: number;
  lineTotal: number;
}

export interface ConsignmentDetail {
  consignmentId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate?: string | null;
  status: string;
  total: number;
  lines: ConsignmentLine[];
}

export interface CreateConsignmentLine {
  articleId: string;
  deliveredQty: number;
  unitPrice: number;
}

export interface CreateConsignmentCommand {
  customerId: string;
  lines: CreateConsignmentLine[];
}

// Mantener esta para retrocompatibilidad si es necesaria
export interface CreateConsignmentRequest {
  customerId: string;
  items: CreateConsignmentItem[];
  notes?: string;
}

export interface CreateConsignmentItem {
  articleId: string;
  quantity: number;
  consignmentPrice: number;
}
