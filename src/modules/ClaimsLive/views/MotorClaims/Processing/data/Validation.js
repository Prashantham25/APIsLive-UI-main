const IsNumber = (number) => {
  const regex = /^[0-9]*$/;
  if (regex.test(number)) return true;
  return "Allows only number";
};

const IsName = (str) => {
  const regex = /^[a-z|A-Z]*$/;
  if (regex.test(str)) return true;
  return "Allows only alphabets";
};
const Length = (number) => {
  console.log(number);
};

const LengthNotLessThen = (str, num) => {
  if (str.length > num) return true;
  return `Should not be less then ${num}`;
};

const LengthNotGreaterThen = (str, num) => {
  if (str.length < num) return true;
  return `Should not be greater then ${num}`;
};

const LengthEqualTo = (str, num) => {
  console.log("num", num);
  if (str.length === num) return true;
  return "Should be equal to ".concat(num);
};

// onBlur
const IsMobileNumber = (number) => {
  const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
  if (number.length === 10) {
    if (mobileRegex.test(number)) return true;
    return "Invalid Mobile Number";
  }
  return "Number should be 10 digits";
};

const IsEmail = (email) => {
  const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  if (emailRegex.test(email)) return true;
  return "Not a valid Email";
};

const isBoolean = (value) => {
  if (value === true || value === false) return true;
  return false;
};

const isFunction = (value) => {
  console.log(typeof value);
  if (typeof value === "function") {
    return true;
  }
  return false;
};

const padTo2Digits = (num) => num.toString().padStart(2, "0");

const formatDate1 = (date) => {
  // yyyy-mm-ddThh:mm:ss
  if (new Date(date) !== "Invalid Date")
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())]
      .join("-")
      .concat(
        "T",
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds()),
        ].join(":")
      );
  return false;
};

export {
  IsNumber,
  Length,
  IsMobileNumber,
  IsEmail,
  IsName,
  isBoolean,
  isFunction,
  formatDate1,
  LengthNotLessThen,
  LengthNotGreaterThen,
  LengthEqualTo,
};
