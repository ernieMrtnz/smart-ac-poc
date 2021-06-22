namespace SmartAC.Api.Business.Models
{
    public class EmployeeResponseModel
    {
        public long ID { get; set; }

        public long UserID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public long StatusID { get; set; }

        public bool IsAdmin { get; set; }
    }
}
