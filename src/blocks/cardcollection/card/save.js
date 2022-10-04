/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import cardClasses from '../cardClasses';

export default function save({ attributes }) {
	const { parentAttributesData } = attributes;

	return (
		<>
			<div
				className={classnames(
					'col col--pd-0',
					cardClasses(parentAttributesData)
				)}
			>
				<div className="card--details-wrap col__content">
					<InnerBlocks.Content />
				</div>
			</div>
		</>
	);
}
