using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// Configuration for the User entity.
/// </summary>
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        // Primary key (inherited)
        builder.HasKey(u => u.Id);

        builder.Property(u => u.Name)
               .HasMaxLength(30)
               .IsRequired();

        builder.Property(u => u.LastName)
               .HasMaxLength(30)
               .IsRequired();

        builder.Property(u => u.Email)
               .HasMaxLength(30)
               .IsRequired();

        builder.Property(u => u.PasswordHash)
               .HasMaxLength(200)
               .IsRequired();

        builder.Property(u => u.RoleId)
               .IsRequired(false);

        // Relationship: User belongs to one Role, Role has many Users
        builder.HasOne(u => u.Role)
               .WithMany(r => r.Users)
               .HasForeignKey(u => u.RoleId)
               .OnDelete(DeleteBehavior.SetNull);

        // Relationship: User has many ConsignmetTransactions
        builder.HasMany(u => u.ConsignmetTransactions)
               .WithOne(ct => ct.User)
               .HasForeignKey(ct => ct.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        // Relationship: User has many Inventory Transactions
        builder.HasMany(u => u.InventoryTransactions)
               .WithOne(t => t.User)
               .HasForeignKey(t => t.UserId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
