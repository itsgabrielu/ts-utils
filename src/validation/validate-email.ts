// No "'", "`" and "." chars at tails
const allowedSpecialCharsTail = "!#$%&*+\\-/=?^_{|}~";
const allowedSpecialCharsMiddle = "!#$%&'*+\\-/=?^_`\\.{|}~";

const lettersAndDigitsChars = "\\w\\d";
const subdomainPattern = `[${lettersAndDigitsChars}-]+`;

const localPartPattern = [
  "^",
  "(?:",
  "(?:",
  `[${lettersAndDigitsChars}${allowedSpecialCharsTail}]`,
  `[${lettersAndDigitsChars}${allowedSpecialCharsMiddle}]+`,
  `[${lettersAndDigitsChars}${allowedSpecialCharsTail}]`,
  ")",
  "|",
  // If only 1/2 characters in host part
  "(?:",
  `[${lettersAndDigitsChars}${allowedSpecialCharsTail}]`,
  `[${lettersAndDigitsChars}${allowedSpecialCharsTail}]?`,
  ")",
  ")",
  "$",
].join("");

const domainPartPattern = [
  "^",
  "(?:",
  `(?:${subdomainPattern}[\\.])?`,
  `(?:${subdomainPattern}[\\.])`,
  // See https://data.iana.org/TLD/tlds-alpha-by-domain.txt
  `(?:${subdomainPattern})`,
  ")",
  "$",
].join("");

/**
 * Tests if email is valid according to RFC2822, but does
 * not accept quoted or escaped characters in the local-part.
 * Also currently does not check length of domain-part.
 */
const validateEmail = (email: string): boolean => {
  const emailParts = email.split("@");
  if (emailParts.length !== 2) {
    return false;
  }
  const [localPart, domainPart] = emailParts;
  if (domainPart === "") {
    return false;
  }

  if (localPart.length > 64) {
    return false;
  }

  if (localPart.split("..").length > 1) {
    return false;
  }
  // regexp declared here within function scope as RegExp seems
  // to break tests when declared outside
  const localPartRegExp = new RegExp(localPartPattern, "gi");
  // regexp declared here within function scope as RegExp seems
  // to break tests when declared outside
  const domainPartRegExp = new RegExp(domainPartPattern, "gi");
  return localPartRegExp.test(localPart) && domainPartRegExp.test(domainPart);
};

export default validateEmail;
