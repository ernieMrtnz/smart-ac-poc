using Microsoft.AspNetCore.SignalR;

namespace SmartAC.Api.Hubs.DeviceStatus
{
    public class DeviceStatusHub : Hub<IDeviceStatusHub>
    {
        public DeviceStatusHub()
        {

        }
    }
}
