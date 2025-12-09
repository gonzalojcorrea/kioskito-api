/**
 * Modelos para el sistema de cierre de consignaciones
 */

// ===== RESPONSE MODELS (desde el backend) =====

export interface CustomerWithActiveConsignments {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  activeConsignments: ActiveConsignmentSummary[];
}

export interface ActiveConsignmentSummary {
  consignmentId: string;
  startDate: string; // ISO 8601
  total: number;
  totalItems: number;
  totalQuantityDelivered: number;
}

export interface ConsignmentClosureDetail {
  consignmentId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  startDate: string;
  currentTotal: number;
  lines: ConsignmentLineClosureDto[];
  summary: ConsignmentClosureSummary;
}

export interface ConsignmentLineClosureDto {
  lineId: string;
  articleId: string;
  articleName: string;
  articleCode: string; // SKU
  deliveredQty: number;
  currentSoldQty: number;
  currentReturnedQty: number;
  pendingQty: number; // deliveredQty - soldQty - returnedQty
  unitPrice: number;
  lineTotal: number;
}

export interface ConsignmentClosureSummary {
  totalDelivered: number;
  totalSold: number;
  totalReturned: number;
  totalPending: number;
  totalSalesAmount: number;
}

// ===== COMMAND MODELS (hacia el backend) =====

export interface CloseConsignmentCommand {
  consignmentId: string;
  lines: CloseConsignmentLineDto[];
  createNewConsignmentForPending: boolean;
  notes?: string;
}

export interface CloseConsignmentLineDto {
  lineId: string;
  soldQty: number;
  returnedQty: number;
}

export interface CloseConsignmentResponse {
  closedConsignmentId: string;
  salesOrderId?: string;
  newConsignmentId?: string;
  totalSalesAmount: number;
  totalItemsSold: number;
  totalItemsReturned: number;
  totalItemsMovedToNewConsignment: number;
  message: string;
}

// ===== UI MODELS (para el formulario) =====

export interface ConsignmentLineFormData extends ConsignmentLineClosureDto {
  soldQtyInput: number;
  returnedQtyInput: number;
  hasError: boolean;
  errorMessage?: string;
  subtotalSold: number;
}
