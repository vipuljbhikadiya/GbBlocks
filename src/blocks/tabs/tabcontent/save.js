/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		return (
			<div className="splide__slide tab--content">
				<div className="tab--detail">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
}
