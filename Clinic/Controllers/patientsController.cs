using Clinic.Repository;
using Clinic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Web;
using System.Threading.Tasks;
using System.IO;

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
        public IHttpActionResult create(string patient)
        {
            try {
                /*var provider = new MultipartFormDataStreamProvider("D:\\ELTE\\Software technology\\Storage");
                await Request.Content.ReadAsMultipartAsync(provider);
                foreach(var file in provider.FileData) {
                    var name = file.Headers.ContentDisposition.FileName.Trim('"');
                    var path = "D:\\ELTE\\Software technology\\Storage" + file.LocalFileName;
                    File.Move(file.LocalFileName, path);
                }*/
                var result = repository.CreatPatient(JsonConvert.DeserializeObject<Patient>(patient));
                return Ok(result);
            }
            catch (Exception e) {
                return InternalServerError(e);
            }
        }

        [HttpPut]
        //api/patients/update?patient
        public IHttpActionResult update(string patient)
        {
            try
            {
                var result = repository.UpdatePatient(JsonConvert.DeserializeObject<Patient>(patient));
                return Ok(result);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
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
                return InternalServerError(e);
            }
        }

        [HttpGet]
        //api/patients/getAllPatient
        public IHttpActionResult allpatient()
        {
            try
            {
                var result = repository.getAllPatient();
                return Ok(result.ToArray());
            }
            catch (Exception e)
            {
                return InternalServerError(e);
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
                return InternalServerError(e);
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
                return InternalServerError(e);
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
                return InternalServerError(e);
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

        [HttpDelete]
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
