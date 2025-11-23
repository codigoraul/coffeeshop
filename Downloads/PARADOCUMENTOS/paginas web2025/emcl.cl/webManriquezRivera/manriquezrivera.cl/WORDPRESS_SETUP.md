# Configuración de WordPress para Manríquez Rivera

## 1. Instalación de WordPress Local

### Opción A: Local by Flywheel (Recomendado)
1. Descarga Local: https://localwp.com/
2. Instala y abre Local
3. Clic en "Create a new site"
4. Nombre del sitio: `manriquezrivera`
5. Elige "Preferred" environment
6. Configura usuario admin
7. La URL será: `http://manriquezrivera.local`

### Opción B: XAMPP
1. Descarga XAMPP: https://www.apachefriends.org/
2. Instala WordPress en `htdocs/manriquezrivera`
3. La URL será: `http://localhost/manriquezrivera`

## 2. Configuración del Custom Post Type "Servicios"

### Instalar plugin "Custom Post Type UI"
1. En WordPress admin, ve a: Plugins > Añadir nuevo
2. Busca: "Custom Post Type UI"
3. Instala y activa

### Crear Custom Post Type
1. Ve a: CPT UI > Add/Edit Post Types
2. Configuración:
   - **Slug**: `servicios`
   - **Plural Label**: `Servicios`
   - **Singular Label**: `Servicio`
   - **Has Archive**: `true`
   - **Show in REST API**: `true` ✅ (IMPORTANTE)
   - **REST API base slug**: `servicios`
   - **Supports**: Title, Editor, Excerpt, Featured Image
3. Guardar

## 3. Instalar Advanced Custom Fields (ACF)

### Instalar ACF
1. Plugins > Añadir nuevo
2. Busca: "Advanced Custom Fields"
3. Instala y activa

### Crear campos personalizados para Servicios
1. Ve a: ACF > Field Groups > Add New
2. Nombre: "Campos de Servicio"
3. Agregar campos:

#### Campo 1: Icono
- **Field Label**: Icono
- **Field Name**: icono
- **Field Type**: Text
- **Instructions**: Nombre del icono (ej: briefcase, users, shield)

#### Campo 2: Orden
- **Field Label**: Orden
- **Field Name**: orden
- **Field Type**: Number
- **Default Value**: 0

#### Campo 3: Áreas de Práctica
- **Field Label**: Áreas de Práctica
- **Field Name**: areas_practica
- **Field Type**: Repeater
- **Sub Fields**:
  - **titulo** (Text)
  - **descripcion** (Textarea)
  - **icono** (Text)

4. **Location Rules**: 
   - Show this field group if: Post Type is equal to Servicios
5. Guardar

## 4. Habilitar REST API para ACF

Agrega esto al archivo `functions.php` de tu tema:

\`\`\`php
// Exponer campos ACF en REST API
add_action('rest_api_init', function() {
    register_rest_field('servicios', 'acf', array(
        'get_callback' => function($object) {
            return get_fields($object['id']);
        },
        'schema' => null,
    ));
});

// Habilitar CORS para desarrollo local
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);
\`\`\`

## 5. Crear servicios de ejemplo

1. Ve a: Servicios > Añadir nuevo
2. Crea 3 servicios:

### Servicio 1: Derecho Laboral Empresarial
- **Título**: Derecho Laboral Empresarial
- **Contenido**: [Descripción completa del servicio]
- **Excerpt**: Asesoría integral en relaciones laborales...
- **Imagen destacada**: Sube una imagen
- **ACF - Icono**: users
- **ACF - Orden**: 1
- **ACF - Áreas de Práctica**: Agregar 6 áreas

### Servicio 2: Derecho Corporativo
- Similar al anterior

### Servicio 3: Compliance y Gobierno Corporativo
- Similar al anterior

## 6. Verificar la API

Abre en el navegador:
\`\`\`
http://localhost:8888/manriquezrivera/wp-json/wp/v2/servicios
\`\`\`

Deberías ver un JSON con tus servicios.

## 7. Configurar Astro

1. Copia `.env.example` a `.env`:
\`\`\`bash
cp .env.example .env
\`\`\`

2. Edita `.env` con tu URL de WordPress:
\`\`\`
PUBLIC_WP_URL=http://localhost:8888/manriquezrivera
# o
PUBLIC_WP_URL=http://manriquezrivera.local
\`\`\`

3. Reinicia el servidor de Astro:
\`\`\`bash
npm run dev
\`\`\`

## 8. Probar la integración

Visita: http://localhost:4322/

Los servicios ahora se cargarán desde WordPress.

## Troubleshooting

### Error de CORS
- Asegúrate de agregar el código CORS en `functions.php`
- Verifica que WordPress esté corriendo

### No se muestran los servicios
- Verifica la URL en `.env`
- Comprueba que los servicios estén publicados
- Revisa la consola del navegador para errores

### Campos ACF no aparecen
- Verifica que ACF esté activado
- Asegúrate de agregar el código en `functions.php`
- Comprueba que "Show in REST API" esté habilitado en CPT UI
