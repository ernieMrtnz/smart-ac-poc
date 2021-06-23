using System;

namespace SmartAC.Api.Business.Models
{
    public class UserIdentityModel
    {
        public long ID { get; set; }

        public long UserTypeID { get; set; }

        public string Name { get; set; }

        public DateTime ExpirationTime { get; set; }
    }
}
