using SmartAC.Api.DataAccess.Entities;

namespace SmartAC.Api.Business.Models
{
    public class DeviceDetailResponseModel
    {
        public long ID { get; set; }

        public decimal Temperature { get; set; }

        public decimal AirHumidityPercent { get; set; }

        public int CarbonMonoxideLevel { get; set; }

        public string HealthStatus { get; set; }

        public long DeviceID { get; set; }
    }
}
