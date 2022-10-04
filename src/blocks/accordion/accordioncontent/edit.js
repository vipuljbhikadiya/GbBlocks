/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function edit() {
	return (
		<div {...useBlockProps()}>
			<div className="accordion-collapse collapse">
				<div className="accordion-body">
					<InnerBlocks
						template={[
							[
								'gbblocks/paragraph',
								{
									tag: 'p',
									textColor: '#575756',
									textColorClass: 'three',
									textStyle: 'two',
								},
							],
						]}
						templateLock={false}
						templateInsertUpdatesSelection={true}
						allowedBlocks={[
							'gbblocks/headline',
							'gbblocks/paragraph',
							'gbblocks/list',
							'gbblocks/button',
							'gbblocks/image',
							'gbblocks/quote',
							'gbblocks/icon',
							'gbblocks/icon-text',
						]}
					/>
				</div>
			</div>
		</div>
	);
}
