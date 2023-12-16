import Login from "./pages/Auth/Login";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import PatientRecords from "./pages/Patient/PatientRecords/PatientRecords";
import PatientDetails from "./pages/Patient/PatientDetails/PatientDetails";
import TreatmentPlan from "./pages/Treatment/TreatmentPlan/TreatmentPlan";
import Prescription from "./pages/Prescription/Prescription/Prescription";
import PrescriptionDetail from "./pages/Prescription/PrecsriptionDetail/PrescriptionDetail";
import Bills from "./pages/Bill/Bills";
import ByDate from "./pages/Treatment/ByDate/PopupFormBDTDate";
import ByPatient from "./pages/Treatment/ByPatient/ByPatient";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/patient-records" element={<PatientRecords />} />
      <Route path="/patient-records/:patientId" element={<PatientDetails />} />
      <Route path="/treatment-plan" element={<TreatmentPlan />}/>
      <Route path="/prescription" element={<Prescription />}/>
      <Route path="/prescription/prescription-detail" element={<PrescriptionDetail />}/>
      <Route path="/bills" element={<Bills />} />
      <Route path="/treatment-plan/by-patient" element={<ByPatient />} />
      <Route path="/treatment-plan/by-date" element={<ByDate />} />
    </Routes>
  );
}

export default App;
