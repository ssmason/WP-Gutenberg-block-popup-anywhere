<?php

/**
 * PSR-4 style autoloader for plugin classes.
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
 * Autoloader class.
 *
 * @category Plugin
 * @package  SatoriPopup
 * @author   Stephen Mason <stephen@satori.digital>
 * @license  GPL-2.0-or-later https://www.gnu.org/licenses/gpl-2.0.html
 * @link     https://github.com/satori-digital/satori-popup
 */
class Autoloader
{
    /**
     * Registers the autoloader.
     *
     * @return void
     */
    public static function register(): void
    {
        spl_autoload_register([__CLASS__, 'load']);
    }

    /**
     * Loads a class file.
     *
     * @param string $class The fully-qualified class name.
     *
     * @return bool True if the file was loaded, false otherwise.
     */
    public static function load(string $class): bool
    {
        $prefix = 'SatoriPopup\\';
        $len    = strlen($prefix);

        if (strncmp($prefix, $class, $len) !== 0) {
            return false;
        }

        $relative_class = substr($class, $len);
        $file_name      = 'class-'
            . str_replace('\\', '-', strtolower($relative_class))
            . '.php';
        $file           = SATORI_POPUP_PLUGIN_DIR
            . 'includes/'
            . $file_name;

        if (file_exists($file)) {
            include $file;

            return true;
        }

        return false;
    }
}
