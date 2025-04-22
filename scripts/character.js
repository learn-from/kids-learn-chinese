
/**
 * This is the main JavaScript of the App.
 */
// The Google Project API key
const API_KEY = 'AIzaSyCaC2KBiX526c7b214OG65G8fJXYINT3Rk';

// Google's text-to-speech, speech-to-text and traslator services URLs
const TTS_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
const STT_URL = `https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`;
const TRANSLATOR_URL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&dt=rm&q=';

// The URL of the default image
const DEFAULT_IMG = 'images/site/question-mark.png';
const RECORDING_IMG = "images/greetings/talk-recording.jpg";

// Global variables
let CURRENT_WORD = {
	"category": '',
	"cname": '',
	"word": null
};

let recognizedText = null;

// Turn on/off the animation while drawing a character
let animation = true;

/**
 * Updates the page when all the words are ready to use
 */
function updatePage() {
	let word = CURRENT_WORD.word;
	if (word == null) {
		let sentence = document.getElementById('sentence');
		sentence.textContent = "Refresh the page";
		return;
	}
	clearSpeechSection();
	buildWordEntry(word);
	draw(word);
}

/**
 * Builds the HTML elements of the word entry
 */
function buildWordEntry(word) {
	let english = document.getElementById('english');
	english.textContent = word.english.trim();
	buildPicture(word);
	buildWordCard('word-card', word);
	clearSpeechSection();
}

/**
 * Builds the picture element.
 */
function buildPicture(word) {
	let defaultPicture = document.getElementById('picture-default');
	defaultPicture.src = DEFAULT_IMG;
	defaultPicture.style.display = 'block';

	let picture = document.getElementById('picture');
	let char = word.chinese;
	let today = new Date();
	let texts = [];
	let image = word.image;
	if (image.length == 0) {
		switch (char) {
			case '今':
				texts.push('今天:');
				texts.push(today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '号');
				texts.push('------');
				texts.push('今年:');
				texts.push(today.getFullYear() + '年 ');
				image = createBase64Image(texts);
				break;
			case '昨':
				let yesterday = new Date(today);
				yesterday.setDate(today.getDate() - 1);
				texts.push('昨天:')
				texts.push(today.getFullYear() + '年' + (yesterday.getMonth() + 1) + '月' + yesterday.getDate() + '号');
				texts.push('------');
				texts.push('去年:');
				texts.push((today.getFullYear() - 1) + '年');
				image = createBase64Image(texts);
				break;
			case '明':
				let tomorrow = new Date(today);
				tomorrow.setDate(today.getDate() + 1);
				texts.push('明天:');
				texts.push(tomorrow.getFullYear() + '年' + (tomorrow.getMonth() + 1) + '月' + tomorrow.getDate() + '号');
				texts.push('------');
				texts.push('明年:');
				texts.push((tomorrow.getFullYear() + 1) + '年');
				image = createBase64Image(texts);
				break;
			default:
				texts.push('Picture');
				texts.push('is coming');
				texts.push('soon ...');
				image = createBase64Image(texts);
		}
	}
	picture.src = image;
	picture.style.display = 'none';
}

/**
 * Shows the picture. It needs to be async for the print function.
 */
async function showPicture() {
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

/**
 * Finds the Chinese character card (pinyin, phrase and sentence)
 */
function buildWordCard(cardId, word) {
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
 * Checks if the pinyins of two texts are same.
 * Exactly same or there are some wrong tones.
 */
function checkPinyin(pinyin) {
	// check tones
	let textPinyin = removePuntuciation(pinyin.textPinyin);
	let inputTextPinyin = removePuntuciation(pinyin.inputTextPinyin);
	let textPinyinToneless = removeTones(textPinyin);
	let inputTextPinyinToneless = removeTones(inputTextPinyin);
	let greetingImage = getRandomImage();
	let img = document.getElementById('recording');
	if (textPinyin.localeCompare(inputTextPinyin, undefined, { sensitivity: 'accent' }) === 0) {
		img.src = greetingImage.great;
	} else if (textPinyinToneless.localeCompare(inputTextPinyinToneless, undefined, { sensitivity: 'accent' }) === 0) {
		img.src = greetingImage.ok;
	} else {
		img.src = greetingImage.wrong;
	}
	document.getElementById('recognization').style.display = 'block'
	document.getElementById('input-text').textContent = pinyin.inputText;
	document.getElementById('input-pinyin').textContent = pinyin.inputTextPinyin;
	document.getElementById('rec-error').textContent = '';
}

/**
 * Removes tones from a pinyin string.
 * @param pinyin 
 * @returns 
 */
function removeTones(pinyin) {
	return pinyin
		.normalize("NFD") // Normalize Unicode
		.replace(/[\u0300-\u036f]/g, "");
}

/**
 * Gets an image from an array randomly.
 * @returns 
 */
function getRandomImage() {
	let images = GREETING_IMAGES.find(item => item.category == CURRENT_WORD.category);
	if (images === undefined) {
		images = GREETING_IMAGES.find(item => item.category == 'All');
	}
	let min = Math.ceil(0);
	let max = Math.floor(images.great.length - 1);
	let idx = Math.floor(Math.random() * (max - min + 1) + min);
	let greetingImages = {
		wrong: GREETING_IMG_DIR + images.wrong + "?t=" + Date.now(),
		ok: GREETING_IMG_DIR + images.ok + "?t=" + Date.now(),
		great: GREETING_IMG_DIR + images.great[idx] + "?t=" + Date.now()
	}
	// console.log(greetingImages);
	return greetingImages;
}

/**
 * Gets a gatgory icon image URL.
 * @returns 
 */
function getCategoryIcon(category) {
	let images = GREETING_IMAGES.find(item => item.category == category);
	if (images === undefined) {
		images = GREETING_IMAGES.find(item => item.category == 'All');
	}
	return GREETING_IMG_DIR + images.icon;
}

/**
 * Removes all the puntuciation marks (English, Chinese and spaces)
 */
function removePuntuciation(text) {
	let chars = text.trim();
	let starter = chars.substring(0, 3);
	if (starter.localeCompare('Hēi', undefined, { sensitivity: 'base' }) === 0) {
		chars = chars.substring(3);
	}
	chars = chars.replace(/[ .,\/#!$%\^&\*;:{}=\-_`~()?"'<>[\]\\]/g, "");
	chars = chars.replace(/[，。；：？‘’“”！【】]/g, "");
	return chars;
}

/**
 * Clears the speech recognization area.
 */
function clearSpeechSection() {
	document.getElementById('speech-check').style.display = 'none';
	document.getElementById('recognization').style.display = 'none';
	showError('');
}

/** 
 * Gets pinyins using Google's translator for comparing 
 */
async function getPinyin(text, inputText) {
	let encodedText = encodeURIComponent(text);
	let encodedInputText = encodeURIComponent(inputText);
	let urlText = TRANSLATOR_URL + encodedText;
	let urlInputText = TRANSLATOR_URL + encodedInputText;

	let response = await fetch(urlText);
	let data = await response.json();
	let textPinyin = data[0].map(sentence => sentence[3]).join(" ");

	response = await fetch(urlInputText);
	data = await response.json();
	let inputTextPinyin = data[0].map(sentence => sentence[3]).join(" ");
	// console.log("pinyinText, pinyinInputText:[" + textPinyin + '], [' + inputTextPinyin + ']');

	let pinyin = {
		'text': text,
		'textPinyin': textPinyin.trim(),
		'inputText': inputText,
		'inputTextPinyin': inputTextPinyin.trim(),
	}
	checkPinyin(pinyin);
}

/**
 * Creates a based 64 image for the text.
 * @param {*} texts 
 * @returns 
 */
function createBase64Image(texts) {
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
 * Displays an error message
 */
function showError(message) {
	let error = document.getElementById('error-message');
	if (message == null || message.length == 0) {
		error.style.display = 'none';
	} else {
		error.style.display = 'block';
	}
	error.textContent = message;
}

/**
 * Displays a recognization error message
 */
function showRecError(message) {
	document.getElementById('recognization').style.display = 'block';
	document.getElementById('input-text').textContent = '';
	document.getElementById('input-pinyin').textContent = '';
	document.getElementById('rec-error').textContent = message;
	document.getElementById('rec-error').style.display = 'block';
	document.getElementById('recording').style.display = 'none';

	let greetingImage = getRandomImage();
	let tryAgain = document.getElementById('try-again');
	tryAgain.src = greetingImage.wrong;
	tryAgain.style.display = 'block';
}
