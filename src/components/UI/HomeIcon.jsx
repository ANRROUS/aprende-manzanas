import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import homeIconImg from '../../assets/images/redirect-img/home-icon.png';
import './NavIcon.css';

function HomeIcon() {
    const navigate = useNavigate();

    return (
        <motion.button
            className="nav-icon-btn"
            onClick={() => navigate('/')}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Ir al inicio"
        >
            <img src={homeIconImg} alt="Inicio" draggable="false" />
        </motion.button>
    );
}

export default HomeIcon;
