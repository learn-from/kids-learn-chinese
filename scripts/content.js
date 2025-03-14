/**
 * The list of categories are loaded by another JavaScript and embeded in Cross-Column section.
 * animal, people, plant, thing, etc. The data is stored in a global variable allWords.
 */


// The Google Project API key
const API_KEY = 'AIzaSyCaC2KBiX526c7b214OG65G8fJXYINT3Rk';

// Google's text-to-speech, speech-to-text and traslator services URLs
const TTS_URL = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;
const STT_URL = `https://speech.googleapis.com/v1/speech:recognize?key=${API_KEY}`;
const TRANSLATOR_URL = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&dt=rm&q=';

// The URL of the default image
const DEFAULT_IMG = 'images/site/question-mark.png';

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
	showError("");
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

function setAnimation(animation) {
	animation = animation;
}

function isAnimation() {
	return animation;
}

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
 * Redraws a Chinese character in the standard strok order.
 */
function redraw() {
	let chinese = document.getElementById('chinese');
	let english = document.getElementById('english');
	let word = findWord(chinese.textContent, english.textContent);
	draw(word);
}

/**
 * Draws a Chinese character in the standard strok order.
 */
async function draw(word) {
	return new Promise(resolve => {
		setTimeout(() => {
			let character = document.getElementById('character');
			let charSize = 32;
			character.textContent = '';
			character.value = word.chinese.trim();
			switch (character.value.length) {
				case 1:
					charSize = 250;
					break;
				case 2:
					charSize = 130;
					break;
				case 3:
					charSize = 85;
					break;
				default:
					charSize = 32;
			};

			let chars = Array.from(character.value);
			let writer;
			for (let i = 0; i < chars.length; i++) {
				writer = HanziWriter.create('character', chars[i], {
					width: charSize,
					height: charSize,
					padding: 5,
					strokeColor: '#006400',
					showOutline: true,
					strokeAnimationSpeed: 1, // normal speed
					delayBetweenStrokes: 200 // milliseconds
				});
				if (isAnimation() && chars.length == 1) {
					writer.animateCharacter();
				}
			}
			resolve();
		}, 300);
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
 * Builds a category list from the allWords object as a clickable category selector
 */
function buildCategories() {
	const intervalId = setInterval(() => {
		if (allWords.length > 0) {
			clearInterval(intervalId);
			let word = null;
			let category = null;
			console.log('Start building categories');

			// build HTML elements for the clickable categories
			let id, cname, row, col;
			let colIdx = 0;
			let numCol = 6;
			let div = document.getElementById('category-row');
			div.innerHTML = '';
			for (let i = 0; i < allWords.length; i += numCol) {
				row = document.createElement('div');
				row.className = 'row';
				for (let j = 0; (j < numCol && colIdx < (allWords.length - 1)); j++) {
					colIdx = i + j;
					category = allWords[colIdx];
					id = category.category;
					cname = category.cname;
					col = document.createElement('div');
					col.id = id;
					col.className = 'col-sm-2 clickable';
					col.textContent = cname + ' - ' + id;
					// col.textContent = id;
					col.onclick = function () { setCategory(this.id); };
					row.appendChild(col);
				}
				div.appendChild(row);
			}
		}
	}, 100);
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
 * Uses Google's text to speech service to say the specified text.
 */
async function say(lang, id) {
	let tag = document.getElementById(id);
	let text = tag.textContent;
	if (text.length == 0) {
		text = tag.value;
	}
	if (text.length > 0) {
		talk(lang, text);
	}
}

/**
 * Uses Google's text to speech service to say the specified text.
 * Chinese Mandarin, female cmn-CN-Standard-A
 * Chinese Mandarin, female cmn-TW-Wavenet-A (better)
 * Chinese Cantonese, female yue-HK-Standard-A
 * English U.S., female en-US-Standard-E
 */
async function talk(lang, text) {
	let langCode, langName;

	if (lang == 'zh-CN') {
		langCode = 'cmn-CN';
		langName = 'cmn-TW-Wavenet-A'
	} else if (lang == 'yue-HK') {
		langCode = 'yue-HK';
		langName = 'yue-HK-Standard-A'
	} else {
		langCode = 'en-US';
		langName = 'en-US-Standard-E'
	}

	const requestBody = {
		input: {
			text: text
		},
		voice: {
			languageCode: langCode,
			name: langName
		},
		audioConfig: {
			audioEncoding: 'MP3',
			speakingRate: 0.9
		}
	};

	try {
		const response = await fetch(TTS_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (!response.ok) {
			return response.statusText;
		}

		const data = await response.json();
		const audioContent = data.audioContent;

		// Create a Blob from the base64 audio content  
		const audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], {
			type: 'audio/mp3'
		});
		const audioUrl = URL.createObjectURL(audioBlob);

		// Create a dynamic audio element  
		const audioElement = new Audio(audioUrl);
		audioElement.play().catch(error => {
			console.error('Error playing audio:', error);
			showError('Error playing audio:' + error.errorText);
		});

		// Remove the audio element after playback ends  
		audioElement.addEventListener('ended', () => {
			URL.revokeObjectURL(audioUrl); // Clean up the URL  
		});
	} catch (error) {
		console.error(error);
		showError(error.errorText);
	}
}

/**
 * If some text is highlighted in phrase or sentence elements, say the highlighted text.
 */
function sayHighlighted() {
	let selection = window.getSelection();
	let selectedText = selection.toString(); // Get the text of the selection
	if (selectedText.length > 0 && selection.rangeCount > 0) {
		let range = selection.getRangeAt(0); // Get the selected range
		let parentElement = range.commonAncestorContainer; // Get the common parent of the selection

		// Check if the parent element is inside the target element
		let wordEntry = document.getElementById('word-entry');
		if (wordEntry.contains(parentElement)) {
			talk('zh-CN', selectedText);
		}
	}
}

/**
 * Gets voice from a microphone, converts it to a text, gets pinyins of both
 * input text and the selected text, and finally checks if they are same. This is
 * used to practice pronunciation.
 */
async function speechCheck(lang, id) {
	clearSpeechSection();
	document.getElementById('speech-check').style.display = 'block';
	document.getElementById('recording').style.display = 'block';
	let text = document.getElementById(id).textContent;

	console.log("Calling recognition ...");
	recognizeSpeech(text);
}

/**
 * Checks if the pinyins of two texts are same.
 * Exactly same or there are some wrong tones.
 */
function checkPinyin(pinyin) {
	// TODO improve the comparison method
	// check tones
	let img = null;
	let textPinyin = removePuntuciation(pinyin.textPinyin);
	let inputTextPinyin = removePuntuciation(pinyin.inputTextPinyin);
	img = document.getElementById('recording');
	img.style.display = 'none';
	if (textPinyin.localeCompare(inputTextPinyin, undefined, { sensitivity: 'accent' }) === 0) {
		img = document.getElementById('great');
		img.style.display = 'block';
	} else {
		img = document.getElementById('try-again');
		img.style.display = 'block';
	}
	document.getElementById('recognization').style.display = 'block'
	document.getElementById('input-text').textContent = pinyin.inputText;
	document.getElementById('input-pinyin').textContent = pinyin.inputTextPinyin;
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
 * Turns on the microphone and the results of the pronunciation.
 */
function clearSpeechSection() {
	document.getElementById('speech-check').style.display = 'none';
	document.getElementById('try-again').style.display = 'none';
	document.getElementById('great').style.display = 'none';
	document.getElementById('recognization').style.display = 'none';
	showError('');
}

/** 
 * Gets speech from microphone and recognizes it to a text. 
 */
async function recognizeSpeech(text) {
	// 2.5 characters per second, 1 second minumum
	let waitTime = ((text.length < 3 ? 4 : text.length) / 2.5) * 1000;
	try {
		// Get microphone access
		let stream = await navigator.mediaDevices.getUserMedia({ audio: true });

		// Create MediaRecorder to capture audio
		let mediaRecorder = new MediaRecorder(stream);
		let audioChunks = [];

		mediaRecorder.ondataavailable = (event) => {
			audioChunks.push(event.data);
		};

		mediaRecorder.onstop = async () => {
			// Convert audio to Base64
			let audioBlob = new Blob(audioChunks, { type: 'audio/ogg; codecs=opus' });
			let base64Audio = await convertBlobToBase64(audioBlob);

			// Send audio to Google Speech-to-Text API
			transcribeAudio(text, base64Audio);
		};

		// Start recording
		mediaRecorder.start();
		console.log("Recording started...");

		// Stop recording after waitTime seconds (adjust as needed)
		setTimeout(() => {
			mediaRecorder.stop();
			console.log("Recording stopped.");
		}, waitTime);
	} catch (error) {
		console.error("Error accessing microphone:", error);
		showError("Error accessing microphone: " + error.errorText);
	}
}

/**
 * Converts Blob (audio file) to Base64
 */
function convertBlobToBase64(blob) {
	return new Promise((resolve) => {
		let reader = new FileReader();
		reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract Base64
		reader.readAsDataURL(blob);
	});
}

/**
 * Sends Base64 audio to Google Speech-to-Text API
 */
async function transcribeAudio(text, base64Audio) {
	// console.log("Base64 Audio (First 100 chars):", base64Audio.substring(0, 100));
	let requestBody = {
		config: {
			"encoding": "WEBM_OPUS",
			"sampleRateHertz": 48000,
			languageCode: "zh-CN",
			speechContexts: [
				{
					phrases: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
					boost: 20.0
				}
			]
		},
		audio: {
			content: base64Audio,
		},
	};

	try {
		let response = await fetch(STT_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestBody),
		})
		// .then(response => response.json())
		// // .then(data => console.log("API Response:", data))
		// .catch(error => console.error("Fetch Error:", error));

		if (!response.ok) {
			// Get raw response for debugging
			let errorText = await response.text();
			console.error("Speech-to-text error response:", errorText);
			showError("Speech-to-text error response:" + errorText);
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		let data = await response.json();
		console.log("Speech to text result:", data);

		if (data.results) {
			let inputText = data.results.map(result => result.alternatives[0].transcript).join(" ");
			console.log("Recognized Speech: " + inputText);
			getPinyin(text, inputText);
		} else {
			console.error("No speech detected!");
			showError("No speech detected!");
		}
	} catch (error) {
		console.error("Error transcribing audio:", error);
		showError("Speech-to-text error transcribing audio:" + error.errorText);
	}
}

/** 
 * Gets pinyins for comparing 
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
 * Checks the device
 */
function isMobile() {
	const userAgent = navigator.userAgent.toLowerCase();
	const isTouch = 'ontouchstart' in window;
	const width = window.innerWidth;

	return (/iphone|ipad|ipod/.test(userAgent) || /android/.test(userAgent) || isTouch && width <= 768 || isTouch && width > 768);
}

// Add event listeners for mouseup and keyup to detect text selection
if (!isMobile()) {
	document.addEventListener('mouseup', sayHighlighted);
	document.addEventListener('keyup', sayHighlighted);
}
