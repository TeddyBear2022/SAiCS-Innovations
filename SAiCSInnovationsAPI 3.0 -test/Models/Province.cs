using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.Models
{
    public class Province
    {
        public Province()
        {
            Addresses = new HashSet<Address>();
        }

        public int ProvinceId { get; set; }
        public string ProvinceName { get; set; }
       

        
        public virtual ICollection<Address> Addresses { get; set; }
    }
}
