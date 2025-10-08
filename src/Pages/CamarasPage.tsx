  // Eliminar cámara
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/camaras/${id}`);
      setMensaje('Cámara eliminada correctamente');
      fetchCamaras();
      setTimeout(() => setMensaje(''), 3000);
    } catch {
      setError('No se pudo eliminar la cámara');
    }
  };
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Camara {
  id: number;
  nombre: string;
  ubicacion?: string;
  url_stream?: string;
  estado: 'conectada' | 'desconectada' | string;
}

interface CamaraForm {
  id?: number;
  nombre: string;
  ubicacion: string;
  url_stream: string;
  estado: string;
}

const initialForm: CamaraForm = {
  nombre: '',
  ubicacion: '',
  url_stream: '',
  estado: 'activa',
};

const CamarasPage: React.FC = () => {
  const [camaras, setCamaras] = useState<Camara[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CamaraForm>(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [mensaje, setMensaje] = useState('');

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

  const fetchEstados = async () => {
    // Actualiza solo el estado de conexión
    try {
      const res = await axios.get<Camara[]>('http://localhost:8000/camaras/estado');
      setCamaras((prev) => prev.map(cam => {
        const found = res.data.find(c => c.id === cam.id);
        return found ? { ...cam, estado: found.estado } : cam;
      }));
    } catch {}
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await axios.put(`http://localhost:8000/camaras/${formData.id}`, formData);
        setMensaje('Cámara editada correctamente');
      } else {
        await axios.post('http://localhost:8000/camaras', formData);
        setMensaje('Cámara agregada correctamente');
      }
      setShowForm(false);
      setFormData(initialForm);
      setIsEditing(false);
      fetchCamaras();
      setTimeout(() => setMensaje(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al guardar la cámara');
    }
  };

  const handleEdit = (camara: Camara) => {
    setFormData({
      id: camara.id,
      nombre: camara.nombre,
      ubicacion: camara.ubicacion || '',
      url_stream: camara.url_stream || '',
      estado: camara.estado || 'activa',
    });
    setIsEditing(true);
    setShowForm(true);
    setMensaje('');
    setError('');
  };


  const handleToggleEstado = async (camara: Camara) => {
    const nuevoEstado = camara.estado === 'activa' ? 'inactiva' : 'activa';
    try {
      await axios.put(`http://localhost:8000/camaras/${camara.id}`, {
        nombre: camara.nombre,
        ubicacion: camara.ubicacion,
        url_stream: camara.url_stream,
        estado: nuevoEstado,
      });
      setMensaje(`Cámara ${nuevoEstado === 'activa' ? 'activada' : 'desactivada'} correctamente`);
      fetchCamaras();
      setTimeout(() => setMensaje(''), 3000);
    } catch {
      setError('No se pudo cambiar el estado de la cámara');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData(initialForm);
    setIsEditing(false);
    setMensaje('');
    setError('');
  };

  const getEstadoStyle = (estado: Camara['estado']) => {
    return {
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      color: estado === 'conectada' ? '#166534' : '#b91c1c',
      backgroundColor: estado === 'conectada' ? '#dcfce7' : '#fee2e2',
      fontWeight: 500,
      fontSize: '0.95rem',
      marginLeft: '1rem',
    };
  };

  return (
    <div style={{ padding: '2rem', background: '#f5f5f5', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Gestión de Cámaras</h2>
      <button
        style={{ marginBottom: '1.5rem', background: '#2563eb', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 6, fontWeight: 500, cursor: 'pointer' }}
        onClick={() => { setShowForm(!showForm); setIsEditing(false); setFormData(initialForm); }}
      >
        {showForm ? 'Cancelar' : 'Agregar Nueva Cámara'}
      </button>
      <button
        style={{ marginLeft: '1rem', marginBottom: '1.5rem', background: '#27ae60', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 6, fontWeight: 500, cursor: 'pointer' }}
        onClick={fetchEstados}
      >
        Refrescar Estado
      </button>
      {mensaje && <div style={{ background: '#d4edda', color: '#155724', padding: '0.75rem 1rem', borderRadius: 6, marginBottom: '1rem' }}>{mensaje}</div>}
      {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '0.75rem 1rem', borderRadius: 6, marginBottom: '1rem' }}>{error}</div>}

      {showForm && (
        <div style={{ background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>{isEditing ? 'Editar Cámara' : 'Agregar Nueva Cámara'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Nombre</label>
              <input name="nombre" value={formData.nombre} onChange={handleChange} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ddd' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Ubicación</label>
              <input name="ubicacion" value={formData.ubicacion} onChange={handleChange} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ddd' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>URL Stream</label>
              <input name="url_stream" value={formData.url_stream} onChange={handleChange} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ddd' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label>Estado</label>
              <select name="estado" value={formData.estado} onChange={handleChange} style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #ddd' }}>
                <option value="activa">Activa</option>
                <option value="inactiva">Inactiva</option>
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', padding: '0.5rem 1.2rem', borderRadius: 6, fontWeight: 500, cursor: 'pointer' }}>{isEditing ? 'Guardar Cambios' : 'Agregar Cámara'}</button>
              <button type="button" onClick={handleCancel} style={{ background: '#f1f1f1', color: '#333', border: '1px solid #ddd', padding: '0.5rem 1.2rem', borderRadius: 6, fontWeight: 500, cursor: 'pointer' }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div>Cargando cámaras...</div>
      ) : (
        <div style={{ background: 'white', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', padding: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#7f8c8d', fontWeight: 600 }}>Nombre</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#7f8c8d', fontWeight: 600 }}>Ubicación</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#7f8c8d', fontWeight: 600 }}>URL Stream</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#7f8c8d', fontWeight: 600 }}>Estado</th>
                <th style={{ textAlign: 'left', padding: '0.75rem', color: '#7f8c8d', fontWeight: 600 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {camaras.map((camara) => (
                <tr key={camara.id}>
                  <td style={{ padding: '0.75rem', color: '#2c3e50' }}>{camara.nombre}</td>
                  <td style={{ padding: '0.75rem', color: '#2c3e50' }}>{camara.ubicacion}</td>
                  <td style={{ padding: '0.75rem', color: '#2c3e50' }}>{camara.url_stream}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={getEstadoStyle(camara.estado)}>
                      {camara.estado === 'conectada' ? 'Conectada' : camara.estado === 'desconectada' ? 'Desconectada' : camara.estado}
                    </span>

                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <button onClick={() => handleEdit(camara)} style={{ marginRight: 8, background: '#ffc107', color: '#000', border: 'none', padding: '0.4rem 0.9rem', borderRadius: 5, cursor: 'pointer', fontWeight: 500 }}>Editar</button>
                    <button onClick={() => handleDelete(camara.id)} style={{ marginRight: 8, background: '#dc3545', color: 'white', border: 'none', padding: '0.4rem 0.9rem', borderRadius: 5, cursor: 'pointer', fontWeight: 500 }}>Eliminar</button>
                    <button
                      onClick={() => handleToggleEstado(camara)}
                      style={{ background: camara.estado === 'activa' ? '#bdbdbd' : '#27ae60', color: 'white', border: 'none', padding: '0.4rem 0.9rem', borderRadius: 5, cursor: 'pointer', fontWeight: 500 }}
                    >
                      {camara.estado === 'activa' ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CamarasPage;