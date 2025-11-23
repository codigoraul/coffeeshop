# Pasos Finales para Conectar WordPress con Astro

## ✅ Lo que ya está listo:

1. ✅ Componente `Services.astro` actualizado para consumir WordPress API
2. ✅ Página dinámica `/servicios/[slug].astro` creada
3. ✅ Librería `wordpress.ts` con funciones para la API
4. ✅ Archivo `.env` creado (necesita configuración)

## 📝 Pasos que debes hacer:

### 1. Configurar la URL de WordPress en `.env`

Edita el archivo `.env` y cambia la URL según tu instalación:

```bash
# Si usas MAMP/XAMPP:
PUBLIC_WP_URL=http://localhost:8888/manriquezrivera

# Si usas Local by Flywheel:
PUBLIC_WP_URL=http://manriquezrivera.local

# O la URL que uses:
PUBLIC_WP_URL=http://localhost/wordpress
```

### 2. Agregar código PHP a WordPress

1. Ve a tu instalación de WordPress
2. Abre: `wp-content/themes/TU-TEMA-ACTIVO/functions.php`
3. Copia todo el contenido del archivo `wordpress-functions.php` 
4. Pégalo al final del archivo `functions.php`
5. Guarda el archivo

### 3. Verificar que la API funciona

Abre en tu navegador:
```
http://localhost:8888/manriquezrivera/wp-json/wp/v2/servicios
```

Deberías ver un JSON con tu servicio "Derecho Laboral Empresarial".

### 4. Reiniciar Astro

```bash
# Detén el servidor (Ctrl+C)
# Inicia de nuevo:
npm run dev
```

### 5. Probar la integración

Visita: `http://localhost:4322/`

Deberías ver tu servicio desde WordPress en la sección "Nuestros Servicios".

## 🔧 Troubleshooting

### No se muestran los servicios

1. Verifica que WordPress esté corriendo
2. Comprueba la URL en `.env`
3. Asegúrate de que el servicio esté **Publicado** (no en borrador)
4. Revisa la consola del navegador (F12) para ver errores

### Error de CORS

Si ves errores de CORS en la consola:
- Verifica que agregaste el código PHP en `functions.php`
- Reinicia el servidor de WordPress

### La imagen no se muestra

- Asegúrate de que el servicio tenga una "Imagen destacada"
- En WordPress: Servicio > Imagen destacada > Establecer imagen destacada

## 📸 Agregar más servicios

1. Ve a WordPress Admin
2. Servicios > Añadir nuevo
3. Completa:
   - Título
   - Contenido
   - Extracto (resumen corto)
   - Imagen destacada
4. Clic en "Publicar"
5. Recarga tu sitio Astro

¡Los servicios aparecerán automáticamente!

## 🎯 Próximos pasos opcionales

- Agregar campos ACF personalizados (iconos, áreas de práctica, etc.)
- Crear más Custom Post Types (Equipo, Blog, etc.)
- Agregar paginación si tienes muchos servicios
