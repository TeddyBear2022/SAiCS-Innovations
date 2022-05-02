using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class AmbassadorOrder
    {
        public int AmbassadorOrderId { get; set; }
        public int? AmabassadorId { get; set; }
        public int? OrderStatusId { get; set; }
        public int CartId { get; set; }
        public byte[] ProofOfPayment { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int? DeliveryId { get; set; }
        public string TrackingNumber { get; set; }

        public virtual Ambassador Amabassador { get; set; }
        public virtual Cart Cart { get; set; }
        public virtual Delivery Delivery { get; set; }
        public virtual OrderStatus OrderStatus { get; set; }
    }
}
