import {mockSearchDetails} from '../__mocks__/SearchMockData';
import {SearchCard} from '../../src/components/Search/SearchCard';

const searchCard = new SearchCard();

describe('SearchCard', () => {
  it('merges Search field types to the expected structure', () => {
    expect(searchCard.mergeSearchFields()).toMatchSnapshot();
  });
});
