namespace Domain.Enums;

public enum TransactionType
{
    PURCHASE = 1,   // Compra (entrada de stock)
    SALE,           // Venta (salida de stock)
    RETURN,         // Devolución de cliente
    ADJUSTMENT,     // Ajuste manual de stock
    CONSIGNMENT_OUT // Salida hacia consignación
}
