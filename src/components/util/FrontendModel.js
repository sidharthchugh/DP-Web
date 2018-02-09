import React from 'react';
import {Field} from 'redux-form';
import UUID from 'node-uuid';
import {Link} from 'react-router';
import { Grid, Checkbox} from 'semantic-ui-react';
import TooltipWrapper from '../../components/util/TooltipWrapper';
import {chooseEditType} from './FrontendFields';
import FontAwesome from 'react-fontawesome';
import {renderCheckBox} from '../renderFields';

// FIXME:React Warnings for Same key.

/**
 *
 const fields = props.sectionName[key];   // Fields from Sections
 const dbFields = props.profileDetails[key];  // Fields from Database Schema
 const multiFields = fields[fieldValues];  // Multi Fields witch array
 */
let responsive;
const FrontendModel = (props) => {
const languagePref = props.userLanguage === 'German';
const tooltip = (values) => {
   if (props.userLanguage === 'German') {
    return values.germanTooltip;
 } else if (props.userLanguage === 'English') {
    return values.englishTooltip;
 }
    return 'n/a';
};
if (props.responsive) {
  responsive = {
    mobile: props.responsive.mobile || 12,
    tablet: props.responsive.tablet || 6,
    computer: props.responsive.computer || props.columns,
    largeScreen: props.responsive.largeScreen || props.columns,
    widescreen: props.responsive.widescreen || props.columns,
  };
} else {
  responsive = {
    mobile: 12,
    tablet: 6,
    computer: props.columns,
    largeScreen: props.columns,
    widescreen: props.columns,
  };
}

return (
  <Grid>
    {Object.keys(props.sectionName).map(((key) => {
      const fields = props.sectionName[key];
      const dbFields = props.profileDetails[key];
      return (
        <Grid.Column
          mobile={responsive.mobile}
          tablet={responsive.tablet}
          computer={responsive.computer}
          largeScreen={responsive.largeScreen}
          widescreen={responsive.widescreen}
          key={key}>
          {Object.prototype.hasOwnProperty.call(fields, 'germanLabel') &&
            <div>
              <TooltipWrapper name={fields.name} tooltip={tooltip(fields)} tooltipOff={props.tooltipOff}>
                <div>
                  <div className={fields.labelClassName}>
                    {languagePref ? fields.germanLabel : fields.englishLabel}
                    <div className="inline-icon">
                      {dbFields && (dbFields.type === 'dropdown' || dbFields.type === 'multiSelectAutoSuggest' || dbFields.type === 'dropdownMultiple') && <FontAwesome name="list-ul" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      {dbFields && dbFields.type === 'textArea' && <FontAwesome name="edit" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      {fields && fields.type === 'string' && <FontAwesome name="pencil" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      {dbFields && dbFields.type === 'multiSelect' && <FontAwesome name="tags" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      {fields && fields.type === 'location' && <FontAwesome name="map-marker" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      {fields && fields.type === 'phone' && <FontAwesome name="phone" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      {fields && fields.type === 'skype' && <FontAwesome name="skype" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      {fields && fields.type === 'facebook' && <FontAwesome name="facebook-square" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      {fields && fields.type === 'linkedIn' && <FontAwesome name="linkedin" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      {fields && fields.type === 'twitter' && <FontAwesome name="twitter" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      {fields && fields.ko === 'yes' && <div><Checkbox checked={dbFields.ko === 'true'} className="profile-value checkbox-style-save-mode" /><div className="profile-label profile-value ko-label-save-mode">K.O</div></div>}
                    </div>
                  </div>
                </div>
              </TooltipWrapper>
              <TooltipWrapper name={fields.name} tooltip={tooltip(fields)} tooltipOff={props.tooltipOff}>
                <div className={fields.valueClassName}>
                  {!props.reference && fields.mailTo !== 'yes' && fields.clickable !== 'yes' && dbFields && (dbFields.type === 'string' || dbFields.type === 'location' || dbFields.type === 'dropdown' || dbFields.type === 'textArea') && dbFields.typeValues}
                  {fields && (fields.clickable && fields.clickable === 'yes') && dbFields && <a className="profile-contact" href={dbFields.typeValues}>{dbFields.typeValues}</a>}
                  {fields && (fields.mailTo && fields.mailTo === 'yes') && dbFields && <a className="profile-contact" target="_top" href={`mailto:${dbFields.typeValues}?cc=info@digitalpartners.io&subject=Get%20in%20contact`} >{dbFields.typeValues}</a>}
                  {props.reference && props.profileDetails.map((values) => {
                      return (
                        <div className="profile-value bottom-spacing" key={values[key].typeValues}>
                          {values[key].typeValues}
                        </div>
                      );
                    })}
                  {!props.reference && dbFields && (dbFields.type === 'networkAutoSuggest') && dbFields.typeValues.value}
                  {!props.reference && dbFields && (dbFields.type === 'dropdownMultiple' || dbFields.type === 'multiSelectAutoSuggest' || dbFields.type === 'multiSelect') && dbFields.typeValues.map((values) => {
                      return (
                        values.value !== '' && <div className="profile-tags" key={values.value}>
                          {values.value}
                        </div>
                      );
                    })}
                </div>
              </TooltipWrapper>
            </div>
        }
          {!Object.prototype.hasOwnProperty.call(fields, 'germanLabel') && Object.keys(fields).map((fieldValues) => {
            const multiFields = fields[fieldValues];
            return (
              <div key={fieldValues} className={props.multiSectionColumns}>
                {multiFields.germanLabel !== '' &&
                <TooltipWrapper name={UUID.v4()} tooltip={tooltip(multiFields)} tooltipOff={props.tooltipOff}>
                  <div>
                    <div className={multiFields.labelClassName}>
                      {languagePref ? multiFields.germanLabel : multiFields.englishLabel}
                      <div className="inline-icon">
                        {dbFields && (dbFields.type === 'dropdown' || dbFields.type === 'multiSelectAutoSuggest' || dbFields.type === 'dropdownMultiple') && <FontAwesome name="list-ul" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {dbFields && dbFields.type === 'textArea' && <FontAwesome name="edit" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {fields && fields.type === 'string' && <FontAwesome name="pencil" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {dbFields && dbFields.type === 'multiSelect' && <FontAwesome name="tags" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {fields && fields.type === 'location' && <FontAwesome name="map-marker" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {fields && fields.type === 'phone' && <FontAwesome name="phone" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {fields && fields.type === 'skype' && <FontAwesome name="skype" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {fields && fields.type === 'facebook' && <FontAwesome name="facebook-square" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {fields && fields.type === 'linkedIn' && <FontAwesome name="linkedin" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {fields && fields.type === 'twitter' && <FontAwesome name="twitter" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {multiFields && multiFields.ko === 'yes' && <Checkbox checked={multiFields.ko === 'true'} className="profile-value checkbox-style-save-mode" label={'K.O.'} disabled="disabled" />}
                        {multiFields && multiFields.type === 'textArea' && <FontAwesome name="edit" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {multiFields && multiFields.type === 'string' && <FontAwesome name="pencil" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                        {multiFields && (multiFields.type === 'dropdownMultiple' || multiFields.type === 'dropdown' || multiFields.type === 'multiSelectAutoSuggest' || multiFields.type === 'multiSelect') && <FontAwesome name="list-ul" style={{font: 'normal normal normal 14px/1 FontAwesome'}} />}
                      </div>
                    </div>
                  </div>
                </TooltipWrapper>
                }
                <TooltipWrapper name={UUID.v4()} tooltip={tooltip(multiFields)} tooltipOff={props.tooltipOff}>
                  <div className={multiFields.valueClassName}>
                    {dbFields && dbFields.map((values) => {
                        return (
                          <div className="profile-multiValues">
                            {values[fieldValues] && (values[fieldValues].type === 'string' || values[fieldValues].type === 'dropdown' || values[fieldValues].type === 'textArea') && values[fieldValues].typeValues}
                            {values[fieldValues] && (values[fieldValues].type === 'networkAutoSuggest') && <div>
                                {values[fieldValues].typeValues.profileId && <Link to={`profiles/${values[fieldValues].typeValues.profileId}`} className="profile-value">
                                  {values[fieldValues].typeValues.value}
                                </Link>}
                                {!values[fieldValues].typeValues.profileId && <div className="profile-value">{values[fieldValues].typeValues.value} </div>}
                              </div> }
                            {values[fieldValues] && (values[fieldValues].type === 'dropdownMultiple' || values[fieldValues].type === 'multiSelectAutoSuggest' || values[fieldValues].type === 'multiSelect') && values[fieldValues].typeValues.map((multiValues) => {
                              return (
                                multiValues.value !== '' && <div className="profile-multiTags" key={multiValues.value}>
                                  {multiValues.value}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                  </div>
                </TooltipWrapper>
              </div>
            );
        })}
          {!props.specialSection && <div className="edit-field">
            {Object.prototype.hasOwnProperty.call(fields, 'germanLabel') && chooseEditType(fields, props.userLanguage, props.arrayName, props.conditional)}
            {!Object.prototype.hasOwnProperty.call(fields, 'germanLabel') && chooseEditType({component: 'fieldArrays', userLanguage: props.userLanguage, arrayName: props.arrayName, conditional: props.conditional, sectionClassName: props.arrayClassName, type: key, formName: props.formName, sectionName: fields})}
          </div>}
        </Grid.Column>
      );
    }))}
  </Grid>
  );
};


export default FrontendModel;
