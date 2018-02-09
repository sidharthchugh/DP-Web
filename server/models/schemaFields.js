import mongoose from 'mongoose';

const multiSelectSchema = {
  type: {type: String, default: 'multiSelect' },
  typeValues: [{
    label: {type: String, default: ''},
    value: {type: String, default: ''},
    className: {type: String, default: ''}
  }],
  ko: { type: String, default: ''}
};

const networkautoSuggestSchema = {
  type: {type: String, default: 'networkAutoSuggest' },
  typeValues: {
    label: {type: String, default: ''},
    value: {type: String, default: ''},
    className: {type: String, default: ''},
    profileId: mongoose.Schema.Types.ObjectId
  },
  ko: { type: String, default: ''}
};

const multiSelectAutoSuggestSchema = {
  type: {type: String, default: 'multiSelectAutoSuggest' },
  typeValues: [{
    label: {type: String, default: ''},
    value: {type: String, default: ''},
    className: {type: String, default: ''}
  }],
  ko: { type: String, default: ''}
};

const dropdownSchema = {
  type: { type: String, default: 'dropdown'},
  typeValues: { type: String, default: ''},
  ko: { type: String, default: ''}
};

const dropdownMultipleSchema = {
  type: { type: String, default: 'dropdownMultiple'},
  typeValues: [{
    label: {type: String, default: ''},
    value: {type: String, default: ''},
    className: {type: String, default: ''}
  }],
  ko: { type: String, default: ''}
};

const textAreaSchema = {
  type: { type: String, default: 'textArea'},
  typeValues: { type: String, default: ''},
  ko: { type: String, default: ''}
};

const stringSchema = {
  type: { type: String, default: 'string'},
  typeValues: { type: String, default: ''},
  ko: { type: String, default: ''}
};

const projectStatusSchema = {
  type: { type: String, default: 'string'},
  typeValues: { type: String, default: 'No'}
};

const matchSchema = {
  profileId: mongoose.Schema.Types.ObjectId,
  productIds: [mongoose.Schema.Types.ObjectId],
  projectIds: [mongoose.Schema.Types.ObjectId],
  matchedAt: {type: Date, default: Date.now},
  keywordMatchCount: {type: Number, default: 0},
  profileStatus: {type: Number, default: 0},
  matchStatus: { type: String, default: 'matchResult'}
};


export {multiSelectSchema, matchSchema, dropdownSchema, networkautoSuggestSchema, textAreaSchema, stringSchema, dropdownMultipleSchema, multiSelectAutoSuggestSchema, projectStatusSchema};
