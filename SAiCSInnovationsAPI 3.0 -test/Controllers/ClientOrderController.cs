//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Configuration;
//using SAiCSInnovationsAPI_3._0.Models;
//using SAiCSInnovationsAPI_3._0.ViewModels;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace SAiCSInnovationsAPI_3._0.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ClientOrderController : ControllerBase
//    {
//        private readonly SaicsInnovationsDBContext db;
//        private readonly UserManager<User> _manager;
//        private readonly IUserClaimsPrincipalFactory<User> _claims;
//        private readonly IConfiguration _configuration;
//        public int otp = 0;

//        public ClientOrderController(SaicsInnovationsDBContext _db,
//            UserManager<User> manager,
//            IUserClaimsPrincipalFactory<User> claims,
//            IConfiguration configuration
//            )
//        {
//            db = _db;
//            _manager = manager;
//            _claims = claims;
//            _configuration = configuration;
//        }

//        [HttpPost("Schema")]
//        public object Schema(Product prod)
//        {
//            return "working";
//        }
//        [HttpPost("AddToCart")]
//        public object AddToCart(CartItem cartitem)
//        {
//            if (cartitem.ProductId != null)
//            {

//                //find product and add it to cart items
//                return "Add product to cart";
//            }
//            if (cartitem.PackageId != null)
//            {
//                //find package and at it to cart items
//                return "Add package to cart";
//            }
//            if (cartitem.SpecialId != null)
//            {
//                //find special and add it to cartitems
//                return "Add special to cart";
//            }

//            return 2;
//        }

//        [HttpPost("SearchProduct")]
//        public object SearchProduct(int productID)
//        {
//            //find product in database
//            //Return list/ result
//            return "stub";
//        }

//        [HttpPost("ViewProduct")]
//        public object ViewProduct()
//        {

//            return "stub";
//        }

//        [HttpPost("ViewClientCart")]
//        public object ViewClientCart()
//        {
//            return "stub";
//        }

//        [HttpPost("RemoveFromClientCart")]
//        public object RemoveFromClientCart(AddToCartVM cartitem)
//        {
//            if (cartitem.CartProduct != null)
//            {
//                //find product and remove from cart items
//                return 0;
//            }
//            if (cartitem.CartPackage != null)
//            {
//                //find package and remove from cart items
//                return 0;
//            }
//            if (cartitem.CartSpecial != null)
//            {
//                //find special and remove from cartitems
//                return 1;
//            }

//            return 2;
//        }

//        [HttpPost("ClearClientCart")]
//        public object ClearClientCart()
//        {
//            //delete all the cart items linked to the cart
//            return "stub";
//        }

//        [HttpPost("ClientCheckout")]
//        public object ClientCheckout()
//        {

//            return "stub";
//        }

//        [HttpPost("ViewClientOrderStatus")]
//        public object ViewClientOrderStatus()
//        {

//            return "stub";
//        }

//    }
//}
