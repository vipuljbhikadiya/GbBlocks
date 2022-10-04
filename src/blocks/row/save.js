/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import rowClasses from './rowClasses';

export default class Save extends Component {
	render() {
		return (
			<div
				id={
					this.props.attributes.anchor
						? `${this.props.attributes.anchor}`
						: null
				}
				className={classnames(
					`row-wrapper`,
					this.props.attributes.rowExtraClass,
					this.props.attributes.contentwidth == true
						? ' row-wrapper--ct-wd'
						: '',
					this.props.attributes.extraclass
				)}
			>
				<div
					className={classnames(
						`row`,
						...rowClasses(this.props.attributes)
					)}
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
}
