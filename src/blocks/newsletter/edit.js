/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	Spinner,
	Button,
	ResponsiveWrapper,
	PanelBody,
	TextControl,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { Component, createRef } from "@wordpress/element";
import { compose } from "@wordpress/compose";
import { withSelect } from "@wordpress/data";

/**
 * External Dependencies
 */
import classnames from "classnames";

/***
 * Interal dependencies
 */
import PlaceholderImg from "../../assets/images/placeholder.jpg";

class Edit extends Component {
	constructor(props) {
		super(...arguments);
		this.newsletterForm = createRef();
	}

	componentDidMount() {
		if (this.newsletterForm) {
			if (this.newsletterForm.current !== null) {
				const { ownerDocument } = this.newsletterForm.current;
				var hideFields = ownerDocument.querySelectorAll(".hide-robot");
				hideFields.forEach(function (field) {
					field.style.display = "none";
				});
			}
		}
	}

	render() {
		const {
			attributes: {
				anchor,
				extraClass,
				bgResponsiveMode,
				imageId,
				mdimageId,
				xsimageId,
				xlImageSrc,
				webpImageUrl,
				mdImageSrc,
				webpmdImageUrl,
				xsImageSrc,
				webpxsImageUrl,
				bgAlt,
			},
			Image,
			mdImage,
			xsImage,
			setAttributes,
		} = this.props;

		const instructions = (
			<p>
				{__(
					"To edit the background image, you need permission to upload media.",
					"gbblocks"
				)}
			</p>
		);

		const ALLOWED_MEDIA_TYPES = ["image"];

		const onUpdateImage = (image) => {
			setAttributes({
				bgAlt: image.alt,
			});
			if (bgResponsiveMode == "xl") {
				setAttributes({
					imageId: image.id,
					xlImageSrc: image?.sizes?.xl?.url ? image?.sizes?.xl?.url : image.url,
				});
				var xlwebp = "";
				if (image.sizes["xl"]) {
					xlwebp =
						image.sizes["xl"].url.substring(
							0,
							image.sizes["xl"].url.lastIndexOf(".") + 1
						) + "webp";
				} else {
					xlwebp =
						image.url.substring(0, image.url.lastIndexOf(".") + 1) + "webp";
				}
				if (xlwebp) {
					var xhr = new XMLHttpRequest();
					xhr.open("HEAD", xlwebp, false);
					xhr.send();
					if (xhr.status != "404") {
						setAttributes({
							webpImageUrl: xlwebp,
						});
					} else {
						setAttributes({
							webpImageUrl: "",
						});
					}
				} else {
					setAttributes({
						webpImageUrl: "",
					});
				}
			}

			if (bgResponsiveMode == "md") {
				setAttributes({
					mdimageId: image.id,
					mdImageSrc: image?.sizes?.md?.url ? image?.sizes?.md?.url : image.url,
				});
				var mdwebp = "";
				if (image.sizes["md"]) {
					mdwebp =
						image.sizes["md"].url.substring(
							0,
							image.sizes["md"].url.lastIndexOf(".") + 1
						) + "webp";
				} else {
					mdwebp =
						image.url.substring(0, image.url.lastIndexOf(".") + 1) + "webp";
				}
				if (mdwebp) {
					var xhr = new XMLHttpRequest();
					xhr.open("HEAD", mdwebp, false);
					xhr.send();
					if (xhr.status != "404") {
						setAttributes({
							webpmdImageUrl: mdwebp,
						});
					} else {
						setAttributes({
							webpmdImageUrl: "",
						});
					}
				} else {
					setAttributes({
						webpmdImageUrl: "",
					});
				}
			}

			if (bgResponsiveMode == "xs") {
				setAttributes({
					xsimageId: image.id,
					xsImageSrc: image?.sizes?.xs?.url ? image?.sizes?.xs?.url : image.url,
				});
				var xswebp = "";
				if (image.sizes["xs"]) {
					xswebp =
						image.sizes["xs"].url.substring(
							0,
							image.sizes["xs"].url.lastIndexOf(".") + 1
						) + "webp";
				} else {
					xswebp =
						image.url.substring(0, image.url.lastIndexOf(".") + 1) + "webp";
				}
				if (xswebp) {
					var xhr = new XMLHttpRequest();
					xhr.open("HEAD", xswebp, false);
					xhr.send();
					if (xhr.status != "404") {
						setAttributes({
							webpxsImageUrl: xswebp,
						});
					} else {
						setAttributes({
							webpxsImageUrl: "",
						});
					}
				} else {
					setAttributes({
						webpxsImageUrl: "",
					});
				}
			}
		};

		const onRemoveImage = () => {
			if (bgResponsiveMode == "xl") {
				setAttributes({
					imageId: undefined,
					xlImageSrc: "",
					webpImageUrl: "",
				});
			}
			if (bgResponsiveMode == "md") {
				setAttributes({
					mdimageId: undefined,
					mdImageSrc: "",
					webpmdImageUrl: "",
				});
			}
			if (bgResponsiveMode == "xs") {
				setAttributes({
					xsimageId: undefined,
					xsImageSrc: "",
					webpxsImageUrl: "",
				});
			}
		};

		const resMode = ["xs", "md", "xl"];

		const responsiveBgImage = {
			xs: {
				BgId: xsimageId,
				BgImage: xsImage,
			},
			md: {
				BgId: mdimageId,
				BgImage: mdImage,
			},
			xl: {
				BgId: imageId,
				BgImage: Image,
			},
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={__("General", "gbblocks")} initialOpen={true}>
						<ToggleGroupControl
							label=""
							className="responsive_buttons"
							value={bgResponsiveMode}
							isBlock
							onChange={(value) => {
								setAttributes({
									bgResponsiveMode: value,
								});
							}}
						>
							<ToggleGroupControlOption
								value="xs"
								label={__("Mobile", "gbblocks")}
								showTooltip={true}
								aria-label={__("Device (max. 768px)", "gbblocks")}
							/>
							<ToggleGroupControlOption
								value="md"
								label={__("Tablet", "gbblocks")}
								showTooltip={true}
								aria-label={__("Device (min. 768px - max. 1440px)", "gbblocks")}
							/>
							<ToggleGroupControlOption
								value="xl"
								label={__("Desktop", "gbblocks")}
								showTooltip={true}
								aria-label={__("Device > 1440px", "gbblocks")}
							/>
						</ToggleGroupControl>
						{bgResponsiveMode && (
							<div className="media-control">
								{resMode.map((item, index) => {
									return (
										<div className="media-control-wrap" id={`media-${index}`}>
											{bgResponsiveMode == item ? (
												<MediaUploadCheck fallback={instructions}>
													<MediaUpload
														title={__("Background Image", "tbblocks")}
														onSelect={onUpdateImage}
														allowedTypes={ALLOWED_MEDIA_TYPES}
														value={responsiveBgImage[item]["BgId"]}
														render={({ open }) => (
															<Button
																id={`media-imgbtn-${index}`}
																className={
																	!responsiveBgImage[item]["BgId"]
																		? "editor-post-featured-image__toggle"
																		: "editor-post-featured-image__preview"
																}
																onClick={open}
															>
																{!!responsiveBgImage[item]["BgId"] &&
																	!responsiveBgImage[item]["BgImage"] && (
																		<Spinner />
																	)}
																{!responsiveBgImage[item]["BgId"] &&
																	__("Set image", "tbblocks")}
																{!!responsiveBgImage[item]["BgId"] &&
																	responsiveBgImage[item]["BgImage"] && (
																		<ResponsiveWrapper
																			naturalWidth={
																				responsiveBgImage[item]["BgImage"]
																					.media_details.width
																			}
																			naturalHeight={
																				responsiveBgImage[item]["BgImage"]
																					.media_details.height
																			}
																		>
																			<img
																				src={
																					responsiveBgImage[item]["BgImage"]
																						.source_url
																				}
																				alt={__("Background image", "tbblocks")}
																			/>
																		</ResponsiveWrapper>
																	)}
															</Button>
														)}
													/>
												</MediaUploadCheck>
											) : (
												<></>
											)}
											{bgResponsiveMode == item &&
											!!responsiveBgImage[item]["BgId"] &&
											responsiveBgImage[item]["BgImage"] ? (
												<MediaUploadCheck>
													<MediaUpload
														title={__("Background Image", "tbblocks")}
														onSelect={onUpdateImage}
														allowedTypes={ALLOWED_MEDIA_TYPES}
														value={responsiveBgImage[item]["BgId"]}
														render={({ open }) => (
															<Button
																id={`media-replacebtn-${index}`}
																onClick={open}
																isDefault
																isLarge
																isLink
																className="block--image-attr block-section-background-image-replace"
															>
																{__("Replace background image", "tbblocks")}
															</Button>
														)}
													/>
												</MediaUploadCheck>
											) : (
												<></>
											)}
											{bgResponsiveMode == item &&
											!!responsiveBgImage[item]["BgId"] ? (
												<MediaUploadCheck>
													<Button
														id={`media-removebtn-${index}`}
														onClick={onRemoveImage}
														isLink
														isDestructive
														className="block--image-attr block-section-background-image-remove"
													>
														{__("Remove background image", "tbblocks")}
													</Button>
												</MediaUploadCheck>
											) : (
												<></>
											)}
										</div>
									);
								})}
							</div>
						)}
						<TextControl
							className="block-mt"
							label={__("Image Alt - Text", "gbblocks")}
							type="text"
							placeholder="Overwrite default Alt-Text..."
							value={bgAlt}
							onChange={(value) => setAttributes({ bgAlt: value })}
						/>
					</PanelBody>
					<PanelBody title={__("Additional", "gbblocks")} initialOpen={true}>
						<TextControl
							label={__("Anchor", "gbblocks")}
							placeholder={__("Specify Id…", "gbblocks")}
							type="text"
							value={anchor}
							onChange={(value) => setAttributes({ anchor: value })}
						/>
						<TextControl
							label={__("Class", "gbblocks")}
							placeholder={__("Specify class…", "gbblocks")}
							type="text"
							value={extraClass}
							onChange={(value) => setAttributes({ extraClass: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					id={anchor ? anchor : null}
					className={classnames(
						`row-wrapper`,
						"" !== extraClass ? `${extraClass}` : null
					)}
				>
					<div class="row row--xs-center row--gap-0">
						<div class="col col--xs-10">
							<div class="col__content">
								<div class="newsletter">
									<div className={`newsletter__background`}>
										{xlImageSrc || xsImageSrc || mdImageSrc ? (
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
										) : (
											<div className="placeholder__img">
												<img src={PlaceholderImg} alt="placeholder" />
											</div>
										)}
									</div>
									<div className="newsletter__content">
										<div className="nl--form--title">
											{__("„Stay in the loop“", "gbblocks")}
										</div>
										<div className="nl--form--info">
											{__("Sign up now for our newsletter", "gbblocks")}
										</div>
										<form
											id="newsletter__form"
											method="post"
											ref={this.newsletterForm}
										>
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
													data-label={__("Privacy", "gbblocks")}
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
			</>
		);
	}
}
export default compose(
	withSelect((select, props) => {
		const { getMedia } = select("core");
		const { imageId, mdimageId, xsimageId } = props.attributes;

		return {
			Image: imageId ? getMedia(imageId) : null,
			mdImage: mdimageId ? getMedia(mdimageId) : null,
			xsImage: xsimageId ? getMedia(xsimageId) : null,
		};
	})
)(Edit);
