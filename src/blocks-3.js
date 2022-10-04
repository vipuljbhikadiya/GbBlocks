import { registerBlock } from './utils/helper';

/**
 * Import Gutenburg Blocks here
 */

import * as Headline from './blocks/headline';
import * as Paragragh from './blocks/paragraph';
import * as List from './blocks/list';
import * as Button from './blocks/button';
import * as Image from './blocks/image';
import * as Divider from './blocks/divider';
import * as YouTube from './blocks/youtube';
import * as YouTubeLightbox from './blocks/youtubelightbox';
import * as Icon from './blocks/icon';
import * as IconText from './blocks/icontext';
import * as Quote from './blocks/quote';
import * as ListLink from './blocks/listlink';

/**
 * Function to register blocks provided by tbblocks.
 */
[
	Headline,
	Paragragh,
	List,
	Button,
	Image,
	Divider,
	YouTube,
	YouTubeLightbox,
	Icon,
	IconText,
	Quote,
	ListLink,
].forEach(registerBlock);
