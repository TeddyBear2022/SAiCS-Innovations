using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class CartItem
    {
        public int PackageId { get; set; }
        public int ProductId { get; set; }
        public int CartId { get; set; }

        public virtual Cart Cart { get; set; }
        public virtual Package Package { get; set; }
        public virtual Product Product { get; set; }
    }
}
