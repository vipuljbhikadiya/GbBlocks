/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const {
		textColorClass,
		content,
		tag,
		textStyle,
		extraClass,
		AlignXs,
		AlignSm,
		AlignMd,
		AlignLg,
		AlignXl,
		anchor,
		textExtraClass,
	} = attributes;

	const TagName = tag;

	let alignclass = "";

	if (
		AlignXs == AlignSm &&
		AlignSm == AlignMd &&
		AlignMd == AlignLg &&
		AlignLg == AlignXl &&
		AlignXs == "left"
	) {
		alignclass = "";
	} else {
		if (AlignXs) {
			alignclass += " text--align-xs-" + AlignXs;
		}
		if (AlignSm) {
			if (AlignSm != AlignXs) {
				alignclass += " text--align-sm-" + AlignSm;
			}
		}
		if (AlignMd) {
			if (AlignMd != AlignSm) {
				alignclass += " text--align-md-" + AlignMd;
			}
		}
		if (AlignLg) {
			if (AlignLg != AlignMd) {
				alignclass += " text--align-lg-" + AlignLg;
			}
		}
		if (AlignXl) {
			if (AlignXl != AlignLg) {
				alignclass += " text--align-xl-" + AlignXl;
			}
		}
	}

	const colorClass = textColorClass ? `text--color-${textColorClass}` : "";
	const styleClass = textStyle ? `text--style-${textStyle}` : "";
	const extraParagraphClass = extraClass ? `${extraClass}` : "";
	const paragraphAlignClass = alignclass != "" ? `${alignclass}` : "";

	const className = classnames(
		`text`,
		`${textExtraClass}`,
		`${paragraphAlignClass}`,
		`${colorClass}`,
		`${styleClass}`,
		`${extraParagraphClass}`
	);

	return (
		<TagName id={anchor ? anchor : null} className={className}>
			<RichText.Content value={content} />
		</TagName>
	);
}
