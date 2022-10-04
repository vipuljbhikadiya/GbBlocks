/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				imageAlt,
				imageUrl,
				webpImageUrl,
				mdimageUrl,
				webpmdImageUrl,
				xsimageUrl,
				webpxsImageUrl,
				content,
				url,
				linkTarget,
			},
		} = this.props;

		const innerContent = () => {
			return (
				<>
					{(imageUrl || mdimageUrl || xsimageUrl) && (
						<div className="image">
							<picture className={`image__content`}>
								
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
								) : (
									''
								)}
								<img src={`${imageUrl}`} alt={`${imageAlt}`} />
							</picture>
						</div>
					)}
					<h6 className="headline headline--align-xs-left headline--style-seven headline--color-one image-overlay__title">
						<RichText.Content value={content} />
					</h6>
				</>
			);
		};

		return (
			<>
				{undefined == url ? (
					<div className="image-overlay__details">
						{innerContent()}
					</div>
				) : (
					<a
						className="image-overlay__details"
						href={undefined != url ? url : null}
						rel={linkTarget ? 'noopener' : null}
						target={
							undefined != url && linkTarget ? linkTarget : null
						}
					>
						{innerContent()}
					</a>
				)}
			</>
		);
	}
}
