/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { anchor, extraClass } = attributes;
	return (
		<>
			<div
				id={anchor ? anchor : null}
				className={classnames(
					'container image-overlay__row',
					extraClass ? extraClass : null
				)}
			>
				<div className="image-overlay__wrapper">
					<InnerBlocks.Content />
				</div>
			</div>
		</>
	);
}
