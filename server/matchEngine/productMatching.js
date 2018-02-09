import omitEmpty from 'omit-empty';
import omitDeep from 'omit-deep';
import MatchEngine from './MatchEngine';
import * as MatchEngineHelpers from './util/MatchEngineHelpers';
import MatchEngineLogger from './util/MatchEngineLogger';

// #####################
// VALIDATION
// #####################

function _validateProfileMatch(currSource, currTarget, targetSpec) {
  return MatchEngine.compareFields(currSource, currTarget, targetSpec);
}

// Non-Detailed Search
function _validateProductMatch(currSource, product, targetSpec) {
  // Process the strings for proper comparison
  const sourceValue = MatchEngineHelpers.processStrings(currSource);
  const targetValue = MatchEngineHelpers.processStrings(product[targetSpec.defaultTarget]);
  return MatchEngine.compareFields(sourceValue, targetValue, targetSpec);
}


// Non-Detailed Search
function _validateProjectMatch(currSource, project, targetSpec, mappingType) {
  // Process the strings for proper comparison
  const sourceValue = MatchEngineHelpers.processStrings(currSource);
  const targetValue = MatchEngineHelpers.processStrings(project[targetSpec.defaultTarget]);
  return MatchEngine.compareFields(sourceValue, targetValue, targetSpec, mappingType);
}


/**
 * _validateOverridableProductMatch - Checks if an overrideSource is present for
 * the passed source->target values. Returns _validateProductMatch with either
 * the override source or the default source.
 *
 * @param  {type} currSource   description
 * @param  {type} product      description
 * @param  {type} targetSpec   description
 * @param  {type} searchFields description
 * @return {type}              description
 */

 // Detailed Search
function _validateOverridableProductMatch(currSource, product, targetSpec, searchFields) {
  const overrideSource = searchFields[targetSpec.searchFieldSource];
  const defaultTarget = product[targetSpec.defaultTarget];

  if (overrideSource && overrideSource.length > 0) {
    MatchEngineLogger.registerOverride(currSource, overrideSource, defaultTarget, targetSpec);
    return _validateProductMatch(overrideSource, product, targetSpec);
  }
  MatchEngineLogger.registerInvalidOverride(currSource, overrideSource, defaultTarget, targetSpec);
  return _validateProductMatch(currSource, product, targetSpec);
}

 // Detailed Search
function _validateOverridableProfileMatch(currSource, profile, targetSpec, searchFields) {
  const overrideSource = searchFields[targetSpec.searchFieldSource];
  const defaultTarget = profile[targetSpec.defaultTarget];

  if (overrideSource && overrideSource.length > 0) {
    MatchEngineLogger.registerOverride(currSource, overrideSource, defaultTarget, targetSpec);
    return _validateProfileMatch(overrideSource, profile, targetSpec);
  }
  MatchEngineLogger.registerInvalidOverride(currSource, overrideSource, defaultTarget, targetSpec);
  return _validateProfileMatch(currSource, profile, targetSpec);
}

// ################################
// MAPPING TYPE CHECKS
// ################################

function _checkProfileMatch(currSource, currTarget, targetSpec, searchFields) {
  const {mappingType, mapsTo} = targetSpec;
  // Simply return if it's not a profile->profile mapping
  if (mapsTo !== 'profile') return false;
  // Simply return if it's non-linear mapping logic
  if (mappingType === 'linear') return _validateProfileMatch(currSource, currTarget, targetSpec);
   if (searchFields && mappingType === 'overridable') {
    return _validateOverridableProfileMatch(currSource, currTarget, targetSpec, searchFields);
  } else if (!searchFields && mappingType === 'overridable') {
      return _validateProfileMatch(currSource, currTarget, targetSpec);
  }
}

function _checkProductMatch(currSource, product, targetSpec, searchFields) {
  const {mappingType, mapsTo} = targetSpec;
  // Simply return if it's not a searcherProfile->product mapping
  if (mapsTo !== 'product') return false;

  if (mappingType === 'linear') return _validateProductMatch(currSource, product, targetSpec);
  if (searchFields && mappingType === 'overridable') {
    return _validateOverridableProductMatch(currSource, product, targetSpec, searchFields);
  } else if (!searchFields && mappingType === 'overridable') {
    return _validateProductMatch(currSource, product, targetSpec);
  }
  if (mappingType === 'combi') {
    console.log('\n\n[COMBI]');
    console.log('currSource:', currSource);
    console.log('targetSpec: ', targetSpec);
    console.log('\n\n');
  }
}


function _checkProjectMatch(currSource, project, targetSpec, searchFields) {
  const {mappingType, mapsTo} = targetSpec;
  // Simply return if it's not a searcherProfile->product mapping
  if (mapsTo !== 'project') return false;

  if (mappingType === 'linear') return _validateProjectMatch(currSource, project, targetSpec);

  if (mappingType === 'datemin' || mappingType === 'datemax' || mappingType === 'rangemax' || mappingType === 'rangemin') return _validateProjectMatch(currSource, project, targetSpec, mappingType);
}


/**
 * filterTargetProfiles - Uses the passed `mapping` to extract relevant
 * `products` fields from each of `dbObjectArray`s profile objects.
 *
 * @param  {type} targetProfiles description
 * @return {type}                description
 */
export function filterTargetProfiles(targetProfiles, MatchMapping) {
  const profileProductMapping = MatchMapping.products;
  const profileProjectMapping = MatchMapping.projects;
  const filteredTargetProfiles = targetProfiles.map((profile) => {
    // Filter & unbox regular profile fields
    const filteredProfile = {};
    Object.keys(profile).forEach((field) => {
      const matchableField = Object.keys(MatchMapping).includes(field);
      if (matchableField) filteredProfile[field] = MatchEngineHelpers.unboxValues(profile[field]);
    });
    // Filter products for this profile
    filteredProfile.products = profile.products.map((product) => {
      const filteredProductFields = {};
      // Filter out only the keys we need for matching
      Object.keys(profileProductMapping).forEach((field) => {
        if (product[field]) {
          // If it's a collection of multiSelect tags -> flatten and get only the `value`
          const matchableValue = MatchEngineHelpers.unboxValues(product[field]);
          filteredProductFields[field] = matchableValue;
        } else {
          MatchEngineLogger.productFieldNotFound(field);
        }
      });
      return filteredProductFields;
    });


    if (profile.projects) {
    // Filter projects for this profile
    filteredProfile.projects = profile.projects.map((project) => {
      const filteredProjectFields = {};
      // Filter out only the keys we need for matching
       project.projectStatus === 'Yes' && Object.keys(profileProjectMapping).forEach((field) => {
        if (project[field]) {
          // If it's a collection of multiSelect tags -> flatten and get only the `value`
        if (field === 'otherProjectDescription') {
        const projectSpecial = [];

        project[field].map((projectMultiple) => {
           return projectSpecial.push(MatchEngineHelpers.unboxValues(projectMultiple.otherProjectDescription));
        });
          const mergedProjectValues = [].concat.apply([], projectSpecial);
          filteredProjectFields.otherProjectDescription = mergedProjectValues;
       } else {
          const matchableValue = MatchEngineHelpers.unboxValues(project[field]);
          filteredProjectFields[field] = matchableValue;
          }
        } else {
          MatchEngineLogger.productFieldNotFound(field);
        }
      });
      return filteredProjectFields;
    });
  }

    return filteredProfile;
  });


  return filteredTargetProfiles;
}


/**
 * countProductMatches - description
 *
 * @param  {type} matchableSource  description
 * @param  {type} matchableTargets description
 * @param  {type} searchFields     description
 * @return {type}                  description
 */
export function countProductMatches(matchableSource, matchableTargets, searchFields, MatchMapping, searchType, koMatch) {
  const matches = [];
  // Removing Types from the Source Keys
  const sourceWithoutType = omitDeep(matchableSource, ['type']);
  // Removing Empty Keys
  const sourceNonKeys = Object.keys(omitEmpty(sourceWithoutType));
  const sourceNonZeroKeys = [...new Set([...sourceNonKeys, ...MatchMapping.search])];
  const targetKeys = sourceNonZeroKeys.map(key => MatchMapping[key]);

  // Iterate over each profile with potential matches
  matchableTargets.forEach((targetProfile) => {
    // Add a counter for matches
    let keywordMatchCount = 0;
    let profilekomatch = false;
    const matchedSearchProductIds = [];
    let fieldProfileMatch = [];
    // Match searcherProfile -> targetProfile (e.g. languages)
    sourceNonZeroKeys.forEach((srcKey, i) => {
      const targetSpec = targetKeys[i];
      const currSource = matchableSource[sourceNonZeroKeys[i]];
      if (currSource !== undefined && targetSpec !== undefined) {
      const currTarget = targetProfile[targetSpec.defaultTarget];
      let validMatch;
      if (targetSpec) {
       validMatch = _checkProfileMatch(currSource, currTarget, targetSpec, searchFields);
      }
      if (validMatch) {
        MatchEngineLogger.profileMatch(currSource, currTarget);
         if (koMatch.length > 0) fieldProfileMatch.push(targetSpec.searchFieldSource || targetSpec.defaultTarget);
        targetProfile.products.map(product => (matchedSearchProductIds.push(product.elasticId)));
        keywordMatchCount++;
       }
      }
    });

    if (searchType === 'productDetailSearch' || searchType === 'productSearch' || searchType === 'startupSearch') {
    // Match searcherProfile -> targetProfile products
    targetProfile.products.forEach((product) => {
      let productMatchCount = 0;
      let totalMatchCount = 0;
      let matchedProductIds = [];
      let fieldMatches = [];
      sourceNonZeroKeys.forEach((srcKey, i) => {
        const targetSpec = targetKeys[i];
        const currSource = matchableSource[sourceNonZeroKeys[i]];
         if (currSource !== undefined && targetSpec !== undefined) {
          const validMatch = _checkProductMatch(currSource, product, targetSpec, searchFields);
          if (validMatch) {
            const matchedSource = product[targetSpec.searchFieldSource] || currSource;
            if (koMatch.length > 0) fieldMatches.push(targetSpec.searchFieldSource || targetSpec.defaultTarget);
            const matchedTarget = product[targetSpec.defaultTarget];
            MatchEngineLogger.productMatch(searchFields, matchedTarget, product);
            // If we haven't already added this productId to the matched ones, do so.
            matchedProductIds = [product.elasticId];
            productMatchCount++;
            totalMatchCount = keywordMatchCount + productMatchCount;
          }
         }
      });
       if (totalMatchCount > 0 && fieldMatches.length === koMatch.length && fieldMatches.reduce((a, b) => a && koMatch.includes(b), true)) {
          matches.push({
            profileId: targetProfile.elasticId,
            productIds: [...matchedSearchProductIds, ...matchedProductIds],
            projectIds: [],
            keywordMatchCount: totalMatchCount,
            profileStatus: targetProfile.companyStatus === 'Active' ? 1 : 0
          });
       }
    });
    }


    if (searchType === 'projectDetailSearch') {
    // Match searcherProfile -> targetProfile projects

    targetProfile.projects.forEach((project) => {
      let projectCount = 0;
      let totalMatchCount = 0;
      let matchedProjectIds = [];
       let fieldMatches = [];
      let projectkomatch = false;
      sourceNonZeroKeys.forEach((srcKey, i) => {
        const targetSpec = targetKeys[i];
        const currSource = matchableSource[sourceNonZeroKeys[i]];
         if (currSource !== undefined && targetSpec !== undefined) {
          const validMatch = _checkProjectMatch(currSource, project, targetSpec, searchFields);
          if (validMatch) {
            const matchedSource = project[targetSpec.searchFieldSource] || currSource;
            if (koMatch.length > 0) fieldMatches.push(targetSpec.searchFieldSource || targetSpec.defaultTarget);
            const matchedTarget = project[targetSpec.defaultTarget];
            MatchEngineLogger.productMatch(searchFields, matchedTarget, project);
            // If we haven't already added this productId to the matched ones, do so.
            matchedProjectIds = [project.elasticId];
            projectCount++;
            totalMatchCount = keywordMatchCount + projectCount;
          }
         }
      });
       if (totalMatchCount > 0 && fieldMatches.length === koMatch.length && fieldMatches.reduce((a, b) => a && koMatch.includes(b), true)) {
          matches.push({
            profileId: targetProfile.elasticId,
            productIds: [],
            projectIds: matchedProjectIds,
            keywordMatchCount: totalMatchCount,
            profileStatus: targetProfile.companyStatus === 'Active' ? 1 : 0
          });
       }
    });
    }

  if (searchType === 'partnerDetailSearch' || searchType === 'partnerSearch') {
      if (keywordMatchCount > 0 && fieldProfileMatch.length === koMatch.length && fieldProfileMatch.reduce((a, b) => a && koMatch.includes(b), true)) {
          matches.push({
            profileId: targetProfile.elasticId,
            productIds: [],
            projectIds: [],
            keywordMatchCount,
            profileStatus: targetProfile.companyStatus === 'Active' ? 1 : 0
          });
       }
  }
    // For Sorting Matches on the basis of company status. Adding integer (1) for active and (0) for passive
  });

  MatchEngineLogger.summarizeMatches(matches);
  return matches;
}
