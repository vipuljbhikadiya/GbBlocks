/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

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
	edit: (props) => {
		return <Edit {...props} />;
	},
	save: (props) => {
		return <Save {...props} />;
	},
};
