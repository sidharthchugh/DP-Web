import React from 'react';
import Moment from 'moment';
import {Field, FieldArray} from 'redux-form';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number';
import TooltipWrapper from '../../components/util/TooltipWrapper';
import {multiSelectValues} from '../../components/util/multiSelectValues';
import {renderInput, renderTextArea, renderDropdownList, renderTags, renderMultiDropdowns, renderGeoSuggestRegions, renderCalandar, renderFieldArrays, renderNumberPicker, renderCheckBox} from '../renderFields';
import renderAutosuggest from '../renderFields/renderAutosuggest';
// For Calander and Number Picker
momentLocalizer(Moment);
numberLocalizer();


// Types of Components used in form
export function chooseEditType(value, userLanguage, arrayName, conditional) {
    const multipleArray = arrayName;
     let typeValuesArray = [];
     // If value.typeValues is defined, transform into Array<string> for redux-form render
     if (value.typeValues) {
       typeValuesArray = Object.keys(value.typeValues).map(key => value.typeValues[key]);
     }

     const dropdownValues = (conditionalType, conditionalValues) => {
       if (conditionalType && conditionalType.typeValues) {
        return Object.keys(conditionalValues[`${conditionalType.typeValues}`]).map(key => conditionalValues[`${conditionalType.typeValues}`][key]);
      }
    };

    const multidropdownValues = (conditionalType, conditionalValues) => {
      if (conditionalType && conditionalType.typeValues) {
      const arrays = [];
       const conditionalArray = Object.keys(conditionalValues[`${conditionalType.typeValues}`]).map(key => conditionalValues[`${conditionalType.typeValues}`][key]);
       while (conditionalArray.length > 0) {
          arrays.push(conditionalArray.splice(0, 1));
       }
      return multiSelectValues(arrays);
     }
   };

   const multiTagsValues = (conditionalType, conditionalValues) => {
     if (conditionalType && conditionalType.typeValues) {
       const arrays = [];
       const multiTags = [];
       let conditionalArray = [];
         conditionalType.typeValues.map((item) => {
           conditionalArray = Object.keys(
             conditionalValues[`${item.value}`]).map((key) => {
               multiTags.push(conditionalValues[`${item.value}`][key]);
             }
             );
        });
        while (multiTags.length > 0) {
           arrays.push(multiTags.splice(0, 1));
        }
     return multiSelectValues(arrays);
    }
  };

     const validate = (values, characterLimit) => {
      if (values) {
          if (values.length <= parseInt(characterLimit, 10)) {
            return values;
          }
        } else {
            return values;
        }
      };

      const validateNumber = (values) => {
       if (values) {
          const numberValues = /[a-z]/.test(values.toLowerCase());
           if (!numberValues) {
             return values;
           }
         } else {
             return values;
         }
       };
       const formatNum = (value) => {
        if (!value) {
          return value;
        }
        const onlyNums = value.replace(/[^\d]/g, '');
        if (onlyNums.length <= 3) {
          return `€ ${onlyNums}`;
        }
        if (onlyNums.length <= 4) {
          return `€ ${onlyNums.slice(0, 1)},${onlyNums.slice(1)}`;
        }
         if (onlyNums.length <= 5) {
          return `€ ${onlyNums.slice(0, 2)},${onlyNums.slice(2)}`;
        }
        if (onlyNums.length <= 6) {
          return `€ ${onlyNums.slice(0, 3)},${onlyNums.slice(3)}`;
        }
        if (onlyNums.length <= 7) {
          return `€ ${onlyNums.slice(0, 1)},${onlyNums.slice(1, 4)},${onlyNums.slice(4)}`;
        }
        if (onlyNums.length <= 8) {
          return `€ ${onlyNums.slice(0, 2)},${onlyNums.slice(2, 5)},${onlyNums.slice(5)}`;
        }
        if (onlyNums.length <= 9) {
          return `€ ${onlyNums.slice(0, 3)},${onlyNums.slice(3, 6)},${onlyNums.slice(6)}`;
        }
        if (onlyNums.length <= 10) {
          return `€ ${onlyNums.slice(0, 1)},${onlyNums.slice(1, 4)},${onlyNums.slice(4, 7)},${onlyNums.slice(7)}`;
        }
         if (onlyNums.length <= 11) {
          return `€ ${onlyNums.slice(0, 2)},${onlyNums.slice(2, 5)},${onlyNums.slice(5, 8)},${onlyNums.slice(8)}`;
        }
        if (onlyNums.length <= 12) {
          return `€ ${onlyNums.slice(0, 3)},${onlyNums.slice(3, 6)},${onlyNums.slice(6, 9)},${onlyNums.slice(9)}`;
        }
        if (onlyNums.length <= 13) {
          return `€ ${onlyNums.slice(0, 1)},${onlyNums.slice(1, 4)},${onlyNums.slice(4, 7)},${onlyNums.slice(7, 10)},${onlyNums.slice(10)}`;
        }
        if (onlyNums.length <= 14) {
          return `€ ${onlyNums.slice(0, 2)},${onlyNums.slice(2, 5)},${onlyNums.slice(5, 8)},${onlyNums.slice(8, 11)},${onlyNums.slice(11)}`;
        }
        if (onlyNums.length <= 15) {
          return `€ ${onlyNums.slice(0, 3)},${onlyNums.slice(3, 6)},${onlyNums.slice(6, 9)},${onlyNums.slice(9, 12)},${onlyNums.slice(12, 15)}`;
        }
        if (onlyNums.length > 15) {
          return `€ ${onlyNums.slice(0, 3)},${onlyNums.slice(3, 6)},${onlyNums.slice(6, 9)},${onlyNums.slice(9, 12)},${onlyNums.slice(12, 15)}`;
        }
        return `€ ${onlyNums.slice(0, 3)},${onlyNums.slice(3, 6)},${onlyNums.slice(6, 9)},${onlyNums.slice(9, 12)},${onlyNums.slice(12, 15)},${onlyNums.slice(15)}`;
      };

      const tooltip = (values) => {
         if (userLanguage === 'German') {
          return values.germanTooltip;
       } else if (userLanguage === 'English') {
          return values.englishTooltip;
       }
          return '';
      };
      const placeholders = (values) => {
         if (userLanguage === 'German') {
           if (values.germanPlaceholder) {
            return values.germanPlaceholder;
          }
            return values.germanLabel;
       } else if (userLanguage === 'English') {
             if (values.englishPlaceholder) {
              return values.englishPlaceholder;
            }
          return values.englishLabel;
       }
          return '';
      };

     return (
       <div>
         {(() => {
             if (value.component === 'dropdown') {
              return (
                <div>
                  {value.ko && value.ko === 'yes' && <Field name={multipleArray ? `${multipleArray}.${value.name}.ko` : `${value.name}.ko`} component={renderCheckBox} className="check-box-style-edit-mode" />}
                  <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                    <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderDropdownList} data={typeValuesArray} placeholder={placeholders(value)} />
                  </TooltipWrapper>
                </div>
              );
          } else if (value.component === 'dropdownspecial') {
            if (value.name === 'sector') {
                return (
                  <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                    <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderDropdownList} data={dropdownValues(conditional.hasIndustry, value.conditionalValues)} placeholder={placeholders(value)} disabled={(conditional.hasIndustry && conditional.hasIndustry.typeValues === '')} />
                  </TooltipWrapper>
                );
            } else if (value.name === 'subSector') {
                    return (
                      <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                        <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderMultiDropdowns} options={multidropdownValues(conditional.hasSector, value.conditionalValues)} placeholder={placeholders(value)} disabled={(conditional.hasSector && conditional.hasSector.typeValues === '')} labelKey={value.label} />
                      </TooltipWrapper>
                    );
                } else if (value.name === 'applicationSector') {
                    return (
                      <div>
                        {value.ko && value.ko === 'yes' && <Field name={multipleArray ? `${multipleArray}.${value.name}.ko` : `${value.name}.ko`} component={renderCheckBox} className="check-box-style-edit-mode" />}
                        <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                          <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderMultiDropdowns} options={multiTagsValues(conditional.hasApplicationIndustry, value.conditionalValues)} placeholder={placeholders(value)} disabled={!(conditional.hasApplicationIndustry && conditional.hasApplicationIndustry.typeValues.length > 0)} labelKey={value.label} />
                        </TooltipWrapper>
                      </div>
                    );
                } else if (value.name === 'applicationSubSector') {
                  return (
                    <div>
                      {value.ko && value.ko === 'yes' && <Field name={multipleArray ? `${multipleArray}.${value.name}.ko` : `${value.name}.ko`} component={renderCheckBox} className="check-box-style-edit-mode" />}
                      <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                          <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderMultiDropdowns} options={multiTagsValues(conditional.hasApplicationSector, value.conditionalValues)} placeholder={placeholders(value)} disabled={!(conditional.hasApplicationSector && conditional.hasApplicationSector.typeValues.length > 0)} labelKey={value.label} />
                        </TooltipWrapper>
                    </div>
                    );
                } else if (value.name === 'partnerSector') {
                    return (
                      <div>
                        {value.ko && value.ko === 'yes' && <Field name={multipleArray ? `${multipleArray}.${value.name}.ko` : `${value.name}.ko`} component={renderCheckBox} className="check-box-style-edit-mode" />}
                        <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                          <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderMultiDropdowns} options={multiTagsValues(conditional.hasPartnerIndustry, value.conditionalValues)} placeholder={placeholders(value)} disabled={!(conditional.hasPartnerIndustry && conditional.hasPartnerIndustry.typeValues.length > 0)} labelKey={value.label} />
                        </TooltipWrapper>
                      </div>
                    );
                } else if (value.name === 'partnerSubSector') {
                    return (
                      <div>
                        {value.ko && value.ko === 'yes' && <Field name={multipleArray ? `${multipleArray}.${value.name}.ko` : `${value.name}.ko`} component={renderCheckBox} className="check-box-style-edit-mode" />}
                        <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                          <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderMultiDropdowns} options={multiTagsValues(conditional.hasPartnerSector, value.conditionalValues)} placeholder={placeholders(value)} disabled={!(conditional.hasPartnerSector && conditional.hasPartnerSector.typeValues.length > 0)} labelKey={value.label} />
                        </TooltipWrapper>
                      </div>
                    );
                }
            } else if (value.component === 'searchBox') {
                return (
                  <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                    <Field name={value.name} component={renderDropdownList} data={typeValuesArray} placeholder={userLanguage === 'German' ? 'Such-Szenario auswählen' : 'Choose a Search Scenario'} />
                  </TooltipWrapper>
                );
            } else if (value.component === 'dropdownMultiple') {
                return (
                  <div>
                    {value.ko && value.ko === 'yes' && <Field name={multipleArray ? `${multipleArray}.${value.name}.ko` : `${value.name}.ko`} component={renderCheckBox} className="check-box-style-edit-mode" />}
                    <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                      <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderMultiDropdowns} options={typeValuesArray} placeholder={placeholders(value)} labelKey={value.label} />
                    </TooltipWrapper>
                  </div>
                );
              } else if (value.component === 'text') {
                return (
                  <div>
                    {value.ko && value.ko === 'yes' && <Field name={multipleArray ? `${multipleArray}.${value.name}.ko` : `${value.name}.ko`} component={renderCheckBox} className="check-box-style-edit-mode" />}
                    <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                      <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderInput} type="text" placeholder={placeholders(value)} validations={value.validations} normalize={value.validations !== '' ? values => validate(values, value.validations) : validate()} />
                    </TooltipWrapper>
                  </div>
                );
              } else if (value.component === 'number') {
                return (
                  <div>
                    {value.ko && value.ko === 'yes' && <Field name={multipleArray ? `${multipleArray}.${value.name}.ko` : `${value.name}.ko`} component={renderCheckBox} className="check-box-style-edit-mode" />}
                    <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                    <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderInput} type="text" placeholder={placeholders(value)} normalize={values => formatNum(values)} />
                  </TooltipWrapper>
                  </div>
                );
              } else if (value.component === 'phoneNumber') {
                return (
                  <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                    <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderInput} type="text" placeholder={placeholders(value)} normalize={values => validateNumber(values)} />
                  </TooltipWrapper>
                );
              } else if (value.component === 'checkbox') {
                 return (
                   <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                     <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderInput} type={value.component} />
                   </TooltipWrapper>
                 );
               } else if (value.component === 'multiSelect' || value.component === 'multiSelectAutoSuggest') {
                  return (
                    <div>
                      {value.ko && value.ko === 'yes' && <Field name={multipleArray ? `${multipleArray}.${value.name}.ko` : `${value.name}.ko`} component={renderCheckBox} className="check-box-style-edit-mode" />}
                      <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                        <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderTags} options={typeValuesArray} placeholder={placeholders(value)} labelKey={placeholders(value)} />
                      </TooltipWrapper>
                    </div>
                  );
              } else if (value.component === 'textArea') {
                return (
                  <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                    <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderTextArea} placeholder={placeholders(value)} validations={value.validations} normalize={value.validations !== '' ? values => validate(values, value.validations) : validate()} />
                  </TooltipWrapper>
                );
              } else if (value.component === '(cities)' || value.component === '(regions)' || value.component === 'address') {
                return (
                  <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                    <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderGeoSuggestRegions} types={[`${value.component}`]} placeholder={placeholders(value)} />
                  </TooltipWrapper>
                );
              } else if (value.component === 'calandar') {
                return (
                  <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                    <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderCalandar} placeholder={placeholders(value)} max={new Date()} initialView={'decade'} formatValue={'YYYY'} fullyear />
                  </TooltipWrapper>
                );
              } else if (value.component === 'autosuggest') {
                return (
                  <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                    <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderAutosuggest} />
                  </TooltipWrapper>
                );
              } else if (value.component === 'calanderspecial') {
                    return (
                      <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                        <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderCalandar} placeholder={placeholders(value)} formatValue={'DD MMM YYYY'} min={new Date()} />
                      </TooltipWrapper>
                    );
                } else if (value.component === 'fieldArrays') {
                 return (
                   <div className="add-input">
                     <FieldArray name={value.type} component={renderFieldArrays} formName={value.formName} sectionName={value.sectionName} arrayName={value.arrayName} userLanguage={value.userLanguage} sectionClassName={value.sectionClassName} />
                   </div>
                 );
              } else if (value.component === 'networkAutoSuggest') {
                  return (
                    <TooltipWrapper name={value.name} tooltip={tooltip(value)}>
                      <Field name={multipleArray ? `${multipleArray}.${value.name}.typeValues` : `${value.name}.typeValues`} component={renderAutosuggest} placeholder={placeholders(value)} labelKey={placeholders(value)} />
                    </TooltipWrapper>
                  );
                }
           return null;
         })()}
       </div>
     );
   }
