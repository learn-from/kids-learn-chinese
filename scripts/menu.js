
document.addEventListener('DOMContentLoaded', initMenuRows);

/**
 * Adds listeners to the menu bar buttons
 */
function initMenuRows() {

	let categoryBtn = document.getElementById('category-btn');
	let usageBtn = document.getElementById('usage-btn');
	let printBtn = document.getElementById('print-btn');
	categoryBtn.addEventListener("mouseover", function () {
		showMenuRow('category-row');
	});
	usageBtn.addEventListener("mouseover", function () {
		showMenuRow('usage-row');
	});
	usageBtn.addEventListener("mouseleave", function () {
		hideMenuRows('usage-row');
	});
	printBtn.addEventListener("click", function () {
		pagesToPDF(false);
	});

	// add a hideMenuRows event to the document to hide any open menu when click on anywhere of the page.
	document.addEventListener("click", function () {
		hideMenuRows();
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
	document.getElementById('usage-row').style.display = 'none';
}

/**
 * Builds a category list from the allWords object as a clickable category selector
 */
function buildCategories() {
	const intervalId = setInterval(() => {
		if (allWords.length > 0) {
			clearInterval(intervalId);
			let category = null;
			console.log('Start building categories');

			// build HTML elements for the clickable categories
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
	}, 100);
}
