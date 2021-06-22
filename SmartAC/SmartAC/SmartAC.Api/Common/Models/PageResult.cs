using System.Collections.Generic;

namespace SmartAC.Api.Common.Models
{
    public class PageResult<T>
    {
        public List<T> Page { get; set; }
        public int TotalCount { get; set; }

        public PageResult()
        {
            Page = new List<T>();
        }

        public PageResult(int totalCount)
            : this()
        {
            TotalCount = totalCount;
        }

        public PageResult(List<T> page, int totalCount)
            : this(totalCount)
        {
            Page = page;
        }
    }
}
