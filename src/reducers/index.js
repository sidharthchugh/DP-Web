import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import { reducer as tooltip } from 'redux-tooltip';
import user from './user';
import profile from './profile';
import search from './search';
import notification from './notification';
import matches from './matches';
import projects from './projects';
import cms from './cms';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  profile,
  search,
  form: formReducer,
  routing,
  notification,
  tooltip,
  matches,
  projects,
  cms
});

export default rootReducer;
