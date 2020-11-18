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
    public class appointmentsController : ApiController
    {
        static readonly IBackendRepository repository = new BackendRepository();

        [HttpPost]
        public void listForPatientSelect() {

        }

        [HttpPut]
        public Boolean create(Appoinment appoinment) {
            return repository.createAppointments(appoinment);
        }
    }
}
