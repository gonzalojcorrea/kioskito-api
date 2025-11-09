using System.ComponentModel;

namespace Domain.Enums;

public enum TransactionType
{
    [Description("Compra")]
    PURCHASE = 1,
    
    [Description("Venta")]
    SALE,
    
    [Description("Devolución")]
    RETURN,
    
    [Description("Ajuste")]
    ADJUSTMENT,
    
    [Description("Salida a Consignación")]
    CONSIGNMENT_OUT
}
