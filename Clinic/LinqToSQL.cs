using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Clinic
{
    public class LinqToSQL
    {

        
        /// <summary>
        /// SYSTEM_ADMINS
        /// </summary>
        public static SYSTEM_ADMINS selectByusername(string str_username)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            //Get selected user            
            SYSTEM_ADMINS selectADM = db.SYSTEM_ADMINS.FirstOrDefault(e => e.username.Equals(str_username));

            return selectADM;

        }

        public static void insert2admin(SYSTEM_ADMINS newADM)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            /*
            //Create new user
            SYSTEM_ADMINS newADM = new SYSTEM_ADMINS();
            newADM.id = "001";
            newADM.username = "John";
            newADM.native_name = "Jo";
            newADM.password = "test123";
            */
            //add newADM to database 
            db.SYSTEM_ADMINS.InsertOnSubmit(newADM);

            db.SubmitChanges();

        }

        public static void updateadmin(string str_username, SYSTEM_ADMINS newADM)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get Employee for update
            SYSTEM_ADMINS oldADM = db.SYSTEM_ADMINS.FirstOrDefault(e => e.username.Equals(str_username));

            oldADM = newADM;

            //Save changes to Database.
            db.SubmitChanges();

            ////Get Updated DOCTORS            
            //SYSTEM_ADMINS updatedADM = db.SYSTEM_ADMINS.FirstOrDefault(e => e.username.Equals("john"));


        }

        public static void deleteadmin(string str_username)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get ADM to Delete
            SYSTEM_ADMINS deleteADM = db.SYSTEM_ADMINS.FirstOrDefault(e => e.username.Equals(str_username));

            //Delete ADM
            db.SYSTEM_ADMINS.DeleteOnSubmit(deleteADM);

            //Save changes to Database.
            db.SubmitChanges();
        }

        /// <summary>
        /// DOCTORS
        /// </summary>
        /// 

        public static DOCTORS selectDocByID(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            //Get selected user            
            DOCTORS selectDoc = db.DOCTORS.FirstOrDefault(e => e.id.Equals(str_id));

            return selectDoc;

        }
        public static void insert2doctors(DOCTORS newDOCTORS)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            /*
            //Create new Doctor
            DOCTORS newDOCTORS = new DOCTORS();
            newDOCTORS.id = "001";
            newDOCTORS.user_name = "John";
            newDOCTORS.native_name = "Doc.John";
            newDOCTORS.password = "123";
            newDOCTORS.gender = "M";
            newDOCTORS.age = 23;
            newDOCTORS.start_year_of_work = 2014;
            */
            //Add new DOCTORS to database
            db.DOCTORS.InsertOnSubmit(newDOCTORS);

            //Save changes to Database.
            db.SubmitChanges();

            //Get new Inserted Employee            
            //DOCTORS insertedEmployee = db.DOCTORS.FirstOrDefault(e => e.user_name.Equals("Michael"));

        }

        public static bool updateDoc(string str_id, DOCTORS newDOCTORS)
        {
            bool result = true;
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            try
            {
                //Get DOCTORS for update
                DOCTORS oldDOCTORS = db.DOCTORS.FirstOrDefault(e => e.id.Equals(str_id));

                oldDOCTORS = newDOCTORS;

                //Save changes to Database.
                db.SubmitChanges();
            }
            catch
            {
                result = false;
            }
            return result;
        }

        public static bool deleteDoc(string str_username)
        {
            bool result = false;
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            try { 
                //Get DOCTORS to Delete
                DOCTORS deleteDoctor = db.DOCTORS.FirstOrDefault(e => e.user_name.Equals(str_username));

                //Delete DOCTORS
                db.DOCTORS.DeleteOnSubmit(deleteDoctor);

                //Save changes to Database.
                db.SubmitChanges();

                result = true;
            }
            catch(Exception exc)
            {
                result = false;
            }
            return result;
        }

        /// <summary>
        /// PATIENTS
        /// </summary>

        public static PATIENTS selectPatientById(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            //Get selected user            
            PATIENTS selectPAT = db.PATIENTS.FirstOrDefault(e => e.id.Equals(str_id));

            return selectPAT;

        }

        public static void insert2patient(PATIENTS newPatient)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            /*
            //Create new patent
            PATIENT newPatient = new PATIENT();
            newPatient.id = "001";
            newPatient.user_name = "John";
            newPatient.native_name = "Doc.John";
            newPatient.password = "123";
            newPatient.gender = "M";
            newPatient.age = 23;
            newPatient.weight = 2014;
            newPatient.country = "China";
            newPatient.city = "SH";
            newPatient.postal_code = "123456";
            newPatient.address = "Budapest";
            */
            //Add new patient to database
            db.PATIENTS.InsertOnSubmit(newPatient);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static bool updatePatientById(string str_id, PATIENTS newPatient)
        {
            bool result = true;
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            try
            {
                //Get Patient for update
                PATIENTS oldPatient = db.PATIENTS.FirstOrDefault(e => e.id.Equals(str_id));

                oldPatient = newPatient;

                //Save changes to Database.
                db.SubmitChanges();
            }
            catch
            {
                result = false;
            }
            return result;
        }

        public static bool deletePatient(string str_id)
        {
            bool result = true;
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            try { 
                //Get PATIENT to Delete
                PATIENTS deletePATIENT = db.PATIENTS.FirstOrDefault(e => e.id.Equals(str_id));

                //Delete PATIENT
                db.PATIENTS.DeleteOnSubmit(deletePATIENT);

                //Save changes to Database.
                db.SubmitChanges();
            }
            catch
            {
                result = false;
            }
            return result;
        }

        ///<summary>
        ///APPLICATIONS
        /// </summary>
        public static void insert2applications(APPLICATIONS newAPPLICATIONS)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Add new APPLICATIONS to database
            db.APPLICATIONS.InsertOnSubmit(newAPPLICATIONS);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void updateAPPLICATIONS(string str_id, APPLICATIONS newapplication)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get application for update
            APPLICATIONS oldapplication = db.APPLICATIONS.FirstOrDefault(e => e.id.Equals(str_id));

            oldapplication = newapplication;

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void deleteapplication(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get APPLICATIONS to Delete
            APPLICATIONS deleteAPPLICATIONS = db.APPLICATIONS.FirstOrDefault(e => e.id.Equals(str_id));

            //Delete APPLICATIONS
            db.APPLICATIONS.DeleteOnSubmit(deleteAPPLICATIONS);

            //Save changes to Database.
            db.SubmitChanges();

        }


        ///<summary>
        ///EXAMINATIONS
        /// </summary>
        public static void insert2examination(EXAMINATIONS newExamination)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Add new EXAMINATIONS to database
            db.EXAMINATIONS.InsertOnSubmit(newExamination);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void updateexamination(string str_id, EXAMINATIONS newExamination)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get EXAMINATIONS for update
            EXAMINATIONS oldExamination = db.EXAMINATIONS.FirstOrDefault(e => e.id.Equals(str_id));

            oldExamination = newExamination;

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void deleteexamination(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get EXAMINATIONS to Delete
            EXAMINATIONS deleteEXAMINATIONS = db.EXAMINATIONS.FirstOrDefault(e => e.id.Equals(str_id));

            //Delete EXAMINATIONS
            db.EXAMINATIONS.DeleteOnSubmit(deleteEXAMINATIONS);

            //Save changes to Database.
            db.SubmitChanges();
        }

        ///<summary>
        ///DOCTOR_OPENTIMES
        /// </summary>
        public static void insert2doctimes(DOCTOR_OPENTIMES newDoctime)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Add new DOCTOR_OPENTIMES to database
            db.DOCTOR_OPENTIMES.InsertOnSubmit(newDoctime);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void updatedoctime(string str_id, DOCTOR_OPENTIMES updateDoctime)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get DOCTOR_OPENTIMES for update
            DOCTOR_OPENTIMES oldDoctime = db.DOCTOR_OPENTIMES.FirstOrDefault(e => e.id.Equals(str_id));

            oldDoctime = updateDoctime;

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void deleteDoctime(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get DOCTOR_OPENTIMES to Delete
            DOCTOR_OPENTIMES deleteDoctime = db.DOCTOR_OPENTIMES.FirstOrDefault(e => e.id.Equals(str_id));

            //Delete DOCTOR_OPENTIMES
            db.DOCTOR_OPENTIMES.DeleteOnSubmit(deleteDoctime);

            //Save changes to Database.
            db.SubmitChanges();
        }

        ///<summary>
        ///SPECIALIZATIONS
        /// </summary>
        public static void insert2speci(SPECIALIZATIONS newSpeci)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Add new SPECIALIZATIONS to database
            db.SPECIALIZATIONS.InsertOnSubmit(newSpeci);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void updatespeci(string str_id, SPECIALIZATIONS updateSpeci)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get SPECIALIZATIONS for update
            SPECIALIZATIONS oldSpeci = db.SPECIALIZATIONS.FirstOrDefault(e => e.id.Equals(str_id));

            oldSpeci = updateSpeci;

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void deletespeci(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get SPECIALIZATIONS to Delete
            SPECIALIZATIONS deleteSpeci = db.SPECIALIZATIONS.FirstOrDefault(e => e.id.Equals(str_id));

            //Delete SPECIALIZATIONS
            db.SPECIALIZATIONS.DeleteOnSubmit(deleteSpeci);

            //Save changes to Database.
            db.SubmitChanges();
        }

        ///<summary>
        ///SPECIALIZATIONS_OF_DOCTORS
        /// </summary>
        public static void insert2Docspeci(SPECIALIZATIONS_OF_DOCTORS newDocSpeci)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Add new SPECIALIZATIONS_OF_DOCTORS to database
            db.SPECIALIZATIONS_OF_DOCTORS.InsertOnSubmit(newDocSpeci);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void updateDocspeci(string str_id, SPECIALIZATIONS_OF_DOCTORS updateDocSpeci)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get SPECIALIZATIONS_OF_DOCTORS for update
            SPECIALIZATIONS_OF_DOCTORS oldDocSpeci = db.SPECIALIZATIONS_OF_DOCTORS.FirstOrDefault(e => e.id.Equals(str_id));

            oldDocSpeci = updateDocSpeci;

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void deleteDocspeci(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get SPECIALIZATIONS_OF_DOCTORS to Delete
            SPECIALIZATIONS_OF_DOCTORS deleteDocSpeci = db.SPECIALIZATIONS_OF_DOCTORS.FirstOrDefault(e => e.id.Equals(str_id));

            //Delete SPECIALIZATIONS_OF_DOCTORS
            db.SPECIALIZATIONS_OF_DOCTORS.DeleteOnSubmit(deleteDocSpeci);

            //Save changes to Database.
            db.SubmitChanges();
        }

        ///<summary>
        ///PRESCRIPTIONS
        /// </summary>
        public static void insert2Precription(PRESCRIPTIONS newPrescription)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Add new PRESCRIPTIONS to database
            db.PRESCRIPTIONS.InsertOnSubmit(newPrescription);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void updatePrecription(string str_id, PRESCRIPTIONS updatePrescription)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get PRESCRIPTIONS for update
            PRESCRIPTIONS oldPrescription = db.PRESCRIPTIONS.FirstOrDefault(e => e.id.Equals(str_id));

            oldPrescription = updatePrescription;

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void deletePrecription(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get PRESCRIPTIONS to Delete
            PRESCRIPTIONS deletePrecription = db.PRESCRIPTIONS.FirstOrDefault(e => e.id.Equals(str_id));

            //Delete PRESCRIPTIONS
            db.PRESCRIPTIONS.DeleteOnSubmit(deletePrecription);

            //Save changes to Database.
            db.SubmitChanges();
        }

        ///<summary>
        ///ORDERS
        /// </summary>
        public static void insert2Order(ORDERS newOrder)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Add new ORDERS to database
            db.ORDERS.InsertOnSubmit(newOrder);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void updatePrecription(string str_id, ORDERS updateOrder)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get ORDERS for update
            ORDERS oldOrder = db.ORDERS.FirstOrDefault(e => e.id.Equals(str_id));

            oldOrder = updateOrder;

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void deleteOrder(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get ORDERS to Delete
            ORDERS deleteOrder = db.ORDERS.FirstOrDefault(e => e.id.Equals(str_id));

            //Delete ORDERS
            db.ORDERS.DeleteOnSubmit(deleteOrder);

            //Save changes to Database.
            db.SubmitChanges();
        }

        ///<summary>
        ///PHARMACIST
        /// </summary>
        /// 

        public static PHARMACISTS selectPHARMACISTByID(string strID)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);
            //Get selected user            
            PHARMACISTS selectPHA = db.PHARMACISTS.FirstOrDefault(e => e.id.Equals(strID));

            return selectPHA;

        }
        public static void insert2PHARMACIST(PHARMACISTS newPHARMACIST)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Add new PHARMACIST to database
            db.PHARMACISTS.InsertOnSubmit(newPHARMACIST);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static bool updatePHARMACIST(string str_id, PHARMACISTS updatePHARMACIST)
        {
            bool result = false;
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            
            try{
                //Get PHARMACIST for update
                PHARMACISTS oldPHARMACIST = db.PHARMACISTS.FirstOrDefault(e => e.id.Equals(str_id));

                oldPHARMACIST = updatePHARMACIST;

                //Save changes to Database.
                db.SubmitChanges();
                result = true;
            }
            catch(Exception ex)
            {
                result = false;
            }
            return result;
        }

        public static bool deletePHARMACIST(string str_id)
        {
            bool result = false;
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get PHARMACIST to Delete
            PHARMACISTS deletePHARMACIST = db.PHARMACISTS.FirstOrDefault(e => e.id.Equals(str_id));

            try
            {
                //Delete PHARMACIST
                db.PHARMACISTS.DeleteOnSubmit(deletePHARMACIST);
                //Save changes to Database.
                db.SubmitChanges();
                result = true;
            }
            catch (Exception ex)
            {
                result = false;
            }
            return result;
        }

        ///<summary>
        ///PHARMACIST_HOLIDAYS
        /// </summary>
        public static void insert2PHARMACIST_HOLIDAYS(PHARMACIST_HOLIDAYS newPHARMACIST_HOLIDAYS)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Add new PHARMACIST_HOLIDAYS to database
            db.PHARMACIST_HOLIDAYS.InsertOnSubmit(newPHARMACIST_HOLIDAYS);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void updatePHARMACIST_HOLIDAYS(string str_id, PHARMACIST_HOLIDAYS updatePHARMACIST_HOLIDAYS)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get PHARMACIST_HOLIDAYS for update
            PHARMACIST_HOLIDAYS oldPHARMACIST_HOLIDAYS = db.PHARMACIST_HOLIDAYS.FirstOrDefault(e => e.id.Equals(str_id));

            oldPHARMACIST_HOLIDAYS = updatePHARMACIST_HOLIDAYS;

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void deletePHARMACIST_HOLIDAYS(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get PHARMACIST_HOLIDAYS to Delete
            PHARMACIST_HOLIDAYS deletePHARMACIST_HOLIDAYS = db.PHARMACIST_HOLIDAYS.FirstOrDefault(e => e.id.Equals(str_id));

            //Delete PHARMACIST_HOLIDAYS
            db.PHARMACIST_HOLIDAYS.DeleteOnSubmit(deletePHARMACIST_HOLIDAYS);

            //Save changes to Database.
            db.SubmitChanges();
        }

        ///<summary>
        ///PHARMACIST_OPENTIMES
        /// </summary>
        public static void insert2PHARMACIST_OPENTIMES(PHARMACIST_OPENTIMES newPHARMACIST_OPENTIMES)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Add new PHARMACIST_OPENTIMES to database
            db.PHARMACIST_OPENTIMES.InsertOnSubmit(newPHARMACIST_OPENTIMES);

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void updatePHARMACIST_OPENTIMES(string str_id, PHARMACIST_OPENTIMES updatePHARMACIST_OPENTIMES)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get PHARMACIST_OPENTIMES for update
            PHARMACIST_OPENTIMES oldPHARMACIST_OPENTIMES = db.PHARMACIST_OPENTIMES.FirstOrDefault(e => e.id.Equals(str_id));

            oldPHARMACIST_OPENTIMES = updatePHARMACIST_OPENTIMES;

            //Save changes to Database.
            db.SubmitChanges();
        }

        public static void deletePHARMACIST_OPENTIMES(string str_id)
        {
            string connectString = System.Configuration.ConfigurationManager.ConnectionStrings["LinqToSQLDBConnectionString"].ToString();

            ECMSDataContext db = new ECMSDataContext(connectString);

            //Get PHARMACIST_OPENTIMES to Delete
            PHARMACIST_OPENTIMES deletePHARMACIST_OPENTIMES = db.PHARMACIST_OPENTIMES.FirstOrDefault(e => e.id.Equals(str_id));

            //Delete PHARMACIST_OPENTIMES
            db.PHARMACIST_OPENTIMES.DeleteOnSubmit(deletePHARMACIST_OPENTIMES);

            //Save changes to Database.
            db.SubmitChanges();
        }
    }
}