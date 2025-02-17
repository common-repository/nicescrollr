<?php
namespace Nicescrollr;

use Nicescrollr\Admin\Includes as AdminIncludes;
use Nicescrollr\Includes as Includes;

/**
 * The plugin bootstrap file
 *
 * This plugin provides a simple interface for the included jQuery Nicescroll library.
 * It comes with an extensive options panel giving you
 * full control over almost all available options the Nicescroll library gets shipped with.
 *
 * @wordpress-plugin
 * @package:          Nicescrollr
 * @since             0.1.0
 * @package           nicescrollr
 * @author            Demis Patti
 * @link:             https://wordpress.org/plugins/nicescrollr/
 * Plugin URI:        https://wordpress.org/plugins/nicescrollr/
 * Plugin Name:       Nicescrollr
 * Description:       This plugin is a wrapper for the popular "Nicescroll" javascript library, which is made by <a href="https://wordpress.org/support/users/inuyaksa/" target="_blank">InuYaksa</a>. You can use it on both the frontend and the backend. It is fully customizable, so you can tweak and tune every single parameter Nicescroll has to offer! You can style it totally different for both parts of your website. You can even keep the default scrollbar if you like. It's all up to you.
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       nicescrollr
 * Domain Path:       /languages
 * Version:           0.9.4
 * Stable tag:        0.9.4
 * Requires at least: 5.5
 * Tested up to:      6.2
 * Requires PHP:      5.6
 * Max. PHP version:  7.4.21
 */

/**
 * If this file is called directly, abort.
 */
if( ! defined( 'WPINC' ) ) {
	die;
}
// Leave this to '1' until the minified scripts work as expected
define( 'NICESCROLLR_DEBUG', '1' );

/**
 * Define plugin constants.
 */
if( ! defined( 'NICESCROLLR_ROOT_DIR' ) ) {
	define( 'NICESCROLLR_ROOT_DIR', plugin_dir_path( __FILE__ ) );
}
if( ! defined( 'NICESCROLLR_ROOT_URL' ) ) {
	define( 'NICESCROLLR_ROOT_URL', plugin_dir_url( __FILE__ ) );
}

/**
 * Include dependencies.
 */
if( ! class_exists( 'Includes\Nsr' ) ) {
	require_once NICESCROLLR_ROOT_DIR . 'includes/class-nsr.php';
}
if( ! class_exists( 'Includes\Nsr_Activator' ) ) {
	require_once NICESCROLLR_ROOT_DIR . 'includes/class-activator.php';
}
if( ! class_exists( 'Includes\Nsr_Deactivator' ) ) {
	require_once NICESCROLLR_ROOT_DIR . 'includes/class-deactivator.php';
}
if( ! class_exists( 'AdminIncludes\Nsr_Options' ) ) {
	require_once NICESCROLLR_ROOT_DIR . 'admin/includes/class-options.php';
}

/**
 * The function that gets fired on plugin activation.
 *
 * @since 0.1.0
 * @uses  activate_nsr()
 * @see   includes/class-Nsr-activator.php
 */
function activate_nsr(): void
{
	Includes\nsr_activator::activate();
}

/**
 * The function that gets fired on plugin deactivation.
 *
 * @since 0.1.0
 * @uses  deactivate_nsr()
 * @see   includes/class-Nsr-deactivator.php
 */
function deactivate_nsr(): void
{
	Includes\nsr_deactivator::deactivate();
}

register_activation_hook( __FILE__, 'Nicescrollr\activate_nsr');
register_deactivation_hook( __FILE__, 'Nicescrollr\deactivate_nsr' );

/**
 * Begins execution of the plugin.
 *
 * @since 0.1.0
 */
function run_nsr(): void
{
	// @fix, else add these options during next update routine and remove fix
	$options = new AdminIncludes\Nsr_Options( 'nicescrollr' );
	$options->maybe_fill_missing_options();

	$plugin = new Includes\Nsr();
	$plugin->run();
}

add_action( 'plugins_loaded', 'Nicescrollr\run_nsr' );
