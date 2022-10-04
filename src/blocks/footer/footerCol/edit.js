/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function edit({ attributes }) {
	const { extraClass } = attributes;

	const innerBlocks = useInnerBlocksProps(
		{ className: `footer--col ${extraClass}` },
		{
			allowedBlocks: [
				'gbblocks/headline',
				'gbblocks/navigation',
				'gbblocks/button',
				'gbblocks/paragraph',
				'gbblocks/image',
				'gbblocks/divider',
			],
			renderAppender: false,
		}
	);

	return (
		<div {...useBlockProps()}>
			<div {...innerBlocks}></div>
		</div>
	);
}
