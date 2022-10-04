/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { setCategories, registerBlockCollection } from '@wordpress/blocks';

/**
 * Internal dependencies
 */

import { supportsCollections } from './block-helpers';

/**
 * Function to register a block collection for our blocks.
 */
if (supportsCollections()) {
	registerBlockCollection('gbblocks', {
		title: 'GbBlocks',
	});
} else {
	categories.unshift({
		slug: 'gbblocks',
		title: 'GbBlocks',
	});
}

setCategories(categories);
