
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
async function speechCheck(id) {
	clearSpeechSection();
	document.getElementById('speech-check').style.display = 'block';
	let img = document.getElementById('recording');
	img.src = RECORDING_IMG;
	let text = document.getElementById(id).textContent;

	console.log("Calling recognition ...");
	recognizeSpeech(text);
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
		showRecError("Error accessing microphone: " + error.errorText);
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
			showRecError("Speech-to-text error response:" + errorText);
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
			showRecError("No speech detected, try again and speak louder.");
		}
	} catch (error) {
		console.error("Error transcribing audio:", error);
		showRecError("Speech-to-text error transcribing audio:" + error.errorText);
	}
}
