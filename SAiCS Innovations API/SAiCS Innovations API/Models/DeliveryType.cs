using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class DeliveryType
    {
        public DeliveryType()
        {
            Deliveries = new HashSet<Delivery>();
        }

        public int DeliveryTypeId { get; set; }
        public string DeliveryTypeName { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Delivery> Deliveries { get; set; }
    }
}
