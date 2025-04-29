
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

}
