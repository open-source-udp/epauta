# Resumen de Cambios: Migración a Cloudflare R2

## ✅ Archivos Creados

1. **`src/lib/storage.ts`** - Nueva interfaz de storage compatible con R2
   - Implementa API compatible con Supabase Storage
   - Usa AWS SDK v3 para conectar con R2
   - Soporta listado de archivos, URLs públicas y URLs firmadas

2. **`.env.example`** - Plantilla de variables de entorno
   - Documenta todas las variables necesarias para R2
   - Incluye ejemplos y descripciones

3. **`MIGRACION_R2.md`** - Documentación completa de la migración
   - Guía paso a paso para configurar R2
   - Explicación de cambios realizados
   - Instrucciones para migrar archivos

4. **`scripts/migrate-to-r2.js`** - Script automatizado de migración
   - Descarga todos los archivos de Supabase
   - Sube archivos a R2 manteniendo la estructura
   - Incluye manejo de errores y progreso

## 🔄 Archivos Modificados

### Componentes
- ✅ `src/components/Ramo.astro` - Actualizado para usar `storage`
- ✅ `src/components/Discplina.astro` - Actualizado para usar `storage`
- ✅ `src/components/RamoGrado.astro` - Actualizado para usar `storage`

### Páginas
- ✅ `src/pages/[codigo].astro` - Actualizado para usar `storage`
- ✅ `src/pages/index.astro` - Removida importación no usada de supabase
- ✅ `src/pages/eit/examen-grado/informatica/[codigo].astro` - Actualizado para usar `storage`
- ✅ `src/pages/eit/examen-grado/gestion/[codigo].astro` - Actualizado para usar `storage`
- ✅ `src/pages/eit/examen-grado/telecomunicaciones/[codigo].astro` - Actualizado para usar `storage`

### Configuración
- ✅ `src/lib/db.ts` - Añadido comentario de deprecación para storage
- ✅ `package.json` - Añadido script `migrate:r2`

## 📦 Dependencias

### Añadidas
- `@aws-sdk/client-s3` - Cliente AWS SDK v3 para S3/R2
- `@aws-sdk/s3-request-presigner` - Para generar URLs firmadas
- `dotenv` (dev) - Para el script de migración

### Mantenidas
- `@supabase/supabase-js` - Todavía se usa para autenticación

## 🔑 Variables de Entorno Requeridas

```bash
# Cloudflare R2
R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=tu_access_key_id
R2_SECRET_ACCESS_KEY=tu_secret_access_key
R2_BUCKET_NAME=recursos
R2_PUBLIC_DOMAIN=https://tu-dominio.com  # Opcional

# Supabase (solo para auth)
SUPABASE_URL=tu_supabase_url
SUPABASE_KEY=tu_supabase_key

# Solo para migración (temporal)
SUPABASE_BUCKET=recursos
```

## 🚀 Próximos Pasos

1. **Configurar Cloudflare R2:**
   - Crear bucket en Cloudflare
   - Generar credenciales de API
   - Configurar dominio público (recomendado)

2. **Configurar Variables de Entorno:**
   ```bash
   cp .env.example .env
   # Editar .env con tus valores
   ```

3. **Migrar Archivos:**
   ```bash
   npm run migrate:r2
   ```

4. **Probar Localmente:**
   ```bash
   npm run dev
   ```

5. **Verificar Funcionamiento:**
   - Revisar que los archivos se listen correctamente
   - Verificar que las URLs funcionen
   - Probar búsqueda y navegación

6. **Desplegar a Producción:**
   - Actualizar variables de entorno en Vercel/hosting
   - Hacer deploy
   - Verificar en producción

## 📝 Notas Importantes

- ✅ La estructura del bucket se mantiene idéntica
- ✅ La API es compatible con el código existente
- ✅ Supabase se mantiene para autenticación
- ✅ R2 no cobra por transferencia de datos
- ⚠️  Necesitas configurar CORS en R2 si accedes desde el navegador
- ⚠️  Configura un dominio público para mejor rendimiento

## 🆘 Solución de Problemas

### Error: "Bucket not found"
- Verifica que el bucket existe en R2
- Verifica el nombre del bucket en R2_BUCKET_NAME

### Error: "Access Denied"
- Verifica las credenciales R2_ACCESS_KEY_ID y R2_SECRET_ACCESS_KEY
- Asegúrate de que el token tiene permisos de lectura

### Archivos no se muestran
- Verifica R2_PUBLIC_DOMAIN si usas dominio personalizado
- Revisa la configuración de acceso público del bucket
- Verifica CORS si hay errores en la consola del navegador

### Error al migrar archivos
- Verifica que tienes las variables SUPABASE_URL y SUPABASE_KEY
- Asegúrate de que los archivos son públicos en Supabase
- Revisa los logs del script para ver errores específicos

## 📚 Recursos

- [Documentación de Cloudflare R2](https://developers.cloudflare.com/r2/)
- [AWS SDK v3 para JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/)
- [S3 API Reference](https://docs.aws.amazon.com/AmazonS3/latest/API/)

---

**Migración completada el:** ${new Date().toLocaleDateString('es-ES')}
