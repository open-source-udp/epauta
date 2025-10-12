# Migración de Supabase Storage a Cloudflare R2

## Resumen de cambios

Este proyecto ha sido migrado de Supabase Storage a Cloudflare R2. Cloudflare R2 es compatible con S3, lo que proporciona almacenamiento de objetos escalable sin costos de salida de datos.

## Cambios realizados

### 1. Dependencias actualizadas

**Añadido:**
- `@aws-sdk/client-s3`: Cliente AWS SDK v3 para S3 (compatible con R2)
- `@aws-sdk/s3-request-presigner`: Para generar URLs firmadas

**Mantenido:**
- `@supabase/supabase-js`: Se mantiene porque todavía se usa para autenticación (login/signup)

### 2. Nuevo archivo de configuración

**`src/lib/storage.ts`**
- Implementa una interfaz compatible con la API de Supabase Storage
- Usa AWS SDK v3 para conectarse a Cloudflare R2
- Mantiene la misma estructura de llamadas (`storage.from().list()`, `getPublicUrl()`)
- Soporta:
  - Listado de archivos con opciones de paginación y ordenamiento
  - URLs públicas (si el bucket es público con dominio personalizado)
  - URLs firmadas (para buckets privados)

### 3. Archivos actualizados

Todos los archivos que usaban `supabase.storage` han sido actualizados para usar el nuevo módulo `storage`:

**Componentes:**
- `src/components/Ramo.astro`
- `src/components/Discplina.astro`
- `src/components/RamoGrado.astro`

**Páginas:**
- `src/pages/[codigo].astro`
- `src/pages/eit/examen-grado/informatica/[codigo].astro`
- `src/pages/eit/examen-grado/gestion/[codigo].astro`
- `src/pages/eit/examen-grado/telecomunicaciones/[codigo].astro`

### 4. Estructura del bucket

La estructura del bucket en R2 sigue siendo la misma que en Supabase:

```
recursos/
├── CODIGO_RAMO_1/
│   ├── archivo1.pdf
│   └── archivo2.pdf
├── CODIGO_RAMO_2/
│   └── archivo3.pdf
├── GRADE/
│   ├── INF/
│   │   └── CODIGO/
│   ├── GES/
│   │   └── CODIGO/
│   └── TEL/
│       └── CODIGO/
```

## Configuración

### 1. Crear un bucket en Cloudflare R2

1. Ve al dashboard de Cloudflare
2. Navega a R2 Object Storage
3. Crea un nuevo bucket llamado `recursos` (o el nombre que prefieras)
4. Configura las opciones de acceso público si es necesario

### 2. Obtener credenciales de API

1. En el dashboard de R2, ve a "Manage R2 API Tokens"
2. Crea un nuevo API token con permisos de lectura para el bucket
3. Guarda el Access Key ID y Secret Access Key

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y configura las siguientes variables:

```bash
# El endpoint de tu cuenta de R2
R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com

# Credenciales de API
R2_ACCESS_KEY_ID=tu_access_key_id
R2_SECRET_ACCESS_KEY=tu_secret_access_key

# Nombre del bucket
R2_BUCKET_NAME=recursos

# Opcional: Dominio público personalizado
R2_PUBLIC_DOMAIN=https://tu-dominio.com
```

**Para obtener tu Account ID:**
- Ve al dashboard de Cloudflare
- El Account ID aparece en la barra lateral o en la URL del dashboard de R2

### 4. Configurar dominio público (opcional pero recomendado)

Para servir archivos públicamente sin necesidad de URLs firmadas:

1. En el dashboard de R2, selecciona tu bucket
2. Ve a "Settings" > "Public Access"
3. Habilita el acceso público
4. Configura un dominio personalizado (recomendado) o usa el dominio R2.dev
5. Añade el dominio a la variable `R2_PUBLIC_DOMAIN` en tu `.env`

### 5. Migrar archivos de Supabase a R2

Puedes usar herramientas como `rclone` o scripts personalizados para migrar los archivos:

**Ejemplo con AWS CLI (compatible con R2):**

```bash
# Configurar AWS CLI con credenciales de R2
aws configure --profile r2

# Copiar archivos (necesitarías exportar desde Supabase primero)
aws s3 sync ./archivos-supabase s3://recursos --endpoint-url=https://<account_id>.r2.cloudflarestorage.com --profile r2
```

## API de Storage

El nuevo módulo de storage mantiene compatibilidad con la API de Supabase:

### Listar archivos

```typescript
const { data, error } = await storage.from("epauta").list("CODIGO_RAMO", {
  limit: 100,
  offset: 0,
  sortBy: { column: "name", order: "asc" },
});
```

### Obtener URL pública

```typescript
const { data: publicUrlData } = storage
  .from("epauta")
  .getPublicUrl("CODIGO_RAMO/archivo.pdf");
```

### Crear URL firmada (opcional)

```typescript
const { data, error } = await storage
  .from("epauta")
  .createSignedUrl("CODIGO_RAMO/archivo.pdf", 3600);
```

## Ventajas de R2 vs Supabase Storage

1. **Sin costos de salida de datos**: R2 no cobra por transferencia de datos
2. **Compatible con S3**: Amplio ecosistema de herramientas
3. **Integración con Cloudflare**: CDN global incluido
4. **Precios competitivos**: $0.015/GB almacenado por mes

## Consideraciones

- **URLs públicas**: Si no configuras un dominio público, necesitarás generar URLs firmadas para cada archivo
- **CORS**: Asegúrate de configurar las reglas CORS en tu bucket si accedes desde el navegador
- **Caché**: Aprovecha el CDN de Cloudflare para cachear archivos estáticos

## Próximos pasos

1. Configurar las variables de entorno en `.env`
2. Migrar los archivos de Supabase Storage a R2
3. Probar localmente con `npm run dev`
4. Verificar que todos los archivos se muestran correctamente
5. Desplegar a producción

**Nota:** La dependencia de `@supabase/supabase-js` se mantiene porque todavía se usa para autenticación en las páginas de login y signup.

## Soporte

Si necesitas generar URLs firmadas para buckets privados, puedes usar el método `createSignedUrl()` incluido en el módulo de storage.
