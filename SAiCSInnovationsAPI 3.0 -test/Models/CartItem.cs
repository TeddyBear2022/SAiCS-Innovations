using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class CartItem
    {
        public int CartItemId { get; set; }
        public int? MerchandiseId { get; set; }
        public int? SpecialId { get; set; }
        public int? CartId { get; set; }
        public int? Quantity { get; set; }
        //Added
        public decimal? Price { get; set; }

        public virtual Cart Cart { get; set; }
        public virtual Merchandise Merchandise { get; set; }
        public virtual Special Special { get; set; }
    }
}
