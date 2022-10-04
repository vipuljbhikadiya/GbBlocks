/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import sitelogo from '../../assets/images/Logo.png';
import { dropdown } from '../../utils/block-icons';

export default function save({ attributes }) {
	return (
		<>
			<div className="header--container">
				<div className="header--row">
					<div className="header--nav">
						<div class="site--logo">
							<a href={attributes.site_url}>
								<img
									src={sitelogo}
									alt="EPEA - Part of Dress & Sommer"
								/>
							</a>
						</div>
						<span id="menu--btn" class="hamburger">
							<span>Toggle menu</span>
						</span>
						<div class="nav--wrapper">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
