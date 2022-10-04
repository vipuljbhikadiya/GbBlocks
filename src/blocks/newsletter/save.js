/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InnerBlocks } from "@wordpress/block-editor";
import { Component } from "@wordpress/element";

/**
 * External Dependencies
 */
import classnames from "classnames";

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
					`row-wrapper newsletter`,
					"" !== extraClass ? `${extraClass}` : null
				)}
			>
				<div class="row row--xs-center row--gap-0">
					<div class="col col--xs-10">
						<div class="col__content">
							<div class="newsletter">
								<div className="newsletter__background">
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
														""
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
														""
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
														""
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
														""
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
														""
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
														""
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
														""
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
														""
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
														""
													)}
													<source
														media="(max-width:480px)"
														srcset={`${xlImageSrc}`}
													/>
												</>
											)}
											<img src={`${xlImageSrc}`} alt={`${bgAlt}`} />
										</picture>
									)}
								</div>
								<div className="newsletter__content">
									<div className="nl--form--title">
										{__("„Stay in the loop“", "gbblocks")}
									</div>
									<div className="nl--form--info">
										{__("Sign up now for our newsletter", "gbblocks")}
									</div>
									<form id="newsletter__form" method="post">
										<div className="form--control feild--email">
											<input type="hidden" name="subscription_time" />
											<input
												name="subscriber_email"
												type="email"
												id="subscriber_email"
												class="hide-robot"
											/>
											<input
												type="email"
												className="field"
												data-label={__("Email", "gbblocks")}
												name="your-email"
												id="your-email"
												placeholder="E-Mail-Adresse"
												required
											/>
											<span className="validation--feedback"></span>
										</div>
										<div className="form--control feild--acceptance">
											<input
												type="checkbox"
												className="field"
												data-label={__("Privicy", "gbblocks")}
												name="acceptance"
												id="acceptance"
												required
											/>
											<label for="acceptance">
												{__(
													"Yes, I have read the data protection declaration and agree that the data I have provided will be collected and stored electronically.",
													"gbblocks"
												)}
											</label>
											<span className="validation--feedback"></span>
										</div>
										<div className="form--control feild--submit">
											<button type="submit" className="newsletter--btn">
												{__("register", "gbblocks")}
											</button>
											<div className="submission--error d-none"></div>
										</div>
									</form>
									<div className="form--feedback d-none">
										{__(
											"Thankyou for being intrested in our newsletter. you will receive a mail with further informations shortly.",
											"gbblocks"
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
