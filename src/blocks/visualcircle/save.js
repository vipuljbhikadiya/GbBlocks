/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InnerBlocks } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

export default function save({ attributes }) {
	const { anchor, extraClass } = attributes;
	return (
		<div
			id={anchor ? `${anchor}` : null}
			className={classnames(
				`visual--circle_wrapper`,
				extraClass ? extraClass : ''
			)}
		>
			<ul className="visual--bg">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<ul className="circle--items">
				<InnerBlocks.Content />
			</ul>
		</div>
	);
}
