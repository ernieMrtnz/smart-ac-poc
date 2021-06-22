using System.ComponentModel;

namespace SmartAC.Api.DataAccess.Enums
{
    public enum HealthStatusEnum
    {
        [Description("ok")]
        Ok = 1,

        [Description("needs_service")]
        NeedsService = 2,

        [Description("needs_filter")]
        NeedsNewFilter = 3,

        [Description("gas_leak")]
        GasLeak = 4,
    }
}
