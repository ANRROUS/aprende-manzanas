import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import soundtrack from '../../assets/song/soundtrack.mp3';
import './AudioPlayer.css';

function AudioPlayer() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Configuramos el volumen bajo (0.3 de 1.0)
        if (audioRef.current) {
            audioRef.current.volume = 0.1;
        }

        // Intentar reproducir automáticamente
        const playAudio = async () => {
            try {
                if (audioRef.current) {
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } catch (err) {
                // Los navegadores bloquean el autoplay si el usuario no ha interactuado.
                // Quedará pausado hasta el primer click
                console.log("Autoplay bloqueado hasta la primera interacción del usuario.");
            }
        };

        playAudio();

        // Escuchar la primera interacción para debloquear si es necesario
        const handleFirstInteraction = () => {
            if (!isPlaying && audioRef.current && !muted) {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(e => console.error("Audio error:", e));
            }
            // Removemos el listener una vez que ya interactuó
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };

        window.addEventListener('click', handleFirstInteraction);
        window.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
        };
    }, []);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
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
    );
}

export default AudioPlayer;
