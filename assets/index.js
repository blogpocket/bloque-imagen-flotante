// Tomamos los objetos globales de WordPress.
var el               = wp.element.createElement;
var registerBlockType= wp.blocks.registerBlockType;
var __              = wp.i18n.__;
var blockEditor      = wp.blockEditor || wp.editor;
var InspectorControls= blockEditor.InspectorControls;
var RichText         = blockEditor.RichText;
var MediaUpload      = blockEditor.MediaUpload;
var MediaUploadCheck = wp.components.MediaUploadCheck || blockEditor.MediaUploadCheck;
var PanelBody        = wp.components.PanelBody;
var Button           = wp.components.Button;
var useBlockProps    = blockEditor.useBlockProps;

/**
 * Registramos el bloque 'bloque-imagen-flotante/bloque'
 * de forma que no requiera JSX ni transpilación.
 */
registerBlockType('bloque-imagen-flotante/bloque', {
    title: __('Bloque Imagen Flotante', 'bloque-imagen-flotante'),
    icon: 'format-image',
    category: 'common', // o la categoría que prefieras

    attributes: {
        texto: {
            type: 'string',
            default: '',
        },
        urlImagen: {
            type: 'string',
            default: '',
        },
        idImagen: {
            type: 'number',
            default: 0,
        },
    },

    // Función de edición (lo que aparece en el editor)
    edit: function(props) {
        var attributes = props.attributes;
        var setAttributes = props.setAttributes;
        var texto = attributes.texto;
        var urlImagen = attributes.urlImagen;
        var idImagen = attributes.idImagen;

        // Función para actualizar la imagen cuando se seleccione en la librería
        function onSelectImage(media) {
            if (!media || !media.url) {
                setAttributes({ urlImagen: '', idImagen: 0 });
                return;
            }
            setAttributes({ urlImagen: media.url, idImagen: media.id });
        }

        // build the inspector controls
        var inspectorControls = el(
            InspectorControls,
            null,
            el(
                PanelBody,
                { title: __('Configuración de la imagen', 'bloque-imagen-flotante') },
                el(
                    MediaUploadCheck,
                    null,
                    el(
                        MediaUpload,
                        {
                            onSelect: onSelectImage,
                            allowedTypes: ['image'],
                            value: idImagen,
                            render: function(obj) {
                                return el(
                                    Button,
                                    {
                                        onClick: obj.open,
                                        variant: 'primary'
                                    },
                                    urlImagen
                                        ? __('Cambiar Imagen', 'bloque-imagen-flotante')
                                        : __('Seleccionar Imagen', 'bloque-imagen-flotante')
                                );
                            }
                        }
                    )
                ),
                urlImagen && el(
                    'div',
                    { style: { marginTop: '1em' } },
                    el('img', { src: urlImagen, alt: '', style: { maxWidth: '100%' } })
                )
            )
        );

        // build the editor preview
        var editorPreview = el(
            'div',
            {
                className: 'bloque-imagen-flotante-editor',
                style: { minHeight: '100px', clear: 'both' }
            },
            el(RichText, {
                tagName: 'div',
                placeholder: __('Escribe tu texto aquí...', 'bloque-imagen-flotante'),
                value: texto,
                onChange: function(val) {
                    setAttributes({ texto: val });
                }
            }),
            urlImagen && el(
                'div',
                { style: { float: 'right', margin: '0 0 1em 1em' } },
                el('img', { src: urlImagen, alt: '', style: { maxWidth: '150px' } })
            )
        );

        // Finalmente, devolvemos un contenedor con el inspector y el bloque
        return el(
            'div',
            useBlockProps ? useBlockProps() : null,
            inspectorControls,
            editorPreview
        );
    },

    // Usamos 'render_callback' en PHP, así que no hay guardado estático.
    save: function() {
        return null;
    }
});
