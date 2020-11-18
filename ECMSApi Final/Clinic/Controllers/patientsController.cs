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
    public class patientsController : ApiController
    {
        static readonly IBackendRepository repository = new BackendRepository();
        [HttpPut]
        //api/patients/creat?patient
        public Boolean create(Patient patient)
        {
            return repository.CreatPatient(patient);
        }

        [HttpPut]
        //api/patients/update?patient
        public Boolean update(Patient patient)
        {
            return repository.UpdatePatient(patient);
        }

        [HttpGet]
        //api/patients/free?username
        public Boolean free(string username)
        {
            return repository.IsUserUnique(username);
        }

        [HttpGet]
        //api/patients/getAllPatient
        public IEnumerable<Patient> getAllPatient()
        {
            return repository.getAllPatient();
        }

        [HttpDelete]
        //api/patients/delete?id
        public Boolean delete(int id)
        {
            return repository.deletePatient(id);
        }

        [HttpGet]
        //api/patients/getPatient?id
        public Patient getPatient(int id)
        {
            return repository.getPatient(id);
        }

        [HttpGet]
        //api/patients/applicants
        public IEnumerable<Patient> applicants() {
            return repository.patientApplicants();
        }

        [HttpGet]
        //api/patients/acceptPatient?id
        public Boolean acceptPatient(int id) {
            return repository.acceptPatient(id);
        }

        [HttpGet]
        //api/patients/denyPatient?id
        public Boolean denyPatient(int id)
        {
            return repository.denyPatient(id);
        }

    }
}
