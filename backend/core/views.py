# Django Core
from django.contrib.auth import authenticate
from django.shortcuts import render # Solo si vas a devolver un HTML
from config import settings

# Django Rest Framework (DRF)
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

# SimpleJWT (Para manejo de tokens)
from rest_framework_simplejwt.tokens import RefreshToken
from .authentication import CookieJWTAuthentication

# Tus modelos/serializadores locales
from .serializers import UsuarioSerializer

# Create your views here.
@api_view(['GET'])
def health_check(request):
    return Response({
        'status': 'ok',
        'message': 'Backend funcionando correctamente',
        'version': '1.0.0',
    })
    
class LoginMockView(APIView):
    # IMPORTANTE: Permitir ingreso sin autorizacion por token
    permission_classes = [AllowAny] 
    authentication_classes = []

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

         # Debug: imprime para verificar
        print(f"Intentando login con: {username}")

        user = authenticate(username=username, password=password) #recorre la lista de backends en AUTHENTICATION_BACKENDS 
                                                                  #hasta encontrar uno que autentique exitosamente.                                                    

        if user:
            if not user.is_active:
                return Response({"error": "Cuenta desactivada"}, status=status.HTTP_403_FORBIDDEN)
            
            #Generar Token
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)


            serializer = UsuarioSerializer(user)

            response = Response({
                "message": "Login exitoso",
                "user": serializer.data,
            }, status=status.HTTP_200_OK)  

            #Establecer cookie + token
            response.set_cookie(
                key=settings.AUTH_COOKIE_ACCESS,
                value=access_token,
                httponly=True,
                samesite='Lax',
                secure=False,
                path='/'
            )

            response.set_cookie(
                key=settings.AUTH_COOKIE_REFRESH,
                value=refresh_token,
                httponly=True,
                samesite='Lax',
                secure=False,
                path='/'
            )

            return response
        else:
            return Response({"error": "Credenciales invalidas"}, status=status.HTTP_401_UNAUTHORIZED)
        
class LogoutView(APIView):
    def post(self, request):
        response = Response({"message": "Sesion Cerrada"}, status=status.HTTP_200_OK)
        ##Borramos cookie
        #response.delete_cookie(settings.AUTH_COOKIE_ACCESS, path='/', samesite='Lax')
        response.delete_cookie(settings.AUTH_COOKIE_ACCESS)
        response.delete_cookie(settings.AUTH_COOKIE_REFRESH)
        return response
        
class DashboardDataView(APIView):

    def get(self, request):
        return Response({
            "message": f"Bienvenido {request.user.nombre_completo}",
            "stats": [10, 20, 30]
        })
    
