using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class ConsignmetTransactionConfiguration : IEntityTypeConfiguration<ConsignmetTransaction>
{
    public void Configure(EntityTypeBuilder<ConsignmetTransaction> builder)
    {
        builder.HasKey(ct => ct.Id);

        builder.Property(ct => ct.ConsignmentLineId)
               .IsRequired();

        builder.Property(ct => ct.UserId)
               .IsRequired();

        builder.Property(ct => ct.MovementType)
               .IsRequired();

        builder.Property(ct => ct.Quantity)
               .IsRequired();

        builder.Property(ct => ct.Date)
               .IsRequired();
    }
}
