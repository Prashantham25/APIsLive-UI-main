import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import MDInput from "../MDInput";
import { convertToWords, formatCurrency } from "../../Common/Validations";
import ConfigSetting from "../../assets/themes/BrokerPortal/ConfigSetting";

const FloatNumber = (number) => {
  const regex = /^-?\d*\.?\d*$/;
  if (regex.test(number)) return true;
  return "Allows only numbers";
};
function CustomCurrencyInput({
  label,
  value,
  decimals,
  setErrorText,
  setErrorFlag,
  onChange,
  helperText,
  currencySymbol,
  currencyFormat,
  ...props
}) {
  let origValue = "";
  if (value !== undefined) origValue = `${value}`;
  if (origValue === undefined) origValue = "";
  const currencyValue = origValue;
  const [isFocused, setIsFocused] = useState(false);

  const handleCurrencyChange = (event) => {
    if (FloatNumber(event.target.value) === true) {
      setErrorText("");
      setErrorFlag(false);
      onChange({ target: { value: event.target.value } });
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event) => {
    let temp = `${event.target.value}`;
    if (temp[0] === ".") temp = `0${temp}`;
    if (temp[temp.length - 1] === ".") temp = temp.substring(0, temp.length - 1);
    onChange({ target: { value: temp } });
    setIsFocused(false);
  };

  const symbol = currencySymbol || ConfigSetting().currency.symbol;
  const roundDecimals = decimals !== undefined ? decimals : ConfigSetting().currency.decimalPlaces;
  const format = currencyFormat || ConfigSetting().currency.format;
  const { wordFormat } = ConfigSetting().currency;

  const displayValue = isFocused
    ? currencyValue
    : formatCurrency(currencyValue, roundDecimals, format);
  return (
    <MDInput
      label={label}
      variant="outlined"
      value={displayValue}
      onChange={handleCurrencyChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      /* eslint-disable react/jsx-no-duplicate-props */
      InputProps={{
        startAdornment: (isFocused || displayValue) && (
          <InputAdornment position="start">{symbol}</InputAdornment>
        ),
      }}
      inputProps={{
        style: {
          textAlign: isFocused ? "left" : "right",
        },
      }}
      /* eslint-enable react/jsx-no-duplicate-props */
      {...props}
      helperText={helperText || convertToWords(`${currencyValue}`.split(".")[0], wordFormat)}
    />
  );
}

// function CustomCurrencyInput({
//   currency,
//   onChange,
//   curFormat,
//   label,
//   name,
//   value,
//   fractionFormat,
// }) {
//   const [value1, setvalue1] = useState(value);
//   const [format, setformat] = useState("");
//   const currencySymbol = {
//     India: "₹",
//     USA: "$",
//     Germany: "€",
//     Russia: "₽",
//   }[currency];
//   useEffect(() => {
//     if (value1 !== "") {
//       const name1 = name;
//       const currency1 = currency;
//       onChange({
//         currency: currency1,
//         value: value1,
//         name: name1,
//         format1value: format,
//       });
//     }
//   }, [value1]);

//   const handleBlur = (oldValue) => {
//     if (oldValue !== "") {
//       const fCount = oldValue.split(curFormat[3]);
//       const roundOff = oldValue;
//       let addzero = "";
//       if (fCount.length <= 1) {
//         for (let i = 1; i <= fractionFormat.fix; i += 1) {
//           addzero = addzero.concat("0");
//         }
//         const finalrounfoff = roundOff.concat(curFormat[3], addzero);
//         setformat(finalrounfoff);
//         const v1 = oldValue.split(curFormat[2]).join("");
//         setvalue1(v1.concat(curFormat[3], addzero));
//       } else {
//         const seeifonedigit = fCount[1].split("");
//         // let addzero = seeifonedigit.join("");
//         addzero = seeifonedigit.join("");
//         if (seeifonedigit.length < fractionFormat.fix) {
//           for (let i = seeifonedigit.length; i < fractionFormat.fix; i += 1) {
//             addzero = addzero.concat("0");
//           }
//         } else if (seeifonedigit.length > fractionFormat.fix) {
//           const joinDecimal = fCount[1].split("");
//           let tempNum = "";
//           for (let i = 1; i <= joinDecimal.length; i += 1) {
//             if (i === fractionFormat.fix) {
//               tempNum = tempNum.concat(joinDecimal[i - 1], curFormat[3]);
//             } else {
//               tempNum = tempNum.concat(joinDecimal[i - 1]);
//             }
//             const tempRound = Math.round(parseFloat(tempNum));
//             if (tempRound !== 0) addzero = tempRound;
//           }
//         }
//         if (addzero.toString().split("").length <= fractionFormat.fix) {
//           const finalrounfoff = fCount[0].concat(curFormat[3], addzero);
//           setformat(finalrounfoff);
//         } else {
//           const removeFirstelement = addzero.toString().split("");
//           removeFirstelement.shift();
//           const addOne = parseInt(oldValue.split(".")[0], 10) + 1;
//           const finalrounfoff = addOne.toString().concat(curFormat[3], removeFirstelement.join(""));
//           setformat(finalrounfoff);
//         }
//       }
//     }
//   };

//   const handleChange = (newValue) => {
//     const noComma = newValue.split("");
//     if (noComma[noComma.length - 1] !== curFormat[2]) {
//       const fCount = newValue.split(curFormat[3]);
//       if (fCount.length <= 2) {
//         let decimalPart = "";
//         if (/^[0-9.,]*$/.test(newValue)) {
//           if (newValue.indexOf(curFormat[3]) !== -1) {
//             // dot there
//             decimalPart = newValue.split(curFormat[3])[1].split(curFormat[2]).join("");
//           }

//           const res = newValue
//             .split(curFormat[3])[0]
//             .replace(
//               new RegExp("\\B(?=(\\d{".concat(curFormat[1], "})+(?!\\d))"), "g"),
//               curFormat[2]
//             );
//           const splitlast = res.split(curFormat[2]);
//           const last = splitlast[splitlast.length - 1];
//           const first = splitlast.filter((x, i) => i !== splitlast.length - 1);
//           const firststring = [...first].splice(curFormat[2]).join("");
//           const res2 = firststring.replace(
//             new RegExp("\\B(?=(\\d{".concat(curFormat[0], "})+(?!\\d))"), "g"),
//             curFormat[2]
//           );
//           console.log("fcount", fCount[0].split(""));
//           console.log("last", first);
//           if (newValue.indexOf(curFormat[3]) === -1) {
//             // dot is not there
//             if (splitlast.length > 1) setformat(res2.concat(curFormat[2], last));
//             else setformat(res2.concat(last));
//           } else if (first.length < 1) {
//             setformat(newValue.split(curFormat[3])[0].concat(curFormat[3], decimalPart));
//           } else {
//             setformat(
//               res2.concat(curFormat[2], last, curFormat[3], decimalPart) // dot is there
//             );
//           }

//           const v1 = newValue.split(curFormat[2]).join("");
//           setvalue1(v1.concat(decimalPart));
//         }
//       }
//     }
//   };
//   useEffect(() => {
//     if (value) {
//       handleChange(value1);
//     }
//   }, []);

//   return (
//     <MDInput
//       label={label}
//       name={name}
//       InputProps={{
//         endAdornment: (
//           <InputAdornment position="start" sx={{ marginLeft: "5px" }}>
//             {format !== "" && currency ? currencySymbol : ""}
//           </InputAdornment>
//         ),
//         inputProps: {
//           pattern: "[0-9]*",
//         },
//         style: { direction: "rtl" },
//       }}
//       variant="outlined"
//       value={format}
//       onChange={(e) => handleChange(e.target.value)}
//       onBlur={(e) => handleBlur(e.target.value)}
//     />
//   );
// }

export default CustomCurrencyInput;
