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
