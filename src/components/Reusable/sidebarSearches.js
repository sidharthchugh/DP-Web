import React from 'react';
import {Link} from 'react-router';
import FontAwesome from 'react-fontawesome';
import '../../styles/components/sidebarNav.css';
import strings from '../util/language';
import { Grid } from 'semantic-ui-react';
import InlineCss from 'react-inline-css';
import Scrollchor from 'react-scrollchor';
import SavedSearchList from 'components/Search/Forms/SavedSearchList';

const SidebarSearches = (props) => {
    return (
      <Grid>
        <Grid.Column computer={12} className="card-generic mobile hidden tablet hidden nav">
          <div id="profile">
            <h3 className="sidebar-headertitle">Search</h3>
            <Scrollchor to={'new-search'} animate={{offset: -30, duration: 500}}>
              <h3 className="sidebar-header1">New Search</h3>
            </Scrollchor>
            <Scrollchor to={'saved-search'} animate={{offset: -30, duration: 500}}>
              <h3 className="sidebar-header1">Saved Searches</h3>
            </Scrollchor>
            <SavedSearchList sidebar={'true'} className="sidebar-header2" searchId={props.searchId} />
            {/* DEACTIVATED ... see Search.js for more
            <Scrollchor to={'search-preferences'} animate={{offset: -58, duration: 500}}>
              <h3 className="sidebar-header1">Passive Search Preferences</h3>
            </Scrollchor> */}
          </div>
        </Grid.Column>
      </Grid>
    );
  };
//    {props.images.map(function(image){
//           <li><a href='#'><img src= {image.src} className='img-responsive img-rounded img-thumbnail' alt= {image.mediaId}/></a></li>
//         })}
export default SidebarSearches;
