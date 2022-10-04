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
		const {
			attributes: { bottomPadding, anchor, hideLG, hideMD, hideXS },
		} = this.props;

		let hideSection = '';
		if (hideLG == true) {
			hideSection += ' section--lg-hide';
		}
		if (hideMD == true) {
			hideSection += ' section--md-hide';
		}
		if (hideXS == true) {
			hideSection += ' section--xs-hide';
		}

		return (
			<section
				id={anchor ? anchor : null}
				className={`section section--hero section--hero-main section--pd-bottom-${bottomPadding}${hideSection}`}
			>
				<div className="section__content section--hero-main__wrap">
					<InnerBlocks.Content />
				</div>
			</section>
		);
	}
}
