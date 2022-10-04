/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	return (
		<>
			<div className="footer--main-wrap">
				<InnerBlocks.Content />
			</div>
		</>
	);
}
