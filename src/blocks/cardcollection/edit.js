/**
 * External dependencies
 */

import classnames from 'classnames';

/**
 * Wordpress dependencies
 */

import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	RangeControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function edit({ clientId, attributes, setAttributes }) {
	const {
		anchor,
		extraClass,
		responsiveMode,
		xsColumnCount,
		smColumnCount,
		mdColumnCount,
		lgColumnCount,
		xlColumnCount,
	} = attributes;

	const blockProps = useBlockProps();
	const ALLOWED_BLOCKS = ['gbblocks/card'];

	const { hasInnerBlocks } = useSelect(
		(select) => {
			const { getBlock, getSettings } = select(blockEditorStore);
			const block = getBlock(clientId);
			return {
				hasInnerBlocks: !!(block && block.innerBlocks.length),
			};
		},
		[clientId]
	);

	const renderappender = hasInnerBlocks
		? undefined
		: () => <InnerBlocks.ButtonBlockAppender />;

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'row row--gap-1',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			renderAppender: renderappender,
		}
	);
	const resMode = ['xs', 'sm', 'md', 'lg', 'xl'];

	const columnSettings = {
		xs: {
			count: xsColumnCount,
		},
		sm: {
			count: smColumnCount,
		},
		md: {
			count: mdColumnCount,
		},
		lg: {
			count: lgColumnCount,
		},
		xl: {
			count: xlColumnCount,
		},
	};
	const onChangeCount = (value) => {
		if (responsiveMode == 'xl') {
			setAttributes({
				xlColumnCount: value !== undefined ? value : 0,
			});
		}
		if (responsiveMode == 'lg') {
			setAttributes({
				lgColumnCount: value !== undefined ? value : 0,
			});
		}
		if (responsiveMode == 'md') {
			setAttributes({
				mdColumnCount: value !== undefined ? value : 0,
			});
		}
		if (responsiveMode == 'sm') {
			setAttributes({
				smColumnCount: value !== undefined ? value : 0,
			});
		}
		if (responsiveMode == 'xs') {
			setAttributes({
				xsColumnCount: value !== undefined ? value : 0,
			});
		}
	};

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'gbblocks')}
					initialOpen={true}
				>
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
								let colCount = columnSettings[item]['count'];
								return (
									<div
										className="col-control-wrap"
										id={`col-${index}`}
									>
										{responsiveMode == item ? (
											<>
												<RangeControl
													label={__(
														'Column Count',
														'gbblocks'
													)}
													value={colCount}
													onChange={onChangeCount}
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
					title={__('Additional', 'gbblocks')}
					initialOpen={true}
				>
					<TextControl
						label={__('Anchor', 'gbblocks')}
						placeholder={__('Specify Id…', 'gbblocks')}
						type="text"
						value={anchor}
						onChange={(value) => setAttributes({ anchor: value })}
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
					'row-wrapper container card--row',
					extraClass ? extraClass : null
				)}
			>
				<div {...innerBlocksProps}></div>
			</div>
		</div>
	);
}
