/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEqual } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, createRef, Fragment } from '@wordpress/element';
import {
	InspectorControls,
	InnerBlocks,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import {
	ToolbarGroup,
	ToolbarButton,
	PanelBody,
	TextControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import {
	useSelect,
	withSelect,
	withDispatch,
	subscribe,
} from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

import Navigation from './navigation';

class Edit extends Component {
	constructor(props) {
		super(...arguments);
		this.state = {
			activeItemIndex: 0,
			activeItemID: '',
			itemsCount: 0,
			itemsOrder: [],
			innerBlocksAttributes: [],
		};

		this.addItem = this.addItem.bind(this);
		this.updateChildBlockattributes =
			this.updateChildBlockattributes.bind(this);
		this.activateItem = this.activateItem.bind(this);
		this.getSelectedItem = this.getSelectedItem.bind(this);
		this.listenItemChange = this.listenItemChange.bind(this);
		this.isItemsOrderChanged = this.isItemsOrderChanged.bind(this);
		this.isItemsSelectionUpdated = this.isItemsSelectionUpdated.bind(this);
		this.myRef = createRef();
	}

	addItem() {
		const { insertBlock, getBlock, clientId } = this.props;
		let innerBlocks;
		const block = getBlock(clientId);

		if (block) {
			const insertedBlock = createBlock('gbblocks/previewitem');
			innerBlocks = block.innerBlocks;
			insertBlock(insertedBlock, innerBlocks.length, clientId);
		}
	}

	activateItem(index) {
		const { clientId, getBlockOrder } = this.props;
		const blocksOrder = getBlockOrder(clientId);
		const activeItemID = blocksOrder[index] || blocksOrder[0];

		this.setState({
			itemsOrder: blocksOrder,
			activeItemID: activeItemID,
			activeItemIndex: index,
			itemsCount: blocksOrder.length,
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
					.getElementById(`block-${activeItemID}`)
					?.removeAttribute('data-hidden');

				const navLinks =
					defaultView.document.querySelectorAll('.nav--link');

				navLinks.forEach((navlink) => {
					navlink.classList.remove('active');
					var navlink_index = navlink.getAttribute('data-index');

					if (navlink_index == index) {
						navlink.classList.add('nav--link-active');
					}
				});
			}
		}
	}

	getSelectedItem() {
		const { clientId, hasSelectedInnerBlock, getSelectedBlock } =
			this.props;

		if (hasSelectedInnerBlock(clientId)) {
			return getSelectedBlock();
		}

		return null;
	}

	getIndexOfSelectedSlide() {
		const { clientId, getBlockIndex } = this.props;
		const selectedSlide = this.getSelectedItem();

		return selectedSlide
			? getBlockIndex(selectedSlide.clientId, clientId)
			: 0;
	}

	isItemsOrderChanged() {
		const newSlidesOrder = this.props.getBlockOrder(this.props.clientId);

		return !isEqual(this.state.itemsOrder, newSlidesOrder);
	}

	listenItemChange() {
		if (this.isItemsOrderChanged() || this.isItemsSelectionUpdated()) {
			this.activateItem(this.getIndexOfSelectedSlide());
		}
		this.updateChildBlockattributes();
	}

	isItemsSelectionUpdated() {
		const { clientId, hasSelectedInnerBlock, getSelectedBlockClientId } =
			this.props;

		const hasSelectedSlide = hasSelectedInnerBlock(clientId);
		const selectedBlockId = getSelectedBlockClientId();

		return hasSelectedSlide && selectedBlockId !== this.state.activeItemID;
	}

	componentDidMount() {
		this.activateItem(0);
		subscribe(this.listenItemChange);
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
					const { headline, description } = item.attributes;

					const InnerBlocksProps = {
						attributes: {
							headline,
							description,
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
		const {
			attributes: { innerItem, anchor, extraClass, style },
			hasinnerBlocksProps,
			setAttributes,
			hasInnerBlocksLength,
		} = this.props;

		var isaddItem = true;
		if (style == 'big' && hasInnerBlocksLength >= 8) {
			isaddItem = false;
		} else {
			if (style == 'small' && hasInnerBlocksLength >= 6) {
				isaddItem = false;
			}
		}

		var loopIndex = 0;
		if (style == 'big') {
			if (hasInnerBlocksLength <= 6) {
				loopIndex = 3;
			} else {
				loopIndex = 4;
			}
		} else {
			loopIndex = 4;
		}

		const innerBlocksAttributes = this.state.innerBlocksAttributes;

		if (!isEqual(innerItem, innerBlocksAttributes)) {
			setAttributes({ innerItem: [...innerBlocksAttributes] });
		}

		const tabsContent = (index, item) => {
			return (
				<div class="nav-item" role="presentation">
					<a
						href={
							'#' +
							item.attributes.headline
								.replace(/[^a-zA-Z ]/g, '')
								.split(' ')
								.join('')
						}
						class={classnames(
							'nav--link',
							index === this.state.activeItemIndex
								? ' nav--link-active'
								: ''
						)}
						id={
							item.attributes.headline
								.replace(/[^a-zA-Z ]/g, '')
								.split(' ')
								.join('') + '-tab'
						}
						data-index={index}
						onClick={(e) => {
							e.preventDefault();
							this.activateItem(index);
						}}
					>
						<h4 class="headline headline--style-three">
							{item.attributes.headline}
						</h4>
						<span className="tab--seprator"></span>
						<p class="text text--style-three">
							{item.attributes.description}
						</p>
					</a>
				</div>
			);
		};

		return (
			<>
				{isaddItem == true && (
					<BlockControls>
						<ToolbarGroup>
							<ToolbarButton
								label={__('Add Preview Item', 'gbblocks')}
								onClick={() => {
									this.addItem();
								}}
							>
								{__('Add Preview Item', 'gbblocks')}
							</ToolbarButton>
						</ToolbarGroup>
					</BlockControls>
				)}
				<Navigation
					addItem={this.addItem}
					activateItem={this.activateItem}
					activeItemIndex={this.state.activeItemIndex}
					activeItemID={this.state.activeItemID}
					itemsCount={this.state.itemsCount}
					itemsOrder={this.state.itemsOrder}
					selectBlock={this.props.selectBlock}
					isEditActive={this.props.isSelected}
				/>
				<div
					id={anchor ? anchor : null}
					className={classnames(
						`row-wrapper container circle--preview`,
						'' != style ? `circle--preview-${style}` : null,
						'' !== extraClass ? `${extraClass}` : null
					)}
					ref={this.myRef}
				>
					<InspectorControls>
						<PanelBody
							title={__('Style', 'gbblocks')}
							initialOpen={true}
						>
							<ToggleGroupControl
								label={__('Preview Style', 'gbblocks')}
								className="block-togglegroup"
								value={style}
								isBlock
								onChange={(value) => {
									setAttributes({
										style: value,
									});
								}}
							>
								<ToggleGroupControlOption
									value="big"
									label={__('Big', 'gbblocks')}
									showTooltip={true}
									aria-label={__('Big', 'gbblocks')}
								/>
								<ToggleGroupControlOption
									value="small"
									label={__('Small', 'gbblocks')}
									showTooltip={true}
									aria-label={__('Small', 'gbblocks')}
								/>
							</ToggleGroupControl>
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

					<div class="row">
						<div class="nav nav-tabs circle--preview-tabs">
							{innerItem && (
								<>
									{innerItem.map((item, index) => {
										if (index >= loopIndex) {
											return false;
										}
										return tabsContent(index, item);
									})}
								</>
							)}
						</div>
						{((style == 'big' && innerItem.length > loopIndex) ||
							(style == 'small' &&
								innerItem.length > loopIndex)) && (
							<div class="nav nav-tabs circle--preview-tabs">
								{innerItem.map((item, index) => {
									if (style == 'big' && index >= loopIndex) {
										return tabsContent(index, item);
									}
									if (
										style == 'small' &&
										index >= loopIndex
									) {
										return tabsContent(index, item);
									}
								})}
							</div>
						)}
						<div {...hasinnerBlocksProps} />
					</div>
				</div>
			</>
		);
	}
}
export default compose(
	withSelect((select, props) => {
		const {
			getBlock,
			getBlockIndex,
			getBlockOrder,
			hasSelectedInnerBlock,
			getSelectedBlockClientId,
			getSelectedBlock,
		} = select('core/block-editor');
		const block = getBlock(props.clientId);
		const hasInnerBlocks = block.innerBlocks.length;

		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'tab-content circle--preview-content' },
			{
				allowedBlocks: ['gbblocks/previewitem'],
				renderAppender: false,
			}
		);

		return {
			getBlock,
			getBlockIndex,
			getBlockOrder,
			hasSelectedInnerBlock,
			getSelectedBlockClientId,
			getSelectedBlock,
			hasInnerBlocksLength: hasInnerBlocks,
			hasinnerBlocksProps: innerBlocksProps,
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
	})
)(Edit);
