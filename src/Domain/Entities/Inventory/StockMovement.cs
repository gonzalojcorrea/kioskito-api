using Domain.Entities.Inventory.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Inventory;

/// <summary>
/// Record of each stock change.
/// </summary>
public class StockMovement : BaseEntity
{
    public Guid InventoryItemId { get; set; }
    public MovementType MovementTypeEnum { get; set; }
    public MovementReason ReasonEnum { get; set; }
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public DateTime MovementDate { get; set; }
    public string? Reference { get; set; }
    public Guid? ReferenceDocumentId { get; set; }

    // Navigation properties
    public InventoryItem InventoryItem { get; set; }
}
