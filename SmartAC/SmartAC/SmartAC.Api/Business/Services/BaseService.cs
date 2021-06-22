using System;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.Extensions.Options;
using SmartAC.Api.Helpers;

namespace SmartAC.Api.Business.Services
{
    public class BaseService
    {
        protected readonly IMapper _mapper;
        protected readonly AppSettings _appSettings;

        public BaseService(IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }
    }
}
