import * as productMatching from './productMatching';
import * as MatchEngineHelpers from './util/MatchEngineHelpers';
import MatchEngineLogger from './util/MatchEngineLogger';
import * as productMatchMapping from './mappings/productMatching';
import * as productSearchMatchMapping from './mappings/productSearchMatching';
import * as partnerMatchMapping from './mappings/partnerMatching';
import * as partnerSearchMapping from './mappings/partnerSearchMatching';
import * as projectSearchMatchMapping from './mappings/projectSearchMatching';
import * as startupMatching from './mappings/startupMatching';
const isString = require('is-string');


MatchEngineLogger.setLogLevel('warnings');

export default class MatchEngine {

  /**
   * _getMatchableSearcherProfileValues - Uses the passed `mapping` to extract key-value pairs
   * from the passed `dbObject` that can be used to find matches.
   *
   * @param  {Object} dbObject description
   * @param  {Object} mapping  description
   * @return {Object}          description
   */
  static _getMatchableSearcherProfileValues(dbObject, mapping) {
    let matchableSearcherProfileValues = {};
    // We only want profile values from the searcherProfile, no products.
    const profileKeys = Object.keys(mapping).filter(key => key !== 'products');

    profileKeys.forEach((field) => {
      if (dbObject[field]) {
        const profileValue = MatchEngineHelpers.unboxValues(dbObject[field]);
        matchableSearcherProfileValues = {
          ...matchableSearcherProfileValues,
          [field]: profileValue
        };
      } else {
        MatchEngineLogger.profileFieldNotFound(field);
      }
    });
    return matchableSearcherProfileValues;
  }


  // TODO move to productMatching
  /**
   * _getOverrideFallbacksFromSearcherProfile - description
   *
   * @param  {type} dbObject description
   * @param  {type} mapping  description
   * @return {type}          description
   */
  static _getOverrideFallbacksFromSearcherProfile(dbObject, mapping) {
    let products;
    if (mapping.profile) {
       products = Object.assign(mapping.profile, mapping.products);
    } else {
        products = mapping.products;
    }
    const fallbackKeys = Object.keys(products)
      .filter(productKey => products[productKey].mappingType === 'overridable')
      .map(fallbackKey => products[fallbackKey].fallbackTarget);

    let fallbackProfileValues = {};
    fallbackKeys.forEach((field) => {
      if (dbObject[field]) {
        const profileValue = MatchEngineHelpers.unboxValues(dbObject[field]);
        fallbackProfileValues = {
          ...fallbackProfileValues,
          [field]: profileValue
        };
      } else {
        MatchEngineLogger.profileFieldNotFound(field);
      }
    });

    console.log('\n\n\nFallback values from profile.products:');
    console.log(require('util').inspect(fallbackProfileValues, { depth: null }));
    console.log('\n\n\n');
    return fallbackProfileValues;
  }

  static _findDetailMatches(searcherProfile, targetProfiles, searchFields, MatchMapping, searchType) {
    // Unbox the search field values if there are any
    const koMatch = [];
    Object.keys(searchFields).forEach((key) => {
      if (searchFields[key].ko) {
        koMatch.push(key);
      }
    });

    Object.keys(searchFields).forEach((key) => {
      searchFields[key] = MatchEngineHelpers.unboxValues(searchFields[key]);
    });

    // Find the initial subset for linear matching
    const linearProfileValues =
      MatchEngine._getMatchableSearcherProfileValues(searcherProfile, MatchMapping);
    // Find the fallback values we revert to if we don't have a custom search value
    const fallbackProfileValues = MatchEngine._getOverrideFallbacksFromSearcherProfile(searcherProfile, MatchMapping);
    // Merge the sets of values into a single subset to use for matching
    delete searchFields.productSearchName;
    delete searchFields.productDetailSearchName;
    delete searchFields.partnerSearchName;
    delete searchFields.partnerDetailSearchName;
    delete searchFields.projectDetailSearchName;
    delete searchFields.startupSearchName;
    let subsetToMatch;
    if (searchType === 'productDetailSearch' || searchType === 'partnerDetailSearch' || searchType === 'projectDetailSearch' || searchType === 'startupSearch') {
      subsetToMatch = {...linearProfileValues, ...fallbackProfileValues, ...searchFields};
    } else if (searchType === 'productSearch' || searchType === 'partnerSearch') {
      subsetToMatch = {...linearProfileValues, ...fallbackProfileValues, ...searchFields};
    }
    const potentialMatches =
      productMatching.filterTargetProfiles(targetProfiles, MatchMapping);
    const matches =
      productMatching.countProductMatches(subsetToMatch, potentialMatches, searchFields, MatchMapping, searchType, koMatch);
    return matches;
  }


  // #################
  // PUBLIC ACCESSORS
  // #################


  /**
   * compareFields - description
   *
   * @param  {type} currSource    description
   * @param  {type} defaultTarget description
   * @param  {type} targetSpec    description
   * @return {type}               description
   */
  static compareFields(currSource, defaultTarget, targetSpec, mappingType) {
    // Check if we're comparing strings/textAreas
    if (isString(currSource) && isString(defaultTarget) && !mappingType) {
      MatchEngineLogger.compareStrings(currSource, defaultTarget, targetSpec);
      return (
        currSource !== '' && defaultTarget !== '' && // no empty strings
        currSource !== undefined && defaultTarget !== undefined && // no undefined values
        currSource !== null && defaultTarget !== null && // no null values
        currSource === defaultTarget // exact match
      );

    // Check if we're comparing multiDropdowns/tags
    // NOTE Naive/singular matching: if any array values match we return true,
    // no counting for now.
    } else if (Array.isArray(currSource) && Array.isArray(defaultTarget) && !mappingType) {
      MatchEngineLogger.compareArrays(currSource, defaultTarget, targetSpec);
      let containsMatch = false;
      currSource.forEach((sourceElem) => {
        if (defaultTarget.includes(sourceElem)) containsMatch = true;
      });
      return containsMatch;

    // Check if we're comparing Array<String> <-> String, i.e. mixed field types
    } else if (((Array.isArray(currSource) && isString(defaultTarget)) || (isString(currSource) && Array.isArray(defaultTarget))) && !mappingType) {
      MatchEngineLogger.compareMixed(currSource, defaultTarget, targetSpec);
      let containsMatch = false;
      if (Array.isArray(currSource) && currSource.includes(defaultTarget)) containsMatch = true;
      if (Array.isArray(defaultTarget) && defaultTarget.includes(currSource)) containsMatch = true;
      return containsMatch;

      // Range Filter
    } else if (isString(currSource) && isString(defaultTarget) && mappingType) {
      MatchEngineLogger.compareStrings(currSource, defaultTarget, targetSpec);
        if (currSource !== '' && defaultTarget !== '' && currSource !== undefined && defaultTarget !== undefined && currSource !== null && defaultTarget !== null) {
        const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        const newCurrSource = Date.parse(new Date(currSource.replace(pattern, '$3-$2-$1'))) / 1000;
        const newDefaultTarget = Date.parse(new Date(defaultTarget.replace(pattern, '$3-$2-$1'))) / 1000;
        if (mappingType === 'datemin') {
           return newCurrSource >= newDefaultTarget;
        } else if (mappingType === 'datemax') {
           return newCurrSource <= newDefaultTarget;
        } else if (mappingType === 'rangemax') {
           return parseInt(currSource.replace('$', '').replace('€', '').replace('₤', ''), 10) <= parseInt(defaultTarget.replace('$', '').replace('€', '').replace('₤', ''), 10);
        } else if (mappingType === 'rangemin') {
           return parseInt(currSource.replace('$', '').replace('€', '').replace('₤', ''), 10) <= parseInt(defaultTarget.replace('$', '').replace('€', '').replace('₤', ''), 10);
        }
      }

    // Check if we're comparing multiDropdowns/tags
    // NOTE Naive/singular matching: if any array values match we return true,
    // no counting for now.
    }

    // currSource and/or currTarget types aren't equal/are invalid
    MatchEngineLogger.rejectComparison(currSource, defaultTarget, targetSpec);
    return false;
  }

  static findMatches(searcherProfile, targetProfiles, searchType, searchFields) {
    switch (searchType) {
      case 'productSearch':
        return MatchEngine._findDetailMatches(searcherProfile, targetProfiles, searchFields, productMatchMapping, searchType);
      case 'productDetailSearch':
        return MatchEngine._findDetailMatches(searcherProfile, targetProfiles, searchFields, productSearchMatchMapping, searchType);
      case 'partnerSearch':
        return MatchEngine._findDetailMatches(searcherProfile, targetProfiles, searchFields, partnerMatchMapping, searchType);
      case 'partnerDetailSearch':
        return MatchEngine._findDetailMatches(searcherProfile, targetProfiles, searchFields, partnerSearchMapping, searchType);
      case 'projectDetailSearch':
        return MatchEngine._findDetailMatches(searcherProfile, targetProfiles, searchFields, projectSearchMatchMapping, searchType);
      case 'startupSearch':
          return MatchEngine._findDetailMatches(searcherProfile, targetProfiles, searchFields, startupMatching, searchType);
      default:
        console.log(`MatchEngine.findMatches(): Could not find matching logic for searchType ${searchType}, skipping match process...`);
        return null;
    }
  }

} // END MatchEngine
