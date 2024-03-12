import { createContext, useContext, useMemo, useReducer } from "react";

import PropTypes from "prop-types";

const Data = createContext(null);

// React reducer
function reducer(state, action) {
  switch (action.type) {
    case "PRODUCT_JSON": {
      return { ...state, ProductJson: action.value };
    }

    default: {
      return state;
    }
  }
}

// React context provider
function DataControllerProvider({ children }) {
  const initialState = {
    
    ProductJson: {
      MapId: 0,
      productId: 0,
      productTypeId: 502,
      lobid: 2,
      rateingId: 0,
      isSingleCover: true,
      isMasterPolicy: false,
      isCoverEvent: true,
      productName: "GroupTest",
      productCode: "GroupTest4",
      activeFrom: "2022-05-31",
      activeTo: "2026-07-12",
      premiumAmount: "",
      createdBy: 0,
      createdDate: "",
      modifyBy: 0,
      modifyDate: "",
      cobid: 5,
      coverId: "",
      benefitCriteriaId: "",
      benefitAmount: "",
      coverEventId: "",
      productStatusId: 38,
      currencyId: "",
      templateKey: "InsuranceCertificate",
      templateKeyId: 126,
      policyTypeId: 176,
      policyType: "Group",
      productChannels: [
        {
          channelTypeId: 40,
          effectiveFrom: "2022-05-31",
          effectiveTo: "2022-06-08",
          brokage: "10",
        },
      ],
      productClausesWarrentiesExclusions: [],
      productInsurableItems: [],
      productRcbdetails: [],
      riskDetails: [],
      claimDetails: [],
      tblmasClausesWarrentiesExclusions: [],
      productPremium: [],
      insurableRcbdetails: [
        {
          inputType: "Person",
          isReqired: true,
          inputId: 186,
          levelId: 55,
          productId: 0,
          coverRcbdetails: [
            {
              inputType: "Emergency In-patient medical treatment",
              isReqired: true,
              inputId: 3140,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
              mID: 3140,
              mValue: "Emergency In-patient medical treatment",
            },
            {
              inputType: "Hospital Daily Cash",
              isReqired: true,
              inputId: 3141,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
            {
              inputType: "Compassionate Visit",
              isReqired: true,
              inputId: 1202,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
            {
              inputType: "Dental Treatment",
              isReqired: true,
              inputId: 3142,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
            {
              inputType: "Personal Accident",
              isReqired: true,
              inputId: 2063,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
            {
              inputType: "Accidental Death and Disability (Common Carrier)",
              isReqired: true,
              inputId: 3143,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
          ],
          insurableChildRcbdetails: [],
          mID: 186,
          mValue: "Person",
        },
        {
          inputType: "Baggage",
          isReqired: true,
          inputId: 188,
          levelId: 55,
          productId: 0,
          coverRcbdetails: [
            {
              inputType: "Loss of Checked-in Baggage",
              isReqired: true,
              inputId: 3144,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
            {
              inputType: "Delay of Checked-in Baggage",
              isReqired: true,
              inputId: 3145,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
              mID: 3145,
              mValue: "Delay of Checked-in Baggage",
            },
          ],
          insurableChildRcbdetails: [],
          mID: 188,
          mValue: "Baggage",
        },
        {
          inputType: "Travel Risk",
          isReqired: true,
          inputId: 1062,
          levelId: 55,
          productId: 0,
          coverRcbdetails: [
            {
              inputType: "Trip Cancellation",
              isReqired: true,
              inputId: 3146,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
            {
              inputType: "Trip Delay ",
              isReqired: true,
              inputId: 1208,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
            {
              inputType: "Loss of Passport",
              isReqired: true,
              inputId: 3147,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
              mID: 3147,
              mValue: "Loss of Passport",
            },
            {
              inputType: "Personal Liability",
              isReqired: true,
              inputId: 3148,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
            {
              inputType: "Hijack Daily Allowance",
              isReqired: true,
              inputId: 3149,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
            {
              inputType: "Missed Connection",
              isReqired: true,
              inputId: 1212,
              levelId: 55,
              insurableRcbdetailsId: 0,
              coverChildRcbdetails: [],
            },
          ],
          insurableChildRcbdetails: [],
          mID: 1062,
          mValue: "Travel Risk",
        },
      ],
      productSwitchOnProperty: [],
      CalculateConfig: [],
      ProductBasicConfigurationDetails: [],
      "ProductBasicConfiguration ": [],
      MapperDTO: [],
      productLifeCycleDTO: [],
      productMapperDTO: [],
      productMasterApiDTO: [],
      SectionDetails: [],
      RiskMappingDTO: [],
      FeaturesDTO: [
        {
          feature: "sbsj",
          parentFeatureId: null,
          answerType: "Text",
          defaultAnswer: "hdh",
          sortOrder: null,
          answerTypeId: 81,
          defaultAnswerId: "",
        },
      ],
      insurableCategoryId: 1059,
      insurableItemTypeId: 1062,
    },
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <Data.Provider value={value}>{children}</Data.Provider>;
}

// React custom hook for using context
function useDataController() {
  const context = useContext(Data);

  if (!context) {
    throw new Error("useDataController should be used inside the dataController.");
  }
  return context;
}

// Typechecking props for the MaterialUIControllerProvider
DataControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions

const setProductJson = (dispatch, value) => dispatch({ type: "PRODUCT_JSON", value });

export { DataControllerProvider, useDataController, setProductJson };
