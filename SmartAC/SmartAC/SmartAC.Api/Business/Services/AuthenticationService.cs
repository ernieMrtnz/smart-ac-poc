using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SmartAC.Api.Business.Models;
using SmartAC.Api.DataAccess.Repository.Interfaces;

namespace SmartAC.Api.Business.Services
{
    public class AuthenticationService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IUserRepository _userRepository;
        private readonly IDeviceRepository _deviceRepository;

        public AuthenticationService(
            IEmployeeRepository employeeRepository,
            IUserRepository userRepository,
            IDeviceRepository deviceRepository)
        {
            _employeeRepository = employeeRepository;
            _userRepository = userRepository;
            _deviceRepository = deviceRepository;
        }

        public async Task<UserIdentityModel> LoginUserAsync(AuthCredentialModel credentials)
        {
            var employee = await _employeeRepository.FirstOrDefaultAsync(x => x.Login == credentials.Login);
            if (employee == null)
            {
                throw new Exception("Employee not found");
            }

            if (employee.User?.PasswordHash != credentials.Password)
            {
                throw new Exception("Incorrect credentials");
            }

            return new UserIdentityModel();
        }
    }
}
