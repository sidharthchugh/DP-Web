import React from 'react';
import renderer from 'react-test-renderer';
import {SearchBoxComponent} from '../../src/components/Search/Forms/SearchBox';
import {mockChooseEditType} from '../__mocks__/SearchBoxMocks';
import {mockSearchDetails} from '../__mocks__/SearchMockData';

// FIXME issue with react-sticky trying to call the store
test.skip('SearchBoxComponent renders correctly', () => {
  const tree = renderer.create(
    <SearchBoxComponent
      searchDetails={mockSearchDetails}
      activeSearchType={''}
      chooseEditType={mockChooseEditType}
      resetBox={() => {}}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
