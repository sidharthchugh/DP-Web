import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Creatable} from 'react-select';
import DropdownList from 'react-widgets/lib/DropdownList';
import Geosuggest from 'react-geosuggest';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import NumberPicker from 'react-widgets/lib/NumberPicker';
import Textarea from 'react-textarea-autosize';

const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

const mockChooseEditType = (value, i) => {
  return (
    <div className="edit-field">
      {(() => {
        if (value.type === 'dropdown') {
          return (
            <DropdownList name={value.name} data={value.typeValues} placeholder={value.label} />
          );
        } else if (value.type === 'dropdownSearch') {
          return (
            <DropdownList name={value.name} data={value.typeValues} caseSensitive={false} minLength={2} filter="contains" placeholder={value.label} />
          );
        } else if (value.type === 'string') {
          return (
            <div>
              <label>{value.label}</label>
              <div>
                <input placeholder={value.label} type={value.type} />
              </div>
            </div>
          );
        } else if (value.type === 'number') {
          return (
            <NumberPicker name={value.name} placeholder={value.label} />
          );
        } else if (value.type === 'calandar') {
          return (
            <DateTimePicker name={value.name} placeholder={value.label} />
          );
        } else if (value.type === 'phoneNumber') {
          return (
            <div>
              <label>{value.label}</label>
              <div>
                <input placeholder={value.label} type={'number'} />
              </div>
            </div>
          );
        } else if (value.type === 'multiSelect') {
         return (
           <Creatable multi value={null} options={options} onChange={() => {}} placeholder={value.label} />
          );
        } else if (value.type === 'textarea') {
          return (
            <Textarea placeholder={value.label} defaultValue={''} onChange={() => {}} minRows={3} maxRows={6} />
          );
        } else if (value.type === '(cities)' || value.type === '(regions)' || value.type === 'address') {
          return (
            <Geosuggest placeholder={value.label} types={[`${value.type}`]} initialValue={''} onSuggestSelect={() => {}} />
          );
        } else if (value.type === 'fieldArrays') {
          const renderEmployee = ({ fields }) => ( // eslint-disable-line
            <ul className="add-field-list">
              {fields.map((member, index) =>
                <div key={index}>
                  <li>
                    <div className="row">
                      <div className="small-12 medium-6 columns">
                        <input
                          type="text"
                          defaultValue={value.fieldName[i]}
                          onBlur={(event) => this._handleChange(`${member.replace('[', '.').replace(']', '.')}name`, event.target.value)}
                           />
                      </div>
                      <div className="small-12 medium-6 columns">
                        <input
                          type="text"
                          defaultValue={value.fieldPosition[i]}
                          onBlur={(event) => this._handleChange(`${member.replace('[', '.').replace(']', '.')}position`, event.target.value)}
                          />
                      </div>
                    </div>
                    <a
                      className="remove-button"
                      type="button"
                      onClick={() => fields.remove(index)}>Remove
                    </a>
                  </li>
                </div>
                )}
              <div className="add-field">
                <FontAwesome name="plus-circle" />
                <a type="button" onClick={() => fields.push({})}>Add</a>
              </div>
            </ul>
          );
          return (
            <div className="add-input">
              <FieldArray name={value.name} component={renderEmployee} />
            </div>
           );
         }
      })()}
    </div>
  );
};

export {mockChooseEditType};
