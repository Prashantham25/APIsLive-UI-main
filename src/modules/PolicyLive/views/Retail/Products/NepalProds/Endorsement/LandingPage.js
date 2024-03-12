import { useState, useEffect } from "react";

import { Grid, Autocomplete, Backdrop, CircularProgress, Stack } from "@mui/material";
import MDInput from "components/MDInput";
import MDDatePicker from "components/MDDatePicker";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import swal from "sweetalert2";
// import Retailindex from "../../../index";
import StepperV1 from "../../../Layout/StepperV1";
import StepperV2 from "../../../Layout/StepperV2";
// import MotorCycle from "../Products/NepalProds/ManagerDashboard/MotorCycle";
// import { InsuredDetails } from "../data/Json/MotorCycleJson";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../../../BrokerPortal/context";
import {
  getPolicyByNumber,
  getPolicyDetailsByNumber,
  getMasterData,
  GetEndorsementConfigV2ByProductId,
  CheckPolicyInEndoStage,
  // GetEndorsementStageChecked,
} from "../data/APIs/MotorCycleApi";
import { InsuredDetails } from "../data/Json/MotorCycleJson";

function LandingPage() {
  const [control, dispatch] = useDataController();
  const { genericInfo, genericPolicyDto } = control;
  const [backDropFlag, setBackDropFlag] = useState(false);
  const [Json, setJson] = useState();
  // console.log("genericInfo", genericInfo);
  // const [flag, setFlag] = useState(false);
  // const flag = false;
  const [object, setObject] = useState([
    { mID: "", mValue: "" },
    { endorsementConfigId: "", endorsementConfigName: "" },
  ]);
  const [ErrorFlag, setErrorFlag] = useState(false);
  const helperText = "This field is Required";
  const [endorsementCategory, setEndorsementCategory] = useState([]);
  const [endorsementType, setEndorsementType] = useState([]);
  const [endorsementArray, setEndorsementArray] = useState([]);
  const [endorsementArrayAll, setendorsementArrayAll] = useState([]);
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };
  const [PolicyFind, setPolicyFind] = useState({
    PolicyStatus: "",
    policyNumber: "",
    productIdpk: "",
    endorsementCategory: {},
    endorsementType: {},
    EndorsementEffectiveDate: "",
    EndorsementEffectiveTime: "",
    // CancellationEffectiveDate: "",
  });
  const handleSetInputDate = (e, date) => {
    // if (PolicyFind?.endorsementType?.mValue === "Policy Cancellation") {
    //   PolicyFind.CancellationEffectiveDate = date;
    //   PolicyFind.EndorsementEffectiveDate = "";
    // } else {
    PolicyFind.EndorsementEffectiveDate = date;
    PolicyFind.EndorsementEffectiveTime = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    //   PolicyFind.CancellationEffectiveDate = "";
    // }
    setPolicyFind(() => ({ ...PolicyFind }));
  };
  // console.log("endorsementArray", endorsementArray);
  const handleSetInput = async (e, value, type) => {
    if (type === "enType") {
      if (value !== null) {
        object[1].endorsementConfigId = "";
        object[1].endorsementConfigName = "";
        PolicyFind.EndorsementEffectiveDate = "";
        // setObject([...object]);
        object[0].mID = value.mID;
        object[0].mValue = value.mValue;
        PolicyFind.endorsementType = value;
        setPolicyFind(() => ({ ...PolicyFind }));
        setObject([...object]);
        const a = endorsementType.filter((t) => t.mID === value.mID)[0];
        const res = await GetEndorsementConfigV2ByProductId(PolicyFind.productIdpk);
        if (res[0]?.endorsementType === undefined) {
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
        }
        setendorsementArrayAll(res);
        setEndorsementCategory(res.filter((x) => x.endorsementType === a.mID));
        // console.log(a, "endorsementType", ",,,", res);
      } else {
        object[0].mID = "";
        object[0].mValue = "";
        PolicyFind.endorsementType = {};
        object[1].endorsementConfigId = "";
        object[1].endorsementConfigName = "";
        PolicyFind.endorsementCategory = {};
        PolicyFind.EndorsementEffectiveDate = "";
        setPolicyFind(() => ({ ...PolicyFind }));
        setObject([...object]);
      }
    }
    if (type === "enCat") {
      if (value !== null) {
        PolicyFind.EndorsementEffectiveDate = "";
        object[1].endorsementConfigId = value.endorsementConfigId;
        object[1].endorsementConfigName = value.endorsementConfigName;
        PolicyFind.endorsementCategory = value;
        const data = endorsementArrayAll.filter(
          (x) => x.endorsementConfigName === value.endorsementConfigName
        );
        const data1 = data[0].riskParameters.filter((x) => x.parameterMode === 0);
        // console.log("data1", data1);
        setEndorsementArray([...data1]);
        setPolicyFind(() => ({ ...PolicyFind }));
        setObject([...object]);
        const b = endorsementCategory.filter((t1) => t1.mID === value.mID)[0];
        console.log(b);
      } else {
        object[1].endorsementConfigId = "";
        object[1].endorsementConfigName = "";
        PolicyFind.endorsementCategory = {};
        PolicyFind.EndorsementEffectiveDate = "";
        // object[0].mID = "";
        // object[0].mValue = "";
        // PolicyFind.endorsementType = {};
        setPolicyFind(() => ({ ...PolicyFind }));
        setObject([...object]);
      }
    }
    if (e.target.name === "Policy Number") {
      PolicyFind.policyNumber = e.target.value.trim();
      setPolicyFind(() => ({ ...PolicyFind }));
      object[1].endorsementConfigName = "";
      object[0].mValue = "";
      setObject([...object]);
      // }
    }
  };
  // console.log("Json", Json);
  const handlePolicySearch = async () => {
    await getPolicyByNumber(PolicyFind?.policyNumber).then(async (x) => {
      if (x?.productIdPk !== undefined) {
        PolicyFind.policyNumber = PolicyFind.policyNumber.toUpperCase();
        PolicyFind.productIdpk = x.productIdPk;
        PolicyFind.PolicyStatus = x?.policyStatus;
        setPolicyFind(() => ({ ...PolicyFind }));
        if (x?.policyStatus === "PolicyCancel") {
          PolicyFind.productIdpk = "";
          PolicyFind.PolicyStatus = "";
          setPolicyFind(() => ({ ...PolicyFind }));
          swal.fire({
            icon: "error",
            text: "Policy is Cancelled",
          });
        } else {
          const resultgetPolicyDetailsByNumber = await getPolicyDetailsByNumber(
            PolicyFind?.policyNumber
          );
          setJson(resultgetPolicyDetailsByNumber);
        }
      }
    });

    // console.log("resgetpolicybynumber.productIdPk", resgetpolicybynumber);
    // PolicyFind.productIdpk = resgetpolicybynumber.productIdPk;
    // setPolicyFind(() => ({ ...PolicyFind }));
  };
  // const handleEffectiveDateCheck = (resultgetPolicyDetailsByNumber) => {
  //   let Validation = false;
  //   if (PolicyFind.endorsementType.mValue === "Policy Cancellation") {
  //     Validation =
  //       new Date(PolicyFind.EndorsementEffectiveDate).getTime() <=
  //       new Date(resultgetPolicyDetailsByNumber.PolicyStartDate).getTime();
  //   } else {
  //     Validation =
  //       new Date(PolicyFind.EndorsementEffectiveDate).getTime() <=
  //         new Date(resultgetPolicyDetailsByNumber.PolicyEndDate).getTime() &&
  //       new Date(PolicyFind.EndorsementEffectiveDate).getTime() >=
  //         new Date(resultgetPolicyDetailsByNumber.PolicyStartDate).getTime();
  //   }
  //   return Validation;
  // };
  // const handleValidaion = () => {
  //   let EffectiveDate = true;
  //   if (object[0].mValue === "Policy Cancellation") {
  //     EffectiveDate = PolicyFind.EndorsementEffectiveDate !== "";
  //   } else {
  //     EffectiveDate = PolicyFind.CancellationEffectiveDate !== "";
  //   }
  //   return EffectiveDate;
  // };
  // console.log("PolicyFind", PolicyFind);
  const handleSearch = async () => {
    if (
      PolicyFind.policyNumber === "" ||
      object[0].mValue === "" ||
      PolicyFind.EndorsementEffectiveDate === "" ||
      object[1].endorsementConfigName === ""
    ) {
      setErrorFlag(true);
      swal.fire({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      setGenericInfo(dispatch, {});
      setGenericPolicyDto(dispatch, {});
      setErrorFlag(false);
      setBackDropFlag(true);
      setGenericInfo(dispatch, {
        ...genericInfo,
        activeStep: 0,
        Endorsement: false,
      });
      await CheckPolicyInEndoStage(PolicyFind.policyNumber).then(async (x) => {
        // console.log("dddd", x.data.responseMessage);
        if (x?.data?.responseMessage) {
          if (x.data.responseMessage === "Searched policy in policy stage") {
            const resultgetPolicyDetailsByNumber = await getPolicyDetailsByNumber(
              PolicyFind.policyNumber
            );
            // console.log("resultgetPolicyDetailsByNumber", resultgetPolicyDetailsByNumber);
            // if (handleEffectiveDateCheck(resultgetPolicyDetailsByNumber) === true) {
            // setFlag(true);

            if (
              resultgetPolicyDetailsByNumber.status === 7 ||
              resultgetPolicyDetailsByNumber.responseMessage === "Policy has been cancelled"
            ) {
              setBackDropFlag(false);
              swal.fire({
                icon: "error",
                text: "Invalid Policy Number",
              });
            } else {
              // if (
              //   resultgetPolicyDetailsByNumber?.PremiumDetails?.EndorsementPremiumDetails
              //     ?.EndorsementPremium === undefined &&
              //   resultgetPolicyDetailsByNumber?.PolicyPremium === undefined
              // ) {
              //   PolicyPremium = resultgetPolicyDetailsByNumber.PremiumDetails;
              // }
              delete resultgetPolicyDetailsByNumber?.EndorsementNo;
              delete resultgetPolicyDetailsByNumber?.EndoPolicyNo;
              if (object[1].endorsementConfigName === "Name Transfer") {
                delete resultgetPolicyDetailsByNumber?.EndoKYCNo;
              } else if (object[1].endorsementConfigName === "Extra") {
                delete resultgetPolicyDetailsByNumber?.EndoReceiptNo;
                delete resultgetPolicyDetailsByNumber?.EndoTaxInvoiceNo;
              } else if (
                object[1].endorsementConfigName === "Refund" ||
                object[0].mValue === "Policy Cancellation"
              ) {
                delete resultgetPolicyDetailsByNumber?.CreditNoteNo;
              }
              setGenericPolicyDto(dispatch, {
                ...resultgetPolicyDetailsByNumber,
                /* eslint-disable */
                EndorsementEffectiveDate: PolicyFind.EndorsementEffectiveDate,
                EndorsementEffectiveTime: PolicyFind.EndorsementEffectiveTime,
                PremiumType:
                  resultgetPolicyDetailsByNumber.PremiumType === undefined
                    ? resultgetPolicyDetailsByNumber
                    : object[0].mValue !== "Non-Financial Endorsement"
                    ? (resultgetPolicyDetailsByNumber.PremiumType = "")
                    : resultgetPolicyDetailsByNumber.PremiumType,
                EndoPremiumTypeLabel:
                  resultgetPolicyDetailsByNumber.PremiumType === undefined
                    ? resultgetPolicyDetailsByNumber
                    : object[0].mValue !== "Non-Financial Endorsement"
                    ? (resultgetPolicyDetailsByNumber.EndoPremiumTypeLabel = "")
                    : resultgetPolicyDetailsByNumber.EndoPremiumTypeLabel !== ""
                    ? resultgetPolicyDetailsByNumber.EndoPremiumTypeLabel
                    : resultgetPolicyDetailsByNumber.PremiumType,
                ProposerDetails:
                  object[0].mValue === "Non-Financial Endorsement" &&
                  object[1].endorsementConfigName === "Name Transfer"
                    ? (resultgetPolicyDetailsByNumber.ProposerDetails = InsuredDetails())
                    : resultgetPolicyDetailsByNumber.ProposerDetails,
                FinancingType:
                  object[0].mValue === "Non-Financial Endorsement" &&
                  object[1].endorsementConfigName === "Name Transfer"
                    ? (resultgetPolicyDetailsByNumber.FinancingType = "")
                    : resultgetPolicyDetailsByNumber.FinancingType,
                PolicyRiskCategory:
                  object[0].mValue === "Non-Financial Endorsement" &&
                  object[1].endorsementConfigName === "Name Transfer"
                    ? (resultgetPolicyDetailsByNumber.PolicyRiskCategory = "")
                    : resultgetPolicyDetailsByNumber.PolicyRiskCategory,
                PolicyRiskType:
                  object[0].mValue === "Non-Financial Endorsement" &&
                  object[1].endorsementConfigName === "Name Transfer"
                    ? (resultgetPolicyDetailsByNumber.PolicyRiskType = "")
                    : resultgetPolicyDetailsByNumber.PolicyRiskType,
                Stage: (resultgetPolicyDetailsByNumber.Stage = "EndorsementStage"),
                PolicyStatus: (resultgetPolicyDetailsByNumber.PolicyStatus = "EndorsementStage"),
                PaymentDetails: {
                  PaymentSource: "",
                  PaymentType: "",
                  PaymentAmount: "",
                  TransactionReferenceNumber: "",
                  TransactionDate: "",
                  BankName: "",
                  BankCharges: "",
                  CashAmount: "",
                  ChequeNumber: "",
                  ChequeIssuedBankName: "",
                  AccountHolderName: "",
                  ChequeDepositBankName: "",
                  Remarks: "",
                  AccountHolderNumber: "",
                  BankAccountNumber: "",
                  DateOfPayment: "",
                },
                // PolicyPremium: PolicyPremium,
                /* eslint-enable */
              });
              // }
              setGenericInfo(dispatch, {
                ...genericInfo,
                prod: resultgetPolicyDetailsByNumber.Product,
                prodLabel: resultgetPolicyDetailsByNumber.prodlabel,
                activeStep: 0,
                Endorsement: true,
                EndorsementEffectiveDate: PolicyFind.EndorsementEffectiveDate,
                endorsementType: object[0].mValue,
                endorsementCategory: object[1].endorsementConfigName,
                EndorsementType: PolicyFind.endorsementType,
                EndorsementCategory: PolicyFind.endorsementCategory,
                EndorsementControlList: endorsementArray,
                PolicyJson: resultgetPolicyDetailsByNumber,
                CancellationEffectiveDate: PolicyFind.CancellationEffectiveDate,
                PolicyNo: PolicyFind.policyNumber.toUpperCase(),
              });
              setBackDropFlag(false);
            }
          } else {
            setBackDropFlag(false);
            swal.fire({
              icon: "error",
              text: "Endorsement for this Policy is already In-Progress",
            });
          }
        } else {
          setBackDropFlag(false);
          swal.fire({
            icon: "error",
            text: "Invalid Policy Number",
          });
        }
      });
    }
  };
  // console.log("PolicyFind", PolicyFind, object);
  const handleClear = () => {
    setErrorFlag(false);
    PolicyFind.policyNumber = "";
    PolicyFind.EndorsementEffectiveDate = "";
    setPolicyFind(() => ({ ...PolicyFind }));
    object[1].endorsementConfigName = "";
    object[0].mValue = "";
    setJson();
    setObject([...object]);
    setGenericInfo(dispatch, {});
    setGenericPolicyDto(dispatch, {});
  };
  useEffect(async () => {
    setBackDropFlag(true);
    if (genericInfo && genericInfo.PolicyNumber !== undefined) {
      PolicyFind.policyNumber = genericInfo.PolicyNumber.toUpperCase();
      object[0].mValue = genericInfo.endorsementType;
      PolicyFind.EndorsementEffectiveDate = genericPolicyDto.EndorsementEffectiveDate;
      object[1].endorsementConfigName = genericInfo.endorsementCategory;
      PolicyFind.endorsementType = genericInfo.EndorsementType;
      PolicyFind.endorsementCategory = genericInfo.EndorsementCategory;
      setJson(genericPolicyDto);
    }

    const master = await getMasterData();
    console.log(master);
    Object.keys(master).forEach((x, key) => {
      if (master[key].mType === "EndorsementType") {
        setEndorsementType([...endorsementType, ...master[key].mdata]);
        console.log("EndorsementType", endorsementType);
      }
    });
    setBackDropFlag(false);
  }, []);
  useEffect(() => {
    if (genericInfo && genericInfo.Clear === true) handleClear();
  }, [genericInfo && genericInfo?.Clear === true]);
  return (
    <MDBox sx={{ bgcolor: "#FFFFFF", minHeight: "85vh" }}>
      {backDropFlag === true && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropFlag}
        >
          <CircularProgress />
        </Backdrop>
      )}
      <Grid container spacing={4} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography sx={{ fontSize: 20 }}>Endorsement</MDTypography>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="Policy Number"
            value={PolicyFind.policyNumber}
            onChange={handleSetInput}
            onBlur={handlePolicySearch}
            required
            label="Policy Number"
            error={ErrorFlag && PolicyFind.policyNumber === ""}
            helperText={ErrorFlag && PolicyFind.policyNumber === "" ? helperText : ""}
            sx={redAsterisk}
            disabled={genericInfo.Endorsement === true && genericInfo.PolicyNumber !== undefined}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            id="enType"
            options={PolicyFind.policyNumber === "" ? [] : endorsementType || []}
            value={{ mValue: object[0].mValue }}
            getOptionLabel={(option) => option.mValue}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            onChange={(e, value) => handleSetInput(e, value, "enType")}
            renderInput={(params) => (
              <MDInput
                {...params}
                label="Select Endorsement Type"
                error={ErrorFlag && object[0].mValue === ""}
                helperText={ErrorFlag && object[0].mValue === "" ? helperText : ""}
                // value={object[0].mValue}
                required
                sx={redAsterisk}
                disabled={
                  genericInfo.Endorsement === true && genericInfo.PolicyNumber !== undefined
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* {object[0].mValue !== "Policy Cancellation" && ( */}
          <Autocomplete
            id="enCat"
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            renderInput={(params) => (
              <MDInput
                {...params}
                label={
                  object[0].mValue === "Policy Cancellation"
                    ? "Select Cancellation Category"
                    : "Select Endorsement Category"
                }
                error={ErrorFlag && object[1].endorsementConfigName === ""}
                // value={object[1].endorsementConfigName}
                helperText={ErrorFlag && object[1].endorsementConfigName === "" ? helperText : ""}
                required
                sx={redAsterisk}
                disabled={
                  genericInfo.Endorsement === true && genericInfo.PolicyNumber !== undefined
                }
              />
            )}
            options={object[0].mValue === "" ? [] : endorsementCategory || []}
            value={{ endorsementConfigName: object[1].endorsementConfigName }}
            onChange={(e, value) => handleSetInput(e, value, "enCat")}
            getOptionLabel={(option) => option.endorsementConfigName}
          />
          {/* )} */}
          {/* {object[0].mValue === "Policy Cancellation" && (
            <Autocomplete
              id="enCat"
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  label="Reason for Cancellation"
                  error={ErrorFlag && object[1].endorsementConfigName === ""}
                  // value={object[1].endorsementConfigName}
                  helperText={ErrorFlag && object[1].endorsementConfigName === "" ? helperText : ""}
                  required
                  sx={redAsterisk}
                  disabled={
                    genericInfo.Endorsement === true && genericInfo.PolicyNumber !== undefined
                  }
                />
              )}
              options={endorsementCategory || []}
              value={{ endorsementConfigName: object[1].endorsementConfigName }}
              onChange={(e, value) => handleSetInput(e, value, "enCat")}
              getOptionLabel={(option) => option.endorsementConfigName}
            />
          )} */}
        </Grid>
        {(object[0].mValue !== "Policy Cancellation" || object[0].mValue === "") && (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDDatePicker
              fullWidth
              id="AAA"
              // name="Endorsement Effective Date"
              options={{
                dateFormat: "m/d/Y",
                altFormat: "d-m-Y",
                altInput: true,
                minDate:
                  genericInfo?.PolicyNumber === undefined
                    ? `${
                        new Date().getMonth() + 1
                      }/${new Date().getDate()}/${new Date().getFullYear()}`
                    : "",
                maxDate: new Date(Json?.PolicyEndDate),
              }}
              input={{
                label: "Endorsement Effective Date",
                value: PolicyFind.EndorsementEffectiveDate,
                error: ErrorFlag && PolicyFind.EndorsementEffectiveDate === "",
                helperText:
                  ErrorFlag && PolicyFind.EndorsementEffectiveDate === "" ? helperText : "",
                required: true,
                sx: redAsterisk,
                disabled:
                  genericInfo.Endorsement === true && genericInfo.PolicyNumber !== undefined,
              }}
              disabled={genericInfo.Endorsement === true && genericInfo.PolicyNumber !== undefined}
              value={PolicyFind.EndorsementEffectiveDate}
              onChange={(e, date) => handleSetInputDate(e, date)}
            />
          </Grid>
        )}
        {object[0].mValue === "Policy Cancellation" && object[0].mValue !== "" && (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDDatePicker
              fullWidth
              id="AAA"
              // name="Endorsement Effective Date"
              options={{
                dateFormat: "m/d/Y",
                altFormat: "d-m-Y",
                altInput: true,
                minDate:
                  new Date(Json?.PolicyStartDate).getTime() < new Date().getTime()
                    ? new Date(Json?.PolicyStartDate)
                    : `${
                        new Date().getMonth() + 1
                      }/${new Date().getDate()}/${new Date().getFullYear()}`,
                maxDate: new Date(Json?.PolicyEndDate),
                // `${
                //   new Date().getMonth() + 1
                // }/${new Date().getDate()}/${new Date().getFullYear()}`,
                // new Date(Json?.PolicyEndDate),
              }}
              input={{
                label: "Cancellation Effective Date",
                value: PolicyFind.EndorsementEffectiveDate,
                error: ErrorFlag && PolicyFind.EndorsementEffectiveDate === "",
                helperText:
                  ErrorFlag && PolicyFind.EndorsementEffectiveDate === "" ? helperText : "",
                required: true,
                sx: redAsterisk,
              }}
              value={PolicyFind.EndorsementEffectiveDate}
              onChange={(e, date) => handleSetInputDate(e, date)}
            />
          </Grid>
        )}
        {/* {object[0].mValue === "Policy Cancellation" && (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDDatePicker
              fullWidth
              id="BBB"
              // name="Cancellation Effective Date"
              options={{
                dateFormat: "m/d/Y",
                altFormat: "d-m-Y",
                altInput: true,
              }}
              input={{
                label: "Cancellation Effective Date",
                value: PolicyFind.CancellationEffectiveDate,
                error: ErrorFlag && PolicyFind.CancellationEffectiveDate === "",
                helperText:
                  ErrorFlag && PolicyFind.CancellationEffectiveDate === "" ? helperText : "",
                required: true,
                sx: redAsterisk,
              }}
              value={PolicyFind.CancellationEffectiveDate}
              onChange={(e, date) => handleSetInputDate(e, date)}
            />
          </Grid>
        )} */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack display="flex" justifyContent="center" direction="row" spacing={2}>
            <MDButton
              variant="contained"
              onClick={handleSearch}
              disabled={
                genericInfo?.Endorsement === true && genericInfo?.PolicyNumber !== undefined
              }
            >
              Search
            </MDButton>
            <MDButton
              variant="contained"
              onClick={handleClear}
              disabled={genericInfo.Endorsement === true && genericInfo.PolicyNumber !== undefined}
            >
              Clear
            </MDButton>
          </Stack>
        </Grid>
      </Grid>

      <MDBox>
        {genericInfo && genericInfo.Endorsement === true && genericPolicyDto.Url === "/retail" && (
          <StepperV1 />
        )}
        {genericInfo &&
          genericInfo.Endorsement === true &&
          genericPolicyDto.Url === "/newRetail" && <StepperV2 />}
      </MDBox>
    </MDBox>
  );
}

export default LandingPage;
