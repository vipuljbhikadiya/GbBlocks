/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { ArrowIcon } from '../../utils/block-icons';

export default function save({ attributes }) {
	const { listlinkExtraClass, anchor, url, linkTarget, isListLink } =
		attributes;

	return (
		<>
			{undefined == url ? (
				<div
					id={anchor ? anchor : null}
					className={`list-link ${listlinkExtraClass}`}
				>
					<div className="list-link__wrap">
						<InnerBlocks.Content />
					</div>
					{(isListLink == false || undefined != url) && <ArrowIcon />}
				</div>
			) : (
				<a
					id={anchor ? anchor : null}
					href={url}
					rel={linkTarget ? 'noopener' : null}
					target={linkTarget ? linkTarget : null}
					className={`list-link ${listlinkExtraClass}`}
				>
					<div className="list-link__wrap">
						<InnerBlocks.Content />
					</div>
					<ArrowIcon />
				</a>
			)}
		</>
	);
}
