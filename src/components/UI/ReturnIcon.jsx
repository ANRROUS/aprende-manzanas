import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import returnIconImg from '../../assets/images/redirect-img/return.png';
import './NavIcon.css';

function ReturnIcon({ defaultPath = '/modulos' }) {
    const navigate = useNavigate();

    return (
        <motion.button
            className="nav-icon-btn"
            onClick={() => navigate(defaultPath)}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Volver"
        >
            <img src={returnIconImg} alt="Volver" draggable="false" />
        </motion.button>
    );
}

export default ReturnIcon;
