const conditionType = [
  { mID: "Param", mValue: "Parameter", mType: "Parameter" },
  { mID: "Rate", mValue: "Rate", mType: "Rate" },
  { mID: null, mValue: "Default", mType: "Default" },
  { mID: "Expression", mValue: "Expression", mType: "Expression" },
];
const conditionOperator = [
  { mID: "=", mValue: "=", mType: "Operator" },
  { mID: ">", mValue: ">", mType: "Operator" },
  { mID: "<", mValue: "<", mType: "Operator" },
  { mID: "!=", mValue: "!=", mType: "Operator" },
  { mID: ">=", mValue: ">=", mType: "Operator" },
  { mID: "<=", mValue: "<=", mType: "Operator" },
  { mID: "InBetween", mValue: "InBetween", mType: "Operator" },
  { mID: "IsListOf", mValue: "IsListOf", mType: "Operator" },
  { mID: "Validate", mValue: "Validate", mType: "Operator" },
  { mID: "StartsWith", mValue: "StartsWith", mType: "Operator" },
  { mID: "EndsWith", mValue: "EndsWith", mType: "Operator" },
  { mID: "Substring", mValue: "Substring", mType: "Operator" },
  { mID: "DateRange", mValue: "DateRange", mType: "Operator" },
  { mID: "ValidateDOB", mValue: "ValidateDOB", mType: "Operator" },
  { mID: "CountDays", mValue: "CountDays", mType: "Operator" },
  { mID: "ModBy", mValue: "Mod By", mType: "Operator" },
  { mID: "NotModBy", mValue: "Not Mod By", mType: "Operator" },
  { mID: "ExpDateRange", mValue: "ExpDateRange", mType: "Operator" },
];
const logicalOperator = [
  { mID: "and", mValue: "AND", mType: "Operator" },
  { mID: "or", mValue: "OR", mType: "Operator" },
];

const dobList = [
  { mID: "Days", mValue: "Days", mType: "Days" },
  { mID: "Months", mValue: "Months", mType: "Months" },
  { mID: "Years", mValue: "Years", mType: "Years" },
];
export { conditionType, conditionOperator, logicalOperator, dobList };
