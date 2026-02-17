import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Juego.css';
import '../Indicadores.css'; 
import type { PartidaResponse, PreguntaDTO, RespuestaResultadoDTO } from '../types/types';

export default function Juego() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Recuperamos la partida del state de la navegación
  const partida = location.state?.partida as PartidaResponse;

  const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState<string[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultado, setResultado] = useState<RespuestaResultadoDTO | null>(null);
  const [loading, setLoading] = useState(false);

  // Estado para las bolitas: null (beige), true (verde), false (rojo)
  const [historialPasos, setHistorialPasos] = useState<(boolean | null)[]>([]);

  useEffect(() => {
    if (!partida) {
      navigate('/login');
    } else {
      // Inicializamos el array de bolitas según el total de preguntas de la partida
      setHistorialPasos(new Array(partida.totalPreguntas).fill(null));
    }
  }, [partida, navigate]);

  // Protección contra renders nulos
  if (!partida || !partida.preguntas || !partida.preguntas[preguntaActualIndex]) {
    return null;
  }

  const preguntaActual: PreguntaDTO = partida.preguntas[preguntaActualIndex];
  const esMultiple = preguntaActual.tipo === 'MULTIPLE';

  const handleSeleccion = (opcion: string) => {
    if (mostrarResultado) return; 
    
    if (esMultiple) {
      setRespuestasSeleccionadas(prev =>
        prev.includes(opcion) ? prev.filter(r => r !== opcion) : [...prev, opcion]
      );
    } else {
      setRespuestasSeleccionadas([opcion]);
    }
  };

  const handleResponder = async () => {
    if (respuestasSeleccionadas.length === 0) return;
    
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post<RespuestaResultadoDTO>(
        'http://localhost:8080/api/juego/answer', 
        {
          partidaId: Number(partida.partidaId || (partida as any).id),
          preguntaId: preguntaActual.id,
          respuestasUsuario: respuestasSeleccionadas
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const resData = response.data;
      setResultado(resData);
      setMostrarResultado(true);

      // Actualizamos el color de la bolita correspondiente
      setHistorialPasos(prev => {
        const nuevo = [...prev];
        nuevo[preguntaActualIndex] = resData.esCorrecta;
        return nuevo;
      });

    } catch (err: any) {
      console.error("Error al enviar respuesta:", err);
      alert('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleSiguiente = () => {
    if (resultado?.terminada) {
      navigate('/resultados', { state: { resultado, partida } });
    } else {
      setPreguntaActualIndex(prev => prev + 1);
      setRespuestasSeleccionadas([]);
      setMostrarResultado(false);
      setResultado(null);
    }
  };

  return (
    <div className="quiz-page-wrapper">
      <div className="game-container">
        
        {/* Cabecera de Usuario */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-3 text-white">
          <div>
            <h4 className="fw-bold mb-0">{partida.nombreJugador}</h4>
            <small className="opacity-75 text-sky">Partida en curso</small>
          </div>
          <div className="text-end">
            <span className="badge rounded-pill bg-white text-dark px-3 py-2 fs-6 shadow-sm">
              ✨ {resultado?.puntosTotales ?? '---'} pts
            </span>
          </div>
        </div>

        <div className="game-card shadow-lg border-0 overflow-hidden">
          
          {/* Cuerpo de la Pregunta */}
          <div className="p-4 p-md-5">
            <div className="text-center mb-4">
              <span className="badge px-3 py-2 categoria-badge">
                {preguntaActual.categoria?.toUpperCase()}
              </span>
            </div>

            <h2 className="text-center fw-800 mb-5 pregunta-enunciado">
              {preguntaActual.enunciado}
            </h2>

            {/* Opciones de respuesta */}
            <div className="d-grid gap-3">
              {preguntaActual.opciones.map((opcion, index) => {
                const isSelected = respuestasSeleccionadas.includes(opcion);
                const isCorrect = resultado?.respuestasCorrectas?.includes(opcion);
                
                let statusClass = isSelected ? "selected" : "";
                
                if (mostrarResultado) {
                  if (isCorrect) statusClass = "correct disabled";
                  else if (isSelected) statusClass = "incorrect disabled";
                  else statusClass = "disabled opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSeleccion(opcion)}
                    className={`btn answer-btn ${statusClass}`}
                    disabled={mostrarResultado}
                  >
                    <span className="answer-index">{String.fromCharCode(65 + index)}</span>
                    <span className="flex-grow-1 text-start ps-3">{opcion}</span>
                    {mostrarResultado && isCorrect && <span className="ms-2">✔</span>}
                    {mostrarResultado && isSelected && !isCorrect && <span className="ms-2">✖</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sección de Acción (Botones) */}
          <div className="p-4 border-top bg-light d-flex justify-content-center">
            {!mostrarResultado ? (
              <button
                onClick={handleResponder}
                disabled={loading || respuestasSeleccionadas.length === 0}
                className="btn btn-next px-5"
              >
                {loading ? <span className="spinner-border spinner-border-sm"></span> : 'CONFIRMAR RESPUESTA'}
              </button>
            ) : (
              <button onClick={handleSiguiente} className="btn btn-next px-5">
                {resultado?.terminada ? 'VER RESULTADOS' : 'SIGUIENTE PREGUNTA →'}
              </button>
            )}
          </div>

          {/* INDICADORES DE PROGRESO (BOLITAS) */}
          <div className="indicadores-container">
            {historialPasos.map((estado, idx) => {
              let clase = "step-dot";
              if (idx === preguntaActualIndex) clase += " active";
              else if (estado === true) clase += " correct";
              else if (estado === false) clase += " incorrect";
              else clase += " pending";

              return <div key={idx} className={clase} title={`Pregunta ${idx + 1}`} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}