using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Models
{
    public class AppoinmentEvent
    {
        public int id { get; set; }
        public string label { get; set; }
        public bool isFree { get; set; }
        public bool isAccepted { get; set; }
        public DateTime start { get; set; }
        public DateTime end { get; set; }
    }
}