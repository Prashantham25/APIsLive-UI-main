import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import objectPath from "object-path";
// import swal from "sweetalert";s
import { Autocomplete, Breadcrumbs, useMediaQuery, Card, Stack, Icon, Drawer } from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import planCard from "assets/images/Life/LICProducts/Bima Jyoti Card.png";
import nameImg from "assets/images/Life/name.png";
import detailsImg from "assets/images/Life/details.png";
import locationImg from "assets/images/Life/location.png";
import birthDayImg from "assets/images/Life/birthDay.png";
import contactImg from "assets/images/Life/contact.png";
import ReactJson from "react-json-view";

// import swal from "sweetalert";

import PremiumBreakup from "./PremiumBreakup";
import BPNavbar from "../../../../../../BrokerPortal/Layouts/BPNavbar";
import PageLayout from "../../../../../../../examples/LayoutContainers/PageLayout";
// import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDInput from "../../../../../../../components/MDInput";
import MDButton from "../../../../../../../components/MDButton";
import {
  GetMasters,
  // GetProductMasterAVO,
  // GetRiders,
  Quotations,
  SaveQuotation,
  SaveOpportunity,
  GetProdPartnerMasterData,
  // ExecuteProcedure,
} from "../../NewBusiness/data";
import MDLoader from "../../../../../../../components/MDLoader";
import PolicyJson from "../../NewBusiness/Quotation/Json/LifeQuotationJson";
import { useDataController } from "../../../../../../BrokerPortal/context";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import {
  DateFormatFromDateObject,
  DateFormatFromStringDate,
  IsNumeric,
} from "../../../../../../../Common/Validations";
import { configurationConvertor, convertToTemplate } from "../../NewBusiness/data/DynamicContent";
import { set, get } from "../../../../../../../Common/RenderControl/objectPath";
import genericApi from "../../../../../../../Common/RenderControl/GenericAPIs";

const checkForValue = (value) => value === "" || value === undefined || value === null;
// const hasRelation = (relation, productDetails) =>
//   productDetails.relation.filter((x) => x.mValue === relation)[0] !== undefined;
const getFrequency = (value) =>
  ({ Yearly: 1, "Half-Yearly": 2, Quarterly: 4, Monthly: 12, Single: 0 }[value]);

const validateField = (value, minValue, maxValue, multipleOf) => {
  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };
  if (
    !(
      getInt(minValue) <= value &&
      (maxValue ? getInt(maxValue) >= value : true) &&
      (multipleOf ? value % getInt(multipleOf) === 0 : true)
    )
  )
    return `${minValue ? `Minimum Value: ${getInt(minValue)},` : ""} ${
      maxValue ? `Maximum Value: ${getInt(maxValue)},` : ""
    }
    ${multipleOf ? `Value must be a multiple of ${getInt(multipleOf)}` : ""}`;
  return true;
};

const ProductDetailsJson = {
  Plan: "",
  PreferredMode: "",
  PolicyTerm: "",
  PremiumPayingTerm: "",
  PolicePersonnel: "",
  Product: "",
  ProductCode: "",
  PlanCode: "",
  SumAssured: "",
  totalLifeBenefit: "",
  PaymentFrequency: "",
  DrawDownPeriod: "",
  spouseDetails: {},
  childrenDetails: [],
  DateOfCommencement: "",
  InsurableItem: [
    {
      InsurableName: "Person",
      Covers: [],
      RiskItems: [
        {
          Name: "",
          DOB: "",
          Gender: "",
          Relation: "Self",
          RelationId: 1,
          Age: "",
          PassportNo: "",
          PreExistingDisease: "",
          SumAssured: "",
          RiderDetails: [],
        },
      ],
    },
  ],
  PremiumDetails: {
    CoverPremium: [{}],
    BasicPremium: "",
    Discount: "0",
    GrossPremium: "",
    TaxDetails: [],
    TaxAmount: "",
    TotalPremium: "",
    InstallmentDetails: [{}],
  },
  dynamicContent: [],
};
const idValueMap = {
  contactType: "contactTypeId",
  Salutation: "SalutationId",
  Gender: "GenderId",
  MaritalStatus: "MaritalStatusId",
  Currency: "CurrencyId",
  Country: "CountryId",
  State: "StateId",
  District: "DistrictId",
  City: "CityId",
  Pincode: "PincodeId",

  // Product Masters
  Product: "ProductId",
  Plan: "PlanId",
  PolicyTerm: "PolicyTermId",
  PreferredMode: "PreferredModeId",
  DrawDownPeriod: "DrawDownPeriodId",
  BenefitOption: "BenefitOptionId",
  Relation: "RelationId",
};

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};

const styles = {
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  centerRowStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    verticalAlign: "middle",
    textAlign: "center",
    fontSize: "1rem",
  },
  cardStyle: {
    display: "flex",
    flexDirection: "column",
    verticalAlign: "middle",
    textAlign: "center",
    width: "15rem",
    border: "2px solid rgba(112, 112, 112, 0.3)",
    borderRadius: "0.5rem",
    m: 0.5,
    p: 0.5,
    "&:hover": {
      backgroundColor: "#DEEFFD",
      cursor: "pointer",
    },
  },
  headingStyle: {
    fontSize: "1.5rem",
    fontWeight: 400,
    color: "#000000",
    justifyContent: "start",
    display: "flex",
    width: "100%",
    pl: "1rem",
  },
};

function GetStepContent({
  step,

  product,
  masters,
  policyDto,
  setPolicyDto,
  setMaster,
  premiumDetails,
  setPremiumDetails,
  quoteDetails,
  setQuoteDetails,
  setLoader,
  index,
  nextFlag,
  nextCount,
  handleBack,
  handleNext,
}) {
  console.log("policyDto", policyDto);
  console.log("masters", masters);

  const dto = { ...policyDto };

  const assignValueId = (a, path, valueParam) => {
    const idParam = idValueMap[valueParam];
    if (path === "") {
      if (a !== null) setPolicyDto({ ...dto, [valueParam]: a.mValue, [idParam]: a.mID });
      else setPolicyDto({ ...dto, [valueParam]: "", [idParam]: "" });
    } else {
      const dummy = get(dto, path);
      if (a !== null)
        set(dto, path, { ...dummy, [valueParam]: a.mValue, [idParam]: a.mID }, setPolicyDto);
      else set(dto, path, { ...dummy, [valueParam]: "", [idParam]: "" }, setPolicyDto);
    }
  };
  const getAutocompleteValue = (masterType, id) => {
    if (masters[masterType])
      return !checkForValue(id)
        ? masters[masterType].filter((x) => x.mID === id)[0]
        : { mValue: "" };
    return { mValue: "" };
  };
  const getMaster = (name) =>
    !checkForValue(masters[name]) && Array.isArray(masters[name]) ? masters[name] : [];

  const callApi = async (method, url, requestObj, additionalDetails) => {
    setLoader(true);
    const response = await genericApi(method, url, requestObj);
    setLoader(false);
    const { sourceParameter, path, accessPath } = additionalDetails || {
      sourceParameter: "Masters",
      path: "Unassigned",
      accessPath: null,
    };
    const outputObject = !checkForValue(accessPath) ? get(response, accessPath) : response;
    switch (sourceParameter) {
      case "Masters":
        setMaster((prevState) => ({
          ...prevState,
          [path]: Array.isArray(outputObject) ? outputObject : [],
        }));
        return true;
      default:
        return false;
    }
  };

  /* eslint-disable */
  const genericValidator = (validateList, variables, functions) => {
    let validationSuccess = true;
    validateList.forEach((x) => {
      const valueInPath = get(dto, convertToTemplate(x.path ? x.path : "", variables, functions));
      const type = x.type || "";
      switch (type) {
        case "List":
          const valuesToCompare = Array.isArray(x.valueList) ? x.valueList : [];
          if (valuesToCompare.some((x1) => valueInPath === x1)) {
            validationSuccess = false;
            return false;
          }
          break;
        default:
          break;
      }
      return null;
    });
    return validationSuccess;
  };
  /* eslint-enable */

  const setMultipleValues = (assignValuesList, variables, functions) => {
    let newDto = { ...dto };
    let newMasters = { ...masters };
    if (Array.isArray(assignValuesList)) {
      assignValuesList.forEach((x) => {
        if (x.targetObject === "Masters")
          newMasters = {
            ...set(
              newMasters,
              convertToTemplate(x.path ? x.path : "", variables, functions),
              convertToTemplate(x.value ? x.value : "", variables, functions)
            ),
          };
        else
          newDto = {
            ...set(
              newDto,
              convertToTemplate(x.path ? x.path : "", variables, functions),
              convertToTemplate(x.value ? x.value : "", variables, functions)
            ),
          };
      });
    }
    setPolicyDto({ ...newDto });
    setMaster({ ...newMasters });
  };

  const getTypewiseContent = (json, variables, functions, memberId) => {
    switch (json.type) {
      case "PlanMasters":
        json.functionCalls.forEach((x) => convertToTemplate(x, variables, functions));
        return null;
      case "GenericValidations":
        json.functionCalls.forEach((x) => convertToTemplate(x, variables, functions));
        return null;

      case "SSS":
        return {
          type: "RadioGroup",
          visible: true,
          required: true,
          radioLabel: { label: "SSS", labelVisible: true },
          radioList: [
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ],
          path: `productDetails.${variables.index}.SSS`,
          customOnChange: (e) => {
            setMultipleValues(
              [
                { path: `productDetails.${variables.index}.SSS`, value: e.target.value },
                {
                  path: `productDetails.${variables.index}.PreferredMode`,
                  value: e.target.value === "Yes" ? "Monthly" : "",
                },
                {
                  path: `productDetails.${variables.index}.PreferredModeId`,
                  value: e.target.value === "Yes" ? 1 : "",
                },
                {
                  path: `productDetails.${variables.index}.frequency`,
                  value: e.target.value === "Yes" ? getFrequency("Monthly") : "",
                },
              ],
              variables,
              functions
            );
          },
          spacing: 3,
        };
      case "PreferredMode":
        return {
          label: !checkForValue(json.label) ? json.label : "Preferred Mode",
          path: `productDetails.${variables.index}.PreferredMode`,
          type: "AutoComplete",
          visible: variables.visible,
          required: true,
          disabled: dto.productDetails[variables.index].SSS === "Yes",
          options: getMaster(`PreferredMode-${variables.index}`),
          customOnChange: (e, a) => {
            setMultipleValues(
              [
                { path: `productDetails.${variables.index}.PreferredMode`, value: a.mValue },
                { path: `productDetails.${variables.index}.PreferredModeId`, value: a.Code },
                {
                  path: `productDetails.${variables.index}.frequency`,
                  value: getFrequency(a.mValue),
                },
              ],
              variables,
              functions
            );
            // assignValueId(a, `productDetails.${variables.index}`, "PreferredMode");
            // set(dto, `productDetails.${variables.index}.frequency`, getFrequency(a.mValue), setDto);
          },
          spacing: 3,
        };
      case "PolicePersonnel":
        return {
          label: "Police Personnel",
          path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PolicePersonnel`,
          type: "AutoComplete",
          visible: variables.visible,
          required: true,

          options: getMaster("PolicePersonnel"),
          customOnChange: async (e, b) => {
            const a = b || { mValue: "" };
            setLoader(true);
            const res = await GetProdPartnerMasterData("AccidentBenefit", {
              PolicePersonnel: a.mValue === "Yes",
              AccidentBenefitType: convertToTemplate(
                json.AccidentBenefitType || "AB/ADDB",
                variables,
                functions
              ),
            });
            setLoader(false);
            set(
              dto,
              `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PolicePersonnel`,
              a.mValue,
              setPolicyDto
            );
            setMaster((prevState) => ({
              ...prevState,
              [`AccidentBenefit-${variables.index}-${memberId}`]: res[0] ? res : [],
            }));
          },
          spacing: 3,
          isMemberControl: true,
        };
      case "AccidentBenefit":
        return {
          label: "Accident Benefit Required?",
          path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefit`,
          type: "AutoComplete",
          visible: variables.visible,
          required: true,

          options: getMaster(`AccidentBenefit-${variables.index}-${memberId}`),
          customOnChange: async (e, a) => {
            setMultipleValues(
              [
                {
                  path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefit`,
                  value: a.mValue,
                },
                {
                  path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefitId`,
                  value: a.Code,
                },
              ],
              variables,
              functions
            );
          },
          spacing: 3,
          isMemberControl: true,
        };
      case "PremiumWaiverBenefit":
        return {
          label: "Premium Waiver Benefit Required?",
          path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PremiumWaiver`,
          type: "AutoComplete",
          visible:
            variables.visible &&
            dto.productDetails[variables.index].InsurableItem[0].RiskItems[memberId].Age < 18,
          required: true,
          options: getMaster("PremiumWaiver"),
          customOnChange: async (e, a) => {
            setMultipleValues(
              [
                {
                  path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PremiumWaiver`,
                  value: a.mValue,
                },
                {
                  path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PremiumWaiverId`,
                  value: a.mID,
                },
              ],
              variables,
              functions
            );
          },
          spacing: 3,
          isMemberControl: true,
        };
      case "Nach":
        return {
          label: "Under NACH?",
          path: `productDetails.${index}.Nach`,
          type: "AutoComplete",
          visible:
            // variables.visible ||
            (dto.productDetails[index].SSS === "No" && json.isSSS === true) || !json.isSSS,
          required: true,

          options:
            dto.productDetails[index].PreferredMode === "Monthly"
              ? getMaster("Nach").filter((x) => x.mValue !== "No")
              : getMaster("Nach"),
          customOnChange: async (e, a) => {
            setMultipleValues(
              [
                { path: `productDetails.${index}.Nach`, value: a.mValue },
                { path: `productDetails.${index}.NachId`, value: a.mID },
              ],
              variables,
              functions
            );
          },
          spacing: 3,
        };
      case "SumAssured":
        return {
          type: "CurrencyInput",
          visible: variables.visible,
          spacing: 3,
          path: `productDetails.${variables.index}.SumAssured`,
          required: true,
          label: "Basic Sum Assured",
          minValue: json.minValue,
          maxValue: json.maxValue,
          multipleOf: json.multipleOf,
        };
      case "Premium":
        return {
          type: "CurrencyInput",
          visible: variables.visible,
          spacing: 3,
          path: `productDetails.${variables.index}.premium`,
          required: true,
          label: "Premium",
          minValue: json.minValue,
          maxValue: json.maxValue,
          multipleOf: json.multipleOf,

          //     : "",
        };
      // case "OldRiskBenefitsButton":
      //   return {
      //     type: "Button",
      //     spacing: 12,
      //     visible: variables.visible && variables.hasMultipleProducts,
      //     label: "Get Risk Benefits",
      //     justifyContent: "end",
      //     onClick: () => handleRiskBenfits(variables.index, variables.elem),
      //   };
      // case "OldRiskBenefitsContent":
      //   return {
      //     type: "Custom",
      //     return: (
      //       <BenefitIllustration
      //         key={variables.index}
      //         styles={styles}
      //         benefitData={otherData[`benefitData-${variables.index}`]}
      //         combinedJson={{ ...dto, productDetails: { ...variables.elem } }}
      //         setDto={setDto}
      //         setLoading={setLoading}
      //         setOtherData={setOtherData}
      //         productIndex={variables.index}
      //         masters={masters}
      //         otherData={otherData}
      //       />
      //     ),
      //     visible: variables.visible && variables.hasMultipleProducts,
      //     spacing: 12,
      //   };

      // case "RiskBenefitsButton":
      //   return {
      //     type: "ValidationControl",
      //     subType: "Button",
      //     spacing: 12,
      //     visible: variables.visible && variables.hasMultipleProducts,
      //     label: "Get Risk Benefits",
      //     justifyContent: "end",
      //     onClick: (flag) => {
      //       if (flag === true) newRiskBenefits(variables.index, variables.elem);
      //       else swal({ text: "Please fill required fields", icon: "error" });
      //     },
      //   };
      // case "RiskBenefitsContent":
      //   return {
      //     type: "Custom",
      //     return: (
      //       <RidersTable
      //         key={variables.index}
      //         styles={styles}
      //         productDetails={{
      //           ...variables.elem,
      //         }}
      //         setDto={setDto}
      //         productIndex={variables.index}
      //         dto={dto}
      //         setLoading={setLoading}
      //         handleCalculatePremium={newCalculatePremium}
      //       />
      //     ),
      //     visible: variables.visible && variables.hasMultipleProducts,
      //     spacing: 12,
      //   };

      // case "IllustrationButton":
      //   return {
      //     type: "Button",
      //     spacing: 12,
      //     visible:
      //       variables.visible &&
      //       variables.hasMultipleProducts &&
      //       !checkForValue(otherData[`totalPremium-${variables.index}`]),
      //     label: "View Illustration",
      //     justifyContent: "end",
      //     onClick: () => handleIllustration(variables.index),
      //   };
      // case "IllustrationContent":
      //   return {
      //     type: "Custom",
      //     return: (
      //       <PremiumBreakup
      //         key={variables.index}
      //         illustrationData={otherData[`illustrationData-${variables.index}`]}
      //         styles={styles}
      //       />
      //     ),
      //     visible:
      //       variables.visible &&
      //       variables.hasMultipleProducts &&
      //       !checkForValue(otherData[`totalPremium-${variables.index}`]),
      //     spacing: 12,
      //   };
      // case "OldPremiumButton":
      //   return {
      //     type: "Button",
      //     spacing: 12,
      //     visible: variables.visible && variables.hasMultipleProducts,
      //     label: "Calculate Premium",
      //     justifyContent: "end",
      //     onClick: () => handleCalculatePremium(variables.index),
      //   };
      // case "OldPremiumContent":
      //   return {
      //     type: "Custom",
      //     spacing: 12,
      //     visible: variables.visible && variables.hasMultipleProducts,
      //     return: (
      //       <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      //         {!checkForValue(otherData[`totalPremium-${variables.index}`]) && (
      //           <MDBox sx={{ ...centerRowStyle, width: matches ? "30%" : "100%" }}>
      //             <CustomCardBox
      //               label="Total Premium"
      //               value={otherData[`totalPremium-${variables.index}`]}
      //               backgroundColor="rgba(29, 78, 158, 1)"
      //             />
      //           </MDBox>
      //         )}
      //       </MDBox>
      //     ),
      //   };
      // case "PremiumButton":
      //   return {
      //     type: "ValidationControl",
      //     subType: "Button",
      //     spacing: 12,
      //     visible: variables.visible && variables.hasMultipleProducts,
      //     label: "Calculate Premium",
      //     justifyContent: "end",
      //     onClick: (flag) => {
      //       if (flag === true) newCalculatePremium(variables.index);
      //       else swal({ text: "Please fill required fields", icon: "error" });
      //     },
      //   };
      // case "PremiumContent":

      // return {
      //   type: "Custom",
      //   return: (
      //     <QuotationSummary
      //       dto={dto}
      //       productIndex={variables.index}
      //       onSaveQuotation={onSaveQuotation}
      //       setLoading={setLoading}
      //     />
      //   ),
      //   visible:
      //     variables.visible &&
      //     variables.hasMultipleProducts &&
      //     !checkForValue(
      //       get(dto, `productDetails.${variables.index}.PremiumDetails`)["Total Premium"]
      //     ),
      //   spacing: 12,
      // };
      default:
        break;
    }
    return false;
  };

  const dynamicContent = (zzz, elem, hasMultipleProducts, product1, visible) => {
    try {
      if (checkForValue(product1)) return [];
      const variables = { visible, index, elem, memberId: 0, dto, hasMultipleProducts };
      const functions = {
        productMasters: () => true,
        assignValueId,
        checkForValue,
        set,
        getAutocompleteValue,
        getFrequency,
        get,
        getMaster,
        setMultipleValues,
        callApi,
        genericValidator,
      };
      const foo = {};
      if (!checkForValue(elem.dynamicContent)) foo[product1] = [...elem.dynamicContent];

      if (!checkForValue(foo[product1]) && foo[product1].length > 0) {
        let content = [];
        foo[product1]
          .filter((x) => x.type !== "PlanMasters" && x.type !== "GenericValidations")
          .forEach((y) => {
            if (
              y.type !== "MembersContent" &&
              y.type !== "PolicePersonnel" &&
              y.type !== "AccidentBenefit" &&
              y.type !== "PremiumWaiverBenefit" &&
              y.isMemberControl !== true
            ) {
              if (y.minValue || y.maxValue || y.multipleOf) {
                const fieldValidate = validateField(
                  y.path ? get(dto, convertToTemplate(y.path, variables, functions)) : "",
                  convertToTemplate(y.minValue, variables, functions),
                  convertToTemplate(y.maxValue, variables, functions),
                  convertToTemplate(y.multipleOf, variables, functions)
                );
                content = [
                  ...content,
                  {
                    ...configurationConvertor(y, variables, functions, 0, getTypewiseContent),
                    validationId: 1,
                    errorFlag: fieldValidate !== true,
                    errorText: fieldValidate !== true ? fieldValidate : "",
                  },
                ];
              } else {
                content = [
                  ...content,
                  {
                    ...configurationConvertor(y, variables, functions, 0, getTypewiseContent),
                    validationId: 1,
                  },
                ];
              }
            } else
              content =
                // y.type === "MembersContent"
                //   ? [
                //       ...content,
                //       ...getMemberContent(index, y, variables, functions).map((z) => ({
                //         ...z,
                //         visible: z.visible && visible,
                //         validationId: 1,
                //       })),
                //     ]
                //   :
                [...content];
          });
        content = content.filter((x) => !checkForValue(x));
        return content;
      }
    } catch (e) {
      setLoader(false);
      console.log(e);
    }
    return null;
  };

  let productDetailsContent = [];

  try {
    const elem = dto.productDetails[index];

    if (!elem) return false;
    /* eslint-enable consistent-return */

    const visible = true;
    const hasMultipleProducts = true;
    /* eslint-disable eqeqeq */
    const relationArray =
      checkForValue(elem.relation) || elem.relation.length < 1
        ? [{ mID: 1, mValue: "Self" }]
        : elem.relation;
    productDetailsContent = [
      ...productDetailsContent,

      /* eslint-enable eqeqeq */

      {
        type: "Custom",
        return: <MDBox />,
        visible,
        spacing: 12,
      },

      {
        label: "Plan",
        path: `productDetails.${index}.Plan`,
        type: "AutoComplete",
        required: true,
        spacing: 3,
        visible,
        options: getMaster(`Plan-${index}`),
        customOnChange: (e, a) => {
          set(
            dto,
            `productDetails.${index}`,
            {
              ...elem,
              PlanCode: !checkForValue(a) ? a.planCode : "",
              PlanNumber: !checkForValue(a) ? a.planNumber : "",
            },
            setPolicyDto
          );
          // productMasters("Plan", a, index);
        },
        disabled: checkForValue(elem.Product),
        validationId: 1,
      },
      {
        label: "Plan Code",
        type: "Input",
        visible,
        spacing: 3,
        // value: getAutocompleteValue(`Plan-${index}`, elem.PlanId)?.planCode,
        path: `productDetails.${index}.PlanCode`,
        disabled: true,
      },

      ...(!checkForValue(dynamicContent(index, elem, hasMultipleProducts, elem.Product, visible)) &&
      visible
        ? dynamicContent(index, elem, hasMultipleProducts, elem.Product, visible)
        : [
            {
              label: "Policy Term",
              path: `productDetails.${index}.PolicyTerm`,
              type: "AutoComplete",
              spacing: 3,
              visible,
              required: true,

              options: getMaster(`PolicyTerm-${index}`),
              // customOnChange: (e, a) => productMasters("PolicyTerm", a, index),
              disabled: checkForValue(elem.Plan),
            },
            {
              label: "Premium Paying Term",
              path: `productDetails.${index}.premPayingTerm`,
              type: "Input",
              spacing: 3,
              visible,

              value: getAutocompleteValue(`PolicyTerm-${index}`, elem.PolicyTermId)?.mValue,
              disabled: true,
            },
            {
              label: "Preferred Mode",
              path: `productDetails.${index}.PreferredMode`,
              type: "AutoComplete",
              visible,
              required: true,

              options: getMaster(`PreferredMode-${index}`),
              customOnChange: (e, a) => {
                assignValueId(a, `productDetails.${index}`, "PreferredMode");
                set(dto, `productDetails.${index}.frequency`, getFrequency(a.mValue), setPolicyDto);
              },
              spacing: 3,
            },
            {
              label: "Frequency",
              path: `productDetails.${index}.frequency`,
              type: "Input",
              spacing: 3,
              disabled: true,
              visible,
            },
            // {
            //   label: "Basic Sum Assured",
            //   path: `productDetails.${index}.SumAssured`,
            //   visible,
            //   type: "Input",
            //   spacing: 3,
            //   required: true,
            // },
            {
              type: "CurrencyInput",
              visible,
              spacing: 3,
              path: `productDetails.${index}.SumAssured`,
            },
            /* eslint-disable react/no-array-index-key */
            {
              type: "CurrencyInput",
              visible,
              spacing: 3,
              path: `productDetails.${index}.premium`,
            },
            /* eslint-enable react/no-array-index-key */
            {
              label: "Draw Down Period",
              path: `productDetails.${index}.DrawDownPeriod`,
              type: "AutoComplete",
              options: getMaster("DrawDownPeriod"),
              visible,
              customOnChange: (e, a) =>
                assignValueId(a, `productDetails.${index}`, "DrawDownPeriod"),
              spacing: 3,
              required: true,
            },
            {
              label: "Family Members",
              value: relationArray,
              type: "AutoComplete",
              options: getMaster("relation"),
              disableCloseOnSelect: true,
              multiple: true,
              visible,
              // customOnChange: (e, a) => handleMultipleSelect(`productDetails.${index}.relation`, a),
              spacing: 3,
            },
            // {
            //   type: "Custom",
            //   spacing: 3,
            //   visible: visible && hasRelation("Child", index),
            //   return: (
            //     <SlideBox
            //       label="No of Children"
            //       min={1}
            //       max={3}
            //       dto={dto}
            //       setPolicyDto={setPolicyDto}
            //       path={`productDetails.${index}.noOfChildren`}
            //     />
            //   ),
            // },
            // ...(hasRelation("Spouse", index) && visible ? getSpouseContent(index) : []),
            // ...(hasRelation("Child", index) && visible ? getChildContent(index) : []),
            {
              type: "Button",
              spacing: 12,
              visible: visible && hasMultipleProducts,
              label: "Get Risk Benefits",
              justifyContent: "center",
              // onClick: () => handleRiskBenfits(index, elem),
            },
            /* eslint-disable react/no-array-index-key */
            // {
            //   type: "Custom",
            //   return: (
            //     <BenefitIllustration
            //       key={index}
            //       styles={styles}
            //       benefitData={otherData[`benefitData-${index}`]}
            //       combinedJson={{ ...dto, productDetails: { ...elem } }}
            //       setPolicyDto={setPolicyDto}
            //       setLoader={setLoader}
            //       setOtherData={setOtherData}
            //       productIndex={index}
            //       masters={masters}
            //       otherData={otherData}
            //     />
            //   ),
            //   visible: visible && hasMultipleProducts,
            //   spacing: 12,
            // },
            // {
            //   type: "Button",
            //   spacing: 12,
            //   visible:
            //     visible &&
            //     hasMultipleProducts &&
            //     !checkForValue(otherData[`totalPremium-${index}`]),
            //   label: "View Illustration",
            //   justifyContent: "center",
            //   onClick: () => handleIllustration(index),
            // },
            // {
            //   type: "Custom",
            //   return: (
            //     <PremiumBreakup
            //       key={index}
            //       illustrationData={otherData[`illustrationData-${index}`]}
            //       styles={styles}
            //     />
            //   ),
            //   visible:
            //     visible &&
            //     hasMultipleProducts &&
            //     !checkForValue(otherData[`totalPremium-${index}`]),
            //   spacing: 12,
            // },

            /* eslint-enable react/no-array-index-key */
          ]
      ).map((x) => ({ ...x })),
    ];
  } catch (e) {
    setLoader(false);
    console.log(e);
  }

  const onPolicyTerm = (e, v, name) => {
    dto.ProductDetails[index][name] = v.mValue;
    dto.policypayingterm = v.mValue;
    setPolicyDto({ ...dto });
  };

  const onBenefitOption = (e, v) => {
    dto.ProductDetails[index].benefitOptions = v.mValue;
    setPolicyDto({ ...dto });
  };

  const onPrefereMode = (e, v, name) => {
    dto.ProductDetails[index][name] = { Annual: 1, "Half Yearly": 2, Quarterly: 4, Monthly: 12 }[
      v.mValue
    ];
    dto.ProductDetails[index].Mode = v.mValue;
    setPolicyDto({ ...dto });
  };

  const onBSI = (e) => {
    dto.ProductDetails[index][e.target.name] = e.target.value;
    dto.ProductDetails[index].sumAssuredOption = e.target.value;
    setPolicyDto({ ...dto });
  };
  const onPremium = (e) => {
    dto.ProductDetails[index][e.target.name] = e.target.value;
    setPolicyDto({ ...dto });
  };

  // const mandatoryText = "Fill all required fields";

  // const onNext1 = () => {
  //   // if (dto.Member[0].gender === "" || dto.Member[0].dob === "") {
  //   // swal({ icon: "error", text: "Fill all required fields" });
  //   // } else
  //   handleNext();
  // };

  // const onNext2 = async () => {
  //   // if (
  //   //   ((dto.productid === "47" || dto.productid === "49" || dto.productid === "50") &&
  //   //     (dto.planid === "" ||
  //   //       dto.policypayingterm === "" ||
  //   //       dto.benefitOptions === "" ||
  //   //       dto.paymentfrequency === "" ||
  //   //       dto.BasicSumAssured === "")) ||
  //   //   (dto.productid === "48" && (dto.planid === "" || dto.premium === ""))
  //   // ) {
  //   //   swal({ icon: "error", text: mandatoryText });
  //   // } else {
  //   const res = await ExecuteProcedure("pc.usp_GetLifeBenefits", dto);
  //   // setMaster({ ...masters, Riders: [...res] });
  //   dto.ProductDetails[index].InsurableItem[0].RiskItems[0].Benefit =
  //     res?.finalResult?.InsurableItem?.[0].RiskItems?.[0]?.Benefit;
  //   // const arr = [];
  //   // res.forEach((x, i) => {
  //   //   arr.push({
  //   //     memberid: 1,
  //   //     memberTitle: i === 0 ? "Main Life" : "",
  //   //     riderid: x.benefitID,
  //   //     sumassured: i === 0 ? dto.BasicSumAssured : "",
  //   //     RiderName: x.benifitName,
  //   //     IsSelected: i === 0 ? "Yes" : "No",
  //   //   });
  //   // });
  //   // dto.Member[0].Rider = arr;
  //   setPolicyDto({ ...dto });
  //   // handleNext();
  //   // }
  // };

  const onRiderSumAssure = (e, i) => {
    setLoader(true);
    if (e.target.value.length > 0 && e.target.value[0] !== "0")
      dto.ProductDetails[index].InsurableItem[0].RiskItems[0].Benefit[i].RiderSumAssured =
        e.target.value;
    // dto.Member[0].Rider[i].
    if (e.target.value.trim() === "" || e.target.value === "0")
      dto.ProductDetails[index].InsurableItem[0].RiskItems[0].Benefit[i].IsSelected = "No";
    else dto.ProductDetails[index].InsurableItem[0].RiskItems[0].Benefit[i].IsSelected = "Yes";

    setPolicyDto({ ...dto });
    setLoader(false);
  };

  const onCalculate = async () => {
    setLoader(true);
    const res1 = await Quotations(dto);
    dto.PremiumDetails = res1.finalResult.PremiumDetails;
    const res5 = await SaveQuotation({
      ProductCode: dto.ProductCode,
      QuotationDetails: {
        productDetails: {
          ProductCode: dto.ProductCode,
          dateOfBirth: dto.InsurableItem[0].RiskItems[0].DOB,
        },
        premiumDetails: { "Total Premium": res1.finalResult?.PremiumDetails?.["Total Premium"] },

        dateOfBirth: dto.InsurableItem[0].RiskItems[0].DOB,
      },
      "Agent Id": null,
      Name: "",
      "Email ID": "",
      "Mobile Number": "",
      "Product Id": dto.ProductId,
      QuoteNo: null,
    });
    if (res5.status <= 3) {
      const opportunityJson = {
        opportunityId: 0,
        needAnalysisJson: null,
        stageId: 3,
        stageStatusId: 1,
        txnType: "",
        txnValue: res5.quotation.quoteNo,
        txnValueId: res5.quotation.quotationId,
      };
      dto.QuotationNo = res5?.quotation?.quoteNo;
      localStorage.setItem("customerQuoteNo", res5?.quotation?.quoteNo);

      await SaveOpportunity(opportunityJson).then((result) => {
        localStorage.setItem("opportunityId", result.finalResult);
      });
    }
    setPolicyDto({ ...dto });
    setLoader(false);
    // handleNext();

    if (false) {
      const dto1 = PolicyJson();
      // objectPath.set(
      //   dto1,
      //   "QuotationDetails.premiumDetails.Total Premium",
      //   res1.finalResult?.PremiumDetails?.["Total Premium"]
      // );
      // objectPath.set(dto1, "QuotationDetails.productDetails.ProductCode", dto.ProductCode);
      // objectPath.set(dto1, "QuotationDetails.dateOfBirth", dto.Member[0].dob);

      const QuotationDetails = {
        productDetails: { ProductCode: dto.ProductCode, dateOfBirth: dto.Member[0].dob },
        address: { address1: "", address2: "", address3: "", city: "", district: "", state: "" },
        premiumDetails: { "Total Premium": res1.finalResult?.PremiumDetails?.["Total Premium"] },
        BenefitDetails: [
          {
            Name: "",
            DOB: "",
            Gender: "",
            Age: "",
            SumAssured: "",
          },
        ],
        dateOfBirth: dto.Member[0].dob,
      };

      setPremiumDetails({ ...res1.finalResult });
      const res2 = await SaveQuotation({
        "Agent Id": null,
        ...dto1,
        QuotationDetails,
        Name: "",
        "Email ID": "",
        "Mobile Number": "",
        "Product Id": dto.ProductId,
        QuoteNo: null,
      });

      if (res2.status <= 3) {
        const opportunityJson = {
          opportunityId: 0,
          needAnalysisJson: null,
          stageId: 3,
          stageStatusId: 1,
          txnType: "",
          txnValue: res2.quotation.quoteNo,
          txnValueId: res2.quotation.quotationId,
        };

        await SaveOpportunity(opportunityJson).then((result) => {
          // setPolicyDto((prevState) => ({
          //   ...prevState,
          //   opportunityId: result.finalResult,
          // }));
          localStorage.setItem("opportunityId", result.finalResult);
          // swal({
          //   text: result.responseMessage,
          //   icon: "success",
          // });
          // if (checkForValue(redirect) || redirect) setPage("Quotation");
        });
      }

      setQuoteDetails({ ...res2.quotation });
      localStorage.setItem("customerQuoteNo", res2?.quotation?.quoteNo);
      setLoader(false);
    }
  };

  const onPlan = async (e, a) => {
    const res = await GetProdPartnerMasterData("PolicyTerm", { parentID: a.mID });
    dto.productDetails[index].Plan = a.mValue;
    dto.productDetails[index].PlanCode = a.planCode;
    dto.productDetails[index].planType = a.planCode;
    setPolicyDto({ ...dto });
    setMaster({ ...masters, "PolicyTerm-0": res });
  };

  const onPolicePersonnel = async (e, b) => {
    const a = b || { mValue: "" };
    const res = await GetProdPartnerMasterData("AccidentBenefit", {
      PolicePersonnel: a.mValue === "Yes",
      AccidentBenefitType: "AB/ADDB",
    });
    dto.productDetails[index].InsurableItem[0].RiskItems[0].PolicePersonnel = a.mValue;

    setPolicyDto({ ...dto });
    setMaster((prevState) => ({
      ...prevState,
      AccidentBenefit: res[0] ? res : [],
    }));
  };

  const onPreferredMode = (e, a) => {
    dto.ProductDetails[index].PreferredMode = a.mValue;
    dto.ProductDetails[index].PreferredModeId = a.Code;
    dto.ProductDetails[index].frequency = masters.Frequency[a.mValue];
    const ppt = { 16: 10, 21: 15, 25: 26 };
    dto.ProductDetails[index].PremiumPayingTerm = ppt[dto.ProductDetails[index].PolicyTerm];
    setPolicyDto({ ...dto });
  };

  const controls = [
    [
      { type: "Img", visible: true, src: nameImg, spacing: 1 },
      {
        type: "Input",
        label: "First Name",
        visible: true,
        path: "ProposerDetails.FirstName",
        required: true,
        spacing: 5.5,
      },
      {
        type: "Input",
        label: "Last Name",
        visible: true,
        path: "ProposerDetails.LastName",
        required: true,
        spacing: 5.5,
      },
      { type: "Img", visible: true, src: birthDayImg, spacing: 1 },

      {
        type: "MDDatePicker",
        label: "Date of Birth",
        visible: true,
        path: "ProposerDetails.DOB",
        required: true,
        spacing: 4,
      },
      {
        type: "Input",
        label: "Age",
        visible: true,
        path: "ProposerDetails.Age",
        spacing: 1.5,
        readOnly: true,
      },
      {
        type: "AutoComplete",
        label: "Gender",
        visible: true,
        path: `productDetails.${index}.Gender`,
        options: masters.Gender,
        spacing: 5.5,
      },
      { type: "Img", visible: true, src: contactImg, spacing: 1 },

      {
        type: "Input",
        label: "Email ID",
        visible: true,
        path: "ProposerDetails.EmailId",
        required: true,
        endAdornmentIcon: "mail",
        spacing: 5.5,
      },

      {
        type: "Input",
        label: "Mobile No.",
        visible: true,
        path: "ProposerDetails.ContactNo",
        required: true,
        endAdornmentIcon: "smartphone",
        spacing: 5.5,
      },

      { type: "Img", visible: true, src: detailsImg, spacing: 1 },

      {
        type: "Input",
        label: "Annual Income",
        visible: true,
        path: "ProposerDetails.AnnualIncome",
        endAdornmentIcon: "currency_rupee",
        required: true,
        spacing: 5.5,
      },
      { type: "Typography", visible: true, spacing: 5.5 },
      {
        type: "AutoComplete",
        label: "City you Live",
        visible: false,
        path: "ProposerDetails.PermanentAddress.City",
        required: true,
        spacing: 5.5,
      },
      { type: "Img", visible: true, src: locationImg, spacing: 1 },

      {
        type: "Input",
        label: "Residential Status",
        visible: true,
        path: "ProposerDetails.PermanentAddress.ResidentialStatus",
        required: true,
        spacing: 5.5,
      },
      {
        type: "AutoComplete",
        label: "Country of Residency",
        visible: true,
        path: "ProposerDetails.PermanentAddress.Country",
        required: true,
        spacing: 5.5,
      },
    ],
    [
      {
        type: "AutoComplete",
        label: "Plan",
        visible: true,
        required: true,
        options: masters.Plans,
        path: `productDetails.${index}.Plan`,
        paths: [
          { path: `productDetails.${index}.PlanCode`, parameter: "planCode" },
          { path: `productDetails.${index}.planType`, parameter: "planCode" },
          { path: `productDetails.${index}.PlanNumber`, parameter: "planNumber" },
        ],
        customOnChange: onPlan,
      },
      {
        type: "Input",
        label: "Plan Code",
        visible: true,
        disabled: true,
        path: `productDetails.${index}.PlanCode`,
      },

      ...masters.DynamicControls.map((x) => ({
        ...x,
        options: masters[x.options?.replace("{index}", 0)],
      })),
      {
        label: "Preferred Mode",
        path: `productDetails.${index}.PreferredMode`,
        type: "AutoComplete",
        visible: true,
        required: true,
        options: masters.PreferredMode,
        customOnChange: onPreferredMode,
        spacing: 6,
      },
      {
        label: "Sum Assured",
        path: `productDetails.${index}.SumAssured`,
        type: "Input",
        visible: true,
        required: true,
        spacing: 6,
      },

      {
        label: "Under NACH?",
        path: `productDetails.${index}.Nach`,
        type: "AutoComplete",
        visible: true,
        required: true,
        options:
          dto.PreferredMode === "Monthly"
            ? masters.NachOptions.filter((x) => x.mValue !== "No")
            : masters.NachOptions,
        paths: [{ paths: "NachId", parameter: "mID" }],
      },
      {
        label: "Police Personnel",
        path: `productDetails.${index}.InsurableItem.0.RiskItems.0.PolicePersonnel`,
        type: "AutoComplete",
        visible: true,
        required: true,
        options: masters.PolicePersonnel,
        customOnChange: onPolicePersonnel,
        spacing: 6,
        // isMemberControl: true,
      },
      {
        label: "Accident Benefit Required?",
        path: `productDetails.${index}.InsurableItem.0.RiskItems.0.AccidentBenefit`,
        type: "AutoComplete",
        visible: true,
        required: true,
        options: masters.AccidentBenefit,
        paths: [
          {
            paths: `productDetails.${index}.InsurableItem.0.RiskItems.0.AccidentBenefitId`,
            parameter: "Code",
          },
        ],
        spacing: 6,
        // isMemberControl: true,
      },
    ],
    [
      { type: "Img", visible: true, src: nameImg, spacing: 1 },
      { type: "CardButton", label: "Accidental Benefit (AB)", visible: true, spacing: 3.6 },
      {
        type: "CardButton",
        label: "Accidental Death & Disability Benefit (ADDB)",
        visible: true,
        spacing: 3.6,
      },
      { type: "CardButton", label: "Neither", visible: true, spacing: 3.6 },
    ],
    [
      {
        type: "Custom",
        visible: true,
        spacing: 12,
        return: (
          <PremiumBreakup
            handleNext={handleNext}
            product={product}
            premiumDetails={premiumDetails}
            quoteDetails={quoteDetails}
            dto={dto}
            handleBack={handleBack}
          />
        ),
      },
    ],
  ];

  const Case1Controls = [];

  const Case2Controls = [];

  console.log("Case1Controls", Case1Controls);
  console.log("productDetailsContent", productDetailsContent);

  return (
    <MDBox sx={{ width: "100%" }}>
      <Grid container spacing={3}>
        {controls[step]
          .filter((x) => x.visible === true)
          .map((x) => (
            <Grid
              item
              xs={12}
              sx={12}
              md={x.spacing || 6}
              lg={x.spacing || 6}
              xl={x.spacing || 6}
              xxl={x.spacing || 6}
            >
              <NewRenderControl
                item={x}
                setDto={setPolicyDto}
                nextFlag={nextFlag}
                nextCount={nextCount}
                dto={dto}
                onMidNextValidation={false}
                midNextValidationId={-1}
              />
            </Grid>
          ))}
      </Grid>
    </MDBox>
  );
  /* eslint-disable */
  if (false)
    switch (step) {
      case 0:
        return (
          <MDBox sx={{ width: "100%" }}>
            <Grid container spacing={3}>
              {controls[step]
                .filter((x) => x.visible === true)
                .map((x) => (
                  <Grid
                    item
                    xs={12}
                    sx={12}
                    md={x.spacing || 6}
                    lg={x.spacing || 6}
                    xl={x.spacing || 6}
                    xxl={x.spacing || 6}
                  >
                    <NewRenderControl
                      item={x}
                      setDto={setPolicyDto}
                      nextFlag={nextFlag}
                      nextCount={nextCount}
                      dto={dto}
                      onMidNextValidation={false}
                      midNextValidationId={-1}
                    />
                  </Grid>
                ))}
            </Grid>
          </MDBox>
        );
      case 1:
        return (
          <MDBox sx={{ width: "100%" }}>
            <Grid container spacing={3}>
              {productDetailsContent
                .filter((x) => x.visible === true)
                .map((item) => (
                  <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
                    <NewRenderControl
                      item={item}
                      setDto={setPolicyDto}
                      nextFlag={false}
                      nextCount={0}
                      dto={dto}
                      onMidNextValidation={false}
                      midNextValidationId={-1}
                    />
                  </Grid>
                ))}
            </Grid>
          </MDBox>
        );
      case 2:
        return (
          <MDBox sx={{ width: "100%" }}>
            <Grid container spacing={5}>
              {Case2Controls.filter((x) => x.visible === true).map((x) => (
                <Grid
                  item
                  xs={12}
                  sx={12}
                  md={x.spacing || 6}
                  lg={x.spacing || 6}
                  xl={x.spacing || 6}
                  xxl={x.spacing || 6}
                >
                  <NewRenderControl
                    item={x}
                    setPolicyDto={setPolicyDto}
                    nextFlag={nextFlag}
                    nextCount={nextCount}
                    dto={dto}
                    onMidNextValidation={false}
                    midNextValidationId={-1}
                  />
                </Grid>
              ))}
            </Grid>
          </MDBox>
        );

      case 9:
        return (
          <MDBox sx={{ width: "100%" }}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
             
            </Grid> */}
              {(dto.productid === "47" || dto.productid === "49" || dto.productid === "50") && (
                <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={masters.PolicyTerm}
                    sx={{ ...autoStyle, ...redAsterisk }}
                    value={{ mValue: dto?.policyterm }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, a) => onPolicyTerm(e, a, "policyterm")}
                    renderInput={(params) => (
                      <MDInput {...params} label="Policy Term" required="true" />
                    )}
                  />
                </Grid>
              )}
              {(dto.productid === "47" || dto.productid === "49" || dto.productid === "50") && (
                <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={masters.BenefitOptions}
                    sx={{ ...autoStyle, ...redAsterisk }}
                    getOptionLabel={(option) => option.mValue}
                    value={{ mValue: dto?.benefitOptions }}
                    onChange={(e, a) => onBenefitOption(e, a, "benefitOptions")}
                    renderInput={(params) => (
                      <MDInput {...params} label="Benefit Options" required="true" />
                    )}
                  />
                </Grid>
              )}
              {(dto.productid === "47" || dto.productid === "49" || dto.productid === "50") && (
                <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={masters.PrefferedMode}
                    sx={{ ...autoStyle, ...redAsterisk }}
                    value={{ mValue: dto?.Mode }}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, a) => onPrefereMode(e, a, "paymentfrequency")}
                    renderInput={(params) => (
                      <MDInput {...params} label="Preffered Mode" required="true" />
                    )}
                  />
                </Grid>
              )}

              {dto.productid === "48" && (
                <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Premium"
                    name="premium"
                    value={dto?.premium}
                    type="number"
                    onChange={onPremium}
                    required="true"
                    sx={redAsterisk}
                  />
                </Grid>
              )}
              {(dto.productid === "47" || dto.productid === "49" || dto.productid === "50") && (
                <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Basic Sum Assured"
                    name="BasicSumAssured"
                    value={dto?.BasicSumAssured}
                    type="number"
                    onChange={onBSI}
                    required="true"
                    sx={redAsterisk}
                  />
                </Grid>
              )}
              {/* <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput label="Policy Paying Term" />
            </Grid>
            <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput label="Premium Waiver Required?" />
            </Grid>
            <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput label="Pay-out Mode" />
            </Grid>
            <Grid item xs={12} sx={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput label="Pay-out Term" />
            </Grid> */}
            </Grid>
            <MDBox sx={{ mt: "2rem" }}>
              <Grid container justifyContent="space-between">
                <MDButton variant="outlined" color="info">
                  Back
                </MDButton>
              </Grid>
            </MDBox>
          </MDBox>
        );
      case 6:
        return (
          <MDBox sx={{ width: "100%" }}>
            {dto.InsurableItem[0].RiskItems[0]?.Benefit?.map((x, i) => (
              <Grid container spacing={3} p={1}>
                <Grid item xs={6} sx={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label={`Rider ${i + 1}`} disabled={1} value={x.RiderName} />
                </Grid>
                <Grid item xs={6} sx={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Sum Assured"
                    // disabled={i === 0}
                    value={x.RiderSumAssured}
                    type="number"
                    onChange={(e) => onRiderSumAssure(e, i)}
                  />
                </Grid>
              </Grid>
            ))}
            <MDBox sx={{ mt: "2rem" }}>
              <Grid container justifyContent="space-between">
                <MDButton variant="outlined" color="info">
                  Back
                </MDButton>
                <MDButton variant="contained" color="info" onClick={onCalculate}>
                  Calculate Premium
                </MDButton>
              </Grid>
            </MDBox>
          </MDBox>
        );
      case 3:
        return (
          <PremiumBreakup
            // handleNext={handleNext}
            product={product}
            premiumDetails={premiumDetails}
            quoteDetails={quoteDetails}
            dto={dto}
            // handleBack={handleBack}
          />
        );

      default:
        return "Unknown step";
    }

  /* eslint-enable */
}

function CustomerQuote() {
  const [activeStep, setActiveStep] = useState(0);
  const productIndex = 0;
  const [control] = useDataController();
  const { lifeDetails } = control;
  const navigate = useNavigate();
  const matches = useMediaQuery("(min-width:600px)");
  const ProductId = lifeDetails?.plan?.mID;
  const [policyDto, setPolicyDto] = useState(PolicyJson());
  const BreadcrumbsPath = `Home.${policyDto.Product}`;
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [masters, setMaster] = useState({
    Plans: [],
    PreferredMode: [],
    Gender: [],
    MaritalStatus: [],
    Currency: [],
    Salutation: [],
    PolicyTerm: [],
    BenefitOption: [
      { mID: 0, mValue: "Level" },
      { mID: 1, mValue: "Increasing" },
    ],
    PolicePersonnel: [
      { mID: 1, mValue: "No" },
      { mID: 2, mValue: "Yes" },
    ],
    DynamicControls: [],
    Frequency: { Yearly: 1, "Half-Yearly": 2, Quarterly: 4, Monthly: 12, Single: 0 },
  });
  // const [product, setProduct] = useState("");
  const [premiumDetails, setPremiumDetails] = useState({});
  const [quoteDetails, setQuoteDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const { rowStyle, centerRowStyle } = styles;
  const location = useLocation();
  const [nextFlag, setNextFlag] = useState(false);
  const [nextCount, setNextCount] = useState(false);

  const stepDetails = [
    {
      topLabel: "Let's get started",
      pageDescription:
        "In a few steps, we'll yet to know you, ang offer you a no-obligation indicative quote. To proceed, please provide us your details.",
      proceedButtonLabel: "Proceed",
    },
    {
      topLabel: `Hi, ${policyDto.ProposerDetails.FirstName} ${policyDto.ProposerDetails.LastName}`,
      pageDescription: "How much life insurance cover are you looking for?",
      proceedButtonLabel: "Proceed",
    },
    {
      topLabel: "One last step",
      pageDescription:
        "Choose Rider Benefits which offer extra coverage which can be helpful in times of financial crises ",
      proceedButtonLabel: "Calculate Premium",
    },
    {
      topLabel: "",
      pageDescription: "",
      proceedButtonLabel: "Proceed",
    },
  ];

  const handleNext = () => {
    let lNextFlag = false;
    setNextFlag(false);
    setNextCount(nextCount + 1);
    switch (activeStep) {
      case 0:
        policyDto.productDetails[productIndex].InsurableItem[0].RiskItems[0].FirstName =
          policyDto.ProposerDetails.FirstName;
        policyDto.productDetails[productIndex].InsurableItem[0].RiskItems[0].LastName =
          policyDto.ProposerDetails.LastName;
        policyDto.productDetails[productIndex].InsurableItem[0].RiskItems[0].Gender =
          policyDto.ProposerDetails.Gender;
        policyDto.productDetails[productIndex].InsurableItem[0].RiskItems[0].Age =
          policyDto.ProposerDetails.Age;
        policyDto.productDetails[productIndex].InsurableItem[0].RiskItems[0].DOB =
          DateFormatFromStringDate(policyDto.ProposerDetails.DOB, "m-d-y", "y-m-d");
        setPolicyDto({ ...policyDto });
        lNextFlag = true;
        break;
      case 1:
        lNextFlag = true;
        break;
      case 2:
        lNextFlag = true;
        break;
      case 3:
        lNextFlag = true;
        break;
      default:
        lNextFlag = true;
    }

    if (lNextFlag) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    if (!lifeDetails?.plan?.mID) {
      navigate("/Customerlifelanding");
    }
  }, []);

  const getTypewiseContent = (json, variables, functions) => {
    switch (json.type) {
      case "PlanMasters":
        json.functionCalls.forEach((x) => convertToTemplate(x, variables, functions));
        return null;

      default:
        break;
    }
    return false;
  };
  const callApi = async (method, url, requestObj, additionalDetails) => {
    console.log("call Api hit data", method, url, requestObj, additionalDetails);
    setLoader(true);
    const response = await genericApi(method, url, requestObj);
    setLoader(false);
    const { sourceParameter, path, accessPath } = additionalDetails || {
      sourceParameter: "Masters",
      path: "Unassigned",
      accessPath: null,
    };
    console.log("callApi response", response);
    const outputObject = !checkForValue(accessPath) ? get(response, accessPath) : response;
    switch (sourceParameter) {
      case "Masters":
        masters[path] = Array.isArray(outputObject) ? outputObject : [];

        return true;
      default:
        return false;
    }
  };
  const setMultipleValues = (assignValuesList, variables, functions) => {
    let newDto = { ...policyDto };
    console.log("setMultipleValues");
    if (Array.isArray(assignValuesList)) {
      assignValuesList.forEach((x) => {
        if (x.targetObject === "Masters")
          masters[convertToTemplate(x.path ? x.path : "", variables, functions)] =
            convertToTemplate(x.value ? x.value : "", variables, functions);
        else
          newDto = {
            ...set(
              newDto,
              convertToTemplate(x.path ? x.path : "", variables, functions),
              convertToTemplate(x.value ? x.value : "", variables, functions)
            ),
          };
      });
    }
    setPolicyDto({ ...newDto });
    // setMaster({ ...newMasters });
  };

  useEffect(async () => {
    console.log(location, 121);
    // setLoader(true);
    const res1 = await GetMasters();
    res1.forEach((x) => {
      if (x.mType === "Type") masters.contactType = x.mdata;
      if (x.mType === "Salutation") masters.Salutation = x.mdata;
      if (x.mType === "Gender") masters.Gender = x.mdata;
      if (x.mType === "MaritalStatus") masters.MaritalStatus = x.mdata;
      if (x.mType === "Currency") masters.Currency = x.mdata;
    });
    const res2 = await GetProdPartnerMasterData("Plan", { parentID: ProductId });
    const res3 = await GetProdPartnerMasterData("PreferredMode", { ProductId });
    const res4 = await GetProdPartnerMasterData("ProductDetails", {
      parentID: ProductId,
    });
    const res5 = await GetProdPartnerMasterData("BenefitOptions", { parentID: "0" });
    const res6 = await GetProdPartnerMasterData("NachOptions", { parentID: "0" });
    const res7 = await GetProdPartnerMasterData("PremiumWaiverOptions", { parentID: "0" });
    const res8 = await GetProdPartnerMasterData("PremiumPayingTerm", { ProductId });
    const res9 = await GetProdPartnerMasterData("PremiumType", { ProductId });

    masters.Plans = res2;
    masters["PreferredMode-0"] = res3;
    masters["BenefitOption-0"] = res5;
    masters.Nach = res6;
    masters["PremiumWaiverOptions-0"] = res7;
    masters["PremiumPayingTerm-0"] = res8;
    masters["PremiumType-0"] = res9;

    const arr1 = res4?.[0]?.AdditionDetailsJson?.productControls || [];
    res4[0].ProductId = ProductId;

    arr1
      .filter((x) => x.type === "PlanMasters")
      .forEach((y) =>
        configurationConvertor(
          y,
          {
            visible: true,
            index: productIndex,
            elem: res4[0],
            dto: policyDto,
            setDto: setPolicyDto,
          },
          {
            productMasters: () => {},
            assignValueId: () => {},
            checkForValue,
            set,
            getAutocompleteValue: () => {},
            getFrequency,
            get,
            getMaster: () => {},
            setMultipleValues,
            callApi,
            genericValidator: () => {},
          },
          0,
          getTypewiseContent
        )
      );

    const arr2 = [];
    arr1.forEach(async (x) => {
      if (x.type === "PlanMasters") {
        x.functionCalls.forEach(async () => {});
      } else {
        arr2.push({
          ...x,
          path: x.path?.slice(23),
          paths:
            x.type === "AutoComplete"
              ? [{ path: `${x.path?.slice(23)}Id`, parameter: "Code" }]
              : [],
          disabled: x.disabled === true,
          spacing: 6,
          visible: x.visible === true,
        });
      }
    });
    masters.DynamicControls = arr2;
    // setLoader(false);

    setMaster({ ...masters });

    ProductDetailsJson.DateOfCommencement = DateFormatFromDateObject(new Date(), "y-m-d");
    ProductDetailsJson.ProductCode = lifeDetails.plan?.productCode;
    ProductDetailsJson.Product = lifeDetails.plan?.mValue;
    ProductDetailsJson.dynamicContent = arr1;
    policyDto.productDetails = [ProductDetailsJson];
    setPolicyDto({ ...policyDto });
  }, []);

  useEffect(() => {
    if (activeStep > 5) navigate("/customerproposal");
  }, [activeStep]);

  const spacing = activeStep < 3 ? 7.5 : 12;

  return (
    <PageLayout background="white">
      <MDLoader loader={loader} />
      <Drawer
        sx={{
          width: "50vw",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "50vw",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={DrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MDBox sx={{ display: "flex" }}>
          <ReactJson src={policyDto} collapsed={1} style={{ fontSize: 15 }} />
          <ReactJson src={masters} collapsed={1} style={{ fontSize: 15 }} />
        </MDBox>
      </Drawer>
      <BPNavbar />{" "}
      <MDBox
        sx={{ background: `linear-gradient(to right,#121858, #1a237e,#474f97)`, mt: "3.875rem" }}
      >
        <MDBox sx={{ width: "100%", px: matches ? "5rem" : "1.5rem", pb: "2rem" }}>
          <Grid container spacing={4} p={2}>
            {activeStep < 3 && (
              <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
                <Card p={2}>
                  <MDBox component="img" src={planCard} sx={{ width: "100%", heigh: "100%" }} />
                </Card>
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={spacing} lg={spacing} xl={spacing} xxl={spacing}>
              <Card>
                <MDBox
                  sx={{
                    // mx: "1rem",
                    // pl: matches ? "2rem" : 0,
                    // pt: "1rem",
                    p: "2rem",
                  }}
                >
                  {activeStep < 3 && (
                    <Stack direction="row" justifyContent="space-between" spacing={2}>
                      <MDTypography variant="h6" sx={{ fontSize: "1.3rem", color: "#000000" }}>
                        {stepDetails[activeStep]?.topLabel}
                      </MDTypography>
                      <MDButton endIcon={<Icon>help</Icon>}>Required Docs</MDButton>
                    </Stack>
                  )}
                  {activeStep < 4 && (
                    <MDTypography mt={2} mb={2} sx={{ fontSize: "1rem", color: "#000000" }}>
                      {stepDetails[activeStep]?.pageDescription}
                    </MDTypography>
                  )}

                  <GetStepContent
                    step={activeStep}
                    index={productIndex}
                    handleNext={handleNext}
                    handleBack={handleBack}
                    policyDto={policyDto}
                    setPolicyDto={setPolicyDto}
                    product={policyDto.Product}
                    masters={masters}
                    setMaster={setMaster}
                    premiumDetails={premiumDetails}
                    setPremiumDetails={setPremiumDetails}
                    quoteDetails={quoteDetails}
                    setQuoteDetails={setQuoteDetails}
                    setLoader={setLoader}
                    nextFlag={nextFlag}
                    nextCount={nextCount}
                  />
                  <Stack direction="row" justifyContent="space-between" pt={1}>
                    {activeStep !== 0 && (
                      <MDButton variant="outlined" onClick={handleBack}>
                        Back
                      </MDButton>
                    )}
                    {activeStep === 0 && (
                      <MDTypography sx={{ fontSize: "0.8rem" }}>
                        By clicking on Proceed,
                        <br />
                        you are agreeing to our <a href="https://licindia.in/">
                          Privacy policy
                        </a>, <a href="https://licindia.in/">Terms of Use</a> &{" "}
                        <a href="https://licindia.in/">Disclaimer</a>
                      </MDTypography>
                    )}
                    <MDBox />
                    <Stack direction="row" columnGap={2}>
                      {/* <MDButton variant="outlined">Reset</MDButton> */}
                      <MDButton
                        onClick={handleNext}
                        // sx={{ background: "#fbc707", color: "#000000" }}
                      >
                        {stepDetails[activeStep]?.proceedButtonLabel}
                      </MDButton>
                    </Stack>
                  </Stack>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
          <MDTypography sx={{ color: "#ffffff", textAlign: "center", fontSize: "1rem" }}>
            LIC&apos;s BIMA JYOTI is a Non-linked, Non-participating, Individual, Limited Premium
            Payment, Life Insurance Savings Plan. Under this plan, Guaranteed Additions shall accrue
            at the rate of Rs.50 per thousand Basic Sum Assured at the end of each policy year
            throughout the policy term
          </MDTypography>
          <MDTypography sx={{ color: "#ffffff", textAlign: "center", fontSize: "1rem", mt: 3 }}>
            Copyright © 2023 - All Rights Reserved - Official website of Life Insurance Corporation
            of India.
          </MDTypography>
        </MDBox>
        {process.env.NODE_ENV === "development" && (
          <MDButton variant="text" onClick={() => setDrawerOpen(true)}>
            Policy Dto
          </MDButton>
        )}
      </MDBox>
      {false && (
        <MDBox sx={{ ...rowStyle, pl: "1rem", pt: "1rem", pb: "2rem" }}>
          <Breadcrumbs
            fontSize="small"
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {BreadcrumbsPath.split(".").map((elem) => (
              <MDBox sx={centerRowStyle}>
                <MDTypography
                  sx={{
                    ...centerRowStyle,
                    p: 0,
                    m: 0,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => elem === "Home" && navigate("/customerlifelanding")}
                >
                  {elem}
                </MDTypography>
              </MDBox>
            ))}
          </Breadcrumbs>
        </MDBox>
      )}
    </PageLayout>
  );
}

export default CustomerQuote;
