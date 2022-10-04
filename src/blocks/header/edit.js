/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import sitelogo from '../../assets/images/Logo.png';
import { dropdown } from '../../utils/block-icons';

export default function edit({ attributes }) {
	const humberger = useRef();
	const TEMPLATE = [['gbblocks/navigation'], ['gbblocks/langdropdown']];
	useEffect(() => {
		const { ownerDocument } = humberger.current;
		var element = ownerDocument.getElementById('menu--btn');
		var menu = ownerDocument.querySelector('.header--nav');
		element.addEventListener('click', (event) => {
			menu.classList.toggle('is--active');
			element.classList.toggle('is--active');
		});
	}, []);

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
						<span id="menu--btn" class="hamburger" ref={humberger}>
							<span>Toggle menu</span>
						</span>
						<div class="nav--wrapper">
							<InnerBlocks template={TEMPLATE} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
