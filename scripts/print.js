/**
 * Prints all words of the current category into a PDF file
 */
async function pagesToPDF() {
	let body = document.body;
	let origPage = body.innerHTML;

	let category = allWords.find(item => item.category == currentCategory);
	let pdfHolder = document.createElement('div');
	let word, div, article = null;

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
	setAnimation(false);
	for (let i = 0; i < category.words.length; i++) {
		word = category.words[i];
		setFontSizes();
		hideSymbols();
		buildWordEntry(word);
		await draw(word);
		await showPicture();
		article = document.getElementById('article').parentElement.cloneNode(true);
		div = document.createElement('div');
		div.replaceChildren(...article.children);
		div.className = 'char-item page-break';
		pdfHolder.appendChild(div);
	}

	// print the pages
	body.innerHTML = '';
	body.appendChild(pdfHolder);
	// console.log(body.innerHTML);
	window.print();

	// restore the original page
	body.innerHTML = origPage;
	initMenuRows();
	setAnimation(true);
	buildCategories();
	buildWordList();
}

/**
 * Sets the font sizes for printing
 */
function setFontSizes() {
	let article = document.getElementById('article');
	let chinese = document.getElementById('chinese');
	let pinyin = document.getElementById('pinyin');
	let phrase = document.getElementById('phrase');
	let sentence = document.getElementById('sentence');
	
	// import! the following settings on 'article' make the page fit the 6x4 printing page size
	article.style.width = '82%'; 
	article.style.marginLeft = '4px';

	// make those text larger for printing
	pinyin.style.fontSize = '24px';
	chinese.style.fontSize = '36px';
	sentence.style.fontSize = '36px';
	phrase.style.fontSize = '36px';
	phrase.style.color = 'blue';
}

/**
 * Hides some elements so that they will not be printed.
 */
function hideSymbols() {
	const classNames = ['symbol', 'sidebar'];
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
