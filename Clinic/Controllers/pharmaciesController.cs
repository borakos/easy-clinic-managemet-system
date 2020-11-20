using Clinic.Repository;
using Clinic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Clinic.Controllers
{
    public class pharmaciesController : ApiController
    {
        //Dependency Injection by unity. check "DI.UnityResolver.cs"
        readonly IBackendRepository repository;
        public pharmaciesController(IBackendRepository _repository)
        {
            repository = _repository;
        }

        [HttpPut]
        //api/pharmacies/creat?pharmacy
        public IHttpActionResult creat(Pharmacy pharmacy) {
            try
            {
                var result = repository.CreatPharmacy(pharmacy);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        //api/pharmacies/update?pharmacy
        public IHttpActionResult update(Pharmacy pharmacy) {
            try
            {
                var result = repository.UpdatePharmacy(pharmacy);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //api/pharmacies/free?username
        public IHttpActionResult free(string username)
        {
            try
            {
                var result = repository.IsUserUnique(username);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            
        }

        [HttpGet]
        //api/pharmacies/getAllPharmacy
        public IHttpActionResult getAllPharmacy() {
            try
            {
                var result = repository.getAllPharmacy();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            
        }

        [HttpGet]
        //api/pharmacies/getPharmacy?id
        public IHttpActionResult getPharmacy(int id) {
            try
            {
                var result = repository.GetPharmacy(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            
        }

        [HttpDelete]
        //api/pharmacies/delete?id
        public IHttpActionResult delete(int id) {
            try
            {
                var result = repository.deletePharmacy(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
