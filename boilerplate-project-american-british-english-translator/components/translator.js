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
        this.checkAndReplace(text, americanToBritishTitles).translated
      ) {
        text = this.checkAndReplace(text, americanToBritishTitles).text;
        translated = true;
      }
      if (this.timeFormat(text, 'be').translated) {
        text = this.timeFormat(text, 'be').text
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
        this.checkAndReplace(text, britishToAmericanTitles).translated
      ) {
        text = this.checkAndReplace(text, britishToAmericanTitles).text;
        translated = true;
      }
      if (this.timeFormat(text, 'ae').translated) {
        text = this.timeFormat(text, 'ae').text
        translated = true;
      }
    }

    return translated ? text : "Everything looks good to me!";
  }

  timeFormat(text, to){
    let translated = false;
    let format = to == 'be' ? ':' : '.' 
    if(!text.includes(format)) return { translated: translated, text: text };
    let arr = text.split('')
    let highlightArr = [], start, end
    arr = arr.map((x, i) => {
        if(x === format && i !== 0 && i !== text.length-1 && !isNaN(+ text[i - 1]) && !isNaN(+ text[i + 1])) {
          start = !isNaN(+ text[i - 2]) ? -1 : 0;
          end  = !isNaN(+ text[i + 2]) ? 1 : 0;
          highlightArr.push({
            i: i,
            start,
            end
          })
          translated = true
          return to == 'be' ? '.' : ':' 
        }
        return x
    })
    if(translated) {
        highlightArr.forEach(x => {
            const startIndex = x.i - 1 + x.start
                , endIndex = x.i + 1 + x.end
            const insert = arr.slice(startIndex, endIndex + 1).join('')
            arr.splice(startIndex, insert.length, this.addHighlight(insert))
        })
            
    }
    return { translated: translated, text: arr.join('') };
  }

  addHighlight(str) {
    return `<span class="highlight">${str}</span>`;
  }

  checkAndReplace(text, dictionary) {
    let translated = false;

    for (let key in dictionary) {
      let textLower = text.toLowerCase()
      if (
        textLower.indexOf(key) !== -1 &&
        (text[textLower.indexOf(key) - 1] === " " || textLower.indexOf(key) === 0)&&
        (textLower.indexOf(key) + key.length === text.length ||
          text[textLower.indexOf(key) + key.length] === " ")
      ) {
        let highlightedText;
        if(dictionary.mr || dictionary['mr.']) {
            highlightedText = this.addHighlight(dictionary[key][0].toUpperCase() + dictionary[key].slice(1))
        } else {
            highlightedText = this.addHighlight(dictionary[key])
        }
        
    
        text = text.split("")
        text
          .splice(
            textLower.indexOf(key),
            key.length,
            highlightedText
          )
        text = text.join("")
        translated = true;
      }
    }
    return { translated: translated, text: text };
  }
}

module.exports = Translator;
