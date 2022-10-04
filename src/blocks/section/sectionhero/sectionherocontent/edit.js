/**
 * External dependencies
 */

import { isEqual, isEmpty } from "lodash";
/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { compose } from "@wordpress/compose";
import { withSelect, subscribe } from "@wordpress/data";
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import { useState, Component } from "@wordpress/element";

/**
 * internal dependencies
 */
import swipeleft from "../../../../assets/images/swipeleft.png";
import mdSwipeleft from "../../../../assets/images/mdSwipeleft.png";
import smSwipeleft from "../../../../assets/images/smSwipeleft.png";

/**
 * Create an Component
 */

class Edit extends Component {
	constructor() {
		super(...arguments);

		this.state = {
			parentAttributes: { heroImageId: -1 },
		};

		this.getParentattribures = this.getParentattribures.bind(this);
	}

	getParentattribures() {
		const { clientId } = this.props;
		const parentBlockId = this.props.getBlockParents(clientId);
		const parentBlockattribs = this.props.getBlockAttributes(parentBlockId);

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
		const { innerBlocksProps } = this.props;
		const { parentAttributes } = this.state;
		const { parentAttributesData } = this.props.attributes;
		const {
			imageUrl,
			xsimageUrl,
			webpxsImageUrl,
			mdimageUrl,
			webpmdImageUrl,
			imageAlt,
		} = this.state.parentAttributes;

		if (!isEqual(parentAttributes, parentAttributesData)) {
			this.props.setAttributes({
				parentAttributesData: parentAttributes,
			});
		}

		return (
			<>
				<div className="row-wrapper section--hero__content">
					<div className="row row--xs-middle row--gap-0">
						<div className="col col--xs-12 col--lg-6 col--pd-0">
							{(xsimageUrl || mdimageUrl) && (
								<div className="col__content col--hero__visual">
									<div className="col__visual">
										<picture>
											{mdimageUrl ? (
												<>
													{webpmdImageUrl ? (
														<source
															media="(min-width:481px)"
															srcset={`${webpmdImageUrl}`}
															type="image/webp"
														/>
													) : (
														""
													)}
													<source
														media="(min-width:481px)"
														srcset={`${mdimageUrl}`}
													/>
												</>
											) : (
												<>
													{webpxsImageUrl ? (
														<source
															media="(min-width:481px)"
															srcset={`${webpxsImageUrl}`}
															type="image/webp"
														/>
													) : (
														""
													)}
													<source
														media="(min-width:481px)"
														srcset={`${xsimageUrl}`}
													/>
												</>
											)}
											{xsimageUrl ? (
												<>
													{webpxsImageUrl ? (
														<source
															media="(max-width:480px)"
															srcset={`${webpxsImageUrl}`}
															type="image/webp"
														/>
													) : (
														""
													)}
													<source
														media="(max-width:480px)"
														srcset={`${xsimageUrl}`}
													/>
												</>
											) : (
												<>
													{webpmdImageUrl ? (
														<source
															media="(max-width:480px)"
															srcset={`${webpmdImageUrl}`}
															type="image/webp"
														/>
													) : (
														""
													)}
													<source
														media="(max-width:480px)"
														srcset={`${mdimageUrl}`}
													/>
												</>
											)}
											<img
												src={`${imageUrl}`}
												alt={`${imageAlt}`}
												width="auto"
												height="auto"
											/>
										</picture>
									</div>
								</div>
							)}
						</div>
						<div className="col col--xs-12 col--lg-6 col--pd-0">
							<div {...innerBlocksProps}></div>
						</div>
					</div>
					<div className="scroll-to__next">
						<span className="scroll-next__arrow">
							<div className="next__section"></div>
						</span>
					</div>
					<picture className="swipe--image">
						<source media="(min-width:1025px)" srcset={swipeleft} />
						<source media="(min-width:481px)" srcset={mdSwipeleft} />
						<source media="(max-width:480px)" srcset={smSwipeleft} />
						<img
							src={swipeleft}
							alt={`Swipe Section`}
							width="auto"
							height="auto"
						/>
					</picture>
				</div>
			</>
		);
	}
}

export default compose([
	withSelect((select, props) => {
		const { getBlockParents, getBlockAttributes } = select("core/block-editor");

		const innerBlocksProps = useInnerBlocksProps(
			{ className: "col__content col--hero__content" },
			{
				allowedBlocks: ["gbblocks/headlinenumbered"],
				template: [
					[
						"gbblocks/headlinenumbered",
						{
							number: 1,
							isFullWidth: false,
							isHeadlineNumbered: false,
						},
					],
				],
				templateLock: "all",
			}
		);

		return {
			getBlockParents,
			getBlockAttributes,
			innerBlocksProps,
		};
	}),
])(Edit);
