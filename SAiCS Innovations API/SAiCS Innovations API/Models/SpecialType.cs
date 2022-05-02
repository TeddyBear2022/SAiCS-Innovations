using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class SpecialType
    {
        public SpecialType()
        {
            Specials = new HashSet<Special>();
        }

        public int SpecialTypeId { get; set; }
        public int SpecialTypeName { get; set; }

        public virtual ICollection<Special> Specials { get; set; }
    }
}
