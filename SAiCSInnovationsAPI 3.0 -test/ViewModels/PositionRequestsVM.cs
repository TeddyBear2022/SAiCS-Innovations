using SAiCSInnovationsAPI_3._0.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.ViewModels
{
    public class PositionRequestsVM
    {
        public Ambassador Ambassador { get; set; }
        public List<Order> Orders { get; set; }
    }
}
