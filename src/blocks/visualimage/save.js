/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

/**
 * External dependencies
 */
import classnames from 'classnames';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				altText,
				imageUrl,
				webpImageUrl,
				mdimageUrl,
				webpmdImageUrl,
				xsimageUrl,
				webpxsImageUrl,
				anchor,
				extraClass,
			},
		} = this.props;

		return (
			<>
				{(imageUrl || mdimageUrl || xsimageUrl) && (
					<div
						id={anchor ? anchor : null}
						className={classnames(
							`visual--image`,
							extraClass ? extraClass : ''
						)}
					>
						<div className="visual--image-helper"></div>
						<picture className={`visual--image__content`}>
							{/* Desktop Image rendering */}
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
							<img src={`${imageUrl}`} alt={`${altText}`} />
						</picture>
					</div>
				)}
			</>
		);
	}
}
