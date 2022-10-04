/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import { stack } from '../../../utils/block-icons';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: stack,
	edit: (props) => {
		return <div {...useBlockProps()}>{<Edit {...props} />}</div>;
	},
	save: (props) => {
		const { ButtonLink } = props.attributes;
		return (
			<div className="splide__slide">
				<InnerBlocks.Content />
				<a
					href={ButtonLink}
					target="_blank"
					rel="noopener"
					class="button--text button--cta button--style-one button--width-inline button--color-one  button--align-xs-left"
				>
					Directions
				</a>
			</div>
		);
	},
};
