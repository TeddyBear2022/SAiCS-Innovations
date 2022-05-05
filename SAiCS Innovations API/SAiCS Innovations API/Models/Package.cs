using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Package
    {
        public Package()
        {
            CartItems = new HashSet<CartItem>();
            PackagePrices = new HashSet<PackagePrice>();
        }

        public int PackageId { get; set; }
        public int? PackageTypeId { get; set; }
        public string Description { get; set; }
        public int? Quantity { get; set; }
        public string PackageName { get; set; }
        public byte[] PackageImage { get; set; }

        public virtual PackageType PackageType { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
        public virtual ICollection<PackagePrice> PackagePrices { get; set; }
    }
}
