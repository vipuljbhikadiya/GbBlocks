/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import {
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	ToggleControl,
	TextControl,
} from '@wordpress/components';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';

/**
 * internal dependencies
 */
import swipeleft from '../../../assets/images/swipeleft.png';
import mdSwipeleft from '../../../assets/images/mdSwipeleft.png';
import smSwipeleft from '../../../assets/images/smSwipeleft.png';
import swiperight from '../../../assets/images/swiperight.png';
import mdSwiperight from '../../../assets/images/mdSwiperight.png';
import smSwiperight from '../../../assets/images/smSwiperight.png';

class Edit extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				topPadding,
				bottomPadding,
				orientation,
				anchor,
				hideLG,
				hideMD,
				hideXS,
			},
			setAttributes,
			hasinnerBlocksProps,
		} = this.props;

		const bgclass = orientation ? `section--bg-${orientation}` : '';

		let hideSection = '';
		if (hideLG == true) {
			hideSection += ' section--lg-hide';
		}
		if (hideMD == true) {
			hideSection += ' section--md-hide';
		}
		if (hideXS == true) {
			hideSection += ' section--xs-hide';
		}

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Background', 'gbblocks')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label={__('Orientation', 'gbblocks')}
							className="block-togglegroup"
							value={orientation}
							isBlock
							onChange={(value) => {
								setAttributes({
									orientation: value,
								});
							}}
						>
							<ToggleGroupControlOption
								value="left"
								label={__('Left', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Left', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="right"
								label={__('Right', 'gbblocks')}
								showTooltip={true}
								aria-label={__('Right', 'gbblocks')}
							/>
						</ToggleGroupControl>
					</PanelBody>
					<PanelBody
						title={__('Settings', 'gbblocks')}
						initialOpen={true}
					>
						<ToggleGroupControl
							label={__('Top Padding', 'gbblocks')}
							className="block-togglegroup"
							value={topPadding}
							isBlock
							onChange={(value) => {
								setAttributes({
									topPadding: Number(value),
								});
							}}
						>
							<ToggleGroupControlOption
								value="0"
								label={__('0', 'gbblocks')}
								showTooltip={true}
								aria-label={__('0px', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="1"
								label="1"
								showTooltip={true}
								aria-label="60px"
							/>
							<ToggleGroupControlOption
								value="2"
								label={__('2', 'gbblocks')}
								showTooltip={true}
								aria-label={__('90px', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="3"
								label={__('3', 'gbblocks')}
								showTooltip={true}
								aria-label={__('120', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="4"
								label={__('4', 'gbblocks')}
								showTooltip={true}
								aria-label={__('240px', 'gbblocks')}
							/>
						</ToggleGroupControl>
						<ToggleGroupControl
							label={__('Bottom Padding', 'gbblocks')}
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
								label={__('0', 'gbblocks')}
								showTooltip={true}
								aria-label={__('0px', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="1"
								label="1"
								showTooltip={true}
								aria-label="60px"
							/>
							<ToggleGroupControlOption
								value="2"
								label={__('2', 'gbblocks')}
								showTooltip={true}
								aria-label={__('90px', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="3"
								label={__('3', 'gbblocks')}
								showTooltip={true}
								aria-label={__('120', 'gbblocks')}
							/>
							<ToggleGroupControlOption
								value="4"
								label={__('4', 'gbblocks')}
								showTooltip={true}
								aria-label={__('240px', 'gbblocks')}
							/>
						</ToggleGroupControl>
					</PanelBody>

					<PanelBody
						title={__('Display', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Anchor', 'gbblocks')}
							placeholder="Specify link ID…"
							type="text"
							value={anchor}
							onChange={(value) =>
								setAttributes({ anchor: value })
							}
						/>
						<ToggleControl
							label={__('Hide on Smartphone', 'gbblocks')}
							checked={hideXS}
							onChange={() =>
								setAttributes({
									hideXS: !hideXS,
								})
							}
						/>
						<ToggleControl
							label={__('Hide on Tablet', 'gbblocks')}
							checked={hideMD}
							onChange={() =>
								setAttributes({
									hideMD: !hideMD,
								})
							}
						/>
						<ToggleControl
							label={__('Hide on Desktop', 'gbblocks')}
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
					className={`section section--pd-top-${topPadding} section--pd-bottom-${bottomPadding} ${hideSection} ${bgclass}`}
				>
					<div className="section__background">
						<picture>
							<source
								media="(min-width:1025px)"
								srcset={
									orientation == 'left'
										? `${swipeleft}`
										: `${swiperight}`
								}
							/>
							<source
								media="(min-width:481px)"
								srcset={
									orientation == 'left'
										? `${mdSwipeleft}`
										: `${mdSwiperight}`
								}
							/>
							<source
								media="(max-width:480px)"
								srcset={
									orientation == 'left'
										? `${smSwipeleft}`
										: `${smSwiperight}`
								}
							/>
							<img
								src={
									orientation == 'left'
										? `${smSwipeleft}`
										: `${smSwiperight}`
								}
								alt={`Swipe Section`}
								width="auto"
								height="auto"
							/>
						</picture>
					</div>
					<div {...hasinnerBlocksProps}></div>
				</section>
			</>
		);
	}
}
export default compose(
	withSelect((select, props) => {
		const { clientId } = props;
		const { getBlockOrder } =
			select('core/block-editor') || select('core/editor'); // Fallback to 'core/editor' for backwards compatibility
		props.hasChildBlocks = getBlockOrder(clientId).length;

		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'section__content' },
			{
				allowedBlocks: ['gbblocks/row', 'gbblocks/youtube'],
			}
		);

		return {
			hasinnerBlocksProps: innerBlocksProps,
		};
	})
)(Edit);
