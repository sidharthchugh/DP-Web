const validate = values => {
  const errors = {};
  if (values.companyName.length > 50) {
    errors.companyName = 'Must be 50 characters or less';
  }
  if (values.slogan.length > 140) {
    errors.slogan = 'Must be 140 characters or less';
  }
  if (values.companyDescription.length > 250) {
    errors.companyDescription = 'Must be 250 characters or less';
  }
  if (values.mission.length > 250) {
    errors.mission = 'Must be 250 characters or less';
  }
  if (values.vision.length > 250) {
    errors.vision = 'Must be 250 characters or less';
  }
  if (values.processesOperations.length > 250) {
    errors.processesOperations = 'Must be 250 characters or less';
  }
  return errors;
};


export default validate;
