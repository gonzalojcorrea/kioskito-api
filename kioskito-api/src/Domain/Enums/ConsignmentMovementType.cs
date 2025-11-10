using System.ComponentModel;

namespace Domain.Enums;

public enum ConsignmentMovementType
{
    [Description("Entrega")]
    DELIVERY = 1, // Entrega al kiosko
    
    [Description("Venta")]
    SALE,         // Venta realizada
    
    [Description("Devolución")]
    RETURN        // Devolución del kiosko
}
