const isString = require('is-string');

// #####################
// MATCH ENGINE HELPERS
// #####################

/**
 * unboxValues - Unboxes nested `typeValues` keys for easy comparison in the
 * matching algo.
 *
 * @param  {Object} matchValue
 * @return {Array|String} matchValue
 */
export function unboxValues(matchObject) {
  if (Array.isArray(matchObject.typeValues) && matchObject.typeValues.length > 0) {
    // NOTE some search form values (e.g. `valueChain`) seem to return `[null]`
    // -> simply return until fixed to avoid nullPointer error on `.value`
  if (matchObject.typeValues.length === 1 && matchObject.typeValues[0] === null) return matchObject;
    matchObject = matchObject.typeValues.map(tag => tag.value);
  } else if (matchObject.typeValues) {
    matchObject = matchObject.typeValues;
  }
  return matchObject;
}


/**
 * processStrings - description
 *
 * @param  {Array|String} strings description
 * @return {Array|String}         description
 */
export function processStrings(strings) {
  if (isString(strings)) return strings.toLowerCase();
  if (Array.isArray(strings)) return strings.map(string => string.toLowerCase());
}
