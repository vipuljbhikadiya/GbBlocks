/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * Internal Dependencies
 */
import { EPEADefault } from "../../utils/block-icons";

export default class Save extends Component {
	render() {
		const { showHideButton, url, linkTarget, anchor } = this.props.attributes;
		return (
			<div id={anchor ? anchor : null} className="testimonials">
				<div className="splide testimonial_slider">
					<div class="splide__track">
						<div className="splide__list">
							<InnerBlocks.Content />
						</div>
					</div>
					<div className="testimonial__cta">
						{showHideButton == true && (
							<a
								href={url ? url : "#"}
								target={linkTarget ? linkTarget : null}
								rel="noopener"
								class="button--cta button--style-one button--width-inline button--color-four button--icon button--align-xs-left"
							>
								<span class="button--text">Job Offer</span>
								<span class="button--has-icon">
									<div class="icon icon icon--bgcolor-one icon--color-six">
										<div class="icon__helper"></div>
										<EPEADefault />
									</div>
								</span>
							</a>
						)}
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
		);
	}
}
