import React from 'react';

const StatusCards: React.FC = () => {
  const stats = [
    { title: 'Cámaras Activas', value: 4 },
    { title: 'Incidentes Hoy', value: 5 },
    { title: 'Usuarios Activos', value: 3 },
    { title: 'Estado del Sistema', value: 'Activo', isActive: true }
  ];

  return (
    <div style={styles.cardGrid}>
      {stats.map((stat, index) => (
        <div key={index} style={styles.card}>
          <h3 style={styles.cardTitle}>{stat.title}</h3>
          <p style={{
            ...styles.cardValue,
            ...(stat.isActive && { color: '#27ae60' })
          }}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    textAlign: 'center' as const
  },
  cardTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '0.9rem',
    color: '#7f8c8d'
  },
  cardValue: {
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2c3e50'
  }
} as const;

export default StatusCards;