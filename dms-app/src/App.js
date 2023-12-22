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


function App() {
  const isLogin = useSelector(state => state.auth.isLogin);
  // const [isLoginLocal, setIsLoginLocal] = useState(false);
  // useEffect(() => {
  //   setIsLoginLocal(localStorage.getItem("isLogin"));
  // }, [isLoginLocal])
  return (
    <>
    {!isLogin && <Navigate to="/" />}
    <Routes>
      <Route path="/" element={isLogin ? <Navigate to="/dashboard" /> : <Login isLogin={isLogin}/>} />
      {isLogin &&
      <>
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
      </>
      }
    </Routes>
    </>
  );
}

export default App;
