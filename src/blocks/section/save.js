/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				backgroundColorClass,
				backgroundAlt,
				topPadding,
				bottomPadding,
				anchor,
				xlbackgroundImagesrc,
				webpImageUrl,
				mdbackgroundImagesrc,
				webpmdImageUrl,
				xsbackgroundImagesrc,
				webpxsImageUrl,
				xlbackgroundImageId,
				mdbackgroundImageId,
				xsbackgroundImageId,
				hideLG,
				hideMD,
				hideXS,
				extraClass,
			},
		} = this.props;

		const bgclass = backgroundColorClass
			? `section--bg-${backgroundColorClass}`
			: "";

		let hideSection = "";
		if (hideLG == true) {
			hideSection += " section--lg-hide";
		}
		if (hideMD == true) {
			hideSection += " section--md-hide";
		}
		if (hideXS == true) {
			hideSection += " section--xs-hide";
		}

		return (
			<section
				id={anchor ? anchor : null}
				className={`section section--pd-top-${topPadding} section--pd-bottom-${bottomPadding}${hideSection} ${bgclass} ${extraClass}`}
			>
				{(xlbackgroundImageId ||
					mdbackgroundImageId ||
					xsbackgroundImageId) && (
					<div className="section__background">
						<picture>
							{/* Desktop Image rendering */}
							{xlbackgroundImagesrc ? (
								<>
									{webpImageUrl ? (
										<source
											media="(min-width:1025px)"
											srcset={`${webpImageUrl}`}
											type="image/webp"
										/>
									) : (
										""
									)}
									<source
										media="(min-width:1025px)"
										srcset={`${xlbackgroundImagesrc}`}
									/>
								</>
							) : (
								<>
									{mdbackgroundImagesrc ? (
										<>
											{webpmdImageUrl ? (
												<source
													media="(min-width:1025px)"
													srcset={`${webpmdImageUrl}`}
													type="image/webp"
												/>
											) : (
												""
											)}
											<source
												media="(min-width:1025px)"
												srcset={`${mdbackgroundImagesrc}`}
											/>
										</>
									) : (
										<>
											{webpxsImageUrl ? (
												<source
													media="(min-width:1025px)"
													srcset={`${webpxsImageUrl}`}
													type="image/webp"
												/>
											) : (
												""
											)}
											<source
												media="(min-width:1025px)"
												srcset={`${xsbackgroundImagesrc}`}
											/>
										</>
									)}
								</>
							)}
							{/* Tablet Image Rendering */}
							{mdbackgroundImagesrc ? (
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
									<source
										media="(min-width:481px)"
										srcset={`${mdbackgroundImagesrc}`}
									/>
								</>
							) : (
								<>
									{xlbackgroundImagesrc ? (
										<>
											{webpImageUrl ? (
												<source
													media="(min-width:481px)"
													srcset={`${webpImageUrl}`}
													type="image/webp"
												/>
											) : (
												""
											)}
											<source
												media="(min-width:481px)"
												srcset={`${xlbackgroundImagesrc}`}
											/>
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
											<source
												media="(min-width:481px)"
												srcset={`${xsbackgroundImagesrc}`}
											/>
										</>
									)}
								</>
							)}
							{/* Mobile Image Rendering */}
							{xsbackgroundImagesrc ? (
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
									<source
										media="(max-width:480px)"
										srcset={`${xsbackgroundImagesrc}`}
									/>
								</>
							) : (
								<>
									{mdbackgroundImagesrc ? (
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
											<source
												media="(max-width:480px)"
												srcset={`${mdbackgroundImagesrc}`}
											/>
										</>
									) : (
										<>
											{webpImageUrl ? (
												<source
													media="(max-width:480px)"
													srcset={`${webpImageUrl}`}
													type="image/webp"
												/>
											) : (
												""
											)}
											<source
												media="(max-width:480px)"
												srcset={`${xlbackgroundImagesrc}`}
											/>
										</>
									)}
								</>
							)}
							{xlbackgroundImagesrc ? (
								<img
									src={`${xlbackgroundImagesrc}`}
									alt={`${backgroundAlt}`}
									width="auto"
									height="auto"
								/>
							) : !xlbackgroundImagesrc && mdbackgroundImagesrc ? (
								<img
									src={`${mdbackgroundImagesrc}`}
									alt={`${backgroundAlt}`}
									width="auto"
									height="auto"
								/>
							) : !xlbackgroundImagesrc &&
							  !mdbackgroundImagesrc &&
							  xsbackgroundImagesrc ? (
								<img
									src={`${xsbackgroundImagesrc}`}
									alt={`${backgroundAlt}`}
									width="auto"
									height="auto"
								/>
							) : (
								""
							)}
						</picture>
					</div>
				)}
				<div className={`section__content`}>
					<InnerBlocks.Content />
				</div>
			</section>
		);
	}
}
