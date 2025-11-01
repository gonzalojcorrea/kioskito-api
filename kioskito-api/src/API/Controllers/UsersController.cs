using Application.Features.Users.Common;
using Application.Features.Users.Queries.GetAllUsers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

/// <summary>
/// Endpoints para la gestión de usuarios.
/// </summary>
[ApiController]
[Route("api/users")]
[AllowAnonymous]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;
    public UsersController(IMediator mediator) => _mediator = mediator;

    /// <summary>
    /// Obtiene todos los usuarios registrados.
    /// </summary>
    /// <returns>Listado de usuarios.</returns>
    [HttpGet]
    [SwaggerOperation(Summary = "Listar usuarios", Description = "Obtiene todos los usuarios del sistema.")]
    [SwaggerResponse(200, "Listado de usuarios", typeof(IReadOnlyList<UserResponse>))]
    [SwaggerResponse(500, "Error interno", typeof(object))]
    public async Task<ActionResult<IReadOnlyList<UserResponse>>> GetAll()
    {
        var list = await _mediator.Send(new GetAllUsersQuery());
        return Ok(list);
    }
}
