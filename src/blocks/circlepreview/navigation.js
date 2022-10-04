/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	Card,
	CardBody,
	Dropdown,
	Button,
	MenuGroup,
	MenuItemsChoice,
} from '@wordpress/components';

class previewNavigation extends Component {
	render() {
		const {
			addItem,
			activateItem,
			activeItemIndex,
			activeItemID,
			itemsCount,
			itemsOrder,
			selectBlock,
			isEditActive,
		} = this.props;

		const slides = itemsOrder.map((slide, index) => {
			return {
				value: slide,
				//translators: %d is a counter 1, 2, 3
				label: sprintf(__('Preview Item %d', 'gbblocks'), index + 1),
			};
		});

		if (itemsCount <= 0) {
			return (
				<Card
					className="wp-block-gbblocks-content-slider__controls"
					size="xSmall"
				>
					<CardBody className="wp-block-gbblocks-content-slider__controls-wrapper">
						<div className="wp-block-gbblocks-content-slider__controls-actions">
							<Button
								label={__('Add Preview Item', 'gbblocks')}
								variant="secondary"
								disabled={!isEditActive}
								onClick={() => {
								
									addItem();
								}}
							>
								{__('Add Preview Item', 'gbblocks')}
							</Button>
						</div>
					</CardBody>
				</Card>
			);
		}

		return (
			<Card
				className="wp-block-gbblocks-content-slider__controls"
				size="xSmall"
			>
				<CardBody className="wp-block-gbblocks-content-slider__controls-wrapper">
					<div className="wp-block-gbblocks-content-slider__controls-actions">
						<Button
							label={__('Edit Preview Item', 'gbblocks')}
							variant="secondary"
							icon="edit"
							disabled={!isEditActive}
							onClick={() => {
								selectBlock(activeItemID);
							}}
						>
							{__('Edit Preview Item', 'gbblocks')}
						</Button>
					</div>
					<div className="wp-block-gbblocks-content-slider__controls-arrows">
						<Button
							label={__('Previous', 'gbblocks')}
							variant="secondary"
							icon="arrow-left-alt2"
							disabled={activeItemIndex === 0}
							onClick={() => {
								activateItem(activeItemIndex - 1);
							}}
						/>
						<Button
							label={__('Next', 'gbblocks')}
							variant="secondary"
							icon="arrow-right-alt2"
							disabled={activeItemIndex === itemsCount - 1}
							onClick={() => {
								activateItem(activeItemIndex + 1);
							}}
						/>
					</div>
					<div className="wp-block-gbblocks-content-slider__controls-slides">
						<Dropdown
							position="bottom left"
							renderToggle={({ isOpen, onToggle }) => (
								<div>
									<Button
										variant="secondary"
										onClick={onToggle}
										aria-expanded={isOpen}
										icon="arrow-down"
										iconPosition="right"
										//translators: %1$d is slide number, %2$d is total slides count
										text={sprintf(
											__(
												'Preview Item %1$d of %2$d',
												'gbblocks'
											),
											activeItemIndex + 1,
											itemsCount
										)}
									/>
								</div>
							)}
							renderContent={() => (
								<div
									style={{
										minWidth: '200px',
										maxHeight: '200px',
									}}
								>
									<MenuGroup>
										<MenuItemsChoice
											choices={slides}
											value={activeItemID}
											onSelect={(slideId) => {
												activateItem(
													itemsOrder.indexOf(slideId)
												);
											}}
										/>
									</MenuGroup>
								</div>
							)}
						/>
					</div>
				</CardBody>
			</Card>
		);
	}
}

export default previewNavigation;
