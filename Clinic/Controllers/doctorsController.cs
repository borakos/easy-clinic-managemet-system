using Clinic.Repository;
using Clinic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Clinic.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class doctorsController : ApiController
    {
        //Dependency Injection by unity. check "DI.UnityResolver.cs"
        readonly IBackendRepository repository;
        public doctorsController(IBackendRepository _repository) {
            repository = _repository;
        }

        [HttpPut]
        //api/doctors/creat?Doctor
        public IHttpActionResult create(Doctor doctor) {
            try {
                var result = repository.CreatDoctor(doctor);
                return Ok(result);
            }
            catch (Exception e) {
                return BadRequest();
            }
        }

        [HttpPut]
        //api/doctors/update?doctor
        public IHttpActionResult update(Doctor doctor)
        {
            try
            {
                var result = repository.UpdateDoctor(doctor);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //api/doctors/free?username
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
        //api/doctors/getAllDoctor
        /*public IEnumerable<Doctor> getAllDoctor()
        {
            return repository.getAllDoctor();
        }*/
        public IHttpActionResult getAllDoctor()
        {
            try
            {
                var result = repository.getAllDoctor();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            
        }

        [HttpGet]
        //api/doctors/filter?filter
        /*public IEnumerable<Doctor> filter(string filter) {
            return repository.getFilterDoctor(filter);
        }*/
        public IHttpActionResult filter(string filter)
        {
            try
            {
                var result = repository.getFilterDoctor(filter);
                return Ok(result);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
            
        }

        [HttpDelete]
        //api/doctors/delete?id
        public IHttpActionResult delete(int id)
        {
            try
            {
                var result = repository.deleteDoctor(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //api/doctors/getDoctor?id
        /*public Doctor getDoctor(int id) {
            return repository.getDoctor(id);
        }*/
        public IHttpActionResult getDoctor(int id)
        {
            try
            {
                var result = repository.getDoctor(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }


    }
}
