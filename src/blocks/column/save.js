/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import colClasses from './colClasses';

export default class Save extends Component {
	render() {
		const {
			attributes: { colbgClass, anchor },
		} = this.props;
		const bgclass = colbgClass ? `col--bg-${colbgClass}` : '';
		return (
			<div
				id={anchor ? `${anchor}` : null}
				className={classnames(
					`col`,
					...colClasses(this.props.attributes),
					'' !== bgclass ? `${bgclass}` : null
				)}
			>
				<div className="col__content">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
}
