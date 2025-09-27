using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// Configuration for the SalesOrder entity.
/// </summary>
public class SalesOrderConfiguration : IEntityTypeConfiguration<SalesOrder>
{
    public void Configure(EntityTypeBuilder<SalesOrder> builder)
    {
        // Primary key
        builder.HasKey(so => so.Id);

        builder.Property(so => so.CustomerId)
               .IsRequired();

        builder.Property(so => so.ConsignmentId)
               .IsRequired();

        builder.Property(so => so.OrderDate)
               .IsRequired();

        builder.Property(so => so.Total)
               .HasPrecision(18,2)
               .IsRequired();

        builder.Property(so => so.Status)
               .IsRequired();

        builder.HasMany(so => so.Items)
               .WithOne(i => i.SalesOrder)
               .HasForeignKey(i => i.SalesOrderId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
