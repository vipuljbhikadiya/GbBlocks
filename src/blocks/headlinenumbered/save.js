/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * Internal Dependencies
 */
import headlineClasses from './headlineClasses';
import { QuoteIcon } from '../../utils/block-icons';

export default function save({ attributes }) {
	const { anchor, extraClass, number, isFullWidth, isHeadlineNumbered } =
		attributes;

	return (
		<div
			id={anchor ? anchor : null}
			className={classnames(
				`row-wrapper headline-numbered`,
				true == isFullWidth ? `row-wrapper--ct-wd` : null,
				'' !== extraClass ? `${extraClass}` : null
			)}
		>
			{isHeadlineNumbered == true && (
				<div class="row">
					<div class="col col--xs-12">
						<div class="col__content">
							<div className="headline-numbered__seprator">
								<span className="headline-numbered__bullet"></span>
							</div>
						</div>
					</div>
				</div>
			)}
			<div class="row row--xs-center row--gap-1">
				<div class="col col--xs-12 col--sm-3 col--xl-2 col--pd-0">
					<div class="col__content">
						<span
							class={classnames(
								`headline-numbered__visual`,
								0 !== number
									? `headline-numbered__number`
									: null
							)}
						>
							{number != 0 ? (
								number <= 9 ? (
									'0' + number
								) : (
									number
								)
							) : (
								<QuoteIcon />
							)}
						</span>
					</div>
				</div>
				<div
					className={classnames(
						'col col--pd-0',
						...headlineClasses(attributes)
					)}
				>
					<div class="col__content">
						<div className="headline-numbered__content">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
