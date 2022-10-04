/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";

export default class Save extends Component {
	render() {
		const { innerItem, anchor } = this.props.attributes;
		return (
			<div id={anchor ? anchor : null} className="timelines">
				<div className="timeline--wrapper">
					<div className="splide timeline_slider">
						<div className="splide__track">
							<div className="splide__list">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
					<div className="splide timeline__nav">
						<div class="splide__arrows">
							<button class="splide__arrow splide__arrow--prev">
								<span className="nav--arrow is--left"></span>
							</button>
							<button class="splide__arrow splide__arrow--next">
								<span className="nav--arrow is--right"></span>
							</button>
						</div>
						<div className="splide__track">
							<div className="splide__list">
								{innerItem && (
									<>
										{innerItem.map((item, index) => {
											return (
												<div
													data-index={index}
													className={
														"timeline__year splide__slide timeline__nav-slide"
													}
												>
													{item.attributes.year}
												</div>
											);
										})}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
