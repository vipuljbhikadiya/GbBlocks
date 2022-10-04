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
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { JobheadlineIcon, Emailmaker } from '../../utils/block-icons';

export default function edit({ attributes, setAttributes, clientId }) {
	const { anchor, extraClass } = attributes;

	const ALLOWED_BLOCKS = ['gbblocks/jobcard'];

	const { hasInnerBlocks } = useSelect(
		(select) => {
			const { getBlock } = select(blockEditorStore);
			const block = getBlock(clientId);
			return {
				hasInnerBlocks: !!(block && block.innerBlocks.length),
			};
		},
		[clientId]
	);

	const renderappender = hasInnerBlocks
		? undefined
		: () => <InnerBlocks.ButtonBlockAppender />;
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'row row--xs-center row--col-ht row--gap-1' },
		{ allowedBlocks: ALLOWED_BLOCKS, renderAppender: renderappender }
	);

	return (
		<div {...useBlockProps()}>
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={__('Additional', 'gbblocks')}
						initialOpen={true}
					>
						<TextControl
							label={__('Anchor', 'gbblocks')}
							placeholder={__('Specify Id…', 'gbblocks')}
							type="text"
							value={anchor}
							onChange={(value) =>
								setAttributes({ anchor: value })
							}
						/>
						<TextControl
							label={__('Class', 'gbblocks')}
							placeholder={__('Specify class…', 'gbblocks')}
							type="text"
							value={extraClass}
							onChange={(value) =>
								setAttributes({ extraClass: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
			<div
				id={anchor ? anchor : null}
				className={classnames(
					'row-wrapper jobs__collection container',
					extraClass ? extraClass : ''
				)}
			>
				<div className="row row--col-ht row--gap-1">
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						renderAppender={renderappender}
					/>
					<div className="col col--xs-12 col--lg-4 col--xl-3 col--pd-0">
						<div className="job_card">
							<div className="job__card-headline">
								<div className="job__card-icon">
									<span className="job__card-headicon">
										<JobheadlineIcon />
									</span>
								</div>
								<div className="job__card-head">
									<h4 className="headline headline--style-seven headline--color-six">
										Didn’t find anything suitable?
									</h4>
									<p className="text text--style-three text--color-six">
										Then send us your initiative application
										to the following contact details:
									</p>
								</div>
							</div>
							<a
								href="mailto:info@epea.com"
								class="button--cta button--style-one button--width-inline button--color-six button--icon button--align-xs-left"
							>
								<span class="button--text">info@epea.com</span>
								<span class="button--has-icon">
									<div class="icon icon--bgcolor-one icon--color-six">
										<div class="icon__helper"></div>
										<Emailmaker />
									</div>
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
