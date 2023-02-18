import { Routes, Route} from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import './App.css';
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/login" element={<LoginPage/>} />
       <Route path="/dashboard" element={<DashboardPage/>} />

      </Routes>
    </div>
  );
}

export default App;
