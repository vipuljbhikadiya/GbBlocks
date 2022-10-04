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

const ALLOWED_BLOCKS = [
	'gbblocks/icon',
	'gbblocks/headline',
	'gbblocks/paragraph',
];
const BLOCK_TEMPLATE = [
	[
		'gbblocks/icon',
		{
			iconColor: '#49725B',
			iconColorClass: 'one',
			iconbgColor: '#ffffff',
			iconbgColorClass: 'six',
		},
	],
	[
		'gbblocks/headline',
		{
			tag: '4',
			headColor: '#575756',
			headColorClass: 'three',
			headStyle: 'four',
			placeholder: __('Add Title', 'gbblocks'),
		},
	],
	[
		'gbblocks/paragraph',
		{
			tag: 'p',
			textColor: '#575756',
			textColorClass: 'three',
			textStyle: 'two',
			placeholder: __('Add Description', 'gbblocks'),
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
			const insertedBlock = createBlock('gbblocks/timelineslide');

			insertBlock(insertedBlock, index, rootId);
		}
	}

	renderBlockControls() {
		return (
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={__('Add Timeline Slide Before', 'gbblocks')}
						onClick={() => {
							this.addSlide('before');
						}}
					>
						{__('Add Timeline Slide Before', 'gbblocks')}
					</ToolbarButton>
					<ToolbarButton
						label={__('Add Timeline Slide After', 'gbblocks')}
						onClick={() => {
							this.addSlide();
						}}
					>
						{__('Add Timeline Slide After', 'gbblocks')}
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
		const { year } = this.props.attributes;
		const { setAttributes } = this.props;

		return (
			<div className="splide__slide timeline--slide">
				{this.renderBlockControls()}
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							className="block-mt"
							label={__('Year', 'gbblocks')}
							type="text"
							placeholder="1987"
							value={year}
							onChange={(value) => setAttributes({ year: value })}
						/>
					</PanelBody>
				</InspectorControls>

				<div className="timeline--detail">
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
