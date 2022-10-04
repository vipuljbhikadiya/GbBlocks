<?php

/**
 * Load assets for our blocks.
 *
 * @package gbblocks
 */



// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Load general assets for our blocks.
 *
 * @since 1.0.0
 */
class gbblocks_Block_Assets
{


	/**
	 * This plugin's instance.
	 *
	 * @var gbblocks_Block_Assets
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return gbblocks_Block_Assets
	 */
	public static function register()
	{
		if (null === self::$instance) {
			self::$instance = new gbblocks_Block_Assets();
		}

		return self::$instance;
	}

	/**
	 * The Constructor.
	 */
	public function __construct()
	{
		add_action('init', array($this, 'block_assets'));
		add_action('enqueue_block_editor_assets', array($this, 'editor_assets'));
		add_action('wp_enqueue_scripts', array($this, 'frontend_only_scripts'));
	}

	/**
	 * Loads the asset file for the given script or style.
	 * Returns a default if the asset file is not found.
	 *
	 * @param string $filepath The name of the file without the extension.
	 *
	 * @return array The asset file contents.
	 */
	public function get_asset_file($filepath)
	{
		$asset_path = GbBlocks_PLUGIN_DIR . $filepath . '.asset.php';

		return file_exists($asset_path)
			? include $asset_path
			: array(
				'dependencies' => array(),
				'version'      => GbBlocks_VERSION,
			);
	}

	/**
	 * Enqueue scripts that should only be available on the front end
	 */
	public function frontend_only_scripts()
	{
		$name       = 'gbblocks-main';
		$filepath   = 'dist/js/' . $name;
		$asset_file = $this->get_asset_file($filepath);

		wp_enqueue_script(
			'gbblocks-frontend',
			GbBlocks_PLUGIN_URL . $filepath . '.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
		wp_localize_script(
			'gbblocks-frontend',
			'gb_ajax',
			array('ajaxurl' => admin_url('admin-ajax.php'), 'site_url' => site_url())
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets()
	{

		// Styles.
		$name       = 'style-gbblocks-1';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file($filepath);


		wp_register_style(
			'gbblocks-frontend',
			GbBlocks_PLUGIN_URL . $filepath . '.css',
			array(),
			$asset_file['version']
		);

		wp_enqueue_style(
			'gbblocks-icon', // Handle.
			GbBlocks_PLUGIN_URL . 'src/styles/fonts/font-awesome.min.css',
			array(),
			$asset_file['version']
		);
	}



	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets()
	{

		// Styles.
		$name       = 'gbblocks-1';
		$filepath   = 'dist/' . $name;
		$asset_file = $this->get_asset_file($filepath);

		global $pagenow;

		wp_enqueue_style(
			'gbblocks-editor',
			GbBlocks_PLUGIN_URL . $filepath  . '.css',
			array(),
			$asset_file['version']
		);

		foreach (glob(GbBlocks_PLUGIN_DIR . 'dist/gbblocks-*.js') as $file) {



			$name = str_replace('.js', '', basename($file)); // gbblocks-1.



			if (!preg_match('/gbblocks-\d+/', $name)) {
				continue;
			}

			$filepath   = 'dist/' . $name;
			$asset_file = $this->get_asset_file($filepath);

			// Prevent wp-editor from loading on the widgets.php page.
			if ('widgets.php' === $pagenow) {
				$script_key = array_search('wp-editor', $asset_file['dependencies'], true);

				if (false !== $script_key) {
					unset($asset_file['dependencies'][$script_key]);
				}
			}


			wp_enqueue_script(
				$name,
				GbBlocks_PLUGIN_URL . $filepath . '.js',
				array_merge($asset_file['dependencies'], array('wp-api')),
				$asset_file['version'],
				true
			);
		}

		$icons = gbblocks_Block_Assets::get_icons();
		wp_localize_script(
			'gbblocks-3',
			'gbblocks_settings', // Array containing dynamic data for a JS Global.
			[
				'iconset' => $icons,
			]
		);
	}

	/**
	 * Determine if the given post content contains any gbblocks blocks
	 *
	 * @access public
	 * @since  2.14.2
	 * @param  WP_Post $post_object Post object.
	 *
	 * @return boolean True when post content contains a gbblocks block.
	 */
	public function has_gbblocks_block(WP_Post $post_object)
	{

		return !empty(array_filter(
			array(
				false !== strpos($post_object->post_content, '<!-- wp:gbblocks/'),
				has_block('core/block', $post_object),
				has_block('core/button', $post_object),
				has_block('core/cover', $post_object),
				has_block('core/heading', $post_object),
				has_block('core/image', $post_object),
				has_block('core/gallery', $post_object),
				has_block('core/list', $post_object),
				has_block('core/paragraph', $post_object),
				has_block('core/pullquote', $post_object),
				has_block('core/quote', $post_object),
			)
		));
	}

	/**
	 * Return whether a post type should display the Block Editor.
	 *
	 * @param string $post_type The post_type slug to check.
	 */
	protected function is_post_type_gutenberg($post_type)
	{
		return use_block_editor_for_post_type($post_type);
	}

	/**
	 * Return whether the page we are on is loading the Block Editor.
	 */
	protected function is_page_gutenberg()
	{
		if (!is_admin()) {
			return false;
		}

		$admin_page = isset($_SERVER['REQUEST_URI']) ? wp_basename(esc_url_raw(filter_var(wp_unslash($_SERVER['REQUEST_URI']), FILTER_SANITIZE_URL))) : false;

		if (!$admin_page) {
			return false;
		}

		if (false !== strpos($admin_page, 'post-new.php') && empty($_GET['post_type'])) {
			return true;
		}

		if (false !== strpos($admin_page, 'post-new.php') && isset($_GET['post_type']) && $this->is_post_type_gutenberg(filter_input(INPUT_GET, wp_unslash($_GET['post_type']), FILTER_UNSAFE_RAW))) {
			return true;
		}

		if (false !== strpos($admin_page, 'post.php') && isset($_GET['post'])) {
			$wp_post = get_post(filter_input(INPUT_GET, wp_unslash($_GET['post']), FILTER_UNSAFE_RAW));
			if (isset($wp_post) && isset($wp_post->post_type) && $this->is_post_type_gutenberg($wp_post->post_type)) {
				return true;
			}
		}

		if (false !== strpos($admin_page, 'revision.php') && isset($_GET['revision'])) {
			$wp_post     = get_post(filter_input(INPUT_GET, wp_unslash($_GET['revision']), FILTER_UNSAFE_RAW));
			$post_parent = get_post($wp_post->post_parent);
			if (isset($post_parent) && isset($post_parent->post_type) && $this->is_post_type_gutenberg($post_parent->post_type)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Get Icons
	 */
	public static function get_icons()
	{
		$icons = [];
		$icon_set = 'default';


		// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
		$iconFile = plugin_dir_path(__DIR__) . 'src/blocks/icon/icons.json';
		$iconFile = apply_filters('gbblocks_icons_iconset_file', $iconFile);


		if (file_exists($iconFile)) {
			$iconData = file_get_contents($iconFile);
			$data = json_decode($iconData);
			$icons = [];
			// Check if data is fontello format
			if (isset($data->glyphs)) {
				foreach ($data->glyphs as $g) {
					$icons[] = $data->css_prefix_text . $g->css;
				}
			} else {
				$icons = $data;
			}

			$icons = apply_filters('gbblocks_icons_iconset', $icons);
		}

		return $icons;
	}
}

gbblocks_Block_Assets::register();
