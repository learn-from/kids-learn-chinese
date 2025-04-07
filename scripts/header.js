
// document.addEventListener('DOMContentLoaded', initHeader);

/**
 * Checks the device is a mobile device (iPhone or Android phone)
 */
function isMobile() {
	const userAgent = navigator.userAgent.toLowerCase();
	// const isTouch = 'ontouchstart' in window;
	// const width = window.innerWidth;

	// let ipad = isIpad();
	// let mobile = (/iphone/.test(userAgent) || /android/.test(userAgent));
	// let isMobile = (/iphone|ipod/.test(userAgent) || /android/.test(userAgent) || isTouch && width <= 768 || isTouch && width > 768);

	// console.log("isTouch", isTouch, "width", width);
	console.log("userAgent", userAgent, "android", /android/.test(userAgent),
		"iphone|ipod", (/iphone|ipod/.test(userAgent)), "ipad", /ipad/.test(userAgent));

	return (/iphone|ipod/.test(userAgent) || /android/.test(userAgent));
	// return (/iphone|ipod/.test(userAgent) || /android/.test(userAgent) || isTouch && width <= 768 || isTouch && width > 768);
	// return (mobile && !iPad);
	// return false;
}

/**
 * Initializes the header, listeners and the content pages.
 */
async function initHeader() {

	await fetch("htmls/header.html")
		.then(response => response.text())
		.then(data => document.getElementById("header").innerHTML = data)
		.catch(error => console.error("Error loading header:", error));

	// Use some mobile specific elements
	if (isMobile()) {
		document.getElementById('hamburger').style.display = 'block';
		// document.getElementById('mobile-category-row').style.display = 'block';
		return;
	}

	// for desktop only
	let categoryBtn = document.getElementById('category-btn');
	categoryBtn.addEventListener("mouseover", function () {
		showMenuRow('category-row');
	});
	let usageBtn = document.getElementById('usage-btn');
	let printBtn = document.getElementById('print-btn');
	usageBtn.addEventListener("mouseover", function () {
		showMenuRow('usage-row');
	});
	usageBtn.addEventListener("mouseleave", function () {
		hideMenuRows('usage-row');
	});
	printBtn.addEventListener("click", function () {
		pagesToPDF(false);
	});
	document.addEventListener('mouseup', sayHighlighted);
	document.addEventListener('keyup', sayHighlighted);

	// add a hideMenuRows event to the document to hide the category menu when click on anywhere of the page.
	document.addEventListener("click", function () {
		document.getElementById('category-row').style.display = 'none';
	});

	// build the category list
	buildCategories();
}

/**
 * Hides all meun rows and shows the specified one.
 * @param {*} id 
 */
function showMenuRow(id) {
	hideMenuRows();
	document.getElementById(id).style.display = 'block';
}

/**
 * Hides all menu rows.
 */
function hideMenuRows() {
	document.getElementById('category-row').style.display = 'none';
	if (!isMobile())
		document.getElementById('usage-row').style.display = 'none';
}

/**
 * Builds a category list from the ALL_WORDS object as a clickable category selector
 */
function buildCategories() {

	console.log('Start building categories');
	let category = null;
	let categoryTagId;
	let rowTagName = 'tr';
	let colTagName = 'td';
	let colTagClass = 'clickable';
	let numCol;
	if (isMobile()) {
		categoryTagId = 'mobile-category-row';
		document.getElementById(categoryTagId).style.display = 'block';
		numCol = 4;
	} else {
		categoryTagId = 'category-row';
		numCol = 6;
	}

	// build HTML elements for the clickable categories
	let id, cname, row, col;
	let colIdx = 0;
	let table = document.getElementById(categoryTagId);
	let div = table.getElementsByTagName('tbody')[0];
	div.innerHTML = '';
	for (let i = 0; i < ALL_WORDS.length; i += numCol) {
		row = document.createElement(rowTagName);
		for (let j = 0; (j < numCol && colIdx < (ALL_WORDS.length - 1)); j++) {
			colIdx = i + j;
			category = ALL_WORDS[colIdx];
			id = category.category;
			cname = category.cname;
			col = document.createElement(colTagName);
			col.id = id;
			col.className = colTagClass;
			if (isMobile()) {
				col.textContent = id;
			} else {
				col.textContent = cname + ' - ' + id;
			}
			col.onclick = function () { setCategory(this.id); };
			row.appendChild(col);
		}
		div.appendChild(row);
	}
	// console.log(div.outerHTML);
}

/**
 * Searches a word (Chinese or English) from the allWord list. Note that if the word
 * is not unique in the list, returns the first one.
 */
function searchWord() {
	let value = document.getElementById('search-word').value.trim();
	let error = document.getElementById('search-error');
	error.textContent = '';

	let category, words, word;
	if (ALL_WORDS.length == 0) {
		error.textContent = 'Refresh the page.';
		return null;
	}
	for (let i = 0; i < ALL_WORDS.length; i++) {
		category = ALL_WORDS[i];
		words = category.words;
		word = words.find(item => (item.chinese == value || item.english.toLowerCase() == value.toLowerCase()));
		if (word != null) {
			currentCategory = category.category;
			break;
		}
	}

	if (word == null) {
		error.textContent = 'No this word: ' + value;
	} else {
		buildWordEntry(word);
		draw(word);
		buildWordList();
	}
}

/**
 * Uses RETURN key instead of button for searching
 */
function enterKeyPressed(event) {
	if (event.keyCode == 13) {
		searchWord();
	}
}

/**
 * Shows/hides the hamburger siderar for mobile devices
 */
function toggleMenu() {
	if (isMobile()) {
		let sidebar = document.getElementById("sidebar");
		let isOn = sidebar.style.display == 'block';
		sidebar.style.display = (isOn ? 'none' : 'block');
	}
}

// Close menu if user clicks outside
window.onclick = function (event) {
	if (isMobile()) {
		if (!event.target.matches('.hamburger')) {
			let sidebar = document.getElementById("sidebar");
			let isOn = sidebar.style.display = 'block';
			sidebar.style.display = (isOn ? 'none' : 'block');
		}
	}
}
