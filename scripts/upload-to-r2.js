#!/usr/bin/env node

/**
 * Script para subir archivos desde src/data/upload/ a Cloudflare R2
 *
 * Este script:
 * 1. Lee todas las carpetas de carreras en src/data/upload/
 * 2. Por cada código de ramo, sube los archivos encontrados a R2
 * 3. Crea la estructura de carpetas en R2: carrera/CODIGO/archivo.pdf
 *
 * Uso: node scripts/upload-to-r2.js
 */

import { S3Client, PutObjectCommand, HeadBucketCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';
import { readdir, readFile, stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.R2_BUCKET_NAME || 'epauta';
const uploadDir = join(__dirname, '../src/data/upload');
const carreras = ['plan-comun', 'eit', 'eoc', 'eii'];

// Estadísticas
const stats = {
  totalFiles: 0,
  uploadedFiles: 0,
  skippedFiles: 0,
  errors: 0,
  carreras: {},
};

/**
 * Obtiene el content type basado en la extensión del archivo
 */
function getContentType(filename) {
  const ext = extname(filename).toLowerCase();
  const types = {
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.ppt': 'application/vnd.ms-powerpoint',
    '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    '.txt': 'text/plain',
  };
  return types[ext] || 'application/octet-stream';
}

/**
 * Sube un archivo a R2
 */
async function uploadFile(filePath, r2Key, carrera) {
  try {
    const fileContent = await readFile(filePath);
    const contentType = getContentType(filePath);

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: r2Key,
      Body: fileContent,
      ContentType: contentType,
    });

    await r2Client.send(command);
    stats.uploadedFiles++;
    stats.carreras[carrera] = (stats.carreras[carrera] || 0) + 1;

    const fileSize = (fileContent.length / 1024).toFixed(2);
    console.log(`   ✅ ${r2Key} (${fileSize} KB)`);

    return true;
  } catch (error) {
    stats.errors++;
    console.error(`   ❌ Error subiendo ${r2Key}: ${error.message}`);
    return false;
  }
}

/**
 * Procesa una carpeta de código de ramo
 */
async function processRamoFolder(carrera, codigo) {
  const ramoPath = join(uploadDir, carrera, codigo);

  try {
    const files = await readdir(ramoPath);
    const fileList = [];

    // Filtrar solo archivos (no directorios)
    for (const file of files) {
      const filePath = join(ramoPath, file);
      const fileStat = await stat(filePath);

      if (fileStat.isFile()) {
        fileList.push({ name: file, path: filePath });
      }
    }

    if (fileList.length === 0) {
      // No hay archivos en esta carpeta
      return 0;
    }

    console.log(`\n📂 ${carrera}/${codigo} - ${fileList.length} archivo(s)`);

    for (const file of fileList) {
      stats.totalFiles++;

      // La clave en R2 será: carrera/CODIGO/archivo.pdf
      const r2Key = `${carrera}/${codigo}/${file.name}`;
      await uploadFile(file.path, r2Key, carrera);
    }

    return fileList.length;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error(`   ⚠️  Error procesando ${carrera}/${codigo}: ${error.message}`);
    }
    return 0;
  }
}

/**
 * Procesa todas las carpetas de una carrera
 */
async function processCarrera(carrera) {
  const carreraPath = join(uploadDir, carrera);

  try {
    const codigos = await readdir(carreraPath);

    for (const codigo of codigos) {
      const codigoPath = join(carreraPath, codigo);
      const codigoStat = await stat(codigoPath);

      if (codigoStat.isDirectory()) {
        await processRamoFolder(carrera, codigo);
      }
    }
  } catch (error) {
    console.error(`❌ Error procesando carrera ${carrera}: ${error.message}`);
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando subida de archivos a Cloudflare R2...\n');

  // Validar configuración
  if (!process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error('❌ Error: Faltan variables de entorno requeridas\n');
    console.log('Asegúrate de configurar en tu archivo .env:');
    console.log('  - R2_ENDPOINT');
    console.log('  - R2_ACCESS_KEY_ID');
    console.log('  - R2_SECRET_ACCESS_KEY');
    console.log('  - R2_BUCKET_NAME (opcional, default: "epauta")');
    process.exit(1);
  }

  console.log('📝 Configuración:');
  console.log(`   Endpoint: ${process.env.R2_ENDPOINT}`);
  console.log(`   Bucket: ${bucketName}`);
  console.log(`   Carpeta local: ${uploadDir}\n`);

  // Verificar que el bucket existe
  try {
    await r2Client.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log('✅ Bucket accesible\n');
  } catch (error) {
    console.error(`❌ Error: No se puede acceder al bucket "${bucketName}"`);
    console.error(`   ${error.message}\n`);
    process.exit(1);
  }

  // Verificar que existe la carpeta upload
  try {
    await stat(uploadDir);
  } catch (error) {
    console.error(`❌ Error: No se encuentra la carpeta ${uploadDir}\n`);
    process.exit(1);
  }

  console.log('📤 Procesando archivos...\n');
  console.log('═══════════════════════════════════════════════════');

  // Procesar cada carrera
  for (const carrera of carreras) {
    console.log(`\n🎓 Procesando ${carrera.toUpperCase()}...`);
    await processCarrera(carrera);
  }

  // Mostrar resumen
  console.log('\n═══════════════════════════════════════════════════');
  console.log('\n📊 Resumen de la operación:\n');
  console.log(`   Total de archivos procesados: ${stats.totalFiles}`);
  console.log(`   ✅ Archivos subidos: ${stats.uploadedFiles}`);
  console.log(`   ⏭️  Archivos omitidos: ${stats.skippedFiles}`);
  console.log(`   ❌ Errores: ${stats.errors}\n`);

  if (Object.keys(stats.carreras).length > 0) {
    console.log('📈 Archivos por carrera:');
    for (const [carrera, count] of Object.entries(stats.carreras)) {
      console.log(`   ${carrera}: ${count} archivos`);
    }
  }

  if (stats.uploadedFiles > 0) {
    console.log('\n🎉 ¡Subida completada exitosamente!');

    if (process.env.R2_PUBLIC_DOMAIN) {
      console.log(`\n🌐 Los archivos están disponibles en: ${process.env.R2_PUBLIC_DOMAIN}`);
    }
  } else {
    console.log('\n⚠️  No se encontraron archivos para subir.');
    console.log('   Coloca archivos en las carpetas de src/data/upload/ para subirlos a R2.');
  }

  console.log('');
}

// Ejecutar script
main().catch((error) => {
  console.error('\n💥 Error fatal:', error.message);
  process.exit(1);
});
