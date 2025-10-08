import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Camara {
  id: number;
  nombre: string;
  url_stream: string;
  ubicacion?: string;
  estado?: string;
}

const LiveCamarasPage: React.FC = () => {
  const [camaras, setCamaras] = useState<Camara[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [selectedCam, setSelectedCam] = useState<Camara | null>(null);

  useEffect(() => {
    fetchCamaras();
  }, []);

  const fetchCamaras = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get<Camara[]>('http://localhost:8000/camaras');
      setCamaras(res.data);
    } catch (err) {
      setError('Error al cargar las cámaras');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div style={{ padding: '2rem', background: '#f5f5f5', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Transmisión en Vivo de Cámaras</h2>
      {loading ? (
        <div>Cargando cámaras...</div>
      ) : error ? (
        <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
      ) : (
        <div style={{ display: 'flex', gap: '2rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {camaras.map((camara) => (
            <div
              key={camara.id}
              style={{ background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 350, cursor: 'pointer', transition: 'box-shadow 0.2s' }}
              onClick={() => setSelectedCam(camara)}
              title="Ampliar cámara"
            >
              <h3 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>{camara.nombre}</h3>
              {camara.ubicacion && <p style={{ color: '#888', marginBottom: '0.5rem' }}>{camara.ubicacion}</p>}
              {camara.estado === 'inactiva' ? (
                <div style={{ color: '#b91c1c', background: '#fee2e2', padding: '1rem', borderRadius: '6px', textAlign: 'center', margin: '1rem 0', minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 320 }}>
                  Cámara desactivada
                </div>
              ) : (
                <img
                  src={`http://localhost:8000/camaras/${camara.id}/mjpeg`}
                  alt={`Vista en vivo de ${camara.nombre}`}
                  style={{ width: '100%', maxWidth: 320, borderRadius: 6, background: '#000', minHeight: 180, objectFit: 'cover' }}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    const msg = document.createElement('div');
                    msg.textContent = 'Fuera de línea';
                    msg.style.color = '#b91c1c';
                    msg.style.background = '#fee2e2';
                    msg.style.padding = '1rem';
                    msg.style.borderRadius = '6px';
                    msg.style.textAlign = 'center';
                    msg.style.margin = '1rem 0';
                    e.currentTarget.parentNode && e.currentTarget.parentNode.appendChild(msg);
                  }}
                />
              )}
              <span style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                {`ID: ${camara.id}`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Modal para ampliar cámara */}
      {selectedCam && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setSelectedCam(null)}
        >
          <div
            style={{ background: 'white', borderRadius: 10, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.2)', minWidth: 400, maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCam(null)}
              style={{ position: 'absolute', top: 10, right: 10, background: '#dc3545', color: 'white', border: 'none', borderRadius: 4, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer', fontSize: 18 }}
              title="Cerrar"
            >
              ×
            </button>
            <h2 style={{ color: '#2563eb', marginBottom: 8 }}>{selectedCam.nombre}</h2>
            {selectedCam.ubicacion && <p style={{ color: '#888', marginBottom: 12 }}>{selectedCam.ubicacion}</p>}
            {selectedCam.estado === 'inactiva' ? (
              <div style={{ color: '#b91c1c', background: '#fee2e2', padding: '1rem', borderRadius: '6px', textAlign: 'center', margin: '1rem 0', minHeight: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 800 }}>
                Cámara desactivada
              </div>
            ) : (
              <img
                src={`http://localhost:8000/camaras/${selectedCam.id}/mjpeg`}
                alt={`Vista en vivo de ${selectedCam.nombre}`}
                style={{ width: '100%', maxWidth: 800, borderRadius: 8, background: '#000', minHeight: 320, objectFit: 'contain' }}
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  const msg = document.createElement('div');
                  msg.textContent = 'Fuera de línea';
                  msg.style.color = '#b91c1c';
                  msg.style.background = '#fee2e2';
                  msg.style.padding = '1rem';
                  msg.style.borderRadius = '6px';
                  msg.style.textAlign = 'center';
                  msg.style.margin = '1rem 0';
                  e.currentTarget.parentNode && e.currentTarget.parentNode.appendChild(msg);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveCamarasPage;