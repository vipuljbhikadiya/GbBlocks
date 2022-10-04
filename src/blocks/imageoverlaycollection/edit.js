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
import { PanelBody, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function edit({ clientId, attributes, setAttributes }) {
	const { anchor, extraClass } = attributes;

	const blockProps = useBlockProps();

	const ALLOWED_BLOCKS = ['gbblocks/imageoverlay'];

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
			className: 'image-overlay__wrapper',
		},
		{ allowedBlocks: ALLOWED_BLOCKS, renderAppender: renderappender }
	);

	return (
		<div {...blockProps}>
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
			<div
				id={anchor ? anchor : null}
				className={classnames(
					'container image-overlay__row',
					extraClass ? extraClass : null
				)}
			>
				<div {...innerBlocksProps} />
			</div>
		</div>
	);
}
