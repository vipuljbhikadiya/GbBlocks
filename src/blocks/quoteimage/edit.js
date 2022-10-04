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
} from "@wordpress/components";
import { Component } from "@wordpress/element";
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
	}
	render() {
		const {
			attributes: {
				anchor,
				extraClass,
				imageId,
				xlImageSrc,
				webpImageUrl,
				mdImageSrc,
				webpmdImageUrl,
				xsImageSrc,
				webpxsImageUrl,
				bgAlt,
				showButton,
			},
			Image,
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
				imageId: image.id,
				xlImageSrc: image?.sizes?.xl?.url ? image?.sizes?.xl?.url : image.url,
				mdImageSrc: image?.sizes?.md?.url,
				xsImageSrc: image?.sizes?.xs?.url,
				bgAlt: image.alt,
			});
		};

		if (Image) {
			var mainwebp =
				Image.source_url.substring(0, Image.source_url.lastIndexOf(".") + 1) +
				"webp";

			if (Image.media_details.sizes["xl"]) {
				var xlwebp =
					Image.media_details.sizes["xl"].source_url.substring(
						0,
						Image.media_details.sizes["xl"].source_url.lastIndexOf(".") + 1
					) + "webp";

				var xhr = new XMLHttpRequest();
				xhr.open("HEAD", xlwebp, false);
				xhr.send();
				if (xhr.status != "404") {
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

			if (Image.media_details.sizes["md"]) {
				var mdwebp =
					Image.media_details.sizes["md"].source_url.substring(
						0,
						Image.media_details.sizes["md"].source_url.lastIndexOf(".") + 1
					) + "webp";

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
			if (Image.media_details.sizes["xs"]) {
				var xswebp =
					Image.media_details.sizes["xs"].source_url.substring(
						0,
						Image.media_details.sizes["xs"].source_url.lastIndexOf(".") + 1
					) + "webp";
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

		const onRemoveImage = () => {
			setAttributes({
				imageId: undefined,
				xlImageSrc: "",
				webpImageUrl: "",
				xsImageSrc: "",
				webpxsImageUrl: "",
				mdImageSrc: "",
				webpmdImageUrl: "",
			});
		};

		let block_template = [
			[
				"gbblocks/icon",
				{
					iconColor: "#49725B",
					iconColorClass: "one",
					iconbgColor: "",
					iconbgColorClass: "",
					isbutton: false,
					iconClass: "fa fa-quote-left",
				},
			],
			[
				"gbblocks/headline",
				{
					headStyle: "six",
					headColor: "#575756",
					headColorClass: "three",
					level: "6",
					extraClass: "headline--quote-image",
				},
			],
		];
		if (showButton == true) {
			block_template.push([
				"gbblocks/button",
				{
					style: "one",
					bgcolorClass: "four",
					bgcolor: "#8ABD7D",
					buttonicon: false,
				},
			]);
		}
		block_template.filter(function (value, index, arr) {
			if (showButton == false) {
				if (value[0] != "gbblocks/button") {
					return arr;
				}
			}
		});

		return (
			<>
				<InspectorControls>
					<PanelBody title={__("General", "gbblocks")} initialOpen={true}>
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title={__("Background Image", "gbblocks")}
								onSelect={onUpdateImage}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={imageId}
								render={({ open }) => (
									<Button
										className={
											!imageId
												? "editor-post-featured-image__toggle"
												: "editor-post-featured-image__preview"
										}
										onClick={open}
									>
										{!!imageId && !Image && <Spinner />}
										{!imageId && __("Set image", "gbblocks")}
										{!!imageId && Image && (
											<ResponsiveWrapper
												naturalWidth={Image.media_details.width}
												naturalHeight={Image.media_details.height}
											>
												<img
													src={Image.source_url}
													alt={__("Image", "gbblocks")}
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
									title={__("Image", "gbblocks")}
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
											{__("Replace image", "gbblocks")}
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
									{__("Remove image", "gbblocks")}
								</Button>
							</MediaUploadCheck>
						) : (
							<></>
						)}
						<TextControl
							className="block-mt"
							label={__("Image Alt - Text", "gbblocks")}
							type="text"
							placeholder="Overwrite default Alt-Text..."
							value={bgAlt}
							onChange={(value) => setAttributes({ bgAlt: value })}
						/>
						<ToggleControl
							label={__("Show / Hide Button", "gbblocks")}
							checked={showButton}
							onChange={() =>
								setAttributes({
									showButton: !showButton,
								})
							}
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
						`row-wrapper row-wrapper--ct-wd quote-image`,
						"" !== extraClass ? `${extraClass}` : null
					)}
				>
					<div class="row row--xs-center row--gap-0">
						<div class="col col--xs-12">
							<div class="col__content">
								<div class="quote-image__background">
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
								<div className="quote-image__content">
									<InnerBlocks
										template={block_template}
										templateLock="all"
										templateInsertUpdatesSelection={true}
										allowedBlocks={[
											"gbblocks/icon",
											"gbblocks/headline",
											"gbblocks/button",
										]}
									/>
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
		const { imageId } = props.attributes;

		return {
			Image: imageId ? getMedia(imageId) : null,
		};
	})
)(Edit);
