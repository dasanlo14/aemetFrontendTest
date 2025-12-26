# AEMET Frontend

Aplicación frontend desarrollada con **Angular**, que permite:

- Buscar municipios mediante autocompletado  
- Visualizar la predicción meteorológica del día siguiente  
- Mostrar la temperatura en °C o °F  

---

## Ejecución en local

### Opción A – Con Docker

En la raíz del proyecto se encuentra un archivo `docker-compose.yml`.  
Al ejecutarlo mediante el comando:

```bash
docker-compose up
```

se descargarán automáticamente las imágenes Docker tanto del frontend como del backend complementario a este proyecto (https://github.com/dasanlo14/aemetBackendTest), y se levantarán ambos servicios de forma conjunta.

**Importante**

Para que el backend pueda conectarse correctamente a la API de AEMET, es necesario configurar la variable de entorno AEMET_API_KEY.
Esta variable puede definirse de dos formas:

**1. Usando un archivo .env**

En el mismo directorio donde se encuentra el docker-compose.yml, crear un archivo .env con el siguiente contenido:

```bash
AEMET_API_KEY=TU_API_KEY_DE_AEMET
```
**2. Modificando directamente docker-compose.yml**
   
```bash
environment:
  AEMET_API_KEY: TU_API_KEY_DE_AEMET
```
La aplicación quedará accesible en los siguientes puertos:

 - Frontend: http://localhost:4200

 - Backend: http://localhost:8080

### Opción B – Sin Docker

Para ejecutar la aplicación sin utilizar contenedores, es necesario tener instalados:

- Node.js (v18 o superior)
- npm
- Angular CLI

#### Instalación de dependencias

Desde la raíz del proyecto frontend, ejecutar el siguiente comando para instalar las dependencias:

```bash
npm install
```

#### Arranque de la aplicación

Una vez instaladas las dependencias, arrancar la aplicación en modo desarrollo con el comando:

```bash
ng serve
```
La aplicación quedará disponible en la siguiente URL:

```bash
http://localhost:4200
```
Para que la aplicación funcione correctamente en esta modalidad, el backend debe estar arrancado previamente y accesible en:

```bash
http://localhost:8080
```
