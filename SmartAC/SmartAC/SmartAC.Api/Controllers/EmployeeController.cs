using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Business.Services;
using SmartAC.Api.Common.Models;
using SmartAC.Api.Helpers;

namespace SmartAC.Api.Controllers
{
    [Authorize]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ILogger<EmployeeController> _logger;
        private readonly EmployeeService _employeeService;

        public EmployeeController(
            ILogger<EmployeeController> logger,
            EmployeeService employeeService)
        {
            _logger = logger;
            _employeeService = employeeService;
        }

        /// <summary>
        /// Get all employees
        /// </summary>
        /// <returns>PagedResult employees</returns>
        [HttpGet("api/employee/forPaged")]
        public async Task<PageResult<EmployeeResponseModel>> GetEmployees([FromQuery] EmployeeSearchRequest request)
        {
            try
            {
                return await _employeeService.GetEmployeesPaged(request);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /// <summary>
        /// Retrieves a user by an id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("api/employee/{id}")]
        public async Task<EmployeeResponseModel> GetById(long id)
        {
            try
            {
                return await _employeeService.GetById(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /// <summary>
        /// Checks if an user's account is active
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("api/employee/{id}/isEnabled")]
        public async Task<bool> IsUserEnabled(long id)
        {
            var response = await _employeeService.IsUserEnabled(id);
            return response;
        }

        /// <summary>
        /// Enables an user's account
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/employee/{id}/enable")]
        public async Task<EmployeeResponseModel> EnableUser(long id)
        {
            return await _employeeService.EnableUser(id);
        }

        /// <summary>
        /// Disables a user's account
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/employee/{id}/disable")]
        public async Task<EmployeeResponseModel> DisableUser(long id)
        {
            return await _employeeService.DisableUser(id);
        }
    }
}
