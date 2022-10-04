/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ToggleControl,
	SelectControl,
	RangeControl,
	Button,
	TextControl,
} from '@wordpress/components';
import { Component } from '@wordpress/element';

/***
 * Interal dependencies
 */
import { theme_colors } from '../../utils/block-helpers';

export default class Edit extends Component {
	render() {
		const {
			attributes: {
				backgroundColor,
				colResponsiveMode,
				xlwidth,
				lgwidth,
				mdwidth,
				smwidth,
				xswidth,
				xloffset,
				lgoffset,
				mdoffset,
				smoffset,
				xsoffset,
				colPadding,
				xlalignV,
				lgalignV,
				mdalignV,
				smalignV,
				xsalignV,
				anchor,
				hideLG,
				hideMD,
				hideXS,
			},
			setAttributes,
		} = this.props;

		const resMode = ['xs', 'sm', 'md', 'lg', 'xl'];

		const colSettings = {
			xs: {
				width: xswidth,
				offset: xsoffset,
				alignV: xsalignV,
			},
			sm: {
				width: smwidth,
				offset: smoffset,
				alignV: smalignV,
			},
			md: {
				width: mdwidth,
				offset: mdoffset,
				alignV: mdalignV,
			},
			lg: {
				width: lgwidth,
				offset: lgoffset,
				alignV: lgalignV,
			},
			xl: {
				width: xlwidth,
				offset: xloffset,
				alignV: xlalignV,
			},
		};

		const onChangeWidth = (value) => {
			if (colResponsiveMode == 'xl') {
				setAttributes({
					xlwidth: value !== undefined ? value : 0,
				});
			}
			if (colResponsiveMode == 'lg') {
				setAttributes({
					lgwidth: value !== undefined ? value : 0,
				});
			}
			if (colResponsiveMode == 'md') {
				setAttributes({
					mdwidth: value !== undefined ? value : 0,
				});
			}
			if (colResponsiveMode == 'sm') {
				setAttributes({
					smwidth: value !== undefined ? value : 0,
				});
			}
			if (colResponsiveMode == 'xs') {
				setAttributes({
					xswidth: value !== undefined ? value : 0,
				});
			}
		};
		const onChangeOffset = (value) => {
			if (colResponsiveMode == 'xl') {
				setAttributes({
					xloffset: value !== undefined ? value : -1,
				});
			}
			if (colResponsiveMode == 'lg') {
				setAttributes({
					lgoffset: value !== undefined ? value : -1,
				});
			}
			if (colResponsiveMode == 'md') {
				setAttributes({
					mdoffset: value !== undefined ? value : -1,
				});
			}
			if (colResponsiveMode == 'sm') {
				setAttributes({
					smoffset: value !== undefined ? value : -1,
				});
			}
			if (colResponsiveMode == 'xs') {
				setAttributes({
					xsoffset: value !== undefined ? value : -1,
				});
			}
		};
		const onChangeAlignV = (value) => {
			if (colResponsiveMode == 'xl') {
				setAttributes({
					xlalignV: value,
				});
			}
			if (colResponsiveMode == 'lg') {
				setAttributes({
					lgalignV: value,
				});
			}
			if (colResponsiveMode == 'md') {
				setAttributes({
					mdalignV: value,
				});
			}
			if (colResponsiveMode == 'sm') {
				setAttributes({
					smalignV: value,
				});
			}
			if (colResponsiveMode == 'xs') {
				setAttributes({
					xsalignV: value,
				});
			}
		};

		const resetColAlignV = (responsiveMode) => {
			if (responsiveMode == 'xl') {
				setAttributes({
					xlalignV: '',
				});
			}
			if (responsiveMode == 'lg') {
				setAttributes({
					lgalignV: '',
				});
			}
			if (responsiveMode == 'md') {
				setAttributes({
					mdalignV: '',
				});
			}
			if (responsiveMode == 'sm') {
				setAttributes({
					smalignV: '',
				});
			}
			if (responsiveMode == 'xs') {
				setAttributes({
					xsalignV: '',
				});
			}
		};

		const SetColorClass = (value) => {
			theme_colors.filter(function (item) {
				if (item.color == value) {
					setAttributes({
						colbgClass: item.slug,
					});
				}
			});
		};

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'gbblocks')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label={__('Responsive Mode', 'gbblocks')}
							className="block-togglegroup"
							value={colResponsiveMode}
							isBlock
							onChange={(value) => {
								setAttributes({
									colResponsiveMode: value,
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
						{colResponsiveMode && (
							<div className="col-control">
								{resMode.map((item, index) => {
									let vAlign = colSettings[item]['alignV'];
									let width = colSettings[item]['width'];
									let offset = colSettings[item]['offset'];
									return (
										<div
											className="col-control-wrap"
											id={`col-${index}`}
										>
											{colResponsiveMode == item ? (
												<>
													<RangeControl
														label={__(
															'Width',
															'gbblocks'
														)}
														value={width}
														onChange={onChangeWidth}
														min={0}
														max={12}
														allowReset={true}
													/>
													<RangeControl
														label={__(
															'Offset',
															'gbblocks'
														)}
														value={offset}
														onChange={
															onChangeOffset
														}
														min={-1}
														max={11}
														allowReset={true}
													/>
													<div className="block--row__settings">
														<SelectControl
															label={__(
																'Alignment - Vertical',
																'gbblocks'
															)}
															options={[
																{
																	value: '',
																	label: __(
																		'Not Set',
																		'gbblocks'
																	),
																},
																{
																	value: 'top',
																	label: __(
																		'Top',
																		'gbblocks'
																	),
																},
																{
																	value: 'middle',
																	label: __(
																		'Middle',
																		'gbblocks'
																	),
																},
																{
																	value: 'bottom',
																	label: __(
																		'Bottom',
																		'gbblocks'
																	),
																},
															]}
															value={vAlign}
															onChange={
																onChangeAlignV
															}
														></SelectControl>
														<Button
															onClick={() =>
																resetColAlignV(
																	colResponsiveMode
																)
															}
															label={__(
																'Reset',
																'gbblocks'
															)}
															className="components-button components-range-control__reset is-secondary is-small block--reset-btn"
														>
															{__(
																'Reset',
																'gbblocks'
															)}
														</Button>
													</div>
												</>
											) : (
												<></>
											)}
										</div>
									);
								})}
							</div>
						)}
						<span className="block-seprator"></span>
						<div className="block--row__settings block--row__col">
							<ToggleGroupControl
								label={__('Padding', 'gbblocks')}
								className="block-togglegroup"
								value={colPadding}
								isBlock
								onChange={(value) => {
									setAttributes({
										colPadding: Number(value),
									});
								}}
							>
								<ToggleGroupControlOption
									value="0"
									label={__('0', 'gbblocks')}
									showTooltip={true}
									aria-label={__('0px', 'gbblocks')}
								/>
								<ToggleGroupControlOption
									value="1"
									label={__('1', 'gbblocks')}
									showTooltip={true}
									aria-label={__('3px', 'gbblocks')}
								/>
								<ToggleGroupControlOption
									value="2"
									label={__('2', 'gbblocks')}
									showTooltip={true}
									aria-label={__('30px', 'gbblocks')}
								/>
								<ToggleGroupControlOption
									value="3"
									label={__('3', 'gbblocks')}
									showTooltip={true}
									aria-label={__('50px', 'gbblocks')}
								/>
								<ToggleGroupControlOption
									value="4"
									label={__('4', 'gbblocks')}
									showTooltip={true}
									aria-label={__('50px', 'gbblocks')}
								/>
							</ToggleGroupControl>
							<Button
								onClick={() =>
									setAttributes({
										colPadding: Number(1),
									})
								}
								label={__('Reset Padding', 'gbblocks')}
								className="components-button components-range-control__reset is-secondary is-small block--reset-btn"
							>
								{__('Reset Padding', 'gbblocks')}
							</Button>
						</div>
						<PanelColorSettings
							title={__('Background color', 'gbblocks')}
							className={'block-color-setting'}
							colorSettings={[
								{
									colors: theme_colors,
									value: backgroundColor,
									onChange: (value) => {
										typeof value == 'undefined'
											? setAttributes({ colbgClass: '' })
											: SetColorClass(value);
										setAttributes({
											backgroundColor: value,
										});
									},
									label: __('Background Color', 'gbblocks'),
								},
							]}
						/>
					</PanelBody>
					<PanelBody
						title={__('Additional', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Anchor', 'gbblocks')}
							placeholder={__('Specify link ID…', 'gbblocks')}
							type="text"
							value={anchor}
							onChange={(value) =>
								setAttributes({ anchor: value })
							}
						/>
						<ToggleControl
							label={__('Hide on Smartphone', 'gbblocks')}
							checked={hideXS}
							onChange={() =>
								setAttributes({
									hideXS: !hideXS,
								})
							}
						/>

						<ToggleControl
							label={__('Hide on Tablet', 'gbblocks')}
							checked={hideMD}
							onChange={() =>
								setAttributes({
									hideMD: !hideMD,
								})
							}
						/>

						<ToggleControl
							label={__('Hide on Desktop', 'gbblocks')}
							checked={hideLG}
							onChange={() =>
								setAttributes({
									hideLG: !hideLG,
								})
							}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	}
}
