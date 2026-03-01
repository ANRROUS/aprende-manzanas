import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/Layout/PageTransition';
import Background from '../components/UI/Background';
import HomeIcon from '../components/UI/HomeIcon';
import useAuthStore from '../context/useAuthStore';
import './Auth.css';

function Login() {
    const navigate = useNavigate();
    const { login, error, clearError } = useAuthStore();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(usuario, password);
        if (success) {
            navigate('/modulos');
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
                    <div className="auth-card__icon">🌳</div>

                    <h1 className="auth-card__title">¡Bienvenido!</h1>

                    {error && (
                        <div className="auth-form__error">{error}</div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-form__group">
                            <label className="auth-form__label" htmlFor="login-usuario">
                                Usuario
                            </label>
                            <input
                                id="login-usuario"
                                className="auth-form__input"
                                type="text"
                                placeholder="Tu nombre de usuario"
                                value={usuario}
                                onChange={(e) => { setUsuario(e.target.value); clearError(); }}
                                required
                            />
                        </div>

                        <div className="auth-form__group">
                            <label className="auth-form__label" htmlFor="login-password">
                                Contraseña
                            </label>
                            <input
                                id="login-password"
                                className="auth-form__input"
                                type="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); clearError(); }}
                                required
                            />
                        </div>

                        <motion.button
                            type="submit"
                            className="auth-form__submit"
                            whileTap={{ scale: 0.96 }}
                        >
                            Entrar
                        </motion.button>
                    </form>

                    <div className="auth-card__switch">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register">Regístrate</Link>
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
}

export default Login;
