<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */
function create_downloadlisting_block_init()
{
    register_block_type(
        GbBlocks_PLUGIN_DIR . '/dist/blocks/downloadlisting',
        [
            'render_callback' => 'render_downloadlisting',
        ]
    );
}
add_action('init', 'create_downloadlisting_block_init');

function render_downloadlisting($attrs)
{

    $attrs      = wp_parse_args(
        $attrs,
        [
            'taxonomy'      => array(),
        ]
    );

    $taxonomy = $attrs['taxonomy'];

    $query_args = array(
        'post_type'         => 'downloads',
        'posts_per_page'    => -1,
        'post_status'       => 'publish',
    );
    if (!empty($taxonomy)) {
        $query_args['tax_query'] = array(
            array(
                'taxonomy'     => 'download_category',
                'terms'        => $taxonomy,
            ),
        );
    }
    $downloads = get_posts($query_args);

    $anchor = ($attrs['anchor'] != '') ? ' id="' . $attrs['anchor'] . '" ' : '';
    $className = ($attrs['extraClass'] != '') ? ' ' . $attrs['extraClass'] : '';

    $html = '';
    $html .= '<div' . $anchor . ' class="row-wrapper download__listing container' . $className . '">';
    $html .= '<div class="row row--xs-center row--col-ht row--gap-1">';
    if (!empty($downloads)) :

        foreach ($downloads as $download) :

            $html .= '<div class="col col--xs-12 col--lg-4 col--xl-3 col--pd-0">';
            $html .= '<div class="download__card">';
            $html .= '<div class="download__headline">';
            $html .= '<div class="download__icon">';
            $html .= '<span class="download__icon-wrap">';
            $html .= '<svg xmlns="http://www.w3.org/2000/svg" width="22.533" height="23.922" viewBox="0 0 22.533 23.922">
                <g id="_172460_download_arrow_icon" data-name="172460_download_arrow_icon" transform="translate(0 0.461)">
                  <path id="Path_181" data-name="Path 181" d="M24.463,27l-3.731,3.731L17,27" transform="translate(-9.465 -14.801)" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
                  <line id="Line_88" data-name="Line 88" y2="14.771" transform="translate(11.266 0.538)" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
                  <rect id="Rectangle_224" data-name="Rectangle 224" width="22.533" height="22.533" transform="translate(0 0)" fill="none"/>
                  <path id="Path_182" data-name="Path 182" d="M12.2,17H8V31.926H23.859V17h-4.2" transform="translate(-4.663 -9.465)" fill="none" stroke="#fff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
                </g>
              </svg>';
            $html .= '</span>';
            $html .= '</div>';
            $html .= '<div class="download__head">';
            $html .= '<h4 class="headline headline--style-seven headline--color-one">' . $download->post_title . '</h4>';
            $html .= '</div>';
            $html .= '</div>';
            $html .= '<p class="text text--style-three text-color-three">' . get_post_meta($download->ID, 'description', true) . '</p>';
            $html .= '<a href="' . wp_get_attachment_url(get_post_meta($download->ID, 'download_file_id', true)) . '" target="_blank" class="button--cta button--style-one button--width-inline button--color-four button--icon button--align-xs-left"><span class="button--text" data-hover="">Download</span><span class="button--has-icon"><div class="icon icon icon--bgcolor-one icon--color-six "><div class="icon__helper"></div><svg xmlns="http://www.w3.org/2000/svg" width="29.869" height="31.214" viewBox="0 0 29.869 31.214"><path id="Path_185" data-name="Path 185" d="M13.788,5.366,17.45.794A14.59,14.59,0,0,0,14.935.577,15.145,15.145,0,0,0,0,15.9,15.129,15.129,0,0,0,14.935,31.214,15.129,15.129,0,0,0,29.869,15.9a15.583,15.583,0,0,0-1.191-6l-3.6,3.91a10.929,10.929,0,0,1,.2,2.094A10.475,10.475,0,0,1,14.935,26.5,10.458,10.458,0,0,1,4.609,15.914,10.558,10.558,0,0,1,12.427,5.631,10.222,10.222,0,0,1,13.8,5.38m.86,8.181L23.629,3.278,20.245,1.514l-5.6,6.4Zm9.512-2.118L28.8,5.732V0L22.4,8.234Z" fill="#fff"/></svg></div></span></a>';
            $html .= '</div>';
            $html .= '</div>';
        endforeach;
    endif;
    $html .= '</div>';
    $html .= '</div>';
    return $html;
}
