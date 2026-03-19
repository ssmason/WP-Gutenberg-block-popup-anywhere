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
 *
 * @category Plugin
 * @package  SatoriPopup
 * @author   Stephen Mason <stephen@satori.digital>
 * @license  GPL-2.0-or-later https://www.gnu.org/licenses/gpl-2.0.html
 * @link     https://github.com/satori-digital/satori-popup
 */
class Plugin
{
    /**
     * Plugin instance.
     *
     * @var Plugin|null
     */
    private static ?Plugin $_instance = null;

    /**
     * Block registration instance.
     *
     * @var Block
     */
    private Block $_block;

    /**
     * Asset enqueue instance.
     *
     * @var Assets
     */
    private Assets $_assets;

    /**
     * Returns the plugin instance.
     *
     * @return Plugin
     */
    public static function instance(): Plugin
    {
        if (self::$_instance === null) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    /**
     * Constructor. Initialises block and assets.
     */
    private function __construct()
    {
        $this->_block  = new Block();
        $this->_assets = new Assets();
    }

    /**
     * Boots the plugin.
     *
     * @return void
     */
    public function boot(): void
    {
        add_action('init', [$this->_block, 'register'], 20);
        $this->_assets->register();
    }
}
