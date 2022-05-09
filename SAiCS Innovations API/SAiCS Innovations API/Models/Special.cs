using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Special
    {
        public Special()
        {
            Products = new HashSet<Product>();
        }

        public int SpecialId { get; set; }
        public int? SpecialTypeId { get; set; }

        public virtual SpecialType SpecialType { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}
