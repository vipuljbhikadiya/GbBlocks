/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { QuoteIconWhiteSm } from '../../../utils/block-icons';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const { year } = this.props.attributes;
		return (
			<div className="splide__slide timeline--slide">
				<div className="timeline--detail">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
}
