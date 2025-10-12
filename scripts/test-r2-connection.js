#!/usr/bin/env node

/**
 * Script para probar la conexión con Cloudflare R2
 * 
 * Uso: node scripts/test-r2-connection.js
 */

import { S3Client, HeadBucketCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { config } from 'dotenv';

config();

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.R2_BUCKET_NAME || 'recursos';

async function testConnection() {
  console.log('🔍 Probando conexión con Cloudflare R2...\n');
  console.log('📝 Configuración:');
  console.log(`   Endpoint: ${process.env.R2_ENDPOINT || '❌ No configurado'}`);
  console.log(`   Bucket: ${bucketName}`);
  console.log(`   Access Key: ${process.env.R2_ACCESS_KEY_ID ? '✅ Configurado' : '❌ No configurado'}`);
  console.log(`   Secret Key: ${process.env.R2_SECRET_ACCESS_KEY ? '✅ Configurado' : '❌ No configurado'}`);
  console.log('');

  if (!process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error('❌ Error: Faltan variables de entorno requeridas');
    console.log('\nAsegúrate de configurar en tu archivo .env:');
    console.log('  - R2_ENDPOINT');
    console.log('  - R2_ACCESS_KEY_ID');
    console.log('  - R2_SECRET_ACCESS_KEY');
    process.exit(1);
  }

  try {
    // Test 1: Verificar que el bucket existe
    console.log('🧪 Test 1: Verificando acceso al bucket...');
    await r2Client.send(new HeadBucketCommand({ Bucket: bucketName }));
    console.log('✅ Bucket accesible\n');

    // Test 2: Listar algunos archivos
    console.log('🧪 Test 2: Listando archivos (primeros 10)...');
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 10,
    });
    
    const response = await r2Client.send(listCommand);
    
    if (!response.Contents || response.Contents.length === 0) {
      console.log('⚠️  El bucket está vacío\n');
    } else {
      console.log(`✅ Encontrados ${response.Contents.length} archivos:\n`);
      response.Contents.forEach((file, index) => {
        const size = (file.Size / 1024).toFixed(2);
        console.log(`   ${index + 1}. ${file.Key} (${size} KB)`);
      });
      console.log('');
    }

    // Test 3: Verificar dominio público
    console.log('🧪 Test 3: Verificando configuración de dominio público...');
    if (process.env.R2_PUBLIC_DOMAIN) {
      console.log(`✅ Dominio público configurado: ${process.env.R2_PUBLIC_DOMAIN}\n`);
    } else {
      console.log('⚠️  Dominio público no configurado (R2_PUBLIC_DOMAIN)');
      console.log('   Se usará el endpoint de R2 directamente\n');
    }

    console.log('🎉 ¡Todas las pruebas pasaron exitosamente!');
    console.log('\n✅ Tu configuración de R2 está correcta y lista para usar.');
    
  } catch (error) {
    console.error('\n❌ Error al conectar con R2:');
    console.error(`   ${error.message}\n`);
    
    if (error.name === 'NoSuchBucket') {
      console.log('💡 Sugerencia: El bucket no existe. Créalo en el dashboard de Cloudflare R2.');
    } else if (error.name === 'InvalidAccessKeyId') {
      console.log('💡 Sugerencia: El Access Key ID es inválido. Verifica R2_ACCESS_KEY_ID en .env');
    } else if (error.name === 'SignatureDoesNotMatch') {
      console.log('💡 Sugerencia: El Secret Access Key es incorrecto. Verifica R2_SECRET_ACCESS_KEY en .env');
    } else if (error.message.includes('getaddrinfo')) {
      console.log('💡 Sugerencia: El endpoint es incorrecto o no hay conexión a internet. Verifica R2_ENDPOINT en .env');
    }
    
    process.exit(1);
  }
}

testConnection();
