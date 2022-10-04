/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function edit({ hasChildBlocks, clientId }) {
	const BLOCK_TEMPLATE = [
		[
			'gbblocks/section',
			{
				extraClass: 'footer--top-section',
				topPadding: 0,
				bottomPadding: 0,
				backgroundColor: '#E3E3E3',
				backgroundColorClass: 'two',
			},
			[
				[
					'gbblocks/footercolumn',
					{ extraClass: 'footer--col-one' },
					[
						['gbblocks/image', { isImage: true }],
						[
							'gbblocks/paragraph',
							{
								extraClass: 'footer--address',
								textColor: '#575756',
								textColorClass: 'three',
							},
						],
					],
				],
				[
					'gbblocks/footercolumn',
					{ extraClass: 'footer--col-two' },
					[
						[
							'gbblocks/headline',
							{
								level: '5',
								headColor: '#49725B',
								headColorClass: 'one',
								extraClass: 'footer--nav-title',
							},
						],
						['gbblocks/navigation'],
					],
				],
				[
					'gbblocks/footercolumn',
					{ extraClass: 'footer--col-three' },
					[
						[
							'gbblocks/headline',
							{
								level: '5',
								headColor: '#49725B',
								headColorClass: 'one',
								extraClass: 'footer--nav-title',
							},
						],
						['gbblocks/navigation'],
					],
				],
				[
					'gbblocks/footercolumn',
					{ extraClass: 'footer--col-four' },
					[
						[
							'gbblocks/headline',
							{
								level: '5',
								headColor: '#49725B',
								headColorClass: 'one',
								extraClass: 'footer--nav-title',
							},
						],
						['gbblocks/navigation'],
					],
				],
				[
					'gbblocks/footercolumn',
					{ extraClass: 'footer--col-five' },
					[
						[
							'gbblocks/headline',
							{
								level: '5',
								headColor: '#49725B',
								headColorClass: 'one',
								extraClass: 'footer--nav-title',
							},
						],
						['gbblocks/navigation'],
					],
				],
			],
		],
		[
			'gbblocks/section',
			{
				extraClass: 'footer--middle-section',
				topPadding: 0,
				bottomPadding: 0,
				backgroundColor: '#E3E3E3',
				backgroundColorClass: 'two',
			},
			[
				[
					'gbblocks/footercolumn',
					{ extraClass: 'footer--col-button' },
					[
						[
							'gbblocks/button',
							{
								style: 'two',
								bgcolorClass: 'one',
								bgcolor: '#49725B',
							},
						],
					],
				],
				[
					'gbblocks/footercolumn',
					{ extraClass: 'footer--col-divider' },
					[
						[
							'gbblocks/divider',
							{
								paddingTop: '0',
								paddingBottom: '0',
								style: 'three',
							},
						],
					],
				],
				[
					'gbblocks/footercolumn',
					{ extraClass: 'footer--col-social' },
					[
						[
							'gbblocks/icon',
							{
								iconColor: '#49725B',
								iconColorClass: 'one',
								iconbgColor: '',
								iconbgColorClass: '',
							},
						],
						[
							'gbblocks/icon',
							{
								iconColor: '#49725B',
								iconColorClass: 'one',
								iconbgColor: '',
								iconbgColorClass: '',
							},
						],
						[
							'gbblocks/icon',
							{
								iconColor: '#49725B',
								iconColorClass: 'one',
								iconbgColor: '',
								iconbgColorClass: '',
							},
						],
						[
							'gbblocks/icon',
							{
								iconColor: '#49725B',
								iconColorClass: 'one',
								iconbgColor: '',
								iconbgColorClass: '',
							},
						],
						[
							'gbblocks/icon',
							{
								iconColor: '#49725B',
								iconColorClass: 'one',
								iconbgColor: '',
								iconbgColorClass: '',
							},
						],
						[
							'gbblocks/icon',
							{
								iconColor: '#49725B',
								iconColorClass: 'one',
								iconbgColor: '',
								iconbgColorClass: '',
							},
						],
						[
							'gbblocks/icon',
							{
								iconColor: '#49725B',
								iconColorClass: 'one',
								iconbgColor: '',
								iconbgColorClass: '',
							},
						],
					],
				],
			],
		],
		[
			'gbblocks/section',
			{
				extraClass: 'footer--last-section',
				topPadding: 0,
				bottomPadding: 0,
				backgroundColor: '#E3E3E3',
				backgroundColorClass: 'two',
			},
			[
				[
					'gbblocks/footercolumn',
					{ extraClass: 'footer--col-copyright' },
					[
						[
							'gbblocks/paragraph',
							{ extraClass: 'footer--copyright' },
						],
						['gbblocks/navigation'],
					],
				],
			],
		],
	];

	const { getBlockOrder } = useSelect((select) => {
		return select('core/block-editor') || select('core/editor');
	});

	hasChildBlocks = getBlockOrder(clientId).length;

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'footer--main-wrap' },
		{
			allowedBlocks: ['gbblocks/footercolumn'],
			template: BLOCK_TEMPLATE,
			templateLock: 'all',
		}
	);

	return (
		<>
			<div {...useBlockProps()}>
				<div {...innerBlocksProps}></div>
			</div>
		</>
	);
}
