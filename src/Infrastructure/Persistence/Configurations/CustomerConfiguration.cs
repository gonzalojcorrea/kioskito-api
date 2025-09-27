using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// Configuration for the Customer entity.
/// </summary>
public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        // Primary key
        builder.HasKey(c => c.Id);

        builder.Property(c => c.Name)
               .HasMaxLength(80)
               .IsRequired();

        builder.Property(c => c.Email)
               .HasMaxLength(100)
               .IsRequired();

        builder.Property(c => c.Phone)
               .HasMaxLength(30)
               .IsRequired();

        builder.Property(c => c.Address)
               .HasMaxLength(150)
               .IsRequired();

        builder.HasMany(c => c.Sales)
               .WithOne(s => s.Customer)
               .HasForeignKey(s => s.CustomerId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
