/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { ArrowIcon } from "../../utils/block-icons";

export default function edit({ setAttributes, attributes }) {
	const { listlinkExtraClass, anchor, url, linkTarget, isListLink } =
		attributes;

	const [isEditingURL, setIsEditingURL] = useState(false);

	const innerBlocksProps = useInnerBlocksProps(
		{ className: "list-link__wrap" },
		{
			allowedBlocks: ["gbblocks/icon", "gbblocks/headline"],
			template: [
				[
					"gbblocks/icon",
					{
						iconbgColor: "#8ABD7D",
						iconbgColorClass: "four",
						isbutton: true,
					},
				],
				[
					"gbblocks/headline",
					{
						level: "6",
						headStyle: "seven",
						headColor: "49725B",
						headColorClass: "one",
					},
				],
			],
			templateLock: "all",
		}
	);

	const opensInNewTab = linkTarget === "_blank";

	function unlink() {
		setAttributes({
			url: undefined,
			linkTarget: undefined,
		});
		setIsEditingURL(false);
	}

	function onToggleOpenInNewTab(value) {
		const newLinkTarget = value ? "_blank" : undefined;

		setAttributes({
			linkTarget: newLinkTarget,
		});
	}

	return (
		<>
			<InspectorControls>
				{isListLink == true && (
					<PanelBody title={__("Link Settings", "gbblocks")} initialOpen={true}>
						<div className="gb--link-control">
							<LinkControl
								className="wp-block-navigation-link__inline-link-input"
								value={{ url, opensInNewTab }}
								onChange={({
									url: newURL = "",
									opensInNewTab: newOpensInNewTab,
								}) => {
									setAttributes({ url: newURL });

									if (opensInNewTab !== newOpensInNewTab) {
										onToggleOpenInNewTab(newOpensInNewTab);
									}
								}}
								onRemove={() => {
									unlink();
								}}
								forceIsEditingLink={isEditingURL}
							/>
						</div>
					</PanelBody>
				)}
				<PanelBody title={__("Additional", "gbblocks")} initialOpen={true}>
					<TextControl
						label={__("Anchor", "gbblocks")}
						placeholder={__("Specify Id…", "gbblocks")}
						type="text"
						value={anchor}
						onChange={(value) => setAttributes({ anchor: value })}
					/>
					<TextControl
						label={__("Class", "gbblocks")}
						placeholder={__("Specify class…", "gbblocks")}
						type="text"
						value={listlinkExtraClass}
						onChange={(value) => setAttributes({ listlinkExtraClass: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{undefined == url ? (
					<div
						id={anchor ? anchor : null}
						className={`list-link ${listlinkExtraClass}`}
					>
						<div {...innerBlocksProps} />
						{(isListLink == false || undefined != url) && <ArrowIcon />}
					</div>
				) : (
					<a
						id={anchor ? anchor : null}
						href={url}
						rel={linkTarget ? "noopener" : null}
						target={linkTarget ? linkTarget : null}
						className={`list-link ${listlinkExtraClass}`}
					>
						<div {...innerBlocksProps} />
						<ArrowIcon />
					</a>
				)}
			</div>
		</>
	);
}
