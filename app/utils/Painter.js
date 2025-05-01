
import { AllWords } from './AllWords.js';
import { Constants } from './Constants.js';
import { AppUtils } from './AppUtils.js';

/**
 * This is a painter utility to creat and paint a character.
 */
export class Painter {

	static animation = true;
	static waitTime = 300;

	constructor() { }

	/**
	 * Creates an instance of this class to implement the lazy singleton pattern
	 * @returns 
	 */
	static getInstance() {
		if (!Painter._instance) {
			Painter._instance = new Painter();
		}
		return Painter._instance;
	}

	/**
	 * Sets this to start/stop animation for drawing a character.
	 * @param {} animation 
	 */
	static setAnimation(animation) {
		this.animation = animation;
	}

	/**
	 * Draws a Chinese character in the standard strok order.
	 * It's called from some HTML tag onclick events.
	 */
	static async draw() {
		const painter = Painter.getInstance();
		let word = AllWords.getCurrentWord().word;
		return new Promise(resolve => {
			setTimeout(() => {
				let character = document.getElementById('character');
				character.textContent = '';
				character.value = word.chinese.trim();
				let charSize = painter.getCharSize(character.value.length);

				let chars = Array.from(character.value);
				let writer;
				for (let i = 0; i < chars.length; i++) {
					writer = HanziWriter.create('character', chars[i], {
						width: charSize,
						height: charSize * 0.9,
						padding: 5,
						strokeColor: '#006400',
						showOutline: true,
						strokeAnimationSpeed: 1, // normal speed
						delayBetweenStrokes: 200 // milliseconds
					});
					if (this.animation && chars.length == 1) {
						writer.animateCharacter();
					}
				}
				// console.log("draw() completed");
				resolve();
			}, this.waitTime);
		});
	}

	/**
	 * Builds the picture element for the current word.
	 */
	buildPicture() {
		let word = AllWords.getCurrentWord().word;
		let defaultPicture = document.getElementById('picture-default');
		defaultPicture.src = Constants.getDefaultImage();
		defaultPicture.style.display = 'block';

		let picture = document.getElementById('picture');
		let char = word.chinese;
		let image = word.image;
		if (!image || image.length == 0) {
			image = this.createCharImage(char);
		}
		picture.src = image;
		picture.style.display = 'none';
	}

	/**
	 * Builds an image for some specialy characters
	 * @param {*} char 
	 */
	createCharImage(char) {
		let today = new Date();
		let texts = [];
		switch (char) {
			case '今':
				texts.push('今天:');
				texts.push(today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '号');
				texts.push('------');
				texts.push('今年:');
				texts.push(today.getFullYear() + '年 ');
				break;
			case '昨':
				let yesterday = new Date(today);
				yesterday.setDate(today.getDate() - 1);
				texts.push('昨天:')
				texts.push(today.getFullYear() + '年' + (yesterday.getMonth() + 1) + '月' + yesterday.getDate() + '号');
				texts.push('------');
				texts.push('去年:');
				texts.push((today.getFullYear() - 1) + '年');
				break;
			case '明':
				let tomorrow = new Date(today);
				tomorrow.setDate(today.getDate() + 1);
				texts.push('明天:');
				texts.push(tomorrow.getFullYear() + '年' + (tomorrow.getMonth() + 1) + '月' + tomorrow.getDate() + '号');
				texts.push('------');
				texts.push('明年:');
				texts.push((tomorrow.getFullYear() + 1) + '年');
				break;
			default:
				texts.push('Picture');
				texts.push('is coming');
				texts.push('soon ...');
		}
		return this.createBase64Image(texts);
	}

	/**
	 * Creates a based 64 image for the text.
	 * @param {*} texts 
	 * @returns 
	 */
	createBase64Image(texts) {
		let canvas = document.getElementById("textCanvas");
		let ctx = canvas.getContext("2d");
		canvas.height = 300;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Set text properties: volot, size, style, align, etc.
		ctx.fillStyle = "Brown";
		ctx.font = "40px SimSun";
		ctx.textAlign = "left";
		ctx.textBaseline = "baseline";

		// Draw text on the canvas
		let height = 48;
		for (let i = 0; i < texts.length; i++) {
			ctx.fillText(texts[i], 10, height);
			height += 45;
		}

		// Convert canvas content to Base64
		let base64Image = canvas.toDataURL("image/png"); // Image format: PNG
		return base64Image;
	}

	/**
	 * Gets the size of the image of the character to be drawn.
	 * @param {*} charLength 
	 * @returns 
	 */
	getCharSize(charLength) {
		let charSize = 32;
		if (AppUtils.isMobile()) {
			switch (charLength) {
				case 1:
					charSize = 190;
					break;
				case 2:
					charSize = 90;
					break;
				case 3:
					charSize = 60;
					break;
				default:
					charSize = 32;
			};
		} else {
			switch (charLength) {
				case 1:
					charSize = 280;
					break;
				case 2:
					charSize = 140;
					break;
				case 3:
					charSize = 90;
					break;
				default:
					charSize = 32;
			};
		}
		return charSize;
	}
}

window.Painter = Painter;