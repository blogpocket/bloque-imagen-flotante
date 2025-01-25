<?php
/**
 * Plugin Name: Bloque Imagen Flotante
 * Plugin URI:  https://example.com
 * Description: Un bloque de Gutenberg para mostrar una imagen flotada a la derecha de un texto (versión ES5 sin build).
 * Version:     1.0.0
 * Author:      A. Cambronero
 * Author URI:  https://www.blogpocket.com
 * Text Domain: bloque-imagen-flotante
 * Domain Path: /languages
 * License:     GPL v2 or later
 *
 * @package BloqueImagenFlotante
 */

// Evitar acceso directo al archivo.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registra el bloque y sus assets (JS y CSS).
 */
function bif_registrar_bloque_imagen_flotante() {
	// Directorio de este plugin.
	$dir = plugin_dir_path( __FILE__ );

	// Registro del archivo JS en ES5 (sin build).
	// Importante: las dependencias deben incluir las APIs que usamos en index.js.
	wp_register_script(
		'bif-bloque-imagen-flotante-script',
		plugins_url( 'assets/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-i18n', 'wp-block-editor', 'wp-components' ), // Dependencias
		'1.0.0',
		true // Carga en el footer
	);

	// Registro de un CSS de editor si lo necesitas (por ejemplo, editor.css).
	// Puedes omitirlo si no tienes estilos propios o no los necesitas.
	wp_register_style(
		'bif-bloque-imagen-flotante-editor-style',
		plugins_url( 'assets/editor.css', __FILE__ ),
		array(),
		'1.0.0'
	);

	// Registrar el bloque con renderización dinámica en PHP.
	register_block_type(
		'bloque-imagen-flotante/bloque',
		array(
			'editor_script'   => 'bif-bloque-imagen-flotante-script',    // JS para el editor
			'editor_style'    => 'bif-bloque-imagen-flotante-editor-style', // CSS para el editor
			'render_callback' => 'bif_bloque_imagen_flotante_render_callback',
			'attributes'      => array(
				'texto' => array(
					'type'    => 'string',
					'default' => '',
				),
				'urlImagen' => array(
					'type'    => 'string',
					'default' => '',
				),
				'idImagen' => array(
					'type'    => 'number',
					'default' => 0,
				),
			),
		)
	);
}
add_action( 'init', 'bif_registrar_bloque_imagen_flotante' );

/**
 * Renderiza el bloque en el front-end con sanitización básica.
 *
 * @param array $attributes Atributos del bloque.
 * @return string HTML del bloque.
 */
function bif_bloque_imagen_flotante_render_callback( $attributes ) {
	$texto     = isset( $attributes['texto'] ) ? wp_kses_post( $attributes['texto'] ) : '';
	$urlImagen = isset( $attributes['urlImagen'] ) ? esc_url( $attributes['urlImagen'] ) : '';

	ob_start();
	?>
	<div class="bloque-imagen-flotante-contenedor" style="overflow: auto;">
		<?php if ( $urlImagen ) : ?>
			<div style="float: right; margin: 0 0 1em 1em;">
				<img src="<?php echo $urlImagen; ?>" alt="Imagen Flotante"/>
			</div>
		<?php endif; ?>
		<div class="bloque-imagen-flotante-texto">
			<?php echo $texto; ?>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
