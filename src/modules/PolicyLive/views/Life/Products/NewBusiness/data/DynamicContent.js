/* eslint-disable */

import objectPath from "object-path";

import { Autocomplete } from "@mui/material";
import { get, set } from "../../../../../../../Common/RenderControl/objectPath";
import MDInput from "../../../../../../../components/MDInput";
import MDDatePicker from "../../../../../../../components/MDDatePicker";

const headerStyle = {
  "& .MuiDataGrid-columnHeaderTitle": {
    overflow: "visible",
    lineHeight: "2rem",
    whiteSpace: "normal",
  },
};

const checkValueForVisible = (value) => {
  //
  return value !== null && value !== undefined && value !== "";
};

const geOnChangeValue = { Yes: "yes", yes: "yes", No: "no", no: "no", None: "none" };

const GetQuestionsControls = ({
  questions,
  tab,
  node1,
  node2,
  setDto,
  dto,
  isRequired,
  spacing,
}) => {
  try {
    const getParentQuestion = (childData, i1) => {
      // console.log("test called", childData);
      let visibleDetails = { path: "", value: "" };
      questions.forEach((x2, i2) => {
        if (x2.QId === childData.QParentId) {
          // console.log("Test34", childData, x2);
          visibleDetails = {
            path: `${node1}.${i1}.${node2}.${i2}.Answer`,
            value: geOnChangeValue[childData.OnChangeVal]
              ? geOnChangeValue[childData.OnChangeVal]
              : childData.OnChangeVal,
          };
        }
      });
      return visibleDetails;
    };
    const onRadioChange = (e, currentItem, currentIndex) => {
      if (currentItem.ControlType === "Radio") {
        set(dto, `${node1}.${tab}.${node2}.${currentIndex}.Answer`, e.target.value, setDto);
        if (e.target.value === "no")
          questions.forEach((x1, i1) => {
            if (currentItem.QId === x1.QParentId && x1.ControlType !== "GridView") {
              set(
                dto,
                `${node1}.${tab}.${node2}.${i1}.Answer`,
                x1.DefaultValue ? x1.DefaultValue.toLowerCase() : "",
                setDto
              );
              onRadioChange({ target: { value: "no" } }, x1, i1);
            }
          });
      }
    };

    const onCustomChangeControl = (a, currentItem, currentIndex) => {
      const cValue = get(dto, `${node1}.${tab}.${node2}.${currentIndex}.Answer`);

      if (false && a.mValue !== "None" && a !== null) {
        objectPath.set(dto, `${node1}.${tab}.${node2}.${currentIndex}.Answer`, "None");
        // setDto({ ...dto });
        // set(dto, `${node1}.${tab}.${node2}.${currentIndex}.Answer`, "None", setDto);
        onCustomChangeControl({ mValue: "None" }, currentItem, currentIndex);
        objectPath.set(dto, `${node1}.${tab}.${node2}.${currentIndex}.Answer`, a.mValue);
        // set(dto, `${node1}.${tab}.${node2}.${currentIndex}.Answer`, a.mValue, setDto);
        onCustomChangeControl(a, currentItem, currentIndex);
      }

      if (a.mValue === "None" || cValue === "None" || cValue === "") {
        console.log("test1", currentItem);
        set(dto, `${node1}.${tab}.${node2}.${currentIndex}.Answer`, a.mValue, setDto);
        if (a.mValue === "None" || a === null) {
          questions.forEach((x1, i1) => {
            if (currentItem.QId === x1.QParentId) {
              if (x1.ControlType === "Radio") {
                set(
                  dto,
                  `${node1}.${tab}.${node2}.${i1}.Answer`,
                  x1.DefaultValue ? x1.DefaultValue.toLowerCase() : "",
                  setDto
                );
                onRadioChange({ target: { value: "no" } }, x1, i1);
              }

              if (x1.ControlType === "LabelAndDropDown") {
                set(
                  dto,
                  `${node1}.${tab}.${node2}.${i1}.Answer`,
                  x1.DefaultValue ? x1.DefaultValue : "",
                  setDto
                );
                onRadioChange({ target: { value: "no" } }, x1, i1);
              }
            }
          });
        }
      } else {
        onCustomChangeControl({ mValue: "None" }, currentItem, currentIndex);
        set(dto, `${node1}.${tab}.${node2}.${currentIndex}.Answer`, a.mValue, setDto);
      }
    };

    const onChange1 = (e, pathVal, ind, AttName) => {
      // set(dto, `${pathVal}.${ind}.${AttName}`, e.target.value, setDto);

      objectPath.set(dto, `${pathVal}.${ind}.${AttName}`, e.target.value);
      setDto({ ...dto });
    };

    const getRenderQuestion = (x, i2) => {
      const arr = [];
      if (x.ControlType === "Header" && x.Visibility?.toLowerCase() === "true") {
        arr.push({
          type: "Typography",
          visible:
            checkValueForVisible(x.OnChangeVal) || x.OnChangeVal?.toLowerCase() === "part"
              ? "visibleDetails"
              : true,
          visibleDetails:
            checkValueForVisible(x.OnChangeVal) || "part" ? getParentQuestion(x, tab) : {},
          label: x.QText,
          spacing: 12,
          QSubType: x.QSubType,
          splitId: 2,
          variant: "h6",
          sx: { fontSize: "1rem" },
        });
      }
      if (x.ControlType === "HeaderWithBackground" && x.Visibility.toUpperCase() === "TRUE") {
        arr.push({
          type: "Typography",
          visible: true,
          label: x.QText,
          spacing: 12,
          QSubType: x.QSubType,
          splitId: 2,
          variant: "h6",
          sx: { fontSize: "2rem" },
        });
      }
      if (x.ControlType === "Radio" && x.Visibility?.toLowerCase() === "true") {
        arr.push({
          type: "RadioGroup",
          visible: checkValueForVisible(x.OnChangeVal) ? "visibleDetails" : true,
          visibleDetails: checkValueForVisible(x.OnChangeVal) ? getParentQuestion(x, tab) : {},
          path: `${node1}.${tab}.${node2}.${i2}.Answer`,
          radioLabel: {
            labelVisible: true,
            label: x.QText,
            fontSize: "1rem",
            // fontWeight: 600,
          },
          radioList: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ],
          justifyContent: "space-between",
          required: isRequired,
          spacing: 12,
          splitId: 2,
          customOnChange: (e) => onRadioChange(e, x, i2),
        });

        if (x.DetailsLabel) {
          arr.push({
            type: "Input",
            required: "requiredDetails",
            requiredDetails: {
              path: `${node1}.${tab}.${node2}.${i2}.Answer`,
              value: x.ShowDetailsOnValue?.toLowerCase(),
            },
            visible: "visibleDetails",
            visibleDetails: {
              path: `${node1}.${tab}.${node2}.${i2}.Answer`,
              value: x.ShowDetailsOnValue?.toLowerCase(),
            },
            path: `${node1}.${tab}.${node2}.${i2}.${x.DetailsLabel}`,
            label: x.DetailsLabel,
            spacing: 12,
            splitId: 2,
            multiline: true,
          });
        }
      }

      if (x.ControlType === "Date" && x.Visibility?.toLowerCase() === "true") {
        arr.push({
          type: "MDDatePicker",
          visible: checkValueForVisible(x.OnChangeVal) ? "visibleDetails" : true,
          visibleDetails: checkValueForVisible(x.OnChangeVal) ? getParentQuestion(x, tab) : {},
          path: `${node1}.${tab}.${node2}.${i2}.Answer`,
          label: x.QText,
          spacing: spacing ? spacing : 4,
          splitId: 2,
          required: isRequired,
          multiline: true,
        });
      }
      if (x.ControlType === "TextBox" && x.Visibility?.toLowerCase() === "true") {
        arr.push({
          type: "Input",
          visible:
            checkValueForVisible(x.OnChangeVal) || x.OnChangeVal?.toLowerCase() === "part"
              ? "visibleDetails"
              : true,
          visibleDetails:
            checkValueForVisible(x.OnChangeVal) || "part" ? getParentQuestion(x, tab) : {},
          // visible: true,
          path: `${node1}.${tab}.${node2}.${i2}.Answer`,
          label: x.QText,
          spacing: spacing ? spacing : 4,
          splitId: 2,
          required: isRequired,
          multiline: true,
        });
      }
      if (x.ControlType === "LabelAndTextBox" && x.Visibility?.toLowerCase() === "true") {
        arr.push({
          type: "InputSeparateLabel",
          visible: checkValueForVisible(x.OnChangeVal) ? "visibleDetails" : true,
          visibleDetails: checkValueForVisible(x.OnChangeVal) ? getParentQuestion(x, tab) : {},
          // visible: true,
          path: `${node1}.${tab}.${node2}.${i2}.Answer`,
          label: x.QText,
          placeholder: "Enter Details",
          spacing: 12,
          splitId: 2,
          required: isRequired,
          multiline: true,
        });
      }
      if (x.ControlType === "DropDown" && x.Visibility?.toLowerCase() === "true") {
        arr.push({
          type: "AutoComplete",
          visible: checkValueForVisible(x.OnChangeVal) || "part" ? "visibleDetails" : true,
          visibleDetails:
            checkValueForVisible(x.OnChangeVal) || "part" ? getParentQuestion(x, tab) : {},
          // visible: true,
          path: `${node1}.${tab}.${node2}.${i2}.Answer`,
          label: x.QText,
          spacing: spacing ? spacing : 4,
          splitId: 2,
          multiline: true,
          required: isRequired,
          options:
            x.MasterType && Array.isArray(JSON.parse(x.MasterType))
              ? JSON.parse(x.MasterType).map((x) => ({ mValue: x }))
              : [],
        });
      }
      if (x.ControlType === "LabelAndDropDown" && x.Visibility?.toLowerCase() === "true") {
        arr.push({
          type: "AutoCompleteSeparateLabel",
          visible: checkValueForVisible(x.OnChangeVal) ? "visibleDetails" : true,
          visibleDetails: checkValueForVisible(x.OnChangeVal) ? getParentQuestion(x, tab) : {},
          // visible: true,
          path: `${node1}.${tab}.${node2}.${i2}.Answer`,
          label: x.QText,
          placeholder: "Please Select",
          spacing: 12,
          splitId: 2,
          multiline: true,
          required: isRequired,
          customOnChange: (e, a) => onCustomChangeControl(a, x, i2),
          options:
            x.MasterType && Array.isArray(JSON.parse(x.MasterType))
              ? JSON.parse(x.MasterType).map((x) => ({ mValue: x }))
              : [],
        });
      }
      if (x.ControlType === "CheckBox" && x.Visibility?.toLowerCase() === "true") {
        arr.push({
          type: "Checkbox",
          visible: checkValueForVisible(x.OnChangeVal) ? "visibleDetails" : true,
          visibleDetails: checkValueForVisible(x.OnChangeVal) ? getParentQuestion(x, tab) : {},
          // visible: true,
          checkedVal: "yes",
          path: `${node1}.${tab}.${node2}.${i2}.Answer`,
          label: x.QText,
          splitId: 2,
          required: isRequired,
          spacing: 12,
        });
      }
      if (x.ControlType === "GridView" && x.Visibility?.toLowerCase() === "true") {
        if (x.MasterType === "PreviousPolicyDetails1")
          arr.push({
            type: "DataGrid",
            sx: headerStyle,

            visible: checkValueForVisible(x.OnChangeVal) ? "visibleDetails" : true,
            visibleDetails: checkValueForVisible(x.OnChangeVal) ? getParentQuestion(x, tab) : {},
            value: Array.isArray(get(dto, `${node1}.${tab}.${node2}.${i2}.Answer`))
              ? get(dto, `${node1}.${tab}.${node2}.${i2}.Answer`).map((xx1, id1) => ({
                  ...xx1,
                  id: id1,
                }))
              : [].map((xx1, id1) => ({
                  ...xx1,
                  id: id1,
                })),
            label: x.QText,
            splitId: 2,
            rowId: "id",
            spacing: 12,
            columns: [
              {
                field: "PolicyNo",
                headerName: "Proposal/Policy Number",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(e, `${node1}.${tab}.${node2}.${i2}.Answer`, p.row.id, "PolicyNo")
                    }
                    value={p.row.PolicyNo}
                  />
                ),
              },

              {
                field: "PlanTerm",
                headerName: "Plan & Term",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(e, `${node1}.${tab}.${node2}.${i2}.Answer`, p.row.id, "PlanTerm")
                    }
                    value={p.row.PlanTerm}
                  />
                ),
              },

              {
                field: "SumAssured",
                headerName: "Sum Assured",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(e, `${node1}.${tab}.${node2}.${i2}.Answer`, p.row.id, "SumAssured")
                    }
                    value={p.row.SumAssured}
                  />
                ),
              },
              {
                field: "CommencementDate",
                headerName: "Commencement Date",
                width: 250,
                renderCell: (p) => (
                  <MDDatePicker
                    input={{ label: "", value: p.row.CommencementDate }}
                    value={p.row.CommencementDate}
                    onChange={(e, a) =>
                      onChange1(
                        { target: { value: a } },
                        `${node1}.${tab}.${node2}.${i2}.Answer`,
                        p.row.id,
                        "CommencementDate"
                      )
                    }
                    options={{
                      dateFormat: "d/m/Y",
                      altFormat: "d/m/Y",
                      altInput: true,
                      maxDate: new Date(),
                    }}
                  />
                ),
              },
              {
                field: "AnnualPremium",
                headerName: "Annual Premium",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(
                        e,
                        `${node1}.${tab}.${node2}.${i2}.Answer`,
                        p.row.id,
                        "AnnualPremium"
                      )
                    }
                    value={p.row.AnnualPremium}
                  />
                ),
              },

              {
                field: "Insurer",
                headerName: "Insurer",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(e, `${node1}.${tab}.${node2}.${i2}.Answer`, p.row.id, "Insurer")
                    }
                    value={p.row.Insurer}
                  />
                ),
              },
            ],
          });
        if (x.MasterType === "PreviousPolicyDetails2")
          arr.push({
            type: "DataGrid",
            sx: headerStyle,
            visible: checkValueForVisible(x.OnChangeVal) ? "visibleDetails" : true,
            visibleDetails: checkValueForVisible(x.OnChangeVal) ? getParentQuestion(x, tab) : {},
            value: Array.isArray(get(dto, `${node1}.${tab}.${node2}.${i2}.Answer`))
              ? get(dto, `${node1}.${tab}.${node2}.${i2}.Answer`).map((xx1, id1) => ({
                  ...xx1,
                  id: id1,
                }))
              : [].map((xx1, id1) => ({
                  ...xx1,
                  id: id1,
                })),
            label: x.QText,
            splitId: 2,
            rowId: "id",
            spacing: 12,
            columns: [
              {
                field: "PolicyNo",
                headerName: "Policy Number ",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(e, `${node1}.${tab}.${node2}.${i2}.Answer`, p.row.id, "PolicyNo")
                    }
                    value={p.row.PolicyNo}
                  />
                ),
              },
              {
                field: "Insurer",
                headerName: "Insurer",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(e, `${node1}.${tab}.${node2}.${i2}.Answer`, p.row.id, "Insurer")
                    }
                    value={p.row.Insurer}
                  />
                ),
              },
              {
                field: "PlanTerm",
                headerName: "Plan & Term",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(e, `${node1}.${tab}.${node2}.${i2}.Answer`, p.row.id, "PlanTerm")
                    }
                    value={p.row.PlanTerm}
                  />
                ),
              },

              {
                field: "SumAssured",
                headerName: "Sum Assured",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(e, `${node1}.${tab}.${node2}.${i2}.Answer`, p.row.id, "SumAssured")
                    }
                    value={p.row.SumAssured}
                  />
                ),
              },
              {
                field: "CommencementDate",
                headerName: "Commencement Date",
                width: 250,
                renderCell: (p) => (
                  <MDDatePicker
                    input={{ label: "", value: p.row.CommencementDate }}
                    value={p.row.CommencementDate}
                    onChange={(e, a) =>
                      onChange1(
                        { target: { value: a } },
                        `${node1}.${tab}.${node2}.${i2}.Answer`,
                        p.row.id,
                        "CommencementDate"
                      )
                    }
                    options={{
                      dateFormat: "d/m/Y",
                      altFormat: "d/m/Y",
                      altInput: true,
                      maxDate: new Date(),
                    }}
                  />
                ),
              },
              {
                field: "Premium",
                headerName: "Premium",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(e, `${node1}.${tab}.${node2}.${i2}.Answer`, p.row.id, "Premium")
                    }
                    value={p.row.Premium}
                  />
                ),
              },
              {
                field: "HowAccepted",
                headerName: "How Accepted",
                width: 250,
                renderCell: (p) => (
                  <MDInput
                    onChange={(e) =>
                      onChange1(e, `${node1}.${tab}.${node2}.${i2}.Answer`, p.row.id, "HowAccepted")
                    }
                    value={p.row.HowAccepted}
                  />
                ),
              },
              {
                field: "PolicyStatus",
                headerName: "Policy status",
                width: 250,
                renderCell: (p) => (
                  <Autocomplete
                    fullWidth
                    options={[
                      "Postponed",
                      "Declined",
                      "Rated up",
                      "with extra premium",
                      "Rejected",
                      "Withdrawn",
                    ]}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    onChange={(e, a) =>
                      onChange1(
                        { target: { value: a } },
                        `${node1}.${tab}.${node2}.${i2}.Answer`,
                        p.row.id,
                        "PolicyStatus"
                      )
                    }
                    value={p.row.PolicyStatus}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <MDInput {...params} />}
                  />
                ),
              },
            ],
          });
      }

      // console.log("1234567890", arr);
      return arr;
    };

    try {
      const tGroupArr = questions.reduce((group1, product, index) => {
        const group = group1;
        const { QSubType } = product;
        group[QSubType] = group[QSubType] ?? [];
        group[QSubType] = [...group[QSubType], ...getRenderQuestion(product, index)];
        return group;
      }, {});
      // console.log("tGroupArr", tGroupArr);
      if (typeof tGroupArr === "object") return tGroupArr;
    } catch (e) {
      console.log("exception2", e);
      return {};
    }
  } catch (e) {
    console.log("exception1", e);
    return {};
  }

  return {};
};

const checkForValue = (value) => value === "" || value === undefined || value === null;

const stringSplitter = (str) => {
  // const parts = str.split(/\(|\)|,\s*/);
  const parts = [
    str.substring(0, str.indexOf("(")),
    ...str.substring(str.indexOf("(") + 1, str.lastIndexOf(")")).split(","),
  ];
  let newParts = [""];
  let i = 0;
  let sum1 = 0;
  let sum2 = 0;
  let sum3 = 0;
  parts.forEach((x) => {
    for (const chr of x) {
      if (chr === "{") sum1 += 1;
      if (chr === "}") sum1 -= 1;
      if (chr === "[") sum2 += 1;
      if (chr === "]") sum2 -= 1;
      if (chr === "(") sum3 += 1;
      if (chr === ")") sum3 -= 1;
    }
    newParts[i] = newParts[i] + (newParts[i] === "" ? "" : ",") + x;
    if (sum1 === 0 && sum2 === 0 && sum3 === 0) {
      newParts = [...newParts, ""];
      i += 1;
    }
  });

  newParts = newParts.filter((x) => x !== "" && x !== " ");
  return newParts;
};
const convertToFunctionCall = (functionString, functions, variables) => {
  try {
    const splitFunctionString = (str) => {
      if (str.split("(")[0] === "evaluateExpression")
        return [str.split("(")[0], str.substring(19, str.length - 1)];

      return stringSplitter(str);
    };
    const functionCall = splitFunctionString(functionString);
    const len = functionCall.length;
    switch (functionCall[0]) {
      case "productMasters":
        return functions.productMasters(
          len > 1 ? functionCall[1] : "Product",
          len > 2 ? convertToTemplate(functionCall[2], variables, functions) : variables.a,
          len > 3 ? functionCall[3] : 0
        );
      case "checkForValue":
        return functions.checkForValue(convertToTemplate(functionCall[1], variables, functions));
      case "getAutocompleteValue":
        return functions.getAutocompleteValue(
          len > 1 ? functionCall[1] : "",
          len > 2 ? convertToTemplate(functionCall[2], variables, functions) : ""
        )[len > 3 ? functionCall[3] : "mValue"];
      case "set":
        return functions.set(
          variables.dto,
          len > 1 ? functionCall[1] : "",
          len > 2 ? convertToTemplate(functionCall[2], variables, functions) : "",
          variables.setDto
        );
      case "setMultipleValues":
        return functions.setMultipleValues(JSON.parse(functionCall[1]), variables, functions);
      case "getFrequency":
        return functions.getFrequency(convertToTemplate(functionCall[1], variables, functions));
      case "assignValueId":
        return functions.assignValueId(
          len > 1 ? convertToTemplate(functionCall[1], variables, functions) : variables.a,
          convertToTemplate(functionCall[2], variables, functions),
          functionCall[3]
        );
      case "evaluateExpression":
        return eval(functionCall[1]);
      case "callApi":
        const requestJson = JSON.parse(functionCall[3]);
        const additionalDetails = JSON.parse(functionCall[4]);

        if (Object.keys(requestJson))
          Object.keys(requestJson).forEach((x) => {
            requestJson[x] = convertToTemplate(requestJson[x], variables, functions);
          });
        functions.callApi(
          functionCall[1],
          convertToTemplate(functionCall[2], variables, functions),
          requestJson,
          additionalDetails
        );
        return [];
      case "genericValidator":
        return functions.genericValidator(JSON.parse(functionCall[1]), variables, functions);
      case "getRiskBenefits":
        return functions.newRiskBenefits(
          convertToTemplate(functionCall[1], variables, functions),
          convertToTemplate(functionCall[2], variables, functions)
        );
      default:
        break;
    }
    return functionString;
  } catch (ex) {
    console.log("Something is wrong", ex);
  }
};

const splitString = (input) => {
  const parts = input.split(".");
  return parts.length > 1 ? [parts.shift(), parts.join(".")] : [input, ""];
};

const convertToTemplate = (stringInput, variables, functions) => {
  let newString = "";
  if (!stringInput) return stringInput;

  if (Array.isArray(stringInput)) {
    // To Call Multiple Functions
    // console.log("Reached 0", stringInput);
    stringInput.forEach((element) => convertToTemplate(element, variables, functions));
  }
  if (
    stringInput[0] === "{" &&
    stringInput[stringInput.length - 1] === "}" &&
    !checkForValue(variables[stringInput.slice(1, -1)])
  ) {
    // console.log("Reached 1", stringInput);
    return variables[stringInput.slice(1, -1)];
  }
  if (typeof stringInput === "string") {
    const wordList = stringInput.split(/(\{[^{}]+\})/).filter((x) => x !== "");
    // console.log("Testing2", wordList);
    if (
      wordList[0] &&
      wordList[0].includes("{") &&
      !checkForValue(variables[wordList[0].slice(1, -1)]) &&
      typeof variables[wordList[0].slice(1, -1)] === "object"
    ) {
      /* Case to check if the variable is of type object and get its value */
      const [variableName, path] = splitString(stringInput);
      // console.log(
      //   "Reached 2",
      //   stringInput,
      //   variableName,
      //   path,
      //   get(variables[variableName.slice(1, -1)], path)
      // );
      return functions.get(variables[variableName.slice(1, -1)], path);
    }
    wordList.forEach((word) => {
      if (word !== "") {
        if (word.includes("{")) {
          const newWord = word.slice(1, -1);
          if (typeof variables[newWord] !== "object") {
            if (Object.keys(variables).some((x) => x === newWord))
              newString = `${newString}${variables[newWord]}`;
            else newString += word;
          } else newString += word;
        } else newString += word;
      }
      // console.log("Testing2 1", word, newString);
    });

    if (newString.includes("(")) {
      // console.log("Reached 3", newString);
      newString = convertToFunctionCall(newString, functions, variables);
    }
    return newString;
  }
  return stringInput;
};

const configurationConvertor = (json, variables, functions, memberId, callbackFunc) => {
  const newJson = { ...json };
  if (callbackFunc) {
    const response = callbackFunc(json, variables, functions, memberId);
    if (response) return response;
  }
  Object.keys(json).forEach((x) => {
    if (typeof json[x] === "string" || Array.isArray(json[x]))
      switch (x) {
        case "path":
          newJson.path = convertToTemplate(json.path, variables, functions);
          break;
        case "options":
          newJson.options =
            typeof json[x] === "string"
              ? functions.getMaster(convertToTemplate(json.options, variables, functions))
              : json[x];
          break;
        case "visible":
          newJson.visible =
            convertToTemplate(json.visible, variables, functions) && variables.visible;
          break;
        case "required":
          newJson.required = convertToTemplate(json.required, variables, functions);
          break;
        case "customOnChange":
          newJson.customOnChange = (e, a) => {
            convertToTemplate(json.customOnChange, { ...variables, a, e }, functions);
          };
          break;
        default:
          newJson[x] = convertToTemplate(json[x], variables, functions);
          break;
      }
  });
  return newJson;
};

/* eslint-enable */

export { GetQuestionsControls, configurationConvertor, convertToTemplate, convertToFunctionCall };
