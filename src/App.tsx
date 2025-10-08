import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './components/dashboard/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import CamarasPage from './Pages/CamarasPage';
import LiveCamarasPage from './Pages/LiveCamarasPage';
import UsuariosPage from './Pages/UsuariosPage';
import ReportesPage from './Pages/ReportesPage';
import IncidentesPage from './Pages/IncidentesPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Todo el dashboard está protegido */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="camaras" element={<CamarasPage />} />
          <Route path="camaras-vivo" element={<LiveCamarasPage />} />
          <Route path="usuarios" element={<UsuariosPage />} />
          <Route path="reportes" element={<ReportesPage />} />
          <Route path="incidentes" element={<IncidentesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
