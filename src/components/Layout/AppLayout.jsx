import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './AppLayout.css';

function AppLayout() {
    return (
        <div className="app-layout no-select">
            <main className="app-layout__content">
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
            </main>
        </div>
    );
}

export default AppLayout;
