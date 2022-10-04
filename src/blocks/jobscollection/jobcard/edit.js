/**
 * External Depenedencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, TextControl } from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { JobheadlineIcon, Readmore } from '../../../utils/block-icons';

export default function edit({ attributes, setAttributes }) {
	const { title, location, entryLevel, employment, sector, link } =
		attributes;

	return (
		<div {...useBlockProps()}>
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Additional', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Title', 'gbblocks')}
							placeholder={__('Lorem ipsum…', 'gbblocks')}
							type="text"
							value={title}
							onChange={(value) =>
								setAttributes({ title: value })
							}
						/>
						<TextControl
							label={__('Location', 'gbblocks')}
							placeholder={__('Hamburg', 'gbblocks')}
							type="text"
							value={location}
							onChange={(value) =>
								setAttributes({ location: value })
							}
						/>
						<TextControl
							label={__('Entry level', 'gbblocks')}
							placeholder={__('Career starter', 'gbblocks')}
							type="text"
							value={entryLevel}
							onChange={(value) =>
								setAttributes({ entryLevel: value })
							}
						/>
						<TextControl
							label={__('Employment', 'gbblocks')}
							placeholder={__('Full Time', 'gbblocks')}
							type="text"
							value={employment}
							onChange={(value) =>
								setAttributes({ employment: value })
							}
						/>
						<TextControl
							label={__('Sector', 'gbblocks')}
							placeholder={__('Consulting', 'gbblocks')}
							type="text"
							value={sector}
							onChange={(value) =>
								setAttributes({ sector: value })
							}
						/>
						<TextControl
							label={__('Link', 'gbblocks')}
							placeholder={__('https://www...', 'gbblocks')}
							type="text"
							value={link}
							onChange={(value) => setAttributes({ link: value })}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
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
								<h5 className="job__card-list-head">
									Location
								</h5>
								<p className="text text--style-three text--color-three">
									{location}
								</p>
							</div>
						)}
						{entryLevel && (
							<div className="job__card-list">
								<h5 className="job__card-list-head">
									Entry level
								</h5>
								<p className="text text--style-three text--color-three">
									{entryLevel}
								</p>
							</div>
						)}
						{employment && (
							<div className="job__card-list">
								<h5 className="job__card-list-head">
									Employment
								</h5>
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
		</div>
	);
}
