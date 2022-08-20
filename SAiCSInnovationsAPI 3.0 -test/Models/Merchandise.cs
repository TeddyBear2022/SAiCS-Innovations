using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Merchandise
    {
        public Merchandise()
        {
            CartItems = new HashSet<CartItem>();
            Feedbacks = new HashSet<Feedback>();
            MerchSpecials = new HashSet<MerchSpecial>();
            OrderItems = new HashSet<OrderItem>();
            Prices = new HashSet<Price>();
        }

        public int MerchandiseId { get; set; }
        public string MerchName { get; set; }
        public string Description { get; set; }
        public string MerchImage { get; set; }
        public int MerchStatusId { get; set; }
        public int? MerchTypeId { get; set; }
        public int? MerchCategoryId { get; set; }

        public virtual MerchType MerchType { get; set; }
        public virtual MerchCategory MerchCategory { get; set; }
        public virtual MerchStatus MerchStatuses { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<MerchSpecial> MerchSpecials { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<Price> Prices { get; set; }
    }
}
