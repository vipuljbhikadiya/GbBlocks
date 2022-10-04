/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
	SelectControl,
	PanelBody,
	TextControl,
	CheckboxControl,
} from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import { isEmpty } from 'lodash';
const { name } = metadata;

export default function edit({ attributes, setAttributes }) {
	const { taxonomy, anchor, extraClass, download } = attributes;

	// useSelect to retrieve all post types
	const taxonomies = useSelect(
		(select) =>
			select(coreStore).getEntityRecords(
				'taxonomy',
				'download_category',
				{
					per_page: -1,
				}
			),
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
	function onTaxCheckChange(newValue) {
		let data = taxonomy ? taxonomy : Array();
		if (data && newValue) {
			if (data.indexOf(newValue) === -1) {
				data.push(newValue);
			} else {
				data = taxonomy.filter((v) => v !== newValue);
			}
		} else {
			data = taxonomy.filter((v) => v !== newValue);
		}
		data.sort();
		setAttributes({ taxonomy: [...data], download: !download });
	}

	return (
		<div {...useBlockProps()}>
			<Fragment>
				<InspectorControls>
					<PanelBody title={'Settings'}>
						<label className="components-base-control__label custom--label">
							Select Category
						</label>
						{taxonomyOptions?.map((item, index) => {
							return (
								<>
									<CheckboxControl
										className="checkbox-control"
										label={item.label}
										key={item.value}
										name="taxonomy[]"
										checked={
											taxonomy
												? taxonomy.indexOf(item.value) >
												  -1
												: false
										}
										onChange={(val) => {
											onTaxCheckChange(item.value);
										}}
									/>
								</>
							);
						})}
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
