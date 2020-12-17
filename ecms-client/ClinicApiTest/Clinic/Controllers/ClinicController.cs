using Clinic.Models;
using Clinic.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Clinic.Controllers
{
    public class ClinicController : ApiController
    {
        public class UP
        {
            private string _use="1";
            private string _pwd="2";
            public string Use {
                get {
                    return _use;
                }
                set {
                    _use = value;
                }
            }
            public string Pwd {
                get {
                    return _pwd;
                }
                set {
                    _pwd = value;
                }
            }
        }

        static readonly IClinicRepository brepository = new ClinicRepository();
        //Get api/clinic/GetLoginResult
        /*public string GetLoginResult(UP up) {
            if (brepository.GetLoginPwd(up.Use, up.Pwd))
            {
                return "Login success";
            }
            else if (brepository.GetLoginUse(up.Use))
            {
                return "Password error";
            }
            else {
                return "User name can't find";
            }
        }*/
        [HttpGet, HttpPost]
        public string GetLoginResult(string use,string pwd)
        {
            if (brepository.GetLoginPwd(use, pwd))
            {
                return "Login success";
            }
            else if (brepository.GetLoginUse(use))
            {
                return "Password error";
            }
            else
            {
                return "User name can't find";
            }
        }

        //Get api/clinic/GetInformation
        public ForTest GetInformation(int id) {
            return brepository.GetInfor(id);
        }

        //Get api/clinic/GetReservationList
        public IEnumerable<ForTest> GetReservationList() {
            return brepository.GetInfList();
        }

        //Get api/clinic/GetPharmacyInformation
        public IEnumerable<ForTest> GetPharmacyInformation() {
            return brepository.GetInfList();
        }

        //Post api/clinic/PostRegister
        public Boolean PostRegister(string use, string pwd) {
            var result = false;
            result = brepository.PostRegister(use, pwd);
            return result;
        }

        //Post api/clinic/PostInformation
        public Boolean PostInformation(string use, string pwd)
        {
            var result = false;
            result = brepository.PostRegister(use, pwd);
            return result;
        }

        //Post api/clinic/PostReservation
        public Boolean PostReservation(string use, string pwd)
        {
            var result = false;
            result = brepository.PostRegister(use, pwd);
            return result;
        }

        //Delete api/clinic/DeleteUser
        public Boolean DeleteUser(int id) {
            var result = false;
            result = brepository.DeleteInfor(id);
            return result;
        }
        //Delete api/clinic/DeleteReservation
        public Boolean DeleteReservation(int id)
        {
            var result = false;
            result = brepository.DeleteInfor(id);
            return result;
        }
        //DeletePharmacy
        public Boolean DeletePharmacy(int id)
        {
            var result = false;
            result = brepository.DeleteInfor(id);
            return result;
        }

    }
}
