using SmartAC.Api.DataAccess.Enums;

namespace SmartAC.Api.Business.Models
{
    public class NotificationAlertData
    {
        public NotificationAlertData()
        {
        }

        public NotificationAlertData(
            HealthStatusEnum status,
            long deviceId)
        {
            DeviceID = deviceId;
            HealthStatus = status;
        }

        public string DeviceName { get; set; }
        public string SerialNumber { get; set; }
        public long DeviceID { get; set; }
        public HealthStatusEnum HealthStatus { get; set; }
    }
}
