using Application.Features.Customers.Commands.RegisterCustomer;
using Application.Features.Customers.Commands.UpdateCustomer;
using Application.Features.Customers.Commands.DeleteCustomer;
using Application.Features.Customers.Queries.GetAllCustomers;
using Application.Features.Customers.Queries.GetCustomerById;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

/// <summary>
/// Endpoints para la gestión de clientes (CRUD).
/// Requiere autenticación JWT.
/// </summary>
[ApiController]
[Route("api/customers")]
[Authorize]
public class CustomersController : ControllerBase
{
    private readonly IMediator _mediator;
    public CustomersController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Registra un nuevo cliente.
    /// </summary>
    /// <param name="cmd">Datos del cliente.</param>
    /// <returns>Id del cliente creado.</returns>
    [HttpPost]
    [SwaggerOperation(Summary = "Crear cliente", Description = "Registra un nuevo cliente.")]
    [SwaggerResponse(200, "Cliente creado correctamente", typeof(Guid))]
    [SwaggerResponse(400, "Error de validación / Email duplicado", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult<Guid>> Create([FromBody] RegisterCustomerCommand cmd)
    {
        var id = await _mediator.Send(cmd);
        return Ok(id);
    }

    /// <summary>
    /// Obtiene todos los clientes registrados.
    /// </summary>
    /// <returns>Listado de clientes.</returns>
    [HttpGet]
    [SwaggerOperation(Summary = "Listar clientes", Description = "Obtiene todos los clientes.")]
    [SwaggerResponse(200, "Listado de clientes", typeof(IReadOnlyList<Customer>))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult<IReadOnlyList<Customer>>> GetAll()
    {
        var list = await _mediator.Send(new GetAllCustomersQuery());
        return Ok(list);
    }

    /// <summary>
    /// Obtiene un cliente por su identificador.
    /// </summary>
    /// <param name="id">Id del cliente.</param>
    /// <returns>Cliente encontrado.</returns>
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Obtener cliente", Description = "Obtiene un cliente por Id.")]
    [SwaggerResponse(200, "Cliente encontrado", typeof(Customer))]
    [SwaggerResponse(404, "Cliente no encontrado", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult<Customer>> GetById(Guid id)
    {
        var customer = await _mediator.Send(new GetCustomerByIdQuery(id));
        if (customer is null) return NotFound();
        return Ok(customer);
    }

    /// <summary>
    /// Actualiza los datos de un cliente.
    /// </summary>
    /// <param name="id">Id del cliente (ruta).</param>
    /// <param name="cmd">Datos actualizados (body).</param>
    /// <returns>204 si la operación tiene éxito.</returns>
    [HttpPut("{id:guid}")]
    [SwaggerOperation(Summary = "Actualizar cliente", Description = "Actualiza datos de un cliente.")]
    [SwaggerResponse(204, "Cliente actualizado correctamente")]
    [SwaggerResponse(400, "Id de ruta y comando no coinciden / Validación", typeof(object))]
    [SwaggerResponse(404, "Cliente no encontrado", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult> Update(Guid id, [FromBody] UpdateCustomerCommand cmd)
    {
        if (id != cmd.Id) return BadRequest("Id de ruta y comando no coinciden");
        await _mediator.Send(cmd);
        return NoContent();
    }

    /// <summary>
    /// Elimina un cliente por su Id.
    /// </summary>
    /// <param name="id">Id del cliente.</param>
    /// <returns>204 si la operación tiene éxito.</returns>
    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Eliminar cliente", Description = "Elimina un cliente por Id.")]
    [SwaggerResponse(204, "Cliente eliminado correctamente")]
    [SwaggerResponse(404, "Cliente no encontrado", typeof(object))]
    [SwaggerResponse(401, "No autorizado", typeof(object))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _mediator.Send(new DeleteCustomerCommand(id));
        return NoContent();
    }
}
