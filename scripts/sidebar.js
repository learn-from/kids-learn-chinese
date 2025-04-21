/**
 * Creates a sidebar when all words are ready to use.
 */
function createSidebar() {
	console.log('Start building a word list');
	let word = null;
	let category = ALL_WORDS.find(item => item.category == CURRENT_WORD.category);

	// build HTML elements for categories and their words
	let li;
	let id = category.category;

	// update the P element as the category title
	// TODO add a category icon
	let p = document.getElementById('word-category');
	let icon = document.createElement('img');
	icon.src = getCategoryIcon(id);
	icon.className = 'category-icon';
	let text = document.createTextNode(' ' + id + ' (' + category.words.length + ')');
	p.appendChild(icon);
	p.appendChild(text);

	// update the UL element by creating a list of LI elements for the word list
	let ul = document.getElementById('word-list');
	ul.innerHTML = '';
	// ul.id = id;
	let link;
	for (let i = 0; i < category.words.length; i++) {
		word = category.words[i];
		if (word) {
			li = document.createElement('li');
			li.id = word.chinese + '-' + word.english;
			link = document.createElement('a');
			link.href = '#character/' + id + '/' + word.english;
			link.textContent = word.chinese + ' - ' + word.english;
			li.appendChild(link);
			ul.appendChild(li);
		}
	}
	return category.words[0].chinese;
}
