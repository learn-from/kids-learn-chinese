
import { AllWords } from '../utils/AllWords.js';
import { AppUtils } from '../utils/AppUtils.js';

/**
 * The super class of the header classes to initialize the header, listeners.
 * TODO the search function is not tested yet.
 */
export class Header {

	constructor(pageName) {
		this.pageName = "htmls/" + pageName + "/header.html";
	}

	async initHeader() {
		if (this.isHeaderEmpty()) {
			await fetch(this.pageName)
				.then(response => response.text())
				.then(data => document.getElementById("header").innerHTML = data)
				.catch(error => console.error("Error loading header:", error));

			console.log(this.pageName, 'is loaded');
			// build category menu
			this.buildCategories();

			// build a hamburger list for a mobile device
			this.buildHamburgerList();
		}
	}

	/**
	 * Checks if the content specific header is empty
	 */
	isHeaderEmpty() { }

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
	 * Hides all meun rows and shows the specified one.
	 * @param {*} id 
	 */
	showMenuRow(id) {
		this.hideMenuRows();
		document.getElementById(id).style.display = 'block';
	}

	/**
	 * Hides all menu rows. Implemented by a child class.
	 */
	hideMenuRows() {
	}

	/**
	 * Searches a word (Chinese or English) from the allWord list. Note that if the word
	 * is not unique in the list, returns the first one.
	 */
	static searchWord() {
		let value = document.getElementById('search-word').value.trim();
		let error = document.getElementById('search-error');
		error.textContent = '';

		let searchWord = AllWords.findWord(value);
		if (searchWord == null) {
			error.textContent = 'No this word: ' + value;
		} else {
			let hash = this.buildHash();
			window.location.hash = hash;
			// this.rebuildWordEntry();
		}
	}

	/**
	 * Builds a content specific window.location.hash to repload a page (e.g. searchWord())
	 * Implemented by a content specific class.
	 * @returns
	 */
	static buildHash() {}

	/**
	 * Uses RETURN key instead of button for searching
	 */
	static enterKeyPressed(event) {
		if (event.keyCode == 13) {
			this.searchWord();
		}
	}

	/**
	 * Shows/hides the hamburger siderar for mobile devices. Implemented by a child class
	 */
	static toggleMenu() {
		if (AppUtils.isMobile()) {
			let sidebar = document.getElementById("sidebar");
			let isOn = sidebar.style.display == 'block';
			sidebar.style.display = (isOn ? 'none' : 'block');
		}
	}
}
