import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import Background from '../components/UI/Background';
import HomeIcon from '../components/UI/HomeIcon';
import useAuthStore from '../context/useAuthStore';
import './Modulos.css';

// Import module images
import game1 from '../assets/images/modulos-img/Game-1.png';
import game2 from '../assets/images/modulos-img/Game-2.png';
import game3 from '../assets/images/modulos-img/Game-3.png';
import game4 from '../assets/images/modulos-img/Game-4.png';
import game5 from '../assets/images/modulos-img/Game-5.png';
import game6 from '../assets/images/modulos-img/Game-6.png';
import game7 from '../assets/images/modulos-img/Game-7.png';
import game8 from '../assets/images/modulos-img/Game-8.png';

// Module definitions
// edad 3 → games 1-4, edad 4 → games 1-6, edad 5 → games 1-8
const MODULOS = [
    { id: 1, title: 'Aprende a contar', img: game1, minAge: 3, route: '/juego/aprende-a-contar' },
    { id: 2, title: 'Recoge Manzanas', img: game2, minAge: 3, route: '/juego/recoge-manzanas' },
    { id: 3, title: 'Cuenta animales', img: game3, minAge: 3, route: '/juego/cuenta-animales' },
    { id: 4, title: 'Identifica el número', img: game4, minAge: 3, route: '/juego/identifica-numero' },
    { id: 5, title: 'Cuántas manzanas hay', img: game5, minAge: 4, route: '/juego/cuantas-manzanas' },
    { id: 6, title: 'Selecciona x manzanas', img: game6, minAge: 4, route: '/juego/selecciona-manzanas' },
    { id: 7, title: '¿Cuál es mayor?', img: game7, minAge: 5, route: '/juego/cual-es-mayor' },
    { id: 8, title: 'Sumas', img: game8, minAge: 5, route: '/juego/sumas' },
];

function Modulos() {
    const { usuario, edad } = useAuthStore();
    const navigate = useNavigate();

    // Filter modules based on user's age
    const getMaxGames = (edad) => {
        if (edad >= 5) return 8;
        if (edad >= 4) return 6;
        return 4; // edad 3
    };

    const maxGames = getMaxGames(edad);

    return (
        <PageTransition>
            <div className="modulos-page">
                <Background />
                <HomeIcon />

                {/* Grid of modules */}
                <div className="modulos-page__grid">
                    {MODULOS.map((modulo, index) => {
                        const isLocked = modulo.id > maxGames;

                        return (
                            <motion.div
                                key={modulo.id}
                                className={`modulo-card modulo-card--${modulo.id} ${isLocked ? 'modulo-card--locked' : ''}`}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 18,
                                    delay: index * 0.08,
                                }}
                                whileTap={!isLocked ? { scale: 0.8 } : {}}
                                onClick={() => {
                                    if (!isLocked) {
                                        navigate(modulo.route);
                                    }
                                }}
                            >
                                <img
                                    className="modulo-card__img"
                                    src={modulo.img}
                                    alt={modulo.title}
                                    draggable="false"
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Botón de Historial */}
                <motion.button
                    className="history-btn"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/historial')}
                    title="Ver Historial"
                >
                    📋
                </motion.button>
            </div>
        </PageTransition>
    );
}

export default Modulos;
