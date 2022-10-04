/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEqual, isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect, subscribe } from '@wordpress/data';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useState, Component } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import cardClasses from '../cardClasses';

/**
 * Create an Component
 */

class Edit extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			parentAttributes: {
				xsColumnCount: 0,
				smColumnCount: 0,
				mdColumnCount: 0,
				lgColumnCount: 0,
				xlColumnCount: 0,
			},
		};

		this.getParentattribures = this.getParentattribures.bind(this);
	}

	getParentattribures() {
		const { clientId } = this.props;
		const parentBlockId = this.props.getBlockParents(clientId);
		const parentBlockattribs = this.props.getBlockAttributes(
			parentBlockId[parentBlockId.length - 1]
		);

		let newAttributes = [];

		if (!isEmpty(parentBlockattribs)) {
			newAttributes.push(parentBlockattribs);
			const { parentAttributes } = this.state;

			if (!isEqual(parentAttributes, newAttributes?.[0])) {
				this.setState({
					parentAttributes: parentBlockattribs,
				});
			}
		}
	}

	componentDidMount() {
		this.getParentattribures();
	}

	componentDidUpdate() {
		this.getParentattribures();
	}

	render() {
		const { innerBlocksProps, blockprops } = this.props;
		const { parentAttributes } = this.state;
		const { parentAttributesData } = this.props.attributes;
		const {
			xsColumnCount,
			smColumnCount,
			mdColumnCount,
			lgColumnCount,
			xlColumnCount,
		} = this.state.parentAttributes;

		if (!isEqual(parentAttributes, parentAttributesData)) {
			this.props.setAttributes({
				parentAttributesData: parentAttributes,
			});
		}

		var cardclasses = cardClasses(parentAttributesData);
		var classes = '';
		classes = blockprops.className + cardclasses;

		return (
			<>
				<div className={classes}>
					<div {...innerBlocksProps} />
				</div>
			</>
		);
	}
}

export default compose([
	withSelect((select, props) => {
		const { getBlockParents, getBlockAttributes } =
			select('core/block-editor');
		const blockprops = useBlockProps({ className: 'col col--pd-0' });
		const innerBlocksProps = useInnerBlocksProps(
			{ className: 'card--details-wrap col__content' },
			{
				allowedBlocks: [
					'gbblocks/image',
					'gbblocks/headline',
					'gbblocks/paragraph',
					'gbblocks/button',
				],
				template: [
					[
						'gbblocks/image',
						{
							imageStyle: 'two',
						},
					],
					[
						'gbblocks/headline',
						{
							level: '5',
							headColor: '#49725B',
							headColorClass: 'one',
							extraClass: 'card--title',
							headStyle: 'six',
						},
					],
					[
						'gbblocks/paragraph',
						{
							extraClass: 'card--detail',
							textColor: '#575756',
							textColorClass: 'three',
							textStyle: 'three',
						},
					],
					[
						'gbblocks/button',
						{
							style: 'one',
							bgcolorClass: 'four',
							bgcolor: '#8ABD7D',
							buttonicon: true,
							width: 'four',
						},
					],
				],
				templateLock: 'all',
			}
		);

		return {
			getBlockParents,
			getBlockAttributes,
			innerBlocksProps,
			blockprops,
		};
	}),
])(Edit);
