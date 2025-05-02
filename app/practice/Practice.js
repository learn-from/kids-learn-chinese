

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
		// this.painter.buildPicture();
		this.buildWordCard('word-card', word);
		// Speaker.clearSpeechSection();
	}

	/**
	 * Finds the Chinese character card (pinyin, phrase and sentence)
	 */
	buildWordCard(cardId, word) {
		let wordElement = document.getElementById(cardId);
		let phrase1 = wordElement.querySelector('#phrase1');
		let phrase2 = wordElement.querySelector('#phrase2');
		let sentence = wordElement.querySelector('#sentence');
		phrase1.textContent = word.phrase[0].trim();
		phrase2.textContent = word.phrase[1].trim();
		sentence.textContent = word.sentence.trim();
	}

	isContentEmpty() {
		let tag = document.getElementById("practice");
		return tag == null;
	}
}