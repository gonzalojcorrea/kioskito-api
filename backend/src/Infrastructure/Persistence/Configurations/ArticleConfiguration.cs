using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// Configuration for the Article entity.
/// </summary>
public class ArticleConfiguration : IEntityTypeConfiguration<Article>
{
    public void Configure(EntityTypeBuilder<Article> builder)
    {
        // Primary key
        builder.HasKey(a => a.Id);

        builder.Property(a => a.Name)
               .HasMaxLength(80)
               .IsRequired();

        builder.Property(a => a.Description)
               .HasMaxLength(250);

        builder.Property(a => a.Sku)
               .HasMaxLength(40);

        builder.Property(a => a.SalePrice)
               .HasPrecision(18,2);

        builder.Property(a => a.ConsignmentPrice)
               .HasPrecision(18,2);

        // Relationships
        builder.HasMany(a => a.Inventories)
               .WithOne(i => i.Article)
               .HasForeignKey(i => i.ArticleId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(a => a.ConsignmentLines)
               .WithOne(cl => cl.Article)
               .HasForeignKey(cl => cl.ArticleId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
