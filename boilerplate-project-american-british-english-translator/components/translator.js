const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");
const britishSpellingToAmerican = {};
const britishToAmericanTitles = {};

for (let key in americanToBritishSpelling) {
  britishSpellingToAmerican[americanToBritishSpelling[key]] = key;
}
for (let key in americanToBritishTitles) {
  britishToAmericanTitles[americanToBritishTitles[key]] = key;
}

class Translator {
  trans(text, locale) {
    let translated = false;
    if (locale == "american-to-british") {
      if (this.checkAndReplace(text, americanOnly).translated) {
        text = this.checkAndReplace(text, americanOnly).text;
        translated = true;
      }

      if (this.checkAndReplace(text, americanToBritishSpelling).translated) {
        text = this.checkAndReplace(text, americanToBritishSpelling).text;
        translated = true;
      }
      if (
        this.checkAndReplace(text, americanToBritishTitles, true).translated
      ) {
        text = this.checkAndReplace(text, americanToBritishTitles, true).text;
        translated = true;
      }
    } else {
      // deal with "british-to-american"
      if (this.checkAndReplace(text, britishOnly).translated) {
        text = this.checkAndReplace(text, britishOnly).text;
        translated = true;
      }

      if (this.checkAndReplace(text, britishSpellingToAmerican).translated) {
        text = this.checkAndReplace(text, britishSpellingToAmerican).text;
        translated = true;
      }
      if (
        this.checkAndReplace(text, britishToAmericanTitles, true).translated
      ) {
        text = this.checkAndReplace(text, britishToAmericanTitles, true).text;
        translated = true;
      }
    }

    return translated ? text : "Everything looks good to me!";
  }

  addHighlight(str) {
    return `<span class="highlight">${str}</span>`;
  }

  checkAndReplace(text, dictionary, title) {
    let translated = false;
    const textLower = text.toLowerCase()
    let res = text

    for (let key in dictionary) {
      if (
        textLower.indexOf(key) !== -1 &&
        text[textLower.indexOf(key) - 1] === " " &&
        (textLower.indexOf(key) + key.length === text.length ||
          text[textLower.indexOf(key) + key.length] === " ")
      ) {
        const highlightedText = this.addHighlight(dictionary[key])
        res = res.split("")
        res
          .splice(
            textLower.indexOf(key),
            key.length,
            highlightedText
          )
          res = res.join("")
        translated = true;
      }
    }

    return { translated: translated, text: res };
  }
}

module.exports = Translator;
