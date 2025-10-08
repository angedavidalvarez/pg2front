import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'a_alvarez@donbosco.edu.gr';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  // Función para manejar el estilo activo
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    backgroundColor: isActive ? '#3498db' : 'transparent',
    fontWeight: isActive ? 'bold' : 'normal',
    '&:hover': {
      backgroundColor: '#34495e'
    }
  });

  return (
    <div style={styles.sidebar}>
      <h1 style={styles.title}>Sistema De VideoVigilancia Con IA</h1>
      
      <nav style={styles.nav}>
        <NavLink to="/dashboard" style={navLinkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/camaras" style={navLinkStyle}>
          Gestión de Cámaras
        </NavLink>
        <NavLink to="/camaras-vivo" style={navLinkStyle}>
          Transmisión en Vivo
        </NavLink>
        <NavLink to="/usuarios" style={navLinkStyle}>
          Gestión de Usuarios
        </NavLink>
        <NavLink to="/reportes" style={navLinkStyle}>
          Reportes
        </NavLink>
        <NavLink to="/incidentes" style={navLinkStyle}>
          Historial de Incidentes
        </NavLink>
      </nav>
      
      <div style={styles.userSection}>
        <p style={styles.welcome}>Bienvenido,</p>
        <p style={styles.userEmail}>{userEmail}</p>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

// Estilos que no dependen del estado activo
const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    position: 'fixed',
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #34495e'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: 1
  },
  userSection: {
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid #34495e'
  },
  welcome: {
    fontSize: '0.9rem',
    marginBottom: '0.25rem',
    color: '#bdc3c7'
  },
  userEmail: {
    fontWeight: '500',
    marginBottom: '1rem'
  },
  logoutButton: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c0392b'
    }
  }
} as const;

export default Sidebar;