using Clinic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Repository
{
    public class BackendRepository : IBackendRepository
    {
        private List<LoginRequest> login = new List<LoginRequest>();
        private List<Pharmacy> listp = new List<Pharmacy>();
        private List<Doctor> listd = new List<Doctor>();
        private List<Patient> listpa = new List<Patient>();
        private List<Appoinment> lista = new List<Appoinment>();

        public BackendRepository() {
            login.Add(new LoginRequest { userName = "admin", password = "admin" });
        }
        //check username
        public Boolean checkUser(string username) {
            var result = false;
            if(login.Exists(t => t.userName == username)){
                result = true;
            }
            return result;
        }

        //check password
        public Boolean checkPass(string username, string password) {
            var result = false;
            if (login.Exists(t => t.userName == username && t.password == password))
            {
                result = true;
            }
            return result;
        }
        //check username can use or not
        public Boolean IsUserUnique(string username) {
            var result = true;
            if (login.Exists(t => t.userName == username))
            {
                result = false;
            }
            return result;
        }

        //creat new Pharmacy
        public Boolean CreatPharmacy(Pharmacy pharmacy) {
            var result = true;
            if (login.Exists(t => t.userName == pharmacy.userName))
            {
                result = false;
            }
            else {
                listp.Add(pharmacy);
                login.Add(new LoginRequest { userName = pharmacy.userName, password = pharmacy.password });
            }
            return result;
        }

        //update new Pharmacy
        public Boolean UpdatePharmacy(Pharmacy pharmacy) {
            var result = false;
            var l = new LoginRequest();
            listp.ForEach(c =>
            {
                if (c.userName == pharmacy.userName)
                {
                    listp.Insert(listp.IndexOf(c), pharmacy);
                    result = true;
                }
            });
            login.ForEach(c =>
            {
                if (c.userName == pharmacy.userName)
                {
                    l.userName = c.userName;
                    l.password = c.password;
                    login.Insert(login.IndexOf(c), l);
                }
            });
            return result;
        }

        //get all pharmacy
        public List<Pharmacy> getAllPharmacy() {
            return listp;
        }

        //delete pharmacy by id
        public Boolean deletePharmacy(int id) {
            var result = false;
            listp.ForEach(c => {
                if (c.id == id) {
                    listp.Remove(c);
                    result = true;
                }
            });
            return result;
        }

        // get a pharmacy by id
        public Pharmacy GetPharmacy(int id) {
            Pharmacy p = new Pharmacy();
            listp.ForEach(c => {
                if (c.id == id) {
                    p = c;
                }
            });

            return p;
        }

        //create a doctor
        public Boolean CreatDoctor(Doctor doctor)
        {
            var result = true;
            if (login.Exists(t => t.userName == doctor.userName))
            {
                result = false;
            }
            else
            {
                listd.Add(doctor);
                login.Add(new LoginRequest { userName = doctor.userName, password = doctor.password });
            }
            return result;
        }

        //update a doctor
        public Boolean UpdateDoctor(Doctor doctor)
        {
            var result = false;
            var l = new LoginRequest();
            listd.ForEach(c =>
            {
                if (c.userName == doctor.userName)
                {
                    listd.Insert(listd.IndexOf(c),doctor);
                    result = true;
                }
            });
            login.ForEach(c =>
            {
                if (c.userName == doctor.userName)
                {
                    l.userName = c.userName;
                    l.password = c.password;
                    login.Insert(login.IndexOf(c), l);
                }
            });
            return result;
        }

        //get all doctor
        public List<Doctor> getAllDoctor() {
            return listd;
        }

        //get doctors by filter
        public List<Doctor> getFilterDoctor(string filter) {
            return listd;
        }

        //delete a doctor by id
        public Boolean deleteDoctor(int id)
        {
            var result = false;
            listd.ForEach(c => {
                if (c.id == id)
                {
                    listd.Remove(c);
                    result = true;
                }
            });
            return result;
        }

        //get a doctor by id
        public Doctor getDoctor(int id) {
            Doctor p = new Doctor();
            listd.ForEach(c => {
                if (c.id == id)
                {
                    p = c;
                }
            });

            return p;
        }

        //create a patient
        public Boolean CreatPatient(Patient patient)
        {
            var result = true;
            if (login.Exists(t => t.userName == patient.userName))
            {
                result = false;
            }
            else
            {
                listpa.Add(patient);
                login.Add(new LoginRequest { userName = patient.userName, password = patient.password });
            }
            return result;
        }

        //update a patient
        public Boolean UpdatePatient(Patient patient)
        {
            var result = false;
            var l = new LoginRequest();
            listpa.ForEach(c =>
            {
                if (c.userName == patient.userName)
                {
                    listpa.Insert(listpa.IndexOf(c), patient);
                    result = true;
                }
            });
            login.ForEach(c =>
            {
                if (c.userName == patient.userName)
                {
                    l.userName = c.userName;
                    l.password = c.password;
                    login.Insert(login.IndexOf(c), l);
                }
            });
            return result;
        }

        //get all patients
        public List<Patient> getAllPatient() {
            return listpa;
        }

        //delete a patient by id
        public Boolean deletePatient(int id)
        {
            var result = false;
            listpa.ForEach(c => {
                if (c.id == id)
                {
                    listpa.Remove(c);
                    result = true;
                }
            });
            return result;
        }

        //get a patient by id
        public Patient getPatient(int id)
        {
            Patient p = new Patient();
            listpa.ForEach(c => {
                if (c.id == id)
                {
                    p = c;
                }
            });

            return p;
        }

        //get patients whose registration is not yet accepted
        public List<Patient> patientApplicants() {
            return listpa;
        }

        //check the patient if accept by id
        public Boolean acceptPatient(int id) {
            var result = false;
            listpa.ForEach(c =>
            {
                if (c.id == id && c.registration == true)
                {
                    result = true;
                }
            });
            return result;
        }

        //check the patient if denied
        public Boolean denyPatient(int id)
        {
            var result = false;
            listpa.ForEach(c =>
            {
                if (c.id == id && c.registration == false)
                {
                    result = true;
                }
            });
            return result;
        }

        //create a appoinment
        public Boolean createAppointments(Appoinment appoinment)
        {
            lista.Add(appoinment);
            return true;
        }

    }
}