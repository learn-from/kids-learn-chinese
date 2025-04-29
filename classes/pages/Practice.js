

import { HomeHeader } from '../headers/HomeHeader.js';
import { PageContent } from './PageContent.js';

export class Practice extends PageContent {

	constructor() {
		super();
		super.setPageName('practice');
		this.header = new PracticeHeader('practice');
	}

	/**
	 * Loads the page
	 */
	async loadPage() {
		super.loadPage();
	}

	/**
	 * Updates the page with the data from the CurrentWord
	 */
	updatePage() {
	}

	isContentEmpty() {
		return true;
	}
}