using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SmartAC.Api.Business.Models;
using SmartAC.Api.Business.Services;
using SmartAC.Api.Common.Models;
using SmartAC.Api.Helpers;
using Microsoft.AspNetCore.Http;

namespace SmartAC.Api.Controllers
{
    [Authorize]
    [Route("api/employee")]
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
        [HttpGet("forPaged")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<PageResult<EmployeeResponseModel>>> GetEmployees([FromQuery] EmployeeSearchRequest request)
        {
            try
            {
                var result = await _employeeService.GetEmployeesPaged(request);
                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Could not retrieve users list for paged");
            }
        }

        /// <summary>
        /// Retrieves a user by an id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<EmployeeResponseModel>> GetById(long id)
        {
            try
            {
                var result = await _employeeService.GetById(id);
                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Could not find user");
            }
        }

        /// <summary>
        /// Enables an user's account
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id}/enable")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<EmployeeResponseModel>> EnableUser(long id)
        {
            try
            {
                var result = await _employeeService.EnableUser(id);
                if (result == null)
                {
                    return BadRequest("Not able to update user account");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Not able to enable user account");
            }
        }

        /// <summary>
        /// Disables a user's account
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id}/disable")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<EmployeeResponseModel>> DisableUser(long id)
        {
            try
            {
                var result = await _employeeService.DisableUser(id);
                if (result == null)
                {
                    return BadRequest("Not able to update the user's account");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
