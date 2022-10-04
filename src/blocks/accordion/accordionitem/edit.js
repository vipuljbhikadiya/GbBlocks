/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, Component } from '@wordpress/element';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';

class Edit extends Component {
	render() {
		const { hasinnerBlocks } = this.props;
		return (
			<Fragment>
				<div {...hasinnerBlocks} />
			</Fragment>
		);
	}
}

export default compose(
	withSelect((select, props) => {
		const ALLOWED_BLOCKS = [
			'gbblocks/listlink',
			'gbblocks/accordioncontent',
		];

		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'accordion__item' },
			{
				allowedBlocks: ALLOWED_BLOCKS,
				template: [
					[
						'gbblocks/listlink',
						{
							isListLink: false,
						},
					],
					['gbblocks/accordioncontent', {}],
				],
				templateLock: 'all',
				renderAppernder: false,
				templateInsertUpdatesSelection: true,
			}
		);
		return {
			hasinnerBlocks: innerBlocksProps,
		};
	})
)(Edit);
