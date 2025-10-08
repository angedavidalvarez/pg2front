import React from 'react';
import WelcomeHeader from './WelcomeHeader';
import StatusCards from './StatusCards';
import RecentActivity from './RecentActivity';
import CameraStatus from './CamaraStatus';

const DashboardPage: React.FC = () => {
  const userEmail = localStorage.getItem('userEmail') || 'admin@donbosco.edu.gt';

  return (
    <div style={styles.container}>
      <WelcomeHeader userEmail={userEmail} />
      
      <StatusCards />
      
      <div style={styles.contentGrid}>
        <RecentActivity />
        <CameraStatus />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    minHeight: 'calc(100vh - 64px)'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginTop: '2rem'
  }
} as const;

export default DashboardPage;