using Clinic.Repository;
using Clinic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Diagnostics;

namespace Clinic.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class appointmentsController : ApiController
    {
        //Dependency Injection by unity. check "DI.UnityResolver.cs"
        readonly IBackendRepository repository;
        public appointmentsController(IBackendRepository _repository)
        {
            repository = _repository;
        }

        [HttpPost]
        public IHttpActionResult listForPatientSelect() {
            return Ok();
        }

        [HttpPost]
        public IHttpActionResult listByDoctors(int[] doctorIds) {
            try {
                Debug.WriteLine(doctorIds.Count());
                var result = repository.GetAppoinmentEventsByDoctors(doctorIds);
                return Ok(result);
            }catch(Exception e) {
                return InternalServerError(e);
            }
        }

        [HttpPut]
        public IHttpActionResult create(Appoinment appoinment) {
            try
            {
                var result = repository.createAppointments(appoinment);
                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
