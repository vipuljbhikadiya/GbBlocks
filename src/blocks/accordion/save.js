/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		return (
			<div
				id={
					this.props.attributes.anchor
						? this.props.attributes.anchor
						: null
				}
				className={classnames(
					`accordion`,
					this.props.attributes.accordionExtraClass
						? `${this.props.attributes.accordionExtraClass}`
						: null
				)}
			>
				<InnerBlocks.Content />
			</div>
		);
	}
}
