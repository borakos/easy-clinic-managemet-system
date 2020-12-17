using System;
using System.Collections.Generic;
using System.Linq;
using Clinic.Controllers;
using Clinic.Models;
using Clinic.Repository;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Clinic.Tests
{
    [TestClass]
    public class UnitTest1
    {
        static readonly ClinicController controller = new ClinicController();

        [TestMethod]
        public void TestGetLoginResult()
        {
            Assert.AreEqual(controller.GetLoginResult("Nissan", "nesd123"), "Login success");
            Assert.AreEqual(controller.GetLoginResult("Ni", "nesd123"), "User name can't find");
            Assert.AreEqual(controller.GetLoginResult("Nissan", "123"), "Password error");
        }

        [TestMethod]
        public void TestGetInformation()
        {
            Assert.AreEqual(controller.GetInformation(1).pwd, "nesd123");
            Assert.AreEqual(controller.GetInformation(1).usename, "Nissan");
        }

        [TestMethod]
        public void TestGetReservationList()
        {
            Assert.AreEqual(controller.GetReservationList().Count(), 1);
            Assert.AreEqual(controller.GetReservationList().First().usename, "Nissan");
            Assert.AreEqual(controller.GetReservationList().First().pwd, "nesd123");
        }

        [TestMethod]
        public void TestGetPharmacyInformation()
        {
            Assert.AreEqual(controller.GetPharmacyInformation().Count(), 1);
            Assert.AreEqual(controller.GetPharmacyInformation().First().usename, "Nissan");
            Assert.AreEqual(controller.GetPharmacyInformation().First().pwd, "nesd123");
        }

        [TestMethod]
        public void TestPostRegister()
        {
            controller.PostRegister("Simon","mmebe");
            Assert.AreEqual(controller.GetPharmacyInformation().Count(), 2);
            Assert.AreEqual(controller.GetPharmacyInformation().ElementAt(1).usename, "Simon");
            Assert.AreEqual(controller.GetPharmacyInformation().ElementAt(1).pwd, "mmebe");
        }

        [TestMethod]
        public void TestPostInformation()
        {
            controller.PostInformation("Landy", "ff1416");
            Assert.AreEqual(controller.GetPharmacyInformation().Count(), 3);
            Assert.AreEqual(controller.GetPharmacyInformation().ElementAt(2).usename, "Landy");
            Assert.AreEqual(controller.GetPharmacyInformation().ElementAt(2).pwd, "ff1416");
        }

        [TestMethod]
        public void TestPostReservation()
        {
            controller.PostReservation("Mecky", "xiaoxin");
            Assert.AreEqual(controller.GetPharmacyInformation().Count(), 4);
            Assert.AreEqual(controller.GetPharmacyInformation().ElementAt(3).usename, "Mecky");
            Assert.AreEqual(controller.GetPharmacyInformation().ElementAt(3).pwd, "xiaoxin");
        }

        [TestMethod]
        public void TestDeleteUser()
        {
            controller.DeleteUser(1);
            Assert.AreEqual(controller.GetPharmacyInformation().Count(), 3);
            Assert.AreEqual(controller.GetPharmacyInformation().First().usename, "Simon");
            Assert.AreEqual(controller.GetPharmacyInformation().First().pwd, "mmebe");
        }

        [TestMethod]
        public void TestDeleteReservation()
        {
            controller.DeleteReservation(2);
            Assert.AreEqual(controller.GetPharmacyInformation().Count(), 2);
            Assert.AreEqual(controller.GetPharmacyInformation().First().usename, "Landy");
            Assert.AreEqual(controller.GetPharmacyInformation().First().pwd, "ff1416");
        }

        [TestMethod]
        public void TestDeletePharmacy()
        {
            controller.DeletePharmacy(3);
            Assert.AreEqual(controller.GetPharmacyInformation().Count(), 1);
            Assert.AreEqual(controller.GetPharmacyInformation().First().usename, "Mecky");
            Assert.AreEqual(controller.GetPharmacyInformation().First().pwd, "xiaoxin");
        }

    }
}
