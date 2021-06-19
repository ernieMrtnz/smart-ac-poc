using System.Threading.Tasks;
using AutoMapper;
using SmartAC.Api.Business.Models;
using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Repository.Interfaces;

namespace SmartAC.Api.Business.Services
{
    public class DeviceDetailService
    {
        private readonly IDeviceDetailRepository _deviceDetailRepository;
        private readonly IMapper _mapper;

        public DeviceDetailService(
            IMapper mapper,
            IDeviceDetailRepository deviceDetailRepository)
        {
            _mapper = mapper;
            _deviceDetailRepository = deviceDetailRepository;
        }


        public async Task<DeviceDetailResponseModel> Add(DeviceDetailRequest request)
        {
            var device = new DeviceDetail()
            {
                HealthStatus = request.HealthStatus,
                DeviceID = request.DeviceID,
                AirHumidityPercent = request.AirHumidityPercent,
                CarbonMonoxideLevel = request.CarbonMonoxideLevel,
            };

            var result = await _deviceDetailRepository.Add(device);

            return _mapper.Map<DeviceDetailResponseModel>(result);
        }
    }
}
