function chunk(array) {
  const result = [];
  for(let i=0; i<array.length;i+=1)
  result.push(array.slice(i, i+1) );
  return result;
  }


function multiSelectValues(collection) {
  const tagsValue = ['value', 'label'];
  collection = collection.map((row) => {
      return tagsValue.reduce((obj, key) => {
        obj[key] = row[0];
        return obj;
      }, {});
  });
  return collection;
}

export {multiSelectValues, chunk};


