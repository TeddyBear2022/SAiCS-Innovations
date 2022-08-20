//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using SAiCSInnovationsAPI_3._0.Repository;
//using SAiCSInnovationsAPI_3._0.ViewModels;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace SAiCSInnovationsAPI_3._0.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AmbassadorOrderController : ControllerBase
//    {
//        private readonly ISAiCSInnovationsRep _rep;
//        public AmbassadorOrderController(ISAiCSInnovationsRep rep)
//        {
//            _rep = rep;
//        }

//        [HttpGet("Catalog")]
//        public object Catalog()
//        {
//            return _rep.ViewCatalog();
//        }

//        [HttpPost("AddToCart")]
//        public object AddToCart(CartVM cartitem)
//        {
//            return _rep.AddToCart(cartitem);
//        }

//        [HttpDelete("RemoveFromCart")]
//        public object RemoveFromCart(int itemID)
//        {
//            return _rep.RemoveFromCart(itemID);
//        }

//        [HttpDelete("ClearCart")]
//        public object ClearCart(int itemID)
//        {
//            return _rep.ClearCart(itemID);
//        }

//        [HttpGet("ViewCart")]
//        public object ViewCart()
//        {
//            return _rep.ViewAmbassadorCart();
//        }

//        [HttpPost("Checkout")]
//        public object Checkout(CheckoutVM checkout)
//        {
//            return _rep.Checkout(checkout);
//        }

//        [HttpPost("ViewOrderHistory")]
//        public object ViewOrderHistory(string userID)
//        {
//            return _rep.ViewOrderHistory(userID);
//        }

//        [HttpPost("ViewOrderDetails")]
//        public object ViewOrderDetails(int orderID)
//        {
//            return _rep.ViewOrderDetails(orderID);
//        }


//    }
//}
