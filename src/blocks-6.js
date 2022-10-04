import { registerBlock } from './utils/helper';

/**
 * Import Gutenburg Blocks here
 */

import * as LocationSlider from './blocks/locations';
import * as Locationslide from './blocks/locations/locationitem';
import * as SeoPlugin from './seo-plugin';
import * as VisualCircle from './blocks/visualcircle';
import * as VisualCircleItem from './blocks/visualcircle/visualcircleitem';
import * as VisualImage from './blocks/visualimage';
import * as circlePreview from './blocks/circlepreview';
import * as previewItem from './blocks/circlepreview/previewitem';
import * as videoSlider from './blocks/slidervideo';
import * as newsLetter from './blocks/newsletter';
import * as languageDropdown from './blocks/languagedropdown';

/**
 * Function to register blocks provided by tbblocks.
 */

[
	Locationslide,
	LocationSlider,
	VisualCircle,
	VisualCircleItem,
	VisualImage,
	circlePreview,
	previewItem,
	videoSlider,
	newsLetter,
	languageDropdown,
].forEach(registerBlock);
