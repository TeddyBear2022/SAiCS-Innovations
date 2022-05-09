using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class UserRole
    {
        public UserRole()
        {
            Users = new HashSet<User>();
        }

        public int UserRoleId { get; set; }
        public int? AccessLevelId { get; set; }
        public string UserRoleName { get; set; }

        public virtual AccessLevel AccessLevel { get; set; }
        public virtual ICollection<User> Users { get; set; }
    }
}
