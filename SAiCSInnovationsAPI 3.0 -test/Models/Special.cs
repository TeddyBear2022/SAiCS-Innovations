using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Special
    {
        public Special()
        {
            CartItems = new HashSet<CartItem>();
            MerchSpecials = new HashSet<MerchSpecial>();
            OrderItems = new HashSet<OrderItem>();
        }

        public int SpecialId { get; set; }
        public int? SpecialTypeId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Description { get; set; }
        public string SpecialName { get; set; }
        public decimal? Price { get; set; }

        public virtual SpecialType SpecialType { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
        public virtual ICollection<MerchSpecial> MerchSpecials { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
