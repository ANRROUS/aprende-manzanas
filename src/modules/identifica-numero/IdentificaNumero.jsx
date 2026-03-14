import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/Layout/PageTransition';
import Background from '../../components/UI/Background';
import ReturnIcon from '../../components/UI/ReturnIcon';
import useAuthStore from '../../context/useAuthStore';
import { createActividad, addAttemptToHistory } from '../../utils/historyUtils';
import './IdentificaNumero.css';

// Audio temporal proporcionado por el usuario
import instructionAudio from '../../assets/aprende-contar-song/6.mp3';

const TOTAL_ROUNDS = 5;

const NUMBER_WORDS = {
    1: 'uno', 2: 'dos', 3: 'tres', 4: 'cuatro', 5: 'cinco',
    6: 'seis', 7: 'siete', 8: 'ocho', 9: 'nueve', 10: 'diez'
};

// 3 zonas bien separadas, cada una con 2 variantes sutiles
const POSITION_ZONES = [
    // Zona superior-izquierda
    [{ top: '28%', left: '12%' }, { top: '32%', left: '18%' }],
    // Zona medio-derecha
    [{ top: '43%', right: '12%' }, { top: '47%', right: '18%' }],
    // Zona inferior-centro
    [{ top: '58%', left: '35%' }, { top: '62%', left: '42%' }]
];

function pickZonedPositions() {
    return POSITION_ZONES.map(zone => zone[Math.floor(Math.random() * zone.length)]);
}

// Shuffle array utility
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function IdentificaNumero() {
    const navigate = useNavigate();
    const { usuario } = useAuthStore();
    
    // Game State
    const [currentRound, setCurrentRound] = useState(1);
    const [status, setStatus] = useState('IDLE'); // IDLE, WRONG_ANSWER, SUCCESS_ANSWER, GAME_OVER
    const [targetNumber, setTargetNumber] = useState(6);
    const [options, setOptions] = useState([]);
    const [wrongOption, setWrongOption] = useState(null);
    
    const audioRef = useRef(new Audio(instructionAudio));
    const timeoutRef = useRef(null);
    const actividadIdRef = useRef(null);

    // Create an Actividad (session) when the component mounts and usuario is available
    useEffect(() => {
        if (usuario && !actividadIdRef.current) {
            actividadIdRef.current = createActividad(usuario, 'identifica-numero');
        }
    }, [usuario]);

    // Initialize round
    useEffect(() => {
        if (currentRound <= TOTAL_ROUNDS) {
            generateRound();
        } else {
            setStatus('GAME_OVER');
        }
        
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [currentRound]);

    // Play audio on round start or wrong answer
    useEffect(() => {
        if (status === 'IDLE' || status === 'WRONG_ANSWER') {
            playInstruction();
        }
    }, [status, targetNumber]);

    const generateRound = () => {
        // Seleccionar número objetivo aleatorio (1-10)
        const target = Math.floor(Math.random() * 10) + 1;
        setTargetNumber(target);

        // Seleccionar 2 números incorrectos distintos
        let others = [];
        while (others.length < 2) {
            const rnd = Math.floor(Math.random() * 10) + 1;
            if (rnd !== target && !others.includes(rnd)) {
                others.push(rnd);
            }
        }

        // Combinar y mezclar
        let roundOptions = shuffleArray([target, ...others]);
        let roundPositions = shuffleArray(pickZonedPositions());
        let roundColors = shuffleArray([0, 1, 2]); // 0: green, 1: red, 2: blue
        
        // Asignar colores fijos a las posiciones (0: green, 1: red, 2: blue) para mantener asimetría visual
        const formattedOptions = roundOptions.map((num, idx) => ({
            id: idx,
            number: num,
            colorIndex: roundColors[idx], // 0..2 mezclados
            positionStyle: roundPositions[idx], // posiciones mezcladas
            animationClass: `in-float-${idx}`
        }));

        setOptions(formattedOptions);
        setStatus('IDLE');
        setWrongOption(null);
    };

    const playInstruction = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.log('Audio error:', e));
    };

    const handleOptionClick = (option) => {
        if (status !== 'IDLE') return; // Bloquear clicks durante animaciones

        // Preparar info para el historial
        const ejercicioInfo = {
            id: `ej_${currentRound}`, // Simplificado para que todos los intentos en la misma ronda caigan aquí
            texto: `Ejercicio 0${currentRound} - Elije el numero ${NUMBER_WORDS[targetNumber]}`
        };

        if (option.number === targetNumber) {
            // Guardar acierto en historial
            if (usuario && actividadIdRef.current) {
                addAttemptToHistory(usuario, 'identifica-numero', actividadIdRef.current, ejercicioInfo, {
                    numeroElegido: option.number,
                    resultado: 'bien'
                });
            }

            // Acierto
            setStatus('SUCCESS_ANSWER');
            
            // Pausar audio si estaba sonando
            audioRef.current.pause();
            
            // Esperar animación de 1s para pasar a la siguiente ronda
            timeoutRef.current = setTimeout(() => {
                setCurrentRound(prev => prev + 1);
            }, 1000);
            
        } else {
            // Guardar error en historial
            if (usuario && actividadIdRef.current) {
                addAttemptToHistory(usuario, 'identifica-numero', actividadIdRef.current, ejercicioInfo, {
                    numeroElegido: option.number,
                    resultado: 'mal'
                });
            }

            // Error
            setStatus('WRONG_ANSWER');
            setWrongOption(option.id);
            
            // Quitar el estado de error después de la animación de vibración (0.4s)
            timeoutRef.current = setTimeout(() => {
                setStatus('IDLE');
                setWrongOption(null);
            }, 400);
        }
    };

    return (
        <PageTransition>
            <div className="in-game-container">
                <Background />
                <ReturnIcon />

                {/* Scenery */}
                <div className="in-cloud-1"></div>
                <div className="in-cloud-2"></div>
                <div className="in-cloud-3"></div>
                
                <div className="in-hill"></div>
                <div className="in-hill-2"></div>

                {/* Header (Progreso e Instrucción) */}
                <div className="in-header">
                    <div className="in-progress">
                        {Array.from({ length: TOTAL_ROUNDS }).map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`in-dot ${idx < currentRound ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                    {status !== 'GAME_OVER' && (
                        <h2 className="in-instruction">
                            Elije el numero {NUMBER_WORDS[targetNumber]}:
                        </h2>
                    )}
                </div>

                {/* Play Area (Opciones) */}
                {status !== 'GAME_OVER' && (
                    <div className="in-play-area">
                        {options.map((opt) => (
                            <div
                                key={opt.id}
                                className={`
                                    in-number-option 
                                    color-${opt.colorIndex} 
                                    ${opt.animationClass} 
                                    ${wrongOption === opt.id ? 'in-wrong' : ''}
                                `}
                                style={opt.positionStyle}
                                onClick={() => handleOptionClick(opt)}
                            >
                                {opt.number}
                            </div>
                        ))}
                    </div>
                )}

                {/* Pantalla Muy Bien (Success overlay) */}
                <AnimatePresence>
                    {status === 'SUCCESS_ANSWER' && (
                        <motion.div 
                            className="in-success-overlay"
                            initial={{ y: '100%' }}
                            animate={{ y: '0%' }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                        >
                            <motion.div 
                                className="in-success-icon"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.15, type: 'spring' }}
                            >
                                ✓
                            </motion.div>
                            <motion.h1 
                                className="in-success-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.25 }}
                            >
                                ¡Muy Bien!
                            </motion.h1>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pantalla Excelente (Game Over) */}
                <AnimatePresence>
                    {status === 'GAME_OVER' && (
                        <motion.div 
                            className="in-gameover-overlay"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="in-trophy-container">
                                <span className="in-trophy-icon">🏆</span>
                            </div>
                            <h1 className="in-gameover-title">¡Excelente!</h1>
                            
                            <div className="in-stars-container">
                                {[1,2,3,4,5].map((star, idx) => (
                                    <motion.span 
                                        key={idx}
                                        className="in-star"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + (idx * 0.1) }}
                                    >
                                        ⭐
                                    </motion.span>
                                ))}
                            </div>

                            <motion.button 
                                className="in-menu-btn"
                                onClick={() => navigate('/modulos')}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                Ir al Menú
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
                
            </div>
        </PageTransition>
    );
}

export default IdentificaNumero;
