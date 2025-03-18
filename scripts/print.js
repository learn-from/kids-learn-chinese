/**
 * Prints all words of the current category into a PDF file
 */
async function pagesToPDF(isAll) {
	let body = document.body;
	let origPage = body.innerHTML;

	let pageName, pageFooter, cname, ename;
	let cover, coverClone, category, pdfHolder, word, div, bodyClone;

	let categories = [];
	if (isAll) {
		categories = allWords;
	} else {
		categories.push(allWords.find(item => item.category == currentCategory));
	}

	for (let i = 0; i < categories.length; i++) {
		category = categories[i];
		pdfHolder = document.createElement('div');

		// Create a page name and page footer with category
		pageName = document.getElementById('page-name');
		pageFooter = document.getElementById('page-footer');
		cname = pageName.querySelector('#cname');
		ename = pageName.querySelector('#ename');
		cname.textContent = category.cname;
		ename.textContent = ' (' + category.category + ')';
		pageFooter.textContent = cname.textContent + ename.textContent;

		// Add the book cover to the pdf holder as the first page
		cover = document.getElementById('book-cover');
		coverClone = cover.cloneNode(true);
		coverClone.style.display = 'block';
		pdfHolder.appendChild(coverClone);

		// Create pages for all characters of the current category
		// and put them into a pdf holder
		setAnimation(false);
		for (let i = 0; i < category.words.length; i++) {
			word = category.words[i];
			buildWordEntry(word);
			await draw(word);
			await showPicture();
			setFontSizes();
			hideSymbols();
			bodyClone = document.body.cloneNode(true);
			div = document.createElement('div');
			div.replaceChildren(...bodyClone.children);
			div.className = 'char-item page-break'
			pdfHolder.appendChild(div);
		}
	}

	// print the pages
	body.innerHTML = '';
	body.appendChild(pdfHolder);
	window.print();

	// back to the original page
	body.innerHTML = origPage;
	setAnimation(true);
	buildCategories();
	buildWordList();
}

/**
 * Sets the font sizes for printing
 */
function setFontSizes() {
	let row = document.getElementById('character-row');
	let chinese = document.getElementById('chinese');
	let pinyin = document.getElementById('pinyin');
	let phrase = document.getElementById('phrase');
	let sentence = document.getElementById('sentence');
	row.style.marginTop = '-50px';
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
	const classNames = ['symbol', 'region-inner header-inner'];
	const iDs = ['header', 'category-words', 'word-search', 'category-row'];

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
