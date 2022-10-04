/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { JobheadlineIcon, Readmore } from '../../../utils/block-icons';

export default function save({ attributes }) {
	const { title, location, entryLevel, employment, sector, link } =
		attributes;

	return (
		<div className="col col--xs-12 col--lg-4 col--xl-3 col--pd-0">
			<div className="job_card">
				<div className="job__card-headline">
					<div className="job__card-icon">
						<span className="job__card-headicon">
							<JobheadlineIcon />
						</span>
					</div>
					<div className="job__card-head">
						<h4 className="headline headline--style-seven headline--color-one">
							{title}
						</h4>
					</div>
				</div>
				<div className="job__card-detail">
					{location && (
						<div className="job__card-list">
							<h5 className="job__card-list-head">Location</h5>
							<p className="text text--style-three text--color-three">
								{location}
							</p>
						</div>
					)}
					{entryLevel && (
						<div className="job__card-list">
							<h5 className="job__card-list-head">Entry level</h5>
							<p className="text text--style-three text--color-three">
								{entryLevel}
							</p>
						</div>
					)}
					{employment && (
						<div className="job__card-list">
							<h5 className="job__card-list-head">Employment</h5>
							<p className="text text--style-three text--color-three">
								{employment}
							</p>
						</div>
					)}
					{sector && (
						<div className="job__card-list">
							<h5 className="job__card-list-head">Sector</h5>
							<p className="text text--style-three text--color-three">
								{sector}
							</p>
						</div>
					)}
				</div>

				<a
					href={link}
					target="_blank"
					class="button--cta button--style-one button--width-inline button--color-four button--icon button--align-xs-left"
					rel="noopener"
				>
					<span class="button--text">Read More</span>
					<span class="button--has-icon">
						<div class="icon icon--bgcolor-one icon--color-six">
							<div class="icon__helper"></div>
							<Readmore />
						</div>
					</span>
				</a>
			</div>
		</div>
	);
}
