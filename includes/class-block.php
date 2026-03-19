<?php

/**
 * Block registration for Popup Button.
 *
 * PHP version 8+
 *
 * @category Plugin
 * @package  SatoriPopup
 * @author   Stephen Mason <stephen@satori.digital>
 * @license  GPL-2.0-or-later https://www.gnu.org/licenses/gpl-2.0.html
 * @link     https://github.com/satori-digital/satori-popup
 */

declare(strict_types=1);

namespace SatoriPopup;

/**
 * Block registration class.
 *
 * @category Plugin
 * @package  SatoriPopup
 * @author   Stephen Mason <stephen@satori.digital>
 * @license  GPL-2.0-or-later https://www.gnu.org/licenses/gpl-2.0.html
 * @link     https://github.com/satori-digital/satori-popup
 */
class Block
{
    /**
     * Registers the block type.
     *
     * @return void
     */
    public function register(): void
    {
        $block_json_path = SATORI_POPUP_PLUGIN_DIR . 'block.json';

        if (! file_exists($block_json_path)) {
            return;
        }

        register_block_type(
            $block_json_path,
            [
                'render_callback' => [$this, 'render'],
            ]
        );
    }

    /**
     * Renders the block on the frontend.
     *
     * @param array<string, mixed> $attributes Block attributes.
     * @param string               $content    Saved block content.
     *
     * @return string
     */
    public function render(array $attributes, string $content): string
    {
        return $content;
    }
}
