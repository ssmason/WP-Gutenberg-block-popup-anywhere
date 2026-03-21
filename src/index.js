/**
 * Popup Button block – registration.
 *
 * @package SatoriPopup
 * @author  Stephen Mason <stephen@satori.digital>
 */

import { addFilter } from '@wordpress/hooks';
import { registerBlockType } from '@wordpress/blocks';
import blockData from '../block.json';
import Edit from './edit';
import save, { deprecated } from './save';

/**
 * Allows any block inside Cover when used within popup content.
 *
 * By default, core/cover restricts its inner blocks. Our popup uses Cover
 * as the content wrapper (for backgrounds), but we want authors to add
 * headings, images, buttons, etc. This filter sets allowedBlocks to true
 * for Cover globally so popup content can include any block. Applied only
 * when Cover is registered; scope is global by design.
 *
 * @param {Object} settings Block settings.
 * @param {string} name     Block name.
 * @return {Object} Modified or unchanged settings.
 */
addFilter(
    'blocks.registerBlockType',
    'satori-popup/cover-allowed-blocks',
    (settings, name) => {
        if (name === 'core/cover') {
            return {
                ...settings,
                allowedBlocks: true,
            };
        }
        return settings;
    }
);

registerBlockType(blockData, {
    edit: Edit,
    save,
    deprecated,
});
