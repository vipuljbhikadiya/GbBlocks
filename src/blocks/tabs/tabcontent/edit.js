/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { Component } from '@wordpress/element';
import {
	PanelBody,
	TextControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import {
	BlockControls,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { withSelect, withDispatch, subscribe } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Placeholder from './placeholder';

/**
 * Create an Component
 */

const ALLOWED_BLOCKS = ['gbblocks/section'];

class Edit extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			hasContent: true,
		};

		this.hasContent = this.hasContent.bind(this);
		this.addSlide = this.addSlide.bind(this);
		this.listenSlideContentChange =
			this.listenSlideContentChange.bind(this);
	}

	hasContent() {
		const { getBlock, clientId } = this.props;

		const innerBlocks = getBlock(clientId).innerBlocks;

		return innerBlocks.length > 0;
	}

	addSlide(position = 'after') {
		const {
			insertBlock,
			getBlock,
			clientId,
			getBlockIndex,
			getBlockRootClientId,
		} = this.props;

		const rootId = getBlockRootClientId(clientId);
		const index =
			getBlockIndex(clientId, rootId) + (position === 'before' ? 0 : 1);
		const block = getBlock(clientId);

		if (block) {
			const insertedBlock = createBlock('gbblocks/tabcontent');

			insertBlock(insertedBlock, index, rootId);
		}
	}

	renderBlockControls() {
		return (
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={__('Add Tab Content Before', 'gbblocks')}
						onClick={() => {
							this.addSlide('before');
						}}
					>
						{__('Add Tab Content Before', 'gbblocks')}
					</ToolbarButton>
					<ToolbarButton
						label={__('Add Tab Content After', 'gbblocks')}
						onClick={() => {
							this.addSlide();
						}}
					>
						{__('Add Tab Content After', 'gbblocks')}
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
		const { tabHead, tabDesc } = this.props.attributes;
		const { setAttributes } = this.props;

		return (
			<div className="splide__slide tab--content">
				{this.renderBlockControls()}
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							className="block-mt"
							label={__('Tab Headline', 'gbblocks')}
							type="text"
							placeholder="Add Tab Head text.."
							value={tabHead}
							onChange={(value) =>
								setAttributes({ tabHead: value })
							}
						/>
						<TextControl
							className="block-mt"
							label={__('Tab Text', 'gbblocks')}
							type="text"
							placeholder="Add Tab Description text.."
							value={tabDesc}
							onChange={(value) =>
								setAttributes({ tabDesc: value })
							}
						/>
					</PanelBody>
				</InspectorControls>

				<div className="tab--detail">
					<InnerBlocks
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
			select('core/block-editor');
		const { getMedia } = select('core');
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
		const { insertBlock } = dispatch('core/block-editor');
		return {
			insertBlock,
		};
	}),
])(Edit);
