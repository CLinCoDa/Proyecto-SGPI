from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
"""class BaseModel(models.Model):
    "Modelo base con campos comunes"
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True"""

class Permiso(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Rol(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    permisos = models.ManyToManyField(Permiso, related_name="roles")

    def __str__(self):
        return self.nombre
    
class Usuario(AbstractUser):
    "Entidad Usuario"
    cedula = models.CharField(max_length=20, unique=True)
    correo_institucional = models.EmailField(unique=True)
    nombre_completo = models.CharField(max_length=255)
    aceptacion_acuerdo = models.BooleanField(default=False)
    estado_acceso = models.BooleanField(default=True)
    fecha_ult_ingreso = models.DateTimeField(null=True, blank=True)
    #rol = models.ForeignKey(Rol, on_delete=models.PROTECT)

    # Relación N:M con Rol (con atributo 'asignacion' en la tabla intermedia)
    roles = models.ManyToManyField(
        Rol, 
        through='AsignacionRol',
        related_name='usuarios'
    )
    # Nota: 'password' ya está en AbstractUser, pero se puede ignorar en la lógica si usas SSO.

    def __str__(self):
        return f"{self.username} - {self.nombre_completo}"
    
class AsignacionRol(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    #Atributo 'Asignacion' del rombo N:M 
    asignacion = models.CharField(max_length=100)
    

    class Meta:
        verbose_name = "Asignacion de Rol"
        verbose_name_plural = "Asignaciones de Roles"
        #unique_together = [['usuario', 'rol']]  # Evita asignaciones duplicadas

    def __str__(self):
        return f"{self.usuario.username} - {self.rol.nombre}"


