// import moment from "moment";
const IsNumericNonZero = (number) => {
  // const regex = /^[0-9]*$/;
  const regex = /^[1-9][0-9]*$/;
  if (regex.test(number)) return true;
  return "Allows only number";
};

const IsNumeric = (number) => {
  const regex = /^[0-9]*$/;
  if (regex.test(number)) return true;
  return "Allows only number";
};

const IsAlpha = (str) => {
  const regex = /^[a-z|A-Z]*$/;
  if (regex.test(str)) return true;
  return "Allows only alphabets";
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
  // const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  const emailRegex =
    /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/i;
  if (email.length !== 0) {
    if (emailRegex.test(email)) return true;
    return "Not a valid Email";
  }
  return false;
};
const IsNumaricPercentage = (val) => {
  const regex = /^[0-9%]*$/;
  if (regex.test(val)) return true;
  return "Allows only numbers and Percentage Character";
};
const IsAlphaNumSpecial = (str) => {
  const regex = /^[a-zA-Z0-9_.-/]*$/;
  if (regex.test(str)) return true;
  return "Enter only alphabets numbers ";
};
const IsAlphaNum = (str) => {
  const regex = /^[a-zA-Z0-9]*$/;
  if (regex.test(str)) return true;
  return "Enter only alphabets numbers ";
};

const isBoolean = (value) => {
  if (value === true || value === false) return true;
  return false;
};

const isFunction = (value) => {
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

const arrayRange = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

const addDays = (date, days) => {
  const sp = date.split("-");
  const date1 = new Date();
  date1.setDate(sp[1]);
  date1.setMonth(parseInt(sp[0], 10) - 1);
  date1.setFullYear(sp[2]);
  const days1 = parseInt(days, 10);
  const format = (val) => (val > 9 ? val : `0${val}`);
  if (days < 365) {
    date1.setDate(date1.getDate() - 1 + days1);
  } else {
    date1.setDate(date1.getDate() + days1);
  }
  return `${format(date1.getMonth() + 1)}-${format(date1.getDate())}-${date1.getFullYear()}`;
};
const addDays1 = (date, days) => {
  const sp = date.split("/");
  const date1 = new Date();
  date1.setDate(sp[1]);
  date1.setMonth(parseInt(sp[0], 10) - 1);
  date1.setFullYear(sp[2]);
  const days1 = parseInt(days, 10);
  const format = (val) => (val > 9 ? val : `0${val}`);
  if (days < 365) {
    date1.setDate(date1.getDate() - 1 + days1);
  } else {
    date1.setDate(date1.getDate() + days1);
  }
  return `${format(date1.getMonth() + 1)}/${format(date1.getDate())}/${date1.getFullYear()}`;
};

const IsNumaricSpecial = (val) => {
  const regex = /^[0-9-+()\s]*$/;
  if (regex.test(val)) return true;
  return "Allows only numbers and special characters";
};

const IsAlphaSpace = (str) => {
  const regex = /^[a-zA-Z\s]*$/;
  if (regex.test(str)) return true;
  return "Allows only alphabets and Space";
};

const IsAlphaNumSpace = (str) => {
  const regex = /^[a-zA-Z0-9\s]*$/;
  if (regex.test(str)) return true;
  return "Enter only alphabets numbers and Space";
};
const IsGstNo = (gst) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (regex.test(gst)) return true;
  return "Enter valid GST number";
};
const IsPan = (pan) => {
  const regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  if (regex.test(pan)) return true;
  return "Enter valid PAN number";
};

const IsPassport = (pspt) => {
  const regex = /([A-Z]){1}([1-9]){1}([0-9]){6}$/;
  if (regex.test(pspt)) return true;
  return "Enter valid Passport number";
};

const NumBetween = (num, minNum, maxNum, inclusive) => {
  const min = Math.min(minNum, maxNum);
  const max = Math.max(minNum, maxNum);
  return inclusive ? num >= min && num <= max : num > min && num < max;
};

const AgeCalculator = (date) => {
  const dobYear = date.getYear();
  const dobMonth = date.getMonth();
  const dobDate = date.getDate();
  const now = new Date();
  // extract the year, month, and date from current date
  const currentYear = now.getYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();
  let yearAge = currentYear - dobYear;
  let monthAge;
  if (currentMonth >= dobMonth) {
    monthAge = currentMonth - dobMonth;
  }
  // get months when current month is greater
  else {
    yearAge -= 1;
    monthAge = 12 + currentMonth - dobMonth;
  }
  // get days
  // let dateAge;
  if (currentDate >= dobDate) {
    // dateAge = currentDate - dobDate;
  } else {
    monthAge -= 1;
    // dateAge = 31 + currentDate - dobDate;
    if (monthAge < 0) {
      monthAge = 11;
      yearAge -= 1;
    }
  }
  // group the age in a single variable
  return yearAge;
};

const AgeCalculator1 = (bdate, sdate) => {
  const dobYear = bdate.getYear();
  const dobMonth = bdate.getMonth();
  const dobDate = bdate.getDate();
  // const now = new Date();
  // extract the year, month, and date from current date
  const currentYear = sdate.getYear();
  const currentMonth = sdate.getMonth();
  const currentDate = sdate.getDate();
  let yearAge = currentYear - dobYear;
  let monthAge;
  if (currentMonth >= dobMonth) {
    monthAge = currentMonth - dobMonth;
  }
  // get months when current month is greater
  else {
    yearAge -= 1;
    monthAge = 12 + currentMonth - dobMonth;
  }
  // get days
  // let dateAge;
  if (currentDate >= dobDate) {
    // dateAge = currentDate - dobDate;
  } else {
    monthAge -= 1;
    // dateAge = 31 + currentDate - dobDate;
    if (monthAge < 0) {
      monthAge = 11;
      yearAge -= 1;
    }
  }
  // group the age in a single variable
  return yearAge;
};

const diffDaysCalculator = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const All = (Date) => {
  const regex = /^[a-zA-Z0-9\s\W]+$/;
  if (regex.test(Date)) return true;
  return "";
};

const DateFormatFromDateObject = (date, toFormat) => {
  const toDelimiter = toFormat.split("")[1];
  const Year = date.getFullYear();
  const Month = date.getMonth();
  const Date = date.getDate();
  const dateArr = ["", "", ""];
  const tf = toFormat.split(toDelimiter);
  tf.forEach((x, i) => {
    if (x === "y") dateArr[i] = Year;
    if (x === "m") {
      dateArr[i] = Month + 1;
      if (dateArr[i].toString().length === 1) dateArr[i] = `0${dateArr[i]}`;
    }
    if (x === "d") {
      dateArr[i] = Date;
      if (dateArr[i].toString().length === 1) dateArr[i] = `0${dateArr[i]}`;
    }
  });
  return dateArr.join(toDelimiter);
};

const DateFormatFromStringDate = (date, fromFormat, toFormat) => {
  const fDelimiter = fromFormat.split("")[1];
  const tDelimiter = toFormat.split("")[1];
  const ff = fromFormat.split(fDelimiter);
  const tf = toFormat.split(tDelimiter);
  const d = date.split(fDelimiter);
  const dateArr = ["", "", ""];

  ff.forEach((x1, i1) => {
    tf.forEach((x2, i2) => {
      if (x1 === x2) {
        if (x1 === "y") dateArr[i2] = d[i1];
        if (x1 === "m")
          if (d[i1].toString().length === 1) dateArr[i2] = `0${d[i1]}`;
          else dateArr[i2] = d[i1];
        if (x1 === "d")
          if (d[i1].toString().length === 1) dateArr[i2] = `0${d[i1]}`;
          else dateArr[i2] = d[i1];
      }
    });
  });

  return dateArr.join(tDelimiter);
};

// const ExcelDateToJSDate = (serial, toFormat) => {
//   const utcDays = Math.floor(serial - 25569);
//   const utcValue = utcDays * 86400;
//   const dateInfo = new Date(utcValue * 1000);
//   return DateFormatFromDateObject(dateInfo, toFormat);
// };

const DateValidation = (date) => {
  let validDate = false;
  let dateFormat = "";

  // let date = date5;
  // if (IsNumeric(date) && date.toString().length === 5) {
  //   date = ExcelDateToJSDate(date5, "d-m-y");// m-d-y
  // }
  // console.log(date, date5, 343434);

  if (date.toString().includes("-") && date.toString().includes("/")) {
    validDate = false;
  } else if (date.toString().includes("&")) {
    validDate = false;
  } else if (date.toString().includes("%")) {
    validDate = false;
  } else if (date.toString().includes("$")) {
    validDate = false;
  } else if (date.toString().includes("@")) {
    validDate = false;
  } else if (date.toString().includes("!")) {
    validDate = false;
  } else if (date.toString().includes("*")) {
    validDate = false;
  } else if (date.toString().search(/--/) !== -1) {
    validDate = false;
  } else if (date.toString().includes("-")) {
    dateFormat = "d-m-y";
  } else if (date.toString().includes("/")) {
    dateFormat = "d/m/y";
  }
  if (dateFormat !== "") {
    const date1 = DateFormatFromStringDate(date, dateFormat, "m-d-y");
    const date3 = Date.parse(date1);
    // console.log(date3, date, "987", date1);
    validDate = !Number.isNaN(date3);
  }
  return validDate;
};

const IsNumaricSpecialNoSpace = (str) => {
  const regex = /^[0-9-+()]+[0-9-+()\s]*$/;
  if (regex.test(str) || str === "") {
    return true;
  }
  return "Allows only numbers and special characters";
};
const IsFreetextNoSpace = (str) => {
  const regex = /^[^\s].*$/;
  if (regex.test(str) || str === "") {
    return true;
  }
  return "Allows only alphabets, numbers and space";
};

const base64toBlob = (data) => {
  // Cut the prefix `data:application/pdf;base64` from the raw base 64
  const base64WithoutPrefix = data.substr("data:application/pdf;base64,".length);

  const bytes = atob(base64WithoutPrefix);
  let length1 = bytes.length;
  const out = new Uint8Array(length1);

  while (length1 > 0) {
    length1 -= 1;
    out[length1] = bytes.charCodeAt(length1);
  }

  return new Blob([out], { type: "application/pdf" });
};

export default {
  IsNumericNonZero, // Accept only numbers with first digit non-zero
  IsNumeric, // Accept only numbers
  IsNumaricSpecial, // Accept numbers and some special characters - + ( )
  IsNumaricPercentage, // Accept numbers and percentage characters
  IsAlpha, // Accept only alphabets
  IsAlphaNum, // Accept alphabets and numbers
  IsAlphaSpace, // Accept alphabets and space
  IsAlphaNumSpace, // Accept alphabets, numbers and space
  IsMobileNumber, // validate mobile number
  IsEmail, // validate email address
  isBoolean, // check the value is boolean or not
  isFunction, // check the value is function or not
  formatDate1, // formate date into yyyy-mm-ddThh:mm:ss
  LengthNotLessThen,
  LengthNotGreaterThen,
  LengthEqualTo,
  arrayRange, // return array, array creating using given rage
  addDays, // adding given days to given date, return final date in mm-dd-yyyy
  NumBetween, // return boolean , check the given number is between min and max number
  AgeCalculator, // return age in years by given dob
  AgeCalculator1,
  diffDaysCalculator, // return diff days between given two days
  IsGstNo,
  IsPan,
  IsPassport,
  All,
  IsAlphaNumSpecial,
  DateFormatFromDateObject,
  DateFormatFromStringDate,
  DateValidation,
  IsNumaricSpecialNoSpace, // Reject space at starting
  IsFreetextNoSpace, // Reject space at starting
  addDays1,
  base64toBlob,
};
