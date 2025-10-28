# 🚀 Guía Rápida: Configuración de Cloudflare R2

## Paso 1: Crear cuenta y bucket en Cloudflare R2

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. En el menú lateral, selecciona **R2**
3. Haz clic en **Create bucket**
4. Nombra tu bucket: `recursos`
5. Selecciona una ubicación cercana a tus usuarios
6. Haz clic en **Create bucket**

## Paso 2: Generar credenciales de API

1. En el dashboard de R2, haz clic en **Manage R2 API Tokens**
2. Haz clic en **Create API Token**
3. Configura los permisos:
   - **Token name**: `epauta-api-token`
   - **Permissions**: Object Read & Write
   - **TTL**: No limit (o el tiempo que prefieras)
   - **Bucket**: `recursos` (o selecciona todos)
4. Haz clic en **Create API Token**
5. **¡IMPORTANTE!** Guarda el **Access Key ID** y **Secret Access Key** inmediatamente
   - No podrás volver a ver el Secret Access Key

## Paso 3: Obtener el Endpoint

El endpoint de R2 tiene este formato:
```
https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

Para encontrar tu `ACCOUNT_ID`:
1. En el dashboard de Cloudflare, ve a cualquier sección de R2
2. Busca en la URL o en la página el **Account ID**
3. También aparece en la página de API Tokens

## Paso 4: Configurar dominio público (Recomendado)

### Opción A: Usar dominio R2.dev (Más fácil)

1. Ve a tu bucket en el dashboard de R2
2. En **Settings**, busca **Public access**
3. Habilita **Allow Access** en R2.dev subdomain
4. Copia el dominio que te dan (ej: `recursos.abc123.r2.dev`)
5. Usa este dominio en `R2_PUBLIC_DOMAIN`

### Opción B: Usar dominio personalizado (Recomendado para producción)

1. Ve a tu bucket en el dashboard de R2
2. En **Settings**, busca **Custom Domains**
3. Haz clic en **Connect Domain**
4. Ingresa tu dominio (ej: `recursos.miapp.com`)
5. Sigue las instrucciones para configurar el DNS
6. Usa este dominio en `R2_PUBLIC_DOMAIN`

**Ventajas del dominio personalizado:**
- URLs más limpias
- Control total del CDN
- SSL incluido

## Paso 5: Configurar variables de entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` con tus valores:
   ```bash
   # Reemplaza <ACCOUNT_ID> con tu Account ID real
   R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
   
   # Pega las credenciales que guardaste en el Paso 2
   R2_ACCESS_KEY_ID=tu_access_key_id_aqui
   R2_SECRET_ACCESS_KEY=tu_secret_access_key_aqui
   
   # Nombre de tu bucket
   R2_BUCKET_NAME=recursos
   
   # El dominio que configuraste en el Paso 4
   R2_PUBLIC_DOMAIN=https://recursos.abc123.r2.dev
   # O tu dominio personalizado:
   # R2_PUBLIC_DOMAIN=https://recursos.miapp.com
   ```

## Paso 6: Probar la conexión

Ejecuta el script de prueba:
```bash
npm run test:r2
```

Deberías ver:
```
🔍 Probando conexión con Cloudflare R2...
✅ Bucket accesible
✅ Dominio público configurado
🎉 ¡Todas las pruebas pasaron exitosamente!
```

Si hay errores, el script te dará sugerencias de cómo solucionarlos.

## Paso 7: Migrar archivos desde Supabase

Si tienes archivos en Supabase Storage que necesitas migrar:

1. Asegúrate de tener también las variables de Supabase en `.env`:
   ```bash
   SUPABASE_URL=tu_supabase_url
   SUPABASE_KEY=tu_supabase_key
   SUPABASE_BUCKET=recursos
   ```

2. Ejecuta el script de migración:
   ```bash
   npm run migrate:r2
   ```

3. El script:
   - Listará todos los archivos en Supabase
   - Los descargará uno por uno
   - Los subirá a R2 manteniendo la estructura
   - Te mostrará el progreso y un resumen final

## Paso 8: Probar localmente

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre http://localhost:4321 en tu navegador

3. Verifica que:
   - Los archivos se listen correctamente
   - Las URLs de los PDFs funcionen
   - El visor de PDF cargue los documentos
   - La búsqueda funcione

## Paso 9: Configurar CORS (Si es necesario)

Si al abrir el sitio ves errores de CORS en la consola:

1. Ve a tu bucket en el dashboard de R2
2. En **Settings**, busca **CORS policy**
3. Añade esta configuración:

```json
[
  {
    "AllowedOrigins": [
      "http://localhost:4321",
      "https://tu-dominio-produccion.com"
    ],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

## Paso 10: Desplegar a producción

1. En Vercel/Netlify/tu hosting, añade las variables de entorno:
   - `R2_ENDPOINT`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_BUCKET_NAME`
   - `R2_PUBLIC_DOMAIN`

2. Haz deploy:
   ```bash
   git add .
   git commit -m "Migrado a Cloudflare R2"
   git push
   ```

3. Verifica que todo funcione en producción

## ✅ Checklist Final

- [ ] Bucket creado en Cloudflare R2
- [ ] API Token generado y guardado
- [ ] Dominio público configurado (R2.dev o personalizado)
- [ ] Variables de entorno configuradas en `.env`
- [ ] Conexión probada con `npm run test:r2`
- [ ] Archivos migrados desde Supabase (si aplica)
- [ ] Probado localmente y funcionando
- [ ] CORS configurado (si es necesario)
- [ ] Variables de entorno en producción
- [ ] Desplegado y funcionando en producción

## 🆘 Soporte

Si tienes problemas:

1. Revisa los logs del script de prueba: `npm run test:r2`
2. Verifica que todas las variables estén correctas en `.env`
3. Revisa la consola del navegador para errores de CORS
4. Consulta la documentación completa en `MIGRACION_R2.md`
5. Revisa los cambios realizados en `CAMBIOS_REALIZADOS.md`

## 📚 Recursos útiles

- [Documentación de R2](https://developers.cloudflare.com/r2/)
- [Configurar dominios personalizados](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains)
- [Políticas CORS en R2](https://developers.cloudflare.com/r2/buckets/cors/)
- [Pricing de R2](https://developers.cloudflare.com/r2/pricing/)
