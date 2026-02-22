# 💡 Quiz App - Ecosistema de Trivia Multiplataforma

¡Bienvenido a Quiz App! Una solución integral de entretenimiento que combina una gestión robusta de datos, una arquitectura multiplataforma (Web/Móvil) y una experiencia inmersiva con música en streaming.

---

## 🚀 Características Principales

### 🌐 Plataforma Web (Usuarios & Admin)
- **Identificación Personalizada:** Login/Registro con roles (`USER`, `ADMIN`) y persistencia mediante JWT y `localStorage`.
- **Panel de Administrador:** CRUD avanzado de preguntas con paginado y carga masiva mediante archivos JSON.
- **Diseño Premium:** Interfaz moderna y responsive construida con Bootstrap.

### 📱 Aplicación Móvil (React Native - Modo Invitado)
- **Acceso Instantáneo:** Juega sin registros. Elige temática, tipo de pregunta y cantidad al momento.
- **Experiencia Nativa:** Fluidez total en dispositivos móviles con resumen de resultados al finalizar.

### 🎵 Experiencia Inmersiva (Jamendo API)
- **Música en Streaming:** Integración con la API REST externa de Jamendo.
- **Ambiente Continuo:** Música disponible en todas las pantallas de la aplicación para mejorar la experiencia de usuario mientras respondes las preguntas.

---

## 🛠️ Stack Tecnológico

- **Backend:** Spring Boot 3 (Java), Spring Security + JWT.
- **Frontend Web:** React (TypeScript) + Bootstrap.
- **App Móvil:** React Native + Axios.
- **Documentación:** Swagger / OpenAPI 3 (Interfaz interactiva para probar los endpoints).
- **Bases de Datos (Híbridas):**
  - **MySQL:** Usuarios, Roles e Historial (Estrategia de herencia `JOINED`).
  - **MongoDB:** Almacenamiento NoSQL para el banco de preguntas.
- **Infraestructura:** Docker & Docker Compose (MySQL & MongoDB).

---

## 🏗️ Arquitectura y Conectividad

El sistema destaca por su capacidad de comunicación con múltiples fuentes de datos:

1. **Persistencia Local:** MySQL para datos relacionales y MongoDB para documentos flexibles.
2. **Integración Externa (Jamendo):** Consumo de API REST externa para el hilo musical de la aplicación.
3. **Documentación Automática:** Gracias a Swagger, toda la API del backend está documentada y lista para ser probada desde el navegador en `/swagger-ui.html`.

---

## 📦 Instalación y Despliegue

### 🐳 Bases de Datos (Docker)
```bash
cd backend/database
docker-compose up -d
```

### Frontend Web (Vite + React)
```bash
cd frontend-web
npm install
npm run dev
```

### App Móvil (Expo)
```bash
cd frontend-movil
npm install
npx expo start
```
---

## 📝 Detalles Técnicos de Valor

- **Herencia JOINED:** Implementada en MySQL para la gestión de notificaciones, asegurando que si se elimina una clase padre, se limpien los registros hijos automáticamente.
- **Consumo de API REST:** Implementación de lógica para manejar peticiones asíncronas a Jamendo, garantizando que la música no bloquee la interfaz de usuario.
- **Multi-Client Ready:** Un único backend centralizado da servicio a la web, a la app móvil y expone su documentación mediante Swagger.

---

*Desarrollado por: Lola Pérez Martínez*
