/**
 * WordPress dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

const path = require('path');
const fs = require('fs');

const scripts = ['gbblocks-main'];

const gbblocksEntries = fs
	.readdirSync(path.resolve(process.cwd(), 'src'))
	.filter((file) => file.startsWith('blocks-'));

const gbblocksChunks = gbblocksEntries.reduce(
	(a, file) => ({
		...a,
		['gb' + file.replace('.js', '')]: path.resolve(
			process.cwd(),
			`src/${file}`
		),
	}),
	{}
);

module.exports = {
	...defaultConfig,
	entry: {
		...gbblocksChunks,

		...scripts.reduce((memo, script) => {
			memo[`js/${script}`] = path.resolve(
				process.cwd(),
				'src',
				'js',
				`${script}.js`
			);
			return memo;
		}, {}),
	},

	output: {
		...defaultConfig.output,
		path: path.resolve(process.cwd(), 'dist/'),
		publicPath: 'auto',
	},
};
