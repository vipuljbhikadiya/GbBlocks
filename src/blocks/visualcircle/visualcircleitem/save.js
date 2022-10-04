/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export default function save({ attributes }) {
	const { circleHeadline, circleText, anchor, extraClass } = attributes;

	return (
		<li className="visual--circle">
			<span className="circle--title">{circleHeadline}</span>
			<span className="circle--text">{circleText}</span>
		</li>
	);
}
