import React from 'react';

const CameraStatus: React.FC = () => {
  const cameras = [
    { name: 'Entrada Principal', status: 'online' },
    { name: 'Pasillo Central', status: 'online' },
    { name: 'Laboratorio 1', status: 'online' },
    { name: 'Pato Recreo', status: 'maintenance' },
    { name: 'Biblioteca', status: 'online' },
    { name: 'Auditorio', status: 'offline' }
  ];

  return (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>Estado de Cámaras</h3>
      <div style={styles.cameraGrid}>
        {cameras.map((camera, index) => (
          <div key={index} style={styles.cameraItem}>
            <input 
              type="checkbox" 
              checked={camera.status === 'online'}
              onChange={() => {}}
              style={styles.checkbox}
            />
            <span style={styles.cameraName}>{camera.name}</span>
            <span style={getStatusStyle(camera.status)}>
              {camera.status === 'online' ? 'Online' : 
               camera.status === 'offline' ? 'Offline' : 'Maintenance'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Función helper para estilos de estado
const getStatusStyle = (status: string) => {
  const baseStyle = {
    fontSize: '0.8rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    marginLeft: 'auto'
  };

  switch (status) {
    case 'online':
      return {
        ...baseStyle,
        backgroundColor: '#dcfce7',
        color: '#166534'
      };
    case 'offline':
      return {
        ...baseStyle,
        backgroundColor: '#fee2e2',
        color: '#b91c1c'
      };
    case 'maintenance':
      return {
        ...baseStyle,
        backgroundColor: '#fef3c7',
        color: '#b45309'
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
  cameraGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '0.75rem'
  },
  cameraItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  checkbox: {
    width: '1rem',
    height: '1rem'
  },
  cameraName: {
    color: '#2c3e50'
  }
} as const;

export default CameraStatus;