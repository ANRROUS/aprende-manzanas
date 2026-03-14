import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Splash.css';

function Splash({ onFinish }) {
    useEffect(() => {
        // El splash durará exactamente 3 segundos
        const timer = setTimeout(() => {
            onFinish();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <AnimatePresence>
            <motion.div
                className="splash-screen"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <div className="splash-content">

                    {/* Animación 20: Texto Jelly */}
                    <div className="jelly-text">
                        <span style={{ '--i': 1 }}>C</span>
                        <span style={{ '--i': 2 }}>a</span>
                        <span style={{ '--i': 3 }}>r</span>
                        <span style={{ '--i': 4 }}>g</span>
                        <span style={{ '--i': 5 }}>a</span>
                        <span style={{ '--i': 6 }}>n</span>
                        <span style={{ '--i': 7 }}>d</span>
                        <span style={{ '--i': 8 }}>o</span>
                        <span style={{ '--i': 9 }}>.</span>
                        <span style={{ '--i': 10 }}>.</span>
                        <span style={{ '--i': 11 }}>.</span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default Splash;
