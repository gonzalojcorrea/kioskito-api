using Application.Features.Articles.Commands.RegisterArticle;
using Application.Features.Articles.Commands.UpdateArticle;
using Application.Features.Articles.Commands.DeleteArticle;
using Application.Features.Articles.Queries.GetAllArticles;
using Application.Features.Articles.Queries.GetArticleById;
using Domain.Entities;
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

    /// <summary>
    /// Obtiene todos los art�culos.
    /// </summary>
    /// <returns>Lista de art�culos.</returns>
    [HttpGet]
    [SwaggerOperation(
        Summary = "Listar art�culos",
        Description = "Recupera todos los art�culos." )]
    [SwaggerResponse(200, "Lista de art�culos", typeof(IReadOnlyList<Article>))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult<IReadOnlyList<Article>>> GetAll()
    {
        var list = await _mediator.Send(new GetAllArticlesQuery());
        return Ok(list);
    }

    /// <summary>
    /// Obtiene un art�culo por Id.
    /// </summary>
    /// <param name="id">Identificador del art�culo.</param>
    /// <returns>Art�culo correspondiente al Id proporcionado.</returns>
    [HttpGet("{id:guid}")]
    [SwaggerOperation(
        Summary = "Obtener art�culo",
        Description = "Recupera un art�culo por su identificador." )]
    [SwaggerResponse(200, "Art�culo encontrado", typeof(Article))]
    [SwaggerResponse(404, "Art�culo no encontrado", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult<Article>> GetById(Guid id)
    {
        var article = await _mediator.Send(new GetArticleByIdQuery(id));
        if (article is null) return NotFound();
        return Ok(article);
    }

    /// <summary>
    /// Actualiza un art�culo existente.
    /// </summary>
    /// <param name="id">Identificador del art�culo a actualizar.</param>
    /// <param name="cmd">Datos actualizados del art�culo.</param>
    /// <returns>Respuesta vac�a si la actualizaci�n fue exitosa.</returns>
    [HttpPut("{id:guid}")]
    [SwaggerOperation(
        Summary = "Actualizar art�culo",
        Description = "Actualiza los datos de un art�culo existente." )]
    [SwaggerResponse(204, "Art�culo actualizado correctamente")]
    [SwaggerResponse(400, "Error de validaci�n", typeof(object))]
    [SwaggerResponse(404, "Art�culo no encontrado", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult> Update(Guid id, [FromBody] UpdateArticleCommand cmd)
    {
        if (id != cmd.Id) return BadRequest("Id de ruta y comando no coinciden");
        await _mediator.Send(cmd);
        return NoContent();
    }

    /// <summary>
    /// Elimina un art�culo.
    /// </summary>
    /// <param name="id">Identificador del art�culo a eliminar.</param>
    /// <returns>Respuesta vac�a si la eliminaci�n fue exitosa.</returns>
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(
        Summary = "Eliminar art�culo",
        Description = "Elimina un art�culo por Id." )]
    [SwaggerResponse(204, "Art�culo eliminado correctamente")]
    [SwaggerResponse(404, "Art�culo no encontrado", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _mediator.Send(new DeleteArticleCommand(id));
        return NoContent();
    }
}
