# Mini API - Colletions (Barajitas de Baloncesto)

## Descripción del Proyecto
Aplicación web cliente-servidor desarrollada para la tienda **Colletions**, dedicada a la venta y canje de barajitas de baloncesto, implementando una arquitectura REST con Node.js y Express.

## Tecnologías Utilizadas
- **Backend:** Node.js, Express.js.
- **Frontend:** HTML5, JavaScript (Fetch API), Bootstrap 5.
- **Persistencia:** Archivo JSON local (`fs`).

## Estructura de Carpetas
- `/server.js`: Archivo principal del servidor.
- `/routes/clientes.js`: Manejador de rutas, validaciones y lógica de negocio para los coleccionistas.
- `/public/`: Contiene `index.html` y `main.js` para la interfaz visual orientada a la marca.
- `/data/clientes.json`: Simulación de base de datos local con los registros de los usuarios.

## Flujo de Datos
1. El usuario completa el formulario de registro en la interfaz de **Colletions** (`index.html`).
2. `main.js` intercepta el evento submit y envía un objeto JSON mediante `fetch()` con método `POST` hacia la ruta `/clientes`.
3. El servidor valida la información ingresada. Si es correcta, almacena el registro en `clientes.json`.
4. El servidor responde con un mensaje personalizado relacionado con la temática de baloncesto. El frontend lo procesa y actualiza dinámicamente la lista de historial mediante una petición `GET`.

## Validaciones Implementadas
- Comprobación de campos vacíos obligatorios en el servidor.
- Verificación de que la edad provista sea estrictamente un valor numérico mayor a cero.

## Aprendizajes
Se afianzó el uso de Express Router para estructurar una API REST modular, la conexión asíncrona entre el servidor y un frontend web, y la gestión de la persistencia de datos con el módulo nativo `fs`.

## Mejoras Futuras
Migrar la persistencia de archivos a una base de datos relacional (como PostgreSQL) y añadir filtros de búsqueda por ciudad o rango de edad para los canjes de barajitas.
