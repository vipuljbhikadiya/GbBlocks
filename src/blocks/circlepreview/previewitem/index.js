/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { stack } from '../../../utils/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: stack,
	/**
	 * @see ./edit.js
	 */
	edit: (props) => {
		const blockprops = useBlockProps({
			className: 'tab-pane fade',
			'data-id': props.attributes.headline
				.replace(/[^a-zA-Z ]/g, '')
				.split(' ')
				.join(''),
			'aria-labelledby':
				props.attributes.headline
					.replace(/[^a-zA-Z ]/g, '')
					.split(' ')
					.join('') + `-tab`,
		});
		return <div {...blockprops}>{<Edit {...props} />}</div>;
	},
	save: (props) => {
		return <Save {...props} />;
	},
};
