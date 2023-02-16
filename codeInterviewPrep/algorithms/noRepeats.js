// get all permutations

function permAlone(str) {
    let len = str.length
    let arr = [str]

    for(let i = 0; i < len; i++) {
        // take char out of the str
      
        for (let j = i+1; j < len; j++) {
            // insert the char to position j

            const before = str.slice(0, j)
            const char = str[j]
            const after = str.slice(j+1)    
            newStr = before
        }
        

    }
    return str;
  }
  
  permAlone('aab');