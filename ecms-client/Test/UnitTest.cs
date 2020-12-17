
using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using easy_clinic_managemet_system.programmer;
using easy_clinic_managemet_system.model;

namespace Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            var Testl = new List<UsernamePassword>();
            Boolean r = true;
            String user = "Jiang";
            String pass = "nsns";
            var re = RegisterLogin.CheckUsername(user,Testl);
            Assert.AreEqual(re, r);
            Assert.AreEqual(RegisterLogin.Register(user,pass,Testl).Count,1);
            re = RegisterLogin.CheckUsername(user, Testl);
            Assert.AreEqual(re, false);
            var real = Testl[0].Password;
            var fal = RegisterLogin.MD5Password("psps");
            Assert.AreEqual(RegisterLogin.Login(pass,real),true);
            Assert.AreEqual(RegisterLogin.Login(pass, fal), false);
        }


    }
}
