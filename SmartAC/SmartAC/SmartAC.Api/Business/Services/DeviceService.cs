using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Options;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Common.Enums;
using SmartAC.Api.Common.Models;
using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Repository.Interfaces;
using SmartAC.Api.Helpers;

namespace SmartAC.Api.Business.Services
{
    public class DeviceService : BaseService
    {
        private readonly IDeviceRepository _deviceRepository;
        private readonly IDeviceDetailRepository _deviceDetailRepository;

        public DeviceService(
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            IDeviceRepository deviceRepository,
            IDeviceDetailRepository deviceDetailRepository)
            : base(mapper, appSettings)
        {
            _deviceRepository = deviceRepository;
            _deviceDetailRepository = deviceDetailRepository;
        }

        public async Task<Device> GetById(long id)
        {
            return await _deviceRepository.FindAsync(id);
        }

        public async Task<PageResult<DeviceResponseModel>> FindByParams(
            DeviceSearchRequest request)
        {
            Expression<Func<Device, bool>> filter = x =>
                (string.IsNullOrEmpty(request.SerialNumber)
                 || x.SerialNumber == request.SerialNumber);

            Expression<Func<Device, object>> sortBySelector = request.SortBy?.ToLower() switch
            {
                // "serialNumber" => c => c.SerialNumber,
                _ => c => c.ID,
            };

            var result = await _deviceRepository.FindPageResultAsync(
                filter,
                sortBySelector,
                request.OrderBy,
                request.Page,
                request.PageSize);

            return _mapper.Map<PageResult<DeviceResponseModel>>(result);
        }

        //public async Task<PageResult<DeviceDetailResponseModel>> GetDeviceDetailsByDeviceId(
        //    long deviceId, 
        //    OrderByEnum orderBy,
        //    string sortBy,
        //    int page,
        //    int pageSize)
        //{
        //    Expression<Func<DeviceDetail, bool>> filter = x => x.DeviceID == deviceId;

        //    Expression<Func<DeviceDetail, object>> sortBySelector = sortBy?.ToLower() switch
        //    {
        //        "createdatetime" => c => c.CreatedDateTime,
        //        _ => c => c.ID,
        //    };

        //    var result = await _deviceDetailRepository.FindPageResultAsync(
        //        filter,
        //        sortBySelector,
        //        orderBy,
        //        page,
        //        pageSize);

        //    return _mapper.Map<PageResult<DeviceDetailResponseModel>>(result);
        //}
    }
}
