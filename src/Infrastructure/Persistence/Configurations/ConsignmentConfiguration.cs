using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ConsignmentConfiguration : IEntityTypeConfiguration<Consignment>
{
    public void Configure(EntityTypeBuilder<Consignment> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.CustomerId)
               .IsRequired();

        builder.Property(c => c.StartDate)
               .IsRequired();

        builder.Property(c => c.Status)
               .HasConversion<int>()
               .IsRequired();

        builder.Property(c => c.Total)
               .HasPrecision(18,2)
               .IsRequired();

        builder.HasMany(c => c.Lines)
               .WithOne(l => l.Consignment)
               .HasForeignKey(l => l.ConsignmentId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
