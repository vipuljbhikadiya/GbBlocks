/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * External dependencies
 */
import classnames from 'classnames';

export default function edit({ setAttributes, attributes }) {
	const { circleHeadline, circleText, anchor, extraClass } = attributes;

	const blockProps = useBlockProps({
		className: 'visual--circle',
	});
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Settings', 'gbblocks')}
					initialOpen={true}
				>
					<TextControl
						label={__('Circle Headline', 'gbblocks')}
						type="text"
						placeholder="200.000"
						value={circleHeadline}
						onChange={(value) =>
							setAttributes({ circleHeadline: value })
						}
					/>
					<TextControl
						label={__('Circle Text', 'gbblocks')}
						type="text"
						placeholder="assessed products"
						value={circleText}
						onChange={(value) =>
							setAttributes({ circleText: value })
						}
					/>
				</PanelBody>
			</InspectorControls>
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

			<li {...blockProps}>
				<span className="circle--title">{circleHeadline}</span>
				<span className="circle--text">{circleText}</span>
			</li>
		</>
	);
}
