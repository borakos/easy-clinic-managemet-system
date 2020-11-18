using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Models
{
    public class Doctor:Basic
    {
        public DateTime birthday { get; set; }
        public DateTime startOfPractice { get; set; }
        public Gender gender { get; set; }
    }
}