import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import Background from '../components/UI/Background';
import ReturnIcon from '../components/UI/ReturnIcon';
import ConfirmModal from '../components/UI/ConfirmModal';
import useAuthStore from '../context/useAuthStore';
import { 
    getUserGameHistory, 
    deleteAttempt, 
    deleteExercise, 
    deleteActividad,
    clearGameHistory 
} from '../utils/historyUtils';
import './HistorialDetalle.css';

const gameNames = {
    'aprende-a-contar': 'Aprende a Contar',
    'recoge-manzanas': 'Recoge Manzanas',
    'cuenta-animales': 'Cuenta animales',
    'identifica-numero': 'Identifica el número',
    'cuantas-manzanas': 'Cuántas manzanas hay',
    'selecciona-manzanas': 'Selecciona x manzanas',
    'cual-es-mayor': '¿Cuál es mayor?',
    'sumas': 'Sumas'
};

function HistorialDetalle() {
    const { juego } = useParams();
    const { usuario } = useAuthStore();
    const [history, setHistory] = useState([]);
    const [expandedAct, setExpandedAct] = useState(null);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

    const displayTitle = gameNames[juego] || 'Historial';

    useEffect(() => {
        loadHistory();
    }, [juego, usuario]);

    const loadHistory = () => {
        if (usuario) {
            const data = getUserGameHistory(usuario, juego);
            setHistory(data);
        }
    };

    const handleDeleteAttempt = (actId, ejId, intId) => {
        deleteAttempt(usuario, juego, actId, ejId, intId);
        loadHistory();
    };

    const handleDeleteExercise = (actId, ejId) => {
        deleteExercise(usuario, juego, actId, ejId);
        loadHistory();
    };

    const handleDeleteActividad = (actId) => {
        setModalConfig({
            isOpen: true,
            title: 'Eliminar actividad',
            message: '¿Seguro que deseas eliminar toda esta actividad?',
            onConfirm: () => {
                deleteActividad(usuario, juego, actId);
                loadHistory();
                setModalConfig(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleClearAll = () => {
        setModalConfig({
            isOpen: true,
            title: 'Vaciar historial',
            message: `¿Seguro que deseas vaciar TODO el historial de "${displayTitle}"?`,
            onConfirm: () => {
                clearGameHistory(usuario, juego);
                loadHistory();
                setModalConfig(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const closeModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    const toggleExpand = (actId) => {
        setExpandedAct(expandedAct === actId ? null : actId);
    };

    // Reversed for display (newest first), but numbered from oldest
    const totalActividades = history.length;

    return (
        <PageTransition>
            <div className="historial-detalle-page">
                <Background />
                <ReturnIcon defaultPath="/historial" />

                <div className="historial-container">
                    <h1 className="historial-title">📋 {displayTitle}</h1>

                    <div className="historial-list">
                        <AnimatePresence>
                            {history.length === 0 ? (
                                <motion.div 
                                    className="hd-empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <p>No hay registros para este juego.</p>
                                </motion.div>
                            ) : (
                                [...history].reverse().map((actividad, actIndex) => {
                                    const actNumber = totalActividades - actIndex;
                                    return (
                                        <motion.div 
                                            key={actividad.id} 
                                            className="hd-actividad"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: actIndex * 0.05 }}
                                        >
                                            {/* Actividad header */}
                                            <div 
                                                className="hd-act-header"
                                                onClick={() => toggleExpand(actividad.id)}
                                            >
                                                <div className="hd-act-info">
                                                    <span className="hd-act-label">Actividad {actNumber}</span>
                                                    <span className="hd-act-date">📅 {actividad.fecha} &nbsp; 🕐 {actividad.hora}</span>
                                                    <span className="hd-act-count">{actividad.ejercicios.length} ejercicio(s)</span>
                                                </div>
                                                <div className="hd-act-actions">
                                                    <button 
                                                        className="hd-btn hd-btn-small hd-btn-del"
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteActividad(actividad.id); }}
                                                        title="Eliminar actividad"
                                                    >
                                                        🗑️
                                                    </button>
                                                    <span className="hd-act-arrow">{expandedAct === actividad.id ? '▼' : '▶'}</span>
                                                </div>
                                            </div>

                                            {/* Expanded content */}
                                            <AnimatePresence>
                                                {expandedAct === actividad.id && (
                                                    <motion.div 
                                                        className="hd-act-body"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="hd-act-body-inner">
                                                            {actividad.ejercicios.map((ejercicio) => (
                                                                <div key={ejercicio.id} className="hd-ejercicio">
                                                                    <div className="hd-ej-header">
                                                                        <h4>{ejercicio.ejercicioTexto}</h4>
                                                                        <button 
                                                                            className="hd-btn hd-btn-small"
                                                                            onClick={() => handleDeleteExercise(actividad.id, ejercicio.id)}
                                                                            title="Eliminar ejercicio"
                                                                        >
                                                                            ❌
                                                                        </button>
                                                                    </div>

                                                                    {ejercicio.intentos.map((intento, intIdx) => (
                                                                        <div key={intento.id} className="hd-intento-row">
                                                                            <div className="hd-intento-info">
                                                                                <span className="hd-intento-num">Intento {intIdx + 1}:</span>
                                                                                <span className="hd-intento-desc">
                                                                                    eligió <b>{intento.numeroElegido}</b>
                                                                                    <span className={`hd-badge ${intento.resultado === 'bien' ? 'hd-badge-success' : 'hd-badge-error'}`}>
                                                                                        {intento.resultado === 'bien' ? '✔️ bien' : '❌ mal'}
                                                                                    </span>
                                                                                </span>
                                                                                <span className="hd-intento-time">{intento.hora}</span>
                                                                            </div>
                                                                            <button 
                                                                                className="hd-btn hd-btn-tiny"
                                                                                onClick={() => handleDeleteAttempt(actividad.id, ejercicio.id, intento.id)}
                                                                                title="Eliminar intento"
                                                                            >
                                                                                ✕
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Floating clear button - bottom right */}
                    {history.length > 0 && (
                        <motion.button 
                            className="hd-float-clear"
                            onClick={handleClearAll}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Vaciar todo el historial"
                        >
                            🗑️
                        </motion.button>
                    )}
                </div>

                <ConfirmModal
                    isOpen={modalConfig.isOpen}
                    title={modalConfig.title}
                    message={modalConfig.message}
                    onConfirm={modalConfig.onConfirm}
                    onCancel={closeModal}
                />
            </div>
        </PageTransition>
    );
}

export default HistorialDetalle;
