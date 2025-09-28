namespace Domain.Enums;

public enum InventoryStatus
{
    ACTIVE = 1,     // Se puede vender / usar
    INACTIVE,   // No disponible para ventas
    OUT_OF_STOCK // Sin stock
}
