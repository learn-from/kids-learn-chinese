import { Loader } from './utils/Loader.js';
import { AppUtils } from './utils/AppUtils.js';

/**
 * Sets some globally used event listeners.
 */
window.addEventListener("hashchange", Loader.loadPage);
window.addEventListener("DOMContentLoaded", Loader.loadPage);

// Close menu if user clicks outside
window.onclick = function (event) {
	if (AppUtils.isMobile()) {
		if (!event.target.matches('.hamburger')) {
			let sidebar = document.getElementById("sidebar");
			let isOn = sidebar.style.display = 'block';
			sidebar.style.display = (isOn ? 'none' : 'block');
		}
	}
}
