import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateSearchPreferences} from '../../../actions/searches';
import editIcon from '../../../images/edit-icon.png';
import strings from '../../util/language';
import {Grid, Button} from 'semantic-ui-react';

export class SearchPreferencesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true // Edit mode off by default
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.savePreferences = this.savePreferences.bind(this);
    this.renderPreferences = this.renderPreferences.bind(this);
  }


  /**
   * toggleEdit - Enabled/disabled toggle for the checkboxes.
   */
  toggleEdit() {
    this.setState((prevState) => {
      return { disabled: !prevState.disabled };
    });
  }


  /**
   * savePreferences - Converts the form values to an array of
   * objects and dispatches it to the DB.
   *
   * @param  {type} e event object
   */
  savePreferences(e) {
    e.preventDefault();
    // convert HTMLCollection -> Array
    const elements = [].slice.call(this.form.elements);
    // filter out fields with id -> map {id: checked}
    // into a `prefs` object
    let prefs = {};
    elements.filter(elem => elem.id)
            .map((elem) => {
              prefs = { ...prefs, [elem.id]: elem.checked };
              return null;
            });
    // console.log('New passive preference values: ', prefs);
    this.props.updateSearchPreferences(prefs);
    this.setState({ disabled: true });
  }

  renderPreferences() {
    const {searchDetails, savedPreferences, userLanguage} = this.props;
    const {disabled} = this.state;
    const prefKeys = Object.keys(searchDetails.searchPreferences);

    // if we don't have savedPrefs from DB yet -> render nothing
    if (!savedPreferences) return null;

    return prefKeys.map((key) => {
      const item = searchDetails.searchPreferences[key];
      return (
        <Grid.Column
          key={key}
          computer={12}
        >
          <input
            id={key}
            type="checkbox"
            disabled={disabled}
            defaultChecked={savedPreferences[key]}
            className="search-preference-checkbox"
          />
          <label className="search-preferences" htmlFor={key}>{userLanguage === 'German' ? item.germanLabel : item.englishLabel}</label>
        </Grid.Column>
      );
    });
  }


  render() {
    const {disabled} = this.state;
    const {userLanguage} = this.props;
    return (
      <Grid>
        <Grid.Column computer={12} className="search-card search-card--preferences lastCard-generic" id={'search-preferences'}>
          <form
            ref={(c) => { this.form = c; }}
            className={'passive-search-preference' + (disabled ? '' : ' edit-mode')}
          >
            <a className="edit-button edit-button-move" onClick={this.toggleEdit}>
              <img className="edit-icon " src={editIcon} alt="edit icon" /> {strings.edit}
            </a>
            <div className="save-cancel-button">
              <Button type="button" className="button-small button-small--grey" onClick={this.toggleEdit}>{strings.cancel}</Button>
              <Button type="button" className="button-small" type="submit" onClick={this.savePreferences}>{strings.save}</Button>
            </div>

            <div className="card-header">
              <div>
                <h3>{userLanguage === 'German' ? 'Such-Präferenzen' : 'Search Preferences'}</h3>
              </div>
            </div>
            <Grid className="card-content">
              {this.renderPreferences()}
            </Grid>
          </form>
        </Grid.Column>
      </Grid>
    );
  }
}
SearchPreferencesComponent.propTypes = {
  searchDetails: PropTypes.object.isRequired,
  savedPreferences: PropTypes.object.isRequired
};


// ##############
// REDUX BINDINGS
// ##############
const mapStateToProps = (state) => {
  const {searchPreferences} = state.search.savedSearches;
  return {
    // TODO Ben: we should change the schema to just an Object so we don't
    // need to unnecessarily unbox from an array (which only ever has index 0 anyways).
    savedPreferences: searchPreferences[searchPreferences.length - 1] || {}
  };
};

const SearchPreferences = connect(mapStateToProps, {updateSearchPreferences})(SearchPreferencesComponent);
export default SearchPreferences;
