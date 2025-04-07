
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

// Global variables
let currentCategory = '';
let recognizedText = null;

// Turn on/off the animation while drawing a character
let animation = true;

/**
 * Updates the page when all the words are ready to use
 */
function updatePage(id) {
	let names = id.split('-');
	let chinese = names[0];
	let english = names[1];
	const intervalId = setInterval(() => {
		if (allWords.length > 0) {
			clearInterval(intervalId);
			clearSpeechSection();
			let word = findWord(chinese, english);
			if (word == null) {
				let sentence = document.getElementById('sentence');
				sentence.textContent = "Refresh the page";
				return;
			}
			buildWordEntry(word);
			draw(word);
		}
	}, 100);
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
 * Finds the Chinese character from the current category object
 */
function findWord(chinese, english) {
	if (allWords.length == 0) {
		return null;
	}

	let category = allWords.find(item => item.category == currentCategory);
	if (category) {
		let word = category.words.find(item => item.chinese == chinese && item.english == english);
		if (word != null) {
			currentCategory = category.category;
			return word;
		}
	}
	currentCategory = allWords[0].category;
	return allWords[0].words[0];
}

/**
 * Sets the current catagory, rebuild the word entry and side bar
 */
function setCategory(category) {
	currentCategory = category;
	let categoryObject = allWords.find(item => item.category == currentCategory);
	let id = categoryObject.words[0].chinese + '-' + categoryObject.words[0].english;
	updatePage(id);
	buildWordList();
}

/**
 * Checks if the pinyins of two texts are same.
 * Exactly same or there are some wrong tones.
 */
function checkPinyin(pinyin) {
	// TODO improve the comparison method
	// check tones
	let img = null;
	let greatImage = '';
	let textPinyin = removePuntuciation(pinyin.textPinyin);
	let inputTextPinyin = removePuntuciation(pinyin.inputTextPinyin);
	img = document.getElementById('recording');
	img.style.display = 'none';
	if (textPinyin.localeCompare(inputTextPinyin, undefined, { sensitivity: 'accent' }) === 0) {
		img = document.getElementById('great');
		greatImage = getRandomImage();
		img.src = greatImage;
		img.style.display = 'block';
	} else {
		img = document.getElementById('try-again');
		img.style.display = 'block';
	}
	document.getElementById('recognization').style.display = 'block'
	document.getElementById('input-text').textContent = pinyin.inputText;
	document.getElementById('input-pinyin').textContent = pinyin.inputTextPinyin;
	document.getElementById('rec-error').textContent = '';
}

/**
 * Gets an image from an array randomly.
 * @returns 
 */
function getRandomImage() {
	const imageURLs = ['images/site/talk-yellow.jpg', 'images/site/talk-purple.jpg', 'images/site/talk-pink.jpg']
	let min = Math.ceil(0);
	let max = Math.floor(2);
	let num = Math.floor(Math.random() * (max - min + 1) + min);
	return imageURLs[num];
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
	document.getElementById('try-again').style.display = 'none';
	document.getElementById('great').style.display = 'none';
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
	console.log("pinyinText, pinyinInputText:[" + textPinyin + '], [' + inputTextPinyin + ']');

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
	document.getElementById('great').style.display = 'none';
	document.getElementById('recording').style.display = 'none';
	document.getElementById('try-again').style.display = 'block';
}
