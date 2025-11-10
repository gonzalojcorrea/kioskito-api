using Application.Common.Models;
using Application.Features.Consignments.Commands.CreateConsignment;
using Application.Features.Consignments.Commands.DeleteConsignment;
using Application.Features.Consignments.Commands.UpdateConsignment;
using Application.Features.Consignments.Common;
using Application.Features.Consignments.Queries.GetAllConsignments;
using Application.Features.Consignments.Queries.GetConsignmentById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

/// <summary>
/// Controller for consignment management.
/// </summary>
[ApiController]
[Route("api/consignments")]
[AllowAnonymous]
public class ConsignmentsController : ControllerBase
{
    private readonly IMediator _mediator;
    
    public ConsignmentsController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Obtiene todas las consignaciones con información resumida.
    /// </summary>
    /// <returns>Listado de consignaciones.</returns>
    [HttpGet]
    [SwaggerOperation(
        Summary = "Listar consignaciones",
        Description = "Obtiene todas las consignaciones del sistema con información resumida."
    )]
    [SwaggerResponse(200, "Listado de consignaciones", typeof(IReadOnlyList<ConsignmentResponse>))]
    [SwaggerResponse(500, "Error interno", typeof(ErrorResponse))]
    public async Task<ActionResult<IReadOnlyList<ConsignmentResponse>>> GetAll()
    {
        var list = await _mediator.Send(new GetAllConsignmentsQuery());
        return Ok(list);
    }

    /// <summary>
    /// Obtiene el detalle completo de una consignación por su ID.
    /// </summary>
    /// <param name="id">Identificador de la consignación.</param>
    /// <returns>Detalle de la consignación con todas sus líneas.</returns>
    [HttpGet("{id:guid}")]
    [SwaggerOperation(
        Summary = "Obtener detalle de consignación",
        Description = "Recupera el detalle completo de una consignación específica por su identificador, incluyendo todas sus líneas."
    )]
    [SwaggerResponse(200, "Detalle de la consignación", typeof(ConsignmentDetailResponse))]
    [SwaggerResponse(404, "Consignación no encontrada", typeof(ErrorResponse))]
    [SwaggerResponse(500, "Error interno", typeof(ErrorResponse))]
    public async Task<ActionResult<ConsignmentDetailResponse>> GetById(Guid id)
    {
        var consignment = await _mediator.Send(new GetConsignmentByIdQuery(id));
        return Ok(consignment);
    }

    /// <summary>
    /// Crea una nueva consignación con sus líneas.
    /// </summary>
    /// <param name="command">Datos de la consignación a crear.</param>
    /// <returns>ID de la consignación creada.</returns>
    [HttpPost]
    [SwaggerOperation(
        Summary = "Crear consignación",
        Description = "Crea una nueva consignación con las líneas especificadas."
    )]
    [SwaggerResponse(201, "Consignación creada exitosamente", typeof(SuccessResponse<Guid>))]
    [SwaggerResponse(400, "Error de validación", typeof(ErrorResponse))]
    [SwaggerResponse(404, "Cliente o artículo no encontrado", typeof(ErrorResponse))]
    [SwaggerResponse(500, "Error interno", typeof(ErrorResponse))]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateConsignmentCommand command)
    {
        var consignmentId = await _mediator.Send(command);
        return Ok(consignmentId);
    }

    /// <summary>
    /// Actualiza una consignación existente.
    /// </summary>
    /// <param name="id">Identificador de la consignación a actualizar.</param>
    /// <param name="command">Datos actualizados de la consignación.</param>
    /// <returns>Respuesta vacía si la actualización fue exitosa.</returns>
    [HttpPut("{id:guid}")]
    [SwaggerOperation(
        Summary = "Actualizar consignación",
        Description = "Actualiza el estado y fecha de fin de una consignación existente."
    )]
    [SwaggerResponse(204, "Consignación actualizada correctamente")]
    [SwaggerResponse(400, "Error de validación o ID de ruta no coincide", typeof(ErrorResponse))]
    [SwaggerResponse(404, "Consignación no encontrada", typeof(ErrorResponse))]
    [SwaggerResponse(500, "Error interno", typeof(ErrorResponse))]
    public async Task<ActionResult> Update(Guid id, [FromBody] UpdateConsignmentCommand command)
    {
        if (id != command.ConsignmentId)
            throw new BadHttpRequestException("Id de ruta y comando no coinciden", 400);

        await _mediator.Send(command);
        return NoContent();
    }

    /// <summary>
    /// Elimina una consignación.
    /// </summary>
    /// <param name="id">Identificador de la consignación a eliminar.</param>
    /// <returns>Respuesta vacía si la eliminación fue exitosa.</returns>
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(
        Summary = "Eliminar consignación",
        Description = "Elimina una consignación por su ID."
    )]
    [SwaggerResponse(204, "Consignación eliminada correctamente")]
    [SwaggerResponse(404, "Consignación no encontrada", typeof(ErrorResponse))]
    [SwaggerResponse(500, "Error interno", typeof(ErrorResponse))]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _mediator.Send(new DeleteConsignmentCommand(id));
        return NoContent();
    }
}
