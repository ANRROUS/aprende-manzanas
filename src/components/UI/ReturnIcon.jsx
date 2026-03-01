import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import returnIconImg from '../../assets/images/redirect-img/return.png';
import './NavIcon.css';

function ReturnIcon() {
    const navigate = useNavigate();

    return (
        <motion.button
            className="nav-icon-btn"
            onClick={() => navigate('/modulos')}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            aria-label="Volver a los módulos"
        >
            <img src={returnIconImg} alt="Volver" draggable="false" />
        </motion.button>
    );
}

export default ReturnIcon;
