using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class MerchType
    {
        public MerchType()
        {
            Merchandises = new HashSet<Merchandise>();
        }

        public int MerchTypeId { get; set; }
        public string MerchTypeName { get; set; }

        public virtual ICollection<Merchandise> Merchandises { get; set; }
    }
}
