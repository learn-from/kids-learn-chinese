
document.addEventListener('DOMContentLoaded', initMenuRows);
let categoryRow, usageRow //; printRow;

function initMenuRows() {
	categoryRow = document.getElementById('category-row');
	// printRow = document.getElementById('print-row');
	usageRow = document.getElementById('usage-row');

	addEvents(categoryRow);
	// addEvents(printRow);
	addEvents(usageRow);

	let categoryBtn = document.getElementById('category-btn');
	let printBtn = document.getElementById('print-btn');
	let usageBtn = document.getElementById('usage-btn');
	categoryBtn.addEventListener("click", function () { showMenuRow('category-row'); });
	printBtn.addEventListener("click", function () { pagesToPDF(false); });
	usageBtn.addEventListener("click", function () { showMenuRow('usage-row'); });
	// categoryBtn.addEventListener("mouseleave", function () { showMenuRow('category-row'); });
	// printBtn.addEventListener("mouseleave", function () { showMenuRow('print-row'); });
	// usageBtn.addEventListener("mouseleave", function () { showMenuRow('usage-row'); });
}

function addEvents(row) {
	row.addEventListener("mouseleave", function () {
		hideMenuRows();
	});
	row.addEventListener("click", function () {
		hideMenuRows();
	});
}

function showMenuRow(id) {
	let row = document.getElementById(id);
	let display = row.style.display;
	hideMenuRows();
	if (display == 'block')
		row.style.display = 'none';
	else
		row.style.display = 'block';
}

function hideMenuRows() {
	categoryRow.style.display = 'none';
	// printRow.style.display = 'none';
	usageRow.style.display = 'none';
}

/**
 * Builds a category list from the allWords object as a clickable category selector
 */
function buildCategories() {
	const intervalId = setInterval(() => {
		if (allWords.length > 0) {
			clearInterval(intervalId);
			let word = null;
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
					// col.textContent = id;
					col.onclick = function () { setCategory(this.id); };
					row.appendChild(col);
				}
				div.appendChild(row);
			}
		}
	}, 100);
}
