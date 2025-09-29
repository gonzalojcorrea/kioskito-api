namespace Domain.Enums;

public enum SalesOrderStatus
{
    PENDING = 1,    // Orden creada, aún no liquidada
    PAID,       // Orden liquidada y pagada
    CANCELLED   // Orden anulada
}
