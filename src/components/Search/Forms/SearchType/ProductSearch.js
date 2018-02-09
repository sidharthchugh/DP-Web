import React from 'react';
import {reduxForm, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import SearchModel from '../../../util/FrontendModel';

class ProductSearch extends React.Component {
  render() {
    const {searchDetails, userLanguage, hasApplicationIndustry, hasApplicationSector, hasApplicationSubSector} = this.props;
    const productSearchFields = searchDetails.productSearch.fields;
    return (
      <div className="no-gutter detailed-search-fields service-product-search">
        <SearchModel
          sectionName={productSearchFields}
          profileDetails={productSearchFields}
          userLanguage={userLanguage}
          conditional={Object.assign({}, {hasApplicationIndustry}, {hasApplicationSector}, {hasApplicationSubSector})}
          columns={4} />
      </div>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ProductSearch = reduxForm({
  form: 'ProductSearch'// ,  // a unique identifier for this form
})(ProductSearch);


// Decorate with connect to read form values
const selector = formValueSelector('ProductSearch'); // <-- same as form name
ProductSearch = connect(
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
)(ProductSearch);


export default ProductSearch;
