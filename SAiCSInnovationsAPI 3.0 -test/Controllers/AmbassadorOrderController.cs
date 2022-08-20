using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAiCSInnovationsAPI_3._0.Models;
using SAiCSInnovationsAPI_3._0.Repository;
using SAiCSInnovationsAPI_3._0.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAiCSInnovationsAPI_3._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AmbassadorOrderController : ControllerBase
    {
        private readonly ISAiCSInnovationsRep _rep;
        public AmbassadorOrderController(ISAiCSInnovationsRep rep)
        {
            _rep = rep;
        }

        [HttpGet("AmbassadorDiscount")]
        public object AmbassadorDiscount(string id)
        {
            return _rep.AmbassadorDiscount(id);
        }

        [HttpGet("GetVAT")]
        public object GetVAT()
        {
            try
            {
                return _rep.GetVAT();
            }
            catch
            {
                return false;
            }
            
        }

        [HttpPost("AddToCart")]
        public object AddToCart(string id, CartItem cartitem)
        {
            try
            {
                return _rep.AddToCart(id, cartitem);
            }
            catch
            {
                return false;
            }
        }

        [HttpDelete("RemoveFromCart")]
        public object RemoveFromCart(int itemID)
        {
            try
            {
                return _rep.RemoveFromCart(itemID);
            }
            catch
            {
                return false;
            }
           
        }

        [HttpDelete("ClearCart")]
        public object ClearCart(int cartID)
        {
            try
            {
                return _rep.ClearCart(cartID);
            }
            catch
            {
                return false;
            }
           
        }

        [HttpGet("ViewCart")]
        public object ViewCart(string id)
        {
            try
            {
                return _rep.loadCart(id);
            }
            catch
            {
                return false;
            }
            
        }

        [HttpPost("IncreaseCartItem")]
        public object IncreaseCartItem(int id)
        {
            try
            {
                return _rep.increaseCartItem(id);
            }
            catch
            {
                return false;
            }

        }

        [HttpPost("DecreaseCartItem")]
        public object DecreaseCartItem(int id)
        {
            try
            {
                return _rep.decreaseCartItem(id);
            }
            catch
            {
                return false;
            }

        }

        [HttpPost("Checkout")]
        public object Checkout(Order checkout)
        {
            try
            {
                return _rep.Checkout(checkout);
            }
            catch
            {
                return false;
            }
        }

        [HttpGet("ViewOrderHistory")]
        public object ViewOrderHistory(string userID)
        {
            try
            {
                return _rep.ViewOrderHistory(userID);
            }
            catch
            {
                return false;
            }
        }

        //        [HttpPost("ViewOrderDetails")]
        //        public object ViewOrderDetails(int orderID)
        //        {
        //            return _rep.ViewOrderDetails(orderID);
        //        }


    }
}
