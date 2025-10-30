# ✅ Sistema de Testing, Linting y CI/CD

## 🎯 Resumen

Este proyecto ahora incluye un sistema completo de calidad de código con:

✅ **ESLint** - Linting de código  
✅ **Prettier** - Formateo automático  
✅ **Vitest** - Testing unitario  
✅ **Husky** - Git hooks (pre-commit y pre-push)  
✅ **Lint-staged** - Lint solo de archivos modificados  
✅ **GitHub Actions CI/CD** - Pipeline automatizado

## 📦 Instalación

Todas las dependencias ya están instaladas. Si clonas el repo:

```bash
npm install
npm run prepare  # Configura Husky
```

## 🚀 Comandos Principales

### Testing

```bash
npm test              # Tests en modo watch
npm run test:run      # Ejecuta tests una vez
npm run test:ui       # Interfaz visual
npm run test:coverage # Reporte de cobertura
```

### Linting

```bash
npm run lint          # Verifica código
npm run lint:fix      # Auto-corrige problemas
```

### Formateo

```bash
npm run format        # Formatea todo el código
npm run format:check  # Solo verifica formato
```

### Verificación completa

```bash
npm run check         # Ejecuta: astro check + lint + format check
```

## 🪝 Git Hooks (Husky)

### Pre-commit

Se ejecuta automáticamente antes de cada commit:

- ✅ Lint en archivos modificados
- ✅ Formateo automático con Prettier
- ❌ Cancela el commit si hay errores

### Pre-push

Se ejecuta automáticamente antes de cada push:

- ✅ Ejecuta todos los tests
- ❌ Cancela el push si los tests fallan

**Para saltarlos (emergencia):**

```bash
git commit --no-verify
git push --no-verify
```

## 🔄 CI/CD Pipeline

El pipeline de GitHub Actions se ejecuta en cada push/PR:

1. ✅ Verificación de formato (`format:check`)
2. ✅ Linting (`lint`)
3. ✅ Tests (`test:run`)
4. ✅ Type checking (`astro check`)
5. ✅ Build (`build`)
6. 📦 Subida de artefactos (build + coverage)

**Se ejecuta en:**

- Node.js 18.x
- Node.js 20.x

## 📁 Archivos Configurados

```
.github/workflows/ci.yml    # Pipeline de CI/CD
.husky/
  ├── pre-commit            # Hook pre-commit
  └── pre-push              # Hook pre-push
eslint.config.js            # Configuración ESLint
.prettierrc                 # Configuración Prettier
.prettierignore             # Archivos ignorados por Prettier
vitest.config.ts            # Configuración Vitest
package.json                # Scripts y lint-staged config
```

## 🧪 Tests Existentes

```
src/test/
  ├── storage.test.ts       # Tests del módulo de storage R2
  ├── utils.test.ts         # Tests básicos
  └── setup.ts              # Configuración global de tests

src/components/__tests__/
  ├── ErrorBoundary.test.tsx
  └── MaterialCard.test.tsx

src/types/__tests__/
  └── utilities.test.ts
```

**Total:** 41 tests pasando ✅

## 📊 Resultados Actuales

```
Tests:    41 passed
Linting:  ✅ Sin errores
Format:   ✅ Código formateado
Build:    ✅ Compilando correctamente
```

## 🔧 Configuración de ESLint

**Reglas principales:**

- TypeScript strict checks
- React/JSX accessibility (a11y)
- Astro best practices
- Console.log solo para warn/error
- Variables no usadas → warning

**Archivos ignorados:**

- `dist/`, `.astro/`, `node_modules/`
- `scripts/`, `coverage/`
- `*.config.js/ts`

## 💅 Configuración de Prettier

**Estilo:**

- Punto y coma: ✅ Sí
- Comillas: Dobles (`"`)
- Espacios: 2
- Print width: 100 caracteres
- Trailing commas: ES5

## 📈 Cobertura de Tests

Para generar y ver el reporte:

```bash
npm run test:coverage
open coverage/index.html  # macOS
xdg-open coverage/index.html  # Linux
```

## 🎯 Workflow Recomendado

1. **Crear feature branch:**

   ```bash
   git checkout -b feature/mi-feature
   ```

2. **Desarrollar con tests:**

   ```bash
   npm run dev           # Terminal 1
   npm test              # Terminal 2
   ```

3. **Antes de commit:**

   ```bash
   npm run check         # Verifica todo
   git add .
   git commit -m "feat: mi cambio"  # Pre-commit hook automático
   ```

4. **Antes de push:**

   ```bash
   npm run test:run      # Asegúrate que pasen
   git push              # Pre-push hook automático
   ```

5. **Crear Pull Request:**
   - CI/CD ejecutará todas las verificaciones
   - Espera los checks verdes ✅
   - Solicita code review

## 🚨 Solución de Problemas

### Husky no funciona

```bash
npm run prepare
chmod +x .husky/pre-commit .husky/pre-push
```

### Tests fallan en CI pero no local

```bash
npm ci              # Instala como en CI
npm run test:run    # Ejecuta en modo CI
```

### ESLint tiene muchos warnings

```bash
npm run lint:fix    # Auto-corrige lo posible
```

### Prettier conflicta con ESLint

Ya está configurado `eslint-config-prettier` para evitar conflictos.

## 📚 Documentación Completa

Para más detalles, consulta:

- `CALIDAD_CODIGO.md` - Guía completa del sistema de calidad

## 🎉 ¡Listo para Usar!

El sistema está completamente configurado y funcionando. Cada commit y push ejecutará las verificaciones automáticamente.

**¡Happy coding!** 🚀
