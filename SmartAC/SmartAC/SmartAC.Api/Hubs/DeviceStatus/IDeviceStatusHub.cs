using System.Threading.Tasks;
using SmartAC.Api.Business.Models;

namespace SmartAC.Api.Hubs.DeviceStatus
{
    public interface IDeviceStatusHub
    {
        Task HighCarbonMonoxideMessage(DeviceStatusResponseModel deviceStatus);

        Task HealthStatusMessage(DeviceStatusResponseModel deviceStatus);
    }
}
