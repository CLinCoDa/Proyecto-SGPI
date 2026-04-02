import axios from 'axios';

//Configuracion base de Axios
const api = axios.create({
    baseURL: 'http://localhost:8000', //URL del backend Django
    withCredentials: true, //Para enviar cookies
    timeout: 5000,
    headers:{
        'Content-Type': 'application/json'
    }
});

api.interceptors.response.use(
    response => response,
    error => {
        // 1. Extraemos la respuesta para que el código sea más legible
        const { response } = error;

        if (response) {
            // El servidor respondió con un status fuera del rango 2xx
            if (response.status === 401) {
                localStorage.removeItem('isLoggedIn');
                console.error('Sesión expirada o no autorizado.');
                // Aquí podrías incluso redireccionar al login:
                // window.location.href = '/login';
            } else {
                console.error(`Error de servidor (${response.status}):`, response.data);
            }
        } else if (error.request) {
            // La petición se hizo pero no hubo respuesta (Error de red)
            console.error('Error de red: No se recibió respuesta del servidor.');
        } else {
            // Algo pasó al configurar la petición
            console.error('Error de configuración:', error.message);
        }
        
        // Es vital mantener esto para que el componente sepa que la petición falló
        return Promise.reject(error);
    }
);

export default api