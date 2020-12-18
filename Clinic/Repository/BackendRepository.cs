using Clinic.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
            //login.Add(new LoginRequest { userName = "admin", password = "admin" });
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
            return LinqToSQL.checkPassword(username, password);
        }

        //check username can use or not
        public bool IsUserUnique(string username) {
            return LinqToSQL.getUserTypeByName(username) == Role.none;
        }

        //get the role of the user
        public Role getUserRoleByName(string username) {
            return LinqToSQL.getUserTypeByName(username);
        }

        //get the id of the user
        public int getUserIdByName(string username) {
            return LinqToSQL.getUserIdByName(username);
        }

        //create new Pharmacy
        public Boolean CreatPharmacy(Pharmacy pharmacy) {
            PHARMACISTS newPHARMACISTS = new PHARMACISTS();
            newPHARMACISTS.support_delivery = pharmacy.supportDelivery;
            var result = true;
            if (login.Exists(t => t.userName == pharmacy.userName))
            {
                result = false;
            }
            else {
                LinqToSQL.insert2PHARMACIST(newPHARMACISTS);
                listp.Add(pharmacy);
                login.Add(new LoginRequest { userName = pharmacy.userName, password = pharmacy.password });
            }
            return result;
        }

        //update new Pharmacy
        public Boolean UpdatePharmacy(Pharmacy pharmacy) {
            var result = false;
            var l = new LoginRequest();

            PHARMACISTS updatePHARMACISTS = new PHARMACISTS();
            LinqToSQL.updatePHARMACIST(pharmacy.id, updatePHARMACISTS);

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
            if(LinqToSQL.deletePHARMACIST(id))
                result = true;
            //listp.ForEach(c => {
            //    if (c.id == id) {
            //        listp.Remove(c);
            //        result = true;
            //    }
            //});
            return result;
        }

        // get a pharmacy by id
        public Pharmacy GetPharmacy(int id) {
            
            Pharmacy p = new Pharmacy();

            PHARMACISTS selectPHA = LinqToSQL.selectPHARMACISTByID(id);
            p.id = selectPHA.id;
            p.nativeName = selectPHA.native_name;



            //listp.ForEach(c => {
            //    if (c.id == id) {
            //        p = c;
            //    }
            //});

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
                //listd.Add(doctor);
                DOCTORS newDOC = new DOCTORS();
                //newDOC.id = doctor.id;
                newDOC.native_name = doctor.nativeName;
                LinqToSQL.insert2doctors(newDOC);

                login.Add(new LoginRequest { userName = doctor.userName, password = doctor.password });
            }
            return result;
        }

        //update a doctor
        public Boolean UpdateDoctor(Doctor doctor)
        {
            var result = false;
            var l = new LoginRequest();

            DOCTORS updateDOC = new DOCTORS();
            //updateDOC.id = doctor.id;
            updateDOC.native_name = doctor.nativeName;
            if (LinqToSQL.updateDoc(doctor.id, updateDOC))
                result = true;

            //listd.ForEach(c =>
            //{
            //    if (c.userName == doctor.userName)
            //    {
            //        listd.Insert(listd.IndexOf(c),doctor);
            //        result = true;
            //    }
            //});
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
            var docts = LinqToSQL.getDoctors();
            List<Doctor> doctors = new List<Doctor>();
            foreach(var doct in docts) {
                var specs = LinqToSQL.getSpecializationsByDoctorId(doct.id);
                List<string> specilizations = new List<string>();
                foreach(var spec in specs) {
                    specilizations.Add(spec.name);
                }
                if (doct.native_name.Contains(filter) || (String.Join(",", specilizations).Contains(filter))) {
                    doctors.Add(new Doctor() {
                        id = doct.id,
                        gender = (Gender)Enum.Parse(typeof(Gender), doct.gender, true),
                        birthday = doct.birthday ?? new DateTime(),
                        startOfPractice = doct.start_year_of_work ?? new DateTime(),
                        specializations = specilizations.ToArray(),
                        nativeName = doct.native_name,
                        userName = doct.user_name
                    });
                }
            }
            return doctors;
        }

        public AppoinmentEvent[] GetAppoinmentEventsByDoctors(int[] doctorIds) {
            List<int> ids = new List<int>(doctorIds);
            var openTimes = LinqToSQL.selectAppointmentEventByDoctorIds(ids);
            Debug.WriteLine(openTimes.Count());
            List<AppoinmentEvent> appointments = new List<AppoinmentEvent>();
            foreach(var opt in openTimes) {
                var doct = LinqToSQL.selectDocByID(opt.doctor_id ?? -1);
                if(doct != null) {
                    appointments.Add(new AppoinmentEvent() {
                        id = opt.id,
                        label = doct.native_name,
                        isAccepted = opt.is_accepted ?? false,
                        isFree = opt.is_free ?? false,
                        start = opt.start ?? new DateTime(),
                        end = opt.end ?? new DateTime()
                    });
                }
            }
            return appointments.ToArray();
        }

        //delete a doctor by id
        public Boolean deleteDoctor(int id)
        {
            var result = false;
            //listd.ForEach(c => {
            //    if (c.id == id)
            //    {
            //        result = true;
            //        listd.Remove(c);
            //        return;
            //    }
            //});
            if (LinqToSQL.deleteDoc(id))
                result = true;
            

            return result;
        }

        //get a doctor by id
        public Doctor getDoctor(int id) {
            Doctor p = new Doctor();

            DOCTORS selectDoc = LinqToSQL.selectDocByID(id);
            p.nativeName = selectDoc.native_name;
            p.userName = selectDoc.user_name;

            //listd.ForEach(c => {
            //    if (c.id == id)
            //    {
            //        p = c;
            //        return;
            //    }
            //});

            return p;
        }

        //create a patient
        public Boolean CreatPatient(Patient patient, bool isAccepted = false)
        {
            var result = true;
            if (!IsUserUnique(patient.userName))
            {
                result = false;
            }
            else
            {
                //listpa.Add(patient);

                PATIENTS newPatient = new PATIENTS();
                newPatient.user_name = patient.userName;
                newPatient.native_name = patient.nativeName;
                newPatient.password = patient.password;
                newPatient.gender = patient.gender.ToString();
                newPatient.birthday = patient.birthday;
                newPatient.weight = patient.weight;
                newPatient.country = patient.country;
                newPatient.city = patient.city;
                newPatient.postal_code = patient.postalCode;
                newPatient.address = patient.address;
                newPatient.is_accepted = isAccepted;
                LinqToSQL.insert2patient(newPatient);
                //login.Add(new LoginRequest { userName = patient.userName, password = patient.password });
            }
            return result;
        }

        //update a patient
        public Boolean UpdatePatient(Patient patient)
        {
            PATIENTS newPatient = new PATIENTS();
            newPatient.user_name = patient.userName;
            newPatient.native_name = patient.nativeName;
            newPatient.password = patient.password;
            newPatient.gender = patient.gender.ToString();
            newPatient.birthday = patient.birthday;
            newPatient.weight = patient.weight;
            newPatient.country = patient.country;
            newPatient.city = patient.city;
            newPatient.postal_code = patient.postalCode;
            newPatient.address = patient.address;
            newPatient.is_accepted = true;
            return LinqToSQL.updatePatientById(patient.id, newPatient);
        }

        //get all patients
        public List<Patient> getAllPatient() {
            List<PATIENTS> dataBasePatients = LinqToSQL.getAllPatients();
            List<Patient> patients = new List<Patient>();
            foreach(PATIENTS pat in dataBasePatients) {
                patients.Add(new Patient() {
                    id = pat.id,
                    userName = pat.user_name,
                    nativeName = pat.native_name,
                    gender = (Gender)Enum.Parse(typeof(Gender), pat.gender, true),
                    birthday = pat.birthday ?? new DateTime(),
                    weight = pat.weight ?? 0,
                    country = pat.country ?? "",
                    city = pat.city ?? "",
                    postalCode = pat.postal_code ?? 0,
                    address = pat.address ?? "",
                    hasMedicalData = pat.medical_form_path != null,
                    medicalDataPath = pat.medical_form_path
                });
            }
            return patients;
        }

        //delete a patient by id
        public Boolean deletePatient(int id)
        {
            return LinqToSQL.deletePatient(id);
        }

        //get a patient by id
        public Patient getPatient(int id)
        {
            PATIENTS pat = LinqToSQL.selectPatientById(id);
            return new Patient() {
                id = pat.id,
                userName = pat.user_name,
                nativeName = pat.native_name,
                gender = (Gender)Enum.Parse(typeof(Gender), pat.gender, true),
                birthday = pat.birthday ?? new DateTime(),
                weight = pat.weight ?? 0,
                country = pat.country ?? "",
                city = pat.city ?? "",
                postalCode = pat.postal_code ?? 0,
                address = pat.address ?? "",
                hasMedicalData = pat.medical_form_path != null,
                medicalDataPath = pat.medical_form_path
            };
        }

        //get patients whose registration is not yet accepted
        public List<Patient> patientApplicants() {
            List<PATIENTS> dataBasePatients = LinqToSQL.getAllUserApplication();
            List<Patient> patients = new List<Patient>();
            foreach (PATIENTS pat in dataBasePatients) {
                patients.Add(new Patient() {
                    id = pat.id,
                    userName = pat.user_name,
                    nativeName = pat.native_name,
                    gender = (Gender)Enum.Parse(typeof(Gender), pat.gender, true),
                    birthday = pat.birthday ?? new DateTime(),
                    weight = pat.weight ?? 0,
                    country = pat.country ?? "",
                    city = pat.city ?? "",
                    postalCode = pat.postal_code ?? 0,
                    address = pat.address ?? "",
                    hasMedicalData = pat.medical_form_path != null,
                    medicalDataPath = pat.medical_form_path
                });
            }
            return patients;
        }

        //check the patient if accept by id
        public Boolean acceptPatient(int id) {
            return LinqToSQL.acceptPatient(id);
        }

        //check the patient if denied
        public Boolean denyPatient(int id)
        {
            return LinqToSQL.deletePatient(id);
        }

        //create a appoinment
        public Boolean createAppointments(Appoinment appoinment)
        {
            //lista.Add(appoinment);
            APPLICATIONS newAPPLICATIONS = new APPLICATIONS();
            //newAPPLICATIONS.doctor_id= appoinment.

            LinqToSQL.insert2applications(newAPPLICATIONS);
            
            return true;
        }

    }
}