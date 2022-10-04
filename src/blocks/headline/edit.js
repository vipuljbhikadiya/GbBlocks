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
import { Platform } from "@wordpress/element";
import { alignCenter, alignLeft, alignRight } from "@wordpress/icons";

/**
 * External dependencies
 */
import classnames from "classnames";

/***
 * Interal dependencies
 */
import { theme_colors } from "../../utils/block-helpers";

export default function edit({ setAttributes, attributes }) {
	const {
		content,
		level,
		placeholder,
		headColor,
		headColorClass,
		headStyle,
		responsiveMode,
		AlignXs,
		AlignSm,
		AlignMd,
		AlignLg,
		AlignXl,
		extraClass,
		headExtraClass,
		anchor,
	} = attributes;

	const tagName = level == "span" ? "span" : "h" + level;

	const onContentChange = (value) => {
		const newContent = { content: value };
		setAttributes(newContent);
	};

	const blockProps = useBlockProps();

	const SetColorClass = (value) => {
		if (value !== undefined) {
			theme_colors.filter(function (item) {
				if (item.color == value) {
					setAttributes({
						headColorClass: item.slug,
					});
				}
			});
		} else {
			setAttributes({
				headColorClass: "",
			});
		}
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

	const colorClass = headColorClass ? `headline--color-${headColorClass}` : "";
	const styleClass = headStyle ? `headline--style-${headStyle}` : "";
	const headlineAlign = alignclass != "" ? `${alignclass}` : "";

	const blockClass = classnames(
		`headline`,
		`${headExtraClass}`,
		`${headlineAlign}`,
		`${styleClass}`,
		`${colorClass}`,
		`${extraClass}`
	);

	const resMode = ["xs", "sm", "md", "lg", "xl"];
	const headAlignSettings = {
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

	const options = [
		{
			key: "one",
			name: "One",
			style: {
				fontSize: "60px",
				lineHeight: "70px",
				textTransform: "uppercase",
				fontFamily: "Barlow",
				letterSpacing: "3.24px",
			},
		},
		{
			key: "two",
			name: "Two",
			style: {
				fontSize: "50px",
				lineHeight: "60px",
				textTransform: "uppercase",
				fontFamily: "Barlow",
				fontWeight: "600",
				letterSpacing: "2.7px",
			},
		},
		{
			key: "three",
			name: "Three",
			style: {
				fontSize: "31px",
				lineHeight: "37px",
				textTransform: "uppercase",
				fontFamily: "Barlow",
				letterSpacing: "1.674px",
			},
		},
		{
			key: "four",
			name: "Four",
			style: {
				fontSize: "26px",
				lineHeight: "29px",
				textTransform: "uppercase",
				fontWeight: "600",
				fontFamily: "Barlow",
			},
		},
		{
			key: "five",
			name: "Five",
			style: {
				fontSize: "24px",
				lineHeight: "29px",
				fontFamily: "Barlow",
				letterSpacing: "1.296px",
			},
		},
		{
			key: "six",
			name: "Six",
			style: {
				fontSize: "23px",
				lineHeight: "27px",
				fontFamily: "Barlow",
				fontWeight: "600",
			},
		},
		{
			key: "seven",
			name: "Seven",
			style: {
				fontSize: "18px",
				lineHeight: "22px",
				fontFamily: "Barlow",
				fontWeight: "500",
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
								headStyle: selectedItem.key,
							})
						}
						value={options.find((option) => option.key === headStyle)}
					/>
					<PanelColorSettings
						title={__("Color", "gbblocks")}
						className={"block-color-setting block-color-top-0"}
						colorSettings={[
							{
								colors: theme_colors,
								value: headColor,
								onChange: (value) => {
									typeof value == "undefined"
										? setAttributes({ headColorClass: "" })
										: SetColorClass(value);
									typeof value == "undefined"
										? setAttributes({
												headColor: "#575756",
										  })
										: setAttributes({ headColor: value });
								},
								label: __("Color", "gbblocks"),
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
								let align = headAlignSettings[item]["align"];

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
				<PanelBody title={__("Settings")} initialOpen={true}>
					<ToggleGroupControl
						label={__("Tag", "gbblocks")}
						value={level}
						onChange={(value) => {
							setAttributes({
								level: value,
							});
						}}
						className="block-toggle-full"
					>
						<ToggleGroupControlOption
							value="1"
							label={__("1", "gbblocks")}
							showTooltip={true}
							aria-label={__("H1", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="2"
							label={__("2", "gbblocks")}
							showTooltip={true}
							aria-label={__("H2", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="3"
							label={__("3", "gbblocks")}
							showTooltip={true}
							aria-label={__("H3", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="4"
							label={__("4", "gbblocks")}
							showTooltip={true}
							aria-label={__("H4", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="5"
							label={__("5", "gbblocks")}
							showTooltip={true}
							aria-label={__("H5", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="6"
							label={__("6", "gbblocks")}
							showTooltip={true}
							aria-label={__("H6", "gbblocks")}
						/>
						<ToggleGroupControlOption
							value="span"
							label={__("SPAN", "gbblocks")}
							showTooltip={true}
							aria-label={__("Span", "gbblocks")}
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
						value={headExtraClass}
						onChange={(value) => setAttributes({ headExtraClass: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<RichText
				identifier="content"
				tagName={tagName}
				className={blockClass}
				value={content}
				id={anchor ? anchor : null}
				onChange={onContentChange}
				withoutInteractiveFormatting={true}
				aria-label={__("Heading text", "gbblocks")}
				placeholder={placeholder || __("Heading", "gbblocks")}
				{...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
				allowedFormats={[""]}
			/>
		</div>
	);
}
