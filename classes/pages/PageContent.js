

/**
 * The abstract class of all content pages (Character, Practice, etc.)
 */
export class PageContent {

	static pageName = null;

	constructor() {
	}

	/**
	 * Sets the page name for loading the page content
	 * @param {*} pageName 
	 */
	setPageName(pageName) {
		this.pageName = pageName;
	}

	/**
	 * Loads the character page content.
	 */
	async loadPage() {
		this.header.initHeader();
		let pageUrl = 'htmls/' + this.pageName + '/' + this.pageName + '.html';
		let content = document.getElementById("page-content");

		// load the page html code only when the content section is empty
		if (this.isContentEmpty()) {
			try {
				let response = await fetch(pageUrl);
				if (!response.ok)
					throw new Error("Page not found:", pageUrl);
				let html = await response.text();
				content.innerHTML = html;
			} catch (err) {
				console.error(err);
			}
		}

		this.updatePage();
	}

	/**
	 * Checks if the content section is empty
	 */
	isContentEmpty() {}

	/**
	 * Updates the page content accordingly.
	 */
	updatePage() {}
}