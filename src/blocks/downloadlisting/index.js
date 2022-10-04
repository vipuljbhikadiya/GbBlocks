/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import { stack } from '../../utils/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: stack,
	edit,
	save: (props) => {
		return null;
	},
};
