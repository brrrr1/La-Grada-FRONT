# La Grada - Frontend

![logo](https://github.com/user-attachments/assets/b804a08e-2e1e-4287-86fa-8e61bd1aa78e)

## Descripción

El frontend de *La Grada* es una aplicación web desarrollada con Angular que proporciona una interfaz moderna y funcional para la gestión y visualización de eventos deportivos en un bar dedicado a la visualización de estos eventos. Permite a los usuarios registrarse, seleccionar su equipo favorito, comprar entradas y gestionar su perfil de usuario. La aplicación ofrece una experiencia inmersiva para los amantes del deporte, con un diseño intuitivo y responsivo.

## Requisitos

- Node.js (versión recomendada: la más reciente LTS)
- npm (incluido con Node.js)

## Instalación

1. Clonar el repositorio:
```sh
git clone https://github.com/brrrr1/La-Grada-FRONT
cd lagrada
```

2. Instalar dependencias:
```sh
npm install
```

3. Iniciar la aplicación:
```sh
ng serve
```

La aplicación se ejecutará en `http://localhost:4200`.

## Estructura del Proyecto

```
lagrada/
├── src/
│   ├── app/          # Componentes principales de la aplicación
│   ├── components/   # Componentes reutilizables
│   ├── pages/        # Páginas principales
│   ├── assets/       # Recursos estáticos
│   └── environments/ # Configuraciones de entorno
├── scripts/          # Scripts de utilidad
└── public/           # Archivos públicos
```

## Tecnologías Principales

- Angular 18.2.0
- Angular Material 18.2.14
- TypeScript 5.5.2
- RxJS 7.8.0
- JWT Decode 4.0.0

## Funcionalidades Principales

### Funcionalidades sin autenticación
- Registro de usuario
- Inicio de sesión
- Visualización de próximos eventos
- Visualización de eventos por equipo
- Consulta de detalles de equipos
- Verificación de disponibilidad de username y email

### Funcionalidades para usuarios autenticados
- Gestión de perfil de usuario
- Selección y cambio de equipo favorito
- Compra de entradas
- Visualización de eventos futuros
- Historial de eventos asistidos
- Gestión de entradas con QR

### Funcionalidades para administradores
- Gestión de equipos
- Gestión de eventos
- Administración de usuarios
- Gestión de archivos

## Usuarios de ejemplo
admin admin (ADMIN)
cr7 cr7 (USER)

Se recomienda crear un usuario para probar el envío de emails.

## PowerPoint resumen
Enlace: https://docs.google.com/presentation/d/1TBbe6J2-Z6oKHqHPN0k1oNSz0P3087SVS5fF-QXTfN0/edit?usp=sharing

## Documentación adicional
Enlace: https://docs.google.com/document/d/1MkGBZOaepc4jdsV4TH6qsEaVp0Mq45F3xwEbGwDzA08/edit?usp=sharing
