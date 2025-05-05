

import { PracticeHeader } from './PracticeHeader.js';
import { PageContent } from '../abstract/PageContent.js';
import { AllWords } from '../utils/AllWords.js';
import { AppUtils } from '../utils/AppUtils.js';

export class Practice extends PageContent {

	constructor() {
		super();
		super.setPageName('practice');
		this.header = new PracticeHeader('practice');
		this.painter = new Painter();
		this.speaker = new Speaker();
		Painter.setAnimation(false);
		Painter.setCharSizeRate(0.6);
	}

	/**
	 * Loads the page
	 */
	async loadPage() {
		super.loadPage();
	}

	/**
	 * Checks if the character content section is empty
	 * @returns
	 */
	isContentEmpty() {
		let tag = document.getElementById("practice");
		return tag == null;
	}

	/**
	 * Pre-loads the greeting images.
	 */
	preloadImages() {
		this.speaker.preloadRecImages('speech-sign-card');
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
		this.buildWordEntry();
		// Speaker.clearSpeechSection();
		Painter.draw();
	}

	/**
	 * Builds the HTML elements of the word entry
	 */
	buildWordEntry() {
		let word = AllWords.getCurrentWord().word;
		let english = document.getElementById('english');
		english.textContent = word.english.trim();
		this.buildWordCard('word-card', word);
	}

	/**
	 * Finds the Chinese character card (pinyin, phrase and sentence)
	 */
	buildWordCard(cardId, word) {
		let wordElement = document.getElementById(cardId);
		let chinese = document.getElementById('chinese');
		let pinyin = wordElement.querySelector('#pinyin');
		let phrase1 = wordElement.querySelector('#phrase1');
		let phrase2 = wordElement.querySelector('#phrase2');
		let sentence = wordElement.querySelector('#sentence');
		chinese.textContent = word.chinese.trim();
		pinyin.textContent = word.pinyin.trim();
		phrase1.textContent = word.phrase[0].trim();
		phrase2.textContent = word.phrase[1].trim();
		sentence.textContent = word.sentence.trim();
	}

	/**
	 * Finds the next character of the current category and set it as the current one
	 */
	static nextCharacter() {
		AllWords.setNextWord();
		let hash = AppUtils.buildHash('practice');
		AppUtils.setWindowHash(hash);
	}
}
window.Practice = Practice;