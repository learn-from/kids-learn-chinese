

import { Header } from '../abstract/Header.js';

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

		let usageBtn = document.getElementById('usage-btn');
		usageBtn.addEventListener("mouseover", () => {
			this.showMenuRow('usage-row');
		});
		usageBtn.addEventListener("mouseleave", () => {
			this.hideMenuRows();
		});

		// add a hideMenuRows event to the document to hide the category menu when click on anywhere of the page.
		document.addEventListener("click", function () {
			let tag = document.getElementById('category-row');
			if (tag) {
				tag.style.display = 'none';
			}
		});
	}

	/**
	 * Hides all menu rows.
	 */
	hideMenuRows() {
		document.getElementById('category-row').style.display = 'none';
		let usage = document.getElementById('usage-row');
		if (usage)
			usage.style.display = 'none';
	}

	isHeaderEmpty() {
		let tag = document.getElementById("practice-header");
		return tag == null;
	}
}
