using System;
using System.Collections.Generic;

#nullable disable

namespace SAiCSInnovationsAPI_3._0.Models
{
    public partial class MerchSpecial
    {
        public int MerchSpecialId { get; set; }
        public int? MerchandiseId { get; set; }
        public int? SpecialId { get; set; }

        public virtual Merchandise Merchandise { get; set; }
        public virtual Special Special { get; set; }
    }
}
