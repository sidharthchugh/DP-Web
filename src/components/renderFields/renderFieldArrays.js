import React from 'react';
import FontAwesome from 'react-fontawesome';
import {chooseEditType} from '..//util/FrontendFields';
import { Grid } from 'semantic-ui-react';

function remove(fields, index) {
  const sureDelete = confirm('Are you sure you want to delete?');
  if (sureDelete) {
    fields.remove(index);
  }
}

const renderFieldArrays = ({ fields, sectionName, arrayName, sectionClassName, userLanguage, formName}) => (
  <div>
    <ul className="add-field-list">
      {fields.map((member, index) =>
        <div key={index}>
          <li>
            <Grid.Row>
                {Object.keys(sectionName).map((fieldValues) => {
                 const fieldArrays = Object.assign(sectionName[fieldValues]);
                 fieldArrays.name = `${member}.${fieldValues}`;
                 return (
                   <div key={`${member}.${fieldValues}`} className={sectionClassName}>
                     <div className="addFields-label">
                       {Object.prototype.hasOwnProperty.call(fieldArrays, 'germanLabel') && chooseEditType(fieldArrays, userLanguage, arrayName)}
                       {!Object.prototype.hasOwnProperty.call(fieldArrays, 'germanLabel') && chooseEditType({component: 'fieldArrays', type: fieldValues, sectionName: fieldArrays, userLanguage})}
                     </div>
                   </div>
                 );
               })}
                <div className="column-remove-button">
                  <a
                    className="remove-button"
                    type="button"
                    onClick={() => remove(fields, index)}> x
                  </a>
                </div>
            </Grid.Row>
          </li>
        </div>
        )}
      </ul>
      <div className={formName === 'ProductServices' || formName === 'Projects' ? 'specialAdd-field' : 'add-field'}>
        <a className="botton-4" type="button" onClick={() => fields.push({})}><FontAwesome name="plus-circle" />ADD</a>
      </div>
  </div>
);

export default renderFieldArrays;
