using SmartAC.Api.Common.Enums;

namespace SmartAC.Api.Business.Models
{
    public class BaseSearchRequest
    {
        public string SortBy { get; set; }

        public OrderByEnum OrderBy { get; set; } = OrderByEnum.Asc;

        public int Page { get; set; } = 1;

        public int PageSize { get; set; } = 10;
    }
}
