using Application.Features.Configuration.Common;
using Application.Features.Configuration.Queries.GetConfiguration;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Configuration.Queries.GetConfiguration;

public class GetConfigurationQueryHandler : IRequestHandler<GetConfigurationQuery, ConfigurationResponse>
{
    private readonly IUnitOfWork _uow;
    public GetConfigurationQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<ConfigurationResponse> Handle(GetConfigurationQuery request, CancellationToken cancellationToken)
    {
        var config = await _uow.Configuration.GetAsync(cancellationToken);

        if (config is null)
            throw new Exception("No configuration found.");

        return new ConfigurationResponse(
            config.CompanyName,
            config.Address
        );
    }
}
