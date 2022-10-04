/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

export default function edit({ setAttributes, attributes }) {
	const { style, paddingTop, paddingBottom } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Styles', 'gbblocks')} initialOpen={true}>
					<SelectControl
						label={__('Style', 'gbblocks')}
						options={[
							{
								value: 'one',
								label: __('Green', 'gbblocks'),
							},
							{
								value: 'two',
								label: __('Line - Light Grey', 'gbblocks'),
							},
							{
								value: 'three',
								label: __('Line - Grey', 'gbblocks'),
							},
							{
								value: 'four',
								label: __('Line - Light Green', 'gbblocks'),
							},
							{
								value: 'five',
								label: __('Line - Blue', 'gbblocks'),
							},
							{
								value: 'six',
								label: __('Line - White', 'gbblocks'),
							},
						]}
						value={style}
						onChange={(value) => {
							setAttributes({
								style: value,
							});
						}}
					></SelectControl>
				</PanelBody>
				<PanelBody
					title={__('Settings', 'gbblocks')}
					initialOpen={true}
				>
					<ToggleGroupControl
						label="Spacing Top"
						className="block-togglegroup"
						value={paddingTop}
						isBlock
						onChange={(value) => {
							setAttributes({
								paddingTop: value,
							});
						}}
					>
						<ToggleGroupControlOption
							value="0"
							label="S"
							showTooltip={true}
							aria-label="Small"
						/>
						<ToggleGroupControlOption
							value="1"
							label="M"
							showTooltip={true}
							aria-label="Medium"
						/>
						<ToggleGroupControlOption
							value="2"
							label="L"
							showTooltip={true}
							aria-label="Large"
						/>
						<ToggleGroupControlOption
							value="3"
							label="Xl"
							showTooltip={true}
							aria-label="Extra Large"
						/>
					</ToggleGroupControl>
					<ToggleGroupControl
						label="Spacing Bottom"
						className="block-togglegroup"
						value={paddingBottom}
						isBlock
						onChange={(value) => {
							setAttributes({
								paddingBottom: value,
							});
						}}
					>
						<ToggleGroupControlOption
							value="0"
							label="S"
							showTooltip={true}
							aria-label="Small"
						/>
						<ToggleGroupControlOption
							value="1"
							label="M"
							showTooltip={true}
							aria-label="Medium"
						/>
						<ToggleGroupControlOption
							value="2"
							label="L"
							showTooltip={true}
							aria-label="Large"
						/>
						<ToggleGroupControlOption
							value="3"
							label="XL"
							showTooltip={true}
							aria-label="Extra Large"
						/>
					</ToggleGroupControl>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<hr
					class={`divider divider--style-${style} divider--pd-top-${paddingTop} divider--pd-bottom-${paddingBottom}`}
				/>
			</div>
		</>
	);
}
