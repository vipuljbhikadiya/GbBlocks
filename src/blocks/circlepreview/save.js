/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';

export default class Save extends Component {
	constructor(props) {
		super(...arguments);
	}
	render() {
		const {
			attributes: { innerItem, anchor, extraClass, style },
		} = this.props;

		var loopIndex = 0;
		if (style == 'big') {
			if (innerItem.length <= 6) {
				loopIndex = 3;
			} else {
				loopIndex = 4;
			}
		} else {
			loopIndex = 4;
		}

		const tabsContent = (index, item) => {
			return (
				<div class="nav-item" role="presentation">
					<a
						href={
							'#' +
							item.attributes.headline
								.replace(/[^a-zA-Z ]/g, '')
								.split(' ')
								.join('')
						}
						class={classnames('nav--link')}
						id={
							item.attributes.headline
								.replace(/[^a-zA-Z ]/g, '')
								.split(' ')
								.join('') + '-tab'
						}
						data-index={index}
					>
						<h4 class="headline headline--style-three">
							{item.attributes.headline}
						</h4>
						<span className="tab--seprator"></span>
						<p class="text text--style-three">
							{item.attributes.description}
						</p>
					</a>
				</div>
			);
		};

		return (
			<>
				<div
					id={anchor ? anchor : null}
					className={classnames(
						`row-wrapper container circle--preview`,
						'' != style ? `circle--preview-${style}` : null,
						'' !== extraClass ? `${extraClass}` : null
					)}
				>
					<div class="row">
						<div class="nav nav-tabs circle--preview-tabs">
							{innerItem && (
								<>
									{innerItem.map((item, index) => {
										if (index >= loopIndex) {
											return false;
										}
										return tabsContent(index, item);
									})}
								</>
							)}
						</div>
						{((style == 'big' && innerItem.length > loopIndex) ||
							(style == 'small' &&
								innerItem.length > loopIndex)) && (
							<div class="nav nav-tabs circle--preview-tabs">
								{innerItem.map((item, index) => {
									var headline = item.attributes.headline;
									if (style == 'big' && index >= loopIndex) {
										return tabsContent(index, item);
									}
									if (
										style == 'small' &&
										index >= loopIndex
									) {
										return tabsContent(index, item);
									}
								})}
							</div>
						)}
						<div className="tab-content circle--preview-content">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</>
		);
	}
}
