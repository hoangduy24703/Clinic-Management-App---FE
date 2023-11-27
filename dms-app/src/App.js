import Login from "./pages/Auth/Login";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import PatientRecords from "./pages/Patient/PatientRecords/PatientRecords";
import PatientDetails from "./pages/Patient/PatientDetails/PatientDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/patient-records" element={<PatientRecords />} />
      <Route path="/patient-records/:idPatient" element={<PatientDetails />} />
    </Routes>
  );
}

export default App;
