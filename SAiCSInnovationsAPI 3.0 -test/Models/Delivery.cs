using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Delivery
    {
        public Delivery()
        {
            Orders = new HashSet<Order>();
        }

        public int DeliveryId { get; set; }
        public string TrackingNumber { get; set; }
        public int? DeliveryAmountId { get; set; }

        public virtual DeliveryAmount DeliveryAmount { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
