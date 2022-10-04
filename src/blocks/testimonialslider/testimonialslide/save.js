/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { QuoteIconWhiteSm } from "../../../utils/block-icons";

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const { xsimageUrl, xswebpImageUrl, altText } = this.props.attributes;
		return (
			<div className="splide__slide testimonial--slide">
				<div className="image image--style-one">
					<div class="image__helper"></div>
					<picture className={`image__content`}>
						<>
							{xswebpImageUrl ? (
								<source
									media="(max-width:480px)"
									srcset={`${xswebpImageUrl}`}
									type="image/webp"
								/>
							) : (
								""
							)}
							<source media="(max-width:480px)" srcset={`${xsimageUrl}`} />
							<img src={`${xsimageUrl}`} alt={`${altText}`} />
						</>
					</picture>
					<span className="testimonial--block-icon">
						<QuoteIconWhiteSm />
					</span>
				</div>
				<div className="testimonial--detail">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
}
