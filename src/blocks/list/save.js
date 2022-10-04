/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { values, listStyle, listColorClass, anchor, listExtraClass } =
		attributes;

	const colorClass = listColorClass ? `list--color-${listColorClass}` : '';

	return (
		<ul
			id={anchor ? `${anchor}` : null}
			className={`list ${listExtraClass} list--style-${listStyle} ${colorClass}`}
		>
			<RichText.Content value={values} multiline="li" />
		</ul>
	);
}
