/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * External dependencies
 */
import classnames from 'classnames';

export default function edit({ setAttributes, attributes, clientId }) {
	const { anchor, extraClass } = attributes;

	const blockProps = useBlockProps();

	const ALLOWED_BLOCKS = ['gbblocks/visualcircleitem'];

	const { hasInnerBlocks } = useSelect(
		(select) => {
			const { getBlock, getSettings } = select(blockEditorStore);
			const block = getBlock(clientId);
			return {
				hasInnerBlocks: block.innerBlocks.length,
			};
		},
		[clientId]
	);

	const renderappender =
		hasInnerBlocks >= 4 ? false : () => <InnerBlocks.ButtonBlockAppender />;

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'circle--items' },
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
				id={anchor ? `${anchor}` : null}
				className={classnames(
					`visual--circle_wrapper`,
					extraClass ? extraClass : ''
				)}
			>
				<ul className="visual--bg">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				<ul {...innerBlocksProps} />
			</div>
		</div>
	);
}
