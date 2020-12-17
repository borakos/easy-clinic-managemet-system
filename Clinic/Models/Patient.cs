using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Models
{
    public class Patient:SecondBasic
    {
        public Gender gender { get; set; }
        public DateTime birthday { get; set; }
        public double weight { get; set; }
        public Boolean hasMedicalData { get; set; }
        public string medicalDataPath { get; set; }
        public Boolean registration { get; set; }
    }
}