using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Models
{
    public class Pharmacy:SecondBasic
    {
        public Boolean supportDelivery { get; set; }
        public Boolean supportPreOrder { get; set; }
    }
}