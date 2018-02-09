const validLevels = ['debug', 'warnings', 'matches', 'overrides'];
let logLevel = 'debug';

const MatchEngineLogger = {
  setLogLevel: (level) => {
    if (validLevels.includes(level)) {
      logLevel = level;
    } else {
      console.warn(`
        setLogLevel(): Invalid logLevel: '${level}'
        Valid logLevels are: ${validLevels}
        Reverting to default ('debug')...`
      );
      logLevel = 'debug';
    }
  },
  compareStrings: (currSource, currTarget, targetSpec) => {
    if (logLevel === 'debug') {
      console.log('\n\nComparing strings for a match...');
      console.log('currSource:', currSource);
      console.log('currTarget: ', currTarget);
      console.log('targetSpec: ', targetSpec);
      console.log('\n\n');
    }
  },
  compareArrays: (currSource, currTarget, targetSpec) => {
    if (logLevel === 'debug') {
      console.log('\n\nComparing arrays for a match...');
      console.log('currSource:', currSource);
      console.log('currTarget: ', currTarget);
      console.log('targetSpec: ', targetSpec);
      console.log('\n\n');
    }
  },
  compareMixed: (currSource, currTarget, targetSpec) => {
    if (logLevel === 'debug') {
      console.log('\n\nComparing mixed types (Array<String> <-> String) for a match...');
      console.log('currSource:', currSource);
      console.log('currTarget: ', currTarget);
      console.log('targetSpec: ', targetSpec);
      console.log('\n\n');
    }
  },
  rejectComparison: (currSource, currTarget, targetSpec) => {
    if (logLevel === 'debug' || logLevel === 'warnings') {
      console.warn('\n\n[REJECTED] source and/or target type is not valid!');
      console.log('Rejected currSource:', currSource);
      console.log('Rejected currTarget: ', currTarget);
      console.log('Rejected targetSpec: ', targetSpec);
    }
  },
  productFieldNotFound: (field) => {
    if (logLevel === 'debug' || logLevel === 'warnings') {
      console.warn(`[ISSUE] ${field} is not a product field or not specified correctly, skipping...`);
    }
  },
  profileFieldNotFound: (field) => {
    if (logLevel === 'debug' || logLevel === 'warnings') {
      console.warn(`[ISSUE] ${field} is not a profile field or not specified correctly, skipping...`);
    }
  },
  productMatch: (currSource, currTarget, product) => {
    if (logLevel === 'debug' || logLevel === 'matches') {
      console.log('\n*********');
      console.log('[MATCH]');
      console.log('product.elasticId:', product.elasticId);
      console.log(`${currSource} --> ${currTarget}`);
      console.log('*********\n');
    }
  },
  profileMatch: (currSource, currTarget) => {
    if (logLevel === 'debug' || logLevel === 'matches') {
      console.log('\n*********');
      console.log('[MATCH]');
      console.log(`${currSource} --> ${currTarget}`);
      console.log('*********\n');
    }
  },
  registerOverride: (currSource, overrideSource, defaultTarget, targetSpec) => {
    if (logLevel === 'debug' || logLevel === 'overrides') {
      console.log(`[OVERRIDE] Override triggered with override source: ${overrideSource}`);
      console.log('Overridable source:', currSource);
      console.log('Overridable target:', defaultTarget);
      console.log('searchFieldSource:', overrideSource);
      console.log('Overridable targetSpecs:', targetSpec);
    }
  },
  registerInvalidOverride: (currSource, overrideSource, defaultTarget, targetSpec) => {
    if (logLevel === 'debug' || logLevel === 'overrides') {
      console.warn(`[OVERRIDE INVALID] Override triggered, but override source "${overrideSource}" is invalid -> reverting to defaultTarget: ${defaultTarget}`);
      console.log('Overridable source:', currSource);
      console.log('Overridable target:', defaultTarget);
      console.log('searchFieldSource:', overrideSource);
      console.log('Overridable targetSpecs:', targetSpec);
    }
  },
  summarizeMatches: (matches) => {
    console.log(`
      =========================
            FINAL MATCHES
      =========================
      `);
      matches.forEach(match => console.log(`
        profileId: ${match.profileId}
        productIds: ${match.productIds}
        projectIds: ${match.projectIds}
        keywordMatchCount: ${match.keywordMatchCount}
        `)
      );
  }
};

export default MatchEngineLogger;
