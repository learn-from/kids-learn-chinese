

import { PracticeHeader } from './PracticeHeader.js';
import { PageContent } from '../abstract/PageContent.js';
import { AllWords } from '../utils/AllWords.js';
import { AppUtils } from '../utils/AppUtils.js';

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
	 * Builds a list of actions to be added to a category link. Implemented by a child class.
	 * TODO redo this function for the Practice class.
	 */
	buildCategoryActions(category) {
		let actions = [];
		let icon = document.createElement('img');
		icon.src = AllWords.getCategoryIcon(category.category);
		icon.className = 'category-icon';
		let link = document.createElement('a');
		// link.href = '#character/' + category.category;
		link.textContent = ' ' + (AppUtils.isMobile() ? category.category : category.cname + ' - ' + category.category);
		actions.push(icon);
		actions.push(link);
		return actions;
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