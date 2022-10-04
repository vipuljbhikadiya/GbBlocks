/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ToggleControl,
	SelectControl,
	Button,
	TextControl,
} from '@wordpress/components';
import { Component } from '@wordpress/element';

export default class Edit extends Component {
	render() {
		const {
			attributes: {
				rowResponsiveMode,
				xlAlignH,
				lgAlignH,
				mdAlignH,
				smAlignH,
				xsAlignH,
				xlAlignV,
				lgAlignV,
				mdAlignV,
				smAlignV,
				xsAlignV,
				xlReverseCol,
				lgReverseCol,
				mdReverseCol,
				smReverseCol,
				xsReverseCol,
				colheight,
				contentwidth,
				colgap,
				rowExtraClass,
				anchor,
			},
			setAttributes,
		} = this.props;

		const resMode = ['xs', 'sm', 'md', 'lg', 'xl'];

		const rowSettings = {
			xs: {
				alignH: xsAlignH,
				alignV: xsAlignV,
			},
			sm: {
				alignH: smAlignH,
				alignV: smAlignV,
			},
			md: {
				alignH: mdAlignH,
				alignV: mdAlignV,
			},
			lg: {
				alignH: lgAlignH,
				alignV: lgAlignV,
			},
			xl: {
				alignH: xlAlignH,
				alignV: xlAlignV,
			},
		};

		const updateHAlign = (value) => {
			if (rowResponsiveMode == 'xl') {
				setAttributes({
					xlAlignH: value,
				});
			}
			if (rowResponsiveMode == 'lg') {
				setAttributes({
					lgAlignH: value,
				});
			}
			if (rowResponsiveMode == 'md') {
				setAttributes({
					mdAlignH: value,
				});
			}
			if (rowResponsiveMode == 'sm') {
				setAttributes({
					smAlignH: value,
				});
			}
			if (rowResponsiveMode == 'xs') {
				setAttributes({
					xsAlignH: value,
				});
			}
		};
		const updateVAlign = (value) => {
			if (rowResponsiveMode == 'xl') {
				setAttributes({
					xlAlignV: value,
				});
			}
			if (rowResponsiveMode == 'lg') {
				setAttributes({
					lgAlignV: value,
				});
			}
			if (rowResponsiveMode == 'md') {
				setAttributes({
					mdAlignV: value,
				});
			}
			if (rowResponsiveMode == 'sm') {
				setAttributes({
					smAlignV: value,
				});
			}
			if (rowResponsiveMode == 'xs') {
				setAttributes({
					xsAlignV: value,
				});
			}
		};

		const resetHAlignment = (responsiveMode) => {
			if (responsiveMode == 'xl') {
				setAttributes({
					xlAlignH: '',
				});
			}
			if (responsiveMode == 'lg') {
				setAttributes({
					lgAlignH: '',
				});
			}
			if (responsiveMode == 'md') {
				setAttributes({
					mdAlignH: '',
				});
			}
			if (responsiveMode == 'sm') {
				setAttributes({
					smAlignH: '',
				});
			}
			if (responsiveMode == 'xs') {
				setAttributes({
					xsAlignH: '',
				});
			}
		};

		const resetVAlignment = (responsiveMode) => {
			if (responsiveMode == 'xl') {
				setAttributes({
					xlAlignV: '',
				});
			}
			if (responsiveMode == 'lg') {
				setAttributes({
					lgAlignV: '',
				});
			}
			if (responsiveMode == 'md') {
				setAttributes({
					mdAlignV: '',
				});
			}
			if (responsiveMode == 'sm') {
				setAttributes({
					smAlignV: '',
				});
			}
			if (responsiveMode == 'xs') {
				setAttributes({
					xsAlignV: '',
				});
			}
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'gbblocks')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label={__('Responsive Mode', 'gbblocks')}
							className="block-togglegroup"
							value={rowResponsiveMode}
							isBlock
							onChange={(value) => {
								setAttributes({
									rowResponsiveMode: value,
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
						{rowResponsiveMode && (
							<div className="row-control">
								{resMode.map((item, index) => {
									let horizontalAlign =
										rowSettings[item]['alignH'];
									let verticalAlign =
										rowSettings[item]['alignV'];
									return (
										<div
											className="row-control-wrap"
											id={`row-${index}`}
										>
											{rowResponsiveMode == item ? (
												<>
													<div className="block--row__settings">
														<SelectControl
															label={__(
																'Alignment - Horizontal',
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
																	value: 'start',
																	label: __(
																		'Start',
																		'gbblocks'
																	),
																},
																{
																	value: 'center',
																	label: __(
																		'Center',
																		'gbblocks'
																	),
																},
																{
																	value: 'end',
																	label: __(
																		'End',
																		'gbblocks'
																	),
																},
															]}
															value={
																horizontalAlign
															}
															onChange={
																updateHAlign
															}
														></SelectControl>
														<Button
															onClick={() =>
																resetHAlignment(
																	rowResponsiveMode
																)
															}
															label={__(
																'Reset',
																'gbblocks'
															)}
															className="components-button components-range-control__reset is-secondary is-small"
														>
															{__(
																'Reset',
																'gbblocks'
															)}
														</Button>
													</div>
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
															value={
																verticalAlign
															}
															onChange={
																updateVAlign
															}
														></SelectControl>
														<Button
															onClick={() =>
																resetVAlignment(
																	rowResponsiveMode
																)
															}
															label={__(
																'Reset',
																'gbblocks'
															)}
															className="components-button components-range-control__reset is-secondary is-small"
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
						<label className="block--label">Column - Order</label>
						<div className="block--row__settings">
							{rowResponsiveMode == 'xl' && (
								<>
									<ToggleControl
										label={__(
											'Reverse Columns',
											'gbblocks'
										)}
										checked={xlReverseCol}
										onChange={() =>
											setAttributes({
												xlReverseCol: !xlReverseCol,
											})
										}
									/>
									<Button
										onClick={() =>
											setAttributes({
												xlReverseCol: false,
											})
										}
										label={__('Reset', 'gbblocks')}
										className="components-button components-range-control__reset is-secondary is-small"
									>
										{__('Reset', 'gbblocks')}
									</Button>
								</>
							)}
							{rowResponsiveMode == 'lg' && (
								<>
									<ToggleControl
										label={__(
											'Reverse Columns',
											'gbblocks'
										)}
										checked={lgReverseCol}
										onChange={() =>
											setAttributes({
												lgReverseCol: !lgReverseCol,
											})
										}
									/>
									<Button
										onClick={() =>
											setAttributes({
												lgReverseCol: false,
											})
										}
										label={__('Reset', 'gbblocks')}
										className="components-button components-range-control__reset is-secondary is-small"
									>
										{__('Reset', 'gbblocks')}
									</Button>
								</>
							)}
							{rowResponsiveMode == 'md' && (
								<>
									<ToggleControl
										label={__(
											'Reverse Columns',
											'gbblocks'
										)}
										checked={mdReverseCol}
										onChange={() =>
											setAttributes({
												mdReverseCol: !mdReverseCol,
											})
										}
									/>
									<Button
										onClick={() =>
											setAttributes({
												mdReverseCol: false,
											})
										}
										label={__('Reset', 'gbblocks')}
										className="components-button components-range-control__reset is-secondary is-small"
									>
										{__('Reset', 'gbblocks')}
									</Button>
								</>
							)}
							{rowResponsiveMode == 'sm' && (
								<>
									<ToggleControl
										label={__(
											'Reverse Columns',
											'gbblocks'
										)}
										checked={smReverseCol}
										onChange={() =>
											setAttributes({
												smReverseCol: !smReverseCol,
											})
										}
									/>
									<Button
										onClick={() =>
											setAttributes({
												smReverseCol: false,
											})
										}
										label={__('Reset', 'gbblocks')}
										className="components-button components-range-control__reset is-secondary is-small"
									>
										{__('Reset', 'gbblocks')}
									</Button>
								</>
							)}
							{rowResponsiveMode == 'xs' && (
								<>
									<ToggleControl
										label={__(
											'Reverse Columns',
											'gbblocks'
										)}
										checked={xsReverseCol}
										onChange={() =>
											setAttributes({
												xsReverseCol: !xsReverseCol,
											})
										}
									/>
									<Button
										onClick={() =>
											setAttributes({
												xsReverseCol: false,
											})
										}
										label={__('Reset', 'gbblocks')}
										className="components-button components-range-control__reset is-secondary is-small"
									>
										{__('Reset', 'gbblocks')}
									</Button>
								</>
							)}
						</div>
						<span className="block-seprator"></span>
						<label className="block--label">Column - Height</label>
						<ToggleControl
							label={__('Same Height', 'gbblocks')}
							checked={colheight}
							onChange={() =>
								setAttributes({
									colheight: !colheight,
								})
							}
						/>
						<label className="block--label">Content - Width</label>
						<ToggleControl
							label={__('Limited Width', 'gbblocks')}
							checked={contentwidth}
							onChange={() =>
								setAttributes({
									contentwidth: !contentwidth,
								})
							}
						/>
						<ToggleGroupControl
							label={__('Column Gap', 'gbblocks')}
							className="block-togglegroup"
							value={colgap}
							isBlock
							onChange={(value) => {
								setAttributes({
									colgap: Number(value),
								});
							}}
						>
							<ToggleGroupControlOption
								value="0"
								label={__('0', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Small', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="1"
								label={__('1', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Medium', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="2"
								label={__('2', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Large', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="3"
								label={__('3', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Extra Large', 'gbblocks')}
							/>
						</ToggleGroupControl>
					</PanelBody>
					<PanelBody
						title={__('Advanced', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Anchor', 'gbblocks')}
							placeholder={__('Specify ID…', 'gbblocks')}
							type="text"
							value={anchor}
							onChange={(value) =>
								setAttributes({ anchor: value })
							}
						/>
						<TextControl
							label={__('Class', 'gbblocks')}
							placeholder={__('Specify Class…', 'gbblocks')}
							type="text"
							value={rowExtraClass}
							onChange={(value) =>
								setAttributes({ rowExtraClass: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	}
}
