/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Icon } from '@wordpress/components';
import { VideoProgressCircle } from '../../utils/block-icons';

export default class Save extends Component {
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
		} = this.props;
		return (
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
											<Icon icon={VideoProgressCircle} />
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
		);
	}
}
