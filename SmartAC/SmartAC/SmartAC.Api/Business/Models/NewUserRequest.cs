namespace SmartAC.Api.Business.Models
{
    public class NewUserRequest
    {
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public bool IsAdmin { get; set; }
    }
}
