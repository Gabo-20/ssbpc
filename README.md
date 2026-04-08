# SSBPC — Sistema de Seguimiento de Beneficiarios y Proyectos de Cooperación

Sistema web de gestión para ONGs en Guatemala. Permite el seguimiento de beneficiarios, proyectos de cooperación, hitos, presupuesto, reportes y auditoría.

## 🛠 Tech Stack

- **React 19** — Librería UI
- **Tailwind CSS 3** — Utilidades de estilos
- **React Router v7** (HashRouter) — Navegación SPA
- **Recharts** — Gráficas interactivas
- **Lucide React** — Iconografía

## 📄 Páginas del Sistema

| Ruta | Descripción |
|------|-------------|
| `/login` | Inicio de sesión |
| `/dashboard` | Dashboard con KPIs y gráfica |
| `/beneficiarios` | Gestión de beneficiarios |
| `/proyectos` | Gestión de proyectos |
| `/hitos` | Hitos y evidencias por proyecto |
| `/recursos` | Presupuesto y suministros |
| `/reportes` | Reportes e impacto |
| `/auditoria` | Registro de auditoría |

## ▶ Ejecutar en Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:3000)
npm start
```

> **Demo**: En la pantalla de login, ingrese cualquier correo y contraseña para acceder.

## 🏗 Compilar para Producción

```bash
npm run build
```

Los archivos estarán en la carpeta `/build`.

## 🚀 Despliegue en GitHub Pages

### 1. Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Configurar el repositorio en package.json

Edite `package.json` y reemplace la línea `homepage` con la URL de su GitHub Pages:

```json
"homepage": "https://<tu-usuario>.github.io/<nombre-del-repositorio>",
```

### 3. Crear el repositorio en GitHub

```bash
git init
git add .
git commit -m "Initial commit - SSBPC prototype"
git remote add origin https://github.com/<tu-usuario>/<nombre-repo>.git
git push -u origin main
```

### 4. Desplegar

```bash
npm run deploy
```

Esto ejecuta automáticamente `npm run build` y publica el contenido en la rama `gh-pages`.

### 5. Configurar GitHub Pages

En el repositorio de GitHub:
- Ve a **Settings** → **Pages**
- En "Source", selecciona la rama **gh-pages** y la carpeta **/(root)**
- Guarda los cambios

La app estará disponible en: `https://<tu-usuario>.github.io/<nombre-del-repositorio>`

> **Nota**: El sistema usa `HashRouter` (`#/ruta`) para compatibilidad con GitHub Pages sin necesidad de configuración de servidor.

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Layout.jsx       # Sidebar + Navbar
│   └── Modal.jsx        # Componente modal reutilizable
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Beneficiarios.jsx
│   ├── Proyectos.jsx
│   ├── Hitos.jsx
│   ├── Recursos.jsx
│   ├── Reportes.jsx
│   └── Auditoria.jsx
├── mockData.js          # Datos de prueba (Guatemala)
├── App.js               # Routing principal
└── index.css            # Estilos globales + Tailwind
```

## 📝 Notas

- Todos los datos son estáticos (mock data). No se requiere backend.
- Los formularios incluyen validación básica (campos requeridos, DPI único).
- El sistema es responsivo para dispositivos móviles.
- Los botones de exportación (PDF/Excel) son placeholders visuales.

---

Desarrollado para curso de Ingeniería de Software — UMG 2024.
