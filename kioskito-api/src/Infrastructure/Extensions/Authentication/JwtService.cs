using Application.Interfaces;
using Domain.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Configurations.Authentication;

/// <summary>
/// Generates JWT tokens for users.
/// </summary>
public class JwtService : IJwtService
{
    private readonly JwtSettings _settings;
    private readonly SigningCredentials _signingCredentials;

    /// <summary>
    /// Constructor for JwtTokenGenerator.
    /// </summary>
    /// <param name="options"></param>
    public JwtService(IOptions<JwtSettings> options)
    {
        _settings = options.Value;
        
        // Decodificar la clave desde Base64 o usar UTF8 si no es Base64
        byte[] keyBytes;
        try
        {
            keyBytes = Convert.FromBase64String(_settings.SecretKey);
        }
        catch
        {
            // Si no es Base64, usar UTF8 (debe tener al menos 32 caracteres para HS256)
            keyBytes = Encoding.UTF8.GetBytes(_settings.SecretKey);
        }
        
        var key = new SymmetricSecurityKey(keyBytes);
        _signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    }

    /// <summary>
    /// Generates a JWT token for the given user.
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    public string GenerateToken(User user)
    {
        var now = DateTime.UtcNow;
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Email),
            new Claim(ClaimTypes.Role, user.Role.Name)
        };

        var jwt = new JwtSecurityToken(
            issuer: _settings.Issuer,
            audience: _settings.Audience,
            claims: claims,
            notBefore: now,
            expires: now.AddMinutes(_settings.ExpiresInMinutes),
            signingCredentials: _signingCredentials);

        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }
}
