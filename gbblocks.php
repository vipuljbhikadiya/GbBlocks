<?php

/**
 * Plugin Name:       Gb Blocks
 * Description:       Gutenberg Blocks.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Domain Path: /languages
 * Text Domain:       gbblocks
 *
 * @package           gbblocks
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

define('GbBlocks_VERSION', '1.0.0');
define('GbBlocks_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('GbBlocks_PLUGIN_URL', plugin_dir_url(__FILE__));
define('GbBlocks_PLUGIN_FILE', __FILE__);
define('GbBlocks_PLUGIN_BASE', plugin_basename(__FILE__));
define('GbBlocks_API_NAMESPACE', 'gbblocks');

if (!class_exists('GbBlocks')) :
	/**
	 * Main GbBlocks Class.
	 *
	 * @since 1.0.0
	 */
	final class GbBlocks
	{
		/**
		 * This plugin's instance.
		 *
		 * @var GbBlocks
		 * @since 1.0.0
		 */
		private static $instance;

		/**
		 * Main GbBlocks Instance.
		 *
		 * Insures that only one instance of GbBlocks exists in memory at any one
		 * time. Also prevents needing to define globals all over the place.
		 *
		 * @since 1.0.0
		 * @static
		 * @return object|GbBlocks The one true GbBlocks
		 */
		public static function instance()
		{
			if (!isset(self::$instance) && !(self::$instance instanceof GbBlocks)) {
				self::$instance = new GbBlocks();
				self::$instance->init();
				self::$instance->includes();
			}
			return self::$instance;
		}

		/**
		 * Throw error on object clone.
		 *
		 * The whole idea of the singleton design pattern is that there is a single
		 * object therefore, we don't want the object to be cloned.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __clone()
		{
			// Cloning instances of the class is forbidden.
			_doing_it_wrong(__FUNCTION__, esc_html__('Something went wrong.', 'GbBlocks'), '1.0');
		}

		/**
		 * Disable unserializing of the class.
		 *
		 * @since 1.0.0
		 * @access protected
		 * @return void
		 */
		public function __wakeup()
		{
			// Unserializing instances of the class is forbidden.
			_doing_it_wrong(__FUNCTION__, esc_html__('Something went wrong.', 'GbBlocks'), '1.0');
		}

		/**
		 * Include required files.
		 *
		 * @access private
		 * @since 1.0.0
		 * @return void
		 */
		private function includes()
		{

			require_once GbBlocks_PLUGIN_DIR . 'includes/class-gbblocks-block-assets.php';
			require_once GbBlocks_PLUGIN_DIR . 'includes/class-gbblocks-register-blocks.php';
			require_once GbBlocks_PLUGIN_DIR . 'includes/gbblocks-image.php';

			/**
			 * SEO setting
			 */
			require_once GbBlocks_PLUGIN_DIR . 'src/seo-plugin/class-seo-feilds-register.php';

			/**
			 * Server side Blocks Includes
			 */

			require_once GbBlocks_PLUGIN_DIR . 'src/blocks/postcontent/register.php';
			require_once GbBlocks_PLUGIN_DIR . 'src/blocks/navigation/register.php';
			require_once GbBlocks_PLUGIN_DIR . 'src/blocks/newsslider/register.php';
			require_once GbBlocks_PLUGIN_DIR . 'src/blocks/newslisting/register.php';
			require_once GbBlocks_PLUGIN_DIR . 'src/blocks/customerlisting/register.php';
			require_once GbBlocks_PLUGIN_DIR . 'src/blocks/customerpreview/register.php';
			require_once GbBlocks_PLUGIN_DIR . 'src/blocks/downloadlisting/register.php';
			require_once GbBlocks_PLUGIN_DIR . 'src/blocks/form/register.php';
			require_once GbBlocks_PLUGIN_DIR . 'src/blocks/newsletter/register.php';
		}

		/**
		 * Load actions
		 *
		 * @return void
		 */
		private function init()
		{

			add_action('plugins_loaded', array($this, 'load_textdomain'), 99);
			add_action('enqueue_block_editor_assets', array($this, 'block_localization'));
		}

		/**
		 * Returns URL to the asset path.
		 *
		 * @param string $path Any extra directories needed.
		 */
		public function asset_source($path = null)
		{
			return GbBlocks_PLUGIN_URL . trailingslashit(path_join('dist', $path));
		}

		/**
		 * Loads the plugin language files.
		 *
		 * @access public
		 * @since 1.0.0
		 * @return void
		 */
		public function load_textdomain()
		{
			load_plugin_textdomain('gbblocks', false, basename(GbBlocks_PLUGIN_DIR) . '/languages');
		}

		/**
		 * Enqueue localization data for our blocks.
		 *
		 * @access public
		 */
		public function block_localization()
		{
			if (function_exists('wp_set_script_translations')) {
				wp_set_script_translations('gbblocks-editor', 'gbblocks', GbBlocks_PLUGIN_DIR . '/languages');
			}
		}
	}
endif;


/**
 * The main function for that returns GbBlocks
 *
 * The main function responsible for returning the one true GbBlocks
 * Instance to functions everywhere.
 *
 * Use this function like you would a global variable, except without needing
 * to declare the global.
 *
 * Example: <?php $gbblocks = GbBlocks(); ?>
 *
 * @since 1.0.0
 * @return object|GbBlocks The one true GbBlocks Instance.
 */
function GbBlocks()
{
	return GbBlocks::instance();
}

// Get the plugin running. Load on plugins_loaded action to avoid issue on multisite.
if (function_exists('is_multisite') && is_multisite()) {
	add_action('plugins_loaded', 'GbBlocks', 90);
} else {
	GbBlocks();
}
