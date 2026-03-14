import { motion, AnimatePresence } from 'framer-motion';
import './ConfirmModal.css';

function ConfirmModal({ 
    isOpen, 
    title = '¿Estás seguro?', 
    message = '', 
    confirmText = 'Eliminar', 
    cancelText = 'Cancelar',
    onConfirm, 
    onCancel 
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="confirm-modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onCancel}
                >
                    <motion.div 
                        className="confirm-modal-card"
                        initial={{ scale: 0.7, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.7, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="confirm-modal-icon">⚠️</span>
                        <h3 className="confirm-modal-title">{title}</h3>
                        <p className="confirm-modal-message">{message}</p>
                        <div className="confirm-modal-actions">
                            <button 
                                className="confirm-modal-btn confirm-modal-btn--cancel"
                                onClick={onCancel}
                            >
                                {cancelText}
                            </button>
                            <button 
                                className="confirm-modal-btn confirm-modal-btn--confirm"
                                onClick={onConfirm}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ConfirmModal;
