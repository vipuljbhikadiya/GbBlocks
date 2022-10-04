<?php

/***
 * Register metabox for page and post 
 */

add_action('init', function () {
	register_post_meta('page', 'seo_meta_title', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	]);

	register_post_meta('page', 'seo_meta_description', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	]);

	register_post_meta('page', 'seo_no_index', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'boolean',
	]);

	register_post_meta('page', 'seo_no_follow', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'boolean',
	]);
});

add_action('init', function () {
	register_post_meta('news', 'seo_meta_title', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	]);

	register_post_meta('news', 'seo_meta_description', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	]);

	register_post_meta('news', 'seo_no_index', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'boolean',
	]);

	register_post_meta('news', 'seo_no_follow', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'boolean',
	]);
});

add_action('init', function () {
	register_post_meta('customers', 'seo_meta_title', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	]);

	register_post_meta('customers', 'seo_meta_description', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	]);

	register_post_meta('customers', 'seo_no_index', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'boolean',
	]);

	register_post_meta('customers', 'seo_no_follow', [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'boolean',
	]);
});


/**
 * Registers the appropriate hooks to show the SEO metadata on the frontend.
 */


/**
 * Hook Into wphead to display meta Description
 */

add_action('wp_head', 'igb_seo_tag_in_frontend');

if (!function_exists('igb_seo_tag_in_frontend')) {
	function igb_seo_tag_in_frontend()
	{
		$seo_meta_description = get_post_meta(get_the_ID(), 'seo_meta_description', true);

		if ('page' == get_post_type() || 'news'  == get_post_type() || 'customers' == get_post_type()) {
			if (!empty($seo_meta_description)) {
				echo '<meta name="description" content="' . $seo_meta_description . '" />';
			}
		}
	}
}

/**
 *  Filter the title for compatibility with block-based themes.
 *
 * @param string $title The original title.
 * @return string The title to use.
 */



add_filter('pre_get_document_title', 'filter_title', 15);

function filter_title($title)
{

	if ('page' == get_post_type() || 'news'  == get_post_type() || 'customers' == get_post_type()) {
		$seo_meta_title = get_post_meta(get_the_ID(), 'seo_meta_title', true);
		$site_description = get_bloginfo('description', 'display');
		$sep = "-";

		if (!empty($seo_meta_title) && !empty($site_description)) {
			$title = "$seo_meta_title $sep $site_description";
		} else {
			$title = "$seo_meta_title";
		}
	}

	return $title;
}

/**
 *  Filter the Meta Robots for compatibility with block-based themes.
 *
 * @param array $robots The original robtos.
 * @return array $robots to use.
 */

if (\function_exists('wp_robots')) {

	add_filter('wp_robots', function ($robots) {
	
		if ('page' == get_post_type() || 'news'  == get_post_type() || 'customers' == get_post_type()) {

			$seo_no_index = get_post_meta(get_the_ID(), 'seo_no_index', true);
			$seo_no_follow = get_post_meta(get_the_ID(), 'seo_no_follow', true);

			if ($seo_no_index == true) {
				$robots['noindex'] = true;
			} else {
				$robots['index'] = true;
			}
			if ($seo_no_follow == true) {
				$robots['nofollow'] = true;
			} else {
				$robots['follow'] = true;
			}
		}

		return $robots;
	});
}
