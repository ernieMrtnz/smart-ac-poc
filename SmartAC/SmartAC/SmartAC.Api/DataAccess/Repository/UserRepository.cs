using SmartAC.Api.DataAccess.Entities;
using SmartAC.Api.DataAccess.Persistence;
using SmartAC.Api.DataAccess.Repository.Interfaces;

namespace SmartAC.Api.DataAccess.Repository
{
    public class UserRepository : RepositoryBase<User, SmartAcContext>, IUserRepository
    {
        public UserRepository(SmartAcContext context)
            : base(context)
        {
        }
    }
}
