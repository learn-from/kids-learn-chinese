
import { AppUtils } from '../utils/AppUtils.js';
import { AllWords } from '../utils/AllWords.js';

/**
 * The abstract class of all content pages (Character, Practice, etc.)
 */
export class PageContent {

	static pageName = null;

	constructor() {
	}

	/**
	 * Sets the page name for loading the page content
	 * @param {*} pageName 
	 */
	setPageName(pageName) {
		this.pageName = pageName;
	}

	/**
	 * Loads the character page content.
	 */
	async loadPage() {
		this.header.initHeader();
		let pageUrl = 'htmls/' + this.pageName + '/' + this.pageName + '.html';
		let content = document.getElementById("page-content");

		// load the page html code only when the content section is empty
		if (this.isContentEmpty()) {
			try {
				let response = await fetch(pageUrl);
				if (!response.ok)
					throw new Error("Page not found:", pageUrl);
				let html = await response.text();
				content.innerHTML = html;
			} catch (err) {
				console.error(err);
			}

			// build category menu
			this.buildCategories();

			// build a hamburger list for a mobile device
			this.buildHamburgerList();

		}

		this.updatePage();
	}

	/**
	 * Checks if the content section is empty
	 */
	isContentEmpty() { }

	/**
	 * Builds a category list into a table for some pages.
	 */
	buildCategories() {
		console.log('Start building categories');
		let category = null;
		let categoryTagId;
		let rowTagName = 'tr';
		let colTagName = 'td';
		let colTagClass = 'clickable';
		let numCol;
		if (AppUtils.isMobile()) {
			categoryTagId = 'mobile-category-row';
			document.getElementById(categoryTagId).style.display = 'block';
			numCol = 4;
		} else {
			categoryTagId = 'category-row';
			numCol = 5;
		}

		// build HTML elements for the clickable categories
		let id, row, col;
		let colIdx = 0;
		let table = document.getElementById(categoryTagId);
		let div = table.getElementsByTagName('tbody')[0];
		let links = null;
		div.innerHTML = '';
		let allWords = AllWords.getAllWords();
		for (let i = 0; i < allWords.length; i += numCol) {
			row = document.createElement(rowTagName);
			for (let j = 0; (j < numCol && colIdx < (allWords.length - 1)); j++) {
				colIdx = i + j;
				category = allWords[colIdx];
				id = category.category;
				col = document.createElement(colTagName);
				col.id = id;
				col.className = colTagClass;
				links = this.buildCategoryActions(category);
				for (let k = 0; k < links.length; k++) {
					col.appendChild(links[k]);
				}
				row.appendChild(col);
			}
			div.appendChild(row);
		}
		// console.log(div.outerHTML);
	}

	/**
	 * Builds a list of actions to be added to a category link. Implemented by a child class.
	 */
	buildCategoryActions() {
	}

	/**
	 * Builds a hamburger item list for a mobild device. Implemented by a child class.
	 */
	buildHamburgerList() {
	}

	/**
	 * Updates the page content accordingly.
	 */
	updatePage() { }
}