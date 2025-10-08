import React from 'react';

interface WelcomeHeaderProps {
  userEmail: string;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ userEmail }) => {
  return (
    <div style={styles.header}>
      <h2 style={styles.title}>Panel de Control</h2>
      <p style={styles.welcome}>Bienvenido, {userEmail}</p>
    </div>
  );
};

const styles = {
  header: {
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e0e0e0'
  },
  title: {
    fontSize: '1.5rem',
    margin: '0 0 0.5rem 0',
    color: '#2c3e50'
  },
  welcome: {
    margin: 0,
    color: '#7f8c8d',
    fontSize: '1rem'
  }
} as const;

export default WelcomeHeader;