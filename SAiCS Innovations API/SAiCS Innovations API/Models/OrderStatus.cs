using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class OrderStatus
    {
        public OrderStatus()
        {
            AmbassadorOrders = new HashSet<AmbassadorOrder>();
            ClientOrders = new HashSet<ClientOrder>();
        }

        public int OrderStatusId { get; set; }
        public string OrderStatusName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<AmbassadorOrder> AmbassadorOrders { get; set; }
        public virtual ICollection<ClientOrder> ClientOrders { get; set; }
    }
}
