function sym(args) {
    if(arguments.length == 1){
      let end = arguments[0].sort((a,b)=>a-b)
      return end
    }
    let arrToCheck = [...arguments[0], ...arguments[1]];
    let restArgs=Object.values(arguments);
    restArgs.shift()
    restArgs.shift()
    let result = arrToCheck.reduce((acc,el,index) =>{
       let howMany = arrToCheck.filter(n => n == el).length;
       if (howMany == 1) {
         acc = [...acc, el]
       }
       return acc
    },[]);
    return sym(result, ...restArgs);
  }
  
  sym([1, 2, 3], [5, 2, 1, 4]);