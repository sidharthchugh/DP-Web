import React from 'react';
import renderer from 'react-test-renderer';
import {SearchPreferencesComponent} from '../../src/components/Search/Forms/SearchPreferences';
import {mockSearchDetails} from '../__mocks__/SearchMockData';
import {savedPreferences} from '../__mocks__/SearchPreferencesMocks';

describe('SearchPreferences', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <SearchPreferencesComponent
        searchDetails={mockSearchDetails}
        savedPreferences={savedPreferences}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

  /* it('toggles the edit state between enabled/disabled', () => {
    expect(searchPrefs.state.disabled).toBe(true); // initialState
    searchPrefs.toggleEdit(); // trigger the local state change
    expect(searchPrefs.state.disabled).toBe(false);
  }); */

  /* it('saves changed preferences correctly', () => {
    const e = {preventDefault: () => {}}; // mock the event object
    searchPrefs.form = {};
    expect(searchPrefs.savePreferences(e)).toBeDefined();
  });
 */
