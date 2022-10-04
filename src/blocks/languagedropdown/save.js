/**
 * Wordpress dependencies
 */

import { __ } from '@wordpress/i18n';
import { dropdown } from '../../utils/block-icons';
import { InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	return (
		<div className="header--lang-nav">
			<div className="lang--selected-menu">
				<span className="lang--menu-name">
					<span class="current--lang-code">En</span>
					{dropdown}
				</span>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
