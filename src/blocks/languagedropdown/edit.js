/**
 * Wordpress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { dropdown } from '../../utils/block-icons';
import { InnerBlocks } from '@wordpress/block-editor';

export default function edit() {
	const blockprops = useBlockProps();

	const TEMPLATE = [['polylang/language-switcher']];

	return (
		<div {...blockprops}>
			<div className="header--lang-nav">
				<div className="lang--selected-menu">
					<span className="lang--menu-name">
						<span class="current--lang-code">En</span>
						{dropdown}
					</span>
					<InnerBlocks template={TEMPLATE} />
				</div>
			</div>
		</div>
	);
}
