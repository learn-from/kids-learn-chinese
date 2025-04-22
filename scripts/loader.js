

window.addEventListener("hashchange", loadPage);
window.addEventListener("DOMContentLoaded", loadPage);

/**
 * Loads header, sidebar and content dynamically according to the value of window.location.hash.
 */
async function loadPage() {

  let pageName = initPageInfo();
  let pageUrl = 'htmls/' + pageName + '.html';
  console.log('page URL:', pageUrl);

  try {
    let app = document.getElementById("app");
    let response = await fetch(pageUrl);
    if (!response.ok)
      throw new Error("Page not found:", pageUrl);
    let html = await response.text();
    app.innerHTML = html;
    switch (pageName) {
      case 'character':
        await initHeader();
        updatePage();
        createSidebar();
        break;
      case 'practice':
        break;
    }
  } catch (err) {
    console.error(err);
    app.innerHTML = "<h2>404 - Page Not Found - </h2>", "<p>" + pageUrl + "</p>";
  }
}

/**
 * Initializes the page information
 * @returns page name to be loaded
 */
function initPageInfo() {
  // the full window.location.hash looks like this #pageName/category/english
  let hash = window.location.hash.replace("#", "") || 'character';
  let names = hash.split('/');
  let pageName = names[0];
  if (names.length == 1) {
    names[1] = '';
  }
  let category = ALL_WORDS.find(item => item.category == names[1]);
  if (!category) {
    category = ALL_WORDS[0];
  }
  CURRENT_WORD.category = category.category;
  CURRENT_WORD.cname = category.cname;

  switch (names.length) {
    case 2: // category and the first word
      CURRENT_WORD.word = category.words[0];
      break;
    case 3:  // category and the English or Chinese word
    default:
      CURRENT_WORD.word = category.words.find(item => item.english == names[2] || item.chinese == names[2]);
      break;
  }
  return pageName;
}
