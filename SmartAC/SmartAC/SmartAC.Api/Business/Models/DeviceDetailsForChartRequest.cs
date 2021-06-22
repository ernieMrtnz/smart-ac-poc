namespace SmartAC.Api.Business.Models
{
    public class DeviceDetailsForChartRequest
    {
        public bool IsToday { get; set; }

        public bool IsWeek { get; set; }

        public bool IsMonth { get; set; }

        public bool IsYear { get; set; }
    }
}
