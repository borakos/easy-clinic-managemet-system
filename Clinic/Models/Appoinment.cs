using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Models
{
    public class Appoinment
    {
        public string description { get; set; }
        public string eventId { get; set; }
        public Boolean preferOnline { get; set; }
    }
}