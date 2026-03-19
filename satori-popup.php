<?php

/**
 * Plugin Name: Satori Popup Button
 * Plugin URI:  https://github.com/satori-digital/satori-popup
 * Description: Per-page popup block with customizable button/link, colors, and inner blocks.
 * Version:     1.0.0
 * Author:      Stephen Mason
 * Author URI:  https://satori.digital
 * License:     GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: satori-popup
 *
 * @category Plugin
 * @package  SatoriPopup
 * @author   Stephen Mason <stephen@satori.digital>
 * @license  GPL-2.0-or-later https://www.gnu.org/licenses/gpl-2.0.html
 * @link     https://github.com/satori-digital/satori-popup
 */

declare(strict_types=1);

if (! defined('ABSPATH')) {
    exit;
}

define('SATORI_POPUP_VERSION', '1.0.0');
define('SATORI_POPUP_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SATORI_POPUP_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once SATORI_POPUP_PLUGIN_DIR . 'includes/class-autoloader.php';
SatoriPopup\Autoloader::register();

require_once SATORI_POPUP_PLUGIN_DIR . 'includes/class-plugin.php';

/**
 * Boots the plugin on plugins_loaded.
 *
 * @return void
 */
add_action(
    'plugins_loaded',
    static function (): void {
        SatoriPopup\Plugin::instance()->boot();
    },
    0
);
