import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import Background from '../components/UI/Background';
import ReturnIcon from '../components/UI/ReturnIcon';
import useAuthStore from '../context/useAuthStore';
import './HistorialSelec.css';

const JUEGOS = [
    { id: 1, slug: 'aprende-a-contar', title: 'Aprende a contar', icon: '🔢' },
    { id: 2, slug: 'recoge-manzanas', title: 'Recoge Manzanas', icon: '🍎' },
    { id: 3, slug: 'cuenta-animales', title: 'Cuenta animales', icon: '🐾' },
    { id: 4, slug: 'identifica-numero', title: 'Identifica el número', icon: '🔍' },
    { id: 5, slug: 'cuantas-manzanas', title: 'Cuántas manzanas hay', icon: '🍏' },
    { id: 6, slug: 'selecciona-manzanas', title: 'Selecciona x manzanas', icon: '✋' },
    { id: 7, slug: 'cual-es-mayor', title: '¿Cuál es mayor?', icon: '⚖️' },
    { id: 8, slug: 'sumas', title: 'Sumas', icon: '➕' },
];

function HistorialSelec() {
    const { edad } = useAuthStore();
    const navigate = useNavigate();

    const getMaxGames = (edad) => {
        if (edad >= 5) return 8;
        if (edad >= 4) return 6;
        return 4;
    };

    const maxGames = getMaxGames(edad);

    return (
        <PageTransition>
            <div className="hs-page">
                <Background />
                <ReturnIcon defaultPath="/modulos" />

                <div className="hs-container">
                    <h1 className="hs-title">📋 Historial</h1>
                    <p className="hs-subtitle">Selecciona un juego para ver su historial</p>

                    <div className="hs-list">
                        {JUEGOS.map((juego, index) => {
                            const isLocked = juego.id > maxGames;

                            return (
                                <motion.div
                                    key={juego.id}
                                    className={`hs-item ${isLocked ? 'hs-item--locked' : ''}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.06 }}
                                    whileTap={!isLocked ? { scale: 0.97 } : {}}
                                    onClick={() => {
                                        if (!isLocked) {
                                            navigate(`/historial/${juego.slug}`);
                                        }
                                    }}
                                >
                                    <span className="hs-item-icon">{isLocked ? '🔒' : juego.icon}</span>
                                    <span className="hs-item-title">{juego.title}</span>
                                    <span className="hs-item-arrow">{isLocked ? '' : '›'}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}

export default HistorialSelec;
