using System;
using System.Collections.Generic;

namespace SAiCSInnovationsAPI_3._0.Models
{
    public class MerchCategory
    {
        public MerchCategory()
        {
            Merchandises = new HashSet<Merchandise>();
        }

        public int MerchCategoryId { get; set; }
        public string MerchCategoryName { get; set; }

        public virtual ICollection<Merchandise> Merchandises { get; set; }
    }
}
