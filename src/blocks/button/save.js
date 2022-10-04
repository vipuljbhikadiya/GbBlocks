/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { IconForward } from '../../utils/block-icons';

export default function save({ attributes }) {
	const {
		style,
		bgcolorClass,
		width,
		url,
		linkTarget,
		text,
		buttonicon,
		hoverButtonText,
		AlignLg,
		AlignXl,
		AlignMd,
		AlignSm,
		AlignXs,
		anchor,
		btnExtraClass,
	} = attributes;

	const relAttributes = [];

	if (linkTarget) {
		relAttributes.push('noopener');
	}

	let alignclass = '';
	if (
		AlignXs == AlignSm &&
		AlignSm == AlignMd &&
		AlignMd == AlignLg &&
		AlignLg == AlignXl
	) {
		alignclass += ' button--align-xs-' + AlignXs;
	} else {
		if (AlignXs) {
			alignclass += ' button--align-xs-' + AlignXs;
		}
		if (AlignSm) {
			if (AlignSm != AlignXs) {
				alignclass += ' button--align-sm-' + AlignSm;
			}
		}
		if (AlignMd) {
			if (AlignMd != AlignSm) {
				alignclass += ' button--align-md-' + AlignMd;
			}
		}
		if (AlignLg) {
			if (AlignLg != AlignMd) {
				alignclass += ' button--align-lg-' + AlignLg;
			}
		}
		if (AlignXl) {
			if (AlignXl != AlignLg) {
				alignclass += ' button--align-xl-' + AlignXl;
			}
		}
	}

	const classes = `button--cta button--style-${style} button--width-${width} button--color-${bgcolorClass}`;
	const btnclassName = classnames({
		'button--text': !buttonicon && !hoverButtonText,
		[`${classes}`]: undefined !== classes,
		' button--hover': '' !== hoverButtonText,
		' button--icon': false !== buttonicon,
		[`${btnExtraClass}`]: '' !== btnExtraClass,
		[`${alignclass}`]: '' !== alignclass,
	});
	const relation =
		relAttributes && relAttributes.length > 0
			? relAttributes.join(' ')
			: null;

	return (
		<>
			<a
				className={btnclassName}
				href={!!url ? url : null}
				target={!!linkTarget ? '_blank' : null}
				rel={relation}
				id={anchor ? anchor : null}
			>
				<RichText.Content
					value={text}
					tagName={hoverButtonText || buttonicon ? 'span' : null}
					className={
						buttonicon || hoverButtonText ? 'button--text' : null
					}
					data-hover={
						hoverButtonText || buttonicon ? hoverButtonText : null
					}
				/>
				{!!buttonicon && (
					<span className="button--has-icon">
						<InnerBlocks.Content />
					</span>
				)}
			</a>
		</>
	);
}
