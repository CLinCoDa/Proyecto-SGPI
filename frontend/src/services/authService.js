import api from './api';

const authService = {
    //Metodo para iniciar sesion
    login: async (username, password) => {
        try{
            const { data } = await api.post('/login/', { username, password });
            /*const response = await api.post('/login/',
                {
                    username: username,
                    password: password
                }
            );*/
            // Guardamos un flag simple en localStorage para el Router
            localStorage.setItem('isLoggedIn', 'true');
            return data;
        }
        catch(error){
            console.error('Error en login: ', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await api.post('/logout/'); // El backend debe eliminar la cookie
        } finally {
            localStorage.removeItem('isLoggedIn');
            window.location.href = '/login';
        }
    }
};

export default authService;

