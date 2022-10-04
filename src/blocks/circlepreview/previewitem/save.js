/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from "classnames";

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				iconClass,
				altText,
				imageUrl,
				mdimageUrl,
				webpmdImageUrl,
				xsimageUrl,
				webpxsImageUrl,
				headline,
			},
		} = this.props;

		return (
			<>
				<div
					class="tab-pane fade"
					id={headline
						.replace(/[^a-zA-Z ]/g, "")
						.split(" ")
						.join("")}
					role="tabpanel"
					aria-labelledby={
						headline
							.replace(/[^a-zA-Z ]/g, "")
							.split(" ")
							.join("") + `-tab`
					}
				>
					{(mdimageUrl || xsimageUrl) && (
						<picture className={`cpreview--image__content`}>
							{/* Tablet Image rendering */}
							{mdimageUrl ? (
								<>
									{webpmdImageUrl ? (
										<source
											media="(min-width:481px)"
											srcset={`${webpmdImageUrl}`}
											type="image/webp"
										/>
									) : (
										""
									)}
									<source media="(min-width:481px)" srcset={`${mdimageUrl}`} />
								</>
							) : (
								<>
									{webpxsImageUrl ? (
										<source
											media="(min-width:481px)"
											srcset={`${webpxsImageUrl}`}
											type="image/webp"
										/>
									) : (
										""
									)}
									<source media="(min-width:481px)" srcset={`${xsimageUrl}`} />
								</>
							)}
							{/* Mobile Image rendering */}
							{xsimageUrl ? (
								<>
									{webpxsImageUrl ? (
										<source
											media="(max-width:480px)"
											srcset={`${webpxsImageUrl}`}
											type="image/webp"
										/>
									) : (
										""
									)}
									<source media="(max-width:480px)" srcset={`${xsimageUrl}`} />
								</>
							) : (
								<>
									{webpmdImageUrl ? (
										<source
											media="(max-width:480px)"
											srcset={`${webpmdImageUrl}`}
											type="image/webp"
										/>
									) : (
										""
									)}
									<source media="(max-width:480px)" srcset={`${mdimageUrl}`} />
								</>
							)}
							<img src={`${imageUrl}`} alt={`${altText}`} />
						</picture>
					)}
					<span className="tab--icon icon icon icon--bgcolor-four icon--color-six">
						<i className={classnames(iconClass ? iconClass : "")}></i>
					</span>
				</div>
			</>
		);
	}
}
