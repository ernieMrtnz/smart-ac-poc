using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using MoreLinq;
using SmartAC.Api.Business.Models;
using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Enums;
using SmartAC.Api.DataAccess.Repository.Interfaces;
using SmartAC.Api.Helpers;
using SmartAC.Api.Hubs.DeviceStatus;

namespace SmartAC.Api.Business.Services
{
    public class DeviceDetailService : BaseService
    {
        private readonly IDeviceDetailRepository _deviceDetailRepository;
        private readonly IDeviceRepository _deviceRepository;
        private readonly IHubContext<DeviceStatusHub, IDeviceStatusHub> _hubContext;

        public DeviceDetailService(
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            IDeviceDetailRepository deviceDetailRepository,
            IDeviceRepository deviceRepository,
            IHubContext<DeviceStatusHub, IDeviceStatusHub> hubContext)
            : base(mapper, appSettings)
        {
            _deviceDetailRepository = deviceDetailRepository;
            _deviceRepository = deviceRepository;
            _hubContext = hubContext;
        }

        public async Task<DeviceDetailResponseModel> GetById(long id)
        {
            var result = await _deviceDetailRepository.FindAsync(id);
            var detail = _mapper.Map<DeviceDetailResponseModel>(result);

            var device = await _deviceRepository.FindAsync(result.DeviceID);
            detail.SerialNumber = device.SerialNumber;

            return detail;
        }

        public async Task<DeviceDetailResponseModel> Add(DeviceDetailRequest request)
        {
            var newDeviceDetail = new DeviceDetail()
            {
                Temperature = request.Temperature,
                HealthStatus = request.HealthStatus,
                DeviceID = request.DeviceID,
                AirHumidityPercent = request.AirHumidityPercent,
                CarbonMonoxideLevel = request.CarbonMonoxideLevel,
                CreatedDateTime = DateTime.Now,
            };

            var deviceDetail = await _deviceDetailRepository.Add(newDeviceDetail);
            var result = _mapper.Map<DeviceDetailResponseModel>(deviceDetail);

            var deviceStatusResponse = await GetDeviceStatusResponse(deviceDetail);

            if (IsHealtStatusNotOk(request.HealthStatus))
            {
                await _hubContext.Clients.All.HealthStatusMessage(deviceStatusResponse);
            }

            if (IsCarbonMonoxideLevelHigh(newDeviceDetail.CarbonMonoxideLevel))
            {
                await _hubContext.Clients.All.HighCarbonMonoxideMessage(deviceStatusResponse);
            }

            return result;
        }

        public async Task<bool> AddBulk(BulkDeviceDetailRequest request)
        {
            var bulkDetails = _mapper.Map<List<DeviceDetail>>(request.BulkDeviceDetails);
            await _deviceDetailRepository.BulkInsert(bulkDetails);

            return true;
        }

        public async Task<DeviceDetailsForChartResponse> FindForChart(
            long deviceId,
            DeviceDetailsForChartRequest request)
        {
            var dateStart = DateTime.Now;
            DateTime? dateEnd = null;

            if (request.IsToday)
            {
                dateEnd = dateStart.Date;
            } else if (request.IsMonth)
            {
                dateEnd = dateStart.Date.AddMonths(-30);
            } else if (request.IsYear)
            {
                dateEnd = dateStart.Date.AddYears(-1);
            }
            else
            {
                dateEnd = dateStart.Date.AddDays(-7);
            }

            Expression<Func<DeviceDetail, bool>> filter = x =>
                x.DeviceID == deviceId
                && (x.CreatedDateTime <= dateStart)
                && (x.CreatedDateTime >= dateEnd);

            var result = new DeviceDetailsForChartResponse();

            var list = (await _deviceDetailRepository.QueryAsync(filter));
            var tempHigh = list.MaxBy(x => x.Temperature).FirstOrDefault();
            if (tempHigh != null)
            {
                result.TemperatureHigh = tempHigh.Temperature;
            }

            var tempLow = list.MinBy(x => x.Temperature).FirstOrDefault();
            if (tempLow != null)
            {
                result.TemperatureLow = tempLow.Temperature;
            }

            var airHumHigh = list.MaxBy(x => x.AirHumidityPercent).FirstOrDefault();
            if (airHumHigh != null)
            {
                result.AirHumidityHigh = airHumHigh.AirHumidityPercent;
            }

            var airHumLow = list.MinBy(x => x.AirHumidityPercent).FirstOrDefault();
            if (airHumLow != null)
            {
                result.AirHumidityLow = airHumLow.AirHumidityPercent;
            }

            var carbonHigh = list.MaxBy(x => x.CarbonMonoxideLevel).FirstOrDefault();
            if (carbonHigh != null)
            {
                result.CarbonMonoxideHigh = carbonHigh.CarbonMonoxideLevel;
            }

            var carbonLow = list.MinBy(x => x.CarbonMonoxideLevel).FirstOrDefault();
            if (carbonLow != null)
            {
                result.CarbonMonoxideLow = carbonLow.CarbonMonoxideLevel;
            }

            var device = await _deviceRepository.FindAsync(deviceId);
            if (device != null)
            {
                result.SerialNumber = device.SerialNumber;
            }

            return result;
        }

        public async Task<bool> ResolveStatus(long id)
        {
            var detail = await _deviceDetailRepository.FindAsync(id);
            if (detail == null)
            {
                throw new Exception("Device details were not found");
            }

            detail.HealthStatus = EnumHelper.GetDescription(HealthStatusEnum.Ok);
            detail.ResolvedDate = DateTime.Now;

            await _deviceDetailRepository.Update(detail);

            // TODO: Add specific DTO to send to client
            await _hubContext.Clients.All.HealthStatusMessage(null);
            await _hubContext.Clients.All.HighCarbonMonoxideMessage(null);

            return true;
        }

        private async Task<DeviceStatusResponseModel> GetDeviceStatusResponse(DeviceDetail deviceDetail)
        {
            if (!IsNotificationNeeded(deviceDetail.HealthStatus, deviceDetail.CarbonMonoxideLevel))
            {
                return null;
            }

            var device = await _deviceRepository.FindAsync(deviceDetail.DeviceID);
            var deviceSerialNum = device.SerialNumber ?? string.Empty;

            var healthStatusErrStr = IsHealtStatusNotOk(deviceDetail.HealthStatus) 
                ? string.Format("HEALTH STATUS: {0}", deviceDetail.HealthStatus) 
                : string.Empty;
            var carbMonHighLevel = IsCarbonMonoxideLevelHigh(deviceDetail.CarbonMonoxideLevel)
                ? string.Format("CARBON MONOXIDE LEVEL: {0} PPM", deviceDetail.CarbonMonoxideLevel)
                : string.Empty;
            var errorStr = string.Format("Device with Serial Number: {0} has reported: {1} {2}",
                deviceSerialNum, healthStatusErrStr, carbMonHighLevel);


            return new DeviceStatusResponseModel
            {
                DeviceID = deviceDetail.DeviceID,
                DeviceDetailID = deviceDetail.ID,
                ErrorMessage = errorStr,
                HealthStatus = deviceDetail.HealthStatus,
                CarbonMonoxideLevel = deviceDetail.CarbonMonoxideLevel,
                SerialNumber = deviceSerialNum,
            };
        }

        private bool IsNotificationNeeded(string healthStatus, int carbonMonoxideLevel)
        {
            return IsHealtStatusNotOk(healthStatus) || IsCarbonMonoxideLevelHigh(carbonMonoxideLevel);
        }

        private bool IsHealtStatusNotOk(string healthStatus)
        {
            return healthStatus.ToLower() != EnumHelper.GetDescription(HealthStatusEnum.Ok);
        }

        private bool IsCarbonMonoxideLevelHigh(int level)
        {
            return level >= 9;
        }
    }
}
