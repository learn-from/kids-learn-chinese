
document.addEventListener('DOMContentLoaded', initMenuRows);

/**
 * Checks the device
 */
async function isMobile() {
	const userAgent = navigator.userAgent.toLowerCase();
	const isTouch = 'ontouchstart' in window;
	const width = window.innerWidth;


	let mobile = (/iphone/.test(userAgent) || /android/.test(userAgent));
	let iPad = await isIpad();

	// return (/iphone|ipad|ipod/.test(userAgent) || /android/.test(userAgent) || isTouch && width <= 768 || isTouch && width > 768);
	return (mobile && !iPad);

}

async function isIpad() {
    if (navigator.userAgentData) {
        const data = await navigator.userAgentData.getHighEntropyValues(['platform', 'model']);
        if (data.platform === 'iOS' && data.model === 'iPad') {
            console.log("This is an iPad (userAgentData)");
            return true;
        }
    }

    // Fallback for browsers without userAgentData
    const ua = navigator.userAgent;
    if (ua.includes('iPad') || (ua.includes('Macintosh') && 'ontouchend' in document)) {
        console.log("This is an iPad (userAgent fallback)");
		return true;
    }
    return false;
}

/**
 * Adds listeners to the menu bar buttons
 */
function initMenuRows() {

	// Use some mobile specific elements
	if (isMobile()) {
		document.getElementById('header').remove();
		document.getElementById('container').remove();
		return;
	}

	document.getElementById('mobile-header').remove();
	document.getElementById('mobile-container').remove();

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
	if (isMobile()) {
		buildMobildCategories();
	} else {
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
}

/**
 * Builds a category list from the allWords object as a clickable category selector
 */
function buildMobildCategories() {
	let category = null;
	console.log('Start building mobile categories');

	// build HTML elements for the clickable categories
	let id, cname;
	// let div = document.getElementById('category-row');
	let cols = (isMobile() ? 2 : 5);
	let colLength = (isMobile() ? (allWords.length / cols) : allWords.length);
	colLength = parseInt(colLength);
	let start = 0;
	let ul, li, ulid = null;
	for (n = 0; n < cols; n++) {
		ulid = 'category-list' + (n + 1);
		// ul = document.getElementById(ulid);
		ul = document.querySelector('ul[data-list=' + ulid + ']');
		ul.innerHTML = '';
		ul.id = id;
		for (let i = start; i < colLength; i++) {
			category = allWords[(colLength * n) + i];
			if (category) {
				id = category.category;
				cname = category.cname;
				li = document.createElement('li');
				li.id = id;
				li.textContent = cname + ' - ' + id;
				li.onclick = function () { setCategory(this.id); };
				// console.log(li.innerHTML);
				ul.appendChild(li);
			}
		}
	}
}