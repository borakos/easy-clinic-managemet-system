using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Models
{
    public class SecondBasic : Basic
    {
        public string country { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public int postalCode { get; set; }

    }
}