using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Models
{
    public class AuthInfo
    {
        public string userName { get; set; }
        public List<string> Roles { get; set; }
        public bool IsAdmin { get; set; }
    }
}