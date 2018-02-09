import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import UUID from 'node-uuid';
import {Sticky} from 'react-sticky';
import editIcon from 'images/edit-icon.png';
import {FieldArray} from 'redux-form';
import renderMultiSection from 'components/renderFields/renderMultiSection';
import CollapsibleCardWrapper from 'components/util/CollapsibleCardWrapper';
import {ProductServices} from '../Sections/ProductServices';
import ProfileModel from 'components/util/FrontendModel';
import TooltipWrapper from 'components/util/TooltipWrapper';
import { Grid, Button } from 'semantic-ui-react';
import strings from 'components/util/language';
import FontAwesome from 'react-fontawesome';
import Scrollchor from 'react-scrollchor';
import 'styles/components/profile/profilePageGenerals.css';


class Product extends Component {  //eslint-disable-line

  /*
 * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
 * properties on the constructor
 * Read more here: https://facebook.github.io/react/blog/2014/01/27/react-v0.13.0-beta-1.html#es6-classes
 */
 constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      expanded_index: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  // Edit and Save Mode for Profile Page
  toggleEdit(section, edit_on) {
    this.props.toggleProfileEdit(section, edit_on);
  }

  // Add a new product
  addProduct() {
    const {profileDetails} = this.props;
    const new_product = {
     productName: {
       type: 'string',
       typeValues: '',
     },
     productCreatedAt: Date.now()
    };
    const new_products = new Array();
    for (let i = 0; i < profileDetails.products.length; i++) {
      const product = profileDetails.products[i];
      new_products.push(profileDetails.products[i]);
    }
    new_products.push(new_product);
     const expanded_index = new_products.length - 1;
    const values = {...profileDetails, products: new_products };
    const addProductIndex = true;

    this.props.productName(values, expanded_index, addProductIndex, 'Product Added', profileDetails);
    // The index of the product card to expand
    // const expanded_index = new_products.length - 1;
    this.setState({
      ...this.state,
      expanded_index
    });
  }

  // Removes a product
  removeProduct(delete_id) {
    // Ask user to confirm delete
    const sure_delete = window.confirm('Are you sure you want to delete?');
    if (sure_delete) {
      const {profileDetails} = this.props;
      const new_products = new Array();
      // Rebuild new Products array
      for (let i = 0; i < profileDetails.products.length; i++) {
        const product = profileDetails.products[i];
        if (product.elasticId != delete_id) {
          new_products.push(profileDetails.products[i]);
        }
      }
      // Build new values array and sent it to save
      const values = {...profileDetails, products: new_products };
      const addProductIndex = true;
      const expanded_index = false;
      this.props.productName(values, expanded_index, addProductIndex);
    }
  }

  render() {
    const self = this;
    const {handleSubmit, sections, profileDetails, userLanguage, strings, hasProduct, cmsData, initialValues, fullprofile} = this.props;
    const productSection = ProductServices(cmsData);
    const languagePref = userLanguage === 'German';
    const stickyProps = {
      style: {
        transform: 'none',
        zIndex: 99,
        position: 'absolute',
        width: '100%'
      } // ensure btn is always on top
    };
  let tooltipOff = false;

   if (fullprofile) {
     tooltipOff = true;
   }

  //  const productName= ;
  //  const AppDomain= ;
  //  const valuePrice = ;
  //  const OpDetails = ;

    return (
      <Grid className="no-vertical-margin no-vertical-padding">
        {this.props.sidebarP !== 'true' && profileDetails.products && profileDetails.products.length === 0 &&
          <Grid.Column computer={16} className="no-vertical-margin no-vertical-padding no-gutter">
            <div className="row profile-card services card-generic">
              <CollapsibleCardWrapper title={strings.productService} defaultCollapsed />
            </div>
            </Grid.Column>
        }
        {this.props.sidebarP !== 'true' && profileDetails.products && profileDetails.products.map((product, index) =>
          <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding no-gutter" key={index}>
            <form onSubmit={handleSubmit} className="products-form" >
              <div id={'productName' + index} className={'profile-card services product-section' + (sections['productName' + index] && sections['productName' + index].editable && !fullprofile ? ' edit-label' : '')}>
                <CollapsibleCardWrapper title={strings.productService + ': ' + product.productName.typeValues} defaultCollapsed={self.state.expanded_index !== index}>
                  {/* <div id={'productName'} />*/}
                  <Sticky
                  style={stickyProps.style}
                >
                    <div className="edit-save-wrapper">
                      {!fullprofile && <a className="edit-collapsed-button collapse-edit save-cancel-edit-button-product" onClick={() => this.toggleEdit('productName' + index)}>
                        <img src={editIcon} role="presentation" /> {strings.edit}
                      </a>}
                      <div className="save-cancel-collapsed-button collapse-edit save-cancel-edit-button-product">
                        <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('productName' + index, false)}>{strings.cancel}</Button>
                        <Button className="button-small button" type="button" onClick={handleSubmit(values => this.props.productName(values, index, null, null, profileDetails))}>{strings.save}</Button>
                      </div>
                    </div>
                  </Sticky>
                  <Grid className="no-vertical-margin section-margin products">
                    {/* Product Sub Section */}
                    <Grid.Column computer={12} className="no-gutter">
                      <div className="specialSection">
                        {/* Product Service */}
                        <ProfileModel
                          specialSection
                          sectionName={productSection.productService}
                          profileDetails={product}
                          userLanguage={userLanguage}
                          tooltipOff={tooltipOff}
                          columns={4} />
                        <div className="profileSection" />
                        {/* Application Domain */}
                        <TooltipWrapper name={'Application Domain'} tooltipOff={tooltipOff} tooltip={languagePref ? 'Verbinden Sie sich mit Ihren Geschäftspartnern, um Referenzen auszutauschen und Reputation aufzubauen.' : 'Connect to your customers and partners to exchange references and build visible reputation!'}>
                          <h4 id={'AppDomain'}>{strings.applicationDomain}</h4>
                        </TooltipWrapper>
                        <Sticky
                  style={stickyProps.style}
                >
                          <div className="edit-save-wrapper">
                            {!fullprofile && <a className="edit-collapsed-button collapse-edit" onClick={() => this.toggleEdit('productName' + index)}>
                              <img src={editIcon} role="presentation" /> {strings.edit}
                            </a>}
                            <div className="save-cancel-collapsed-button collapse-edit">
                              <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('productName' + index, false)}>{strings.cancel}</Button>
                              <Button className="button-small button" type="submit" onClick={handleSubmit(values => this.props.productName(values, index))}>{strings.save}</Button>
                            </div>
                          </div>
                        </Sticky>
                        <ProfileModel specialSection sectionName={productSection.applicationDomain} profileDetails={product} userLanguage={userLanguage} columns={4} />
                        <div className="profileSection" />
                        {/* Value && Price*/}
                        <TooltipWrapper name={''} tooltipOff={tooltipOff} tooltip={languagePref ? 'Verbinden Sie sich mit Ihren Geschäftspartnern, um Referenzen auszutauschen und Reputation aufzubauen.' : 'Connect to your customers and partners to exchange references and build visible reputation!'}>
                          <h4 id={'valuePrice'}>{strings.valuePrice}</h4>
                        </TooltipWrapper>
                        <ProfileModel
                          specialSection
                          sectionName={productSection.valuePrice}
                          profileDetails={product}
                          userLanguage={userLanguage}
                          tooltipOff={tooltipOff}
                          columns={4} />
                        <div className="profileSection" />
                        {/* Operation Details */}
                        <TooltipWrapper name={'Application Domain'} tooltipOff={tooltipOff} tooltip={languagePref ? 'Verbinden Sie sich mit Ihren Geschäftspartnern, um Referenzen auszutauschen und Reputation aufzubauen.' : 'Connect to your customers and partners to exchange references and build visible reputation!'}>
                          <h4>{strings.operationDetails}</h4>
                        </TooltipWrapper>
                        <Sticky
                  style={stickyProps.style}
                >
                          <div className="edit-save-wrapper">
                            {!fullprofile && <a className="edit-button collapse-edit" onClick={() => this.toggleEdit('productName' + index)}>
                              <img src={editIcon} role="presentation" /> {strings.edit}
                            </a>}
                            <div className="save-cancel-button collapse-edit">
                              <Button className="button-small button-small--grey" type="button" onClick={() => this.toggleEdit('productName' + index, false)}>{strings.cancel}</Button>
                              <Button className="button-small button" type="submit" onClick={() => this.toggleEdit('services')}>{strings.save}</Button>
                            </div>
                          </div>
                        </Sticky>
                        <ProfileModel specialSection sectionName={productSection.operationDetails} profileDetails={product} userLanguage={userLanguage} columns={4} />
                      </div>
                      <div id={'sidebarHeading'} className="edit-field">
                        <div className="add-input">
                          <ProfileModel
                            arrayName={'products[' + index + ']'}
                            sectionName={productSection.productService}
                            profileDetails={product}
                            userLanguage={userLanguage}
                            tooltipOff={tooltipOff}
                            sidebar={this.props.sidebar}
                            columns={4} />
                          <div className="profileSection" />
                          <h4>{strings.applicationDomain}</h4>
                          <ProfileModel
                            arrayName={'products[' + index + ']'}
                            sectionName={productSection.applicationDomain}
                            conditional={hasProduct && hasProduct.values.products && hasProduct.values.products[index] ? Object.assign({}, {hasApplicationIndustry: hasProduct.values.products[index].applicationIndustry}, {hasApplicationSector: hasProduct.values.products[index].applicationSector}, {hasApplicationSubSector: hasProduct.values.products[index].applicationSubSector}) : {}}
                            profileDetails={product}
                            userLanguage={userLanguage}
                            tooltipOff={tooltipOff}
                            columns={4} />

                          <div className="profileSection" />
                          <h4>{strings.valuePrice}</h4>
                          <ProfileModel
                            arrayName={'products[' + index + ']'}
                            tooltipOff={tooltipOff}
                            sectionName={productSection.valuePrice}
                            profileDetails={product}
                            userLanguage={userLanguage}
                            columns={4} />
                          <div className="profileSection" />
                          <h4>{strings.operationDetails}</h4>
                          <ProfileModel
                            arrayName={'products[' + index + ']'}
                            tooltipOff={tooltipOff}
                            sectionName={productSection.operationDetails}
                            profileDetails={product}
                            userLanguage={userLanguage}
                            columns={4} />
                        </div>
                        <Grid>
                          <Grid.Column computer={12}>
                            <Button
                              className="button-2"
                              type="button"
                              onClick={self.removeProduct.bind(self, product.elasticId)}
                              ><FontAwesome name="minus-circle" />{strings.removeProductOrService}
                            </Button>
                          </Grid.Column>
                        </Grid>
                      </div>
                    </Grid.Column>
                  </Grid>
                </CollapsibleCardWrapper>
              </div>
            </form>
          </Grid.Column>
        )}
        {this.props.sidebarP === 'true' && profileDetails.products && profileDetails.products.map((product, index) =>
          <Grid.Column computer={12} className="no-vertical-margin no-vertical-padding" key={index}>
            <div className="saved-card">
              <div className="search-details">
                <Scrollchor to={'productName' + index} className="product-sidebar " animate={{offset: -58, duration: 500}}>
                  <h3 className="sidebar-headerpro">{strings.productService + ': ' + product.productName.typeValues}</h3>
                </Scrollchor>

              </div>
            </div>
          </Grid.Column>
        )}
        {this.props.sidebarP !== 'true' && !fullprofile && <Grid.Column computer={16} className="no-vertical-margin no-vertical-padding no-gutter">
          <Grid.Row className={'profile-card'}>
            <div className="add-array">
              <FontAwesome name="plus-circle" />
              <a className="button-2" type="button" onClick={this.addProduct}>{strings.addProductOrService}</a>
            </div>
          </Grid.Row>
        </Grid.Column>}
      </Grid>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
Product = reduxForm({
  form: 'Product'// ,  // a unique identifier for this form
})(Product);


// Decorate with connect to read form values
Product = connect(
  (state, ownProps) => {
    // can select values individually
    const hasProduct = ownProps.form ? state.form[ownProps.form] : state.form.Product;
    return {
      hasProduct,
      initialValues: ownProps.profileDetails,
      enableReinitialize: true
    };
  }
)(Product);

export default Product;
