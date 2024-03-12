const IsNumber = (number) => {
  const regex = /^[0-9]*$/;
  if (regex.test(number)) return true;
  return "Enter only number";
};

const IsName = (str) => {
  const regex = /^([A-Za-z])+([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}$/;
  if (regex.test(str) || str === "") {
    return true;
  }
  return "Allows only alphabets and space";
};

const IsName1 = (str) => {
  // const regex = /^([A-Za-z])+([\s]){0,1}([A-Za-z]){0,}([\s]){0,1}([A-Za-z]){0,}$/;
  const regex = /^(?![^a-zA-Z])(?=.*[a-zA-Z])(?=.)[a-zA-Z0-9 !@#$%^&*()_+{}[\]:;"'<>,.?/~`-]+$/;

  if (regex.test(str) || str === "") {
    return true;
  }
  return "Invalid Format";
};

const IsAlpha = (str) => {
  const regex = /^[a-z|A-Z]*$/;
  if (regex.test(str)) return true;
  return "Enter only alphabets";
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
  const regex = /^[6-9]\d{1}[0-9]\d{7}$/;
  if (IsAlpha(number) === true) return "Not a number";
  if (number.length === 10) {
    if (regex.test(number)) return true;
    return "The First Digit should be between 6-9";
  }
  return "Number should be 10 digits";
};
const IsTelephoneNo = (number) => {
  if (IsAlpha(number) === true) return "Not a number";
  if (number.length >= 10 && number.length <= 12) {
    const regex = /^[0-9]{3,5}\b[0-9+-]*[^a-z.]$/;
    if (regex.test(number)) return true;
    return "invalid format";
  }

  return "Number should be 10 to 12 digits";
};

const IsEmail = (email) => {
  const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  if (regex.test(email)) return true;
  return "Enter valid Email";
};

const IsPan = (pan) => {
  const regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  if (regex.test(pan)) return true;
  return "Enter valid PAN number";
};

const IsGstNo = (gst) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (regex.test(gst)) return true;
  return "Enter valid GST number";
};

const IsAlphaSpecialChar = (str) => {
  const regex = /^([^0-9]*)$/;
  if (regex.test(str)) return true;
  return "Enter only alphabet and special characters";
};

const IsnotSpecialChar = (str) => {
  const regex = /^[a-zA-Z0-9]{1}[a-zA-Z0-9!@#$%^&*()_+{}[\]:;"'<>,.?/~`-]*$/;
  if (regex.test(str)) return true;
  return "Not start with Special Character";
};

const IsAlphaNum = (str) => {
  const regex = /^[a-zA-Z0-9_.-]*$/;
  if (regex.test(str)) return true;
  return "Enter only alphabet and number";
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
const isWebsite = (value) => {
  const regex =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regex.test(value)) return true;
  return "Ivalid website";
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
  IsTelephoneNo,
  IsEmail,
  IsAlpha,
  isBoolean,
  isFunction,
  formatDate1,
  LengthNotLessThen,
  LengthNotGreaterThen,
  LengthEqualTo,
  IsPan,
  IsGstNo,
  IsAlphaSpecialChar,
  IsAlphaNum,
  IsName,
  isWebsite,
  IsnotSpecialChar,
  IsName1,
};
