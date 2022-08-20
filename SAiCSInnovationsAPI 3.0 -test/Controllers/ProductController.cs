//using Microsoft.EntityFrameworkCore;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using SAiCSInnovationsAPI_3._0.Repository;
//using SAiCSInnovationsAPI_3._0.Models;
//using SAiCSInnovationsAPI_3._0.ViewModels;
//using System.Text.Json;

//namespace SAiCSInnovationsAPI_3._0.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ProductController : ControllerBase
//    {
//        private readonly SaicsInnovationsDBContext _db;
//        private readonly ISAiCSInnovationsRep _rep;
//        public ProductController(ISAiCSInnovationsRep rep, SaicsInnovationsDBContext db)
//        {
//            _rep = rep;
//            _db = db;
//        }

//        //Product subsystem

//        //Get Products
//        [HttpGet("getProducts")]
//        public object GetProducts()
//        {
//            try
//            {
//                return _rep.GetProducts();
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.Message);
//            }

//        }

//        //Get product types
//        [HttpGet("getProductTypes")]
//        public object GetProductTypes()
//        {
//            try
//            {
//                return _rep.GetProductTypes();
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.Message);
//            }

//        }

//        // Get product by name
//        [HttpGet("getProductByName")]
//        public object GetProductByName(string name)
//        {
//            try
//            {
//                return _rep.GetProductByName(name);
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.InnerException.Message);
//            }
//        }

//        //Create product
//        [HttpPost("createProduct")]
//        public object CreateProduct(ProductVM product)
//        {
//            try
//            {
                
//                return _rep.CreateProduct(product);
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.InnerException.Message);
//            }
//        }

//        //Update product
//        [HttpPut("updateProduct")]
//        public object UpdateProduct(string name, ProductVM product)
//        {
//            try
//            {
                
//                return _rep.UpdateProduct(name, product);
                
//            }
//            catch (Exception)
//            {
//                return BadRequest("invalid form");
//            }

//        }

//        //Delete product
//        [HttpDelete("deleteProduct")]
//        public object DeleteProduct(int id)
//        {
//            try
//            {
//                return _rep.DeleteProduct(id);
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.InnerException.Message);
//            }
//        }

//        //Get Packages

//        //Get packages
//        [HttpGet("getPackages")]
//        public object GetPackages()
//        {
//            try
//            {
//                return _rep.GetPackages();
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.Message);
//            }

//        }

//        //Get package types
//        [HttpGet("getPackageTypes")]
//        public object GetPackageTypes()
//        {
//            try
//            {
//                return _rep.GetPackageTypes();
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.Message);
//            }

//        }

//        // Get package by name
//        [HttpGet("getPackageByName")]
//        public object GetPackageByName(string name)
//        {
//            try
//            {
//                return _rep.GetPackageByName(name);
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.InnerException.Message);
//            }
//        }

//        //Create package
//        [HttpPost("createPackage")]
//        public object CreatePackage(PackageVM package)
//        {
//            try
//            {

//                return _rep.CreatePackage(package);
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.InnerException.Message);
//            }
//        }

//        //Update package
//        [HttpPut("updatePackage")]
//        public object UpdatePackage(string name, PackageVM package)
//        {
//            try
//            {

//                return _rep.UpdatePackage(name, package);

//            }
//            catch (Exception)
//            {
//                return BadRequest("invalid form");
//            }

//        }

//        //Delete package
//        [HttpDelete("deletePackage")]
//        public object DeletePackage(int id)
//        {
//            try
//            {
//                return _rep.DeletePackage(id);
//            }
//            catch (Exception error)
//            {
//                return BadRequest(error.InnerException.Message);
//            }
//        }

//    }
//}
