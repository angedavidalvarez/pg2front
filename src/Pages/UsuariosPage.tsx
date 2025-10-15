import React, { useEffect, useState } from "react";
import axios from "axios";

interface Usuario {
  id: number;
  correo: string;
  rol: string;
}

const UsuariosPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Formulario para agregar o modificar usuario
  const [formData, setFormData] = useState({
    id: 0,
    correo: "",
    contrasena: "",
    rol: "Administrador",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Usuario[]>("http://localhost:8000/usuario/completo");
      setUsuarios(res.data);
    } catch (err) {
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(`http://localhost:8000/usuario/${formData.id}`, {
          rol: formData.rol,
        });
        setMensaje("Usuario modificado correctamente");
      } else {
        await axios.post("http://localhost:8000/usuario", {
          correo: formData.correo,
          contrasena: formData.contrasena,
          rol: formData.rol,
        });
        setMensaje("Usuario creado correctamente");
      }

      setFormData({ id: 0, correo: "", contrasena: "", rol: "Administrador" });
      setIsEditing(false);
      setShowForm(false);
      fetchUsuarios();
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMensaje(""), 3000);
    } catch (error: any) {
      setError(error.response?.data?.detail || "Error al guardar usuario");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Está seguro de eliminar este usuario?")) return;
    try {
      await axios.delete(`http://localhost:8000/usuario/${id}`);
      setMensaje("Usuario eliminado correctamente");
      fetchUsuarios();
    } catch {
      setError("Error al eliminar usuario");
    }
  };

  const startEditing = (usuario: Usuario) => {
    setFormData({
      id: usuario.id,
      correo: usuario.correo,
      contrasena: "",
      rol: usuario.rol,
    });
    setIsEditing(true);
    setShowForm(true);
    setMensaje("");
    setError("");
  };

  const cancelEditing = () => {
    setFormData({ id: 0, correo: "", contrasena: "", rol: "Administrador" });
    setIsEditing(false);
    setShowForm(false);
    setMensaje("");
    setError("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMensaje("");
    setError("");
  };

  // Estilos en línea para evitar archivos CSS adicionales
  const styles = {
    container: {
      padding: "20px",
      height: "100%",
      overflowY: "auto" as "auto",
      backgroundColor: "#f5f5f5"
    },
    header: {
      display: "flex",
      justifyContent: "space-between" as "space-between",
      alignItems: "center" as "center",
      marginBottom: "20px"
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#333",
      margin: "0"
    },
    addButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "500"
    },
    alert: {
      padding: "10px 15px",
      borderRadius: "4px",
      marginBottom: "20px"
    },
    alertSuccess: {
      backgroundColor: "#d4edda",
      color: "#155724",
      border: "1px solid #c3e6cb"
    },
    alertError: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      border: "1px solid #f5c6cb"
    },
    formContainer: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "20px"
    },
    formTitle: {
      fontSize: "18px",
      marginBottom: "15px",
      color: "#333",
      margin: "0"
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "15px",
      marginBottom: "15px"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as "column"
    },
    label: {
      marginBottom: "5px",
      fontWeight: "500"
    },
    input: {
      padding: "8px 12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px"
    },
    formActions: {
      display: "flex",
      gap: "10px"
    },
    primaryButton: {
      backgroundColor: "#2196F3",
      color: "white",
      border: "none",
      padding: "8px 15px",
      borderRadius: "4px",
      cursor: "pointer"
    },
    secondaryButton: {
      backgroundColor: "#f1f1f1",
      color: "#333",
      border: "1px solid #ddd",
      padding: "8px 15px",
      borderRadius: "4px",
      cursor: "pointer"
    },
    tableContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      overflow: "hidden" as "hidden"
    },
    tableTitle: {
      padding: "15px 20px",
      fontSize: "18px",
      borderBottom: "1px solid #eee",
      margin: "0"
    },
    loading: {
      padding: "20px",
      textAlign: "center" as "center",
      color: "#666"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as "collapse"
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      padding: "12px 15px",
      textAlign: "left" as "left",
      fontWeight: "600",
      color: "#495057",
      borderBottom: "2px solid #dee2e6"
    },
    tableCell: {
      padding: "12px 15px",
      borderBottom: "1px solid #dee2e6"
    },
    userInfo: {
      display: "flex",
      flexDirection: "column" as "column"
    },
    userEmail: {
      fontSize: "14px",
      color: "#333",
      fontWeight: "500"
    },
    rolBadge: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "12px",
      fontWeight: "500"
    },
    actionButtons: {
      display: "flex",
      gap: "8px"
    },
    actionButton: {
      padding: "5px 10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "12px"
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Gestión de Usuarios</h1>
        <button 
          style={styles.addButton}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancelar" : "Agregar Usuario"}
        </button>
      </div>

      {/* Mensajes de estado */}
      {mensaje && (
        <div style={{...styles.alert, ...styles.alertSuccess}}>
          {mensaje}
        </div>
      )}
      {error && (
        <div style={{...styles.alert, ...styles.alertError}}>
          {error}
        </div>
      )}

      {/* Formulario Crear/Editar */}
      {showForm && (
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>
            {isEditing ? "Editar Usuario" : "Agregar Nuevo Usuario"}
          </h2>
          
          <form onSubmit={handleSubmit} style={{width: "100%"}}>
            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label htmlFor="correo" style={styles.label}>Correo</label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleChange}
                  style={styles.input}
                  required
                  disabled={isEditing}
                />
              </div>

              {!isEditing && (
                <div style={styles.formGroup}>
                  <label htmlFor="contrasena" style={styles.label}>Contraseña</label>
                  <input
                    id="contrasena"
                    name="contrasena"
                    type="password"
                    value={formData.contrasena}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>
              )}

              <div style={styles.formGroup}>
                <label htmlFor="rol" style={styles.label}>Rol</label>
                <select
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Operador">Operador</option>
                </select>
              </div>
            </div>

            <div style={styles.formActions}>
              <button
                type="submit"
                style={styles.primaryButton}
              >
                {isEditing ? "Guardar Cambios" : "Agregar Usuario"}
              </button>

              <button
                type="button"
                onClick={cancelEditing}
                style={styles.secondaryButton}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabla de usuarios */}
      <div style={styles.tableContainer}>
        <h2 style={styles.tableTitle}>Usuarios del Sistema</h2>
        
        {loading ? (
          <div style={styles.loading}>Cargando usuarios...</div>
        ) : usuarios.length === 0 ? (
          <div style={styles.loading}>
            No hay usuarios registrados en el sistema.
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Correo</th>
                <th style={styles.tableHeader}>Rol</th>
                <th style={styles.tableHeader}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td style={styles.tableCell}>
                    <div style={styles.userInfo}>
                      <div style={styles.userEmail}>{usuario.correo}</div>
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.rolBadge,
                      backgroundColor: usuario.rol === "Administrador" ? "#e3f2fd" : "#f3e5f5",
                      color: usuario.rol === "Administrador" ? "#1976d2" : "#7b1fa2"
                    }}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => startEditing(usuario)}
                        style={{
                          ...styles.actionButton,
                          backgroundColor: "#ffc107",
                          color: "#000"
                        }}
                        title="Editar usuario"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(usuario.id)}
                        style={{
                          ...styles.actionButton,
                          backgroundColor: "#dc3545",
                          color: "white"
                        }}
                        title="Eliminar usuario"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsuariosPage;
