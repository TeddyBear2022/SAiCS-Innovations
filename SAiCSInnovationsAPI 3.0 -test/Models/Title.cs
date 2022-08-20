using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Title
    {
        public Title()
        {
            Users = new HashSet<User>();
        }

        public int TitleId { get; set; }
        public string TitleName { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
