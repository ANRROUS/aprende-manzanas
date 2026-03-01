import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AudioPlayer from '../UI/AudioPlayer';
import Splash from './Splash';
import './AppLayout.css';

function AppLayout() {
    const [showSplash, setShowSplash] = useState(true);
    const [started, setStarted] = useState(false);

    return (
        <div className="app-layout no-select">
            {/* Splash Screen (shows for 3 secs on initial load) */}
            <AnimatePresence>
                {showSplash && (
                    <Splash onFinish={() => setShowSplash(false)} />
                )}
            </AnimatePresence>

            <AudioPlayer />

            {/* Overlay para interacción de audio, solo se muestra cuando el splash termina */}
            {!showSplash && !started && (
                <div
                    className="start-overlay"
                    onClick={() => setStarted(true)}
                >
                    <div className="start-overlay__text">
                        👆 Toca para comenzar
                    </div>
                </div>
            )}

            <main className="app-layout__content">
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
            </main>
        </div>
    );
}

export default AppLayout;
