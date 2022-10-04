/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	Spinner,
	Button,
	ResponsiveWrapper,
} from '@wordpress/components';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';

/**
 * External dependencies
 */
import classnames from 'classnames';

/***
 * Interal dependencies
 */
import { IconPlay } from '../../utils/block-icons';
import PlaceholderImg from '../../assets/images/placeholder.jpg';

class Edit extends Component {
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
				imageId,
				altText,
				youTubeId,
				showdesc,
				anchor,
				extraClass,
				iframeId,
			},
			setAttributes,
			VideoImage,
			clientId,
		} = this.props;

		const instructions = (
			<p>
				{__(
					'To edit the image, you need permission to upload media.',
					'gbblocks'
				)}
			</p>
		);

		const ALLOWED_MEDIA_TYPES = ['image'];

		setAttributes({
			iframeId: clientId,
		});

		const onUpdateImage = (image) => {
			setAttributes({
				imageId: image.id,
				imageUrl: image.url,
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
			});
		};

		if (VideoImage) {
			var xlwebp =
				VideoImage.source_url.substring(
					0,
					VideoImage.source_url.lastIndexOf('.') + 1
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
					webpImageUrl: '',
				});
			}

			if (VideoImage.media_details.sizes['md']) {
				var mdwebp =
					VideoImage.media_details.sizes['md'].source_url.substring(
						0,
						VideoImage.media_details.sizes[
							'md'
						].source_url.lastIndexOf('.') + 1
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
			if (VideoImage.media_details.sizes['xs']) {
				var xswebp =
					VideoImage.media_details.sizes['xs'].source_url.substring(
						0,
						VideoImage.media_details.sizes[
							'xs'
						].source_url.lastIndexOf('.') + 1
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
						title={__('Settings', 'gbblocks')}
						initialOpen={true}
					>
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title={__('Image', 'gbblocks')}
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
										{!!imageId && !VideoImage && (
											<Spinner />
										)}
										{!imageId &&
											__('Set image', 'gbblocks')}
										{!!imageId && VideoImage && (
											<ResponsiveWrapper
												naturalWidth={
													VideoImage.media_details
														.width
												}
												naturalHeight={
													VideoImage.media_details
														.height
												}
											>
												<img
													src={VideoImage.source_url}
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
						{!!imageId && VideoImage ? (
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
						<TextControl
							label={__('Youtube Id', 'gbblocks')}
							type="text"
							placeholder="Specify YouTube Id..."
							value={youTubeId}
							onChange={(value) =>
								setAttributes({ youTubeId: value })
							}
						/>
					</PanelBody>
					<PanelBody
						title={__('Style', 'gbblocks')}
						initialOpen={true}
					>
						<ToggleControl
							label={__('Show or Hide Description', 'gbblocks')}
							checked={showdesc}
							onChange={() =>
								setAttributes({
									showdesc: !showdesc,
								})
							}
						/>
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
							value={extraClass}
							onChange={(value) =>
								setAttributes({ extraClass: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
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
									data-id={`${iframeId}`}
									className="youtube__preview"
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
													<InnerBlocks
														allowedBlocks={[
															'gbblocks/paragraph',
														]}
														template={[
															[
																'gbblocks/paragraph',
																{
																	extraClass:
																		'video--text',
																	textColor:
																		'#575756',
																	textColorClass:
																		'three',
																},
															],
														]}
														renderAppender={false}
													/>
												</div>
											)}
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
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
			VideoImage: imageId ? getMedia(imageId) : null,
		};
	})
)(Edit);
