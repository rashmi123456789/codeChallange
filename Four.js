const dataSet = require('./dataSource');
  
  var primeBase = 31;
  
  function searchRabinKarp(text, str) {
    var matches = [];
  
    var hashStr = hashFromTo(str, 0, str.length);
    var hashTextPart = hashFromTo(text, 0, str.length);
    var primeToPower = Math.pow(primeBase, str.length);
    var maxIndexForPotentialMatch = text.length - str.length;
  
    for (var i = 0; i <= maxIndexForPotentialMatch; i++) {
      if (hashTextPart === hashStr) {
        if (matchesAtIndex(i, text, str)) {
          matches.push(text);
          return(text);
        }
      }
      hashTextPart = primeBase * hashTextPart - 
      primeToPower * text.charCodeAt(i) + text.charCodeAt(i + str.length);
    }
  
    return matches;
  }
  
  function matchesAtIndex(index, text, str) {
    var matches = true;
  
    for (var j = 0; j < str.length; j++) {
      if (text[index + j] !== str[j]) {
        matches = false;
        break;
      }
    }
    return matches;
  }
  
  function hashFromTo(str, from, to) {
    var hash = 0;
    for (var i = from; i < to && i < str.length; i++) {
      hash = primeBase * hash + str.charCodeAt(i);
    }
    return hash;
  }

  function searchCountry(pattern){
      const returnArray = [];
      const dS = dataSet.dataSet;

      dS.forEach(function(element){
          let ex = searchRabinKarp((element.name).toUpperCase(),pattern)
          if(ex.length!==0){
              returnArray.push(ex);
          }
      });
      return returnArray.toString();

  }

  module.exports ={
    searchCountry
  }