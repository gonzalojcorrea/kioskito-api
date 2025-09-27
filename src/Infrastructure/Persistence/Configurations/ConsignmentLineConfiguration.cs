using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ConsignmentLineConfiguration : IEntityTypeConfiguration<ConsignmentLine>
{
    public void Configure(EntityTypeBuilder<ConsignmentLine> builder)
    {
        builder.HasKey(cl => cl.Id);

        builder.Property(cl => cl.ConsignmentId)
               .IsRequired();

        builder.Property(cl => cl.ArticleId)
               .IsRequired();

        builder.Property(cl => cl.DeliveredQty)
               .IsRequired();

        builder.Property(cl => cl.ReturnedQty)
               .IsRequired();

        builder.Property(cl => cl.SoldQty)
               .IsRequired();

        builder.Property(cl => cl.UnitPrice)
               .HasPrecision(18,2)
               .IsRequired();

        builder.Property(cl => cl.LineTotal)
               .HasPrecision(18,2)
               .IsRequired();

        builder.HasMany(cl => cl.Transactions)
               .WithOne(t => t.ConsignmentLine)
               .HasForeignKey(t => t.ConsignmentLineId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
