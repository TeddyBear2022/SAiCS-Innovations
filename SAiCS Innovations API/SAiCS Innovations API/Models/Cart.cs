using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Cart
    {
        public Cart()
        {
            AmbassadorOrders = new HashSet<AmbassadorOrder>();
            CartItems = new HashSet<CartItem>();
            ClientOrders = new HashSet<ClientOrder>();
        }

        public int CartId { get; set; }

        public virtual ICollection<AmbassadorOrder> AmbassadorOrders { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
        public virtual ICollection<ClientOrder> ClientOrders { get; set; }
    }
}
