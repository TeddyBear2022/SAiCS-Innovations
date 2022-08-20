using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderItems = new HashSet<OrderItem>();
        }

        public int OrderId { get; set; }
        public string UserId { get; set; }
        public int? OrderStatusId { get; set; }
        public int? AddressId { get; set; }
        public int? CartId { get; set; }
        public byte[] ProofOfPayment { get; set; }
        public int? DeliveryId { get; set; }
        public DateTime? Date { get; set; }
        public int? AmbassadorId { get; set; }

        public virtual Address Address { get; set; }
        public virtual Ambassador Ambassador { get; set; }
        public virtual Cart Cart { get; set; }
        public virtual Delivery Delivery { get; set; }
        public virtual OrderStatus OrderStatus { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
