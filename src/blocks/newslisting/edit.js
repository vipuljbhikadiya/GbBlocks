/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, PanelBody, TextControl } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import metadata from './block.json';
const { name } = metadata;

export default function edit({ attributes, setAttributes }) {
	const { taxonomy, anchor, extraClass } = attributes;

	// useSelect to retrieve all post types
	const taxonomies = useSelect(
		(select) =>
			select(coreStore).getEntityRecords('taxonomy', 'topics', {
				per_page: -1,
			}),
		[]
	);

	var taxonomyOptions = !Array.isArray(taxonomies)
		? taxonomy
		: taxonomies.map(
				// Format the options for display in the <SelectControl/>
				(taxonomy) => ({
					label: taxonomy.name,
					value: taxonomy.id, // the value saved as taxonomy in attributes
				})
		  );

	if (taxonomies && taxonomyOptions) {
		taxonomyOptions.unshift({ label: __('Select Taxanomy'), value: '' });
	}

	return (
		<div {...useBlockProps()}>
			<Fragment>
				<InspectorControls>
					<PanelBody title={'Settings'}>
						<SelectControl
							label="Select a Taxonomy"
							value={taxonomy}
							options={taxonomyOptions}
							onChange={(value) =>
								setAttributes({ taxonomy: value })
							}
						/>
					</PanelBody>
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
				<ServerSideRender block={name} attributes={attributes} />
			</Fragment>
		</div>
	);
}
