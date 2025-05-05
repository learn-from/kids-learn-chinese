import { AllWords } from './AllWords.js';

export class AppUtils {

	constructor() {
	}

	/**
	* Checks the device is a mobile device (iPhone or Android phone)
	*/
	static isMobile() {
		const userAgent = navigator.userAgent.toLowerCase();
		return (/iphone|ipod/.test(userAgent) || /android/.test(userAgent));
	}

	/**
	* Sets the window.location.hash to trigger reloading a page
	*/
	static setWindowHash(hash) {
		window.location.hash = hash;
	}

	/**
	 * Builds a Character specific window.location.hash to repload a Character page (e.g. searchWord())
	 * The full window.location.hash looks like this #pageName/category/english/chinese
	 * @returns
	 */
	static buildHash(pageName) {
		let word = AllWords.getCurrentWord();
		let hash = '#' + pageName + '/' + word.category + '/' + word.word.english + '/' + word.word.chinese;
		return hash;
	}

	/**
	 * Gets a random number between [min, max] excluding the specified number.
	 * @param {} min 
	 * @param {*} max 
	 * @param {*} excluded 
	 */
	static getRandomNumber(min, max, excluded) {
		let num = min-1;
		while (num == excluded || num < min) {
			num = Math.floor(Math.random() * (max - min + 1) + min);
		}
		return num;
	}
}
