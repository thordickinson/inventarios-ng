# inventarios-ng
Cliente angular para el sistema de inventarios

# Instalación

Se requiere node y npm para el funcionamiento y compilación

## Ambiente de  desarrollo

Se require tener docker y docker compose en el equipo.

Antes de nada se debe actualizar el archivo environment.ts para modificar la ruta del servidor de backend.

Usar el siguiente comando para instalar las dependencias

`npm install`

Luego se inicia el servidor con:

`ng serve`

## Heroku

Para el despliegue en heroku solo se debe configurar el dyno para subir este repositorio. No se requieren servicios extra. Pero se debe modificar el archivo environment.prod.ts para configurar la url del servidor de backend. Tambien se debe agregar a la configuracion de CORS el dominio del dyno actual.


