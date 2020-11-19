using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Models
{
    public class Basic: LoginRequest
    {
        public int id { get; set; }
        public string nativeName { get; set; }
        public string email { get; set; }
    }
}