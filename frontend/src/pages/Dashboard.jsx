import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Dashboard = () => {

    const handleLogout = async (e) => {
        // Por ahora solo redirige, después implementaremos logout
        try{
            const response = await authService.logout();
            console.log("Respuesta del servidor: ",response);
            alert(response.message);
        }catch(error){
            console.error(error);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Dashboard</h1>
            <p>Bienvenido al sistema de gestión de propiedad intelectual</p>
            <button onClick={handleLogout} style={styles.button}>
                Cerrar Sesión
            </button>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        textAlign: 'center'
    },
    button: {
        padding: '0.5rem 1rem',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '1rem'
    }
};

export default Dashboard;