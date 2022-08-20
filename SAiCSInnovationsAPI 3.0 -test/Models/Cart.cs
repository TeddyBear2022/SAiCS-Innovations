using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Cart
    {
        public Cart()
        {
            CartItems = new HashSet<CartItem>();
            Orders = new HashSet<Order>();
        }

        public int CartId { get; set; }
        public string UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
