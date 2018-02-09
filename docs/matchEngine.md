# MatchEngine (v1.x)

## Contents
- [NPM package dependencies](#npm-package-dependencies)
- [Tests](#tests)
- [High-level overview](#high-level-overview)
- [Mappings](#mappings)
    - [`mappings/productMatchingSchema.json`](#mappings/productmatchingschema.json)
- [Matching](#matching)
    - [Extensibility](#extensibility)
        - [Extending to further product match types](#extending-to-further-product-match-types)
        - [Extending MatchEngine to a further search type](#extending-matchengine-to-a-further-search-type)
- [Utilities](#utilities)
    - [MatchEngineHelpers](#matchenginehelpers)
    - [MatchEngineLogger](#matchenginelogger)


## NPM package dependencies
  - `is-string`

## Tests
Before & after making changes to the MatchEngine, run `npm t` to ensure all tests are passing for the module.


## High-level overview
1. `findMatchesForSearch()` (controllers/matches) is called as a callback to `saveSearch()` (controllers/search) on the `account/searchUpdate` route and receives said search object.
2. The user's company profile is queried (`searcherProfile`)
3. ALL other company profiles are queried (`remainingProfiles`)
4. MatchEngine's public API method `findMatches()` is called
  - If the latest search has a defined `fields` key (i.e. it's a detailSearch with possible overrides), this is passed along to `findMatches()` as `searchFields`, otherwise `findMatches()` receives an empty object (`{}`) as its final parameter.
5. If the `matches` array returned from `findMatches()` is not empty, it is written to this search's `matches` key in the DB.


## Mappings
### `mappings/productMatchingSchema.json`
A typical mapping definition has the following JSON structure:

```json
"industry": {
  "defaultTarget": "applicationIndustry",
  "mappingType": "linear",
  "mapsTo": "product"
}
```

 - Object key (`industry`) - The object key represents the source field **from which the mapping occurs**.
 - `defaultTarget` - The default target is the target field **to which the mapping occurs**.
 - `mappingType` - The mapping type specifies the mapping occurs in a linear fashion (always the same relation) or whether, for example, this source field has possible overrides from a detailSearch that can override it.
   - Possible values: `linear | overridable | combi`
 - `mapsTo` - Indicates whether the mapping occurs as _searcher profile field -> target profile field_ OR as _searcher profile field -> target profile product field_
   - Possible values: `profile | product`

**Overridable mappings**
```json
"technolgies": {
  "defaultTarget": "compatibilities",
  "searchFieldSource": "compatibileTechnologies",
  "mappingType": "overridable",
  "mapsTo": "product"
}
```

- `searchFieldSource` - The search field which is first checked for a custom value defined by the user when creating the search. If this field is not defined, the MatchEngine will fall back to its linear behaviour for a source field, i.e. the object key (`technolgies`).

**Adding/updating/deleting mappings**
- Adding - To add a mapping relation, add a definition as shown above, ensuring that all keys have been defined.
- Deleting - Deleting an entire mapping should be possible without any effect on the algorithm. Removing an entire mapping object simply means that this key (i.e. source field) will not be matchable to any target field anymore as the algorithm cannot see it without the mapping object.
- Updating - To update either a source or target field, ensure that the naming has been changed in the relevant schemas, along with existing passive/active documents, otherwise the mapping will simply log a `profileFieldNotFound()` or `productFieldNotFound()` exception.


## Matching
### Extensibility
In v1.x, MatchEngine offers both linear and override-type matches for product searches. The following section will cover:
- Extending product matching to further matching types
- Extending MatchEngine to a further search type

#### Extending to further product match types
To extend the logic for productMatches, let's look at `countProductMatches()`, the main method of the `productMatching.js` module. Here we can see that target profiles are iterated and checked for matches in the following order:

1. `_checkProfileMatch()` - Match searcherProfile -> targetProfile (e.g. languages)
2. `_checkProductMatch()` - Match searcherProfile -> targetProfile.products

To extend the matching logic for productMatches we can ignore `_checkProfileMatch()` for now and focus on `_checkProductMatch()`:

```js
function _checkProductMatch(currSource, product, targetSpec, searchFields) {
  const {mappingType, mapsTo} = targetSpec;
  // Simply return if it's not a searcherProfile->product mapping
  if (mapsTo !== 'product') return false;

  if (mappingType === 'linear') return _validateProductMatch(currSource, product, targetSpec);
  if (searchFields && mappingType === 'overridable') return _validateOverridableProductMatch(currSource, product, targetSpec, searchFields);
}
```

Here we can see that each `mappingType` we currently have returns its own validation function. After performing whichever checks are needed - e.g. whether there's a manually specified value for `mappingType: 'overridable'` - each validation function hands off to `_compareFields()`, which does the actual matching between a given source field & target field.

Therefore, to add a further type of matching logic we simply have to add another `_validateXyzProductMatch()` function to perform the necessary conditional logic before `compareFields()` is called.

#### Extending MatchEngine to a further search type
To add the capability to MatchEngine to perform matching for another search type, i.e. another mapping, let's start from MatchEngine's top-level method `findMatches()` and work downwards from there. The newly added `case` in `findMatches()` should have the structure:

```js
case '<searchType>':
  return MatchEngine._find<searchType>Matches(searcherProfile, targetProfiles);
  // in a detailSearch there would be a 3rd `searchFields` parameter
```

**_find function for the new searchType**

This section will cover how to construct regular (auto) search with a linear mapping, the additional work in writing a `_find<searchType>DetailMatches()` func should be clear from the differences between `_findProductMatches()` and `_findProductDetailMatches()`.

First off, create a new module for specific functions used for this searchType's matching process, similar to `productMatching.js` for product/service matches.

`_find<searchType>Matches(searcherProfile, targetProfiles)`:

1. Call `MatchEngine._getMatchableSearcherProfileValues(searcherProfile, <searchType>Mapping)` - By using the JSON mapping's keys, this function returns the subset of profile values that have a specified mapping -> i.e. values that can be used for matching.
2. Construct a filtering function in the new `<searchType>Matching.js` module to filter all target profiles down to their matchable values, as we just did for the searcher profile. An example of how this is done for products specifically is `productMatching/filterTargetProfiles()`.
3. Now that we have the matchable subset of both the searcher company profile and target (all other) company profiles, we can construct a `count<searchType>Matches(searcherProfile, targetProfiles)` function. How the targetProfiles are iterated over before `compareFields()` is called (each time with an individual source and target value) depends on the nature of the searchType and will have to be worked out at the time of construction. E.g. for `countProductMatches()`, first the `searcherProfile->targetProfile` values are checked, then the `searcherProfile->targetProfile.products` values.


## Utilities
### MatchEngineHelpers
`MatchEngineHelpers` provides helper functions that abstract away frequent tasks of pre- and post-processing data received from DB queries.

For example, `unboxValues()` takes the value of a profile key and returns only its `typeValues` field, i.e. the actual value associated with the key.

### MatchEngineLogger
`MatchEngineLogger` provides a simple way to log regular events within the algorithm.
The verbosity of its output can be set with
```js
MatchEngineLogger.setLogLevel(<level>)
```
where `<level>` can be any of the following:

1. `'debug'` - Logs all events to the console
2. `'warnings'` - Logs only warning events to the console (e.g. `[REJECTED]`, `[ISSUE]`)
3. `matches` - Logs only matches to the console (`[MATCH]`)
4. `overrides` - Logs only override events to the console (`[OVERRIDE]`)
