export const isEmpty = (obj) => {
  // Check for null or undefined
  if (obj == null) return true; // Handles null and undefined

  // Check for strings
  if (typeof obj === "string") return obj.length === 0;

  // Check for objects and arrays
  if ([Object, Array].includes(obj.constructor)) {
    return !Object.entries(obj).length; // Check if object or array has no entries
  }

  // For other primitives (numbers, booleans, etc.), return true if falsy
  return !obj; // This will return true for 0, false, NaN, etc.
};

/*!
 * Source: https://vanillajstoolkit.com/helpers/isequal/
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 */
export const isEqual = (obj1, obj2) => {
  /**
   * More accurately check the type of a JavaScript object
   * @param  {Object} obj The object
   * @return {String}     The object type
   */
  const getType = (obj) => {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  };

  const areArraysEqual = () => {
    // Check length
    if (obj1.length !== obj2.length) return false;

    // Check each item in the array
    for (let i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) return false;
    }

    // If no errors, return true
    return true;
  };

  const areObjectsEqual = () => {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

    // Check each item in the object
    for (let key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        if (!isEqual(obj1[key], obj2[key])) return false;
      }
    }

    // If no errors, return true
    return true;
  };

  const areFunctionsEqual = () => {
    return obj1.toString() === obj2.toString();
  };

  const arePrimativesEqual = () => {
    return obj1 === obj2;
  };

  // Get the object type
  let type = getType(obj1);

  // If the two items are not the same type, return false
  if (type !== getType(obj2)) return false;

  // Compare based on type
  if (type === "array") return areArraysEqual();
  if (type === "object") return areObjectsEqual();
  if (type === "function") return areFunctionsEqual();
  return arePrimativesEqual();
};

export const jsonToQuery = (obj, options, target = {}, keyPrefix = "") => {
  const allOptions = { skipNulls: true, ...options };

  Object.keys(obj).forEach((key) => {
    const keyToSet = isEmpty(keyPrefix) ? key : `${keyPrefix}[${key}]`;

    const value = obj[key];
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (v && typeof v === "object") {
          jsonToQuery(v, allOptions, target, `${keyToSet}[${i}]`);
        } else {
          target[`${keyToSet}[${i}]`] = v;
        }
      });
    } else if (value && typeof value === "object") {
      jsonToQuery(value, allOptions, target, `${keyToSet}`);
    } else {
      if (!allOptions.skipNulls || !isEmpty(value)) {
        target[keyToSet] = value;
      }
    }
  });

  return target;
};

export const stringifyQuery = (obj, options) => {
  if (isEmpty(obj)) return "";

  const allOptions = {
    addQueryPrefix: false,
    skipNulls: true,
    ...options,
  };

  const query = jsonToQuery(obj, allOptions);
  const paramString = decodeURI(new URLSearchParams(query).toString());
  return `${
    allOptions.addQueryPrefix && !isEmpty(paramString) ? "?" : ""
  }${paramString}`;
};

export const formatDateRange = (startDate, endDate) => {
  const options = { month: "long", day: "numeric", year: "numeric" };

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startFormatted = start.toLocaleDateString("en-US", options);
  const endFormatted = end.toLocaleDateString("en-US", options);

  const startMonth = start.toLocaleDateString("en-US", { month: "long" });
  const startDay = start.getDate();
  const endDay = end.getDate();
  const endYear = end.getFullYear();

  return `${startMonth} ${startDay} - ${endDay}, ${endYear}`;
};
