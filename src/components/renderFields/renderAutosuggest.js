import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {displayCompName} from 'actions/profiles';

class renderAutoSuggest extends React.Component{
    constructor(props) {
				super(props);
				this.getUsers = this.getUsers.bind(this);
	}

	getUsers(input){
		const {displayCompName} = this.props;
		if (!input) {
			return Promise.resolve({ options: [] });
		}
		return displayCompName({profileSearch:input})
			.then((response) => {
				if (response.payload.status === 200) {
					let user = response.payload.data.map((a,i) => {
           return { value: a.compname, label: a.compname, profileId: a.searchId };
          });
					return {options:user}
			  }
			})
	}


		render(){
			const {compNames} = this.props;
			return(
        <div>
				<Select.AsyncCreatable
					multi={false}
					loadOptions={this.getUsers}
					value={this.props.input.value}
					onChange={this.props.input.onChange}
				/>
        </div>   
			)
		}
}
renderAutoSuggest.propTypes = {
  displayCompName: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
     compNames: state.profile.compNames
  };
}

export default connect(mapStateToProps, {displayCompName})(renderAutoSuggest);