import React from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import SearchModel from '../../../util/FrontendModel';

class ProductServiceSearch extends React.Component {
  render() {
    const {searchDetails, userLanguage, hasApplicationIndustry, hasApplicationSector, hasApplicationSubSector} = this.props;
    const productDetailSearchFields = searchDetails.productDetailSearch.fields;
    return (
      <div className="no-gutter detailed-search-fields service-product-search">
        <SearchModel
          sectionName={productDetailSearchFields}
          profileDetails={productDetailSearchFields}
          userLanguage={userLanguage}
          conditional={Object.assign({}, {hasApplicationIndustry}, {hasApplicationSector}, {hasApplicationSubSector})}
          columns={4} />
      </div>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ProductServiceSearch = reduxForm({
  form: 'ProductServiceSearch'// ,  // a unique identifier for this form
})(ProductServiceSearch);


// Decorate with connect to read form values
const selector = formValueSelector('ProductServiceSearch'); // <-- same as form name
ProductServiceSearch = connect(
  (state) => {
    // can select values individually
    const hasApplicationIndustry = selector(state, 'applicationIndustry');
    const hasApplicationSector = selector(state, 'applicationSector');
    const hasApplicationSubSector = selector(state, 'applicationSubSector');

    return {
      hasApplicationIndustry,
      hasApplicationSector,
      hasApplicationSubSector
    };
  }
)(ProductServiceSearch);


export default ProductServiceSearch;
