/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import colClasses from './colClasses';
import { stack } from '../../utils/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: stack,
	/**
	 * @see ./edit.js
	 */
	edit: (props) => {
		const ALLOWED_BLOCKS = [
			'gbblocks/button',
			'gbblocks/headline',
			'gbblocks/paragraph',
			'gbblocks/list',
			'gbblocks/icontext',
		];

		const bgclass = props.attributes.colbgClass
			? `col--bg-${props.attributes.colbgClass}`
			: '';

		const { getBlockOrder } = useSelect((select) => {
			return select('core/block-editor') || select('core/editor');
		});

		props.hasChildBlocks = getBlockOrder(props.clientId).length;

		const renderappender = props.hasChildBlocks
			? undefined
			: () => <InnerBlocks.ButtonBlockAppender />;
		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'col__content' },
			{ allowedBlocks: ALLOWED_BLOCKS, renderAppender: renderappender }
		);

		const blockProps = useBlockProps({
			className: classnames(
				`col`,
				...colClasses(props.attributes),
				'' !== bgclass ? `${bgclass}` : null
			),
		});
		return (
			<div {...blockProps}>
				<Edit {...props} />
				<div
					id={
						props.attributes.anchor
							? `${props.attributes.anchor}`
							: null
					}
					{...innerBlocksProps}
				/>
			</div>
		);
	},
	save: (props) => {
		return <Save {...props} />;
	},
};
