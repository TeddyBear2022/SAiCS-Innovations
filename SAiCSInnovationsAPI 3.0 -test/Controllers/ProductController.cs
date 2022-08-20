using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SAiCSInnovationsAPI_3._0.Repository;
using SAiCSInnovationsAPI_3._0.Models;
using SAiCSInnovationsAPI_3._0.ViewModels;
using System.Text.Json;

namespace SAiCSInnovationsAPI_3._0.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly SaicsInnovationsDBContext _db;
        private readonly ISAiCSInnovationsRep _rep;
        public ProductController(ISAiCSInnovationsRep rep, SaicsInnovationsDBContext db)
        {
            _rep = rep;
            _db = db;
        }

        //Product subsystem

        //Get Products
        [HttpGet("GetMerch")]
        public object GetMerch()
        {
            try
            {
                return _rep.GetAllMerch();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }

        //Get product types
        [HttpGet("GetMerchTypes")]
        public object GetMerchTypes()
        {
            try
            {
                return _rep.GetAll<MerchType>();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }

        [HttpGet("GetMerchCats")]
        public object GetMerchCats()
        {
            try
            {
                return _rep.GetAll<MerchCategory>();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }

        [HttpGet("GetMerchStatuses")]
        public object GetMerchStatuses()
        {
            try
            {
                return _rep.GetAll<MerchStatus>();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }

        }

        // Get product by name
        [HttpGet("GetMerchById")]
        public object GetMerchById(int id)
        {
            try
            {
                return _rep.GetMerchById(id);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        //Create product
        [HttpPost("CreateMerch")]
        public object CreateMerch(MerchVM merch)
        {
            try
            {

                return _rep.CreateMerch(merch);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

        //Update product
        [HttpPut("UpdateMerch")]
        public object UpdateMerch(int id, MerchVM merch)
        {
            try
            {

                return _rep.UpdateMerch(id, merch);

            }
            catch (Exception)
            {
                return BadRequest("invalid form");
            }

        }

        //Delete product
        [HttpDelete("DeleteMerch")]
        public object DeleteMerch(int id)
        {
            try
            {
                return _rep.DeleteMerch(id);
            }
            catch (Exception error)
            {
                return BadRequest(error.InnerException.Message);
            }
        }

    }

}