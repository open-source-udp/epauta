# 🛠️ Sistema de Calidad de Código

Este proyecto utiliza varias herramientas para mantener la calidad del código y prevenir errores.

## 🔍 Herramientas Instaladas

### ESLint

Analizador de código estático para identificar patrones problemáticos en JavaScript/TypeScript.

**Configuración:** `eslint.config.js`

### Prettier

Formateador de código para mantener un estilo consistente.

**Configuración:** `.prettierrc`

### Vitest

Framework de testing unitario rápido y moderno.

**Configuración:** `vitest.config.ts`

### Husky

Hooks de Git para ejecutar scripts antes de commits y pushes.

**Configuración:** `.husky/`

### Lint-staged

Ejecuta linters solo en archivos staged (preparados para commit).

**Configuración:** En `package.json` bajo `"lint-staged"`

## 📝 Scripts Disponibles

### Desarrollo

```bash
npm run dev           # Inicia el servidor de desarrollo
npm run build         # Construye el proyecto para producción
npm run preview       # Preview del build de producción
```

### Testing

```bash
npm test              # Ejecuta tests en modo watch
npm run test:run      # Ejecuta tests una sola vez
npm run test:ui       # Abre interfaz visual para tests
npm run test:coverage # Genera reporte de cobertura
```

### Linting y Formateo

```bash
npm run lint          # Revisa el código con ESLint
npm run lint:fix      # Corrige problemas de ESLint automáticamente
npm run format        # Formatea todo el código con Prettier
npm run format:check  # Verifica si el código está formateado
npm run check         # Ejecuta astro check + lint + format check
```

### Migración R2

```bash
npm run test:r2       # Prueba la conexión con Cloudflare R2
npm run migrate:r2    # Migra archivos de Supabase a R2
```

## 🪝 Git Hooks

### Pre-commit

Se ejecuta automáticamente **antes de cada commit**.

**Acciones:**

- ✅ Ejecuta ESLint en archivos modificados
- ✅ Formatea código con Prettier
- ✅ Solo en archivos que vas a commitear (staged)

Si hay errores, el commit se cancelará hasta que los corrijas.

**Para saltarlo (no recomendado):**

```bash
git commit --no-verify -m "mensaje"
```

### Pre-push

Se ejecuta automáticamente **antes de cada push**.

**Acciones:**

- ✅ Ejecuta todos los tests
- ✅ Verifica que no haya tests fallando

Si los tests fallan, el push se cancelará hasta que los corrijas.

**Para saltarlo (no recomendado):**

```bash
git push --no-verify
```

## 📊 CI/CD Pipeline

El pipeline de GitHub Actions ejecuta en cada push y pull request:

1. **Verificación de formato** - `npm run format:check`
2. **Linting** - `npm run lint`
3. **Tests** - `npm run test:run`
4. **Type checking** - `npm run astro check`
5. **Build** - `npm run build`
6. **Subida de artefactos** - Build y coverage reports

**Matrices de testing:**

- Node.js 18.x
- Node.js 20.x

## 🧪 Escribiendo Tests

### Estructura de archivos

Los tests deben estar en:

- `src/**/*.test.ts` - Tests unitarios junto al código
- `src/**/*.spec.ts` - Tests de especificación
- `tests/**/*.test.ts` - Tests de integración

### Ejemplo básico

```typescript
import { describe, it, expect } from 'vitest'
import { miFunction } from './miModulo'

describe('miModulo', () => {
  it('debe hacer algo', () => {
    const resultado = miFunction()
    expect(resultado).toBe('esperado')
  })
})
```

### Tests con async/await

```typescript
import { describe, it, expect } from 'vitest'

describe('async operations', () => {
  it('debe manejar promesas', async () => {
    const resultado = await fetchData()
    expect(resultado).toBeDefined()
  })
})
```

### Mocks

```typescript
import { vi, describe, it, expect } from 'vitest'

describe('with mocks', () => {
  it('debe mockear funciones', () => {
    const mockFn = vi.fn(() => 'mocked')
    expect(mockFn()).toBe('mocked')
    expect(mockFn).toHaveBeenCalled()
  })
})
```

## 🔧 Configuración de ESLint

### Reglas principales

- ✅ TypeScript strict checks
- ✅ React/JSX accessibility (a11y)
- ✅ Astro best practices
- ⚠️ Console.log permitido solo para warn/error
- ⚠️ Variables no usadas generan advertencias

### Ignorar archivos

Edita `eslint.config.js` para añadir patrones a ignorar.

### Desactivar regla en archivo específico

```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
const data: any = fetchData()
/* eslint-enable @typescript-eslint/no-explicit-any */
```

### Desactivar regla en línea

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData()
```

## 💅 Configuración de Prettier

### Reglas actuales

- Punto y coma: **Sí**
- Comillas: **Dobles**
- Tab width: **2 espacios**
- Trailing commas: **ES5**
- Print width: **100 caracteres**

### Cambiar configuración

Edita `.prettierrc` según tus preferencias.

### Ignorar archivos

Añade patrones a `.prettierignore`.

## 📈 Cobertura de Tests

Para ver el reporte de cobertura:

```bash
npm run test:coverage
```

El reporte se genera en `coverage/`:

- `coverage/index.html` - Reporte visual HTML
- `coverage/coverage-final.json` - Datos JSON

**Objetivo de cobertura recomendado:** 80% o más

## 🚨 Solución de Problemas

### Error: "Husky command not found"

```bash
npm run prepare
```

### Error: "Cannot find module vitest"

```bash
npm install
```

### Tests muy lentos

Usa el modo UI para debugging:

```bash
npm run test:ui
```

### ESLint encuentra muchos errores

Intenta auto-fix primero:

```bash
npm run lint:fix
```

### Prettier conflicta con ESLint

La configuración ya incluye `eslint-config-prettier` para evitar conflictos.

## 📚 Recursos

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [Vitest Documentation](https://vitest.dev/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🎯 Best Practices

1. **Ejecuta tests localmente** antes de hacer push
2. **Usa `npm run check`** antes de crear un PR
3. **Escribe tests para nuevo código** antes de commitear
4. **Mantén cobertura alta** (>80%)
5. **No hagas commit de console.log** para debug
6. **Usa variables con nombres descriptivos**
7. **Comenta código complejo** con explicaciones
8. **Sigue convenciones de nombres** del proyecto

## 🔄 Workflow Recomendado

1. **Antes de empezar:**

   ```bash
   git checkout -b feature/mi-feature
   npm run dev
   ```

2. **Durante el desarrollo:**

   ```bash
   npm test          # En otra terminal
   npm run lint      # Periódicamente
   ```

3. **Antes de commit:**

   ```bash
   npm run check     # Verifica todo
   git add .
   git commit -m "feat: descripción"  # El pre-commit hook se ejecuta automáticamente
   ```

4. **Antes de push:**

   ```bash
   npm run test:run  # Asegúrate que pasen todos
   git push          # El pre-push hook se ejecuta automáticamente
   ```

5. **Crear Pull Request:**
   - CI/CD ejecutará todas las verificaciones
   - Espera que pasen todos los checks ✅
   - Solicita review del equipo

---

**Última actualización:** ${new Date().toLocaleDateString('es-ES')}
