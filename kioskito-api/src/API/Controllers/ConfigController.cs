using Application.Features.Configuration.Common;
using Application.Features.Configuration.Queries.GetConfiguration;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

/// <summary>
/// Endpoints para obtener la configuración general del sistema.
/// </summary>
[ApiController]
[Route("api/config")]
[AllowAnonymous]
public class ConfigController : ControllerBase
{
    private readonly IMediator _mediator;
    public ConfigController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Obtiene la configuración general (nombre de empresa y dirección).
    /// </summary>
    [HttpGet]
    [SwaggerOperation(
        Summary = "Obtener configuración",
        Description = "Devuelve la configuración global (nombre de empresa y dirección base)."
    )]
    [SwaggerResponse(200, "Configuración del sistema", typeof(ConfigurationResponse))]
    [SwaggerResponse(404, "No existe configuración registrada")]
    [SwaggerResponse(500, "Error interno")]
    public async Task<ActionResult<ConfigurationResponse>> Get()
    {
        var result = await _mediator.Send(new GetConfigurationQuery());
        return Ok(result);
    }
}
