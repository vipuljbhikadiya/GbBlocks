/**
 * External dependencies
 */

import { isEqual, isEmpty } from 'lodash';
import classnames from 'classnames';

/**
 * Internal dependencies
 */

import Navigation from './navigation';
import MapImage from '../../assets/images/europe-map-dotted-white.png';
import { Marker } from '../../utils/block-icons';
import { QuoteIconWhiteSm } from '../../utils/block-icons';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { Component, createRef } from '@wordpress/element';
import {
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
	TextControl,
} from '@wordpress/components';
import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { withSelect, withDispatch, subscribe } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Create an Component
 */
class Edit extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			activeSlideIndex: 0,
			activeSlideID: '',
			slidesCount: 0,
			slidesOrder: [],
			innerBlocksAttributes: [],
		};

		this.addSlide = this.addSlide.bind(this);
		this.activateSlide = this.activateSlide.bind(this);
		this.getSelectedSlide = this.getSelectedSlide.bind(this);
		this.listenSlidesChange = this.listenSlidesChange.bind(this);
		this.isSlidesOrderChanged = this.isSlidesOrderChanged.bind(this);
		this.isSlidesSelectionUpdated =
			this.isSlidesSelectionUpdated.bind(this);
		this.updateChildBlockattributes =
			this.updateChildBlockattributes.bind(this);

		this.myRef = createRef();
	}

	addSlide() {
		const { insertBlock, getBlock, clientId } = this.props;

		let innerBlocks;
		const block = getBlock(clientId);

		if (block) {
			const insertedBlock = createBlock('gbblocks/locationitem');
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
						?.setAttribute('data-hidden', true);
				});

				defaultView.document
					.getElementById(`block-${activeSlideID}`)
					?.removeAttribute('data-hidden');

				const markers =
					defaultView.document.querySelectorAll('.marker');
				markers.forEach((marker) => {
					marker.classList.remove('active');
					var marker_index = marker.getAttribute('data-index');

					if (marker_index == index) {
						marker.classList.add('active');
					}
				});
			}
		}
	}

	getSelectedSlide() {
		const { clientId, hasSelectedInnerBlock, getSelectedBlock } =
			this.props;

		if (hasSelectedInnerBlock(clientId)) {
			return getSelectedBlock();
		}

		return null;
	}

	getIndexOfSelectedSlide() {
		const { clientId, getBlockIndex } = this.props;
		const selectedSlide = this.getSelectedSlide();

		return selectedSlide
			? getBlockIndex(selectedSlide.clientId, clientId)
			: 0;
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
			const innerBlocksOuter =
				select('core/block-editor').getBlock(clientId);
			if (innerBlocksOuter) {
				const innerBlocksItems = innerBlocksOuter.innerBlocks;
				let new_attributes = [];

				innerBlocksItems.forEach(function (item, index) {
					const { markerXPosition, markerYPosition } =
						item.attributes;

					const InnerBlocksProps = {
						attributes: {
							markerXPosition,
							markerYPosition,
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
		const { innerItem, anchor, extraClass } = this.props.attributes;
		const { setAttributes } = this.props;
		const innerBlocksAttributes = this.state.innerBlocksAttributes;
		if (!isEqual(innerItem, innerBlocksAttributes)) {
			setAttributes({ innerItem: [...innerBlocksAttributes] });
		}

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Additional Settings', 'gbblocks')}
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
					id={anchor ? anchor : null}
					className={classnames(
						'location--map-slider container',
						extraClass ? extraClass : ''
					)}
					ref={this.myRef}
				>
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								label={__('Add Location', 'gbblocks')}
								onClick={this.addSlide}
							>
								{__('Add Location', 'gbblocks')}
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
					<div className="locationmap--wrapper">
						<div className="map--navigations">
							{innerItem && (
								<>
									<div className={`location--markers`}>
										<img src={MapImage} alt="epea map" />
										{innerItem.map((item, index) => {
											let style = {};
											if (!isEmpty(item)) {
												style = {
													left:
														item.attributes
															.markerXPosition +
														'%',
													top:
														item.attributes
															.markerYPosition +
														'%',
												};
											}
											return (
												<div
													data-index={index}
													data-id={'marker--' + index}
													className={
														'marker' +
														(index ===
														this.state
															.activeSlideIndex
															? ' active'
															: '')
													}
													style={style}
												>
													<Marker />
												</div>
											);
										})}
									</div>
								</>
							)}
						</div>
						<div className="locations">
							<div className="location--heading">
								<h6 className="headline headline--align-xs-left headline--style-seven headline--color-one">
									<span className="location--block-icon">
										<QuoteIconWhiteSm />
									</span>
									{__('Contact Details', 'gbblocks')}
								</h6>
							</div>
							<div className="splide location__slider">
								<div className="splide__track">
									<div className="splide__list">
										<InnerBlocks
											template={[
												['gbblocks/locationitem', {}],
											]}
											allowedBlocks={[
												'gbblocks/locationitem',
											]}
											templateLock={false}
											renderAppender={() => {
												return '';
											}}
											orientation="horizontal"
										/>
									</div>
								</div>
								<div class="splide__arrows">
									<button
										class="splide__arrow splide__arrow--prev"
										disabled={
											this.state.activeSlideIndex === 0
										}
										onClick={() => {
											this.activateSlide(
												this.state.activeSlideIndex - 1
											);
										}}
									>
										<span className="nav--arrow is--left"></span>
									</button>
									<button
										class="splide__arrow splide__arrow--next"
										disabled={
											this.state.activeSlideIndex ===
											this.state.slidesCount - 1
										}
										onClick={() => {
											this.activateSlide(
												this.state.activeSlideIndex + 1
											);
										}}
									>
										<span className="nav--arrow is--right"></span>
									</button>
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
		} = select('core/block-editor');

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
		} = dispatch('core/block-editor');

		return {
			insertBlock,
			updateBlockAttributes,
			selectNextBlock,
			selectPreviousBlock,
			selectBlock,
		};
	}),
])(Edit);
