import React, { useEffect, useState } from "react";
import axios from "axios";

interface Camara {
  id: number;
  nombre: string;
  url_stream: string;
  ubicacion?: string;
  estado?: string;
}

const API_BASE = "http://localhost:8000"; // backend FastAPI

const LiveCamarasPage: React.FC = () => {
  const [camaras, setCamaras] = useState<Camara[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/camaras`)
      .then((res) => setCamaras(res.data))
      .catch(() => setError("No se pudieron cargar las cámaras"));
  }, []);

  const getStreamUrl = (id: number) =>
    `${API_BASE}/camaras/${id}/analizar_mjpeg`;

  return (
    <div style={{ padding: "2rem", background: "#f5f5f5", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "2rem", color: "#2c3e50" }}>
        Transmisión en Vivo
      </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
        }}
      >
        {camaras.length > 0 ? (
          camaras.map((cam) => (
            <div
              key={cam.id}
              style={{
                background: "white",
                borderRadius: 10,
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                padding: "1rem",
                width: 380,
              }}
            >
              <h3 style={{ color: "#2563eb" }}>{cam.nombre}</h3>
              <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                {cam.ubicacion}
              </p>
              {cam.estado === "inactiva" ? (
                <div
                  style={{
                    background: "#fee2e2",
                    color: "#b91c1c",
                    padding: "1rem",
                    borderRadius: 8,
                    textAlign: "center",
                  }}
                >
                  Cámara desactivada
                </div>
              ) : (
                <img
                  src={getStreamUrl(cam.id)}
                  alt={`Cámara ${cam.nombre}`}
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    background: "#000",
                    minHeight: 220,
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/320x240?text=Offline";
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <p>No hay cámaras registradas.</p>
        )}
      </div>
    </div>
  );
};

export default LiveCamarasPage;
