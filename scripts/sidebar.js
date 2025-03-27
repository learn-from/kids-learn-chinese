/**
 * Creates a sidebar when all words are ready to use.
 */
function createSidebar() {
	const intervalId = setInterval(() => {
		if (currentCategory.length > 0) {
			clearInterval(intervalId);
			buildWordList();
		}
	}, 100);
}

/**
 * Builds a word list of the current category
 */
function buildWordList() {
	let word = null;
	console.log('Start building a word list');
	let category = allWords.find(item => item.category == currentCategory);
	if (category == null) {
		return;
	}

	// build HTML elements for categories and their words
	let li;
	let id = category.category;

	// update the P element as the category title
	let p = document.getElementById('word-category');
	p.textContent = id + ' (' + category.words.length + ')';

	// update the UL element by creating a list of LI elements for the word list
	let ul = document.getElementById('word-list');
	// ul.innerHTML = '';
	while (ul.lastElementChild) {
		ul.removeChild(ul.lastElementChild);
	}
	// ul.id = id;
	for (let i = 0; i < category.words.length; i++) {
		word = category.words[i];
		if (word) {
			li = document.createElement('li');
			li.id = word.chinese + '-' + word.english;
			li.textContent = word.chinese + ' - ' + word.english;
			li.onclick = function () { updatePage(this.id); };
			// console.log(li.innerHTML);
			ul.appendChild(li);
		}
	}
	return category.words[0].chinese;
}
