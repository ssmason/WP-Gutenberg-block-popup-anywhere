/**
 * Tailwind config for popup block styles.
 *
 * @package SatoriPopup
 * @author  Stephen Mason <stephen@satori.digital>
 */

module.exports = {
    important: true,
    content: [
        './src/**/*.js',
        './includes/**/*.php',
    ],
    safelist: [
        'satori-popup-editor',
        'satori-popup-trigger-wrap',
        'satori-popup-size-small',
        'satori-popup-size-medium',
        'satori-popup-size-large',
        'satori-popup-size-full',
        'justify-start',
        'justify-center',
        'justify-end',
        'rounded-none',
        'rounded-sm',
        'rounded-md',
        'rounded-lg',
        'rounded-xl',
        'rounded-2xl',
        'rounded-full',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
