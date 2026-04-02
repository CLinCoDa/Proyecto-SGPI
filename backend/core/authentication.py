from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from config import settings

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # 1. Buscamos el token en las cookies
        # IMPRIME TODAS LAS COOKIES QUE LLEGAN
        print(f"DEBUG - Cookies recibidas: {request.COOKIES}")
        
        raw_token = request.COOKIES.get(settings.AUTH_COOKIE_ACCESS)
        print(f"DEBUG - Token extraído: {raw_token}")

        # 2. Si no hay token, retornamos None (esto permite que DRF pruebe otros métodos)
        if raw_token is None:
            return None

        try:
            # 3. Validamos el token usando la lógica de SimpleJWT
            validated_token = self.get_validated_token(raw_token)
            
            # 4. Retornamos la tupla (usuario, token) que espera DRF
            return self.get_user(validated_token), validated_token
        except (InvalidToken, TokenError):
            # Si el token es inválido o expiró
            #return none
            print(f"Error validando token: {TokenError}") # Mira la consola de Django
            raise AuthenticationFailed("Token invalido o expirado")