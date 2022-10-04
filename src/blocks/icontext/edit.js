/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function edit({ attributes, setAttributes }) {
	const { anchor, extraClass } = attributes;
	const BLOCK_TEMPLATE = [
		[
			'gbblocks/icon',
			{
				iconColor: '#8ABD7D',
				iconColorClass: 'four',
				iconbgColor: '',
				iconbgColorClass: '',
				isbutton: true,
			},
		],
		[
			'gbblocks/headline',
			{
				headColor: '#49725B',
				headColorClass: 'one',
				headStyle: 'six',
				level: '4',
			},
		],
	];

	const innerBlocksProps = useInnerBlocksProps(
		{ className: `icon-text ${extraClass}` },
		{
			allowedBlocks: ['gbblocks/icon', 'gbblocks/headline'],
			template: BLOCK_TEMPLATE,
			templateLock: 'all',
		}
	);
	return (
		<>
			<div {...useBlockProps()}>
				<InspectorControls>
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
					id={anchor ? `${anchor}` : null}
					{...innerBlocksProps}
				></div>
			</div>
		</>
	);
}
