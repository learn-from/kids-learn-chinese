
import { AllWords } from '../utils/AllWords.js';
import { Constants } from '../utils/Constants.js';

/**
 * This is a speaker utility to use text-to-speech and speech-to-text for speaking and check pronounazation.
 */
export class Speaker {

	constructor() { 
	}

	/**
	 * Creates an instance of this class to implement the lazy singleton pattern
	 * @returns 
	 */
	static getInstance() {
		if (!Speaker._instance) {
			Speaker._instance = new Speaker();
		}
		return Speaker._instance;
	}

	/**
	 * Uses Google's text to speech service to say the specified text.
	 */
	static async say(lang, id) {
		const speaker = Speaker.getInstance();
		let tag = document.getElementById(id);
		let text = tag.textContent;
		if (text.length == 0) {
			text = tag.value;
		}
		if (text.length > 0) {
			speaker.talk(lang, text);
		}
	}

	/**
	 * Uses Google's text to speech service to say the specified text.
	 * Chinese Mandarin, female cmn-CN-Standard-A
	 * Chinese Mandarin, female cmn-TW-Wavenet-A (better)
	 * Chinese Cantonese, female yue-HK-Standard-A
	 * English U.S., female en-US-Standard-E
	 */
	async talk(lang, text) {
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

		let requestBody = {
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
			let response = await fetch(Constants.getTtsUrl(), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(requestBody)
			});

			if (!response.ok) {
				return response.statusText;
			}

			let data = await response.json();
			let audioContent = data.audioContent;

			// Create a Blob from the base64 audio content  
			let audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], {
				type: 'audio/mp3'
			});
			let audioUrl = URL.createObjectURL(audioBlob);

			// Create a dynamic audio element  
			let audioElement = new Audio(audioUrl);
			audioElement.play().catch(error => {
				console.error('Error playing audio:', error);
				this.showError('Error playing audio:' + error.errorText);
			});

			// Remove the audio element after playback ends  
			audioElement.addEventListener('ended', () => {
				URL.revokeObjectURL(audioUrl); // Clean up the URL  
			});
		} catch (error) {
			console.error(error);
			this.showError(error.errorText);
		}
	}

	/**
	 * Preloads all the voice recognizating images as they occationaly don't show up.
	 */
	preloadRecImages(elementId) {
		let signCard = document.getElementById(elementId);
		if (signCard.getElementsByTagName("IMG").length < 2) {
			let images = AllWords.loadGreetingImages();
			signCard.append(...images);
		}
	}

	/**
	 * If some text is highlighted in phrase or sentence elements, say the highlighted text.
	 */
	sayHighlighted() {
		let selection = window.getSelection();
		let selectedText = selection.toString(); // Get the text of the selection
		if (selectedText.length > 0 && selection.rangeCount > 0) {
			let range = selection.getRangeAt(0); // Get the selected range
			let parentElement = range.commonAncestorContainer; // Get the common parent of the selection

			// Check if the parent element is inside the target element
			let wordEntry = document.getElementById('word-entry');
			if (wordEntry.contains(parentElement)) {
				this.talk('zh-CN', selectedText);
			}
		}
	}

	/**
	 * Gets voice from a microphone, converts it to a text, gets pinyins of both
	 * input text and the selected text, and finally checks if they are same. This is
	 * used to practice pronunciation.
	 */
	static async speechCheck(id) {
		const speaker = Speaker.getInstance();
		speaker.hideSpeechSection();
		document.getElementById('speech-check').style.display = 'block';
		let img = document.getElementById('recording');
		img.src = Constants.getRecordingImage();
		img.style.display = 'block';
		let text = document.getElementById(id).textContent;

		// console.log("Calling recognition ...");
		speaker.recognizeSpeech(text);
	}

	/**
	 * Turns all greeting images except the specified one.
	 * @param {*} imgId 
	 */
	showGreetingImage(imgId) {
		let signCard = document.getElementById('speech-sign-card');
		let images = signCard.getElementsByTagName("IMG");
		for (let i = 0; i < images.length; i++) {
			if (images[i].id == imgId) {
				images[i].style.display = 'block';
			} else {
				images[i].style.display = 'none';
			}
		}
	}

	/**
	 * Gets the current greeting image id.
	 */
	getCurrentGreetingImageId() {
		let signCard = document.getElementById('speech-sign-card');
		let images = signCard.getElementsByTagName("IMG");
		let id = null;
		for (let i = 0; i < images.length; i++) {
			if (images[i].style.display == 'block') {
				id = images[i].id;
			}
		}
		return id;
	}

	/** 
	 * Gets speech from microphone and recognizes it to a text. 
	 */
	async recognizeSpeech(text) {
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
				let base64Audio = await this.convertBlobToBase64(audioBlob);

				// Send audio to Google Speech-to-Text API
				this.transcribeAudio(text, base64Audio);
			};

			// Start recording
			mediaRecorder.start();
			// console.log("Recording started...");

			// Stop recording after waitTime seconds (adjust as needed)
			setTimeout(() => {
				mediaRecorder.stop();
				// console.log("Recording stopped.");
			}, waitTime);
		} catch (error) {
			console.error("Error accessing microphone:", error);
			this.showRecError("Error accessing microphone: " + error.errorText);
		}
	}

	/**
	 * Converts Blob (audio file) to Base64
	 */
	convertBlobToBase64(blob) {
		return new Promise((resolve) => {
			let reader = new FileReader();
			reader.onloadend = () => resolve(reader.result.split(',')[1]); // Extract Base64
			reader.readAsDataURL(blob);
		});
	}

	/**
	 * Sends Base64 audio to Google Speech-to-Text API
	 */
	async transcribeAudio(text, base64Audio) {
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
			let response = await fetch(Constants.getSttUrl(), {
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
				this.showRecError("Speech-to-text error response:" + errorText);
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			let data = await response.json();
			// console.log("Speech to text result:", data);

			if (data.results) {
				let inputText = data.results.map(result => result.alternatives[0].transcript).join(" ");
				// console.log("Recognized Speech: " + inputText);
				this.getPinyin(text, inputText);
			} else {
				console.error("No speech detected!");
				this.showRecError("No speech detected, try again and speak louder.");
			}
		} catch (error) {
			console.error("Error transcribing audio:", error);
			this.showRecError("Speech-to-text error transcribing audio:" + error.errorText);
		}
	}

	/** 
	 * Gets pinyins using Google's translator for comparing 
	 */
	async getPinyin(text, inputText) {
		let encodedText = encodeURIComponent(text);
		let encodedInputText = encodeURIComponent(inputText);
		let urlText = Constants.getTranslatorUrl() + encodedText;
		let urlInputText = Constants.getTranslatorUrl() + encodedInputText;

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
		this.checkPinyin(pinyin);
	}

	/**
	 * Checks if the pinyins of two texts are same.
	 * Exactly same or there are some wrong tones.
	 */
	checkPinyin(pinyin) {
		// check tones
		let textPinyin = this.removePuntuciation(pinyin.textPinyin);
		let inputTextPinyin = this.removePuntuciation(pinyin.inputTextPinyin);
		let textPinyinToneless = this.removeTones(textPinyin);
		let inputTextPinyinToneless = this.removeTones(inputTextPinyin);
		let greatingImageId;
		let currentImageId = this.getCurrentGreetingImageId();
		if (textPinyin.localeCompare(inputTextPinyin, undefined, { sensitivity: 'accent' }) === 0) {
			greatingImageId = AllWords.getGreetingImageId('great', currentImageId);
		} else if (textPinyinToneless.localeCompare(inputTextPinyinToneless, undefined, { sensitivity: 'accent' }) === 0) {
			greatingImageId = AllWords.getGreetingImageId('ok', currentImageId);
		} else {
			greatingImageId = AllWords.getGreetingImageId('wrong', currentImageId);
		}
		this.showGreetingImage(greatingImageId);

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
	removeTones(pinyin) {
		return pinyin
			.normalize("NFD") // Normalize Unicode
			.replace(/[\u0300-\u036f]/g, "");
	}

	/**
	 * Removes all the puntuciation marks (English, Chinese and spaces)
	 */
	removePuntuciation(text) {
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
	static clearSpeechSection() {
		const speaker = Speaker.getInstance();
		speaker.hideSpeechSection();
	}

	hideSpeechSection() {
		document.getElementById('recognization').style.display = 'none';
		document.getElementById('speech-check').style.display = 'none';
		this.showGreetingImage('none'); // turn off all greeting images
		this.showErrorMsg('');
	}

	/**
	 * Displays an error message
	 */
	static showError(message) {
		const speaker = Speaker.getInstance();
		speaker.showErrorMsg(message);
	}

	showErrorMsg(message) {
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
	showRecError(message) {
		document.getElementById('recognization').style.display = 'block';
		document.getElementById('input-text').textContent = '';
		document.getElementById('input-pinyin').textContent = '';
		document.getElementById('rec-error').textContent = message;
		document.getElementById('rec-error').style.display = 'block';
		document.getElementById('recording').style.display = 'none';

		let greetingImage = AllWords.getRandomImage('All');
		let img = document.getElementById('recording');
		img.src = greetingImage.wrong;
		img.style.display = 'block';
	}
}

window.Speaker = Speaker;