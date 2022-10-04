<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */
function create_navigation_block_init()
{
	register_block_type(
		__DIR__,
		[
			'render_callback' => 'render_navigation',
		]
	);
}

add_action('init', 'create_navigation_block_init');

/**
 * Block render callback.
 *
 * @since 0.1.0
 * @param array $attrs Block attributes.
 *
 * @return string
 */
function render_navigation($attrs)
{

	$attrs      = wp_parse_args(
		$attrs,
		[
			'className' => '',
			'anchor'    => '',
			'menu'      => 0,
		]
	);

	$menu_wrap = '<ul id="%1$s" class="%2$s">%3$s</ul>';

	$menu_attrs = [
		'echo'            => false,
		'container_class' => 'site--nav',
		'container_id'    => $attrs['anchor'],
		'menu'            => $attrs['menu'],
		'items_wrap' 	  => $menu_wrap,
	];

	/**
	 * Filters menu attributes.
	 *
	 * @since 0.1.0
	 *
	 * @param array $menu_attrs Menu attributes.
	 * @param array $attrs Block attributes.
	 */
	$menu_attrs = apply_filters('classic_menu_block_attributes', $menu_attrs, $attrs);

	if ($attrs['menu'] != 0) {
		return (string) wp_nav_menu($menu_attrs);
	}

	return '<div>Select a Menu to render.</div>';
}
