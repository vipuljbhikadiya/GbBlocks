/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TimePicker,
	Icon,
} from '@wordpress/components';
import { Component } from '@wordpress/element';
import { VideoProgressCircle } from '../../utils/block-icons';

export default class Edit extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				videoLink,
				navLabel1,
				navTime1,
				navLabel2,
				navTime2,
				navLabel3,
				navTime3,
				navLabel4,
				navTime4,
				navLabel5,
				navTime5,
				anchor,
				extraClass,
			},
			setAttributes,
		} = this.props;
		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Video Settings', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Video Link', 'gbblocks')}
							placeholder={__('Link of video...', 'gbblocks')}
							type="text"
							value={videoLink}
							onChange={(value) =>
								setAttributes({ videoLink: value })
							}
						/>
						<label className="block--label">
							Navigation 1 Setting
						</label>
						<TextControl
							label={__('Label', 'gbblocks')}
							placeholder={__(
								'label of navigation...',
								'gbblocks'
							)}
							type="text"
							value={navLabel1}
							onChange={(value) =>
								setAttributes({ navLabel1: value })
							}
						/>
						<TextControl
							label={__('Timestamp', 'gbblocks')}
							placeholder={__(
								'Time stamp for jump video...',
								'gbblocks'
							)}
							type="text"
							value={navTime1}
							pattern="^([0-5][0-9]):[0-5][0-9]$"
							onChange={(value) =>
								setAttributes({ navTime1: value })
							}
						/>
						<span className="block-seprator"></span>
						<label className="block--label">
							Navigation 2 Setting
						</label>
						<TextControl
							label={__('Label', 'gbblocks')}
							placeholder={__(
								'label of navigation...',
								'gbblocks'
							)}
							type="text"
							value={navLabel2}
							onChange={(value) =>
								setAttributes({ navLabel2: value })
							}
						/>
						<TextControl
							label={__('Timestamp', 'gbblocks')}
							placeholder={__(
								'Time stamp for jump video...',
								'gbblocks'
							)}
							type="text"
							value={navTime2}
							onChange={(value) =>
								setAttributes({ navTime2: value })
							}
						/>
						<span className="block-seprator"></span>
						<label className="block--label">
							Navigation 3 Setting
						</label>
						<TextControl
							label={__('Label', 'gbblocks')}
							placeholder={__(
								'label of navigation...',
								'gbblocks'
							)}
							type="text"
							value={navLabel3}
							onChange={(value) =>
								setAttributes({ navLabel3: value })
							}
						/>
						<TextControl
							label={__('Timestamp', 'gbblocks')}
							placeholder={__(
								'Time stamp for jump video...',
								'gbblocks'
							)}
							type="text"
							value={navTime3}
							onChange={(value) =>
								setAttributes({ navTime3: value })
							}
						/>
						<span className="block-seprator"></span>
						<label className="block--label">
							Navigation 4 Setting
						</label>
						<TextControl
							label={__('Label', 'gbblocks')}
							placeholder={__(
								'label of navigation...',
								'gbblocks'
							)}
							type="text"
							value={navLabel4}
							onChange={(value) =>
								setAttributes({ navLabel4: value })
							}
						/>
						<TextControl
							label={__('Timestamp', 'gbblocks')}
							placeholder={__(
								'Time stamp for jump video...',
								'gbblocks'
							)}
							type="text"
							value={navTime4}
							onChange={(value) =>
								setAttributes({ navTime4: value })
							}
						/>
						<span className="block-seprator"></span>
						<label className="block--label">
							Navigation 5 Setting
						</label>
						<TextControl
							label={__('Label', 'gbblocks')}
							placeholder={__(
								'label of navigation...',
								'gbblocks'
							)}
							type="text"
							value={navLabel5}
							onChange={(value) =>
								setAttributes({ navLabel5: value })
							}
						/>
						<TextControl
							label={__('Timestamp', 'gbblocks')}
							placeholder={__(
								'Time stamp for jump video...',
								'gbblocks'
							)}
							type="text"
							value={navTime5}
							onChange={(value) =>
								setAttributes({ navTime5: value })
							}
						/>
					</PanelBody>
					<PanelBody
						title={__('Additional Settings', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Anchor', 'gbblocks')}
							placeholder={__('Specify Id...', 'gbblocks')}
							type="text"
							value={anchor}
							onChange={(value) =>
								setAttributes({ anchor: value })
							}
						/>
						<TextControl
							label={__('Extra Class', 'gbblocks')}
							placeholder={__('Add extra class...', 'gbblocks')}
							type="text"
							value={extraClass}
							onChange={(value) =>
								setAttributes({ extraClass: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					className={classnames(
						'container',
						extraClass ? extraClass : ''
					)}
					id={anchor ? anchor : null}
				>
					<div className="video--slider">
						<div className="video--slider__content">
							<video
								width="100%"
								autobuffer="autobuffer"
								preload="preload"
								muted
							>
								<source src={videoLink} type="video/mp4" />
							</video>

							{(navLabel1 ||
								navLabel2 ||
								navLabel3 ||
								navLabel4 ||
								navLabel5) && (
								<div className="video--slider__nav">
									<ul className="video--nav-items">
										{navLabel1 && navTime1 ? (
											<li
												className="video--slider__nav-item"
												data-end={navTime2}
												data-timestamp={navTime1}
												data-index="1"
											>
												<a
													href="javaScript:;"
													className="video--slider__nav-item__content"
												>
													{navLabel1}
												</a>
											</li>
										) : (
											''
										)}
										{navLabel2 && navTime2 ? (
											<li
												className="video--slider__nav-item"
												data-end={navTime3}
												data-timestamp={navTime2}
												data-index="2"
											>
												<a
													href="javaScript:;"
													className="video--slider__nav-item__content"
												>
													{navLabel2}
												</a>
											</li>
										) : (
											''
										)}
										{navLabel3 && navTime3 ? (
											<li
												className="video--slider__nav-item"
												data-end={navTime4}
												data-timestamp={navTime3}
												data-index="3"
											>
												<a
													href="javaScript:;"
													className="video--slider__nav-item__content"
												>
													{navLabel3}
												</a>
											</li>
										) : (
											''
										)}
										{navLabel4 && navTime4 ? (
											<li
												className="video--slider__nav-item"
												data-end={navTime5}
												data-timestamp={navTime4}
												data-index="4"
											>
												<a
													href="javaScript:;"
													className="video--slider__nav-item__content"
												>
													{navLabel4}
												</a>
											</li>
										) : (
											''
										)}
										{navLabel5 && navTime5 ? (
											<li
												className="video--slider__nav-item"
												data-end={9999999}
												data-timestamp={navTime5}
												data-index="5"
											>
												<a
													href="javaScript:;"
													className="video--slider__nav-item__content"
												>
													{navLabel5}
												</a>
											</li>
										) : (
											''
										)}
										<div className="video--slider__progress">
											<span>
												<Icon
													icon={VideoProgressCircle}
												/>
											</span>
										</div>
									</ul>
								</div>
							)}
						</div>
					</div>
					<div className="vs--mobile__progress">
						<span>
							<Icon icon={VideoProgressCircle} />
						</span>
					</div>
				</div>
			</>
		);
	}
}
