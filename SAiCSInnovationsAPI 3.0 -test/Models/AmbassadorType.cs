using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class AmbassadorType
    {
        public AmbassadorType()
        {
            Ambassadors = new HashSet<Ambassador>();
        }

        public int AmbassadorTypeId { get; set; }
        public string AmbassadorTypeName { get; set; }
        public decimal? DiscountPercentage { get; set; }

        public virtual ICollection<Ambassador> Ambassadors { get; set; }
    }
}
