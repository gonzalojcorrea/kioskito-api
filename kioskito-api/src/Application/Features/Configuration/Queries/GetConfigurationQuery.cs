using Application.Features.Configuration.Common;
using MediatR;

namespace Application.Features.Configuration.Queries.GetConfiguration;

public sealed record GetConfigurationQuery : IRequest<ConfigurationResponse>;
