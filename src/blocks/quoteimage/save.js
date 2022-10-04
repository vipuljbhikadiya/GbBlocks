/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

/**
 * External Dependencies
 */
import classnames from 'classnames';

export default class Save extends Component {
	render() {
		const {
			attributes: {
				anchor,
				extraClass,
				xlImageSrc,
				webpImageUrl,
				mdImageSrc,
				webpmdImageUrl,
				xsImageSrc,
				webpxsImageUrl,
				bgAlt,
			},
		} = this.props;

		return (
			<div
				id={anchor ? anchor : null}
				className={classnames(
					`row-wrapper row-wrapper--ct-wd quote-image`,
					'' !== extraClass ? `${extraClass}` : null
				)}
			>
				<div class="row row--xs-center row--gap-0">
					<div class="col col--xs-12">
						<div class="col__content">
							<div class="quote-image__background">
								{(xlImageSrc || mdImageSrc || xsImageSrc) && (
									<picture className={`image`}>
										{/* Desktop Image rendering */}
										{xlImageSrc ? (
											<>
												{webpImageUrl ? (
													<source
														media="(min-width:1025px)"
														srcset={`${webpImageUrl}`}
														type="image/webp"
													/>
												) : (
													''
												)}
												<source
													media="(min-width:1025px)"
													srcset={`${xlImageSrc}`}
												/>
											</>
										) : mdImageSrc ? (
											<>
												{webpmdImageUrl ? (
													<source
														media="(min-width:1025px)"
														srcset={`${webpmdImageUrl}`}
														type="image/webp"
													/>
												) : (
													''
												)}
												<source
													media="(min-width:1025px)"
													srcset={`${mdImageSrc}`}
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
													''
												)}
												<source
													media="(min-width:1025px)"
													srcset={`${xsImageSrc}`}
												/>
											</>
										)}
										{/* Tablet Image rendering */}
										{mdImageSrc ? (
											<>
												{webpmdImageUrl ? (
													<source
														media="(min-width:481px)"
														srcset={`${webpmdImageUrl}`}
														type="image/webp"
													/>
												) : (
													''
												)}
												<source
													media="(min-width:481px)"
													srcset={`${mdImageSrc}`}
												/>
											</>
										) : xlImageSrc ? (
											<>
												{webpImageUrl ? (
													<source
														media="(min-width:481px)"
														srcset={`${webpImageUrl}`}
														type="image/webp"
													/>
												) : (
													''
												)}
												<source
													media="(min-width:481px)"
													srcset={`${xlImageSrc}`}
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
													''
												)}
												<source
													media="(min-width:481px)"
													srcset={`${xsImageSrc}`}
												/>
											</>
										)}
										{/* Mobile Image rendering */}
										{xsImageSrc ? (
											<>
												{webpxsImageUrl ? (
													<source
														media="(max-width:480px)"
														srcset={`${webpxsImageUrl}`}
														type="image/webp"
													/>
												) : (
													''
												)}
												<source
													media="(max-width:480px)"
													srcset={`${xsImageSrc}`}
												/>
											</>
										) : mdImageSrc ? (
											<>
												{webpmdImageUrl ? (
													<source
														media="(max-width:480px)"
														srcset={`${webpmdImageUrl}`}
														type="image/webp"
													/>
												) : (
													''
												)}
												<source
													media="(max-width:480px)"
													srcset={`${mdImageSrc}`}
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
													''
												)}
												<source
													media="(max-width:480px)"
													srcset={`${xlImageSrc}`}
												/>
											</>
										)}
										<img
											src={`${xlImageSrc}`}
											alt={`${bgAlt}`}
										/>
									</picture>
								)}
							</div>
							<div className="quote-image__content">
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
