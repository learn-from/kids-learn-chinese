

import { CharacterHeader } from './CharacterHeader.js';
import { PageContent } from '../abstract/PageContent.js';

import { AllWords } from '../utils/AllWords.js';
import { Painter } from '../utils/Painter.js';
import { Speaker } from '../utils/Speaker.js';
import { AppUtils } from '../utils/AppUtils.js';

export class Character extends PageContent {

	constructor() {
		super();
		super.setPageName('character');
		this.header = new CharacterHeader('character');
		this.painter = new Painter();
		this.speaker = new Speaker();
	}

	/**
	 * Checks if the character content section is empty
	 * @returns
	 */
	isContentEmpty() {
		let tag = document.getElementById("contents");
		return tag == null;
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
		link.textContent = ' ' + (AppUtils.isMobile() ? category.category : category.cname + ' - ' + category.category);
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

	/**
	 * Updates the page with the data from the CurrentWord
	 */
	updatePage() {
		this.buildWordEntry();
		this.createSidebar();
		Speaker.clearSpeechSection();
		Painter.draw();
	}

	/**
	 * Builds the HTML elements of the word entry
	 */
	buildWordEntry() {
		let word = AllWords.getCurrentWord().word;
		let english = document.getElementById('english');
		english.textContent = word.english.trim();
		this.painter.buildPicture();
		this.buildWordCard('word-card', word);
		Speaker.clearSpeechSection();
	}

	/**
	 * Finds the Chinese character card (pinyin, phrase and sentence)
	 */
	buildWordCard(cardId, word) {
		let wordElement = document.getElementById(cardId);
		let chinese = document.getElementById('chinese');
		let pinyin = wordElement.querySelector('#pinyin');
		let phrase = wordElement.querySelector('#phrase');
		let sentence = wordElement.querySelector('#sentence');
		chinese.textContent = word.chinese.trim();
		pinyin.textContent = word.pinyin.trim();
		phrase.textContent = word.phrase[0].trim();
		sentence.textContent = word.sentence.trim();
	}

	/**
	 * Creates a sidebar when all words are ready to use.
	 */
	createSidebar() {
		console.log('Start building a word list');
		let word = null;
		let categoryName = AllWords.getCurrentWord().category;
		let category = AllWords.getCategory(categoryName);

		// build HTML elements for categories and their words
		let li;
		let id = category.category;
		let len = category.words.length;

		// update the P element as the category title
		let p = document.getElementById('word-category');
		let icon = document.createElement('img');
		icon.src = AllWords.getCategoryIcon(id);
		icon.className = 'category-icon';
		let text = document.createTextNode(' ' + id + ' (' + len + ')');
		p.innerHTML = '';
		p.appendChild(icon);
		p.appendChild(text);

		// update the UL element by creating a list of LI elements for the word list
		let ul = document.getElementById('word-list');
		ul.innerHTML = '';
		// ul.id = id;
		let link;
		for (let i = 0; i < len; i++) {
			word = category.words[i];
			if (word) {
				li = document.createElement('li');
				li.id = word.chinese + '-' + word.english;
				link = document.createElement('a');
				link.href = '#character/' + id + '/' + word.english;
				link.textContent = word.chinese + ' - ' + word.english;
				li.appendChild(link);
				ul.appendChild(li);
			}
		}
		console.log(id, len, 'words are built in the word list');
	}

	/**
	 * Shows the picture. It needs to be async for the print function.
	 * This is called by an onclick of an HTML tag and the printToPDF().
	 */
	static async showPicture() {
		return new Promise(resolve => {
			setTimeout(() => {
				let defaultPicture = document.getElementById('picture-default');
				let picture = document.getElementById('picture');
				let isDefault = defaultPicture.style.display == 'block';

				defaultPicture.style.display = (isDefault ? 'none' : 'block');
				picture.style.display = (isDefault ? 'block' : 'none');
				resolve();
			}, 100);
		});
	}
}
window.Character = Character;