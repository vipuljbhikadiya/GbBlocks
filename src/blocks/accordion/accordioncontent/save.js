/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return (
		<div className={`accordion-collapse collapse`}>
			<div className="accordion-body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
