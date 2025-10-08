import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.mainContent}>
        <Outlet /> {/* Aquí se renderizarán los componentes del dashboard */}
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa'
  },
  mainContent: {
    flex: 1,
    padding: '2rem',
    marginLeft: '250px' // Igual al ancho del sidebar
  }
} as const;

export default DashboardLayout;



