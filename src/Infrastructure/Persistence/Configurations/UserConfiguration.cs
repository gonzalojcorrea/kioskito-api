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

        builder.Property(u => u.Email)
               .HasMaxLength(30)
               .IsRequired();

        builder.Property(u => u.PasswordHash)
               .HasMaxLength(200)
               .IsRequired();
    }
}
