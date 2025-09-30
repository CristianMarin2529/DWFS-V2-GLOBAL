// Utilidad para manejar localStorage con TTL
export const LocalStorageManager = {
    // Claves para localStorage
    AUTH_KEY: 'supplies_auth',
    CART_KEY: 'supplies_cart',

    // TTL por defecto: 5 minutos
    DEFAULT_TTL: 5 * 60 * 1000,

    // Guardar datos con TTL
    setItem: (key, data, ttl = LocalStorageManager.DEFAULT_TTL) => {
        try {
            const item = {
                data,
                timestamp: Date.now(),
                ttl
            };
            localStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },

    // Obtener datos verificando TTL
    getItem: (key) => {
        try {
            const itemStr = localStorage.getItem(key);
            if (!itemStr) return null;

            const item = JSON.parse(itemStr);
            const now = Date.now();

            // Verificar si ha expirado
            if (now - item.timestamp > item.ttl) {
                localStorage.removeItem(key);
                return null;
            }

            return item.data;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    // Remover item
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    },

    // Limpiar todos los datos de la aplicación
    clearAll: () => {
        try {
            localStorage.removeItem(LocalStorageManager.AUTH_KEY);
            localStorage.removeItem(LocalStorageManager.CART_KEY);
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};
