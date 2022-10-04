/**
 * External dependencies
 */

import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	PanelBody,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	CustomSelectControl,
	Button,
} from "@wordpress/components";
import {
	InspectorControls,
	useBlockProps,
	RichText,
	PanelColorSettings,
} from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";
import { Platform } from "@wordpress/element";
import { alignCenter, alignLeft, alignRight } from "@wordpress/icons";

/***
 * Interal dependencies
 */
import { theme_Extra_colors } from "../../utils/block-helpers";

export default function edit({
	setAttributes,
	attributes,
	clientId,
	mergeBlocks,
	onReplace,
	onRemove,
}) {
	const {
		content,
		tag,
		placeholder,
		textColorClass,
		textColor,
		textStyle,
		responsiveMode,
		AlignXs,
		AlignSm,
		AlignMd,
		AlignLg,
		AlignXl,
		textExtraClass,
		anchor,
		extraClass,
	} = attributes;

	const onContentChange = (value) => {
		const newContent = { content: value };
		setAttributes(newContent);
	};

	const tagName = tag;

	const SetColorClass = (value) => {
		theme_Extra_colors.filter(function (item) {
			if (item.color == value) {
				setAttributes({
					textColorClass: item.slug,
				});
			}
		});
	};

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

	const blockClass = classnames(
		`text`,
		`${textExtraClass}`,
		`${paragraphAlignClass}`,
		`${colorClass}`,
		`${styleClass}`,
		`${extraParagraphClass}`
	);

	const resMode = ["xs", "sm", "md", "lg", "xl"];
	const textAlignSettings = {
		xs: {
			align: AlignXs,
		},
		sm: {
			align: AlignSm,
		},
		md: {
			align: AlignMd,
		},
		lg: {
			align: AlignLg,
		},
		xl: {
			align: AlignXl,
		},
	};

	const onChangeAlign = (value) => {
		if (responsiveMode == "xl") {
			setAttributes({
				AlignXl: value !== undefined ? value : "",
			});
		}
		if (responsiveMode == "lg") {
			setAttributes({
				AlignLg: value !== undefined ? value : "",
				AlignXl: value !== undefined ? value : "",
			});
		}
		if (responsiveMode == "md") {
			setAttributes({
				AlignMd: value !== undefined ? value : "",
				AlignLg: value !== undefined ? value : "",
				AlignXl: value !== undefined ? value : "",
			});
		}
		if (responsiveMode == "sm") {
			setAttributes({
				AlignSm: value !== undefined ? value : "",
				AlignMd: value !== undefined ? value : "",
				AlignLg: value !== undefined ? value : "",
				AlignXl: value !== undefined ? value : "",
			});
		}
		if (responsiveMode == "xs") {
			setAttributes({
				AlignXs: value !== undefined ? value : "",
				AlignSm: value !== undefined ? value : "",
				AlignMd: value !== undefined ? value : "",
				AlignLg: value !== undefined ? value : "",
				AlignXl: value !== undefined ? value : "",
			});
		}
	};

	const resetAlignment = () => {
		setAttributes({
			AlignXs: "",
			AlignSm: "",
			AlignMd: "",
			AlignLg: "",
			AlignXl: "",
			responsiveMode: "",
		});
	};

	const blockProps = useBlockProps();

	const options = [
		{
			key: "one",
			name: "One",
			style: {
				fontSize: "27px",
				lineHeight: "32px",
				fontFamily: "Barlow",
			},
		},
		{
			key: "two",
			name: "Two",
			style: {
				fontSize: "20px",
				lineHeight: "34px",
				fontFamily: "Barlow",
			},
		},
		{
			key: "three",
			name: "Three",
			style: {
				fontSize: "18px",
				lineHeight: "28px",
				fontFamily: "Barlow",
			},
		},
	];

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__("Styles", "gbblocks")} initialOpen={true}>
					<CustomSelectControl
						label={__("Style", "gbblocks")}
						options={options}
						className="block--customselect"
						onChange={({ selectedItem }) =>
							setAttributes({
								textStyle: selectedItem.key,
							})
						}
						value={options.find((option) => option.key === textStyle)}
					/>
					<PanelColorSettings
						title={__("Text Color", "gbblocks")}
						className={"block-color-setting block-color-top-0"}
						colorSettings={[
							{
								colors: theme_Extra_colors,
								value: textColor,
								onChange: (value) => {
									typeof value == "undefined"
										? setAttributes({ textColorClass: "" })
										: SetColorClass(value);
									typeof value == "undefined"
										? setAttributes({
												textColor: "#000000",
										  })
										: setAttributes({ textColor: value });
								},
								label: __("Text Color", "gbblocks"),
							},
						]}
					/>
					<span className="block-seprator"></span>
					<label className="blocks-label block--label-as-component-button">
						Alignment
					</label>
					{responsiveMode && (
						<Button
							onClick={() => resetAlignment()}
							label={__("Reset", "gbblocks")}
							className="components-button components-range-control__reset is-secondary is-small resetAlign"
						>
							{__("Reset", "gbblocks")}
						</Button>
					)}
					<ToggleGroupControl
						label={__("Responsive Mode", "gbblocks")}
						className="block-togglegroup"
						value={responsiveMode}
						isBlock
						onChange={(value) => {
							setAttributes({
								responsiveMode: value,
							});
						}}
					>
						<ToggleGroupControlOption
							value="xs"
							label={__("XS", "gbblocks")}
							showTooltip={true}
							aria-label={__("Extra Small", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="sm"
							label={__("SM", "gbblocks")}
							showTooltip={true}
							aria-label={__("Small", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="md"
							label={__("MD", "gbblocks")}
							showTooltip={true}
							aria-label={__("Medium", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="lg"
							label={__("LG", "gbblocks")}
							showTooltip={true}
							aria-label={__("Large", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="xl"
							label={__("XL", "gbblocks")}
							showTooltip={true}
							aria-label={__("Extra Large", "gbblocks")}
						/>
					</ToggleGroupControl>
					{responsiveMode ? (
						<div className="button-control">
							{resMode.map((item, index) => {
								let align = textAlignSettings[item]["align"];
								return (
									<div className="col-control-wrap" id={`col-${index}`}>
										{responsiveMode == item ? (
											<>
												<ToggleGroupControl
													label={__("Alignment", "gbblocks")}
													className="block-togglegroup"
													value={align}
													isBlock
													onChange={onChangeAlign}
												>
													<ToggleGroupControlOptionIcon
														value="left"
														icon={alignLeft}
														showTooltip={true}
														aria-label={__("Left", "gbblocks")}
													/>
													<ToggleGroupControlOptionIcon
														value="center"
														icon={alignCenter}
														showTooltip={true}
														aria-label={__("Center", "gbblocks")}
													/>
													<ToggleGroupControlOptionIcon
														value="right"
														icon={alignRight}
														showTooltip={true}
														aria-label={__("Right", "gbblocks")}
													/>
												</ToggleGroupControl>
											</>
										) : (
											<></>
										)}
									</div>
								);
							})}
						</div>
					) : (
						<ToggleGroupControl
							label={__("Alignment", "gbblocks")}
							className="block-togglegroup"
							value=""
							isBlock
							onChange={onChangeAlign}
						>
							<ToggleGroupControlOptionIcon
								value="left"
								icon={alignLeft}
								showTooltip={true}
								aria-label={__("Left", "gbblocks")}
							/>
							<ToggleGroupControlOptionIcon
								value="center"
								icon={alignCenter}
								showTooltip={true}
								aria-label={__("Center", "gbblocks")}
							/>
							<ToggleGroupControlOptionIcon
								value="right"
								icon={alignRight}
								showTooltip={true}
								aria-label={__("Right", "gbblocks")}
							/>
						</ToggleGroupControl>
					)}
				</PanelBody>
				<PanelBody title={__("Settings", "gbblocks")} initialOpen={true}>
					<ToggleGroupControl
						label={__("Tag", "gbblocks")}
						className="block-togglegroup"
						value={tag}
						onChange={(value) => {
							setAttributes({
								tag: value,
							});
						}}
					>
						<ToggleGroupControlOption
							value="p"
							label={__("P", "gbblocks")}
							showTooltip={true}
							aria-label={__("P", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="span"
							label={__("SPAN", "gbblocks")}
							showTooltip={true}
							aria-label={__("SPAN", "gbblocks")}
						/>
					</ToggleGroupControl>
				</PanelBody>
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
						value={textExtraClass}
						onChange={(value) => setAttributes({ textExtraClass: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<RichText
				identifier="content"
				tagName={tagName}
				id={anchor ? anchor : null}
				className={blockClass}
				value={content}
				onChange={onContentChange}
				onSplit={(value, isOriginal) => {
					let newAttributes;

					newAttributes = {
						...attributes,
						content: value,
					};

					const block = createBlock("gbblocks/paragraph", newAttributes);

					if (isOriginal) {
						block.clientId = clientId;
					}

					return block;
				}}
				onMerge={mergeBlocks}
				onReplace={onReplace}
				onRemove={onRemove}
				aria-label={__("Paragraph text", "gbblocks")}
				placeholder={placeholder || __("Add text here...", "gbblocks")}
				{...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
				allowedFormats={["core/bold", "core/italic", "core/link"]}
			/>
		</div>
	);
}
