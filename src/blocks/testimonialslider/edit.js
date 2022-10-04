/**
 * External dependencies
 */

import { isEqual } from "lodash";

/**
 * Internal dependencies
 */

import Navigation from "./navigation";
import { EPEADefault } from "../../utils/block-icons";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { compose } from "@wordpress/compose";
import { Component, createRef } from "@wordpress/element";
import {
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
	ToggleControl,
	TextControl,
} from "@wordpress/components";
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { withSelect, withDispatch, subscribe } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

/**
 * Create an Component
 */
class Edit extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			activeSlideIndex: 0,
			activeSlideID: "",
			slidesCount: 0,
			slidesOrder: [],
			innerBlocksAttributes: [],
			isEditingURL: false,
			setIsEditingURL: false,
		};

		this.addSlide = this.addSlide.bind(this);
		this.activateSlide = this.activateSlide.bind(this);
		this.getSelectedSlide = this.getSelectedSlide.bind(this);
		this.listenSlidesChange = this.listenSlidesChange.bind(this);
		this.isSlidesOrderChanged = this.isSlidesOrderChanged.bind(this);
		this.isSlidesSelectionUpdated = this.isSlidesSelectionUpdated.bind(this);

		this.myRef = createRef();
	}

	addSlide() {
		const { insertBlock, getBlock, clientId } = this.props;

		let innerBlocks;
		const block = getBlock(clientId);

		if (block) {
			const insertedBlock = createBlock("gbblocks/testimonialslide");
			innerBlocks = block.innerBlocks;
			insertBlock(insertedBlock, innerBlocks.length, clientId);
		}
	}

	activateSlide(index) {
		const { clientId, getBlockOrder } = this.props;
		const blocksOrder = getBlockOrder(clientId);
		const activeSlideID = blocksOrder[index] || blocksOrder[0];

		this.setState({
			slidesOrder: blocksOrder,
			activeSlideID: activeSlideID,
			activeSlideIndex: index,
			slidesCount: blocksOrder.length,
		});

		if (this.myRef) {
			if (this.myRef.current !== null) {
				const { ownerDocument } = this.myRef.current;
				const { defaultView } = ownerDocument;

				blocksOrder.forEach((blockId) => {
					defaultView.document
						.getElementById(`block-${blockId}`)
						?.setAttribute("data-hidden", true);
				});

				defaultView.document
					.getElementById(`block-${activeSlideID}`)
					?.removeAttribute("data-hidden");

				const markers = defaultView.document.querySelectorAll(".marker");
				markers.forEach((marker) => {
					marker.classList.remove("active");
					var marker_index = marker.getAttribute("data-index");

					if (marker_index == index) {
						marker.classList.add("active");
					}
				});
			}
		}
	}

	getSelectedSlide() {
		const { clientId, hasSelectedInnerBlock, getSelectedBlock } = this.props;

		if (hasSelectedInnerBlock(clientId)) {
			return getSelectedBlock();
		}

		return null;
	}

	getIndexOfSelectedSlide() {
		const { clientId, getBlockIndex } = this.props;
		const selectedSlide = this.getSelectedSlide();

		return selectedSlide ? getBlockIndex(selectedSlide.clientId, clientId) : 0;
	}

	listenSlidesChange() {
		if (this.isSlidesOrderChanged() || this.isSlidesSelectionUpdated()) {
			this.activateSlide(this.getIndexOfSelectedSlide());
		}
	}

	isSlidesOrderChanged() {
		const newSlidesOrder = this.props.getBlockOrder(this.props.clientId);

		return !isEqual(this.state.slidesOrder, newSlidesOrder);
	}

	isSlidesSelectionUpdated() {
		const { clientId, hasSelectedInnerBlock, getSelectedBlockClientId } =
			this.props;

		const hasSelectedSlide = hasSelectedInnerBlock(clientId);
		const selectedBlockId = getSelectedBlockClientId();

		return hasSelectedSlide && selectedBlockId !== this.state.activeSlideID;
	}

	componentDidMount() {
		this.activateSlide(0);
		subscribe(this.listenSlidesChange);
	}

	render() {
		const { url, linkTarget, showHideButton, anchor } = this.props.attributes;
		const { setAttributes } = this.props;

		const opensInNewTab = linkTarget === "_blank";

		const unlink = () => {
			setAttributes({
				url: undefined,
				linkTarget: undefined,
			});
			setIsEditingURL(false);
		};

		const onToggleOpenInNewTab = (value) => {
			const newLinkTarget = value ? "_blank" : undefined;

			setAttributes({
				linkTarget: newLinkTarget,
			});
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={__("Settings", "gbblocks")} initialOpen={true}>
						<ToggleControl
							label={__("Show / Hide Button", "gbblocks")}
							checked={showHideButton}
							onChange={() =>
								setAttributes({
									showHideButton: !showHideButton,
								})
							}
						/>
						{showHideButton == true && (
							<div className="gb--link-control">
								<LinkControl
									className="wp-block-navigation-link__inline-link-input"
									value={{ url, opensInNewTab }}
									onChange={({
										url: newURL = "",
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
						)}
					</PanelBody>
					<PanelBody
						title={__("Additional Settings", "gbblocks")}
						initialOpen={true}
					>
						<TextControl
							label={__("Anchor", "gbblocks")}
							placeholder={__("Specify Id…", "gbblocks")}
							type="text"
							value={anchor}
							onChange={(value) => setAttributes({ anchor: value })}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					id={anchor ? anchor : null}
					className="testimonials"
					ref={this.myRef}
				>
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								label={__("Add Testimonial Slide", "gbblocks")}
								onClick={this.addSlide}
							>
								{__("Add Testimonial Slide", "gbblocks")}
							</ToolbarButton>
						</ToolbarGroup>
					</BlockControls>

					<Navigation
						addSlide={this.addSlide}
						activateSlide={this.activateSlide}
						activeSlideIndex={this.state.activeSlideIndex}
						activeSlideID={this.state.activeSlideID}
						slidesCount={this.state.slidesCount}
						slidesOrder={this.state.slidesOrder}
						selectBlock={this.props.selectBlock}
						isEditActive={this.props.isSelected}
					/>
					<div className="splide testimonial_slider">
						<div className="splide__track">
							<div className="splide__list">
								<InnerBlocks
									template={[["gbblocks/testimonialslide", {}]]}
									allowedBlocks={["gbblocks/testimonialslide"]}
									templateLock={false}
									renderAppender={() => {
										return "";
									}}
									orientation="horizontal"
								/>
							</div>
						</div>
						<div className="testimonial__cta">
							{showHideButton == true && (
								<a
									href={url ? url : "#"}
									target={linkTarget ? linkTarget : null}
									rel="noopener"
									class="button--cta button--style-one button--width-inline button--color-four button--icon button--align-xs-left"
								>
									<span class="button--text">Job Offer</span>
									<span class="button--has-icon">
										<div class="icon icon icon--bgcolor-one icon--color-six">
											<div class="icon__helper"></div>
											<EPEADefault />
										</div>
									</span>
								</a>
							)}
							<div class="splide__arrows">
								<button
									class="splide__arrow splide__arrow--prev"
									disabled={this.state.activeSlideIndex === 0}
									onClick={() => {
										this.activateSlide(this.state.activeSlideIndex - 1);
									}}
								>
									<span className="nav--arrow is--left"></span>
								</button>
								<button
									class="splide__arrow splide__arrow--next"
									disabled={
										this.state.activeSlideIndex === this.state.slidesCount - 1
									}
									onClick={() => {
										this.activateSlide(this.state.activeSlideIndex + 1);
									}}
								>
									<span className="nav--arrow is--right"></span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default compose([
	withSelect((select, props) => {
		const {
			getBlock,
			getBlockIndex,
			getBlockOrder,
			hasSelectedInnerBlock,
			getSelectedBlockClientId,
			getSelectedBlock,
		} = select("core/block-editor");

		return {
			getBlock,
			getBlockIndex,
			getBlockOrder,
			hasSelectedInnerBlock,
			getSelectedBlockClientId,
			getSelectedBlock,
		};
	}),
	withDispatch((dispatch, props) => {
		const {
			updateBlockAttributes,
			insertBlock,
			selectNextBlock,
			selectPreviousBlock,
			selectBlock,
		} = dispatch("core/block-editor");

		return {
			insertBlock,
			updateBlockAttributes,
			selectNextBlock,
			selectPreviousBlock,
			selectBlock,
		};
	}),
])(Edit);
