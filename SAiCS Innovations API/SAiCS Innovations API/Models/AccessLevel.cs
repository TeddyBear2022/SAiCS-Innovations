using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class AccessLevel
    {
        public AccessLevel()
        {
            UserRoles = new HashSet<UserRole>();
        }

        public AccessLevel(int ID, string Name, string Description)
        {
            this.AccessLevelId = ID;
            this.AccessLevelName = Name;
            this.Description = Description;
            
        }
        public int AccessLevelId { get; set; }
        public string AccessLevelName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
