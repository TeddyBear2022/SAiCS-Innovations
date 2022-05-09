using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Delivery
    {
        public Delivery()
        {
            AmbassadorOrders = new HashSet<AmbassadorOrder>();
            ClientOrders = new HashSet<ClientOrder>();
        }

        public int DeliveryId { get; set; }
        public int? DeliveryTypeId { get; set; }
        public string DeliveryOption { get; set; }

        public virtual DeliveryType DeliveryType { get; set; }
        public virtual ICollection<AmbassadorOrder> AmbassadorOrders { get; set; }
        public virtual ICollection<ClientOrder> ClientOrders { get; set; }
    }
}
