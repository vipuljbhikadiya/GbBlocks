/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * internal dependencies
 */
import swipeleft from '../../../assets/images/swipeleft.png';
import mdSwipeleft from '../../../assets/images/mdSwipeleft.png';
import smSwipeleft from '../../../assets/images/smSwipeleft.png';
import swiperight from '../../../assets/images/swiperight.png';
import mdSwiperight from '../../../assets/images/mdSwiperight.png';
import smSwiperight from '../../../assets/images/smSwiperight.png';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				topPadding,
				bottomPadding,
				orientation,
				anchor,
				hideLG,
				hideMD,
				hideXS,
			},
		} = this.props;

		const bgclass = orientation ? `section--bg-${orientation}` : '';

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
				className={`section section--pd-top-${topPadding} section--pd-bottom-${bottomPadding}${hideSection} ${bgclass}`}
			>
				<div className="section__background">
					<picture>
						<source
							media="(min-width:1025px)"
							srcset={
								orientation == 'left'
									? `${swipeleft}`
									: `${swiperight}`
							}
						/>
						<source
							media="(min-width:481px)"
							srcset={
								orientation == 'left'
									? `${mdSwipeleft}`
									: `${mdSwiperight}`
							}
						/>
						<source
							media="(max-width:480px)"
							srcset={
								orientation == 'left'
									? `${smSwipeleft}`
									: `${smSwiperight}`
							}
						/>
						<img
							src={
								orientation == 'left'
									? `${smSwipeleft}`
									: `${smSwiperight}`
							}
							alt={`Swipe Section`}
							width="auto"
							height="auto"
						/>
					</picture>
				</div>
				<div className={`section__content`}>
					<InnerBlocks.Content />
				</div>
			</section>
		);
	}
}
