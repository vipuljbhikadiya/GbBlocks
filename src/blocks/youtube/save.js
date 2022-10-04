/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import classnames from 'classnames';

/***
 * Interal dependencies
 */
import { IconPlay } from '../../utils/block-icons';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				imageUrl,
				webpImageUrl,
				xsimageUrl,
				webpxsImageUrl,
				mdimageUrl,
				webpmdImageUrl,
				altText,
				youTubeId,
				showdesc,
				anchor,
				extraClass,
				iframeId,
			},
		} = this.props;

		return (
			<div
				id={anchor ? `${anchor}` : null}
				className={classnames(
					`row-wrapper`,
					extraClass ? extraClass : ''
				)}
			>
				<div class="row  row--xs-center row--gap-0">
					<div class="col col--xs-10 col--pd-0">
						<div class="youtube">
							<a
								href="#"
								id={anchor ? `${anchor}` : null}
								className={classnames(
									`youtube__preview`,
									extraClass ? extraClass : ''
								)}
								data-id={`${iframeId}`}
								data-youtubeid={youTubeId}
							>
								{imageUrl || xsimageUrl || mdimageUrl ? (
									<picture
										className={`youtube__preview-image-helper`}
									>
										{imageUrl ? (
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
													srcset={`${imageUrl}`}
												/>
											</>
										) : mdimageUrl ? (
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
													srcset={`${mdimageUrl}`}
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
													srcset={`${xsimageUrl}`}
												/>
											</>
										)}
										{mdimageUrl ? (
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
													srcset={`${mdimageUrl}`}
												/>
											</>
										) : imageUrl ? (
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
													srcset={`${imageUrl}`}
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
													''
												)}
												<source
													media="(max-width:480px)"
													srcset={`${xsimageUrl}`}
												/>
											</>
										) : mdimageUrl ? (
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
													srcset={`${mdimageUrl}`}
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
													srcset={`${imageUrl}`}
												/>
											</>
										)}
										<img
											src={`${imageUrl}`}
											alt={`${altText}`}
										/>
									</picture>
								) : (
									<div className="placeholder__img">
										<img
											src={PlaceholderImg}
											alt="placeholder"
										/>
									</div>
								)}
								<div class="youtube__preview-content-helper">
									<div class="youtube__preview-content">
										<div class="youtube__preview-icon">
											<IconPlay />
										</div>
										{showdesc == true && (
											<div class="youtube__preview-text">
												<InnerBlocks.Content />
											</div>
										)}
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
