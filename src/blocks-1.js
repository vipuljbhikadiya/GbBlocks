import { registerBlock } from './utils/helper';

// Styles
// index.scss name implies editor styles. Output will be gbblocks-1.js.
import './styles/index.scss';
// style.scss name implies frontend styles. Output will be style-gbblocks-1.js.
import './styles/style.scss';

/**
 * Import Gutenburg Blocks here
 */

import * as postcontent from './blocks/postcontent';
import * as section from './blocks/section';
import * as row from './blocks/row';
import * as column from './blocks/column';
import * as swipeSection from './blocks/section/sectionswipe';
import * as heroMainSection from './blocks/section/sectionheromain';
import * as sectionContent from './blocks/section/sectionheromain/sectioncontent';
import * as heroSection from './blocks/section/sectionhero';
import * as heroSectionContent from './blocks/section/sectionhero/sectionherocontent';

/**
 * Function to register blocks provided by gbblocks.
 */
[
	postcontent,
	section,
	row,
	column,
	swipeSection,
	heroMainSection,
	sectionContent,
	heroSection,
	heroSectionContent,
].forEach(registerBlock);
