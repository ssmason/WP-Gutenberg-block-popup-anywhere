<?php

/**
 * Main plugin bootstrap class.
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
 * Plugin class.
 */
class Plugin
{
    /**
     * Plugin instance.
     *
     * @var Plugin|null
     */
    private static ?Plugin $instance = null;

    /**
     * Block registration instance.
     *
     * @var Block
     */
    private Block $block;

    /**
     * Asset enqueue instance.
     *
     * @var Assets
     */
    private Assets $assets;

    /**
     * Returns the plugin instance.
     *
     * @return Plugin
     */
    public static function instance(): Plugin
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Constructor. Initialises block and assets.
     */
    private function __construct()
    {
        $this->block  = new Block();
        $this->assets = new Assets();
    }

    /**
     * Boots the plugin.
     *
     * @return void
     */
    public function boot(): void
    {
        add_action('init', [$this->block, 'register'], 20);
        $this->assets->register();
    }
}
