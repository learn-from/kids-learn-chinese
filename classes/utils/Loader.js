
import { AllWords } from './AllWords.js';
import { Home } from '../pages/Home.js';
import { Character } from '../pages/Character.js';
import { Practice } from '../pages/Practice.js';

// import { HomeHeader } from '../headers/HomeHeader.js';
// import { CharacterHeader } from '../headers/CharacterHeader.js';
// import { PracticeHeader } from '../headers/PracticeHeader.js';

/**
 * This is loader utility to load a content page based on the value of the window.location.hash.
 */
export class Loader {

  constructor() { }

	static getInstance() {
		if (!Loader._instance) {
			Loader._instance = new Loader();
		}
		return Loader._instance;
	}

  /**
   * Loads header, sidebar and content dynamically according to the value of window.location.hash.
   */
  static async loadPage() {
    const loader = Loader.getInstance();
    let pageName = loader.initPageInfo();
    // let pageUrl = 'htmls/' + pageName + '/' + pageName + '.html';
    console.log('page name:', pageName);

    try {
      let content;
      switch (pageName) {
        case 'home':
          content = new Home();
          content.loadPage();
          break;
        case 'character':
          content = new Character();
          content.loadPage();
          break;
        case 'practice':
          content = new Practice();
          content.loadPage();
          break;
      }
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Initializes the page information
   * @returns page name to be loaded
   */
  initPageInfo() {
    // the full window.location.hash looks like this #pageName/category/english/chinese
    let hash = window.location.hash.replace("#", "") || 'home';
    if (hash.length == 0) {
      return ''
    }
    hash = decodeURIComponent(hash);
    let names = hash.split('/');
    let pageName = names[0];
    names.shift();
    AllWords.findAndSetWord3(names);
    return pageName;
  }
}

