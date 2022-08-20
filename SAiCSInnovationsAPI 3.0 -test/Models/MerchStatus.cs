using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.Models
{
    public class MerchStatus
    {
        public MerchStatus()
        {
            Merchandises = new HashSet<Merchandise>();
        }

        public int MerchStatusId { get; set; }
        public string MerchStatusName { get; set; }

        public virtual ICollection<Merchandise> Merchandises { get; set; }
    }
}
