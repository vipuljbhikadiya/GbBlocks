/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	MediaUpload,
	MediaUploadCheck,
	RichText,
	InspectorControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	Spinner,
	Button,
	PanelBody,
	ResponsiveWrapper,
	TextControl,
} from '@wordpress/components';
import { Platform, Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import PlaceholderImg from '../../../assets/images/placeholder.jpg';

class Edit extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: {
				imageId,
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
			Image,
			setAttributes,
		} = this.props;

		const opensInNewTab = linkTarget === '_blank';

		const unlink = () => {
			setAttributes({
				url: undefined,
				linkTarget: undefined,
			});
		};

		const onToggleOpenInNewTab = (value) => {
			const newLinkTarget = value ? '_blank' : undefined;

			setAttributes({
				linkTarget: newLinkTarget,
			});
		};

		const onContentChange = (value) => {
			const newContent = { content: value };
			setAttributes(newContent);
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
				imageAlt: image.alt,
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
			var xlwebp =
				Image.source_url.substring(
					0,
					Image.source_url.lastIndexOf('.') + 1
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
		const innerContent = () => {
			return (
				<>
					{!imageUrl ? (
						<div className="image placeholder__img">
							<img src={PlaceholderImg} alt="placeholder" />
						</div>
					) : (
						(imageUrl || xsimageUrl || mdimageUrl) && (
							<div className="image">
									<picture className={`image__content`}>
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
						)
					)}
					<RichText
						identifier="content"
						tagName="h6"
						className="headline headline--align-xs-left headline--style-seven headline--color-one image-overlay__title"
						value={content}
						onChange={onContentChange}
						withoutInteractiveFormatting={true}
						aria-label={__('Heading text', 'gbblocks')}
						placeholder={__('Heading', 'gbblocks')}
						{...(Platform.isNative && { deleteEnter: true })} // setup RichText on native mobile to delete the "Enter" key as it's handled by the JS/RN side
						allowedFormats={['']}
					/>
				</>
			);
		};
		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'gbblocks')}
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
							value={imageAlt}
							onChange={(value) =>
								setAttributes({ imageAlt: value })
							}
						/>
					</PanelBody>
					<PanelBody
						title={__('Link Settings', 'gbblocks')}
						initialOpen={true}
					>
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
							/>
						</div>
					</PanelBody>
				</InspectorControls>
				{undefined == url ? (
					<div className="image-overlay__details">
						{innerContent()}
					</div>
				) : (
					<a
						onClick={(e) => e.preventDefault()}
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
export default compose(
	withSelect((select, props) => {
		const { getMedia } = select('core');
		const { imageId } = props.attributes;

		return {
			Image: imageId ? getMedia(imageId) : null,
		};
	})
)(Edit);
