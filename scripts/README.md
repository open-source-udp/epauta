# Scripts de Cloudflare R2

Este directorio contiene scripts para trabajar con Cloudflare R2.

## Scripts disponibles

### 1. Test de conexión R2

**Archivo:** `test-r2-connection.js`

Prueba la conexión con Cloudflare R2 y verifica que la configuración sea correcta.

```bash
npm run test:r2
```

**Qué hace:**
- Verifica las variables de entorno
- Prueba el acceso al bucket
- Lista los primeros 10 archivos (si existen)
- Verifica el dominio público configurado

### 2. Upload de archivos a R2

**Archivo:** `upload-to-r2.js`

Sube archivos desde `src/data/upload/` a Cloudflare R2.

```bash
npm run upload:r2
```

**Qué hace:**
- Lee todas las carpetas de carreras en `src/data/upload/`
- Por cada código de ramo que contenga archivos, los sube a R2
- Crea la estructura de carpetas en R2: `carrera/CODIGO/archivo.pdf`
- Muestra un resumen de los archivos subidos

**Estructura esperada en R2:**
```
epauta/
├── plan-comun/
│   ├── CBM-1000/
│   │   ├── pauta_certamen1.pdf
│   │   └── pauta_certamen2.pdf
│   └── CIT-1000/
│       └── apuntes.pdf
├── eit/
│   ├── CIT-2006/
│   │   └── proyecto.pdf
│   └── ...
├── eoc/
│   └── ...
└── eii/
    └── ...
```

**Tipos de archivos soportados:**
- PDF (.pdf)
- Imágenes (.jpg, .jpeg, .png, .gif)
- Documentos Word (.doc, .docx)
- Hojas de cálculo (.xls, .xlsx)
- Presentaciones (.ppt, .pptx)
- Archivos de texto (.txt)

## Configuración requerida

Antes de ejecutar los scripts, asegúrate de tener configuradas las siguientes variables de entorno en tu archivo `.env`:

```bash
# Endpoint de tu cuenta de R2
R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com

# Credenciales de API
R2_ACCESS_KEY_ID=tu_access_key_id
R2_SECRET_ACCESS_KEY=tu_secret_access_key

# Nombre del bucket
R2_BUCKET_NAME=epauta

# Opcional: Dominio público personalizado
R2_PUBLIC_DOMAIN=https://tu-dominio.com
```

## Flujo de trabajo para subir archivos

1. **Coloca tus archivos** en las carpetas correspondientes de `src/data/upload/`:
   ```bash
   src/data/upload/
   ├── plan-comun/
   │   └── CBM-1000/
   │       └── pauta.pdf    # <-- Coloca tus PDFs aquí
   ├── eit/
   │   └── CIT-2006/
   │       └── proyecto.pdf
   └── ...
   ```

2. **Verifica la conexión** (opcional pero recomendado):
   ```bash
   npm run test:r2
   ```

3. **Sube los archivos** a R2:
   ```bash
   npm run upload:r2
   ```

4. **Revisa el resumen** para confirmar que todos los archivos se subieron correctamente.

## Notas importantes

- Los archivos se subirán con el mismo nombre que tienen en la carpeta local
- Si un archivo ya existe en R2, será sobrescrito
- Solo se procesan archivos directos en cada carpeta de código (no subcarpetas)
- Las carpetas vacías no se procesan ni se crean en R2
- El script muestra estadísticas detalladas al finalizar

## Solución de problemas

### Error: "Faltan variables de entorno requeridas"
Verifica que tu archivo `.env` tenga todas las variables configuradas correctamente.

### Error: "No se puede acceder al bucket"
- Verifica que el bucket existe en Cloudflare R2
- Confirma que las credenciales tienen permisos para el bucket
- Revisa que el endpoint sea correcto

### Error: "No se encontraron archivos para subir"
- Verifica que hayas colocado archivos en las carpetas de `src/data/upload/`
- Asegúrate de que los archivos están directamente en las carpetas de códigos, no en subcarpetas

## Ejemplos de salida

### Test de conexión exitoso
```
🔍 Probando conexión con Cloudflare R2...

📝 Configuración:
   Endpoint: https://xxxxx.r2.cloudflarestorage.com
   Bucket: epauta
   Access Key: ✅ Configurado
   Secret Key: ✅ Configurado

🧪 Test 1: Verificando acceso al bucket...
✅ Bucket accesible

🎉 ¡Todas las pruebas pasaron exitosamente!
```

### Upload exitoso
```
🚀 Iniciando subida de archivos a Cloudflare R2...

📤 Procesando archivos...

🎓 Procesando PLAN-COMUN...

📂 plan-comun/CBM-1000 - 2 archivo(s)
   ✅ plan-comun/CBM-1000/pauta_c1.pdf (125.34 KB)
   ✅ plan-comun/CBM-1000/pauta_c2.pdf (98.12 KB)

📊 Resumen de la operación:

   Total de archivos procesados: 2
   ✅ Archivos subidos: 2
   ❌ Errores: 0

🎉 ¡Subida completada exitosamente!
```
