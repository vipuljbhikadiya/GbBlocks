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

class TabSliderNavigation extends Component {
	render() {
		const {
			addSlide,
			activateSlide,
			activeSlideIndex,
			activeSlideID,
			slidesCount,
			slidesOrder,
			selectBlock,
			isEditActive,
		} = this.props;

		const slides = slidesOrder.map((slide, index) => {
			return {
				value: slide,
				//translators: %d is a counter 1, 2, 3
				label: sprintf(__('Tab Content %d', 'gbblocks'), index + 1),
			};
		});

		if (slidesCount <= 0) {
			return (
				<Card
					className="wp-block-gbblocks-content-slider__controls"
					size="xSmall"
				>
					<CardBody className="wp-block-gbblocks-content-slider__controls-wrapper">
						<div className="wp-block-gbblocks-content-slider__controls-actions">
							<Button
								label={__('Add Tab Content', 'gbblocks')}
								variant="secondary"
								disabled={!isEditActive}
								onClick={() => {
									addSlide();
								}}
							>
								{__('Add Tab Content', 'gbblocks')}
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
							label={__('Edit Tab Content', 'gbblocks')}
							variant="secondary"
							icon="edit"
							disabled={!isEditActive}
							onClick={() => {
								selectBlock(activeSlideID);
							}}
						>
							{__('Edit Tab Content', 'gbblocks')}
						</Button>
					</div>
					<div className="wp-block-gbblocks-content-slider__controls-arrows">
						<Button
							label={__('Previous', 'gbblocks')}
							variant="secondary"
							icon="arrow-left-alt2"
							disabled={activeSlideIndex === 0}
							onClick={() => {
								activateSlide(activeSlideIndex - 1);
							}}
						/>
						<Button
							label={__('Next', 'gbblocks')}
							variant="secondary"
							icon="arrow-right-alt2"
							disabled={activeSlideIndex === slidesCount - 1}
							onClick={() => {
								activateSlide(activeSlideIndex + 1);
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
												'Tab Content %1$d of %2$d',
												'gbblocks'
											),
											activeSlideIndex + 1,
											slidesCount
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
											value={activeSlideID}
											onSelect={(slideId) => {
												activateSlide(
													slidesOrder.indexOf(slideId)
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

export default TabSliderNavigation;
