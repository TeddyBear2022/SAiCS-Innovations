using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Product
    {
        public Product()
        {
            CartItems = new HashSet<CartItem>();
            Feedbacks = new HashSet<Feedback>();
            ProductPrices = new HashSet<ProductPrice>();
        }

        public int ProductId { get; set; }
        public int? SpecialId { get; set; }
        public int? ProductTypeId { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public string ProductName { get; set; }
        public byte[] ProductImage { get; set; }
        public string ReturnableYN { get; set; }

        public virtual ProductType ProductType { get; set; }
        public virtual Special Special { get; set; }
        public virtual ICollection<CartItem> CartItems { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<ProductPrice> ProductPrices { get; set; }
    }
}
