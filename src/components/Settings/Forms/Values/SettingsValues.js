import {v4} from 'node-uuid';

const SettingsInfo = (user) => {
  const settingsDetails = {
    SettingsInfo: [
      {
        name: 'firstName',
        englishLabel: 'First Name',
        germanLabel: 'Vorname',
        value: user && user.firstName,
        type: 'string',
        id: v4(),
        size: 'big',
      },
      {
        name: 'lastName',
        englishLabel: 'Last Name',
        germanLabel: 'Nachname',
        value: user && user.lastName,
        type: 'string',
        id: v4(),
        size: 'big',
      },
      {
        name: 'position',
        englishLabel: 'Position',
        germanLabel: 'Position',
        value: user && user.position,
        type: 'string',
        id: v4(),
        size: 'large',
      },
      {
        name: 'email',
        englishLabel: 'Email',
        germanLabel: 'Email',
        value: user && user.email,
        type: 'string',
        id: v4(),
        size: 'large',
      },
      {
        name: 'language',
        englishLabel: 'Language',
        germanLabel: 'Sprache',
        value: user && user.language,
        type: 'dropdown',
        typeValues: ['German', 'English'],
        id: v4(),
        size: 'large',
      },
      {
        name: 'role',
        englishLabel: 'Account Type',
        germanLabel: 'Account Type',
        value: user && user.role,
        type: 'dropdown',
        typeValues: ['Investor', 'Startup', 'Established Company'],
        id: v4(),
        size: 'large',
      },
      {
        name: 'userPhone',
        englishLabel: 'Phone Number',
        germanLabel: 'Phone Number',
        value: user && user.userPhone,
        type: 'string',
        id: v4(),
        size: 'large',
      },
      {
        name: 'newsletter',
        englishLabel: 'Newsletter',
        germanLabel: 'Newsletter',
        value: user && user.newsletter,
        type: 'checkbox',
        id: v4(),
        size: 'large',
      }
    ]
 };
  return settingsDetails;
};

export default SettingsInfo;
