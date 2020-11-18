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
        static readonly IBackendRepository repository = new BackendRepository();

        [HttpPut]
        //api/pharmacies/creat?pharmacy
        public Boolean creat(Pharmacy pharmacy) {
            return repository.CreatPharmacy(pharmacy);
        }

        [HttpPut]
        //api/pharmacies/update?pharmacy
        public Boolean update(Pharmacy pharmacy) {
            return repository.UpdatePharmacy(pharmacy);
        }

        [HttpGet]
        //api/pharmacies/free?username
        public Boolean free(string username)
        {
            return repository.IsUserUnique(username);
        }

        [HttpGet]
        //api/pharmacies/getAllPharmacy
        public IEnumerable<Pharmacy> getAllPharmacy() {
            return repository.getAllPharmacy();
        }

        [HttpGet]
        //api/pharmacies/getPharmacy?id
        public Pharmacy getPharmacy(int id) {
            return repository.GetPharmacy(id);
        }

        [HttpDelete]
        //api/pharmacies/delete?id
        public Boolean delete(int id) {
            return repository.deletePharmacy(id);
        }
    }
}
