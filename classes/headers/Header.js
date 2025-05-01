
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
		}
	}

	/**
	 * Checks if the content specific header is empty
	 */
	isHeaderEmpty() { }


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
			AppUtils.setWindowHash(hash);
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
}
