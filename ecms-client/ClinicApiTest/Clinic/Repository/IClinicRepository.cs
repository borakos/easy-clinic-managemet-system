using Clinic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Repository
{
    interface IClinicRepository
    {
        Boolean GetLoginUse(string use);
        Boolean GetLoginPwd(string use, string Pwd);
        ForTest GetInfor(int id);
        IEnumerable<ForTest> GetInfList();
        Boolean PostRegister(string use, string pwd);
        Boolean DeleteInfor(int id);

    }
}