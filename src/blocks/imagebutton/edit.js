/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	Spinner,
	Button,
	PanelBody,
	ResponsiveWrapper,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	SelectControl,
} from '@wordpress/components';
import { Component, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import PlaceholderImg from '../../assets/images/placeholder.jpg';

class Edit extends Component {
	constructor(props) {
		super(...arguments);
		this.state = {
			isEditingURL: false,
		};
	}
	render() {
		const {
			attributes: {
				imageId,
				altText,
				imageUrl,
				webpImageUrl,
				mdimageUrl,
				webpmdImageUrl,
				xsimageUrl,
				webpxsImageUrl,
				url,
				linkTarget,
				buttonText,
				buttonPosition,
				anchor,
				imgExtraClass,
			},
			Image,
			setAttributes,
		} = this.props;

		// const [isEditingURL, setIsEditingURL] = useState(false);
		const opensInNewTab = linkTarget === '_blank';

		const unlink = () => {
			setAttributes({
				url: undefined,
				linkTarget: undefined,
			});
			this.setState({ isEditingURL: false });
		};

		const onToggleOpenInNewTab = (value) => {
			const newLinkTarget = value ? '_blank' : undefined;

			setAttributes({
				linkTarget: newLinkTarget,
			});
		};

		const instructions = (
			<p>
				{__(
					'To edit the background image, you need permission to upload media.',
					'gbblocks'
				)}
			</p>
		);

		const ALLOWED_MEDIA_TYPES = ['image'];

		const onUpdateImage = (image) => {
			setAttributes({
				imageId: image.id,
				imageUrl: image?.sizes?.xl?.url ? image?.sizes?.xl?.url : image.url , 
				mdimageUrl: image?.sizes?.md?.url,
				xsimageUrl: image?.sizes?.xs?.url,
				altText: image.alt,
			});
		};

		const onRemoveImage = () => {
			setAttributes({
				imageId: undefined,
				imageUrl: '',
				xsimageUrl: '',
				mdimageUrl: '',
				webpImageUrl: '',
				webpmdImageUrl: '',
				webpxsImageUrl: '',
			});
		};

		if (Image) {
			var mainwebp =
			Image.source_url.substring(
				0,
				Image.source_url.lastIndexOf('.') + 1
			) + 'webp';

			if (Image.media_details.sizes['xl']) {
				var xlwebp =
					Image.media_details.sizes['xl'].source_url.substring(
						0,
						Image.media_details.sizes['xl'].source_url.lastIndexOf(
							'.'
						) + 1
					) + 'webp';
					
				var xhr = new XMLHttpRequest();
				xhr.open('HEAD', xlwebp, false);
				xhr.send();
				if (xhr.status != '404') {
					setAttributes({
						webpImageUrl: xlwebp,
					});
				} else {
					setAttributes({
						webpImageUrl: mainwebp,
					});
				}
			} else {
				setAttributes({
					webpImageUrl: mainwebp,
				});
			}

			if (Image.media_details.sizes['md']) {
				var mdwebp =
					Image.media_details.sizes['md'].source_url.substring(
						0,
						Image.media_details.sizes['md'].source_url.lastIndexOf(
							'.'
						) + 1
					) + 'webp';
				var xhr = new XMLHttpRequest();
				xhr.open('HEAD', mdwebp, false);
				xhr.send();
				if (xhr.status != '404') {
					setAttributes({
						webpmdImageUrl: mdwebp,
					});
				} else {
					setAttributes({
						webpmdImageUrl: '',
					});
				}
			} else {
				setAttributes({
					webpmdImageUrl: '',
				});
			}
			if (Image.media_details.sizes['xs']) {
				var xswebp =
					Image.media_details.sizes['xs'].source_url.substring(
						0,
						Image.media_details.sizes['xs'].source_url.lastIndexOf(
							'.'
						) + 1
					) + 'webp';
				var xhr = new XMLHttpRequest();
				xhr.open('HEAD', xswebp, false);
				xhr.send();
				if (xhr.status != '404') {
					setAttributes({
						webpxsImageUrl: xswebp,
					});
				} else {
					setAttributes({
						webpxsImageUrl: '',
					});
				}
			} else {
				setAttributes({
					webpxsImageUrl: '',
				});
			}
		}

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Image Setting', 'gbblocks')}
						initialOpen={true}
					>
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title={__('Background Image', 'gbblocks')}
								onSelect={onUpdateImage}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={imageId}
								render={({ open }) => (
									<Button
										className={
											!imageId
												? 'editor-post-featured-image__toggle'
												: 'editor-post-featured-image__preview'
										}
										onClick={open}
									>
										{!!imageId && !Image && <Spinner />}
										{!imageId &&
											__('Set image', 'gbblocks')}
										{!!imageId && Image && (
											<ResponsiveWrapper
												naturalWidth={
													Image.media_details.width
												}
												naturalHeight={
													Image.media_details.height
												}
											>
												<img
													src={Image.source_url}
													alt={__(
														'Image',
														'gbblocks'
													)}
												/>
											</ResponsiveWrapper>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{!!imageId && Image ? (
							<MediaUploadCheck>
								<MediaUpload
									title={__('Image', 'gbblocks')}
									onSelect={onUpdateImage}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={imageId}
									render={({ open }) => (
										<Button
											onClick={open}
											isDefault
											isLarge
											isLink
											className="block--image-attr block-section-background-image-replace"
										>
											{__('Replace image', 'gbblocks')}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						) : (
							<></>
						)}
						{!!imageId ? (
							<MediaUploadCheck>
								<Button
									onClick={onRemoveImage}
									isLink
									isDestructive
									className="block--image-attr block-section-background-image-remove"
								>
									{__('Remove image', 'gbblocks')}
								</Button>
							</MediaUploadCheck>
						) : (
							<></>
						)}
						<TextControl
							className="block-mt"
							label={__('Image Alt - Text', 'gbblocks')}
							type="text"
							placeholder="Overwrite default Alt-Text..."
							value={altText}
							onChange={(value) =>
								setAttributes({ altText: value })
							}
						/>
					</PanelBody>
					<PanelBody
						title={__('Setting', 'gbblocks')}
						initialOpen={true}
					>
						<SelectControl
							label={__('Position', 'gbblocks')}
							options={[
								{
									value: 'left',
									label: __('Left', 'gbblocks'),
								},
								{
									value: 'right',
									label: __('Right', 'gbblocks'),
								},
							]}
							value={buttonPosition}
							onChange={(value) =>
								setAttributes({ buttonPosition: value })
							}
						></SelectControl>
						<TextControl
							label={__('Button Text', 'gbblocks')}
							type="text"
							placeholder="Button Text..."
							value={buttonText}
							onChange={(value) =>
								setAttributes({ buttonText: value })
							}
						/>
						<div className="gb--link-control">
							<LinkControl
								className="wp-block-navigation-link__inline-link-input"
								value={{ url, opensInNewTab }}
								onChange={({
									url: newURL = '',
									opensInNewTab: newOpensInNewTab,
								}) => {
									setAttributes({ url: newURL });

									if (opensInNewTab !== newOpensInNewTab) {
										onToggleOpenInNewTab(newOpensInNewTab);
									}
								}}
								onRemove={() => {
									unlink();
								}}
								forceIsEditingLink={this.state.isEditingURL}
							/>
						</div>
					</PanelBody>
					<PanelBody
						title={__('Additional', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Anchor', 'gbblocks')}
							placeholder={__('Specify Id…', 'gbblocks')}
							type="text"
							value={anchor}
							onChange={(value) =>
								setAttributes({ anchor: value })
							}
						/>
						<TextControl
							label={__('Class', 'gbblocks')}
							placeholder={__('Specify class…', 'gbblocks')}
							type="text"
							value={imgExtraClass}
							onChange={(value) =>
								setAttributes({ imgExtraClass: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					id={anchor ? anchor : null}
					className={classnames(
						`image image--style-one image--btn`,
						buttonPosition ? `image--btn-${buttonPosition}` : '',
						imgExtraClass ? imgExtraClass : ''
					)}
				>
					{!imageUrl ? (
						<div className="placeholder__img">
							<img src={PlaceholderImg} alt="placeholder" />
						</div>
					) : imageUrl || xsimageUrl || mdimageUrl ? (
						<>
							<picture className={`image__content`}>
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
						</>
					) : (
						<></>
					)}
					{undefined == url || '' == url ? (
						<div className={`image--btn-link`}>
							<span className="image--btn-link__text">
								{buttonText}
							</span>
						</div>
					) : (
						<a
							href={url}
							rel={linkTarget ? 'noopener' : null}
							target={linkTarget ? linkTarget : null}
							className={`image--btn-link`}
						>
							<span className="image--btn-link__text">
								{buttonText}
							</span>
						</a>
					)}
				</div>
			</>
		);
	}
}
export default compose(
	withSelect((select, props) => {
		const { getMedia } = select('core');
		const { imageId } = props.attributes;

		return {
			Image: imageId ? getMedia(imageId) : null,
		};
	})
)(Edit);
