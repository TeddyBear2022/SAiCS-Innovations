using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class Address
    {
        public Address()
        {
            Users = new HashSet<User>();
        }

        public int AddressId { get; set; }
        public string Address1 { get; set; }
        public int PostalCode { get; set; }
        public string City { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
