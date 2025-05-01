
import { Header } from '../abstract/Header.js';
import { AppUtils } from '../utils/AppUtils.js';
import { Printer } from '../utils/Printer.js';

/**
 * Initializes the header for the character page.
 */
export class CharacterHeader extends Header {

	constructor(pageName) {
		super(pageName);
	}

	/**
	 * Initializes the Character page header.
	 */
	async initHeader() {

		await super.initHeader();

		// for desktop only
		let categoryBtn = document.getElementById('category-btn');
		categoryBtn.addEventListener("mouseover", () => {
			this.showMenuRow('category-row');
		});

		let usageBtn = document.getElementById('usage-btn');
		usageBtn.addEventListener("mouseover", () => {
			this.showMenuRow('usage-row');
		});
		usageBtn.addEventListener("mouseleave", () => {
			this.hideMenuRows();
		});

		let printBtn = document.getElementById('print-btn');
		printBtn.addEventListener("click", () => {
			Printer.printPages();
		});

		// add a hideMenuRows event to the document to hide the category menu when click on anywhere of the page.
		document.addEventListener("click", function () {
			let tag = document.getElementById('category-row');
			if (tag) {
				tag.style.display = 'none';
			}
		});

		console.log(this.pageName, ' events are set');
	}

	isHeaderEmpty() {
		let tag = document.getElementById("usage-row");
		return tag == null;
	}

	/**
	 * Builds a Character specific window.location.hash to repload a Character page (e.g. searchWord())
	 * @returns
	 */
	static buildHash() {
		return AppUtils.buildHash('character');
	}

	/**
	 * Hides all menu rows.
	 */
	hideMenuRows() {
		document.getElementById('category-row').style.display = 'none';
		if (!AppUtils.isMobile()) {
			let usage = document.getElementById('usage-row');
			if (usage)
				usage.style.display = 'none';
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

window.CharacterHeader = CharacterHeader;
