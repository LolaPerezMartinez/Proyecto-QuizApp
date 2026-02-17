import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import type { HistorialDTO } from '../types/types';

export default function Perfil() {
  const [historial, setHistorial] = useState<HistorialDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("No se encontró sesión activa.");
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:8080/api/juego/historial', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistorial(response.data);
      } catch (err) {
        console.error("Error al obtener el historial", err);
        setError("Error al cargar el historial del servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, []);

  // Estadísticas globales
  const totalPuntos = historial.reduce((acc, curr) => acc + curr.puntos, 0);
  const promedio = historial.length > 0 ? (totalPuntos / historial.length).toFixed(0) : 0;

  if (error) {
    return <div className="main-wrapper text-center py-5 text-danger">{error}</div>;
  }

  return (
    <div className="main-wrapper animate-fadeIn">
      {/* SECCIÓN DE RESUMEN / ESTADÍSTICAS */}
      <section className="profile-header-card mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="profile-avatar-wrapper shadow-glow">
            <span className="material-symbols-rounded" style={{ fontSize: '2.5rem' }}>account_circle</span>
          </div>
          <div>
            <h2 className="mb-0 fw-800 text-white">Mi Perfil</h2>
            <p className="text-sky mb-0 opacity-75">Tu progreso como experto</p>
          </div>
        </div>
        
        <div className="stats-grid mt-4">
          <div className="stat-item">
            <span className="stat-value">{historial.length}</span>
            <span className="stat-label text-uppercase small">Partidas</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{totalPuntos}</span>
            <span className="stat-label text-uppercase small">Puntos Totales</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{promedio}</span>
            <span className="stat-label text-uppercase small">Promedio</span>
          </div>
        </div>
      </section>

      {/* HISTORIAL DE PARTIDAS */}
      <section className="history-section">
        <h3 className="h6 fw-bold text-sky mb-3 text-uppercase opacity-75" style={{ letterSpacing: '1px' }}>
          Partidas Recientes
        </h3>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-sky" role="status"></div>
          </div>
        ) : historial.length > 0 ? (
          <div className="history-list d-flex flex-column gap-3">
            {historial.map((partida) => (
              <div key={partida.id} className="history-card animate-fadeInUp">
                <div className="d-flex justify-content-between align-items-center">
                  {/* INFO IZQUIERDA: Categoría y Fecha */}
                  <div className="d-flex align-items-center">
                    <div className="category-icon-mini me-3">
                      <span className="material-symbols-rounded">rocket_launch</span>
                    </div>
                    <div>
                      <div className="fw-bold text-white text-capitalize" style={{ fontSize: '0.95rem' }}>
                        {partida.categoria}
                      </div>
                      <small className="text-sky opacity-50">{partida.fecha}</small>
                    </div>
                  </div>
                  
                  {/* INFO DERECHA: Puntos y Aciertos corregidos */}
                  <div className="text-end">
                    <div className="badge-points mb-1">{partida.puntos} pts</div>
                    
                    <div className="text-white-50" style={{ fontSize: '0.75rem', fontWeight: '500' }}>
                      {/* Lógica corregida: Aciertos / Total */}
                      {partida.aciertos} / {partida.totalPreguntas} aciertos
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="history-card text-center py-5 opacity-50">
            <span className="material-symbols-rounded d-block mb-2">history_toggle_off</span>
            Aún no has terminado ninguna partida.
          </div>
        )}
      </section>
    </div>
  );
}