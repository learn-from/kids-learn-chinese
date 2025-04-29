
/**
 * Constants used by the entire project.
 */
export class Constants {

	static getApiKey() {
		return 'AIzaSyCaC2KBiX526c7b214OG65G8fJXYINT3Rk';
	}

	static getTtsUrl() {
		return 'https://texttospeech.googleapis.com/v1/text:synthesize?key=' + this.getApiKey();
	}

	static getSttUrl() {
		return 'https://speech.googleapis.com/v1/speech:recognize?key=' + this.getApiKey();
	}

	static getTranslatorUrl() {
		return 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=en&dt=t&dt=rm&q=';
	}

	static getDefaultImage() {
		return 'images/site/question-mark.png';
	}

	static getRecordingImage() {
		return "images/greetings/talk-recording.jpg";
	}
}