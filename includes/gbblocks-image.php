<?php
function get_blocks_images($postId, $xs, $md, $default)
{


    $image = '';
    $upload_dir = wp_upload_dir();

    $monthurl = explode($upload_dir['baseurl'], $default)[1];
    $webpimage = $upload_dir['basedir'] . substr($monthurl, 0, strrpos($monthurl, ".")) . '.webp';

    if (file_exists($webpimage)) {
        $webpimageUrl = substr($default, 0, strrpos($default, ".")) . '.webp';
    } else {
        $webpimageUrl = '';
    }

    $xsmonthurl = explode($upload_dir['baseurl'], $xs[0])[1];
    $xswebpimage = $upload_dir['basedir'] . substr($xsmonthurl, 0, strrpos($xsmonthurl, ".")) . '.webp';
    if (file_exists($xswebpimage)) {
        $xswebpimageUrl = substr($xs[0], 0, strrpos($xs[0], ".")) . '.webp';
    } else {
        $xswebpimageUrl = '';
    }

    $mdmonthurl = explode($upload_dir['baseurl'], $md[0])[1];
    $mdwebpimage = $upload_dir['basedir'] . substr($mdmonthurl, 0, strrpos($mdmonthurl, ".")) . '.webp';
    if (file_exists($mdwebpimage)) {
        $mdwebpimageUrl = substr($md[0], 0, strrpos($md[0], ".")) . '.webp';
    } else {
        $mdwebpimageUrl = '';
    }

    // desktop img rendering
    if ($default) :
        $image .= ($webpimageUrl) ? '<source media="(min-width:1025px)" srcset=' . $webpimageUrl . ' type="image/webp" />' : '';
        $image .= '<source media="(min-width:1025px)" srcset=' . $default . ' />';
    elseif ($md) :
        $image .= ($mdwebpimageUrl) ? '<source media="(min-width:1025px)" srcset=' . $mdwebpimageUrl . ' type="image/webp" />' : '';
        $image .= '<source media="(min-width:1025px)" srcset=' . $md[0] . ' />';
    elseif ($xs) :
        $image .= ($xswebpimageUrl) ? '<source media="(min-width:1025px)" srcset=' . $xswebpimageUrl . ' type="image/webp" />' : '';
        $image .= '<source media="(min-width:1025px)" srcset=' . $xs[0] . ' />';
    endif;
    // tablet img rendering
    if ($md) :
        $image .= ($mdwebpimageUrl) ? '<source media="(min-width:481px)" srcset=' . $mdwebpimageUrl . ' type="image/webp" />' : '';
        $image .= '<source media="(min-width:481px)" srcset=' . $md[0] . ' />';
    elseif ($default) :
        $image .= ($webpimageUrl) ? '<source media="(min-width:481px)" srcset=' . $webpimageUrl . ' type="image/webp" />' : '';
        $image .= '<source media="(min-width:481px)" srcset=' . $default . ' />';
    elseif ($xs) :
        $image .= ($xswebpimageUrl) ? '<source media="(min-width:481px)" srcset=' . $xswebpimageUrl . ' type="image/webp" />' : '';
        $image .= '<source media="(max-width:480px)" srcset=' . $xs[0] . ' />';
    endif;
    // mobile img rendering
    if ($xs) :
        $image .= ($xswebpimageUrl) ? '<source media="(max-width:480px)" srcset=' . $xswebpimageUrl . ' type="image/webp" />' : '';
        $image .= '<source media="(max-width:480px)" srcset=' . $xs[0] . ' />';
    elseif ($md) :
        $image .= ($mdwebpimageUrl) ? '<source media="(max-width:480px)" srcset=' . $mdwebpimageUrl . ' type="image/webp" />' : '';
        $image .= '<source media="(max-width:480px)" srcset=' . $md[0] . ' />';
    elseif ($default) :
        $image .= ($webpimageUrl) ? '<source media="(mmax-width:480px)" srcset=' . $webpimageUrl . ' type="image/webp" />' : '';
        $image .= '<source media="(max-width:480px)" srcset=' . $default . ' />';
    endif;

    $data = array($postId => $image);

    return $data;
}
