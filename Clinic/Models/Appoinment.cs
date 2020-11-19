using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Models
{
    public class Appoinment
    {
        public string description { get; set; }
        public int eventId { get; set; }
        public Boolean preferOnline { get; set; }
    }
}