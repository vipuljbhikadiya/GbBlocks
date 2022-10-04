/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";

/**
 * External dependencies
 */
import classnames from "classnames";

export default function save({ attributes }) {
	const {
		textAlign,
		headColorClass,
		content,
		level,
		headStyle,
		AlignXs,
		AlignSm,
		AlignMd,
		AlignLg,
		AlignXl,
		extraClass,
		headExtraClass,
		anchor,
	} = attributes;

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
			alignclass += " headline--align-xs-" + AlignXs;
		}
		if (AlignSm) {
			if (AlignSm != AlignXs) {
				alignclass += " headline--align-sm-" + AlignSm;
			}
		}
		if (AlignMd) {
			if (AlignMd != AlignSm) {
				alignclass += " headline--align-md-" + AlignMd;
			}
		}
		if (AlignLg) {
			if (AlignLg != AlignMd) {
				alignclass += " headline--align-lg-" + AlignLg;
			}
		}
		if (AlignXl) {
			if (AlignXl != AlignLg) {
				alignclass += " headline--align-xl-" + AlignXl;
			}
		}
	}

	const TagName = level == "span" ? "span" : "h" + level;

	const colorClass = headColorClass ? `headline--color-${headColorClass}` : "";
	const styleClass = headStyle ? `headline--style-${headStyle}` : "";
	const headlineAlign = alignclass != "" ? `${alignclass}` : "";

	const className = classnames(
		`headline`,
		`${headExtraClass}`,
		`${headlineAlign}`,
		`${styleClass}`,
		`${colorClass}`,
		`${extraClass}`
	);

	return (
		<TagName id={anchor ? anchor : null} className={className}>
			<RichText.Content value={content} />
		</TagName>
	);
}
