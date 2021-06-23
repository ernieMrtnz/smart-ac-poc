using System;

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

        public DateTime CreatedDateTime { get; set; }

        public string SerialNumber { get; set; }

        public DateTime? ResolvedDate { get; set; }
    }
}
