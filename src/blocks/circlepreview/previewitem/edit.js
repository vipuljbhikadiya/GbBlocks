/**
 * External dependencies
 */
import classnames from "classnames";
import { map } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	Spinner,
	Button,
	PanelBody,
	ResponsiveWrapper,
	TextControl,
	Tooltip,
} from "@wordpress/components";
import { Component } from "@wordpress/element";
import { compose } from "@wordpress/compose";
import { withSelect, withDispatch, subscribe } from "@wordpress/data";

/**
 * Internal Dependencies
 */
import PlaceholderImg from "../../../assets/images/placeholder.jpg";

let Icons = gbblocks_settings.iconset;

class Edit extends Component {
	constructor(props) {
		super(...arguments);
		this.toggle = this.toggle.bind(this);
		this.state = {
			icons: Icons,
			isOpen: false,
			keyword: "",
		};
	}
	search(keyword) {
		let filtered = [];

		map(Icons, (icon) => {
			if (icon.toLowerCase().search(keyword.toLowerCase()) !== -1) {
				filtered.push(icon);
			}
		});

		this.setState({ keyword, icons: filtered });
	}

	toggle() {
		this.setState((state) => ({
			isOpen: !state.isOpen,
		}));

		this.setState({ keyword: "", icons: Icons });

		const selection = window.getSelection();
		anchorRange = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
		//onChange( toggleFormat( value, { type: name } ) );
	}
	customResizeIcons() {
		var elements = document.getElementsByClassName("icon__visual");
		if (elements.length < 0) {
			return;
		}
		var _len = elements.length;
		for (var _i = 0; _i < _len; _i++) {
			var el = elements[_i];
			var elWidth = el.offsetWidth;
			var iconSize = elWidth * 0.9;
			var iconSizeRounded = Math.round(iconSize / 2) * 2;
			el.style.fontSize = iconSizeRounded + "px";
		}
	}
	render() {
		const {
			attributes: {
				iconClass,
				imageId,
				altText,
				imageUrl,
				mdimageUrl,
				webpmdImageUrl,
				xsimageUrl,
				webpxsImageUrl,
				headline,
				description,
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
				imageUrl: image.url,
				mdimageUrl: image?.sizes?.md?.url ? image?.sizes?.md?.url : image.url,
				xsimageUrl: image?.sizes?.xs?.url,
				altText: image.alt,
			});
		};

		const onRemoveImage = () => {
			setAttributes({
				imageId: undefined,
				imageUrl: "",
				xsimageUrl: "",
				mdimageUrl: "",
				webpmdImageUrl: "",
				webpxsImageUrl: "",
			});
		};

		if (Image) {
			var mdwebp = "";
			if (Image.media_details.sizes["md"]) {
				mdwebp =
					Image.media_details.sizes["md"].source_url.substring(
						0,
						Image.media_details.sizes["md"].source_url.lastIndexOf(".") + 1
					) + "webp";
			} else {
				mdwebp =
					Image.source_url.substring(0, Image.source_url.lastIndexOf(".") + 1) +
					"webp";
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
		const { icons, keyword } = this.state;
		return (
			<>
				<InspectorControls>
					<PanelBody title={__("Image", "gbblocks")} initialOpen={true}>
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
							value={altText}
							onChange={(value) => setAttributes({ altText: value })}
						/>
					</PanelBody>
					<PanelBody title={__("Setting", "gbblocks")} initialOpen={true}>
						<TextControl
							label={__("Tab Headline", "gbblocks")}
							placeholder={__("Lorem ipsum...", "gbblocks")}
							type="text"
							value={headline}
							onChange={(value) => setAttributes({ headline: value })}
						/>
						<TextControl
							label={__("Tab Description", "gbblocks")}
							placeholder={__("Lorem ipsum...", "gbblocks")}
							type="text"
							value={description}
							onChange={(value) => setAttributes({ description: value })}
						/>
					</PanelBody>
					<PanelBody title={__("Icon", "gbblocks")} initialOpen={true}>
						<TextControl
							value={keyword}
							placeholder={__("Search", "gbblocks")}
							onChange={(newKeyword) => {
								this.search(newKeyword);
							}}
						/>
						<div className="gbblocks-icon-panel">
							{icons.length > 0 ? (
								<ul className="gbblocks-icon-list">
									{iconClass && (
										<li data-key={iconClass} className="selectedicon">
											<Tooltip text={iconClass}>
												<Button
													isTertiary
													onClick={() => {
														setAttributes({
															iconClass: iconClass,
														});
													}}
												>
													<i className={iconClass} aria-hidden="true"></i>
												</Button>
											</Tooltip>
										</li>
									)}

									{map(icons, (icon) => {
										return (
											<li data-key={icon}>
												<Tooltip text={icon}>
													<Button
														isTertiary
														onClick={() => {
															setAttributes({
																iconClass: icon,
															});
														}}
													>
														<i className={icon} aria-hidden="true"></i>
													</Button>
												</Tooltip>
											</li>
										);
									})}
								</ul>
							) : (
								<p>{__("No characters found.", "block-options")}</p>
							)}
						</div>
					</PanelBody>
				</InspectorControls>
				{!mdimageUrl ? (
					<div className="placeholder__img">
						<img src={PlaceholderImg} alt="placeholder" />
					</div>
				) : mdimageUrl || xsimageUrl ? (
					<picture className={`cpreview--image__content`}>
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
									""
								)}
								<source media="(min-width:481px)" srcset={`${mdimageUrl}`} />
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
								<source media="(min-width:481px)" srcset={`${xsimageUrl}`} />
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
									""
								)}
								<source media="(max-width:480px)" srcset={`${xsimageUrl}`} />
							</>
						) : (
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
								<source media="(max-width:480px)" srcset={`${mdimageUrl}`} />
							</>
						)}
						<img src={`${imageUrl}`} alt={`${altText}`} />
					</picture>
				) : (
					<></>
				)}
				<span className="tab--icon icon icon--bgcolor-four icon--color-six">
					<i className={classnames(iconClass ? iconClass : "")}></i>
				</span>
			</>
		);
	}
}
export default compose(
	withSelect((select, props) => {
		const { getBlock, getBlockRootClientId, getBlockIndex, getBlockOrder } =
			select("core/block-editor");
		const { getMedia } = select("core");
		const { imageId } = props.attributes;

		return {
			getBlock,
			getBlockRootClientId,
			getBlockIndex,
			getBlockOrder,
			Image: imageId ? getMedia(imageId) : null,
		};
	}),
	withDispatch((dispatch, props) => {
		const { insertBlock } = dispatch("core/block-editor");
		return {
			insertBlock,
		};
	})
)(Edit);
