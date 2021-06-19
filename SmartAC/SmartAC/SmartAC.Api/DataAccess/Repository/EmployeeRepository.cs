using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Persistence;
using SmartAC.Api.DataAccess.Repository.Interfaces;

namespace SmartAC.Api.DataAccess.Repository
{
    public class EmployeeRepository : RepositoryBase<Employee, SmartAcContext>, IEmployeeRepository
    {
        public EmployeeRepository(SmartAcContext context)
            : base(context)
        {
        }
    }
}
