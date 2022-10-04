/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';

import { compose } from '@wordpress/compose';
import { Component } from '@wordpress/element';
import {
	ToolbarGroup,
	ToolbarButton,
	TextControl,
} from '@wordpress/components';
import {
	BlockControls,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { withSelect, withDispatch, subscribe } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { RangeControl, PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Placeholder from './placeholder';

/**
 * Create an Component
 */

const ALLOWED_BLOCKS = ['gbblocks/paragraph', 'gbblocks/paragraph'];
const BLOCK_TEMPLATE = [
	[
		'gbblocks/paragraph',
		{
			tag: 'p',
			textAlign: 'center',
			textColor: '#575756',
			textColorClass: 'three',
			textStyle: 'two',
			placeholder: __('Add Address', 'gbblocks'),
		},
	],
	[
		'gbblocks/paragraph',
		{
			tag: 'p',
			textAlign: 'center',
			textColor: '#575756',
			textColorClass: 'three',
			textStyle: 'two',
			placeholder: __('Add Telephone', 'gbblocks'),
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
			const insertedBlock = createBlock('gbblocks/locationitem');

			insertBlock(insertedBlock, index, rootId);
		}
	}

	renderBlockControls() {
		return (
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						label={__('Add Location Before', 'gbblocks')}
						onClick={() => {
							this.addSlide('before');
						}}
					>
						{__('Add Location Before', 'gbblocks')}
					</ToolbarButton>
					<ToolbarButton
						label={__('Add Location After', 'gbblocks')}
						onClick={() => {
							this.addSlide();
						}}
					>
						{__('Add Location After', 'gbblocks')}
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
		const { hasContent } = this.state;
		const { markerXPosition, markerYPosition, ButtonLink } =
			this.props.attributes;
		const { setAttributes } = this.props;

		return (
			<div className="splide__slide">
				{this.renderBlockControls()}
				<InspectorControls>
					<PanelBody
						title={__('Settings', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Direction Link', 'gbblocks')}
							value={ButtonLink}
							onChange={(value) =>
								setAttributes({ ButtonLink: value })
							}
						/>
						<RangeControl
							label={__('Marker X Position', 'gbblocks')}
							value={markerXPosition}
							onChange={(value) =>
								setAttributes({ markerXPosition: value })
							}
							min={0}
							max={100}
							initialPosition={0}
						/>
						<RangeControl
							label={__('Marker Y Position', 'gbblocks')}
							value={markerYPosition}
							onChange={(value) =>
								setAttributes({ markerYPosition: value })
							}
							min={0}
							max={100}
							initialPosition={0}
						/>
					</PanelBody>
				</InspectorControls>

				<InnerBlocks
					template={BLOCK_TEMPLATE}
					templateLock={true}
					templateInsertUpdatesSelection={true}
					allowedBlocks={ALLOWED_BLOCKS}
				/>
				<a
					href={ButtonLink}
					target="_blank"
					rel="noopener"
					class="button--text button--cta button--style-one button--width-inline button--color-one  button--align-xs-left"
				>
					Directions
				</a>
			</div>
		);
	}
}

export default compose([
	withSelect((select, props) => {
		const { getBlock, getBlockRootClientId, getBlockIndex, getBlockOrder } =
			select('core/block-editor');

		return {
			getBlock,
			getBlockRootClientId,
			getBlockIndex,
			getBlockOrder,
		};
	}),
	withDispatch((dispatch, props) => {
		const { insertBlock } = dispatch('core/block-editor');
		return {
			insertBlock,
		};
	}),
])(Edit);
