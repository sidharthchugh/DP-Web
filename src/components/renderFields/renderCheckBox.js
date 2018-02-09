import React from 'react';
import { Input } from 'semantic-ui-react';

const renderInput = ({ input, disabled, defaultChecked, className }) => (
  <div>
    {/* <Input
{...input}
        type={'checkbox'}
        disabled={disabled}
        className={className}
        defaultChecked={defaultChecked} />
        {className === 'check-box-style-edit-mode' ?
          <div className="profile-label ko-label">K.O.</div>
          :<div className="profile-value ko-label-save-mode">K.O.</div>
        } */}
  </div>
);

export default renderInput;
