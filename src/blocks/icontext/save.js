/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { anchor, extraClass } = attributes;
	return (
		<>
			<div
				id={anchor ? `${anchor}` : null}
				className={`icon-text ${extraClass}`}
			>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
