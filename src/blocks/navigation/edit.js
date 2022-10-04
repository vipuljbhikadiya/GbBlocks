/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { SelectControl, Disabled, PanelBody } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import useNavigationEntities from './use-navigation-entities';
import metadata from './block.json';

const { name } = metadata;

export default function Edit({ setAttributes, attributes, isSelected }) {
	const { menu = 0 } = attributes || {};

	const { menus, hasMenus } = useNavigationEntities();

	const options = [{ value: 0, label: __('Not set', 'gbblocks') }];
	if (hasMenus) {
		menus.forEach(function (item) {
			options.push({ value: parseInt(item.id), label: item.name });
		});
	}

	const onSaveMenu = (value) => {
		setAttributes({ menu: parseInt(value) });
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls key="setting">
				<PanelBody title={__('Settings', 'gbblocks')}>
					<SelectControl
						label={__('Select a menu', 'gbblocks')}
						options={options}
						value={menu}
						onChange={onSaveMenu}
					/>
				</PanelBody>
			</InspectorControls>
			{isSelected && menu ? (
				<Disabled>
					<div className="wp-classic-menu-wrap">
						<ServerSideRender
							block={name}
							attributes={attributes}
						/>
					</div>
				</Disabled>
			) : (
				<Disabled>
					<div className="wp-classic-menu-wrap">
						<ServerSideRender
							block={name}
							attributes={attributes}
						/>
					</div>
				</Disabled>
			)}
		</div>
	);
}
