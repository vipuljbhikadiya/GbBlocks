/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ToggleControl,
} from '@wordpress/components';

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import headlineClasses from './headlineClasses';
import { QuoteIcon } from '../../utils/block-icons';

export default function edit({ attributes, setAttributes }) {
	const {
		anchor,
		extraClass,
		number,
		contentResponsiveMode,
		xswidth,
		smwidth,
		mdwidth,
		lgwidth,
		xlwidth,
		hideDescription,
		hideButton,
		isFullWidth,
		isHeadlineNumbered,
	} = attributes;

	let block_template = [
		[
			'gbblocks/headline',
			{
				headStyle: 'five',
				headColor: '#8ABD7D',
				headColorClass: 'four',
				level: '4',
				extraClass: 'headline--sub',
			},
		],
		[
			'gbblocks/headline',
			{
				headStyle: 'two',
				headColor: '#575756',
				headColorClass: 'three',
				level: '2',
				extraClass: 'headline--main',
			},
		],
	];
	if (hideDescription == true) {
		block_template.push([
			'gbblocks/paragraph',
			{
				textStyle: 'two',
				textColor: '#575756',
				textColorClass: 'three',
			},
		]);
	}
	if (hideButton == true) {
		block_template.push([
			'gbblocks/button',
			{
				bgcolorClass: 'four',
				bgcolor: '#8ABD7D',
				buttonicon: true,
			},
		]);
	}
	block_template.filter(function (value, index, arr) {
		if (hideDescription == false) {
			if (value[0] != 'gbblocks/paragraph') {
				return arr;
			}
		} else if (hideButton == false) {
			if (value[0] != 'gbblocks/button') {
				return arr;
			}
		}
	});

	const resMode = ['xs', 'sm', 'md', 'lg', 'xl'];

	const contentSettings = {
		xs: {
			width: xswidth,
		},
		sm: {
			width: smwidth,
		},
		md: {
			width: mdwidth,
		},
		lg: {
			width: lgwidth,
		},
		xl: {
			width: xlwidth,
		},
	};

	const onChangeWidth = (value) => {
		if (contentResponsiveMode == 'xl') {
			setAttributes({
				xlwidth: value !== undefined ? value : 0,
			});
		}
		if (contentResponsiveMode == 'lg') {
			setAttributes({
				lgwidth: value !== undefined ? value : 0,
			});
		}
		if (contentResponsiveMode == 'md') {
			setAttributes({
				mdwidth: value !== undefined ? value : 0,
			});
		}
		if (contentResponsiveMode == 'sm') {
			setAttributes({
				smwidth: value !== undefined ? value : 0,
			});
		}
		if (contentResponsiveMode == 'xs') {
			setAttributes({
				xswidth: value !== undefined ? value : 0,
			});
		}
	};

	return (
		<>
			<div {...useBlockProps()}>
				<InspectorControls>
					<PanelBody
						title={__('General', 'gbblocks')}
						initialOpen={true}
					>
						<RangeControl
							label={__('Number', 'gbblocks')}
							value={number}
							onChange={(value) =>
								setAttributes({ number: value })
							}
							min={0}
							max={15}
						/>
						<ToggleGroupControl
							label={__('Responsive Mode', 'gbblocks')}
							className="block-togglegroup"
							value={contentResponsiveMode}
							isBlock
							onChange={(value) => {
								setAttributes({
									contentResponsiveMode: value,
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
						{contentResponsiveMode && (
							<div className="col-control">
								{resMode.map((item, index) => {
									let width = contentSettings[item]['width'];
									return (
										<div
											className="col-control-wrap"
											id={`col-${index}`}
										>
											{contentResponsiveMode == item ? (
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
						title={__('Settings', 'gbblocks')}
						initialOpen={true}
					>
						<ToggleControl
							label={__('Show / Hide Description', 'gbblocks')}
							checked={hideDescription}
							onChange={() =>
								setAttributes({
									hideDescription: !hideDescription,
								})
							}
						/>
						<ToggleControl
							label={__('Show / Hide Button', 'gbblocks')}
							checked={hideButton}
							onChange={() =>
								setAttributes({
									hideButton: !hideButton,
								})
							}
						/>
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
							value={extraClass}
							onChange={(value) =>
								setAttributes({ extraClass: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					id={anchor ? anchor : null}
					className={classnames(
						`row-wrapper headline-numbered`,
						true == isFullWidth ? `row-wrapper--ct-wd` : null,
						'' !== extraClass ? `${extraClass}` : null
					)}
				>
					{isHeadlineNumbered == true && (
						<div class="row">
							<div class="col col--xs-12">
								<div class="col__content">
									<div className="headline-numbered__seprator">
										<span className="headline-numbered__bullet"></span>
									</div>
								</div>
							</div>
						</div>
					)}
					<div class="row row--xs-center row--gap-1">
						<div class="col col--xs-12 col--sm-3 col--xl-2 col--pd-0">
							<div class="col__content">
								<span
									class={classnames(
										`headline-numbered__visual`,
										0 !== number
											? `headline-numbered__number`
											: null
									)}
								>
									{number != 0 ? (
										number <= 9 ? (
											'0' + number
										) : (
											number
										)
									) : (
										<QuoteIcon />
									)}
								</span>
							</div>
						</div>
						<div
							className={classnames(
								'col col--pd-0',
								...headlineClasses(attributes)
							)}
						>
							<div class="col__content">
								<div className="headline-numbered__content">
									<InnerBlocks
										template={block_template}
										templateLock="all"
										templateInsertUpdatesSelection={true}
										allowedBlocks={[
											'gbblocks/headline',
											'gbblocks/paragraph',
											'gbblocks/button',
										]}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
