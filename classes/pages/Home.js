

import { HomeHeader } from '../headers/HomeHeader.js';
import { PageContent } from './PageContent.js';

export class Home extends PageContent {

	constructor() {
		super();
		super.setPageName('home');
		this.header = new HomeHeader('home');
	}

	/**
	 * Loads the page
	 */
	async loadPage() {
		super.loadPage();
	}

	/**
	 * Builds category selections (empty)
	 */
	buildCategories() {
	}

	/**
	 * Updates the page with the data from the CurrentWord
	 */
	updatePage() {
	}

	isContentEmpty() {
		let tag = document.getElementById("home-menu");
		return tag == null;
	}
}