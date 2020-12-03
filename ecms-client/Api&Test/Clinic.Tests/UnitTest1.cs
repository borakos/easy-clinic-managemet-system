using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;
using Clinic.Controllers;
using Clinic.Models;
using Clinic.Repository;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Clinic.Tests
{
    [TestClass]
    public class UnitTest1
    {
        static IBackendRepository ib = new BackendRepository();
        appointmentsController a = new appointmentsController(ib);
        authController ac = new authController(ib);
        doctorsController dc = new doctorsController(ib);
        patientsController pc = new patientsController(ib);
        pharmaciesController p = new pharmaciesController(ib);
        [TestMethod]
        public void TestappointmentsControllerListForPatientSelect()
        {
            var re = a.listForPatientSelect();
            Assert.IsInstanceOfType(re, typeof(OkResult));
        }

        [TestMethod]
        public void TestappointmentsControllerCreate() {
            Appoinment ap = new Appoinment();
            ap.preferOnline = true;
            var re = a.create(ap);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true,result.Content);
        }

        [TestMethod]
        public void TestauthDoctorsControllerCreate()
        {
            Doctor ap = new Doctor();
            ap.userName = "xxm";
            ap.id = 1;
            var re = dc.create(ap);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true, result.Content);
        }

        /*[TestMethod]
        public void TestauthDoctorsControllerUpdate() {
            Doctor ap = new Doctor();
            ap.userName= "xxm";
            ap.nativeName = "Chen";
            var re = dc.create(ap);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true, result.Content);
        }*/

        [TestMethod]
        public void TestauthDoctorsControllerFree()
        {
            var re = dc.free("sss");
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true, result.Content);
            re = dc.free("xxm");
            result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(false, result.Content);
        }

        [TestMethod]
        public void TestauthDoctorsControllerGetAllDoctor()
        {
            var re = dc.getAllDoctor();
            var result = re as OkNegotiatedContentResult<List<Doctor>>;
            Assert.AreEqual(1, result.Content[0].id);
        }

        [TestMethod]
        public void TestauthDoctorsControllerFilter()
        {
            var re = dc.filter("xxm");
            var result = re as OkNegotiatedContentResult<List<Doctor>>;
            Assert.AreEqual(1, result.Content[0].id);
        }

        [TestMethod]
        public void TestauthDoctorsControllerGetdoctor()
        {
            var re = dc.getDoctor(1);
            var result = re as OkNegotiatedContentResult<Doctor>;
            Assert.AreEqual("xxm", result.Content.userName);
        }
        /*
        [TestMethod]
        public void TestauthDoctorsControllerDelete()
        {
            var re = dc.delete(1);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(false, result.Content);
        }*/

        [TestMethod]
        public void TestauthPatientsControllerCreate()
        {
            Patient ap = new Patient();
            ap.userName = "ff14";
            ap.id = 1;
            ap.registration = true;
            var re = pc.create(ap);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true, result.Content);
        }

        /*[TestMethod]
        public void TestauthDoctorsControllerUpdate() {
            Doctor ap = new Doctor();
            ap.userName= "xxm";
            ap.nativeName = "Chen";
            var re = pc.create(ap);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true, result.Content);
        }*/

        [TestMethod]
        public void TestauthPatientsControllerFree()
        {
            var re = pc.free("sss");
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true, result.Content);
            re = pc.free("ff14");
            result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(false, result.Content);
        }

        [TestMethod]
        public void TestauthPatientsControllerGetAllPatient()
        {
            var re = pc.getAllPatient();
            var result = re as OkNegotiatedContentResult<List<Patient>>;
            Assert.AreEqual(1, result.Content.Count);
        }

        [TestMethod]
        public void TestauthPatientsControllerGetPatient()
        {
            var re = pc.getPatient(1);
            var result = re as OkNegotiatedContentResult<Patient>;
            Assert.AreEqual("ff14", result.Content.userName);
        }
        /*
        [TestMethod]
        public void TestauthDoctorsControllerDelete()
        {
            var re = pc.delete(1);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(false, result.Content);
        }*/

        [TestMethod]
        public void TestauthPatientsControllerApplicants()
        {
            var re = pc.applicants();
            var result = re as OkNegotiatedContentResult<List<Patient>>;
            Assert.AreEqual(1, result.Content.Count);
        }

        [TestMethod]
        public void TestauthPatientsControllerAcceptPatient()
        {
            var re = pc.acceptPatient(1);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true, result.Content);
        }

        [TestMethod]
        public void TestauthPatientsControllerDenyPatient()
        {
            var re = pc.denyPatient(1);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(false, result.Content);
        }

        [TestMethod]
        public void TestauthPharmaciesControllerCreate()
        {
            Pharmacy ap = new Pharmacy();
            ap.userName = "eee";
            ap.id = 1;
            var re = p.create(ap);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true, result.Content);
        }

        /*[TestMethod]
        public void TestauthDoctorsControllerUpdate() {
            Pharmacy ap = new Pharmacy();
            ap.userName= "eee";
            var re = p.create(ap);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true, result.Content);
        }*/

        [TestMethod]
        public void TestauthPharmaciesControllerFree()
        {
            var re = p.free("sss");
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(true, result.Content);
            re = p.free("eee");
            result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(false, result.Content);
        }

        [TestMethod]
        public void TestauthPharmaciesControllerGetAllPatient()
        {
            var re = p.getAllPharmacy();
            var result = re as OkNegotiatedContentResult<List<Pharmacy>>;
            Assert.AreEqual(1, result.Content.Count);
        }

        [TestMethod]
        public void TestauthPharmaciesControllerGetPatient()
        {
            var re = p.getPharmacy(1);
            var result = re as OkNegotiatedContentResult<Pharmacy>;
            Assert.AreEqual("eee", result.Content.userName);
        }
        /*
        [TestMethod]
        public void TestauthDoctorsControllerDelete()
        {
            var re = p.delete(1);
            var result = re as OkNegotiatedContentResult<bool>;
            Assert.AreEqual(false, result.Content);
        }*/

    }
}
