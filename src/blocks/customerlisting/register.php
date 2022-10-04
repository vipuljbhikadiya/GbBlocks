<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */
function create_customerlisting_block_init()
{
    register_block_type(
        GbBlocks_PLUGIN_DIR . '/dist/blocks/customerlisting',
        [
            'render_callback' => 'render_customerlisting',
        ]
    );
}
add_action('init', 'create_customerlisting_block_init');

function render_customerlisting($attrs)
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
        'post_type'         => 'customers',
        'posts_per_page'    => 12,
        'post_status'       => 'publish',
        'orderby'           => 'date',
        'paged'             => $paged,
    );
    if ($taxonomy != '') {
        $query_args['tax_query'] = array(
            array(
                'taxonomy'     => 'category',
                'field'        => 'id',
                'terms'        => $taxonomy,
            ),
        );
    }

    $customer_lists = new WP_Query($query_args);

    $pages = $customer_lists->max_num_pages;

    $prev_paged = '';
    $next_paged = '';
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
    $className = ($attrs['extraClass'] != '') ? ' ' . $attrs['extraClass'] : '';

    if ($customer_lists->have_posts()) :
        $html .= '<input type="hidden" name="customers_taxonomy" value="' . $taxonomy . '" />';
        $html .= '<div ' . $anchor . ' class="customers__listings customers__lists' . $className . '">';
        $html .= '<div class="row-wrapper row-wrapper--ct-wd">';
        $html .= '<div class="row row--gap-1 row--xs-center">';

        $html .= get_customer_list($customer_lists);

        $html .= '</div>';
        $html .= '</div>';
        if ($pages > 1) {
            $html .= '<div class="row-wrapper row-wrapper--ct-wd">';
            $html .= '<div class="row row--xs-center">';
            $html .= '<div class="gb-pagination">';
            $html .= '<a href="javascript:;" class="customers-navigation previous-link' . $prev_class . '" data-paged="' . $prev_paged . '"><svg xmlns="http://www.w3.org/2000/svg" width="20.611" height="39.033" viewBox="0 0 20.611 39.033"><g id="Group_285" data-name="Group 285" transform="translate(1627.588 1310.677) rotate(-180)"><line id="Line_7" data-name="Line 7" x2="18.802" y2="19.212" transform="translate(1607.677 1309.962) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/><line id="Line_8" data-name="Line 8" x1="18.802" y2="19.212" transform="translate(1607.677 1291.16) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/></g></svg></a>';
            $html .= '<a href="javascript:;" class="customers-navigation next-link' . $next_class . '" data-paged="' . $next_paged . '"><svg xmlns="http://www.w3.org/2000/svg" width="20.611" height="39.033" viewBox="0 0 20.611 39.033"><g id="Group_285" data-name="Group 285" transform="translate(-1606.977 -1271.643)"> <line id="Line_7" data-name="Line 7" x2="18.802" y2="19.212" transform="translate(1607.677 1309.962) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/><line id="Line_8" data-name="Line 8" x1="18.802" y2="19.212" transform="translate(1607.677 1291.16) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/></g></svg></a>';
            $html .= '</div>';
            $html .= '</div>';
            $html .= '</div>';
        }
        $html .= '</div>';
    endif;

    return $html;
}

add_action("wp_ajax_getCustomersList", "getCustomersList");
add_action("wp_ajax_nopriv_getCustomersList", "getCustomersList");
function getCustomersList()
{
    $paged = isset($_REQUEST['paged']) ? $_REQUEST['paged'] : 1;
    $post_per_page = 12;
    $query_args = array(
        'post_type'         => 'customers',
        'posts_per_page'     => $post_per_page,
        'post_status'       => 'publish',
        'orderby'           => 'date',
        'paged'             => $paged
    );

    $taxonomy = isset($_REQUEST['taxonomy']) ? $_REQUEST['taxonomy'] : '';

    if ($taxonomy != '') {
        $query_args['tax_query'] = array(
            array(
                'taxonomy'     => 'category',
                'field'        => 'id',
                'terms'        => $taxonomy,
            ),
        );
    }
    $posts  = new WP_Query($query_args);

    $pages = $posts->max_num_pages;

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
    if ($posts->have_posts()) :
        $html .= '<div class="row-wrapper row-wrapper--ct-wd">';
        $html .= '<div class="row row--gap-1 row--xs-center">';

        $html .= get_customer_list($posts);

        $html .= '</div>';
        $html .= '</div>';
        if ($pages > 1) {
            $html .= '<div class="row-wrapper row-wrapper--ct-wd">';
            $html .= '<div class="row row--xs-center">';
            $html .= '<div class="gb-pagination">';
            $html .= '<a href="javascript:;" class="customers-navigation previous-link' . $prev_class . '" data-paged="' . $prev_paged . '"><svg xmlns="http://www.w3.org/2000/svg" width="20.611" height="39.033" viewBox="0 0 20.611 39.033"><g id="Group_285" data-name="Group 285" transform="translate(1627.588 1310.677) rotate(-180)"><line id="Line_7" data-name="Line 7" x2="18.802" y2="19.212" transform="translate(1607.677 1309.962) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/><line id="Line_8" data-name="Line 8" x1="18.802" y2="19.212" transform="translate(1607.677 1291.16) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/></g></svg></a>';
            $html .= '<a href="javascript:;" class="customers-navigation next-link' . $next_class . '" data-paged="' . $next_paged . '"><svg xmlns="http://www.w3.org/2000/svg" width="20.611" height="39.033" viewBox="0 0 20.611 39.033"><g id="Group_285" data-name="Group 285" transform="translate(-1606.977 -1271.643)"> <line id="Line_7" data-name="Line 7" x2="18.802" y2="19.212" transform="translate(1607.677 1309.962) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/><line id="Line_8" data-name="Line 8" x1="18.802" y2="19.212" transform="translate(1607.677 1291.16) rotate(-90)" fill="none" stroke="#fff" stroke-width="2"/></g></svg></a>';
            $html .= '</div>';
            $html .= '</div>';
            $html .= '</div>';
        }
    endif;
    wp_send_json(array('html' => $html));
    die;
}

function get_customer_list($customer_lists)
{
    $html = '';
    $image = array();
    while ($customer_lists->have_posts()) : $customer_lists->the_post();
        $id = get_the_ID();
        $attachment_id = get_post_thumbnail_id($id);

        $xs = wp_get_attachment_image_src($attachment_id, 'xs');
        $md = wp_get_attachment_image_src($attachment_id, 'md');
        $default = get_the_post_thumbnail_url($id);
        $image_alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', TRUE);

       // $image = get_blocks_images($id, $xs, $md, $default);

        $html .= '<div class="col col--xs-12 col--sm-6 col--md-6 col--xl-4 col--pd-0 customer__list">';
        $html .= '<div class="col__content">';
        $html .= '<div class="customer__featured-wrap">';
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
            $html .= '<img  src =' . $default . ' alt = "' . $image_alt . '"  />';
            $html .= '</picture>';
        endif;
        $html .= '</div>';
        $html .= '<div class="customer__details">';
        $html .= '<h3 class="customer__title headline headline--style-six headline--color-one">' . get_the_title($id) . '</h3>';
        $html .= '<div class="customer__detail">';
        $html .= '<span class="customer__close"></span>';
        $html .= '<p class="customer__content text text--style-three text--color-three">' . str_replace("…", "", substr(get_the_excerpt($id), 0, 110)) . '...</p>';
        $html .= '<a href="' . get_the_permalink($id) . '" class="button--cta button--style-one button--width-inline button--color-four button--icon button--align-xs-left"><span class="button--text">Read More</span><span class="button--has-icon"><div class="icon icon icon--bgcolor-one icon--color-six"><div class="icon__helper"></div><svg xmlns="http://www.w3.org/2000/svg" width="29.869" height="31.214" viewBox="0 0 29.869 31.214"><path id="Path_185" data-name="Path 185" d="M13.788,5.366,17.45.794A14.59,14.59,0,0,0,14.935.577,15.145,15.145,0,0,0,0,15.9,15.129,15.129,0,0,0,14.935,31.214,15.129,15.129,0,0,0,29.869,15.9a15.583,15.583,0,0,0-1.191-6l-3.6,3.91a10.929,10.929,0,0,1,.2,2.094A10.475,10.475,0,0,1,14.935,26.5,10.458,10.458,0,0,1,4.609,15.914,10.558,10.558,0,0,1,12.427,5.631,10.222,10.222,0,0,1,13.8,5.38m.86,8.181L23.629,3.278,20.245,1.514l-5.6,6.4Zm9.512-2.118L28.8,5.732V0L22.4,8.234Z" fill="#fff"/></svg></div></span></a>';
        $html .= '</div>';
        $html .= '</div>';
        $html .= '</div>';
        $html .= '</div>';
    endwhile;

    return $html;
}
