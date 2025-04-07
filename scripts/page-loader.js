async function loadPage() {
  const hash = window.location.hash.replace("#", "") || "character";
  const app = document.getElementById("app");

  try {
    await initHeader();
    const response = await fetch(`htmls/${hash}.html`);
    if (!response.ok)
      throw new Error("Page not found");
    const html = await response.text();
    app.innerHTML = html;
    buildCategories();
    switch (hash) {
      case 'character':
        updatePage('1-1');
        createSidebar();
        break;
    }
  } catch (err) {
    app.innerHTML = "<h2>404 - Page Not Found</h2>";
  }
}

window.addEventListener("hashchange", loadPage);
window.addEventListener("load", loadPage);
