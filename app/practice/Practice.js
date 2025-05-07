

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
	 */
	buildCategoryActions(category) {
		let actions = [];
		let icon = document.createElement('img');
		icon.src = AllWords.getCategoryIcon(category.category);
		icon.className = 'category-icon';
		let link = document.createElement('a');
		link.href = '#practice/' + category.category;
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
		document.getElementById('multi-choice').innerHTML = '';
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

	/**
	 * Shows 4 pictures of the current category randomly, one of them matches the current word.
	 */
	static showMultiChoices() {
		let category = AllWords.getCategory(AllWords.CURRENT_WORD.category);
		let word = category.words.find(item => item.english == AllWords.CURRENT_WORD.word.english);
		let result = [word];

		// Make a copy of the array to avoid mutating the original
		let shuffled = category.words.filter(item => item.english !== AllWords.CURRENT_WORD.word.english);;

		// Fisher-Yates Shuffle
		let j;
		for (let i = shuffled.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		result.push(...shuffled.slice(0, 3));

		// Shuffle the final result of 4 items
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}

		// create multiple images as choices
		let choice, image = null;
		let choiceTag = document.getElementById('multi-choice');
		choiceTag.innerHTML = '';
		for (let i = 0; i < result.length; i++) {
			image = document.createElement('IMG');
			image.className = 'picture-choice';
			image.src = result[i].image;
			image.id = result[i].english;
			image.onclick = function() { Practice.checkSelection(this.id); };
			choice = document.createElement('DIV');
			choice.className = 'picture';
			choice.appendChild(image);
			choiceTag.appendChild(choice);
		}
		choiceTag.style.display = 'block';
	}

	/**
	 * Shows 4 pictures of the current category randomly, one of them matches the current word.
	 */
	static checkSelection(selected) {
		let english = AllWords.CURRENT_WORD.word.english;
		let categoryIdx = Math.floor(Math.random() * (AllWords.GREETING_IMAGES.length));
		let category = AllWords.GREETING_IMAGES[categoryIdx];
		let wordIdx = Math.floor(Math.random() * (category.great.length));
		let greetingImageSrc;
		if (english === selected) {
			greetingImageSrc = AllWords.GREETING_IMAGES[categoryIdx].great[wordIdx];
		} else {
			greetingImageSrc = AllWords.GREETING_IMAGES[categoryIdx].wrong;
		}
		this.showGreetingImage(greetingImageSrc);
	}

	/**
	 * Turns all greeting images except the specified one.
	 * @param {*} src 
	 */
	static showGreetingImage(src) {
		let signCard = document.getElementById('speech-sign-card');
		let images = signCard.getElementsByTagName("IMG");
		for (let i = 0; i < images.length; i++) {
			images[i].style.display = 'none';
		}
		for (let i = 0; i < images.length; i++) {
			if (images[i].src.endsWith(src)) {
				images[i].style.display = 'block';
				break;
			}
		}
		document.getElementById('speech-check').style.display = 'block';
		document.getElementById('recognization').style.display = 'none'
		document.getElementById('rec-error').textContent = '';
	}
}
window.Practice = Practice;