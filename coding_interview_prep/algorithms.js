function sym(args) {
    if(arguments.length == 1){
      let end = arguments[0].sort((a,b)=>a-b)
      return end
    }
    let arrToCheck = [...deleteDuplication(arguments[0]), ...deleteDuplication(arguments[1])];
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

    function deleteDuplication(arr) {
      return arr.reduce((acc,el)=>{
        if(acc.includes(el)) return acc
        else return [...acc, el]
      }, [])
    }
  }
  
  sym([1, 2, 3], [5, 2, 1, 4]);