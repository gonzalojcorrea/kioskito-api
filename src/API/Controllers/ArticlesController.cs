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
    /// Crea un nuevo art�culo.
    /// </summary>
    /// <param name="cmd">Datos del art�culo.</param>
    /// <returns>Id del art�culo creado.</returns>
    [HttpPost]
    [SwaggerOperation(
        Summary = "Registrar art�culo",
        Description = "Crea un nuevo art�culo en el sistema." )]
    [SwaggerResponse(200, "Art�culo creado correctamente", typeof(Guid))]
    [SwaggerResponse(400, "Error de validaci�n", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult<Guid>> Register([FromBody] RegisterArticleCommand cmd)
    {
        var id = await _mediator.Send(cmd);
        return Ok(id);
    }
}
