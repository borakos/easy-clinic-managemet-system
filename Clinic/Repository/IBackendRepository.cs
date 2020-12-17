using Clinic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic.Repository
{
    public interface IBackendRepository
    {
        Boolean checkUser(string username);
        Boolean checkPass(string userName, string password);
        Boolean IsUserUnique(string username);
        Boolean CreatPharmacy(Pharmacy pharmacy);
        Boolean UpdatePharmacy(Pharmacy pharmacy);
        List<Pharmacy> getAllPharmacy();
        Boolean deletePharmacy(string id);
        Pharmacy GetPharmacy(string id);
        Boolean CreatDoctor(Doctor doctor);
        Boolean UpdateDoctor(Doctor doctor);
        List<Doctor> getAllDoctor();
        List<Doctor> getFilterDoctor(string filter);
        Boolean deleteDoctor(string id);
        Doctor getDoctor(string id);
        Boolean UpdatePatient(Patient patient);
        Boolean CreatPatient(Patient patient);
        List<Patient> getAllPatient();
        Boolean deletePatient(string id);
        Patient getPatient(string id);
        List<Patient> patientApplicants();
        Boolean acceptPatient(string id);
        Boolean denyPatient(string id);
        Boolean createAppointments(Appoinment appoinment);
    }
}