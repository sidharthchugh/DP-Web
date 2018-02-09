import {v4} from 'node-uuid';

export function hydrateFieldType(fieldTypes, name, value, typeValuesFn) { // eslint-disable-line
    const fieldType = fieldTypes[name];
    const id = v4();
    // Probe whether this field name has a specified type,
    // if not warn & do nothing on this pass.
    if (!fieldType) return null; // console.warn(`fieldType was undefined on ${name}`);

    let fieldObject = {
      ...fieldType,
      name,
      value,
      id
    };

    // If there is a `typeValues` key in this field type,
    // transform if necessary and merge it into the hydrated object.
    if (fieldType.typeValues) {
      fieldObject = fieldType.type === 'dropdown'
        ? { ...fieldObject, typeValues: fieldType.typeValues }
        : { ...fieldObject, typeValues: typeValuesFn(fieldType.typeValues) };
    }

    // Unpack just the `value` string for each multiSelect
    if (fieldType.type === 'multiSelect') {
      fieldObject = {
        ...fieldObject,
        value: fieldObject.value.map(multiSelectVal => multiSelectVal.value)
      };
    }

    return fieldObject;
  }
