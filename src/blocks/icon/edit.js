/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	PanelColorSettings,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, Tooltip } from '@wordpress/components';
import { Component } from '@wordpress/element';

/**
 * External dependencies
 */
import { map } from 'lodash';

/***
 * Interal dependencies
 */
import { theme_colors } from '../../utils/block-helpers';

/**
 * Module constants
 */
const NEW_TAB_REL = 'noreferrer noopener';

let Icons = gbblocks_settings.iconset;

export default class Edit extends Component {
	constructor(props) {
		super(...arguments);
		this.toggle = this.toggle.bind(this);

		this.state = {
			icons: Icons,
			isOpen: false,
			keyword: '',
		};
	}

	search(keyword) {
		let filtered = [];

		map(Icons, (icon) => {
			if (icon.toLowerCase().search(keyword.toLowerCase()) !== -1) {
				filtered.push(icon);
			}
		});

		this.setState({ keyword, icons: filtered });
	}

	toggle() {
		this.setState((state) => ({
			isOpen: !state.isOpen,
		}));

		this.setState({ keyword: '', icons: Icons });

		const selection = window.getSelection();
		anchorRange = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
		//onChange( toggleFormat( value, { type: name } ) );
	}

	customResizeIcons() {
		var elements = document.getElementsByClassName('icon__visual');
		if (elements.length < 0) {
			return;
		}
		var _len = elements.length;
		for (var _i = 0; _i < _len; _i++) {
			var el = elements[_i];
			var elWidth = el.offsetWidth;
			var iconSize = elWidth * 0.9;
			var iconSizeRounded = Math.round(iconSize / 2) * 2;
			el.style.fontSize = iconSizeRounded + 'px';
		}
	}

	render() {
		const {
			attributes: {
				iconColor,
				iconColorClass,
				iconbgColor,
				iconbgColorClass,
				iconClass,
				iconLink,
				anchor,
				extraClass,
				isbutton,
			},
			setAttributes,
		} = this.props;

		this.customResizeIcons();
		window.addEventListener('resize', this.customResizeIcons);

		const links = document.querySelectorAll('.wp-block a');

		for (let i = 0; i < links.length; i++) {
			links[i].addEventListener(
				'click',
				function (e) {
					if (links[i].getAttribute('href')) {
						links[i].removeAttribute('href');
						e.preventDefault();
					}
				},
				false
			);
		}

		const SetIconColorClass = (value) => {
			theme_colors.filter(function (item) {
				if (item.color == value) {
					setAttributes({
						iconColorClass: item.slug,
					});
					setAttributes({
						iconColor: item.color,
					});
				}
			});
		};
		const SetIconbgColorClass = (value) => {
			theme_colors.filter(function (item) {
				if (item.color == value) {
					setAttributes({
						iconbgColorClass: item.slug,
					});
					setAttributes({
						iconbgColor: item.color,
					});
				}
			});
		};

		const iconcolorclass = iconColorClass
			? ` icon--color-${iconColorClass}`
			: '';
		const iconbgcolorclass = iconbgColorClass
			? ` icon--bgcolor-${iconbgColorClass}`
			: '';
		const iconClasses = `icon${iconbgcolorclass}${iconcolorclass}`;

		const { icons, keyword } = this.state;
		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Icon', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							value={keyword}
							placeholder={__('Search', 'gbblocks')}
							onChange={(newKeyword) => {
								this.search(newKeyword);
							}}
						/>
						<div className="gbblocks-icon-panel">
							{icons.length > 0 ? (
								<ul className="gbblocks-icon-list">
									{iconClass && (
										<li
											data-key={iconClass}
											className="selectedicon"
										>
											<Tooltip text={iconClass}>
												<Button
													isTertiary
													onClick={() => {
														setAttributes({
															iconClass:
																iconClass,
														});
													}}
												>
													<i
														className={iconClass}
														aria-hidden="true"
													></i>
												</Button>
											</Tooltip>
										</li>
									)}

									{map(icons, (icon) => {
										return (
											<li data-key={icon}>
												<Tooltip text={icon}>
													<Button
														isTertiary
														onClick={() => {
															setAttributes({
																iconClass: icon,
															});
														}}
													>
														<i
															className={icon}
															aria-hidden="true"
														></i>
													</Button>
												</Tooltip>
											</li>
										);
									})}
								</ul>
							) : (
								<p>
									{__(
										'No characters found.',
										'block-options'
									)}
								</p>
							)}
						</div>
					</PanelBody>
					<PanelBody
						title={__('Style', 'gbblocks')}
						initialOpen={true}
					>
						<PanelColorSettings
							title={__('Icon color', 'gbblocks')}
							className={'block-color-setting block-color-top-0'}
							colorSettings={[
								{
									colors: theme_colors,
									value: iconColor,
									onChange: (value) => {
										SetIconColorClass(value);
									},
									label: __('Icon Color', 'gbblocks'),
								},
							]}
						/>
						<PanelColorSettings
							title={__('Icon Background color', 'gbblocks')}
							className={'block-color-setting block-color-top-0'}
							colorSettings={[
								{
									colors: theme_colors,
									value: iconbgColor,
									onChange: (value) => {
										SetIconbgColorClass(value);
									},
									label: __(
										'Icon Background Color',
										'gbblocks'
									),
								},
							]}
						/>
					</PanelBody>
					{isbutton == false && (
						<PanelBody
							title={__('Link Settings', 'gbblocks')}
							initialOpen={true}
						>
							<div className="gb--link-control">
								<LinkControl
									searchInputPlaceholder="Search here..."
									value={iconLink}
									settings={[
										{
											id: 'opensInNewTab',
											title: 'Open in new tab',
										},
									]}
									onChange={(newLink) =>
										setAttributes({ iconLink: newLink })
									}
									withCreateSuggestion={true}
									createSuggestion={(inputValue) =>
										setAttributes({
											post: {
												...iconLink,
												title: inputValue,
												type: 'custom-url',
												id: Date.now(),
												url: inputValue,
											},
										})
									}
								></LinkControl>
							</div>
						</PanelBody>
					)}
					<PanelBody
						title={__('Additional', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Anchor', 'gbblocks')}
							placeholder={__('Specify Id…', 'gbblocks')}
							type="text"
							value={anchor}
							onChange={(value) =>
								setAttributes({ anchor: value })
							}
						/>
						<TextControl
							label={__('Class', 'gbblocks')}
							placeholder={__('Specify class…', 'gbblocks')}
							type="text"
							value={extraClass}
							onChange={(value) =>
								setAttributes({ extraClass: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
				{undefined == iconLink ? (
					<div
						id={anchor ? `${anchor}` : null}
						class={`icon ${iconClasses} ${extraClass}`}
					>
						<div class="icon__helper"></div>
						<i class={`icon__visual ${iconClass}`}></i>
					</div>
				) : (
					<a
						onClick={(e) => e.preventDefault()}
						href={iconLink.url}
						target={iconLink.opensInNewTab == true ? `_blank` : null}
						rel={iconLink.opensInNewTab ? 'noopener' : null}
						className={`icon icon--link ${iconClasses} ${extraClass}`}
						id={anchor ? `${anchor}` : null}
					>
						<div class="icon__helper"></div>
						<i class={`icon__visual ${iconClass}`}></i>
					</a>
				)}
			</>
		);
	}
}
