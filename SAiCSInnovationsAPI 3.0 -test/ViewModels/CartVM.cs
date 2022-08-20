using SAiCSInnovationsAPI_3._0.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.ViewModels
{
    public class CartVM
    {

        public string userID { get; set; }
        public CartItem cartItem { get; set; }
    }
}
