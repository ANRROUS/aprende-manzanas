import { create } from 'zustand';

const USERS_KEY = 'aprende_manzanas_users';
const SESSION_KEY = 'aprende_manzanas_session';

// Helper: get all users from localStorage
const getUsers = () => {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    } catch {
        return {};
    }
};

// Helper: save users to localStorage
const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const useAuthStore = create((set) => ({
    // State
    usuario: null,
    edad: null,
    isAuthenticated: false,
    error: null,

    // Login: busca usuario en localStorage y valida contraseña
    login: (usuario, password) => {
        const users = getUsers();
        const user = users[usuario];

        if (!user) {
            set({ error: 'Usuario no encontrado' });
            return false;
        }

        if (user.password !== password) {
            set({ error: 'Contraseña incorrecta' });
            return false;
        }

        // Login exitoso
        const session = { usuario, edad: user.edad };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));

        set({
            usuario,
            edad: user.edad,
            isAuthenticated: true,
            error: null,
        });

        return true;
    },

    // Register: guarda nuevo usuario en localStorage
    register: (usuario, edad, password) => {
        const users = getUsers();

        if (users[usuario]) {
            set({ error: 'Este usuario ya existe' });
            return false;
        }

        users[usuario] = { edad: Number(edad), password };
        saveUsers(users);

        set({ error: null });
        return true;
    },

    // Logout
    logout: () => {
        localStorage.removeItem(SESSION_KEY);
        set({
            usuario: null,
            edad: null,
            isAuthenticated: false,
            error: null,
        });
    },

    // Restore session from localStorage
    restoreSession: () => {
        try {
            const session = JSON.parse(localStorage.getItem(SESSION_KEY));
            if (session) {
                set({
                    usuario: session.usuario,
                    edad: session.edad,
                    isAuthenticated: true,
                });
            }
        } catch {
            // No valid session
        }
    },

    // Clear error
    clearError: () => set({ error: null }),
}));

export default useAuthStore;
