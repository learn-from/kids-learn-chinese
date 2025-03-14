/**
 * Creates a sidebar when all words are ready to use.
 */
function createSidebar() {
	const intervalId = setInterval(() => {
		if (currentCategory.length > 0) {
			clearInterval(intervalId);
			buildWordList();
		}
	}, 200);
}

/**
 * Builds a word list for the current category
 */
function buildWordList() {
	let word = null;
	console.log('Start building a word list');
	let category = allWords.find(item => item.category == currentCategory);
	if (category == null) {
		return;
	}

	// build HTML elements for categories and their words
	let id, p, ul, li;
	let div = document.getElementById('category-words');
	div.innerHTML = '';
	id = category.category;

	// create a P element as the category title
	p = document.createElement('p');
	p.className = 'word-category';
	p.textContent = id + ' (' + category.words.length + ') 🖨️'; // 🖶 doesn't work '🖨️';
	p.onclick = function () { pagesToPDF(); };

	// create a UL element and a list of LI elements for the word list
	ul = document.createElement('ul');
	ul.id = id;
	ul.className = 'word';
	for (let j = 0; j < category.words.length; j++) {
		word = category.words[j];
		li = document.createElement('li');
		li.id = word.chinese + '-' + word.english;
		li.textContent = word.chinese + ' - ' + word.english;
		li.onclick = function () { updatePage(this.id); };
		console.log(li.innerHTML);
		ul.appendChild(li);
	}
	div.appendChild(p);
	div.appendChild(ul);
	return category.words[0].chinese;
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

function enterKeyPressed(event) {
	if (event.keyCode == 13) {
		searchWord();
	}
}
