/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

export default function save({ attributes }) {
	const { style, paddingTop, paddingBottom } = attributes;
	return (
		<hr
			class={`divider divider--style-${style} divider--pd-top-${paddingTop} divider--pd-bottom-${paddingBottom}`}
		/>
	);
}
