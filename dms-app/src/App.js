import Login from "./pages/Auth/Login";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import PatientRecords from "./pages/Patient/PatientRecords/PatientRecords";
import PatientDetails from "./pages/Patient/PatientDetails/PatientDetails";
import TreatmentPlan from "./pages/Treatment/TreatmentPlan/TreatmentPlan";
import Prescription from "./pages/Prescription/Prescription/Prescription";
import PrescriptionDetail from "./pages/Prescription/PrecsriptionDetail/PrescriptionDetail";
import Bills from "./pages/Bill/Bills";
import ByDate from "./pages/Treatment/ByDate/PopupFormBDTDate";
import ByPatient from "./pages/Treatment/ByPatient/ByPatient";
import AppoinmentSchedule from "./pages/AppoinmentSchedule/AppoinmentSchedule";
import ScheduleByPatient from "./pages/AppoinmentSchedule/ScheduleByPatient";
import ScheduleByDoctor from "./pages/AppoinmentSchedule/ScheduleByDoctor";
import ScheduleByClinic from "./pages/AppoinmentSchedule/ScheduleByClinic";
import ScheduleByDate from "./pages/AppoinmentSchedule/ScheduleByDate";
import WorkScheduleByDate from "./pages/WorkSchedule/WorkSchedule";
import Medicine from "./pages/Prescription/Medicine/Medicine";
import KHDTByPatient from "./pages/Treatment/KHDTByPatient/KHDTByPatient";
import Dashboard from "./pages/Dashboard/Dashboard";
import Staff from "./pages/Staff/Staff";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BillsByPatient from "./pages/Bill/BIllsByPatient";
import BillsByDate from "./pages/Bill/BillsByDate";
import Statistic from "./pages/Statistic/Statistic";
import ListAppointmentSchedule from "./pages/Statistic/ListAppointmentSchedule";
import ListTreatment from "./pages/Statistic/ListTreatment";

function App() {
  const login = useSelector(state => state.auth.isLogin);
  const [isLoginLocal, setIsLoginLocal]= useState(localStorage.getItem("isLogin"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    console.log(isLoginLocal, role);
    setIsLoginLocal(localStorage.getItem("isLogin"));
    setRole(localStorage.getItem("role"));
    if (isLoginLocal === "true") 
      setIsLogin(true);
    else 
      setIsLogin(false);

  }, [login]);

  return (
    <>
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient-records" element={<PatientRecords />} />
        <Route path="/patient-records/:patientId" element={<PatientDetails />} />
        <Route path="/treatment-plan" element={<TreatmentPlan />}/>
        <Route path="/prescription" element={<Prescription />}/>
        <Route path="/prescription/prescription-detail" element={<PrescriptionDetail />}/>
        <Route path="/bills" element={<Bills />} />
        <Route path="/treatment-plan/by-patient" element={<ByPatient />} />
        <Route path="/treatment-plan/by-date" element={<ByDate />} />
        <Route path="/appointment-schedule" element={<AppoinmentSchedule />} />
        <Route path="/appointment-schedule/by-patient" element={<ScheduleByPatient />} />
        <Route path="/appointment-schedule/by-doctor" element={<ScheduleByDoctor />} />
        <Route path="/appointment-schedule/by-clinic" element={<ScheduleByClinic />} />
        <Route path="/appointment-schedule/by-date" element={<ScheduleByDate />} />
        <Route path="/work-schedule/by-date" element={<WorkScheduleByDate />} />
        <Route path="/prescription/medicine" element={<Medicine/>} />
        <Route path="/treatment-plan/KHDT-by-patient" element={<KHDTByPatient />} />
        <Route path="/staff" element={<Staff />} />
        <Route path ="/bills/bills-by-patient" element = {<BillsByPatient/>}/>
        <Route path="/bills/bills-by-date" element = {<BillsByDate />} />
        <Route path="/statistic" element={<Statistic />} />
        <Route path="/statistic/statistic-appointment-schedule" element={<ListAppointmentSchedule />} />
        <Route path="/statistic/statistic-treatment" element={<ListTreatment />} />
    </Routes>
    </>
  );
}

export default App;
