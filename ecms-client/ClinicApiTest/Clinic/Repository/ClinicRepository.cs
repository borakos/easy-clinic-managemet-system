using Clinic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Repository
{
    public class ClinicRepository:IClinicRepository
    {
        private List<ForTest> test = new List<ForTest>();

        public ClinicRepository() {
            Add(new ForTest{Id=1,usename="Nissan",pwd = "nesd123" });
        }

        public void Add(ForTest item)
        {
            if (item == null)
            {
                throw new ArgumentException("item");
            }
            test.Add(item);
        }

        public Boolean GetLoginUse(string use) {
            var result = false;
            if(test.Exists(t=>t.usename == use))
            {
                result = true;
            }
            return result;
        }

        public Boolean GetLoginPwd(string use,string Pwd) {
            var result = false;
            if (test.Exists(t => t.usename == use && t.pwd == Pwd)) {
                result = true;
            }

            return result;
        }

        public ForTest GetInfor(int id) {
            var result = new ForTest();
            for (int i = 0; i < test.Count(); i++) {
                if (test[i].Id == id) {
                    result = test[i];
                }
            }
            return result;
        }

        public IEnumerable<ForTest> GetInfList() {
            return test;
        }

        public Boolean PostRegister(string use,string pwd) {
            var value = true;
            var n = new ForTest();
            n.Id = test.Count() + 1;
            n.usename = use;
            n.pwd = pwd;
            test.Add(n);
            return value;
        }

        public Boolean DeleteInfor(int id) {
            var value = true;
            foreach (var i in test) {
                if (i.Id == id) {
                    test.Remove(i);
                    return value;
                }
            }
            return value;
        }

    }
}