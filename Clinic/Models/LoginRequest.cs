using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Models
{
    public class LoginRequest
    {
        public string userName { get; set; }
        public string password { get; set; }
    }
}