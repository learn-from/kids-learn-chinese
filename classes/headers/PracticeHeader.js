

import { Header } from './Header.js';

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

		// add a hideMenuRows event to the document to hide the category menu when click on anywhere of the page.
		document.addEventListener("click", function () {
			let tag = document.getElementById('category-row');
			if (tag) {
				tag.style.display = 'none';
			}
		});
	}

	isHeaderEmpty() {
		return true;
	}
}
