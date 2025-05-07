
import { Header } from '../abstract/Header.js';

/**
 * Initializes the header for the home page.
 */
export class HomeHeader extends Header {

	constructor(pageName) {
		super(pageName);
	}

	async initHeader() {
		super.initHeader();
	}
	
	isHeaderEmpty() {
		let tag = document.getElementById("home-header");
		return tag == null;
	}

	buildCategories() {
		console.log('build an empty categories for the home page')
	}
}
