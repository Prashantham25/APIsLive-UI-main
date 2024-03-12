import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useLocation
// import objectPath from "object-path";
// import swal from "sweetalert";
import { Autocomplete, Breadcrumbs, Paper, useMediaQuery } from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import Health from "assets/images/BrokerPortal/Health/Health.png";
import planCard from "assets/images/Life/LICProducts/Bima Jyoti Card.png";

// import swal from "sweetalert";

import StepperWithCountLabel from "../StepperWithCountLabel";
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
  ExecuteProcedure,
  GetMasterLocation,
} from "../../NewBusiness/data";
import MDLoader from "../../../../../../../components/MDLoader";
import quotePolicyJson from "../../NewBusiness/Quotation/Json/LifeQuotationJson";
import { useDataController } from "../../../../../../BrokerPortal/context";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import { AgeCalculator, DateFormatFromDateObject } from "../../../../../../../Common/Validations";
import CustomCurrencyInput from "../../../../../../../components/CustomCurrencyInput";

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
  handleNext,
  handleBack,
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
}) {
  console.log("policyDto", policyDto);
  console.log("masters", masters);

  const dto = { ...policyDto };
  // const onGender = (e, v) => {
  //   if (dto.productid === "50") {
  //     if (v.mValue === "Male") dto.Member[0].gender = "M";
  //     else if (v.mValue === "Female") dto.Member[0].gender = "F";
  //     else dto.Member[0].gender = "T";
  //   } else dto.Member[0].gender = v.mValue;
  //   setPolicyDto({ ...dto });
  // };

  // const onDOB = (e, v) => {
  //   const Year = v.split("-")[2];
  //   const Age = new Date().getFullYear() - parseInt(Year, 10);
  //   dto.Member[0].dob = v;
  //   dto.Member[0].age = Age;
  //   setPolicyDto({ ...dto });
  // };

  // const onPlan = async (e, v) => {
  //   dto.planid = v.mID;
  //   dto.planName = v.mValue;
  //   setPolicyDto({ ...dto });
  //   const res = await GetProductMasterAVO("Policy Term", v.mID);
  //   setMaster({ ...masters, PolicyTerm: [...res] });
  // };

  const onPolicyTerm = (e, v, name) => {
    dto[name] = v.mValue;
    dto.policypayingterm = v.mValue;
    setPolicyDto({ ...dto });
  };

  const onBenefitOption = (e, v) => {
    dto.benefitOptions = v.mValue;
    setPolicyDto({ ...dto });
  };

  const onPrefereMode = (e, v, name) => {
    dto[name] = { Annual: 1, "Half Yearly": 2, Quarterly: 4, Monthly: 12 }[v.mValue];
    dto.Mode = v.mValue;
    setPolicyDto({ ...dto });
  };

  const onBSI = (e) => {
    dto[e.target.name] = e.target.value;
    dto.sumAssuredOption = e.target.value;
    setPolicyDto({ ...dto });
  };
  const onPremium = (e) => {
    dto[e.target.name] = e.target.value;
    setPolicyDto({ ...dto });
  };

  // const mandatoryText = "Fill all required fields";

  // const onNext1 = () => {
  //   // if (dto.Member[0].gender === "" || dto.Member[0].dob === "") {
  //   // swal({ icon: "error", text: "Fill all required fields" });
  //   // } else
  //   handleNext();
  // };

  const onNext2 = async () => {
    // if (
    //   ((dto.productid === "47" || dto.productid === "49" || dto.productid === "50") &&
    //     (dto.planid === "" ||
    //       dto.policypayingterm === "" ||
    //       dto.benefitOptions === "" ||
    //       dto.paymentfrequency === "" ||
    //       dto.BasicSumAssured === "")) ||
    //   (dto.productid === "48" && (dto.planid === "" || dto.premium === ""))
    // ) {
    //   swal({ icon: "error", text: mandatoryText });
    // } else {
    const res = await ExecuteProcedure("pc.usp_GetLifeBenefits", {
      InsurableItem: dto.InsurableItem,
      filterCriteria: dto.filterCriteria,
      planType: dto.PlanCode,
      productCode: dto.ProductCode,
    });
    // setMaster({ ...masters, Riders: [...res] });
    dto.InsurableItem[0].RiskItems[0].Benefit =
      res?.finalResult?.InsurableItem?.[0].RiskItems?.[0]?.Benefit;
    // const arr = [];
    // res.forEach((x, i) => {
    //   arr.push({
    //     memberid: 1,
    //     memberTitle: i === 0 ? "Main Life" : "",
    //     riderid: x.benefitID,
    //     sumassured: i === 0 ? dto.BasicSumAssured : "",
    //     RiderName: x.benifitName,
    //     IsSelected: i === 0 ? "Yes" : "No",
    //   });
    // });
    // dto.Member[0].Rider = arr;
    setPolicyDto({ ...dto });
    handleNext();
    // }
  };

  const onRiderSumAssure = (e, i) => {
    // setLoader(true);
    // if (e.target.value.length > 0 && e.target.value[0] !== "0")
    dto.InsurableItem[0].RiskItems[0].Benefit[i].RiderSumAssured = e.target.value;
    // dto.Member[0].Rider[i].
    if (e.target.value.trim() === "" || e.target.value === "0")
      dto.InsurableItem[0].RiskItems[0].Benefit[i].IsSelected = "No";
    else dto.InsurableItem[0].RiskItems[0].Benefit[i].IsSelected = "Yes";

    setPolicyDto({ ...dto });
    // setLoader(false);
  };

  const onCalculate = async () => {
    setLoader(true);
    const res1 = await Quotations(dto);
    dto.PremiumDetails = res1.finalResult.PremiumDetails;
    const res5 = await SaveQuotation({
      ProductCode: dto.ProductCode,
      QuotationDetails: {
        ProposerDetails: {
          ...dto.InsurableItem[0].RiskItems[0],
        },
        ...dto,
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
        dto.opportunityId = result.finalResult;
        setPolicyDto({ ...dto });
      });
    }
    setPolicyDto({ ...dto });
    setLoader(false);
    handleNext();

    if (false) {
      const dto1 = quotePolicyJson();
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
          // setDto((prevState) => ({
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
    dto.Plan = a.mValue;
    dto.PlanCode = a.planCode;
    dto.planType = a.planCode;
    setPolicyDto({ ...dto });
    setMaster({ ...masters, PolicyTerm: res });
  };

  const onPolicePersonnel = async (e, b) => {
    const a = b || { mValue: "" };
    const res = await GetProdPartnerMasterData("AccidentBenefit", {
      PolicePersonnel: a.mValue === "Yes",
      AccidentBenefitType: "AB/ADDB",
    });
    dto.InsurableItem[0].RiskItems[0].PolicePersonnel = a.mValue;

    setPolicyDto({ ...dto });
    setMaster((prevState) => ({
      ...prevState,
      AccidentBenefit: res[0] ? res : [],
    }));
  };

  const onPreferredMode = (e, a) => {
    dto.PreferredMode = a.mValue;
    dto.PreferredModeId = a.Code;
    dto.frequency = masters.Frequency[a.mValue];
    // const ppt = { 16: 10, 21: 15, 25: 26 };
    dto.PremiumPayingTerm = dto.PolicyTerm - 5; // ppt[dto.PolicyTerm];
    setPolicyDto({ ...dto });
  };

  const onDOB = (e, a) => {
    dto.InsurableItem[0].RiskItems[0].DOB = a;
    dto.InsurableItem[0].RiskItems[0].Age = AgeCalculator(new Date(a));
    setPolicyDto({ ...dto });
  };

  const onAccidentBenefit = (e, a) => {
    dto.InsurableItem[0].RiskItems[0].AccidentBenefitId = a.Code;
    dto.InsurableItem[0].RiskItems[0].AccidentBenefit = a.mValue;
    if (a.mValue === "AB REQUIRED" || a.mValue === "ADDB REQUIRED")
      dto.filterCriteria[0].AccidentBenefit = "Y";
    else dto.filterCriteria[0].AccidentBenefit = "N";
    setPolicyDto({ ...dto });
  };

  const leadControls = [
    {
      type: "Input",
      label: "Name",
      visible: true,
      required: true,
      path: "InsurableItem.0.RiskItems.0.Name",
    },
    {
      type: "MDDatePicker",
      label: "DOB",
      visible: true,
      path: "InsurableItem.0.RiskItems.0.DOB",
      dateFormat: "Y-m-d",
      customOnChange: onDOB,
    },
    {
      type: "AutoComplete",
      label: "Gender",
      visible: true,
      path: "InsurableItem.0.RiskItems.0.Gender",
      options: masters.Gender,
    },
    {
      type: "Input",
      label: "Email ID",
      visible: true,
      path: "InsurableItem.0.RiskItems.0.EmailId",
      endAdornmentIcon: "mail",
    },
    {
      type: "Input",
      label: "Contact No",
      visible: true,
      path: "InsurableItem.0.RiskItems.0.ContactNo",
      endAdornmentIcon: "smartphone",
    },
    {
      label: "Resident Status",
      path: "InsurableItem.0.RiskItems.0.ResidentStatus",
      visible: true,
      type: "AutoComplete",
      options: masters.ResidentStatus,
    },
    {
      label: "Country of Residence",
      path: "InsurableItem.0.RiskItems.0.country",
      visible:
        dto.InsurableItem[0].RiskItems[0].ResidentStatus !== "Resident Indian" &&
        dto.InsurableItem[0].RiskItems[0].ResidentStatus !== "",
      type: "AutoComplete",
      options: masters.country,
    },
  ];

  const Case0Controls = [
    {
      type: "AutoComplete",
      label: "Plan",
      visible: true,
      required: true,
      options: masters.Plans,
      path: "Plan",
      paths: [
        { path: "PlanCode", parameter: "planCode" },
        { path: "planType", parameter: "planCode" },
      ],
      customOnChange: onPlan,
    },
    { type: "Input", label: "Plan Code", visible: false, disabled: true, path: "PlanCode" },

    ...masters.DynamicControls.map((x) => ({
      ...x,
      options: masters[x.options?.split("-")[0]],
    })),
    {
      label: "Preferred Mode",
      path: `PreferredMode`,
      type: "AutoComplete",
      visible: true,
      required: true,
      options: masters.PreferredMode,
      customOnChange: onPreferredMode,
      spacing: 6,
    },

    {
      label: "Sum Assured",
      path: `SumAssured`,
      type: "CurrencyInput",
      visible: true,
      required: true,
      spacing: 6,
    },

    {
      label: "Under NACH?",
      path: `Nach`,
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
      path: `InsurableItem.0.RiskItems.0.PolicePersonnel`,
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
      path: `InsurableItem.0.RiskItems.0.AccidentBenefit`,
      type: "AutoComplete",
      visible: true,
      required: true,
      options: masters.AccidentBenefit,
      paths: [{ paths: "InsurableItem.0.RiskItems.0.AccidentBenefitId", parameter: "Code" }],
      spacing: 6,
      customOnChange: onAccidentBenefit,

      // isMemberControl: true,
    },
  ];

  switch (step) {
    case 0:
      return (
        <MDBox sx={{ width: "100%" }}>
          <Grid container spacing={5}>
            {leadControls
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
          <MDBox sx={{ mt: "2rem", display: "flex", justifyContent: "right" }}>
            <MDButton onClick={handleNext} variant="contained" color="info">
              Proceed
            </MDButton>
          </MDBox>
        </MDBox>
      );
    case 1:
      return (
        <MDBox sx={{ width: "100%" }}>
          <Grid container spacing={3}>
            {Case0Controls.filter((x) => x.visible === true).map((item) => (
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
          <MDBox sx={{ mt: "2rem", display: "flex", justifyContent: "space-between" }}>
            <MDButton onClick={handleBack} variant="outlined" color="info">
              Back
            </MDButton>
            <MDButton onClick={onNext2} variant="contained" color="info">
              Proceed
            </MDButton>
          </MDBox>
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
              <MDButton onClick={handleBack} variant="outlined" color="info">
                Back
              </MDButton>
              <MDButton onClick={onNext2} variant="contained" color="info">
                Proceed
              </MDButton>
            </Grid>
          </MDBox>
        </MDBox>
      );
    case 2:
      return (
        <MDBox sx={{ width: "100%" }}>
          {dto.InsurableItem[0].RiskItems[0]?.Benefit?.map((x, i) => (
            <Grid container spacing={3} p={1}>
              <Grid item xs={6} sx={6} md={6} lg={6} xl={6} xxl={6}>
                <MDInput label={`Rider ${i + 1}`} disabled={1} value={x.RiderName} />
              </Grid>
              <Grid item xs={6} sx={6} md={6} lg={6} xl={6} xxl={6}>
                <CustomCurrencyInput
                  label="Sum Assured"
                  // disabled={i === 0}
                  value={x.RiderSumAssured}
                  // type="number"
                  onChange={(e) => onRiderSumAssure(e, i)}
                  setErrorFlag={() => console.log()}
                  setErrorText={() => console.log()}
                />
              </Grid>
            </Grid>
          ))}
          <MDBox sx={{ mt: "2rem" }}>
            <Grid container justifyContent="space-between" alignSelf="end">
              <MDButton onClick={handleBack} variant="outlined" color="info">
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
          handleNext={handleNext}
          product={product}
          premiumDetails={premiumDetails}
          quoteDetails={quoteDetails}
          dto={dto}
          handleBack={handleBack}
        />
      );

    default:
      return "Unknown step";
  }
}

function CustomerQuote() {
  const [activeStep, setActiveStep] = useState(0);
  const [control] = useDataController();
  const { lifeDetails } = control;
  const navigate = useNavigate();

  const matches = useMediaQuery("(min-width:600px)");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const [policyDto, setPolicyDto] = useState({
  //   ProductCode: localStorage.getItem("LifeProductCode"),
  //   productid: localStorage.getItem("LifeProductId"),
  //   planid: "",
  //   planName: "",
  //   paymentfrequency: "",
  //   additionalmortalityper: "0",
  //   additionalmortality_per_mille: "0",
  //   BasicSumAssured: "",
  //   benefitOptions: "",
  //   premium: "",
  //   policyterm: "",
  //   policypayingterm: "",
  //   wopavailability: "1",
  //   sumassuredlevel: "15",
  //   noofchildren: null,
  //   HIRDeductible: "0",
  //   HIRFamilyFloater: "1",
  //   ApplyOccupationLoading: "1",
  //   Mode: "",
  //   sumAssuredOption: "",
  //   Member: [
  //     {
  //       memberid: 1,
  //       memberTitle: "Main Life",
  //       relation: 1,
  //       age: 24,
  //       occupationid: "4",
  //       gender: "",
  //       dob: "",
  //       Rider: [],
  //     },
  //   ],
  // });

  useEffect(() => {
    if (!lifeDetails?.plan?.mID) {
      navigate("/Customerlifelanding");
    }
  }, []);

  const ProductId = lifeDetails?.plan?.mID;
  // const [policyDto, setPolicyDto] = useState({
  //   // frequency: 1,

  //   Plan: "",
  //   PreferredMode: "",
  //   PolicyTerm: "",
  //   PremiumPayingTerm: "",
  //   PolicePersonnel: "",
  //   Product: lifeDetails.plan?.mValue,
  //   ProductCode: lifeDetails.plan?.productCode,
  //   productCode: lifeDetails.plan?.productCode,
  //   ProductId: lifeDetails.plan?.mID,
  //   PlanCode: "",
  //   SumAssured: "",
  //   totalLifeBenefit: "",
  //   PaymentFrequency: "",
  //   DrawDownPeriod: "",
  //   relation: [
  //     {
  //       mID: 1,
  //       mValue: "Self",
  //     },
  //   ],
  //   spouseDetails: {},
  //   childrenDetails: [],
  //   DateOfCommencement: DateFormatFromDateObject(new Date(), "y-m-d"),
  //   InsurableItem: [
  //     {
  //       Covers: [],
  //       InsurableName: "Person",

  //       RiskItems: [
  //         {
  //           Name: "",
  //           DOB: "",
  //           Gender: "",
  //           Relation: "Self",
  //           RelationId: 1,
  //           Age: 22,
  //           PassportNo: "",
  //           PreExistingDisease: "",
  //           SumAssured: "",
  //           RiderDetails: [],
  //           PolicePersonnel: "",
  //           AccidentBenefit: "",
  //           AccidentBenefitId: "N",
  //           Benefit: [],
  //         },
  //       ],
  //     },
  //   ],
  //   PremiumDetails: {},
  //   PolicyType: "ORD",
  //   PlanNumber: "860",
  //   PlanId: "94",
  //   PreferredModeId: "12",
  //   frequency: "",
  //   Nach: "",
  //   NachId: "8",
  //   filterCriteria: [
  //     {
  //       RelationId: 1,
  //       Age: 22,
  //       AccidentBenefit: "N",
  //     },
  //   ],
  // });

  const [policyDto, setPolicyDto] = useState({
    Plan: "",
    PreferredMode: "",
    PolicyTerm: "",
    PremiumPayingTerm: "",
    PolicePersonnel: "",
    Product: "LIC's Bima Jyoti",
    ProductCode: "512N339",
    PlanCode: "512N339V02",
    SumAssured: "",
    totalLifeBenefit: "",
    PaymentFrequency: "",
    DrawDownPeriod: "",
    relation: [
      {
        mID: 1,
        mValue: "Self",
      },
    ],
    spouseDetails: {},
    childrenDetails: [],
    PolicyType: "ORD",
    Nach: "",
    NachId: 8,
    DateOfCommencement: DateFormatFromDateObject(new Date(), "y-m-d"),
    InsurableItem: [
      {
        RiskItems: [
          {
            Name: "",
            DOB: "",
            Gender: "",
            Relation: "Self",
            RelationId: 1,
            Age: 22,
            PassportNo: "",
            PreExistingDisease: "",
            SumAssured: "",
            RiderDetails: [],
            PolicePersonnel: "",
            AccidentBenefit: "",
            AccidentBenefitId: "",
            Benefit: [],
            country: "India",
            ResidentStatus: "",
          },
        ],
      },
    ],
    PremiumDetails: {
      CoverPremium: [{}],
      BasicPremium: "",
      Discount: "0",
      GrossPremium: "",
      TaxDetails: [
        {
          Amount: "",
          TaxType: "CGST",
        },
        {
          Amount: "",
          TaxType: "SGST",
        },
        {
          Amount: "",
          TaxType: "IGST",
        },
      ],
      TaxAmount: "",
      TotalPremium: "",
      InstallmentDetails: [{}],
    },
    ProductId: "55",
    PlanNumber: "860",
    frequency: "",
    PlanId: "94",
    PreferredModeId: "12",
    filterCriteria: [
      {
        RelationId: 1,
        Age: 22,
        AccidentBenefit: "N",
      },
    ],
  });

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
  // const location = useLocation();
  useEffect(async () => {
    // const temp = localStorage.getItem("LifeProduct");
    // if (temp === null || temp === undefined) navigate(`/customerlifelanding`);
    // setProduct(temp);
    // localStorage.setItem("customerQuoteNo", "");
    // localStorage.setItem("opportunityId", "");
    // const current = new Date();
    // const startDate = `${format(current.getDate())}-${format(
    //   current.getMonth() + 1
    // )}-${current.getFullYear()}`;
    // const yesterday = new Date(Date.now() - 86400000);

    // const endDate = `${format(yesterday.getDate())}-${format(yesterday.getMonth() + 1)}-${
    //   yesterday.getFullYear() + parseInt(1, 10)
    // }`;

    // setPolicyDto({ ...policyJson, PolicyStartDate: startDate, PolicyEndDate: endDate });

    const res1 = await GetMasters();
    res1.forEach((x) => {
      if (x.mType === "Type") masters.contactType = x.mdata;
      if (x.mType === "Salutation") masters.Salutation = x.mdata;
      if (x.mType === "Gender") masters.Gender = x.mdata;
      if (x.mType === "MaritalStatus") masters.MaritalStatus = x.mdata;
      if (x.mType === "Currency") masters.Currency = x.mdata;
      if (x.mType === "ResidentStatus") masters.ResidentStatus = x.mdata;
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
    const res10 = await GetMasterLocation("Country", "0");

    masters.Plans = res2;
    masters.PreferredMode = res3;
    masters.BenefitOption = res5;
    masters.NachOptions = res6;
    masters.PremiumWaiverOptions = res7;
    masters.PremiumPayingTerm = res8;
    masters.PremiumType = res9;
    masters.country = res10[0].mdata;

    const arr1 = res4?.[0]?.AdditionDetailsJson?.productControls;
    const arr2 = [];
    // const res8 =
    arr1.forEach(async (x) => {
      if (x.type === "PlanMasters") {
        // const res9 =
        x.functionCalls.forEach(async () => {
          // if (x1.includes("callApi")) {
          //   masters[x1.split("=")[1].split(",")[0]] = await GetProdPartnerMasterData(
          //     x1.split("=")[1].split(",")[0],
          //     {
          //       ProductId,
          //     }
          //   );
          // }
        });
        // await Promise.all(res9);
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
    // await Promise.all(res8);
    masters.DynamicControls = arr2;
    setLoader(false);
    console.log("masters", masters);
    setMaster({ ...masters });
  }, []);

  useEffect(() => {
    if (activeStep > 3) navigate(`/CustomerProposals?OpportunityId=${policyDto.opportunityId}`);
  }, [activeStep]);

  const path = `Home.${policyDto.Product}`;
  return (
    <PageLayout background="white">
      <MDLoader loader={loader} />
      <BPNavbar />
      {masters !== null && (
        <MDBox
          sx={{
            background: `linear-gradient(to right,#121858, #1a237e,#474f97)`,
            mt: "3.875rem",
            minHeight: "100%",
          }}
        >
          <MDBox sx={{ width: "100%", px: matches ? "5rem" : "1.5rem", pb: "2rem" }}>
            <MDBox sx={{ ...rowStyle, pl: "1rem", pt: "1rem", pb: "2rem" }}>
              <Breadcrumbs
                fontSize="small"
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {path.split(".").map((elem) => (
                  <MDBox sx={centerRowStyle}>
                    <MDTypography
                      sx={{
                        ...centerRowStyle,
                        p: 0,
                        m: 0,
                        "&:hover": {
                          cursor: "pointer",
                        },
                        color: "#ffffff",
                      }}
                      onClick={() => elem === "Home" && navigate("/customerlifelanding")}
                    >
                      {elem}
                    </MDTypography>
                  </MDBox>
                ))}
              </Breadcrumbs>
            </MDBox>
            <Grid container spacing={4}>
              {activeStep < 3 && (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox component="img" src={planCard} sx={{ width: "100%" }} />
                  {false && (
                    <MDBox sx={{ fontsize: "32px", fontweight: 600, color: "#000000" }}>
                      <MDTypography
                        variant="h4"
                        sx={{
                          fontSize: "2rem",
                          color: "#000000",
                          textAlign: "center",
                          textTransform: "uppercase",
                        }}
                      >
                        {policyDto.Product}
                      </MDTypography>
                      {/* <MDTypography
                      sx={{
                        fontSize: "1rem",
                        color: "#000000",
                        textAlign: "center",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      (UIN - 512N346V01)
                    </MDTypography> */}
                      <MDTypography
                        sx={{
                          fontSize: "1rem",
                          color: "#000000",
                          textAlign: "center",
                          pt: "1rem",
                        }}
                      >
                        This plan provides financial support to the family in case of unfortunate
                        death of the life assured during the policy term .
                      </MDTypography>
                    </MDBox>
                  )}
                </Grid>
              )}
              {activeStep < 3 && (
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                  <Paper elevation={12}>
                    <MDBox
                      sx={{
                        mx: "1rem",
                        p: "1rem",
                        pl: matches ? "2rem" : 0,
                        bgcolor: "#FFFFFF",
                        minHeight: "70vh",
                      }}
                    >
                      {false && activeStep < 4 && (
                        <MDTypography variant="h6" sx={{ fontSize: "1.9rem", color: "#000000" }}>
                          {policyDto.Product}
                        </MDTypography>
                      )}
                      {false && activeStep < 4 && (
                        <MDTypography>Please provide the details</MDTypography>
                      )}
                      {activeStep < 4 && (
                        <StepperWithCountLabel activeStep={activeStep} steps={3} />
                      )}
                      <GetStepContent
                        step={activeStep}
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
                      />
                    </MDBox>
                  </Paper>
                </Grid>
              )}
              {activeStep >= 3 && (
                <GetStepContent
                  step={activeStep}
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
                />
              )}
            </Grid>
          </MDBox>
        </MDBox>
      )}
    </PageLayout>
  );
}

export default CustomerQuote;
