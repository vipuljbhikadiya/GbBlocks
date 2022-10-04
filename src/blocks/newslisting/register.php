<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */
function create_newslisting_block_init()
{
    register_block_type(
        GbBlocks_PLUGIN_DIR . '/dist/blocks/newslisting',
        [
            'render_callback' => 'render_newslisting',
        ]
    );
}
add_action('init', 'create_newslisting_block_init');

function render_newslisting($attrs)
{
    $attrs      = wp_parse_args(
        $attrs,
        [
            'taxonomy'      => '',
        ]
    );

    $taxonomy = $attrs['taxonomy'];
    $paged = 1;
    $query_args = array(
        'post_type'         => 'news',
        'posts_per_page'    => 9,
        'post_status'       => 'publish',
        'orderby'           => 'date',
        'paged'             => $paged,
    );
    if ($taxonomy != '') {
        $query_args['tax_query'] = array(
            array(
                'taxonomy'     => 'topics',
                'field'        => 'id',
                'terms'        => $taxonomy,
            ),
        );
    }

    $news_lists = new WP_Query($query_args);

    $pages = $news_lists->max_num_pages;

    $next_paged = '';
    $prev_paged = '';

    if ($paged != $pages) {
        $next_paged = $paged + 1;
    }


    if ($paged != 1) {
        $prev_paged = $paged - 1;
    }
    if ($prev_paged == -1) {
        $prev_paged = '';
    }

    $prev_class = ($prev_paged == '') ? ' disabled' : '';
    $next_class = ($next_paged == '') ? ' disabled' : '';

    $html = '';

    $anchor = ($attrs['anchor'] != '') ? ' id="' . $attrs['anchor'] . '" ' : '';
    $className = ($attrs['extraClass'] != '') ? ' ' . $attrs['anchor'] : '';

    if ($news_lists->have_posts()) :
        $html .= '<input type="hidden" name="news_taxonomy" value="' . $taxonomy . '" />';
        $html .= '<div ' . $anchor . ' class="news__listings' . $className . '">';
        $html .= '<div class="row-wrapper row-wrapper--ct-wd">';
        $html .= '<div class="row  row--xs- row--xs- row--gap-1 news__lists">';

        $html .= get_news_list($news_lists, $taxonomy);

        $html .= '</div>';
        $html .= '</div>';
        if ($pages > 1) {
            $html .= '<div class="row-wrapper row-wrapper--ct-wd">';
            $html .= '<div class="row row--xs-center">';
            $html .= '<div class="gb-pagination">';
            $html .= '<a href="javascript:;" class="news-navigation previous-link' . $prev_class . '" data-paged="' . $prev_paged . '"><svg xmlns="http://www.w3.org/2000/svg" width="20.611" height="39.033" viewBox="0 0 20.611 39.033"><g id="Group_285" data-name="Group 285" transform="translate(1627.588 1310.677) rotate(-180)"><line id="Line_7" data-name="Line 7" x2="18.802" y2="19.212" transform="translate(1607.677 1309.962) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/><line id="Line_8" data-name="Line 8" x1="18.802" y2="19.212" transform="translate(1607.677 1291.16) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/></g></svg></a>';
            $html .= '<a href="javascript:;" class="news-navigation next-link' . $next_class . '" data-paged="' . $next_paged . '"><svg xmlns="http://www.w3.org/2000/svg" width="20.611" height="39.033" viewBox="0 0 20.611 39.033"><g id="Group_285" data-name="Group 285" transform="translate(-1606.977 -1271.643)"> <line id="Line_7" data-name="Line 7" x2="18.802" y2="19.212" transform="translate(1607.677 1309.962) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/><line id="Line_8" data-name="Line 8" x1="18.802" y2="19.212" transform="translate(1607.677 1291.16) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/></g></svg></a>';
            $html .= '</div>';
            $html .= '</div>';
            $html .= '</div>';
        }
        $html .= '</div>';
    endif;

    return $html;
}

add_action("wp_ajax_getNewsList", "getNewsList");
add_action("wp_ajax_nopriv_getNewsList", "getNewsList");
function getNewsList()
{
    $paged = isset($_REQUEST['paged']) ? $_REQUEST['paged'] : 1;
    $post_per_page = 9;
    $query_args = array(
        'post_type'         => 'news',
        'posts_per_page'     => $post_per_page,
        'post_status'       => 'publish',
        'orderby'           => 'date',
        'paged'             => $paged
    );

    $taxonomy = isset($_REQUEST['taxonomy']) ? $_REQUEST['taxonomy'] : '';

    if ($taxonomy != '') {
        $query_args['tax_query'] = array(
            array(
                'taxonomy'     => 'topics',
                'field'        => 'id',
                'terms'        => $taxonomy,
            ),
        );
    }
    $posts  = new WP_Query($query_args);

    $pages = $posts->max_num_pages;

    $next_paged = $prev_paged = '';
    if ($paged != $pages) {
        $next_paged = $paged + 1;
    }

    if ($paged != 1) {
        $prev_paged = $paged - 1;
    }
    if ($prev_paged == -1) {
        $prev_paged = '';
    }

    $prev_class = ($prev_paged == '') ? ' disabled' : '';
    $next_class = ($next_paged == '') ? ' disabled' : '';
    $html = '';
    if ($posts->have_posts()) :
        $html .= '<div class="row-wrapper row-wrapper--ct-wd">';
        $html .= '<div class="row  row--xs- row--xs- row--gap-1 news__lists">';

        $html .= get_news_list($posts, $taxonomy);

        $html .= '</div>';
        $html .= '</div>';
        if ($pages > 1) {
            $html .= '<div class="row-wrapper row-wrapper--ct-wd">';
            $html .= '<div class="row row--xs-center">';
            $html .= '<div class="gb-pagination">';
            $html .= '<a href="javascript:;" class="news-navigation previous-link' . $prev_class . '" data-paged="' . $prev_paged . '"><svg xmlns="http://www.w3.org/2000/svg" width="20.611" height="39.033" viewBox="0 0 20.611 39.033"><g id="Group_285" data-name="Group 285" transform="translate(1627.588 1310.677) rotate(-180)"><line id="Line_7" data-name="Line 7" x2="18.802" y2="19.212" transform="translate(1607.677 1309.962) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/><line id="Line_8" data-name="Line 8" x1="18.802" y2="19.212" transform="translate(1607.677 1291.16) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/></g></svg></a>';
            $html .= '<a href="javascript:;" class="news-navigation next-link' . $next_class . '" data-paged="' . $next_paged . '"><svg xmlns="http://www.w3.org/2000/svg" width="20.611" height="39.033" viewBox="0 0 20.611 39.033"><g id="Group_285" data-name="Group 285" transform="translate(-1606.977 -1271.643)"> <line id="Line_7" data-name="Line 7" x2="18.802" y2="19.212" transform="translate(1607.677 1309.962) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/><line id="Line_8" data-name="Line 8" x1="18.802" y2="19.212" transform="translate(1607.677 1291.16) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/></g></svg></a>';
            $html .= '</div>';
            $html .= '</div>';
            $html .= '</div>';
        }
    endif;
    wp_send_json(array('html' => $html));
    die;
}

function get_news_list($news_lists, $taxonomy)
{
    $html = '';
    $newsTerm = [];
    $post_taxonomy = '';
    $image = array();
    while ($news_lists->have_posts()) : $news_lists->the_post();
        $id = get_the_ID();

        $attachment_id = get_post_thumbnail_id($id);
        $xs = wp_get_attachment_image_src($attachment_id, 'xs');
        $md = wp_get_attachment_image_src($attachment_id, 'md');
        $default = get_the_post_thumbnail_url($id);
        $image_alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', TRUE);

        clearstatcache();

        if ($taxonomy != '') {
            $post_taxonomy = get_term_by('id', $taxonomy, 'topics')->name;
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
        $html .= '<div class="col col--xs-12 col--md-6 col--xl-4 col--pd-0 news__list">';
        $html .= '<div class="col__content">';
        $html .= '<div class="news__featured-wrap">';
        if ($default != '') :

          //  $image = get_blocks_images($id, $xs, $md, $default);

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
           // $html .= $image[$id];

            $html .= '<img  src =' . $default . ' alt = "' . $image_alt . '"  />';
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
        $html .= '</div>';
    endwhile;

    return $html;
}
