<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */
function create_customerpreview_block_init()
{
    register_block_type(
        GbBlocks_PLUGIN_DIR . '/dist/blocks/customerpreview',
        [
            'render_callback' => 'render_customerpreview',
        ]
    );
}
add_action('init', 'create_customerpreview_block_init');

function render_customerpreview($attrs)
{
    $attrs      = wp_parse_args(
        $attrs,
        [
            'taxonomy'      => '',
        ]
    );

    $taxonomy = $attrs['taxonomy'];

    $query_args = array(
        'post_type'         => 'customers',
        'posts_per_page'    => 3,
        'post_status'       => 'publish',
        'orderby'           => 'date',
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

    $customer_lists = get_posts($query_args);

    $html = '';

    $anchor = ($attrs['anchor'] != '') ? ' id="' . $attrs['anchor'] . '" ' : '';
    $className = ($attrs['extraClass'] != '') ? ' ' . $attrs['extraClass'] : '';
    $image = array();
    if (isset($customer_lists)) :
        $html .= '<div ' . $anchor . ' class="customers__preview customers__lists' . $className . '">';
        $html .= '<div class="row-wrapper row-wrapper--ct-wd">';
        $html .= '<div class="row row--gap-1 row--xs-center">';

        foreach ($customer_lists as $customer) :
            $id = $customer->ID;
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
                $html .= '<img  src =' . $default . ' alt = "' .$image_alt . '"  />';
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
        endforeach;

        $html .= '</div>';
        $html .= '</div>';
        $html .= '</div>';
    endif;

    return $html;
}
