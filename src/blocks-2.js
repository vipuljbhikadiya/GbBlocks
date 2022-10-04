import { registerBlock } from './utils/helper';

/**
 * Import Gutenburg Blocks here
 */

import * as Header from './blocks/header';
import * as Navigation from './blocks/navigation';
import * as Footer from './blocks/footer';
import * as FooterColumn from './blocks/footer/footerCol';

/**
 * Function to register blocks provided by tbblocks.
 */
[Header, Navigation, Footer, FooterColumn].forEach(registerBlock);
