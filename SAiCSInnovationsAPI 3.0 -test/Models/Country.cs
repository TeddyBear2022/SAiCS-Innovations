using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class Country
    {
        public Country()
        {
            Addresses = new HashSet<Address>();
            
        }

        public int CountryId { get; set; }
        public string CountryName { get; set; }


        public virtual ICollection<Address> Addresses { get; set; }
       
    }
}
