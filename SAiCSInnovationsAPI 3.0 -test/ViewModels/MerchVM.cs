using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.ViewModels
{
    public class MerchVM
    {
        public int MerchandiseId { get; set; }
        public string MerchName { get; set; }
        public string Description { get; set; }
        public string MerchImage { get; set; }
        public int StatusId { get; set; }
        public int MerchTypeId { get; set; }
        public int MerchCategoryId { get; set; }
        public decimal? Price { get; set; }

    }
}
