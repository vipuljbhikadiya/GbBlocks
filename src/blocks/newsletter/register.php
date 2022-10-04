<?PHP

function NTB_theme_option_setting()
{
    register_setting('ntb_theme_setting', 'mailchimpapikey');
    register_setting('ntb_theme_setting', 'listid');
    register_setting('ntb_theme_setting', 'serverprefix');
}

add_action('admin_init', 'NTB_theme_option_setting');

/**
 * Registers a new options page under Themes.
 */

add_action('admin_menu', 'theme_option_setting_page_menu');

function theme_option_setting_page_menu()
{
    add_theme_page(
        __('Mailchimp Options', 'gbblocks'),
        __('MailChimp Setting', 'gbblocks'),
        'manage_options',
        'mailchimp',
        'mailchimp_callback'
    );
}

/**
 * Settings page display callback.
 */
function mailchimp_callback()
{ ?>
    <style>
        .mailchimpdata .postbox {
            width: 1024px;
            max-width: 100%;
        }

        .mailchimpdata .wp-meta-fields-table .wp-meta-fields-content input[type="text"] {
            width: 100%;
        }
    </style>
    <h2>Mailchimp Settings</h2>
    <div id="poststuff" class="mailchimpdata">
        <div id="postbox-container-2" class="postbox-container">
            <div id="mailchimp-meta-box" class="postbox ">
                <div class="postbox-header">
                    <h2 class="hndle ui-sortable-handle">Mailchimp API Details</h2>
                </div>
                <div class="inside">
                    <form method="post" action="options.php">
                        <?php settings_fields('ntb_theme_setting'); ?>
                        <table class="widefat wp-meta-fields-table">
                            <tr class="wp-meta-fields-row">
                                <td class="wp-meta-fields-heading"><label for="login_url">Mailchimp Api key:</label></td>
                                <td class="wp-meta-fields-content"><input type="text" id="mailchimpapikey" name="mailchimpapikey" value="<?php echo get_option('mailchimpapikey'); ?>" /></td>
                            </tr>
                            <tr class="wp-meta-fields-row">
                                <td class="wp-meta-fields-heading"><label for="listid">Mailchimp List ID:</label></td>
                                <td class="wp-meta-fields-content"><input type="text" id="listid" name="listid" value="<?php echo get_option('listid'); ?>" /></td>
                            </tr>
                            <tr class="wp-meta-fields-row">
                                <td class="wp-meta-fields-heading"><label for="serverprefix">Mailchimp Server Prefix:</label></td>
                                <td class="wp-meta-fields-content"><input type="text" id="serverprefix" name="serverprefix" value="<?php echo get_option('serverprefix'); ?>" /></td>
                            </tr>
                            <tr class="wp-meta-fields-row">
                                <td class="wp-meta-fields-heading"></td>
                                <td class="wp-meta-fields-content"><?php submit_button(); ?></td>
                            </tr>
                        </table>

                    </form>
                </div>
            </div>
        </div>
    </div>

<?php }







add_action("wp_ajax_newsletter__form", "newsletter__form_callback");
add_action("wp_ajax_nopriv_newsletter__form", "newsletter__form_callback");

function newsletter__form_callback()
{
    $msg = __("Subscription unsuccessfull. Please try again.");
    $status = false;
    $subscription_status = '';

    $responsedata = array(
        'status' => $status,
        'msg' =>  $msg,
        'subscription_status' => $subscription_status
    );

    $apiKey =   get_option('mailchimpapikey');
    $server =   get_option('serverprefix');
    $list_id =  get_option('listid');

    if (!empty($apiKey) && !empty($server) && !empty($list_id)) {

        $apiKey = trim($apiKey);
        $server = trim($server);
        $list_id = trim($list_id);

        $keyName =  'key:' . $apiKey;

        $token = base64_encode($keyName);

        if ($_POST) {
            $timediff = strtotime(date('Y-m-d H:i:s', time())) - strtotime(date('Y-m-d H:i:s', $_POST['time']));
            if (!empty($_POST['subscriber_email']) || $timediff <= 3) {
                $responsedata['subscription_status'] = true;
                $responsedata['status'] = true;
                $responsedata['msg'] = __("processed sucessfully.", "gbblocks");
            } else {
                $email = isset($_POST['your-email']) ? trim($_POST['your-email']) : '';

                if (!empty($email)) {
                    $email = filter_var($email, FILTER_SANITIZE_EMAIL);

                    $data = array(
                        'email_address' => $email,
                        "status" => "subscribed",
                    );

                    $submit_url =  'https://' . $server . '.api.mailchimp.com/3.0/lists/' . $list_id . '/members';

                    $payload = json_encode($data);

                    $curl = curl_init();

                    curl_setopt_array($curl, array(
                        CURLOPT_URL => $submit_url,
                        CURLOPT_RETURNTRANSFER => true,
                        CURLOPT_ENCODING => '',
                        CURLOPT_MAXREDIRS => 10,
                        CURLOPT_TIMEOUT => 0,
                        CURLOPT_FOLLOWLOCATION => true,
                        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                        CURLOPT_CUSTOMREQUEST => 'POST',
                        CURLOPT_POSTFIELDS => $payload,
                        CURLOPT_HTTPHEADER => array(
                            'Authorization: Basic ' . $token,
                            'Content-Type: application/json'
                        ),
                    ));

                    $response = curl_exec($curl);

                    $response = json_decode($response, true);

                    if (isset($response['status']) and $response['status'] == "subscribed") {
                        $responsedata['subscription_status'] = true;
                        $responsedata['status'] = true;
                        $responsedata['msg'] = __("processed sucessfully.", "gbblocks");
                    }
                }
            }
        }
    }

    wp_send_json_success($responsedata);
}
