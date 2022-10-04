/**
 * External dependencies
 */

import { isEqual } from "lodash";

/**
 * Internal dependencies
 */

import Navigation from "./navigation";

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
	TextControl,
} from "@wordpress/components";
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
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
		};

		this.addSlide = this.addSlide.bind(this);
		this.activateSlide = this.activateSlide.bind(this);
		this.getSelectedSlide = this.getSelectedSlide.bind(this);
		this.listenSlidesChange = this.listenSlidesChange.bind(this);
		this.isSlidesOrderChanged = this.isSlidesOrderChanged.bind(this);
		this.isSlidesSelectionUpdated = this.isSlidesSelectionUpdated.bind(this);
		this.updateChildBlockattributes =
			this.updateChildBlockattributes.bind(this);

		this.myRef = createRef();
	}

	addSlide() {
		const { insertBlock, getBlock, clientId } = this.props;

		let innerBlocks;
		const block = getBlock(clientId);

		if (block) {
			const insertedBlock = createBlock("gbblocks/tabcontent");
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
		this.updateChildBlockattributes();
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

	updateChildBlockattributes() {
		const { select } = window.wp.data;
		const { clientId, setAttributes } = this.props;
		if (clientId) {
			const innerBlocksOuter = select("core/block-editor").getBlock(clientId);
			if (innerBlocksOuter) {
				const innerBlocksItems = innerBlocksOuter.innerBlocks;
				let new_attributes = [];

				innerBlocksItems.forEach(function (item, index) {
					const { tabHead, tabDesc } = item.attributes;

					const InnerBlocksProps = {
						attributes: {
							tabHead,
							tabDesc,
						},
					};
					new_attributes.push(InnerBlocksProps);
				});

				const { innerBlocksAttributes } = this.state;

				if (!isEqual(innerBlocksAttributes, new_attributes)) {
					this.setState({
						innerBlocksAttributes: new_attributes,
					});
				}
			}
		}
	}

	render() {
		const { innerItem, anchor } = this.props.attributes;
		const { setAttributes } = this.props;
		const innerBlocksAttributes = this.state.innerBlocksAttributes;
		if (!isEqual(innerItem, innerBlocksAttributes)) {
			setAttributes({ innerItem: [...innerBlocksAttributes] });
		}
		return (
			<>
				<InspectorControls>
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
				<div id={anchor ? anchor : null} className="tabs" ref={this.myRef}>
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								label={__("Add Tab Content", "gbblocks")}
								onClick={this.addSlide}
							>
								{__("Add Tab Content", "gbblocks")}
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
					<div className="tabs--wrapper">
						<div className="splide tab__nav">
							<div className="splide__track">
								<div className="splide__list">
									{innerItem && (
										<>
											{innerItem.map((item, index) => {
												return (
													<div
														data-index={index}
														className={
															"tab__head-slide splide__slide tab__nav-slide" +
															(index === this.state.activeSlideIndex
																? " active"
																: "")
														}
													>
														<h3 className="headline headline--style-three headline--color-three">
															{item.attributes.tabHead
																? item.attributes.tabHead
																: "Lorem ipsum"}
														</h3>
														<p className="text text--style-three text--color-three">
															{item.attributes.tabDesc
																? item.attributes.tabDesc
																: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit Aenean commodo"}
														</p>
													</div>
												);
											})}
										</>
									)}
								</div>
							</div>
						</div>
						<div className="splide tab_slider">
							<div className="splide__track">
								<div className="splide__list">
									<InnerBlocks
										template={[["gbblocks/tabcontent", {}]]}
										allowedBlocks={["gbblocks/tabcontent"]}
										templateLock={false}
										renderAppender={() => {
											return "";
										}}
										orientation="horizontal"
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
