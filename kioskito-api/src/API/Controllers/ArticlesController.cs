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

    /// <summary>
    /// Obtiene todos los artículos.
    /// </summary>
    /// <returns>Lista de artículos.</returns>
    [HttpGet]
    [SwaggerOperation(
        Summary = "Listar artículos",
        Description = "Recupera todos los artículos." )]
    [SwaggerResponse(200, "Lista de artículos", typeof(IReadOnlyList<Article>))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult<IReadOnlyList<Article>>> GetAll()
    {
        var list = await _mediator.Send(new GetAllArticlesQuery());
        return Ok(list);
    }

    /// <summary>
    /// Obtiene un artículo por Id.
    /// </summary>
    /// <param name="id">Identificador del artículo.</param>
    /// <returns>Artículo correspondiente al Id proporcionado.</returns>
    [HttpGet("{id:guid}")]
    [SwaggerOperation(
        Summary = "Obtener artículo",
        Description = "Recupera un artículo por su identificador." )]
    [SwaggerResponse(200, "Artículo encontrado", typeof(Article))]
    [SwaggerResponse(404, "Artículo no encontrado", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult<Article>> GetById(Guid id)
    {
        var article = await _mediator.Send(new GetArticleByIdQuery(id));
        if (article is null) return NotFound();
        return Ok(article);
    }

    /// <summary>
    /// Actualiza un artículo existente.
    /// </summary>
    /// <param name="id">Identificador del artículo a actualizar.</param>
    /// <param name="cmd">Datos actualizados del artículo.</param>
    /// <returns>Respuesta vacía si la actualización fue exitosa.</returns>
    [HttpPut("{id:guid}")]
    [SwaggerOperation(
        Summary = "Actualizar artículo",
        Description = "Actualiza los datos de un artículo existente." )]
    [SwaggerResponse(204, "Artículo actualizado correctamente")]
    [SwaggerResponse(400, "Error de validación", typeof(object))]
    [SwaggerResponse(404, "Artículo no encontrado", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult> Update(Guid id, [FromBody] UpdateArticleCommand cmd)
    {
        if (id != cmd.Id) return BadRequest("Id de ruta y comando no coinciden");
        await _mediator.Send(cmd);
        return NoContent();
    }

    /// <summary>
    /// Elimina un artículo.
    /// </summary>
    /// <param name="id">Identificador del artículo a eliminar.</param>
    /// <returns>Respuesta vacía si la eliminación fue exitosa.</returns>
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(
        Summary = "Eliminar artículo",
        Description = "Elimina un artículo por Id." )]
    [SwaggerResponse(204, "Artículo eliminado correctamente")]
    [SwaggerResponse(404, "Artículo no encontrado", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _mediator.Send(new DeleteArticleCommand(id));
        return NoContent();
    }
}
