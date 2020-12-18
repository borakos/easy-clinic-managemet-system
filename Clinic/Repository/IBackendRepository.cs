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
        Boolean deletePharmacy(int id);
        Pharmacy GetPharmacy(int id);
        Boolean CreatDoctor(Doctor doctor);
        Boolean UpdateDoctor(Doctor doctor);
        List<Doctor> getAllDoctor();
        List<Doctor> getFilterDoctor(string filter);
        Boolean deleteDoctor(int id);
        Doctor getDoctor(int id);
        Boolean UpdatePatient(Patient patient);
        Boolean CreatPatient(Patient patient, bool isAccepted = false);
        List<Patient> getAllPatient();
        Boolean deletePatient(int id);
        Patient getPatient(int id);
        List<Patient> patientApplicants();
        Boolean acceptPatient(int id);
        Boolean denyPatient(int id);
        Boolean createAppointments(Appoinment appoinment);
        Role getUserRoleByName(string username);
        int getUserIdByName(string username);
        AppoinmentEvent[] GetAppoinmentEventsByDoctors(int[] doctorIds);
    }
}