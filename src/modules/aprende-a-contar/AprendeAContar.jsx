import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../components/Layout/PageTransition';
import Background from '../../components/UI/Background';
import ReturnIcon from '../../components/UI/ReturnIcon';
import './AprendeAContar.css';

// Audio imports
import audio1 from '../../assets/aprende-contar-song/1.mp3';
import audio2 from '../../assets/aprende-contar-song/2.mp3';
import audio3 from '../../assets/aprende-contar-song/3.mp3';
import audio4 from '../../assets/aprende-contar-song/4.mp3';
import audio5 from '../../assets/aprende-contar-song/5.mp3';
import audio6 from '../../assets/aprende-contar-song/6.mp3';
import audio7 from '../../assets/aprende-contar-song/7.mp3';
import audio8 from '../../assets/aprende-contar-song/8.mp3';
import audio9 from '../../assets/aprende-contar-song/9.mp3';
import audio10 from '../../assets/aprende-contar-song/10.mp3';

const AUDIO_MAP = {
    1: audio1, 2: audio2, 3: audio3, 4: audio4, 5: audio5,
    6: audio6, 7: audio7, 8: audio8, 9: audio9, 10: audio10
};

const TOTAL_NUMBERS = 10;

function AprendeAContar() {
    const navigate = useNavigate();
    const [currentNumber, setCurrentNumber] = useState(1);
    const audioRef = useRef(new Audio());

    // Play audio whenever currentNumber changes
    useEffect(() => {
        if (currentNumber <= TOTAL_NUMBERS) {
            playAudioForNumber(currentNumber);
        }
    }, [currentNumber]);

    const timeoutRef = useRef(null);

    const playAudioForNumber = (num) => {
        // Clear previous timeout if tapping multiple times quickly
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Stop current audio if playing
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        // Add 500ms delay before playing the new sound
        timeoutRef.current = setTimeout(() => {
            audioRef.current.src = AUDIO_MAP[num];
            audioRef.current.volume = 0.2;
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        }, 1000);
    };

    const handleScreenClick = () => {
        if (currentNumber < TOTAL_NUMBERS) {
            setCurrentNumber(prev => prev + 1);
        } else {
            // When tapping on 10, return directly to modules
            navigate('/modulos');
        }
    };

    return (
        <PageTransition>
            <div className="aprende-contar" onClick={handleScreenClick}>
                <Background />
                <ReturnIcon />

                {/* Progress Indicators (10 dots) */}
                <div className="ac-progress-container">
                    <div className="ac-progress-dots">
                        {Array.from({ length: TOTAL_NUMBERS }).map((_, idx) => {
                            const num = idx + 1;
                            const isFilled = num <= currentNumber;
                            return (
                                <motion.div
                                    key={num}
                                    className={`ac-dot ${isFilled ? 'ac-dot--active' : ''}`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Main Number Display */}
                <div className="ac-number-container">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={currentNumber}
                            className="ac-number"
                            initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            {currentNumber}
                        </motion.h1>
                    </AnimatePresence>
                </div>
            </div>
        </PageTransition>
    );
}

export default AprendeAContar;
