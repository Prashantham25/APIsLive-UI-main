const searchProductPayload = {
  productId: 0,
  lobid: "",
  cobid: "",
  productStatusId: null,
  productName: "",
  productCode: "",
  activeFrom: null,
  activeTo: null,
  premiumAmount: 0,
  createdBy: null,
  createdDate: null,
  modifyBy: null,
  modifyDate: null,
  partnerId: "0",
  includeFields: ["ProductId", "ProductCode", "ProductStatusId"],
};
const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

const modelStyle = {
  position: "absolute",
  top: "2%",
  left: "2%",
  bottom: "2%",
  right: "2%",
  // transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "95%",
  overflowX: "auto",
};

const payloadObj = {
  productId: 0,
  productCode: "",
  endorsementList: [
    {
      endorsementConfigId: 0,
      endorsementConfigName: "",
      endorsementType: 0,
      ratingApi: null,
      filterCriteria: null,
      riskParametersUnit: [{ parameterName: "", displayName: "", path: "", mode: "" }],
    },
    {
      endorsementConfigId: 0,
      endorsementConfigName: "",
      endorsementType: 0,
      ratingApi: null,
      filterCriteria: null,
      riskParametersUnit: [{ parameterName: "", displayName: "", path: "", mode: "" }],
    },
  ],
};

export { searchProductPayload, autoStyle, modelStyle, payloadObj };
