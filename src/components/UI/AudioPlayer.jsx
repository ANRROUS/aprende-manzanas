import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import soundtrack from '../../assets/song/soundtrack.mp3';
import './AudioPlayer.css';

function AudioPlayer({ showSplash }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [started, setStarted] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Configuramos el volumen bajo (0.1 de 1.0)
        if (audioRef.current) {
            audioRef.current.volume = 0.1;
        }

        // Ya no intentamos autoplay aquí globalmente, sino que esperamos al click del start-overlay
    }, []);

    const handleStart = () => {
        setStarted(true);
        if (audioRef.current && !muted) {
            // El .play() ocurre síncronamente al click, permitiendo el audio en Safari/Chrome iOS y Android
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.error("Audio error:", e));
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <>
            <div className="audio-player">
                <audio
                    ref={audioRef}
                    src={soundtrack}
                    loop
                />

                {/* Botón opcional para silenciar/activar música (pequeño arriba a la izquierda) */}
                <AnimatePresence mode="wait">
                    <motion.button
                        key={location.pathname}
                        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`audio-btn ${muted ? 'audio-btn--muted' : ''}`}
                        onClick={toggleMute}
                        aria-label={muted ? "Activar música" : "Silenciar música"}
                    >
                        {muted ? '🔇' : '🔊'}
                    </motion.button>
                </AnimatePresence>
            </div>

            {!showSplash && !started && (
                <div
                    className="start-overlay"
                    onClick={handleStart}
                >
                    <div className="start-overlay__text">
                        👆 Toca para comenzar
                    </div>
                </div>
            )}
        </>
    );
}

export default AudioPlayer;
