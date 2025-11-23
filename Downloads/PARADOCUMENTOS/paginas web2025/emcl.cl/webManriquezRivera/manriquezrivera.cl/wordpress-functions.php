<?php
/**
 * Código para agregar al archivo functions.php de tu tema de WordPress
 * 
 * Ubicación: wp-content/themes/TU-TEMA/functions.php
 * 
 * Copia y pega este código al final del archivo functions.php
 */

// 1. Exponer campos ACF en REST API
add_action('rest_api_init', function() {
    register_rest_field('servicios', 'acf', array(
        'get_callback' => function($object) {
            return get_fields($object['id']);
        },
        'schema' => null,
    ));
});

// 2. Habilitar CORS para desarrollo local
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        return $value;
    });
}, 15);

// 3. Agregar soporte para imágenes destacadas en el CPT Servicios
add_action('init', function() {
    add_post_type_support('servicios', 'thumbnail');
});

// 4. Personalizar el excerpt length si es necesario
function custom_excerpt_length($length) {
    return 30; // Número de palabras
}
add_filter('excerpt_length', 'custom_excerpt_length');

// 5. Remover el [...] del excerpt
function custom_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'custom_excerpt_more');
