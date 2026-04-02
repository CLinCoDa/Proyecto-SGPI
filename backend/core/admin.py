from django.contrib import admin
from .models import Usuario, Rol, Permiso, AsignacionRol

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Rol)
admin.site.register(Permiso)
admin.site.register(AsignacionRol)
