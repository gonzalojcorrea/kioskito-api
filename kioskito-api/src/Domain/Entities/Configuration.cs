/// <summary>
/// Stores global system configuration values such as company name and main address.
/// </summary>
/// <remarks>
/// This entity is used to persist application-wide settings that can be consumed by both 
/// backend services and the client application. The stored address is typically used 
/// for geolocation, mapping, or reference purposes in the frontend.
/// </remarks>

namespace Domain.Entities
{
    public class Configuration : BaseEntity
    {
        public string CompanyName { get; set; } = default!;
        public string Address { get; set; } = default!;
    }
}
