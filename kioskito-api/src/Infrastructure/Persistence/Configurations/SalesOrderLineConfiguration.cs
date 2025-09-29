using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// Configuration for the SalesOrderLine entity.
/// </summary>
public class SalesOrderLineConfiguration : IEntityTypeConfiguration<SalesOrderLine>
{
    public void Configure(EntityTypeBuilder<SalesOrderLine> builder)
    {
        // Primary key
        builder.HasKey(sol => sol.Id);

        builder.Property(sol => sol.SalesOrderId)
               .IsRequired();

        builder.Property(sol => sol.ArticleId)
               .IsRequired();

        builder.Property(sol => sol.Quantity)
               .IsRequired();

        builder.Property(sol => sol.SalePrice)
               .HasPrecision(18,2)
               .IsRequired();

        builder.Property(sol => sol.LineTotal)
               .HasPrecision(18,2)
               .IsRequired();
    }
}
