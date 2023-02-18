// get all permutations

function permAlone(str) {
    let len = str.length
    let arr = [str]

    for(let i = 0; i < len; i++) {
        // take char out of the str
        const curChar = str[i]
             
        for (let j = 0; j < len.length; j++) {
            if(i != j ){
                // switch i and j 
            }      
        }     
    } 
    return str;
  }
  
//   permAlone('aab');

  function swap(str, fr, to){
    if (fr < to) {
        return str.slice(0, fr) + str[to] + str.slice(fr + 1, to) + str[fr] + str.slice(to + 1)
    } else {
        return str.slice(0, to) + str[fr] + str.slice(to + 1, fr) + str[to] + str.slice(fr + 1)
    }
  }

  console.log(swap('1234', 1, 3));
  