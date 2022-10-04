/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { compose } from "@wordpress/compose";
import { Component } from "@wordpress/element";
import {
	Spinner,
	Button,
	PanelBody,
	ResponsiveWrapper,
	TextControl,
	ToolbarGroup,
	ToolbarButton,
} from "@wordpress/components";
import {
	BlockControls,
	InspectorControls,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { withSelect, withDispatch, subscribe } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import Placeholder from "./placeholder";
import { QuoteIconWhiteSm } from "../../../utils/block-icons";

/**
 * Create an Component
 */

const ALLOWED_BLOCKS = [
	"gbblocks/headline",
	"gbblocks/paragraph",
	"gbblocks/paragraph",
];
const BLOCK_TEMPLATE = [
	[
		"gbblocks/headline",
		{
			tag: "4",
			headAlign: "center",
			headColor: "#49725B",
			headColorClass: "one",
			headStyle: "six",
			placeholder: __("Add Name", "gbblocks"),
		},
	],
	[
		"gbblocks/paragraph",
		{
			tag: "p",
			textAlign: "center",
			textColor: "#575756",
			textColorClass: "three",
			textStyle: "three",
			placeholder: __("Add Position", "gbblocks"),
		},
	],
	[
		"gbblocks/paragraph",
		{
			tag: "p",
			textAlign: "center",
			textColor: "#575756",
			textColorClass: "three",
			textStyle: "three",
			placeholder: __("Add Bio", "gbblocks"),
		},
	],
];

class Edit extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			hasContent: true,
		};

		this.hasContent = this.hasContent.bind(this);
		this.addSlide = this.addSlide.bind(this);
		this.listenSlideContentChange = this.listenSlideContentChange.bind(this);
	}

	hasContent() {
		const { getBlock, clientId } = this.props;

		const innerBlocks = getBlock(clientId).innerBlocks;

		return innerBlocks.length > 0;
	}

	addSlide(position = "after") {
		const {
			insertBlock,
			getBlock,
			clientId,
			getBlockIndex,
			getBlockRootClientId,
		} = this.props;

		const rootId = getBlockRootClientId(clientId);
		const index =
			getBlockIndex(clientId, rootId) + (position === "before" ? 0 : 1);
		const block = getBlock(clientId);

		if (block) {
			const insertedBlock = createBlock("gbblocks/testimonialslide");

			insertBlock(insertedBlock, index, rootId);
		}
	}

	renderBlockControls() {
		return (
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={__("Add Testimonial Slide Before", "gbblocks")}
						onClick={() => {
							this.addSlide("before");
						}}
					>
						{__("Add Testimonial Slide Before", "gbblocks")}
					</ToolbarButton>
					<ToolbarButton
						label={__("Add Testimonial Slide After", "gbblocks")}
						onClick={() => {
							this.addSlide();
						}}
					>
						{__("Add Testimonial Slide After", "gbblocks")}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
		);
	}

	listenSlideContentChange() {
		const slideContent = this.props.getBlockOrder(this.props.clientId);

		if (!this.state.hasContent && slideContent.length > 0) {
			this.setState({
				hasContent: true,
			});
		}

		if (this.state.hasContent && slideContent.length <= 0) {
			this.setState({
				hasContent: false,
			});
		}
	}

	componentDidMount() {
		this.listenSlideContentChange();

		subscribe(this.listenSlideContentChange);
	}

	render() {
		const { xsimageUrl, imageId, altText, xswebpImageUrl } =
			this.props.attributes;
		const { setAttributes, Image } = this.props;

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
				xsimageUrl: image?.sizes?.xs?.url
					? image?.sizes?.xs?.url
					: image?.sizes?.md?.url
					? image?.sizes?.md?.url
					: image.url,
				altText: image.alt,
			});
			var xswebp = "";
			if (image.sizes["xs"]) {
				xswebp =
					image.sizes["xs"].url.substring(
						0,
						image.sizes["xs"].url.lastIndexOf(".") + 1
					) + "webp";
			} else if (image.sizes["md"]) {
				xswebp =
					image.sizes["md"].url.substring(
						0,
						image.sizes["md"].url.lastIndexOf(".") + 1
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
						xswebpImageUrl: xswebp,
					});
				} else {
					setAttributes({
						xswebpImageUrl: "",
					});
				}
			} else {
				setAttributes({
					xswebpImageUrl: "",
				});
			}
		};

		const onRemoveImage = () => {
			setAttributes({
				imageId: undefined,
				xsimageUrl: "",
				xswebpImageUrl: "",
			});
		};

		return (
			<div className="splide__slide testimonial--slide">
				{this.renderBlockControls()}
				<InspectorControls>
					<PanelBody title={__("Settings", "gbblocks")} initialOpen={true}>
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
				</InspectorControls>

				<div className="image image--style-one">
					<div class="image__helper"></div>
					{xsimageUrl ? (
						<picture className={`image__content`}>
							<>
								{xswebpImageUrl ? (
									<source
										media="(max-width:480px)"
										srcset={`${xswebpImageUrl}`}
										type="image/webp"
									/>
								) : (
									""
								)}
								<source media="(max-width:480px)" srcset={`${xsimageUrl}`} />
								<img src={`${xsimageUrl}`} alt={`${altText}`} />
							</>
						</picture>
					) : (
						""
					)}
					<span className="testimonial--block-icon">
						<QuoteIconWhiteSm />
					</span>
				</div>
				<div className="testimonial--detail">
					<InnerBlocks
						template={BLOCK_TEMPLATE}
						templateLock={true}
						templateInsertUpdatesSelection={true}
						allowedBlocks={ALLOWED_BLOCKS}
					/>
				</div>
			</div>
		);
	}
}

export default compose([
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
	}),
])(Edit);
