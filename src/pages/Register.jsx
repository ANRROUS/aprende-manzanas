import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import Background from '../components/UI/Background';
import HomeIcon from '../components/UI/HomeIcon';
import useAuthStore from '../context/useAuthStore';
import './Auth.css';

function Register() {
    const navigate = useNavigate();
    const { register, error, clearError } = useAuthStore();
    const [usuario, setUsuario] = useState('');
    const [edad, setEdad] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = register(usuario, edad, password);
        if (success) {
            navigate('/login');
        }
    };

    return (
        <PageTransition>
            <div className="auth-page">
                <Background />
                <HomeIcon />

                <motion.div
                    className="auth-card"
                    initial={{ scale: 0.8, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                    <div className="auth-card__icon">🌱</div>

                    <h1 className="auth-card__title">¡Regístrate!</h1>

                    {error && (
                        <div className="auth-form__error">{error}</div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-form__group">
                            <label className="auth-form__label" htmlFor="reg-usuario">
                                Usuario
                            </label>
                            <input
                                id="reg-usuario"
                                className="auth-form__input"
                                type="text"
                                placeholder="Crea tu usuario"
                                value={usuario}
                                onChange={(e) => { setUsuario(e.target.value); clearError(); }}
                                required
                            />
                        </div>


                        <div className="auth-form__group">
                            <label className="auth-form__label" htmlFor="reg-edad">
                                Edad
                            </label>
                            <input
                                id="reg-edad"
                                className="auth-form__input"
                                type="number"
                                placeholder="5"
                                min="3"
                                max="5"
                                value={edad}
                                onChange={(e) => setEdad(e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-form__group">
                            <label className="auth-form__label" htmlFor="reg-password">
                                Contraseña
                            </label>
                            <input
                                id="reg-password"
                                className="auth-form__input"
                                type="password"
                                placeholder="Crea tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="auth-form__submit"
                            whileTap={{ scale: 0.96 }}
                        >
                            Crear cuenta
                        </motion.button>
                    </form>

                    <div className="auth-card__switch">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login">Inicia sesión</Link>
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
}

export default Register;
