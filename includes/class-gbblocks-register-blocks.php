<?php
/**
 * Register blocks.
 *
 * @package gbblocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load registration for our blocks.
 *
 * @since 1.6.0
 */
class gbblocks_Register_Blocks {


	/**
	 * This plugin's instance.
	 *
	 * @var gbblocks_Register_Blocks
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 *
	 * @return gbblocks_Register_Blocks
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new gbblocks_Register_Blocks();
		}

		return self::$instance;
	}

	/**
	 * The Plugin slug.
	 *
	 * @var string $slug
	 */
	private $slug;

	/**
	 * The Constructor.
	 */
	public function __construct() {
		$this->slug = 'gbblocks';

		add_action( 'init', array( $this, 'register_blocks' ), 99 );
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function register_blocks() {

		// Return early if this function does not exist.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Shortcut for the slug.
		$slug = $this->slug;

		register_block_type(
			'gbblocks/header',
			array(
				'style'         => $slug . '-frontend'		
			)
		);

	}
}

gbblocks_Register_Blocks::register();
