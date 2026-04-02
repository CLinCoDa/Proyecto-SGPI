import React, {useState, useEffect} from 'react';
import backendService from '../services/backendService';
import './Home.css';

const Home = () => {
    const [backendStatus, setBackendStatus] = useState('Verificando...');
    const [backendMessage, setBackendMessage] = useState('');

    useEffect(()=>{
        checkBackendConnection();
    }, []);

    const checkBackendConnection = async () => {
        try{
            const response = await backendService.healthCheck();
            setBackendStatus('Conectado');
            setBackendMessage(response.message);

        }catch(error){
            setBackendStatus('Desconectado');
            setBackendMessage(`No se pudo conectar al backend: ${error.message}`);
        }
    }

    return (
    <div className="home-container">
      <header className="home-header">
        <h1>SGPI - Sistema de Gestión</h1>
        <p>Bienvenido al Sistema de Gestión</p>
      </header>

      <main className="home-main">
        <div className="status-card">
          <h2>Estado del Sistema</h2>
          <div className={`status-indicator ${backendStatus === 'Conectado' ? 'connected' : 'disconnected'}`}>
            Backend: {backendStatus}
          </div>
          <p className="status-message">{backendMessage}</p>
        </div>

        <div className="info-card">
          <h2>Información del Proyecto</h2>
          <ul>
            <li><strong>Frontend:</strong> React {React.version}</li>
            <li><strong>Backend:</strong> Django</li>
            <li><strong>Base de datos:</strong> PostgreSQL</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;

