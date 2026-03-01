import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import fondoInicio from '../assets/images/fondo-inicio.png';
import './Inicio.css';

function Inicio() {
    const navigate = useNavigate();

    const handlePlay = () => {
        navigate('/login');
    };

    return (
        <PageTransition className="inicio-page">

            {/* Background propio del inicio */}
            <div className="page-background">
                <img src={fondoInicio} alt="Fondo inicio" draggable="false" />
            </div>

            {/* Title */}
            <div className="inicio-page__title-wrapper">
                <motion.div
                    className="inicio-page__title"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
                >
                    <h1>Aprende con</h1>
                    <h1>Manzanas</h1>
                </motion.div>
            </div>

            {/* Play button - invisible container over the image's PLAY */}
            <motion.button
                id="play-button"
                className="inicio-page__play-btn"
                onClick={handlePlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileTap={{ scale: 0.95 }}
            />
        </PageTransition>
    );
}

export default Inicio;
