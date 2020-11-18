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
    public class doctorsController : ApiController
    {
        static readonly IBackendRepository repository = new BackendRepository();
        [HttpPut]
        //api/doctors/creat?Doctor
        public Boolean create(Doctor doctor) {
            return repository.CreatDoctor(doctor);
        }

        [HttpPut]
        //api/doctors/update?doctor
        public Boolean update(Doctor doctor)
        {
            return repository.UpdateDoctor(doctor);
        }

        [HttpGet]
        //api/doctors/free?username
        public Boolean free(string username)
        {
            return repository.IsUserUnique(username);
        }

        [HttpGet]
        //api/doctors/getAllDoctor
        public IEnumerable<Doctor> getAllDoctor()
        {
            return repository.getAllDoctor();
        }

        [HttpGet]
        //api/doctors/filter?filter
        public IEnumerable<Doctor> filter(string filter) {
            return repository.getFilterDoctor(filter);
        }

        [HttpDelete]
        //api/doctors/delete?id
        public Boolean delete(int id)
        {
            return repository.deleteDoctor(id);
        }

        [HttpGet]
        //api/doctors/getDoctor?id
        public Doctor getDoctor(int id) {
            return repository.getDoctor(id);
        }


    }
}
