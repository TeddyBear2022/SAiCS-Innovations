using SAiCSInnovationsAPI_3._0.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.ViewModels
{
    public class CatalogVM
    {
        public int ItemID { get; set; }
        public string ItemName { get; set; }
        public int ItemType { get; set; }
        public int ItemCategory { get; set; }
        public decimal ItemPrice { get; set; }
        public string ItemImage { get; set; }
    }
}
