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
					'row-wrapper container card--row',
					extraClass ? extraClass : null
				)}
			>
				<div className="row row--gap-1">
					<InnerBlocks.Content />
				</div>
			</div>
		</>
	);
}
