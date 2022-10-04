/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
// import './styles/style.scss';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { stack } from '../../utils/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
	attributes: {
		ItemArrays: {
			type: 'string',
			default: '["Accordion 1"]',
		},
		itemCount: {
			type: 'number',
			default: 1,
		},
		anchor: {
			type: 'string',
			default: '',
		},
		accordionExtraClass: {
			type: 'string',
			default: '',
		},
	},
	icon: stack,
	/**
	 * @see ./edit.js
	 */
	edit: (props) => {
		return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
	},
	save: (props) => {
		return <Save {...props} />;
	},
};
