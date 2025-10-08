import React from 'react';

const RecentActivity: React.FC = () => {
  const activities = [
    { 
      event: 'Movimiento Sospechoso - Entrada Principal', 
      time: '2024-01-15 14:30:15',
      priority: 'high'
    },
    { 
      event: 'Reconocimiento Facial - Pasillo Central', 
      time: '2024-01-15 14:25:08',
      priority: 'low'
    },
    { 
      event: 'Objeto Abandonado - Biblioteca', 
      time: '2024-01-15 13:45:22',
      priority: 'medium'
    }
  ];

  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>Actividad Reciente</h3>
      <div style={styles.activityList}>
        {activities.map((activity, index) => (
          <div key={index} style={styles.activityItem}>
            <p style={styles.activityEvent}>
              <strong>{activity.event}</strong>
            </p>
            <p style={styles.activityTime}>{activity.time}</p>
            <span style={getPriorityStyle(activity.priority)}>
              {activity.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Función helper para estilos de prioridad
const getPriorityStyle = (priority: string) => {
  const baseStyle = {
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500',
    marginTop: '0.5rem'
  };

  switch (priority) {
    case 'high':
      return {
        ...baseStyle,
        backgroundColor: '#fee2e2',
        color: '#b91c1c'
      };
    case 'medium':
      return {
        ...baseStyle,
        backgroundColor: '#fef3c7',
        color: '#b45309'
      };
    case 'low':
      return {
        ...baseStyle,
        backgroundColor: '#dcfce7',
        color: '#166534'
      };
    default:
      return baseStyle;
  }
};

const styles = {
  section: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    margin: '0 0 1.5rem 0',
    color: '#2c3e50',
    fontWeight: '600'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem'
  },
  activityItem: {
    paddingBottom: '1rem',
    borderBottom: '1px solid #f0f0f0',
    ':last-child': {
      borderBottom: 'none',
      paddingBottom: '0'
    }
  },
  activityEvent: {
    margin: '0 0 0.25rem 0',
    color: '#2c3e50'
  },
  activityTime: {
    margin: '0',
    fontSize: '0.8rem',
    color: '#7f8c8d'
  }
} as const;

export default RecentActivity;