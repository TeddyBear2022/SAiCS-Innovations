using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class OrderItem
    {
        public int OrderItemId { get; set; }
        public int? MerchandiseId { get; set; }
        public int? SpecialId { get; set; }
        public int? OrderId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }

        public virtual Merchandise Merchandise { get; set; }
        public virtual Order Order { get; set; }
        public virtual Special Special { get; set; }
    }
}
