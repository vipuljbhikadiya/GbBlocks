/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
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
import { stack } from '../../utils/block-icons';
import rowClasses from './rowClasses';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: stack,
	/**
	 * @see ./edit.js
	 */
	edit: (props) => {
		const rowclass = classnames(`row`, ...rowClasses(props.attributes));

		const { getBlockOrder } = useSelect((select) => {
			return select('core/block-editor') || select('core/editor');
		});

		props.hasChildBlocks = getBlockOrder(props.clientId).length;

		const renderappender = props.hasChildBlocks
			? undefined
			: () => <InnerBlocks.ButtonBlockAppender />;

		const innerBlocksProps = useInnerBlocksProps(
			{ className: rowclass },
			{
				allowedBlocks: ['gbblocks/column'],
				renderAppender: renderappender,
			}
		);

		return (
			<div
				id={
					props.attributes.anchor
						? `${props.attributes.anchor}`
						: null
				}
				{...useBlockProps({
					className: classnames(
						`row-wrapper`,
						`${props.attributes.rowExtraClass}`,
						props.attributes.contentwidth == true
							? ' row-wrapper--ct-wd'
							: '',
						`${props.attributes.extraclass}`
					),
				})}
			>
				<Edit {...props} />

				<div {...innerBlocksProps} />
			</div>
		);
	},
	save: (props) => {
		return <Save {...props} />;
	},
};
