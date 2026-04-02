import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    /**
     * 
     * @param {React.SyntheticEvent} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const response = await authService.login(username, password);
            console.log("Respuesta del servidor: ",response);
            alert('Login exitoso');
            navigate('/dashboard');
        }catch(error){
            setError(error.response?.data?.error || 'Error al conectar con el servidor');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>Iniciar Sesión</h2>
                
                <div style={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                
                <div style={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                
                {error && <div style={styles.error}>{error}</div>}
                
                <button 
                    type="submit" 
                    disabled={loading}
                    style={styles.button}
                >
                    {loading ? 'Cargando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
    },
    form: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '300px'
    },
    inputGroup: {
        marginBottom: '1rem'
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem'
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
        textAlign: 'center'
    }
};

export default Login;
