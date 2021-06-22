namespace SmartAC.Api.Business.Models
{
    public class DeviceDetailsForChartResponse
    {
        public decimal TemperatureLow { get; set; }

        public decimal TemperatureHigh { get; set; }

        public decimal AirHumidityLow { get; set; }

        public decimal AirHumidityHigh { get; set; }

        public int CarbonMonoxideLow { get; set; }

        public int CarbonMonoxideHigh { get; set; }

        public  string SerialNumber { get; set; }
    }
}
