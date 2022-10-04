/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import {
	ToggleControl,
	TextareaControl,
	PanelRow,
} from '@wordpress/components';

const edit = ({ postType, postMeta, setPostMeta }) => {
	if (
		'post' !== postType &&
		'page' !== postType &&
		'news' !== postType &&
		'customers' !== postType
	) {
		return null; // Will only render component for post type 'post'
	}

	return (
		<PluginDocumentSettingPanel
			title={__('SEO Settings', 'gbblocks')}
			icon=""
			initialOpen="false"
			className="ix_hide_panel_icon"
		>
			<PanelRow>
				<TextareaControl
					className="igb_text_area"
					label={__('Meta Title', 'gbblocks')}
					value={postMeta.seo_meta_title}
					onChange={(value) => setPostMeta({ seo_meta_title: value })}
				/>
			</PanelRow>
			<PanelRow>
				<TextareaControl
					className="igb_text_area"
					label={__('Meta Description', 'gbblocks')}
					value={postMeta.seo_meta_description}
					onChange={(value) =>
						setPostMeta({ seo_meta_description: value })
					}
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={__('No Index', 'gbblocks')}
					onChange={(value) => setPostMeta({ seo_no_index: value })}
					checked={postMeta.seo_no_index}
				/>
			</PanelRow>
			<PanelRow>
				<ToggleControl
					label={__('No Follow', 'gbblocks')}
					onChange={(value) => setPostMeta({ seo_no_follow: value })}
					checked={postMeta.seo_no_follow}
				/>
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

export default compose([
	withSelect((select) => {
		return {
			postMeta: select('core/editor').getEditedPostAttribute('meta'),
			postType: select('core/editor').getCurrentPostType(),
		};
	}),
	withDispatch((dispatch) => {
		return {
			setPostMeta(newMeta) {
				dispatch('core/editor').editPost({ meta: newMeta });
			},
		};
	}),
])(edit);
