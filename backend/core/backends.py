from django.contrib.auth.backends import BaseBackend
from .models import Usuario

class MockAuthBackend(BaseBackend):
    def authenticate(self, request, username = None, password = None, **kwargs):    
        #MOCK DATA: Simula la respuesta de la DB externa
        print(f"MockAuthBackend - Autenticando con email: {username}")  

        # MOCK DATA - Usando email como clave
        mock_user_db = {
            "usuario_prueba@ug.edu.ec": {
                "password": "password123",
                "nombre": "Usuario de prueba",
                "cedula": "1234567890",
                "username": "usuario123"
            },
            "admin@ug.edu.ec": {
                "password": "admin123",
                "nombre": "Administrador",
                "cedula": "0987654321",
                "username": "admin"
            },
            "profesor@ug.edu.ec": {
                "password": "profesor123",
                "nombre": "Profesor Test",
                "cedula": "1122334455",
                "username": "profesor"
            }
        }

        # Buscar por email
        user_info = mock_user_db.get(username)


        if user_info and user_info['password'] == password:
            #Sincroniza con tu modelo Usuario en la DB local
            user, created = Usuario.objects.update_or_create(
                username = username,
                defaults={
                    'nombre_completo': user_info['nombre'],
                    'cedula': user_info['cedula'],
                    'correo_institucional': username,
                    'aceptacion_acuerdo': True
                }
            )
            print(f"Usuario {'creado' if created else 'actualizado'}: {username}")
            return user

        print(f"Autenticación fallida para: {username}")
        return None
    
    def get_user(self, user_id):
        try:
            return Usuario.objects.get(pk=user_id)
        except Usuario.DoesNotExist:
            return None