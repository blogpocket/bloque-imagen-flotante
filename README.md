# Bloque imagen flotante
Un bloque de Gutenberg para mostrar una imagen flotada a la derecha de un texto (versión ES5 sin build).
## Explicación rápida
1. Cabecera del plugin: Indica nombre, descripción, versión, etc.
2. Control de acceso: if ( ! defined( 'ABSPATH' ) ) { exit; } para evitar accesos directos.
3. Registra scripts y estilos:
- index.js es el archivo ES5 que contiene toda la lógica del bloque (sin JSX).
- editor.css es opcional si quieres estilos específicos para la edición.
4. register_block_type:
- Asocia el script y el estilo al bloque.
- Define los atributos.
- Usa render_callback para renderizar el HTML en el lado del servidor.
5. Función de renderizado (bif_bloque_imagen_flotante_render_callback):
- Sanitiza texto e imagen.
- Genera el HTML final con la imagen flotada a la derecha y el texto.
No olvides colocar el archivo index.js (versión ES5) en la carpeta assets/ junto con el posible editor.css y luego activar el plugin en tu WordPress.
