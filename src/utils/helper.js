/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

// Categories Helper
import { supportsCollections } from './block-helpers';

/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 */
export const registerBlock = (block) => {
	if (!block) {
		return;
	}

	let { category } = block;
	const { name, settings } = block;

	if (!supportsCollections() && !name.includes('gallery')) {
		category = 'gbblocks';
	}

	let icon = '';
	if (!!settings?.icon) {
		icon = {
			foreground: getBlockIconColor(),
			src: settings.icon,
		};
	}

	const isV2 = block?.metadata?.apiVersion === 2;
	const v2Settings = isV2 ? block?.metadata : {};
	if (!!settings?.attributes && isV2) {
		v2Settings.attributes = {
			...v2Settings.attributes,
			...settings?.attributes,
		};
	}

	registerBlockType(name, {
		...settings,
		category,
		icon,

		// V2 Block API Upgrades
		...v2Settings,
	});
};

/**
 * Returns the color used for Icon Color in the block editor.
 */
export function getBlockIconColor() {
	return '#49725B';
}
