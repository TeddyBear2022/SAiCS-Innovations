using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class DeliveryAmount
    {
        public DeliveryAmount()
        {
            Deliveries = new HashSet<Delivery>();
        }

        public int DeliveryAmountId { get; set; }
        public string DeliveryAmount1 { get; set; }

        public virtual ICollection<Delivery> Deliveries { get; set; }
    }
}
