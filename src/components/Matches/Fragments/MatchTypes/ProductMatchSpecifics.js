import React from 'react';
import MatchField from '../MatchField';
import strings from '../../../../components/util/language';
import {Grid} from 'semantic-ui-react';

const ProductMatchSpecifics = (props) => {
  const {matchedProduct} = props;
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column computer={12} textAlign="left">
          {matchedProduct.productName.typeValues? <div className="label-generic match-summary--header-specific">
            Product/Service: {matchedProduct.productName.typeValues}
          </div> : matchedProduct.productName.typeValues = '-' }
        </Grid.Column>
        <Grid.Column tablet={12} computer={4} textAlign="left">
          <MatchField
            className="match-summary--specific"
            name="digitalProductCategory"
            label={props.searchType === 'startupSearch' ? strings.matchProductClass : strings.matchProductCategory}
            field={props.searchType === 'startupSearch' ? matchedProduct.productClass.typeValues : matchedProduct.productCategory.typeValues}
          />
        </Grid.Column>
        <Grid.Column tablet={12} computer={4} textAlign="left">
          <MatchField
            className="match-summary--specific"
            name="valueProposition"
            label={props.searchType === 'startupSearch' ? strings.matchProductCoreTech : strings.matchValueProposition}
            field={props.searchType === 'startupSearch' ? matchedProduct.productCoreTechnologies.typeValues : matchedProduct.applicationValueProposition.typeValues}
          />
        </Grid.Column>
        <Grid.Column tablet={12} computer={4} textAlign="left">
          <MatchField
            className="match-summary--specific"
            name="uniqueSellingPoints"
            label={props.searchType === 'startupSearch' ? strings.matchTechnologyField : strings.matchUniqueSellingPoint}
            field={props.searchType === 'startupSearch' ? matchedProduct.technologyField.typeValues : matchedProduct.uniqueSellingPoints.typeValues}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProductMatchSpecifics;
