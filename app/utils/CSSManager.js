
/**
 * This is loader utility to load a content page based on the value of the window.location.hash.
 */
export class CSSManager {

  static currentStyles = new Set();
  static allStyles = [
    {
      'category': 'character',
      'styles': ['./app/character/character.css', './app/character/print.css']
    },
    {
      'category': 'home',
      'styles': ['./app/home/home.css']
    },
    {
      'category': 'practice',
      'styles': ['./app/practice/practice.css']
    }
  ];

  constructor() { }

  static load(category) {
    // Remove all old styles
    this.clearAll();

    // Add the category specific styles
    let link, styles;
    this.allStyles.forEach(set => {
      if (set.category == category) {
        styles = set.styles;
        for (let i = 0; i < styles.length; i++) {
          link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = styles[i];
          link.dataset.dynamic = 'true';
          document.head.appendChild(link);
        }
      }
    });
    console.log(category, 'styles are loaded');
  }

  static unload(href) {
    const links = document.querySelectorAll(`link[rel="stylesheet"][href="${href}"]`);
    links.forEach(link => link.remove());
  }

  static clearAll() {
    document.querySelectorAll('link[data-dynamic="true"]').forEach(link => link.remove());
  }
}

