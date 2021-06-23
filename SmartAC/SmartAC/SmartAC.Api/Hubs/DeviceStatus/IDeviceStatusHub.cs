using System.Threading.Tasks;
using SmartAC.Api.Business.Models;

namespace SmartAC.Api.Hubs.DeviceStatus
{
    public interface IDeviceStatusHub
    {
        Task NotificationErrorMessage(DeviceStatusResponseModel deviceStatus);
    }
}
