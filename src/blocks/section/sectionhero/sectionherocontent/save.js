/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";

/**
 * internal dependencies
 */
import swipeleft from "../../../../assets/images/swipeleft.png";
import mdSwipeleft from "../../../../assets/images/mdSwipeleft.png";
import smSwipeleft from "../../../../assets/images/smSwipeleft.png";

export default function save({ attributes }) {
	const { parentAttributesData } = attributes;
	const {
		imageUrl,
		mdimageUrl,
		webpmdImageUrl,
		xsimageUrl,
		webpxsImageUrl,
		imageAlt,
	} = parentAttributesData;

	return (
		<>
			<div className="row-wrapper section--hero__content">
				<div className="row row--xs-middle row--gap-0">
					<div className="col col--xs-12 col--lg-6 col--pd-0">
						{(xsimageUrl || mdimageUrl) && (
							<div className="col__content col--hero__visual">
								<div className="col__visual">
									<picture>
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
												<source
													media="(min-width:481px)"
													srcset={`${mdimageUrl}`}
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
													srcset={`${xsimageUrl}`}
												/>
											</>
										)}
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
												<source
													media="(max-width:480px)"
													srcset={`${xsimageUrl}`}
												/>
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
												<source
													media="(max-width:480px)"
													srcset={`${mdimageUrl}`}
												/>
											</>
										)}
										<img
											src={`${imageUrl}`}
											alt={`${imageAlt}`}
											width="auto"
											height="auto"
										/>
									</picture>
								</div>
							</div>
						)}
					</div>
					<div className="col col--xs-12 col--lg-6 col--pd-0">
						<div className="col__content col--hero__content">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
				<div className="scroll-to__next">
					<span className="scroll-next__arrow">
						<div className="next__section"></div>
					</span>
				</div>
				<picture className="swipe--image">
					<source media="(min-width:1025px)" srcset={swipeleft} />
					<source media="(min-width:481px)" srcset={mdSwipeleft} />
					<source media="(max-width:480px)" srcset={smSwipeleft} />
					<img
						src={swipeleft}
						alt={`Swipe Section`}
						width="auto"
						height="auto"
					/>
				</picture>
			</div>
		</>
	);
}
