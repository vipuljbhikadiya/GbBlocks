/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Component } from "@wordpress/element";
import { InnerBlocks } from "@wordpress/block-editor";

export default class Save extends Component {
	render() {
		const { innerItem, anchor } = this.props.attributes;
		return (
			<div id={anchor ? anchor : null} className="tabs">
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
														"tab__head-slide splide__slide tab__nav-slide"
													}
												>
													<h3 className="headline headline--style-three headline--color-three">
														{item.attributes.tabHead}
													</h3>
													<p className="text text--style-three text--color-three">
														{item.attributes.tabDesc}
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
								<InnerBlocks.Content />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
