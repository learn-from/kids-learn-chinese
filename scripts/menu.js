
document.addEventListener('DOMContentLoaded', initMenuRows);

/**
 * Checks the device is a mobile device (iPhone or Android phone)
 */
function isMobile() {
	const userAgent = navigator.userAgent.toLowerCase();
	const isTouch = 'ontouchstart' in window;
	const width = window.innerWidth;

	// let ipad = isIpad();
	// let mobile = (/iphone/.test(userAgent) || /android/.test(userAgent));
	// let isMobile = (/iphone|ipod/.test(userAgent) || /android/.test(userAgent) || isTouch && width <= 768 || isTouch && width > 768);

	console.log("isTouch", isTouch, "width", width);
	console.log("userAgent", userAgent, "android", /android/.test(userAgent),
		"iphone|ipod", (/iphone|ipod/.test(userAgent)), "ipad", /ipad/.test(userAgent));

	return (/iphone|ipod/.test(userAgent) || /android/.test(userAgent));
	// return (/iphone|ipod/.test(userAgent) || /android/.test(userAgent) || isTouch && width <= 768 || isTouch && width > 768);
	// return (mobile && !iPad);
	// return false;
}

/**
 * Adds listeners to the menu bar buttons
 */
function initMenuRows() {

	// Use some mobile specific elements
	if (isMobile()) {
		document.getElementById('hamburger').style.display = 'block';
		return;
	}

	// document.getElementById('mobile-header').remove();
	// document.getElementById('mobile-container').remove();

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
 * Builds a category list from the allWords object as a clickable category selector
 */
function buildCategories() {
	let category = null;
	console.log('Start building categories');

	// build HTML elements for the clickable categories
	// if (isMobile()) {
	// 	buildMobildCategories();
	// } else {
	let id, cname, row, col;
	let colIdx = 0;
	let numCol = 4;
	let div = document.getElementById('category-row');
	div.innerHTML = '';
	for (let i = 0; i < allWords.length; i += numCol) {
		row = document.createElement('div');
		row.className = 'row';
		for (let j = 0; (j < numCol && colIdx < (allWords.length - 1)); j++) {
			colIdx = i + j;
			category = allWords[colIdx];
			id = category.category;
			cname = category.cname;
			col = document.createElement('div');
			col.id = id;
			col.className = 'col-sm-3 clickable';
			col.textContent = cname + ' - ' + id;
			col.onclick = function () { setCategory(this.id); };
			row.appendChild(col);
		}
		div.appendChild(row);
	}
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
	if (allWords.length == 0) {
		error.textContent = 'Refresh the page.';
		return null;
	}
	for (let i = 0; i < allWords.length; i++) {
		category = allWords[i];
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
 * Shows the siderar
 */
function toggleMenu() {
	let sidebar = document.getElementById("sidebar");
	let isOn = sidebar.style.display == 'block';
	sidebar.style.display = (isOn ? 'none' : 'block');
}

// Close menu if user clicks outside
window.onclick = function (event) {
	if (!event.target.matches('.hamburger')) {
		let sidebar = document.getElementById("sidebar");
		let isOn = sidebar.style.display = 'block';
		sidebar.style.display = (isOn ? 'none' : 'block');
	}
}
