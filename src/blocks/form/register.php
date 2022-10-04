<?php

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 *
 * @since 0.1.0
 */
function create_form_block_init()
{
    register_block_type(
        GbBlocks_PLUGIN_DIR . '/dist/blocks/form',
        [
            'render_callback' => 'render_form',
        ]
    );
}
add_action('init', 'create_form_block_init');

function render_form($attrs, $content)
{
    if ('' != $attrs['clientid']) {
        if ('' != $attrs['recipients']) {
            (FALSE !== get_option('cf-mail-' . $attrs['clientid'])) ? update_option('cf-mail-' . $attrs['clientid'], $attrs['recipients']) :  add_option('cf-mail-' . $attrs['clientid'], $attrs['recipients']);
        }
        if ('' != $attrs['mailSubject']) {
            (FALSE !== get_option('cf-subject-' . $attrs['clientid'])) ? update_option('cf-subject-' . $attrs['clientid'], $attrs['mailSubject']) :  add_option('cf-subject-' . $attrs['clientid'], $attrs['mailSubject']);
        }
    }
    return $content;
}

add_action("wp_ajax_sendEmail", "sendEmail");
add_action("wp_ajax_nopriv_sendEmail", "sendEmail");
function sendEmail()
{
    $response = array();
    if (isset($_REQUEST)) :
        $timediff = strtotime(date('Y-m-d H:i:s', time())) - strtotime(date('Y-m-d H:i:s', $_REQUEST['time']));

        if (!empty($_REQUEST['con_name']) || $timediff <= 3) {
            $response = array('status' => true, 'message' => __("Thank you for your message. It has been sent.", "gbblocks"));
        } else {
            $headers = array('Content-Type: text/html; charset=UTF-8');
            $headers[] = 'From: ' . get_option('smtp_fromName') . ' <' . get_option('smtp_from') . '>';

            ob_start();
            get_template_part('template-parts/emailTemplate', $_REQUEST);
            $message = ob_get_clean();

            if ('' != $_REQUEST['clientid']) :
                if (FALSE == get_option('cf-mail-' . $_REQUEST['clientid'])) {
                    $response = array('status' => false, 'message' => __('Something Went Wrong!', "gbblocks"));
                } else {
                    $sendMail = wp_mail(get_option('cf-mail-' . $_REQUEST['clientid']), get_option('cf-subject-' . $_REQUEST['clientid']), $message, $headers);
                    if (false == $sendMail) {
                        $response = array('status' => false, 'message' => __("There was an error trying to send your message. Please try again later.", "gbblocks"));
                    } else {
                        $response = array('status' => true, 'message' => __("Thank you for your message. It has been sent.", "gbblocks"));
                    }
                }
            endif;
        }
    endif;
    wp_send_json($response);
    die;
}
