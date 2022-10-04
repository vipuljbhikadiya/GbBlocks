import { registerBlock } from './utils/helper';

/**
 * Import Gutenburg Blocks here
 */

import * as TestimonialSlider from './blocks/testimonialslider';
import * as TestimonialSlide from './blocks/testimonialslider/testimonialslide';
import * as TimelineSlider from './blocks/timelineslider';
import * as TimelineSlide from './blocks/timelineslider/timelineslide';
import * as Tabs from './blocks/tabs';
import * as tabContent from './blocks/tabs/tabcontent';
import * as Form from './blocks/form';
import * as imageButton from './blocks/imagebutton';

/**
 * Function to register blocks provided by tbblocks.
 */
[
	TestimonialSlider,
	TestimonialSlide,
	TimelineSlider,
	TimelineSlide,
	Tabs,
	tabContent,
	Form,
	imageButton,
].forEach(registerBlock);
