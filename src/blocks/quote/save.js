/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/***
 * Interal dependencies
 */
import { QuoteIcon } from '../../utils/block-icons';

export default function save({ attributes }) {
	const { content, quoteColor, quoteColorClass, quoteExtraClass, anchor } =
		attributes;

	const colorClass = quoteColorClass ? `quote--color-${quoteColorClass}` : '';

	const blockClass = classnames(
		`quote`,
		`${quoteExtraClass}`,
		`${colorClass}`
	);
	return (
		<div id={anchor ? anchor : null} className={blockClass}>
			<QuoteIcon />
			<p className="quote__text">
				<RichText.Content value={content} />
			</p>
		</div>
	);
}
