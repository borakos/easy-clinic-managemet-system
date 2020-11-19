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
    public class patientsController : ApiController
    {
        //Dependency Injection by unity. check "DI.UnityResolver.cs"
        readonly IBackendRepository repository;
        public patientsController(IBackendRepository _repository)
        {
            repository = _repository;
        }

        [HttpPut]
        //api/patients/creat?patient
        public IHttpActionResult create(Patient patient)
        {
            try
            {
                var result = repository.CreatPatient(patient);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        //api/patients/update?patient
        public IHttpActionResult update(Patient patient)
        {
            try
            {
                var result = repository.UpdatePatient(patient);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //api/patients/free?username
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
        //api/patients/getAllPatient
        public IHttpActionResult getAllPatient()
        {
            try
            {
                var result = repository.getAllPatient();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        //api/patients/delete?id
        public IHttpActionResult delete(int id)
        {
            try
            {
                var result = repository.deletePatient(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //api/patients/getPatient?id
        public IHttpActionResult getPatient(int id)
        {
            try
            {
                var result = repository.getPatient(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //api/patients/applicants
        public IHttpActionResult applicants() {
            try
            {
                var result = repository.patientApplicants();
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //api/patients/acceptPatient?id
        public IHttpActionResult acceptPatient(int id) {
            try
            {
                var result = repository.acceptPatient(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpGet]
        //api/patients/denyPatient?id
        public IHttpActionResult denyPatient(int id)
        {
            try
            {
                var result = repository.denyPatient(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

    }
}
