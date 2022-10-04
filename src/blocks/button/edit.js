/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	Popover,
	ToolbarButton,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import {
	InspectorControls,
	useBlockProps,
	RichText,
	__experimentalLinkControl as LinkControl,
	BlockControls,
	PanelColorSettings,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import { displayShortcut } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';
import { alignCenter, alignLeft, alignRight } from '@wordpress/icons';

/***
 * Interal dependencies
 */
import { theme_colors } from '../../utils/block-helpers';

export default function edit({
	setAttributes,
	attributes,
	isSelected,
	onReplace,
	mergeBlocks,
}) {
	const {
		style,
		bgcolor,
		bgcolorClass,
		width,
		linkTarget,
		buttonicon,
		hoverButtonText,
		rel,
		text,
		url,
		responsiveMode,
		AlignXs,
		AlignSm,
		AlignMd,
		AlignLg,
		AlignXl,
		btnExtraClass,
		anchor,
	} = attributes;

	const ref = useRef();
	const richTextRef = useRef();

	const [isEditingURL, setIsEditingURL] = useState(false);
	const isURLSet = !!url;
	const opensInNewTab = linkTarget === '_blank';
	const NEW_TAB_REL = 'noopener';

	const relAttributes = [];

	// Stop the buttons from doing anything in the editor.
	const links = document.querySelectorAll('a.button--cta');

	for (let i = 0; i < links.length; i++) {
		links[i].addEventListener(
			'click',
			function (e) {
				if (links[i].getAttribute('href')) {
					links[i].removeAttribute('href');
					e.preventDefault();
				}
			},
			false
		);
	}

	function onToggleOpenInNewTab(value) {
		const newLinkTarget = value ? '_blank' : undefined;

		if (newLinkTarget) {
			relAttributes.push('noopener');
		}

		setAttributes({
			linkTarget: newLinkTarget,
		});
	}

	function startEditing(event) {
		event.preventDefault();
		setIsEditingURL(true);
	}

	function unlink() {
		setAttributes({
			url: undefined,
			linkTarget: undefined,
			rel: undefined,
		});
		setIsEditingURL(false);
	}

	useEffect(() => {
		if (!isSelected) {
			setIsEditingURL(false);
		}
	}, [isSelected]);

	const SetColorClass = (value) => {
		if (value !== undefined) {
			theme_colors.filter(function (item) {
				if (item.color == value) {
					setAttributes({
						bgcolorClass: item.slug,
					});
					setAttributes({
						bgcolor: item.color,
					});
				}
			});
		} else {
			setAttributes({
				bgcolorClass: '',
				bgcolor: '',
			});
		}
	};

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
		'button--hover': '' !== hoverButtonText,
		' button--icon': false !== buttonicon,
		[`${btnExtraClass}`]: '' !== btnExtraClass,
		[`${alignclass}`]: '' !== alignclass,
	});

	const relation =
		relAttributes && relAttributes.length > 0
			? relAttributes.join(' ')
			: null;

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'button--has-icon' },
		{
			allowedBlocks: ['gbblocks/icon'],
			template: [
				[
					'gbblocks/icon',
					{
						iconbgColor: '#49725B',
						iconbgColorClass: 'one',
						isbutton: true,
					},
				],
			],
			templateLock: 'all',
		}
	);

	const resMode = ['xs', 'sm', 'md', 'lg', 'xl'];
	const btnAlignSettings = {
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
		if (responsiveMode == 'xl') {
			setAttributes({
				AlignXl: value !== undefined ? value : '',
			});
		}
		if (responsiveMode == 'lg') {
			setAttributes({
				AlignLg: value !== undefined ? value : '',
			});
		}
		if (responsiveMode == 'md') {
			setAttributes({
				AlignMd: value !== undefined ? value : '',
			});
		}
		if (responsiveMode == 'sm') {
			setAttributes({
				AlignSm: value !== undefined ? value : '',
			});
		}
		if (responsiveMode == 'xs') {
			setAttributes({
				AlignXs: value !== undefined ? value : '',
			});
		}
	};

	return (
		<>
			<div {...useBlockProps({ className: `${alignclass}` })}>
				<InspectorControls>
					<PanelBody
						title={__('Styles', 'gbblocks')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label="Button Style"
							className="block-togglegroup"
							value={style}
							isBlock
							onChange={(value) => {
								setAttributes({
									style: value,
								});
							}}
						>
							<ToggleGroupControlOption
								value="one"
								label="Fill"
								showTooltip={true}
								aria-label="Fill"
							/>
							<ToggleGroupControlOption
								value="two"
								label="Outline"
								showTooltip={true}
								aria-label="Outline"
							/>
						</ToggleGroupControl>
						<PanelColorSettings
							title={__('Button color', 'gbblocks')}
							className={'block-color-setting block-color-top-0'}
							colorSettings={[
								{
									colors: theme_colors,
									value: bgcolor,
									onChange: (value) => {
										SetColorClass(value);
									},
									label: __('Button Color', 'gbblocks'),
								},
							]}
						/>
						<TextControl
							label={__('Button Hover Text', 'gbblocks')}
							placeholder={__(
								'Ovrwrite button hover text…',
								'gbblocks'
							)}
							type="text"
							value={hoverButtonText}
							onChange={(value) =>
								setAttributes({ hoverButtonText: value })
							}
						/>
						<ToggleControl
							label={__('Button With Icon', 'gbblocks')}
							checked={buttonicon}
							onChange={() =>
								setAttributes({
									buttonicon: !buttonicon,
								})
							}
						/>
					</PanelBody>
					<PanelBody
						title={__('Settings', 'gbblocks')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label={__('Width', 'gbblocks')}
							className="block-togglegroup"
							value={width}
							isBlock
							onChange={(value) => {
								setAttributes({
									width: value,
								});
							}}
						>
							<ToggleGroupControlOption
								value="inline"
								label={__('Inline', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Inline', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="one"
								label={__('1/4', 'gbblocks')}
								showTooltip={true}
								aria-label={__('1/4', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="two"
								label={__('2/4', 'gbblocks')}
								showTooltip={true}
								aria-label={__('2/4', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="three"
								label={__('3/4', 'gbblocks')}
								showTooltip={true}
								aria-label={__('3/4', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="four"
								label={__('4/4', 'gbblocks')}
								showTooltip={true}
								aria-label={__('4/4', 'gbblocks')}
							/>
						</ToggleGroupControl>
						<span className="block-seprator"></span>
						<label className="blocks-label block--label-as-component-button">
							Alignment
						</label>
						<ToggleGroupControl
							label={__('Responsive Mode', 'gbblocks')}
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
								label={__('XS', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Extra Small', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="sm"
								label={__('SM', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Small', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="md"
								label={__('MD', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Medium', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="lg"
								label={__('LG', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Large', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="xl"
								label={__('XL', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Extra Large', 'gbblocks')}
							/>
						</ToggleGroupControl>
						{responsiveMode && (
							<div className="button-control">
								{resMode.map((item, index) => {
									let align = btnAlignSettings[item]['align'];
									return (
										<div
											className="col-control-wrap"
											id={`col-${index}`}
										>
											{responsiveMode == item ? (
												<>
													<ToggleGroupControl
														label={__(
															'Alignment',
															'gbblocks'
														)}
														className="block-togglegroup"
														value={align}
														isBlock
														onChange={onChangeAlign}
													>
														<ToggleGroupControlOptionIcon
															value="left"
															icon={alignLeft}
															showTooltip={true}
															aria-label={__(
																'Left',
																'gbblocks'
															)}
														/>
														<ToggleGroupControlOptionIcon
															value="center"
															icon={alignCenter}
															showTooltip={true}
															aria-label={__(
																'Center',
																'gbblocks'
															)}
														/>
														<ToggleGroupControlOptionIcon
															value="right"
															icon={alignRight}
															showTooltip={true}
															aria-label={__(
																'Right',
																'gbblocks'
															)}
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
						)}
					</PanelBody>
					<PanelBody
						title={__('Additional', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Anchor', 'gbblocks')}
							placeholder={__('Specify Id…', 'gbblocks')}
							type="text"
							value={anchor}
							onChange={(value) =>
								setAttributes({ anchor: value })
							}
						/>
						<TextControl
							label={__('Class', 'gbblocks')}
							placeholder={__('Specify class…', 'gbblocks')}
							type="text"
							value={btnExtraClass}
							onChange={(value) =>
								setAttributes({ btnExtraClass: value })
							}
						/>
					</PanelBody>
				</InspectorControls>

				<BlockControls group="block">
					{!isURLSet && (
						<ToolbarButton
							name="link"
							icon={link}
							title={__('Link', 'gbblocks')}
							shortcut={displayShortcut.primary('k')}
							onClick={startEditing}
						/>
					)}
					{isURLSet && (
						<ToolbarButton
							name="link"
							icon={linkOff}
							title={__('Unlink', 'gbblocks')}
							shortcut={displayShortcut.primaryShift('k')}
							onClick={unlink}
							isActive={true}
						/>
					)}
				</BlockControls>
				{isSelected && (isEditingURL || isURLSet) && (
					<Popover
						onClose={() => {
							setIsEditingURL(false);
							richTextRef.current?.focus();
						}}
						anchorRef={ref?.current}
						focusOnMount={isEditingURL ? 'firstElement' : false}
						__unstableSlotName={'__unstable-block-tools-after'}
					>
						<LinkControl
							className="wp-block-navigation-link__inline-link-input"
							value={{ url, opensInNewTab }}
							onChange={({
								url: newURL = '',
								opensInNewTab: newOpensInNewTab,
							}) => {
								setAttributes({ url: newURL });

								if (opensInNewTab !== newOpensInNewTab) {
									onToggleOpenInNewTab(newOpensInNewTab);
								}
							}}
							onRemove={() => {
								unlink();
								richTextRef.current?.focus();
							}}
							forceIsEditingLink={isEditingURL}
						/>
					</Popover>
				)}

				<a
					className={btnclassName}
					href={!!url ? url : null}
					target={!!linkTarget ? '_blank' : null}
					rel={relation}
					id={anchor ? anchor : null}
				>
					{!!buttonicon || !!hoverButtonText ? (
						<>
							<span
								className="button--text"
								data-hover={
									!!hoverButtonText ? hoverButtonText : null
								}
							>
								<RichText
									ref={richTextRef}
									aria-label={__('Button text', 'gbblocks')}
									placeholder={__('Add text…', 'gbblocks')}
									value={text}
									onChange={(value) =>
										setAttributes({ text: value })
									}
									withoutInteractiveFormatting={false}
									allowedFormats={[]}
									onReplace={onReplace}
									onMerge={mergeBlocks}
									identifier="text"
								/>
							</span>
							<>
								{!!buttonicon && <span {...innerBlocksProps} />}
							</>
						</>
					) : (
						<RichText
							ref={richTextRef}
							aria-label={__('Button text', 'gbblocks')}
							placeholder={__('Add text…', 'gbblocks')}
							value={text}
							onChange={(value) => setAttributes({ text: value })}
							withoutInteractiveFormatting={false}
							allowedFormats={[]}
							onReplace={onReplace}
							onMerge={mergeBlocks}
							identifier="text"
						/>
					)}
				</a>
			</div>
		</>
	);
}
