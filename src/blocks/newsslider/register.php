<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */
function create_newsslider_block_init()
{
	register_block_type(
		GbBlocks_PLUGIN_DIR . '/dist/blocks/newsslider',
		[
			'render_callback' => 'render_newsslider',
		]
	);
}
add_action('init', 'create_newsslider_block_init');

/**
 * Block render callback.
 *
 * @since 0.1.0
 * @param array $attrs Block attributes.
 *
 * @return string
 */
function render_newsslider($attrs)
{

	$attrs      = wp_parse_args(
		$attrs,
		[
			'taxonomy'      => array(),
		]
	);

	$taxonomy = $attrs['taxonomy'];

	$query_args = array(
		'post_type' 		=> 'news',
		'posts_per_page' 	=> 6,
		'post_status' 		=> 'publish',
		'order' 			=> 'DESC',
		'orderby'			=> 'date',
	);
	if (!empty($taxonomy)) {
		$query_args['tax_query'] = array(
			array(
				'taxonomy'     => 'topics',
				'terms'        => $taxonomy,
			),
		);
	}

	$news_lists = get_posts($query_args);

	$newsTerm = [];
	$html = '';

	$post_taxonomy = '';
	$image = array();

	$anchor = ($attrs['anchor'] != '') ? ' id="' . $attrs['anchor'] . '" ' : '';
	$className = ($attrs['extraClass'] != '') ? ' ' . $attrs['extraClass'] : '';

	if (!empty($news_lists)) {
		$html .= '<div ' . $anchor . ' class="slider__wrapper' . $className . '">';
		$html .= '<div class="splide news__slider" role="group" aria-label="News">';
		$html .= '<div class="splide__arrow-wrap container">';
		$html .= '<div class="slider__seprator">';
		$html .= '<hr class="divider divider--style-one divider--pd-top-0 divider--pd-bottom-0"/>';
		$html .= '<a href="' . site_url('news-media') . '" class="button--link">To The NewsRoom</a>';
		$html .= '</div>';
		$html .= '<div class="splide__arrows">';
		$html .= '<button class="splide__arrow splide__arrow--prev" type="button" aria-label="Go to last slide" aria-controls="rewind-example-track"><span class="nav--arrow is--left"></span></button>';
		$html .= '<button class="splide__arrow splide__arrow--next" type="button" aria-label="Next slide" aria-controls="rewind-example-track"><span class="nav--arrow is--right"></span></button>';
		$html .= '</div>';
		$html .= '</div>';
		$html .= '<div class="splide__track">';
		$html .= '<div class="splide__list news__lists">';
		foreach ($news_lists as $news) {
			$post_taxonomy = '';
			$id = $news->ID;

			$attachment_id = get_post_thumbnail_id($id);
			$xs = wp_get_attachment_image_src($attachment_id, 'xs');
			$md = wp_get_attachment_image_src($attachment_id, 'md');
			$default = get_the_post_thumbnail_url($id);
			$image_alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', TRUE);

			// $image = get_blocks_images($id, $xs, $md, $default);

			if (!empty($taxonomy)) {
				for ($i = 0; $i < count($taxonomy); $i++) {
					$newsTerm[$i] = get_term_by('id', $taxonomy[$i], 'topics')->name;
				}
				$post_taxonomy =  implode(', ', $newsTerm);
			} else {
				$terms = get_the_terms($id, 'topics');

				if (!empty($terms)) {
					if (count($terms) > 1) {
						for ($i = 0; $i < count($terms); $i++) {
							$newsTerm[$i] = $terms[$i]->name;
						}
						$post_taxonomy =  implode(', ', $newsTerm);
					} else {
						$post_taxonomy =  $terms[0]->name;
					}
				}
			}

			$html .= '<div class="splide__slide news__list">';
			$html .= '<div class="news__featured-wrap">';
			if ($default != '') :
				$html .= '<picture>';
				if($xs) : 
					$image_path = wp_get_original_image_path( $attachment_id);
					$file_dirname = pathinfo($image_path, PATHINFO_DIRNAME);
					$file_name = pathinfo($xs[0], PATHINFO_FILENAME);
					$xswebp = $file_dirname . '/' .$file_name. '.webp';  
					$file_relativepath = pathinfo($xs[0], PATHINFO_DIRNAME);
	
					if(file_exists($xswebp)) :
						 $html .=  '<source srcset=' . $file_relativepath . '/' . $file_name . '.webp type="image/webp" />';
					endif;
	
					$html .= '<source srcset=' . $xs[0] . ' />';
				endif;
				$html .= '<img  src =' . $default . ' alt = "' .$image_alt . '"  />';
				$html .= '</picture>';
			endif;
			$html .= '<div class="news__meta">';
			$html .= '<div class="news__date"><span class="news__day">' . get_the_date('j.', $id) . ' </span><span class="news__month">' . get_the_date('M', $id) . '</span></div>';

			$html .= '<span class="news__tax">' . $post_taxonomy . '</span>';

			$html .= '</div>';
			$html .= '</div>';
			$html .= '<div class="news__details">';
			$html .= '<h3 class="news__title headline headline--style-six headline--color-one">' . get_the_title($id) . '</h3>';
			$html .= '<p class="news__content text text--style-three text--color-three">' . get_the_excerpt($id) . '</p>';
			$html .= '<a href="' . get_the_permalink($id) . '" class="button--text button--cta button--style-one button--width-four button--color-four  button--align-xs-left">Continue Reading</a>';
			$html .= '</div>';
			$html .= '</div>';
		}
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';
		$html .= '</div>';
	}

	return $html;
}
