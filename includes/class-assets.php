<?php

/**
 * Asset registration and enqueue.
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
 * Assets class.
 *
 * Block assets (editorScript, editorStyle, style, viewScript) are enqueued
 * by WordPress from block.json when the block is rendered. This class is
 * a placeholder for any future global assets (e.g. admin styles, shared
 * scripts). Script versions use SATORI_POPUP_VERSION via *.asset.php files.
 *
 * @category Plugin
 * @package  SatoriPopup
 * @author   Stephen Mason <stephen@satori.digital>
 * @license  GPL-2.0-or-later https://www.gnu.org/licenses/gpl-2.0.html
 * @link     https://github.com/satori-digital/satori-popup
 */
class Assets
{
    /**
     * Registers hooks for asset enqueue.
     *
     * Block assets are loaded via block.json metadata. Add global asset
     * hooks here if needed (e.g. admin_enqueue_scripts).
     *
     * @return void
     */
    public function register(): void
    {
        // Block assets are loaded via block.json metadata.
    }
}
