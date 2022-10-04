/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

export default class Save extends Component {
	render() {
		return (
			<div className={`accordion__item`}>
				<InnerBlocks.Content />
			</div>
		);
	}
}
