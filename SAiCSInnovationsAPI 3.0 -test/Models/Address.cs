using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Address
    {
        public Address()
        {
            Orders = new HashSet<Order>();
        }

        public int AddressId { get; set; }
        public int? CountryId { get; set; }
        public string UserId { get; set; }
        public string Address1 { get; set; }
        public int? PostalCode { get; set; }
        public string City { get; set; }
        public int? RecipientNumber { get; set; }
        public int ProvinceId { get; set; } //added

        public virtual Country Country { get; set; }
        public virtual Province Province { get; set; } // added to fix province
        public virtual User User { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
