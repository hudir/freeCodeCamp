const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    noTranslation = "Everything looks good to me!"

    trans(text, locale){
        let arr = text.split(' ')

    }

    addHighlight(str){
        return `<span class="highlight">${str}</span>`
    }

}

module.exports = Translator;