const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')
const britishSpellingToAmerican = {}
const britishToAmericanTitles = {}

for (let key in americanToBritishSpelling) {
    britishSpellingToAmerican[americanToBritishSpelling[key]] = key
}
for (let key in americanToBritishTitles) {
    britishToAmericanTitles[americanToBritishTitles[key]] = key
}

class Translator {
    noTranslation = "Everything looks good to me!"

    trans(text, locale){
        let translated = false;
        if(locale == "american-to-british"){
            if(this.checkAndReplace(text, americanOnly).translated){
                text = this.checkAndReplace(text, americanOnly).text
                translated = true
            }

            if(this.checkAndReplace(text, americanToBritishSpelling).translated){
                text = this.checkAndReplace(text, americanToBritishSpelling).text
                translated = true
            }
            if(this.checkAndReplace(text, americanToBritishTitles, true).translated){
                text = this.checkAndReplace(text, americanToBritishTitles, true).text
                translated = true
            }
        } else { // deal with "british-to-american"
            if(this.checkAndReplace(text, britishOnly).translated){
                text = this.checkAndReplace(text, britishOnly).text
                translated = true
            }

            if(this.checkAndReplace(text, britishSpellingToAmerican).translated){
                text = this.checkAndReplace(text, britishSpellingToAmerican).text
                translated = true
            }
            if(this.checkAndReplace(text, britishToAmericanTitles, true).translated){
                text = this.checkAndReplace(text, britishToAmericanTitles, true).text
                translated = true
            }
        }

        return translated ? text : this.noTranslation
    }

    addHighlight(str){
        return `<span class="highlight">${str}</span>`
    }

    checkAndReplace(text, dictionary,title){
        let translated = false;
        if(!title) {
            for(let key in dictionary){
                if(text.includes(key)){
                    text = text.replaceAll(key, this.addHighlight(dictionary[key]))
                    translated = true;
                }
            }
        } else { // dealing with titles
            for(let key in dictionary){
                if(text.includes(key)) {
                    const value = dictionary[key][0].toUpperCase() + dictionary[key].slice(1)
                    text = text.replaceAll(key, this.addHighlight(value))
                    translated = true;
                }
                if(text.includes(dictionary[key])) {
                    const value = dictionary[key][0].toUpperCase() + dictionary[key].slice(1)
                    text = text.replaceAll(key, value)
                    translated = true;
                }
            }
            
        }
        return {translated, text}
    }

}

module.exports = Translator;