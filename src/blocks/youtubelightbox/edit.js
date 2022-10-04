/**
 * Wordpress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function edit() {
	const blockprops = useBlockProps({ className: 'youtube__lightbox' });

	return (
		<div className={blockprops}>
			<div class="youtube__lightbox-container">
				<div class="youtube__lightbox-close-helper">
					<button class="youtube__lightbox-close"></button>
				</div>
				<div class="youtube__lightbox-video-helper">
					<iframe
						className="youtube__iframe"
						src=""
						frameborder="0"
						allowfullscreen
						allow="autoplay;"
					></iframe>
				</div>
			</div>
		</div>
	);
}
