using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Price
    {
        public int PriceId { get; set; }
        public decimal? Price1 { get; set; }
        public DateTime? Date { get; set; }
        public int? MerchandiseId { get; set; }

        public virtual Merchandise Merchandise { get; set; }
    }
}
