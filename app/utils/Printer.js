
import { AllWords } from './AllWords.js';
import { Painter } from './Painter.js';
import { Character } from '../character/Character.js';

/**
 * This is a printer utility to print character cards to printer/PDF.
 */
export class Printer {

	constructor() {
		this.character = new Character();
	}

	/**
	 * Creates an instance of this class to implement the lazy singleton pattern
	 * @returns 
	 */
	static getInstance() {
		if (!Printer._instance) {
			Printer._instance = new Printer();
		}
		return Printer._instance;
	}

	static printPages() {
		const printer = Printer.getInstance();
		printer.pagesToPDF();
	}

	/**
	 * Prints all words of the current category into a PDF file
	 */
	async pagesToPDF() {

		// save the current page <body> to restore after printing
		let body = document.body;
		let bodyOrig = body.innerHTML;

		let category = AllWords.getCategory(AllWords.getCurrentWord().category);
		let pdfHolder = document.createElement('div');
		let word, div, contents = null;

		// Create a page name and page footer with the category info
		let pageName = document.getElementById('page-name');
		let pageFooter = document.getElementById('page-footer');
		let cname = pageName.querySelector('#cname');
		let ename = pageName.querySelector('#ename');
		cname.textContent = category.cname;
		ename.textContent = ' (' + category.category + ')';
		pageFooter.textContent = cname.textContent + ename.textContent;

		// Add the book cover to the pdf holder as the first page
		let cover = document.getElementById('book-cover').cloneNode(true);
		cover.style.display = 'block';
		pdfHolder.appendChild(cover);

		// Create pages for all characters of the current category
		// and put them into a pdf holder
		Painter.setAnimation(false);
		for (let i = 0; i < category.words.length; i++) {
			word = category.words[i];
			this.setFontSizes();
			this.hideSymbols();
			AllWords.setCurrentWord3(category.category, category.cname, word);
			this.character.buildWordEntry();
			await Painter.draw();
			await Character.showPicture();
			contents = document.getElementById('contents').parentElement.cloneNode(true);
			div = document.createElement('div');
			div.replaceChildren(...contents.children);
			div.className = 'char-item page-break';
			pdfHolder.appendChild(div);
		}

		// push all cards into the <body> tag and print the pages
		body.innerHTML = '';
		body.appendChild(pdfHolder);
		// console.log(body.innerHTML);
		window.print();

		// restore the original page
		body.innerHTML = bodyOrig;
		location.reload();
		Painter.setAnimation(true);
	}

	/**
	 * Sets the font sizes for printing.
	 * IMPORTANT! the following settings on 'contents' make the page fit the 6x4 printing page siz
	 */
	setFontSizes() {

		// set some elements' position for printing
		let contents = document.getElementById('contents');
		let sidebar = document.getElementById('sidebar');
		let characterCard = document.getElementById('character-card');
		let pictureCard = document.getElementById('picture-card');
		let wordCard = document.getElementById('word-card');
		contents.style.width = '98%';
		contents.style.padding = '4px';
		if (sidebar)
			sidebar.remove();
		characterCard.style.width = '48%';
		pictureCard.style.width = '44%';
		pictureCard.style.marginTop = '20px';
		pictureCard.style.marginLeft = '-40px';
		wordCard.style.marginTop = '16px';
		wordCard.style.marginLeft = '24px';

		// make those text larger for printing
		let chinese = document.getElementById('chinese');
		let pinyin = document.getElementById('pinyin');
		let phrase = document.getElementById('phrase');
		let sentence = document.getElementById('sentence');

		pinyin.style.fontSize = '24px';
		chinese.style.fontSize = '32px';
		sentence.style.fontSize = '32px';
		phrase.style.fontSize = '32px';
		phrase.style.color = 'blue';
	}

	/**
	 * Hides some elements so that they will not be printed.
	 */
	hideSymbols() {
		const classNames = ['speaker', 'mandarin', 'cantonese'];
		const iDs = ['header', 'category-words', 'word-search', 'category-row', 'usage-row', 'speech-check', 'error-message', 'textCanvas'];

		let element = null;
		for (let i = 0; i < classNames.length; i++) {
			element = document.getElementsByClassName(classNames[i]);
			for (let j = 0; j < element.length; j++) {
				if (element[j]) {
					element[j].style.display = 'none';
				}
			}
		}

		for (let i = 0; i < iDs.length; i++) {
			element = document.getElementById(iDs[i]);
			if (element) {
				element.style.display = 'none';
			}
		}
	}
}
