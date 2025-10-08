import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 
// Definición de tipos para los estilos
interface LoginStyles {
  container: React.CSSProperties;
  loginBox: React.CSSProperties;
  title: React.CSSProperties;
  form: React.CSSProperties;
  inputGroup: React.CSSProperties;
  label: React.CSSProperties;
  input: React.CSSProperties;
  separator: React.CSSProperties;
  button: React.CSSProperties;
  credentials: React.CSSProperties;
  credentialsText: React.CSSProperties;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@donbosco.edu.gt');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      if (!response.ok) throw new Error("Error al iniciar sesión");

      const data = await response.json();
      console.log("Login exitoso:", data);

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userEmail', email);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Credenciales inválidas.");
    }
  };

  // Estilos con tipos correctos
  const styles: LoginStyles = {
    container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
    width: '100%', // Asegura que ocupe todo el ancho
    margin: 0, // Elimina márgenes por defecto
    padding: 0 // Elimina padding por defecto
  },
    loginBox: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px'
    },
     logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  logoImage: {
    maxHeight: '80px', // Ajusta según el tamaño deseado
    maxWidth: '100%',
    objectFit: 'contain'
  },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      textAlign: 'center' as const, // Solución para el error de textAlign
      marginBottom: '1.5rem',
      color: '#333'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#333'
    },
    input: {
      padding: '0.5rem 0.75rem',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '1rem',
      width: '100%',
      boxSizing: 'border-box' as const
    },
    separator: {
      borderTop: '1px solid #eee',
      margin: '1rem 0'
    },
    button: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%',
      transition: 'background-color 0.2s',
      marginTop: '0.5rem'
    },
    credentials: {
      marginTop: '1.5rem',
      textAlign: 'center' as const,
      fontSize: '0.875rem',
      color: '#666'
    },
    credentialsText: {
      margin: '0.25rem 0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.title}>Sistema De VideoVigilancia Con IA</h1>
        <div style={styles.logoContainer}>
          <img 
            src={logo} 
            alt="Logo de la Institución" 
            style={styles.logoImage}
          />
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Correo</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.separator}></div>

          <button type="submit" style={styles.button}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;