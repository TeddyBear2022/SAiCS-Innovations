using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCS_Innovations_API.Models
{
    public partial class AmbassadorType
    {
        public AmbassadorType()
        {
            Ambassadors = new HashSet<Ambassador>();
        }

        public int AmbassadorTypeId { get; set; }
        public string AmbassadorTypeName { get; set; }

        public virtual ICollection<Ambassador> Ambassadors { get; set; }
    }
}
