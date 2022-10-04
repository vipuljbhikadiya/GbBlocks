/**
 * WordPress dependencies
 */
import { registerBlockCollection, getCategories } from '@wordpress/blocks';

/**
 * Determine if the block attributes are empty.
 *
 * @param {Object} attributes The block attributes to check.
 * @return {boolean} The empty state of the attributes passed.
 */
export const hasEmptyAttributes = (attributes) => {
	return !Object.entries(attributes)
		.map(([, value]) => {
			if (typeof value === 'string') {
				value = value.trim();
			}

			if (value instanceof Array) {
				value = value.length;
			}

			if (value instanceof Object) {
				value = Object.entries(value).length;
			}

			return !!value;
		})
		.filter((value) => value === true).length;
};

/**
 * Return bool depending on registerBlockCollection compatibility.
 *
 * @return {boolean} Value to indicate function support.
 */
export const supportsCollections = () => {
	if (typeof registerBlockCollection === 'function') {
		return true;
	}
	return false;
};

/**
 * Check for which category to assign.
 *
 * @return {boolean} Value to indicate function support.
 */
export const hasFormattingCategory = getCategories().some(function (category) {
	return category.slug === 'formatting';
});

export const theme_colors = [
	{
		name: 'Green',
		slug: 'one',
		color: '#49725B',
	},
	{
		name: 'Extra light Gray',
		slug: 'two',
		color: '#E3E3E3',
	},
	{
		name: 'Grey',
		slug: 'three',
		color: '#575756',
	},
	{
		name: 'Light Green',
		slug: 'four',
		color: '#8ABD7D',
	},
	{
		name: 'Blue',
		slug: 'five',
		color: '#169DB8',
	},
	{
		name: 'White',
		slug: 'six',
		color: '#FFFFFF',
	},
];

export const theme_Extra_colors = [
	{
		name: 'Green',
		slug: 'one',
		color: '#49725B',
	},
	{
		name: 'Extra light Gray',
		slug: 'two',
		color: '#E3E3E3',
	},
	{
		name: 'Grey',
		slug: 'three',
		color: '#575756',
	},
	{
		name: 'Light Green',
		slug: 'four',
		color: '#8ABD7D',
	},
	{
		name: 'Blue',
		slug: 'five',
		color: '#169DB8',
	},
	{
		name: 'White',
		slug: 'six',
		color: '#FFFFFF',
	},
	{
		name: 'Black',
		slug: 'seven',
		color: '#000000',
	},
];
