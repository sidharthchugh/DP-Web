import MatchEngine from '../../server/matchEngine/MatchEngine';
import MatchEngineMocks from '../__mocks__/MatchEngineMocks';

// Expected final values given the mock data
const EXPECTED_MATCHES_PRODUCT = 9;
const EXPECTED_MATCHES_PRODUCT_DETAIL = 11;

// Integration tests
describe('MatchEngine', () => {
  describe('findProductMatches', () => {
    const searchType = 'productSearch';
    const productMatches = MatchEngine.findMatches(MatchEngineMocks.searcherProfile, MatchEngineMocks.targetProfiles, searchType, {});

    it('returns at least 1 productMatch', () =>
      expect(productMatches.length).toBeGreaterThan(0)
    );

    productMatches.forEach((match, i) => {
      it(`match ${i + 1} has a defined 'profileId'`, () =>
        expect(match.profileId).toBeDefined()
      );
      it(`match ${i + 1} has at least 1 element in 'productIds'`, () =>
        expect(match.productIds.length).toBeGreaterThan(0)
      );
      it(`match ${i + 1} has exactly ${EXPECTED_MATCHES_PRODUCT} keywordMatches (mock data dependency)`, () =>
        expect(match.keywordMatchCount).toBe(EXPECTED_MATCHES_PRODUCT)
      );
    });
  });


  describe('findProductDetailMatches', () => {
    const searchType = 'productDetailSearch';
    const searchFieldsOverride = {
      compatibileTechnologies: {
        className: '',
        name: 'compatibileTechnologies',
        label: 'Compatibile Technologies',
        type: 'multiSelect',
        typeValues: [{
            label: 'compatibilities value 1',
            value: 'compatibilities value 1',
            className: 'Select-create-option-placeholder',
            _id: '5873dc67a05f3591f20b3fc9'
          },
          {
            label: 'compatibilities value 2',
            value: 'compatibilities value 2',
            className: 'Select-create-option-placeholder',
            _id: '5873dc67a05f3591f20b3fc8'
          }
        ]
      }
    };

    const matchesWithOverride = MatchEngine.findMatches(MatchEngineMocks.searcherProfile, MatchEngineMocks.targetProfiles, searchType, searchFieldsOverride);
    const matchesNoOverride = MatchEngine.findMatches(MatchEngineMocks.searcherProfile, MatchEngineMocks.targetProfiles, searchType, {});

    it('returns at least 1 productMatch', () =>
      expect(matchesWithOverride.length).toBeGreaterThan(0)
    );

    matchesWithOverride.forEach((match, i) => {
      it(`match ${i + 1} has a defined 'profileId'`, () =>
        expect(match.profileId).toBeDefined()
      );
      it(`match ${i + 1} has at least 1 element in 'productIds'`, () =>
        expect(match.productIds.length).toBeGreaterThan(0)
      );
      it(`match ${i + 1} has exactly ${EXPECTED_MATCHES_PRODUCT_DETAIL} keywordMatches (mock data dependency)`, () =>
        expect(match.keywordMatchCount).toBe(EXPECTED_MATCHES_PRODUCT_DETAIL)
      );
      it(`match ${i + 1} has more keyword matches when the mock override is active (mock data dependency)`, () => {
        expect(match.keywordMatchCount).toBeGreaterThan(matchesNoOverride[i].keywordMatchCount);
      });
    });
  });
});
