/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import {
	Spinner,
	Button,
	PanelBody,
	ResponsiveWrapper,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	TextControl,
	ToggleControl,
} from "@wordpress/components";
import { Component } from "@wordpress/element";
import { compose } from "@wordpress/compose";

class Edit extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				heroPosition,
				heroImageId,
				imageAlt,
				bottomPadding,
				webpmdImageUrl,
				anchor,
				hideLG,
				hideMD,
				hideXS,
			},
			heroImage,
			setAttributes,
			hasinnerBlocksProps,
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
				heroImageId: image.id,
				imageUrl: image.url,
				mdimageUrl: image?.sizes?.md?.url ? image?.sizes?.md?.url : image.url,
				xsimageUrl: image?.sizes?.xs?.url,
				imageAlt: image?.alt,
				webpmdImageUrl: "",
				webpxsImageUrl: "",
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
				}
			}

			if (image.sizes["xs"]) {
				var xswebp =
					image.sizes["xs"].url.substring(
						0,
						image.sizes["xs"].url.lastIndexOf(".") + 1
					) + "webp";
				var xhr = new XMLHttpRequest();
				xhr.open("HEAD", xswebp, false);
				xhr.send();
				if (xhr.status != "404") {
					setAttributes({
						webpxsImageUrl: xswebp,
					});
				}
			}
		};

		const onRemoveImage = () => {
			setAttributes({
				heroImageId: 0,
				imageUrl: "",
				mdimageUrl: "",
				webpmdImageUrl: "",
				xsimageUrl: "",
				webpxsImageUrl: "",
			});
		};

		let hideSection = "";
		if (hideLG == true) {
			hideSection += " section--lg-hide";
		}
		if (hideMD == true) {
			hideSection += " section--md-hide";
		}
		if (hideXS == true) {
			hideSection += " section--xs-hide";
		}

		return (
			<>
				<InspectorControls>
					<PanelBody title={__("General", "gbblocks")} initialOpen={true}>
						<ToggleGroupControl
							label={__("Hero Position", "gbblocks")}
							className="block-togglegroup"
							value={heroPosition}
							isBlock
							onChange={(value) => {
								setAttributes({
									heroPosition: value,
								});
							}}
						>
							<ToggleGroupControlOption
								value="left"
								label={__("Left", "gbblocks")}
								showTooltip={true}
								aria-label={__("Left", "gbblocks")}
							/>
							<ToggleGroupControlOption
								value="right"
								label="Right"
								showTooltip={true}
								aria-label={__("Right", "gbblocks")}
							/>
						</ToggleGroupControl>
						<ToggleGroupControl
							label={__("Bottom Padding", "gbblocks")}
							className="block-togglegroup"
							value={bottomPadding}
							isBlock
							onChange={(value) => {
								setAttributes({
									bottomPadding: Number(value),
								});
							}}
						>
							<ToggleGroupControlOption
								value="0"
								label={__("0", "gbblocks")}
								showTooltip={true}
								aria-label={__("0px", "gbblocks")}
							/>
							<ToggleGroupControlOption
								value="1"
								label="1"
								showTooltip={true}
								aria-label="60px"
							/>
							<ToggleGroupControlOption
								value="2"
								label={__("2", "gbblocks")}
								showTooltip={true}
								aria-label={__("90px", "gbblocks")}
							/>
							<ToggleGroupControlOption
								value="3"
								label={__("3", "gbblocks")}
								showTooltip={true}
								aria-label={__("120", "gbblocks")}
							/>
							<ToggleGroupControlOption
								value="4"
								label={__("4", "gbblocks")}
								showTooltip={true}
								aria-label={__("240px", "gbblocks")}
							/>
						</ToggleGroupControl>
					</PanelBody>
					<PanelBody
						title={__("Background Image", "gbblocks")}
						initialOpen={true}
					>
						<MediaUploadCheck fallback={instructions}>
							<MediaUpload
								title={__("Background Image", "tbblocks")}
								onSelect={onUpdateImage}
								allowedTypes={ALLOWED_MEDIA_TYPES}
								value={heroImageId}
								render={({ open }) => (
									<Button
										id={`media-imgbtn`}
										className={
											!heroImageId
												? "editor-post-featured-image__toggle"
												: "editor-post-featured-image__preview"
										}
										onClick={open}
									>
										{!!heroImageId && !heroImage && <Spinner />}
										{!heroImageId && __("Set image", "tbblocks")}
										{!!heroImageId && heroImage && (
											<ResponsiveWrapper
												naturalWidth={heroImage.media_details.width}
												naturalHeight={heroImage.media_details.height}
											>
												<img
													src={heroImage.source_url}
													alt={__("Background image", "tbblocks")}
												/>
											</ResponsiveWrapper>
										)}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{!!heroImageId && heroImage ? (
							<MediaUploadCheck>
								<MediaUpload
									title={__("Background Image", "tbblocks")}
									onSelect={onUpdateImage}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={heroImageId}
									render={({ open }) => (
										<Button
											id={`media-replacebtn`}
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
						{!!heroImageId ? (
							<MediaUploadCheck>
								<Button
									id={`media-removebtn`}
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
						<TextControl
							className="block-mt"
							label={__("Alt Text", "gbblocks")}
							placeholder="Overwrite Alt Text…"
							type="text"
							value={imageAlt}
							onChange={(value) => setAttributes({ imageAlt: value })}
						/>
					</PanelBody>
					<PanelBody title={__("Display", "gbblocks")} initialOpen={true}>
						<TextControl
							label={__("Anchor", "gbblocks")}
							placeholder="Specify link ID…"
							type="text"
							value={anchor}
							onChange={(value) => setAttributes({ anchor: value })}
						/>
						<ToggleControl
							label={__("Hide on Smartphone", "gbblocks")}
							checked={hideXS}
							onChange={() =>
								setAttributes({
									hideXS: !hideXS,
								})
							}
						/>
						<ToggleControl
							label={__("Hide on Tablet", "gbblocks")}
							checked={hideMD}
							onChange={() =>
								setAttributes({
									hideMD: !hideMD,
								})
							}
						/>
						<ToggleControl
							label={__("Hide on Desktop", "gbblocks")}
							checked={hideLG}
							onChange={() =>
								setAttributes({
									hideLG: !hideLG,
								})
							}
						/>
					</PanelBody>
				</InspectorControls>

				<section
					id={anchor ? anchor : null}
					className={`section section--hero section--pd-bottom-${bottomPadding} section--hero-${heroPosition}${hideSection}`}
				>
					<div {...hasinnerBlocksProps} />
				</section>
			</>
		);
	}
}
export default compose(
	withSelect((select, props) => {
		const { heroImageId } = props.attributes;

		const { clientId } = props;
		const { getBlockOrder } =
			select("core/block-editor") || select("core/editor"); // Fallback to 'core/editor' for backwards compatibility

		const innerBlocksProps = useInnerBlocksProps(
			{ className: "section__content" },
			{
				allowedBlocks: ["gbblocks/sectionherocontent"],
				template: [["gbblocks/sectionherocontent"]],
			}
		);

		const { getMedia } = select("core");

		return {
			heroImage: heroImageId ? getMedia(heroImageId) : null,
			hasChildBlocks: getBlockOrder(clientId).length > 0,
			hasinnerBlocksProps: innerBlocksProps,
		};
	})
)(Edit);
