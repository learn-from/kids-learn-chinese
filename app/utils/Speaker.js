
import { AllWords } from '../utils/AllWords.js';

/**
 * This is a speaker utility to use text-to-speech and speech-to-text for speaking and check pronounazation.
 */
export class Speaker {

	// static PROXY_URL = 'http://127.0.0.1:8080/';
	static PROXY_URL = 'https://key-manager-462519.uc.r.appspot.com/';
	static TTS_URL = Speaker.PROXY_URL + 'tts';
	static STT_URL = Speaker.PROXY_URL + 'stt';
	static PINYIN_URL = Speaker.PROXY_URL + 'pinyin';
	static RECORDING_IMAGE = "assets/images/greetings/talk-recording.jpg";

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

		let request = {
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
			const response = await fetch(Speaker.TTS_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(request)
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
				Speaker.showError('Error playing audio:' + error.errorText);
			});

			// Remove the audio element after playback ends  
			audioElement.addEventListener('ended', () => {
				URL.revokeObjectURL(audioUrl); // Clean up the URL  
			});
		} catch (error) {
			console.error("Error: " + error);
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
		img.src = Speaker.RECORDING_IMAGE;
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
	 * Recording time: 3 characters per second, 3 seconds minumum.
	 */
	async recognizeSpeech(text) {
		const speaker = Speaker.getInstance();
		const waitTime = (text.length < 4 ? 3 : (text.length / 3)) * 1000;
		try {
			// Get pinyin of the original text to match the recgnized text 
			const originalText = await speaker.getPinyin(text);

			// Get microphone access
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

			// Create MediaRecorder to capture audio
			const mediaRecorder = new MediaRecorder(stream);
			const audioChunks = [];

			mediaRecorder.ondataavailable = (event) => {
				audioChunks.push(event.data);
			};

			mediaRecorder.onstop = async () => {
				// Create an audio blob for sending to the STT service (only audio/webm works now)
				const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
				console.log("Blob size:", audioBlob.size, "type:", audioBlob.type, "rec time:", waitTime / 1000);

				// send the audio clip to Google Speech-to-Text API
				const formData = new FormData();
				formData.append('file', audioBlob, 'audio.webm');
				// formData.append('language', 'zh'); // optional but helpful
				try {
					const response = await fetch(Speaker.STT_URL, {
						method: "POST",
						body: formData
					});
					if (response.ok) {
						const recognizedText = await response.json();
						speaker.checkPinyin(originalText, recognizedText);
					} else {
						console.error("No speech detected, speak louder.", response.statusText);
						Speaker.showError("No speech detected, speak louder.");
					}
				} catch (error) {
					console.error("Error with Google STT API:", error);
					Speaker.showError("Error with Google STT API, try again.");
				}
			};

			// Start recording
			mediaRecorder.start();
			// console.log("Recording started...");

			// Stop recording after waitTime seconds
			setTimeout(() => {
				mediaRecorder.stop();
				// console.log("Recording stopped.");
			}, waitTime);
		} catch (error) {
			console.error("Error accessing microphone:", error);
			Speaker.showError("Error accessing microphone, try again.");
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
	 * Gets pinyin of the text using Google's translator. 
	 */
	async getPinyin(text) {
		let pinyin = {
			status: true,
			text: '',
			pinyin: '',
			error: ''
		}

		const request = {
			text: text
		}

		try {
			const response = await fetch(Speaker.PINYIN_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(request)
			});
			pinyin = await response.json();
		} catch (error) {
			pinyin.status = 'false';
			pinyin.error = 'Error with Google PINYIN API: ' + error.toString();
			console.error("Error: " + error.message);
		}
		return pinyin;
	}

	/**
	 * Checks if the pinyins of two texts are same.
	 * Exactly same or there are some wrong tones.
	 */
	checkPinyin(text1, text2) {
		const pinyin1 = this.removePuntuciation(text1.pinyin);
		const pinyin2 = this.removePuntuciation(text2.pinyin);
		const pinyin1Toneless = this.removeTones(pinyin1);
		const pinyin2Toneless = this.removeTones(pinyin2);

		let greatingImageId;
		let currentImageId = this.getCurrentGreetingImageId();
		if (pinyin1.localeCompare(pinyin2, undefined, { sensitivity: 'accent' }) === 0) {
			greatingImageId = AllWords.getGreetingImageId('great', currentImageId);
		} else if (pinyin1Toneless.localeCompare(pinyin2Toneless, undefined, { sensitivity: 'accent' }) === 0) {
			greatingImageId = AllWords.getGreetingImageId('ok', currentImageId);
		} else {
			greatingImageId = AllWords.getGreetingImageId('wrong', currentImageId);
		}
		this.showGreetingImage(greatingImageId);

		document.getElementById('recognization').style.display = 'block'
		document.getElementById('input-text').textContent = text2.text;
		document.getElementById('input-pinyin').textContent = text2.pinyin;
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