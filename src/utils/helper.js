// This array to object function based on this article https://bit.ly/2tHkeo7
export function arrayToObject(array, keyField) {
  return array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {});
}

/* 
  * Convert unix timestamp from milliseconds
*/
export function convertToSeconds(timeStamp) {
  if(timeStamp) {
    return timeStamp.substring(0,10);
  }
}

/*
  * Check if empty object
*/
export function isObjectEmpty(obj) {
  if(Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  } else {
    return false;
  }
}