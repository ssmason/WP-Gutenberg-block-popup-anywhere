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
