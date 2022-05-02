using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class PackagePrice
    {
        public int PackageId { get; set; }
        public int PriceId { get; set; }

        public virtual Package Package { get; set; }
        public virtual Price Price { get; set; }
    }
}
