﻿using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class AccessLevel
    {
        public AccessLevel()
        {
            UserRoles = new HashSet<UserRole>();
        }

        public int AccessLevelId { get; set; }
        public string AccessLevelName { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
