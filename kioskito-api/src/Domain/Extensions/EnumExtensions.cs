using System.ComponentModel;
using System.Reflection;

namespace Domain.Extensions;

/// <summary>
/// Extension methods for Enum types.
/// </summary>
public static class EnumExtensions
{
    /// <summary>
    /// Gets the description attribute value of an enum value.
    /// </summary>
    /// <param name="value">The enum value.</param>
    /// <returns>The description if available, otherwise the enum name.</returns>
    public static string GetDescription(this Enum value)
    {
        var field = value.GetType().GetField(value.ToString());
        if (field == null)
            return value.ToString();

        var attribute = field.GetCustomAttribute<DescriptionAttribute>();
        return attribute?.Description ?? value.ToString();
    }
}
