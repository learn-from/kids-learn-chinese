
import { Header } from './Header.js';
import { AllWords } from '../utils/AllWords.js';
import { AppUtils } from '../utils/AppUtils.js';

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

		// let printBtn = document.getElementById('print-btn');
		// printBtn.addEventListener("click", () => {
		// 	Printer.print();
		// });

		// add a hideMenuRows event to the document to hide the category menu when click on anywhere of the page.
		document.addEventListener("click", function () {
			document.getElementById('category-row').style.display = 'none';
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
		// the full window.location.hash looks like this #pageName/category/english/chinese
		let word = AllWords.getCurrentWord();
		let hash = '#character/' + word.category + '/' + word.word.english + '/' + word.word.chinese;
		return hash;
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
	 * Builds a list of actions to be added to a category link. Implemented by a child class.
	 */
	buildCategoryActions(category) {
		let actions = [];
		let icon = document.createElement('img');
		icon.src = AllWords.getCategoryIcon(category.category);
		icon.className = 'category-icon';
		let link = document.createElement('a');
		link.href = '#character/' + category.category;
		link.textContent = ' ' + (AppUtils.isMobile() ? id : category.cname + ' - ' + category.category);
		actions.push(icon);
		actions.push(link);
		return actions;
	}

	buildHamburgerList() {
		if (AppUtils.isMobile()) {
			document.getElementById('hamburger').style.display = 'block';
			return;
		}
	}
}

window.CharacterHeader = CharacterHeader;
