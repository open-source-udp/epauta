# Política de Seguridad

## Reportar una vulnerabilidad

La seguridad de ePAUTA es una prioridad. Si descubres una vulnerabilidad de seguridad, por favor ayúdanos reportándola de manera responsable.

### Cómo reportar

**Por favor NO uses GitHub Issues para reportar vulnerabilidades de seguridad.**

En su lugar, utiliza uno de los siguientes métodos:

1. **GitHub Security Advisories** (recomendado)
   - Ve a la pestaña "Security" del repositorio
   - Crea un nuevo Security Advisory
   - Proporciona los detalles de la vulnerabilidad

2. **Contacto directo**
   - Contacta a [@polaarts](https://github.com/polaarts) directamente a través de GitHub
   - Incluye todos los detalles relevantes de la vulnerabilidad

### Qué incluir en tu reporte

Para ayudarnos a entender y resolver el problema rápidamente, por favor incluye:

- Tipo de vulnerabilidad (ej: XSS, SQL injection, información expuesta, etc.)
- Descripción detallada de la vulnerabilidad
- Pasos para reproducir el problema
- Impacto potencial de la vulnerabilidad
- Cualquier posible mitigación que hayas identificado
- Tu información de contacto (opcional, pero útil para seguimiento)

### Proceso de respuesta

1. **Confirmación**: Confirmaremos la recepción de tu reporte dentro de 48 horas.

2. **Evaluación**: Evaluaremos la vulnerabilidad y su impacto. Te mantendremos informado del progreso.

3. **Resolución**: Trabajaremos en una solución. El tiempo de respuesta dependerá de la severidad:
   - Crítica: dentro de 7 días
   - Alta: dentro de 14 días
   - Media: dentro de 30 días
   - Baja: dentro de 60 días

4. **Divulgación**: Una vez que el problema esté resuelto, publicaremos un aviso de seguridad dando crédito al descubridor (si lo deseas).

### Política de divulgación responsable

Solicitamos que:

- Nos des tiempo razonable para resolver el problema antes de hacerlo público
- No explotes la vulnerabilidad de manera que pueda afectar a los usuarios
- No accedas o modifiques datos de otros usuarios sin su consentimiento
- No realices ataques de denegación de servicio

A cambio, nos comprometemos a:

- Responder a tu reporte de manera oportuna
- Mantenerte informado del progreso hacia la resolución
- Darte crédito por el descubrimiento (si lo deseas) cuando hagamos el anuncio público

## Consideraciones de seguridad para contribuyentes

Si estás contribuyendo código a ePAUTA, por favor ten en cuenta:

### Variables de entorno

- **NUNCA** hagas commit de archivos `.env` con credenciales reales
- Usa `.env.example` con valores de ejemplo
- Verifica que `.env` esté en `.gitignore`

### Credenciales y secretos

- No incluyas claves API, tokens, o contraseñas en el código
- Usa variables de entorno para información sensible
- Ten cuidado con los logs que puedan exponer información sensible

### Dependencias

- Mantén las dependencias actualizadas
- Revisa las vulnerabilidades conocidas antes de añadir nuevas dependencias
- Usa `npm audit` regularmente

### Validación de entrada

- Valida y sanitiza todas las entradas del usuario
- Usa tipos TypeScript para validación estática
- Ten cuidado con inyecciones (XSS, SQL, etc.)

### Autenticación y autorización

- Implementa verificaciones apropiadas de permisos
- No confíes en validaciones del lado del cliente
- Usa tokens seguros y expirables

## Auditorías de seguridad

Realizamos revisiones periódicas de seguridad:

- Análisis estático de código
- Auditoría de dependencias con `npm audit`
- Revisión de configuraciones de seguridad

## Contacto

Para cualquier pregunta sobre esta política de seguridad, contacta a:

- GitHub: [@polaarts](https://github.com/polaarts)
- Issues: [Repositorio de ePAUTA](https://github.com/open-source-udp/epauta/issues) (para preguntas generales, NO para vulnerabilidades)

## Reconocimientos

Agradecemos a todos los investigadores de seguridad y usuarios que reportan vulnerabilidades de manera responsable para mantener ePAUTA seguro para todos.

### Hall of Fame

Lista de personas que han contribuido a la seguridad de ePAUTA:

(Actualmente vacío - ¡sé el primero!)

---

Última actualización: Octubre 2025
