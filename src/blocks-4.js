import { registerBlock } from './utils/helper';

/**
 * Import Gutenburg Blocks here
 */

import * as Accordion from './blocks/accordion';
import * as AccordionItem from './blocks/accordion/accordionitem';
import * as AccordionContent from './blocks/accordion/accordioncontent';
import * as CardCollection from './blocks/cardcollection';
import * as card from './blocks/cardcollection/card';
import * as ImageOverlayCollection from './blocks/imageoverlaycollection';
import * as ImageOverlay from './blocks/imageoverlaycollection/imageoverlay';
import * as HeadlineNumbered from './blocks/headlinenumbered';
import * as NewsSlider from './blocks/newsslider';
import * as NewsListing from './blocks/newslisting';
import * as QuoteImage from './blocks/quoteimage';
import * as CustomerListing from './blocks/customerlisting';
import * as CustomerPreview from './blocks/customerpreview';
import * as DownloadListing from './blocks/downloadlisting';
import * as jobsCollection from './blocks/jobscollection';
import * as jobCard from './blocks/jobscollection/jobcard';

/**
 * Function to register blocks provided by tbblocks.
 */
[
	Accordion,
	AccordionItem,
	AccordionContent,
	CardCollection,
	card,
	ImageOverlayCollection,
	ImageOverlay,
	NewsSlider,
	HeadlineNumbered,
	NewsListing,
	QuoteImage,
	CustomerListing,
	CustomerPreview,
	DownloadListing,
	jobsCollection,
	jobCard,
].forEach(registerBlock);
