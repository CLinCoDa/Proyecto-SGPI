import api from './api';

const backendService = {
    //Metodo para verificar conexion con backend
    healthCheck: async () => {
        try{
            const response = await api.get('/health/');
            return response.data;
        }
        catch(error){
            console.error('Error conectando al backend: ', error);
            throw error;
        }
    },
};

export default backendService;