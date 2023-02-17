import { Routes, Route} from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/dashboard" element={<DashboardPage/>} />
      </Routes>
    </div>
  );
}

export default App;
