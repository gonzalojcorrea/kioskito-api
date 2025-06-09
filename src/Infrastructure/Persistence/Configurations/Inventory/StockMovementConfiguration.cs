using Domain.Entities.Inventory;
using Domain.Entities.Inventory.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Inventory;

public class StockMovementConfiguration : IEntityTypeConfiguration<StockMovement>
{
    public void Configure(EntityTypeBuilder<StockMovement> builder)
    {

        // Primary key (inherited)
        builder.HasKey(x => x.Id);

        // FK index
        builder.HasIndex(x => x.InventoryItemId);

        builder.Property(x => x.MovementTypeEnum)
               .IsRequired();

        builder.Property(x => x.ReasonEnum)
               .IsRequired();

        builder.Property(x => x.UnitPrice)
               .HasColumnType("decimal(18,2)")
               .IsRequired();

        builder.Property(x => x.Quantity)
               .IsRequired();

        builder.Property(x => x.MovementDate)
               .IsRequired();

        builder.Property(x => x.Reference)
               .HasMaxLength(100);

        builder.Property(x => x.ReferenceDocumentId)
               .IsRequired(false);
    }
}
