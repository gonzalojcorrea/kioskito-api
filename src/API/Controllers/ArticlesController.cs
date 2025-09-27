using Application.Features.Articles.Commands.RegisterArticle;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

/// <summary>
/// Controller for managing articles.
/// </summary>
[ApiController]
[Route("api/articles")]
[Authorize]
public class ArticlesController : ControllerBase
{
    private readonly IMediator _mediator;
    public ArticlesController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Crea un nuevo artículo.
    /// </summary>
    /// <param name="cmd">Datos del artículo.</param>
    /// <returns>Id del artículo creado.</returns>
    [HttpPost]
    [SwaggerOperation(
        Summary = "Registrar artículo",
        Description = "Crea un nuevo artículo en el sistema." )]
    [SwaggerResponse(200, "Artículo creado correctamente", typeof(Guid))]
    [SwaggerResponse(400, "Error de validación", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult<Guid>> Register([FromBody] RegisterArticleCommand cmd)
    {
        var id = await _mediator.Send(cmd);
        return Ok(id);
    }
}
