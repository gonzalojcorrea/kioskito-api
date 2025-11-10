using System.ComponentModel;

namespace Domain.Enums;

public enum ConsignmentStatus
{
    [Description("Abierta")]
    OPEN = 1,

    [Description("Cerrada")]
    CLOSED,

    [Description("Cancelada")]
    CANCELLED
}