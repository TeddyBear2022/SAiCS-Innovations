using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Price
    {
        public Price()
        {
            PackagePrices = new HashSet<PackagePrice>();
            ProductPrices = new HashSet<ProductPrice>();
        }

        public int PriceId { get; set; }
        public decimal Price1 { get; set; }
        public int? CurrencyId { get; set; }

        public virtual Currency Currency { get; set; }
        public virtual ICollection<PackagePrice> PackagePrices { get; set; }
        public virtual ICollection<ProductPrice> ProductPrices { get; set; }
    }
}
