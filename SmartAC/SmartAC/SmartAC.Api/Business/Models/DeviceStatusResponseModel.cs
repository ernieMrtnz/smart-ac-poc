using SmartAC.Api.DataAccess.Enums;

namespace SmartAC.Api.Business.Models
{
    public class DeviceStatusResponseModel
    {
        public long DeviceID { get; set; }

        public string SerialNumber { get; set; }

        public string HealthStatus { get; set; }

        public int CarbonMonoxideLevel { get; set; }

        public long DeviceDetailID { get; set; }

        public string ErrorMessage { get; set; }
    }
}
