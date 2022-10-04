/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	PanelBody,
	CustomSelectControl,
	TextControl,
} from '@wordpress/components';

import { theme_colors } from '../../utils/block-helpers';

export default function edit({ setAttributes, attributes, onReplace }) {
	const {
		listStyle,
		values,
		listColorClass,
		listColor,
		listExtraClass,
		anchor,
	} = attributes;

	const SetColorClass = (value) => {
		theme_colors.filter(function (item) {
			if (item.color == value) {
				setAttributes({
					listColorClass: item.slug,
				});
			}
		});
	};
	const colorClass = listColorClass ? `list--color-${listColorClass}` : '';

	const options = [
		{
			key: 'one',
			name: 'One',
			style: {
				fontSize: '27px',
				lineHeight: '32px',
				fontFamily: 'Barlow',
			},
		},
		{
			key: 'two',
			name: 'Two',
			style: {
				fontSize: '20px',
				lineHeight: '30px',
				fontFamily: 'Barlow',
			},
		},
		{
			key: 'three',
			name: 'Three',
			style: {
				fontSize: '18px',
				lineHeight: '28px',
				fontFamily: 'Barlow',
			},
		},
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Styles', 'gbblocks')} initialOpen={true}>
					<CustomSelectControl
						label={__('Style', 'gbblocks')}
						options={options}
						className="block--customselect"
						onChange={({ selectedItem }) =>
							setAttributes({
								listStyle: selectedItem.key,
							})
						}
						value={options.find(
							(option) => option.key === listStyle
						)}
					/>
					<PanelColorSettings
						title={__('List Color', 'gbblocks')}
						className={'block-color-setting block-color-top-0'}
						colorSettings={[
							{
								colors: theme_colors,
								value: listColor,
								onChange: (value) => {
									typeof value == 'undefined'
										? setAttributes({ listColorClass: '' })
										: SetColorClass(value);
									setAttributes({ listColor: value });
								},
								label: __('List Color', 'gbblocks'),
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
						placeholder={__('Specify Id…', 'gbblocks')}
						type="text"
						value={anchor}
						onChange={(value) => setAttributes({ anchor: value })}
					/>
					<TextControl
						label={__('Class', 'gbblocks')}
						placeholder={__('Specify class…', 'gbblocks')}
						type="text"
						value={listExtraClass}
						onChange={(value) =>
							setAttributes({ listExtraClass: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<RichText
					identifier="values"
					multiline="li"
					tagName="ul"
					id={anchor ? anchor : null}
					onChange={(nextValues) =>
						setAttributes({ values: nextValues })
					}
					value={values}
					aria-label={__('List text', 'gbblocks')}
					placeholder={__('List', 'gbblocks')}
					onReplace={onReplace}
					onRemove={() => onReplace([])}
					type="string"
					allowedFormats={['core/bold', 'core/italic', 'core/link']}
					className={`list ${listExtraClass} list--style-${listStyle} ${colorClass}`}
				></RichText>
			</div>
		</>
	);
}
