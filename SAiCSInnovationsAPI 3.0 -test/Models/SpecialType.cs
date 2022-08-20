using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class SpecialType
    {
        public SpecialType()
        {
            Specials = new HashSet<Special>();
        }

        public int SpecialTypeId { get; set; }
        public string SpecialTypeName { get; set; }

        public virtual ICollection<Special> Specials { get; set; }
    }
}
