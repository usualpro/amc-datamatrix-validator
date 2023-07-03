import {
  conventions as conventionData,
  conventionTypesByMedicalDomain
} from "./conventions";

/**
 * Checks if the size of a component falls within the specified range.
 * @param {string} component - The component to check the size of.
 * @param {number} minSize - The minimum allowed size.
 * @param {number} maxSize - The maximum allowed size.
 * @returns {boolean} - True if the size is valid, false otherwise.
 */
const isValidSize = (component, minSize, maxSize) => {
  const size = component.length;
  return size >= minSize && size <= maxSize;
};

/**
 * Splits the datamatrix string and returns an array of substrings.
 * @param {string} datamatrix - The datamatrix string to split.
 * @returns {string[]} - Array of substrings.
 */
const datamatrixSplit = (datamatrix) => datamatrix.slice(0, -1).split("#");

/**
 * Represents AMCData.
 */
export class AMCData {
  /**
   * Initializes a new instance of the AMCData class.
   * @param {string} dataMatrix - The dataMatrix value.
   */
  constructor(dataMatrix) {
    const [
      prefix,
      versionNumber,
      amcNumber,
      csr,
      userNumber,
      ...conventionTypes
    ] = datamatrixSplit(dataMatrix);
    this.prefix = prefix;
    this.versionNumber = versionNumber;
    this.amcNumber = amcNumber;
    this.csr = csr;
    this.userNumber = userNumber;
    this.conventionTypes = conventionTypes;
  }
}

/**
 * Retrieves the conventions based on the given conventions array.
 * @param {string[]} conventions - The conventions array.
 * @returns {Object} - Object containing the conventions.
 */
export const getConventions = (conventions) => {
  const toReturn = Object.assign({}, conventionTypesByMedicalDomain);

  Object.keys(toReturn).forEach((name) => {
    toReturn[name] = [];
  });

  conventions
    .filter((r) => r.length > 0)
    .forEach((c) => {
      const wildcard = c.endsWith("*");
      if (wildcard) {
        Object.keys(toReturn).forEach((name) => {
          toReturn[name].push(c.slice(0, -1));
        });
      } else {
        const [first, second, ...rest] = c.split("");
        const conventionType = `${first}${second}`;
        rest.forEach((q) => {
          const { code } = conventionData[q];
          toReturn[code].push(conventionType);
        });
      }
    });

  return toReturn;
};

/**
 * Checks if the given datamatrix is valid.
 * @param {string} datamatrix - The datamatrix string to check.
 * @returns {boolean} - True if the datamatrix is valid, false otherwise.
 */
export const isValidDatamatrix = (datamatrix) => {
  // Step 0: Check the ending character
  if (!datamatrix.endsWith("/")) {
    return false;
  }

  const [prefix, versionNumber, amcNumber, csr, userNumber] = datamatrixSplit(
    datamatrix
  );

  // Step 1: Verify "AMC" authentication prefix
  if (prefix !== "AMC") {
    return false;
  }

  // Step 2: Retrieve version number and check compatibility
  if (versionNumber !== "1") {
    return false;
  }

  // Step 3: Verify sizes and formats of each component
  if (
    !isValidSize(amcNumber, 1, 10) ||
    !isValidSize(csr, 0, 3) ||
    !isValidSize(userNumber, 1, 15)
  ) {
    return false;
  }

  return true;
};

/**
 * Checks the dataMatrix and invokes the appropriate callbacks.
 * @param {Object} options - The options object.
 * @param {string} options.datamatrix - The dataMatrix to check.
 * @param {Function} options.callBack - The callback function to invoke if the dataMatrix is valid.
 * @param {Function} options.onError - The callback function to invoke if the dataMatrix is invalid.
 */
export const checkDataMatrix = ({ datamatrix, callBack, onError }) => {
  if (isValidDatamatrix(datamatrix)) {
    const { conventionTypes, ...otherAMCData } = new AMCData(datamatrix);
    callBack(getConventions(conventionTypes), otherAMCData);
  } else {
    onError();
  }
};
