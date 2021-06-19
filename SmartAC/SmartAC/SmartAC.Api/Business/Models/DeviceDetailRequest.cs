namespace SmartAC.Api.Business.Models
{
    public class DeviceDetailRequest
    {
        public decimal Temperature { get; set; }

        public decimal AirHumidityPercent { get; set; }

        public int CarbonMonoxideLevel { get; set; }

        public string HealthStatus { get; set; }

        public long DeviceID { get; set; }
    }
}
