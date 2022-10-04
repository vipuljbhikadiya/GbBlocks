/**
 * External dependencies
 */
import MapImage from '../../assets/images/europe-map-dotted-white.png';
import { Marker } from '../../utils/block-icons';
import { QuoteIconWhiteSm } from '../../utils/block-icons';
import { isEmpty } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Create an Component
 */
export default class Save extends Component {
	render() {
		const { innerItem, anchor, extraClass } = this.props.attributes;

		return (
			<div
				id={anchor ? anchor : null}
				className={classnames(
					'location--map-slider container',
					extraClass ? extraClass : ''
				)}
			>
				<div className="locationmap--wrapper">
					<div className="map--navigations">
						{innerItem && (
							<>
								<div className={`location--markers`}>
									<img src={MapImage} alt="epea map" />
									{innerItem.map((item, index) => {
										let style = {};
										if (!isEmpty(item)) {
											style = {
												left:
													item.attributes
														.markerXPosition + '%',
												top:
													item.attributes
														.markerYPosition + '%',
											};
										}
										return (
											<div
												data-index={index}
												data-id={'marker--' + index}
												className={
													'marker' +
													(index === 0
														? ' active'
														: '')
												}
												style={style}
											>
												<Marker />
											</div>
										);
									})}
								</div>
							</>
						)}
					</div>
					<div className="locations">
						<div className="location--heading">
							<h6 className="headline headline--align-xs-left headline--style-seven headline--color-one">
								<span className="location--block-icon">
									<QuoteIconWhiteSm />
								</span>
								{__('Contact Details', 'gbblocks')}
							</h6>
						</div>
						<div className="splide location__slider">
							<div class="splide__track">
								<div className="splide__list">
									<InnerBlocks.Content />
								</div>
							</div>
							<div class="splide__arrows">
								<button class="splide__arrow splide__arrow--prev">
									<span className="nav--arrow is--left"></span>
								</button>
								<button class="splide__arrow splide__arrow--next">
									<span className="nav--arrow is--right"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
