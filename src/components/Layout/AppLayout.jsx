import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AudioPlayer from '../UI/AudioPlayer';
import Splash from './Splash';
import './AppLayout.css';

function AppLayout() {
    const [showSplash, setShowSplash] = useState(true);

    return (
        <div className="app-layout no-select">
            {/* Splash Screen (shows for 3 secs on initial load) */}
            <AnimatePresence>
                {showSplash && (
                    <Splash onFinish={() => setShowSplash(false)} />
                )}
            </AnimatePresence>

            <AudioPlayer showSplash={showSplash} />

            <main className="app-layout__content">
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
            </main>
        </div>
    );
}

export default AppLayout;
