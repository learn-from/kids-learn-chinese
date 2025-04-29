

import { Header } from './Header.js';
import { AppUtils } from '../utils/AppUtils.js';

/**
 * Initializes the header for the practice page.
 */
export class PracticeHeader extends Header {

	constructor(pageName) {
		super(pageName);
	}

	async initHeader() {

		await super.initHeader();

		// for desktop only
		let categoryBtn = document.getElementById('category-btn');

		categoryBtn.addEventListener("mouseover", () => {
			super.showMenuRow('category-row');
		});

		// // add a hideMenuRows event to the document to hide the category menu when click on anywhere of the page.
		document.addEventListener("click", function () {
			document.getElementById('category-row').style.display = 'none';
		});
	}
	
	isHeaderEmpty() {
		return true;
	}

	/**
	 * Builds a list of actions to be added to a category link. Implemented by a child class.
	 */
	buildCategoryActions(category) {
		let actions = [];
		let icon = document.createElement('img');
		icon.src = AllWords.getCategoryIcon(category.category);
		// icon.src = 'images/greetings/Icons/TwoThumbs.png';
		icon.className = 'category-icon';
		let link = document.createElement('a');
		link.href = '#character/' + category.category;
		link.textContent = ' ' + (AppUtils.isMobile() ? id : category.cname + ' - ' + category.category);
		actions.push(icon);
		actions.push(link);
		return actions;
	}

	// build a hamburger list for a mobile device
	buildHamburgerList() { }

	// TODO use Practice class to rebuild the page
	rebuildWordEntry() { }
}
