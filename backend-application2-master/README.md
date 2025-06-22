# 🛒 Proyecto Final - Backend Ecommerce (Coderhouse)
Servidor backend profesional para un sistema de ecommerce, desarrollado con Node.js, Express, MongoDB y Passport. Este proyecto incluye autenticación, autorización, gestión de productos y carritos, generación de tickets, control de stock, pruebas automatizadas, documentación con Swagger y despliegue mediante Docker.

# 📦 Mejoras aplicadas
Documentación Swagger
Documentado el módulo /api/users con Swagger, incluyendo:

GET /api/users: Obtener todos los usuarios.

GET /api/users/current: Obtener usuario autenticado simulado.

Accede a la documentación en: http://localhost:8080/api-docs

# ✅ Tests funcionales
Se implementaron pruebas funcionales para adoption.router.js utilizando Jest y Supertest:

GET /api/adoptions/: Lista todas las adopciones.

GET /api/adoptions/:aid: Devuelve adopción por ID.

POST /api/adoptions/:uid/:pid: Crea una nueva adopción simulada.

# 🚦 Ejecutar tests
Desde la raíz del proyecto, ejecuta:

npm run test

Esto correrá todas las pruebas definidas y validará el correcto funcionamiento de las rutas principales.

# 🐳 Dockerización
Se creó un Dockerfile para construir una imagen del proyecto y ejecutarla en contenedores Docker.

Construcción y despliegue
Construir la imagen Docker:

docker build -t conecta-bien-api .

Ejecutar el contenedor (reemplaza las variables de entorno según corresponda):


docker run -d \
  --name conecta-bien-api \
  -p 8080:8080 \
  -e MONGO_URI="mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<nombreBaseDeDatos>?retryWrites=true&w=majority" \
  conecta-bien-api

Verifica que la API esté activa en: http://localhost:8080

Para ver logs en tiempo real:

docker logs -f conecta-bien-api

Imagen publicada en DockerHub: https://hub.docker.com/r/dantekempfen/conecta-bien-api

# 🧪 Mocking de datos
Nueva ruta: /api/mocks/mockingusers — genera 50 usuarios falsos (sin persistencia).

Nueva ruta: /api/mocks/generateData?users=50&pets=0 — inserta datos falsos en MongoDB Atlas.

Compatible con el modelo actual de usuarios.

# 🚀 Tecnologías utilizadas
Node.js + Express

MongoDB + Mongoose

Passport (estrategias local y JWT)

JSON Web Tokens (JWT)

Swagger + swagger-jsdoc

Jest + Supertest

Docker

DAO, DTO y Repository pattern

Variables de entorno (.env)

# ⚙️ Instalación

Clonar el repositorio:

git clone <url-del-repo>
cd <nombre-del-proyecto>

Instalar dependencias:
npm install
Ejecutar en modo desarrollo:

npm run dev

📄 Variables de entorno (.env)

env
PORT=8080

MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<nombreBaseDeDatos>?retryWrites=true&w=majority
JWT_SECRET=tuClaveSecretaJWT

# 🧪 Funcionalidades principales
Registro y login de usuarios (/api/sessions/register y /api/sessions/login).

Autenticación con Passport + JWT.

Rol Admin para creación, edición y eliminación de productos.

Rol User para agregar productos al carrito y finalizar compra.

Generación de tickets al finalizar compra.

Persistencia en MongoDB con acceso abierto configurado.

Arquitectura escalable: DAO, DTO, controller y service.

# 🧑‍💻 Desarrollado por
Dante Kempfen


