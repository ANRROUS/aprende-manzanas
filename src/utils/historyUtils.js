// Keys
const HISTORY_KEY = 'aprende_manzanas_history';

// Get entire history object
export const getHistory = () => {
    try {
        const data = localStorage.getItem(HISTORY_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
};

// Save entire history object
export const saveHistory = (historyObj) => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyObj));
};

// Get history for a specific user and specific game
export const getUserGameHistory = (username, gameId) => {
    const history = getHistory();
    if (!history[username]) return [];
    if (!history[username][gameId]) return [];
    return history[username][gameId];
};

// Create a new "Actividad" (session) when the user enters a game
// Returns the actividadId so the game can reference it
export const createActividad = (username, gameId) => {
    const history = getHistory();
    if (!history[username]) history[username] = {};
    if (!history[username][gameId]) history[username][gameId] = [];

    const now = new Date();
    const actividad = {
        id: `act_${Date.now()}`,
        fecha: now.toLocaleDateString(),
        hora: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: now.toISOString(),
        ejercicios: []
    };

    history[username][gameId].push(actividad);
    saveHistory(history);
    return actividad.id;
};

// Add an attempt to a specific actividad and ejercicio
// If the ejercicio doesn't exist yet inside the actividad, it creates it
export const addAttemptToHistory = (username, gameId, actividadId, ejercicioInfo, intento) => {
    const history = getHistory();
    if (!history[username] || !history[username][gameId]) return;

    const actividad = history[username][gameId].find(a => a.id === actividadId);
    if (!actividad) return;

    const now = new Date();
    const nuevoIntento = {
        id: `int_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        numeroElegido: intento.numeroElegido,
        resultado: intento.resultado,
        fecha: now.toLocaleDateString(),
        hora: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        timestamp: now.toISOString()
    };

    // Find or create the ejercicio inside the actividad
    let ejercicio = actividad.ejercicios.find(ej => ej.id === ejercicioInfo.id);
    if (ejercicio) {
        ejercicio.intentos.push(nuevoIntento);
    } else {
        actividad.ejercicios.push({
            id: ejercicioInfo.id,
            ejercicioTexto: ejercicioInfo.texto,
            intentos: [nuevoIntento]
        });
    }

    saveHistory(history);
};

// Delete a single attempt
export const deleteAttempt = (username, gameId, actividadId, ejercicioId, intentoId) => {
    const history = getHistory();
    if (!history[username] || !history[username][gameId]) return false;

    const actividad = history[username][gameId].find(a => a.id === actividadId);
    if (!actividad) return false;

    const ejercicio = actividad.ejercicios.find(ej => ej.id === ejercicioId);
    if (!ejercicio) return false;

    ejercicio.intentos = ejercicio.intentos.filter(i => i.id !== intentoId);

    // If no attempts left, remove the ejercicio
    if (ejercicio.intentos.length === 0) {
        actividad.ejercicios = actividad.ejercicios.filter(ej => ej.id !== ejercicioId);
    }

    // If no ejercicios left, remove the actividad
    if (actividad.ejercicios.length === 0) {
        history[username][gameId] = history[username][gameId].filter(a => a.id !== actividadId);
    }

    saveHistory(history);
    return true;
};

// Delete an entire ejercicio inside an actividad
export const deleteExercise = (username, gameId, actividadId, ejercicioId) => {
    const history = getHistory();
    if (!history[username] || !history[username][gameId]) return false;

    const actividad = history[username][gameId].find(a => a.id === actividadId);
    if (!actividad) return false;

    actividad.ejercicios = actividad.ejercicios.filter(ej => ej.id !== ejercicioId);

    if (actividad.ejercicios.length === 0) {
        history[username][gameId] = history[username][gameId].filter(a => a.id !== actividadId);
    }

    saveHistory(history);
    return true;
};

// Delete an entire actividad
export const deleteActividad = (username, gameId, actividadId) => {
    const history = getHistory();
    if (!history[username] || !history[username][gameId]) return false;

    history[username][gameId] = history[username][gameId].filter(a => a.id !== actividadId);
    saveHistory(history);
    return true;
};

// Clear entire history for a game for a user
export const clearGameHistory = (username, gameId) => {
    const history = getHistory();
    if (!history[username]) return false;

    history[username][gameId] = [];
    saveHistory(history);
    return true;
};
