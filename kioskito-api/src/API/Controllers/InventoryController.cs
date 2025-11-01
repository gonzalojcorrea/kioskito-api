using Application.Common.Models;
using Application.Features.Inventories.Common;
using Application.Features.Inventories.Queries.GetAllInventories;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

/// <summary>
/// Controller for inventory management.
/// </summary>
[ApiController]
[Route("api/inventory")]
[AllowAnonymous]
public class InventoryController : ControllerBase
{
    private readonly IMediator _mediator;
    public InventoryController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Obtiene todos los inventarios con información resumida.
    /// </summary>
    /// <returns>Listado de inventarios.</returns>
    [HttpGet]
    [SwaggerOperation(
        Summary = "Listar inventarios",
        Description = "Obtiene todos los inventarios del sistema con información resumida."
    )]
    [SwaggerResponse(200, "Listado de inventarios", typeof(IReadOnlyList<InventoryResponse>))]
    [SwaggerResponse(500, "Error interno", typeof(ErrorResponse))]
    public async Task<ActionResult<IReadOnlyList<InventoryResponse>>> GetAll()
    {
        var list = await _mediator.Send(new GetAllInventoriesQuery());
        return Ok(list);
    }

    /// <summary>
    /// Creates a new inventory item with the specified details.
    /// </summary>
    /// <remarks>This method processes the provided <paramref name="cmd"/> to create a new inventory item. 
    /// The operation may fail if the item already exists or if the input data is invalid.</remarks>
    /// <param name="cmd">The command containing the details of the item to create.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the ID of the newly created item.</returns>
    [HttpPost("create-item")]
    [SwaggerOperation(
        Summary = "Create a new inventory item",
        Description = "Creates a new inventory item with the specified details."
    )]
    [SwaggerResponse(200, "Item created successfully", typeof(SuccessResponse<string>))]
    [SwaggerResponse(400, "Validation errors or bad request", typeof(ErrorResponse))]
    [SwaggerResponse(404, "Item already exists", typeof(ErrorResponse))]
    [SwaggerResponse(500, "Internal server error", typeof(ErrorResponse))]
    public async Task<ActionResult<string>> CreateItem(/*[FromBody] CreateItemCommand cmd*/)
    {
        //var response = await _mediator.Send(cmd);
        //return Ok(response);

        return Ok("Not implemented yet");
    }
}
