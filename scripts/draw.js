
/**
 * Redraws a Chinese character in the standard strok order.
 */
function redraw() {
	let chinese = document.getElementById('chinese');
	let english = document.getElementById('english');
	let word = findWord(chinese.textContent, english.textContent);
	draw(word);
}

/**
 * Draws a Chinese character in the standard strok order.
 */
async function draw(word) {
	return new Promise(resolve => {
		setTimeout(() => {
			let character = document.getElementById('character');
			character.textContent = '';
			character.value = word.chinese.trim();
			let charSize = getCharSize(character.value.length);

			let chars = Array.from(character.value);
			let writer;
			for (let i = 0; i < chars.length; i++) {
				writer = HanziWriter.create('character', chars[i], {
					width: charSize,
					height: charSize,
					padding: 5,
					strokeColor: '#006400',
					showOutline: true,
					strokeAnimationSpeed: 1, // normal speed
					delayBetweenStrokes: 200 // milliseconds
				});
				if (isAnimation() && chars.length == 1) {
					writer.animateCharacter();
				}
			}
			resolve();
		}, 300);
	});
}

/**
 * Gets the size of the image of the character to be drawn.
 * @param {*} charLength 
 * @returns 
 */
function getCharSize(charLength) {
	let charSize = 32;
	if (isMobile()) {
		switch (charLength) {
			case 1:
				charSize = 190;
				break;
			case 2:
				charSize = 90;
				break;
			case 3:
				charSize = 60;
				break;
			default:
				charSize = 32;
		};
	} else {
		switch (charLength) {
			case 1:
				charSize = 280;
				break;
			case 2:
				charSize = 140;
				break;
			case 3:
				charSize = 90;
				break;
			default:
				charSize = 32;
		};
	}
	return charSize;
}

function setAnimation(animation) {
	animation = animation;
}

function isAnimation() {
	return animation;
}
