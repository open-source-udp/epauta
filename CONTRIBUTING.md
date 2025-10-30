# Guía de Contribución

Gracias por tu interés en contribuir a ePAUTA. Este documento te guiará a través del proceso de contribución.

## 📋 Tabla de contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del entorno de desarrollo](#configuración-del-entorno-de-desarrollo)
- [Proceso de desarrollo](#proceso-de-desarrollo)
- [Estándares de código](#estándares-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Reportar bugs](#reportar-bugs)
- [Sugerir mejoras](#sugerir-mejoras)

## 📜 Código de Conducta

Este proyecto se adhiere al [Código de Conducta](./CODE_OF_CONDUCT.md). Al participar, se espera que respetes este código.

## 🤝 ¿Cómo puedo contribuir?

Hay muchas formas de contribuir a ePAUTA:

- 🐛 Reportar bugs
- 💡 Proponer nuevas características
- 📝 Mejorar la documentación
- 🔧 Arreglar issues existentes
- ✨ Implementar nuevas funcionalidades
- 🎨 Mejorar el diseño y UX
- 🧪 Añadir tests

## 🛠️ Configuración del entorno de desarrollo

### Requisitos previos

- Node.js 18.0 o superior
- npm o pnpm
- Git
- Cuenta de Cloudflare (para desarrollo con R2)

### Configuración paso a paso

1. **Fork el repositorio**

   Haz clic en el botón "Fork" en la parte superior derecha de la página del repositorio.

2. **Clona tu fork**

   ```bash
   git clone https://github.com/TU_USUARIO/epauta.git
   cd epauta
   ```

3. **Añade el repositorio original como upstream**

   ```bash
   git remote add upstream https://github.com/open-source-udp/epauta.git
   ```

4. **Instala las dependencias**

   ```bash
   npm install
   ```

5. **Configura las variables de entorno**

   ```bash
   cp .env.example .env
   ```

   Edita `.env` con tus credenciales de desarrollo. Si no tienes acceso a R2, contacta al mantenedor del proyecto.

6. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:4321`

## 🔄 Proceso de desarrollo

### 1. Sincroniza tu fork

Antes de empezar a trabajar, asegúrate de tener la última versión del código:

```bash
git checkout main
git fetch upstream
git merge upstream/main
```

### 2. Crea una rama para tu trabajo

Usa un nombre descriptivo para tu rama:

```bash
# Para nuevas características
git checkout -b feature/nombre-de-la-caracteristica

# Para correcciones de bugs
git checkout -b fix/descripcion-del-bug

# Para documentación
git checkout -b docs/que-se-documenta

# Para refactorización
git checkout -b refactor/que-se-refactoriza
```

### 3. Desarrolla tu cambio

- Escribe código limpio y legible
- Sigue los estándares de código del proyecto
- Comenta tu código cuando sea necesario
- Asegúrate de que el código compile sin errores: `npm run build`

### 4. Prueba tus cambios

- Ejecuta la aplicación localmente: `npm run dev`
- Verifica que tu cambio funcione como se espera
- Prueba en diferentes navegadores si es posible
- Asegúrate de no romper funcionalidades existentes

## 📏 Estándares de código

### TypeScript

- Usa TypeScript para todo el código nuevo
- Define tipos explícitos cuando sea posible
- Evita el uso de `any`

```typescript
// ✅ Bien
interface User {
  name: string;
  email: string;
}

// ❌ Evitar
const user: any = { name: "John" };
```

### React Components

- Usa componentes funcionales con hooks
- Prefiere la composición sobre la herencia
- Mantén los componentes pequeños y enfocados

```tsx
// ✅ Bien
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// ❌ Evitar componentes muy grandes con múltiples responsabilidades
```

### Astro Components

- Usa `.astro` para componentes que no necesiten interactividad
- Usa `client:load`, `client:visible`, etc. sabiamente para optimizar

```astro
---
// Script de setup
const { title } = Astro.props;
---

<div>
  <h1>{title}</h1>
</div>
```

### Estilos

- Usa Tailwind CSS para estilos
- Mantén clases organizadas y legibles
- Usa componentes de shadcn/ui cuando sea posible

```tsx
// ✅ Bien
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">

// ❌ Evitar estilos inline
<div style={{ display: "flex", padding: "16px" }}>
```

### Nombrado

- **Archivos**: kebab-case para archivos (ej: `file-viewer.tsx`)
- **Componentes**: PascalCase (ej: `FileViewer`)
- **Funciones/Variables**: camelCase (ej: `getUserData`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `MAX_FILE_SIZE`)

## 💬 Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/) para mensajes de commit:

```
tipo(scope): descripción breve

[cuerpo opcional]

[footer opcional]
```

### Tipos de commit

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (espacios, punto y coma, etc.)
- `refactor`: Refactorización de código
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento

### Ejemplos

```bash
feat(pdf-viewer): add zoom controls to PDF viewer
fix(storage): handle R2 connection timeout errors
docs(readme): update installation instructions
refactor(components): extract FileViewer logic to custom hook
```

## 🔀 Pull Requests

### Antes de enviar tu PR

- [ ] Asegúrate de que tu código compila: `npm run build`
- [ ] Sincroniza tu rama con `main`: `git pull upstream main`
- [ ] Haz commit de todos tus cambios
- [ ] Escribe un buen mensaje de commit

### Crear el Pull Request

1. Push tu rama a tu fork:

   ```bash
   git push origin nombre-de-tu-rama
   ```

2. Ve a GitHub y crea un Pull Request desde tu rama hacia `main` del repositorio original

3. Completa la plantilla de PR con:
   - Descripción clara de los cambios
   - Tipo de cambio (bug fix, feature, etc.)
   - Screenshots si aplica
   - Issues relacionados

### Revisión del código

- Un mantenedor revisará tu PR
- Puede solicitar cambios o mejoras
- Una vez aprobado, tu PR será fusionado

### Después de que tu PR sea aceptado

- Elimina tu rama local:
  ```bash
  git branch -d nombre-de-tu-rama
  ```
- Sincroniza tu fork con upstream

## 🐛 Reportar bugs

### Antes de reportar

- Busca si el bug ya fue reportado en [Issues](https://github.com/open-source-udp/epauta/issues)
- Verifica que uses la última versión del código
- Intenta reproducir el bug en diferentes entornos

### ¿Cómo reportar?

1. Abre un nuevo [Issue](https://github.com/open-source-udp/epauta/issues/new)
2. Usa la plantilla de Bug Report
3. Incluye:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs. actual
   - Screenshots o videos si aplica
   - Información del entorno (OS, navegador, versión de Node.js)

## 💡 Sugerir mejoras

### Ideas de nuevas características

1. Abre un [Issue](https://github.com/open-source-udp/epauta/issues/new)
2. Usa la plantilla de Feature Request
3. Describe:
   - El problema que resuelve
   - La solución propuesta
   - Alternativas consideradas
   - Contexto adicional

## 📞 ¿Preguntas?

Si tienes preguntas sobre cómo contribuir:

- Abre un [Issue](https://github.com/open-source-udp/epauta/issues) con la etiqueta `question`
- Revisa las [Discusiones](https://github.com/open-source-udp/epauta/discussions) del proyecto

## 🙏 Agradecimientos

Cada contribución, sin importar su tamaño, es valorada y apreciada. Gracias por ayudar a mejorar ePAUTA.

---

¿Primera vez contribuyendo a un proyecto open source? Aquí hay algunos recursos útiles:

- [Cómo contribuir en GitHub](https://docs.github.com/es/get-started/quickstart/contributing-to-projects)
- [Entendiendo el flujo de GitHub](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
