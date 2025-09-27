using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// Configuration for the Transaction entity.
/// </summary>
public class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        // Primary key
        builder.HasKey(t => t.Id);

        builder.Property(t => t.InventoryId)
               .IsRequired();

        builder.Property(t => t.UserId)
               .IsRequired();

        builder.Property(t => t.Type)
               .IsRequired();

        builder.Property(t => t.Quantity)
               .IsRequired();

        builder.Property(t => t.Date)
               .IsRequired();

        builder.Property(t => t.UnitCost)
               .HasPrecision(18,2)
               .IsRequired();

        builder.Property(t => t.Note)
               .HasMaxLength(250);

        // Relationships
        builder.HasOne(t => t.Inventory)
               .WithMany(i => i.Transactions)
               .HasForeignKey(t => t.InventoryId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(t => t.User)
               .WithMany(u => u.InventoryTransactions)
               .HasForeignKey(t => t.UserId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
