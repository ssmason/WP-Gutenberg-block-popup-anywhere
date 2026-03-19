/**
 * Shared constants for Popup Button block.
 *
 * @package SatoriPopup
 * @author  Stephen Mason <stephen@satori.digital>
 */

import { __ } from '@wordpress/i18n';

export const ALLOWED_BLOCKS = ['core/cover'];

export const TEMPLATE = [
    [
        'core/cover',
        {
            minHeight: 250,
            minHeightUnit: 'px',
            dimRatio: 100,
            overlayColor: 'contrast',
        },
        [
            ['core/heading', { level: 2, placeholder: __('Add heading', 'satori-popup') }],
            ['core/paragraph', { placeholder: __('Add content…', 'satori-popup') }],
            ['core/image', {}],
            ['core/buttons', {}],
        ],
    ],
];

export const POPUP_PADDING_OPTIONS = [
    { value: 'none', label: __('None', 'satori-popup') },
    { value: 'sm', label: __('Small', 'satori-popup') },
    { value: 'md', label: __('Medium', 'satori-popup') },
    { value: 'lg', label: __('Large', 'satori-popup') },
    { value: 'xl', label: __('Extra large', 'satori-popup') },
];

export const POPUP_SIZES = [
    { value: 'small', label: __('Small', 'satori-popup') },
    { value: 'medium', label: __('Medium', 'satori-popup') },
    { value: 'large', label: __('Large', 'satori-popup') },
    { value: 'full', label: __('Full width', 'satori-popup') },
];

export const BUTTON_ALIGNS = [
    { value: 'left', label: __('Left', 'satori-popup') },
    { value: 'center', label: __('Center', 'satori-popup') },
    { value: 'right', label: __('Right', 'satori-popup') },
];

export const BORDER_RADIUS_OPTIONS = [
    { value: 'none', label: __('None', 'satori-popup') },
    { value: 'sm', label: __('Small', 'satori-popup') },
    { value: 'md', label: __('Medium', 'satori-popup') },
    { value: 'lg', label: __('Large', 'satori-popup') },
    { value: 'xl', label: __('Extra large', 'satori-popup') },
    { value: '2xl', label: __('2XL', 'satori-popup') },
    { value: 'full', label: __('Full (pill)', 'satori-popup') },
];

/** Full Tailwind class names for border radius (must appear in source for JIT). */
export const BORDER_RADIUS_CLASSES = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
};
