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
 */
class Assets
{
    /**
     * Registers hooks for asset enqueue.
     *
     * Block assets (editorScript, editorStyle, style, viewScript) are enqueued
     * by WordPress from block.json when the block is rendered. This method
     * is a placeholder for any future global assets (e.g. admin styles).
     *
     * @return void
     */
    public function register(): void
    {
        // Block assets are loaded via block.json metadata.
    }
}
