import { Routes, Route, Navigate} from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from "./pages/EmployeesPage";
import './App.css';
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/" element={<Navigate to="/login" />} />
       <Route path="/login" element={<LoginPage/>} />
       <Route path="/dashboard" element={<DashboardPage/>} />
       <Route path="/employees" element={<EmployeesPage/>} />
      </Routes>
    </div>
  );
}

export default App;
