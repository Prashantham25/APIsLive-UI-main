import { useEffect, useState } from "react";
import _ from "lodash";
import Swal from "sweetalert2";
import paymentSuccessImg from "assets/images/Life/paymentSuccess.png";
import paymentFailureImg from "assets/images/Life/paymentFailure.png";

import { useNavigate, useLocation } from "react-router-dom";
import {
  Stack,
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  Drawer,
  // Tab,
  // Divider,
  // Tabs,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
  Icon,
  InputAdornment,
  IconButton,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import ReactJson from "react-json-view";

import MDTypography from "../../../../../../../components/MDTypography";
import MDButton from "../../../../../../../components/MDButton";
import MDBox from "../../../../../../../components/MDBox";
import {
  GetOpportunity,
  GetProposalByNumber,
  GenericApi,
  SaveOpportunity,
  UpdateProposalDetails,
  GetProdPartnerMasterData,
  GetPayLoadByQueryDynamic,
} from "../data";

import { get } from "../../../../../../../Common/RenderControl/objectPath";
import MSPCard from "../data/MSPCard";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";
import MDLoader from "../../../../../../../components/MDLoader";
// import { Policies } from "../../../../Retail/data/Apis";
import NavBar from "../data/NavBar";
import { buildForm } from "../../../../../../../Common/Validations";
import MDInput from "../../../../../../../components/MDInput";

const DCodeForMSP2 = [
  "V041",
  "V042",
  "V043",
  "V044",
  "V045",
  "V046",
  "V048",
  "V049",
  "V401",
  "V402",
  "V403",
  "V404",
];
const checkValue = (value) => value !== null && value !== undefined && value !== "";

const cardColor = ColorsSetting().secondary.focus;
const GetProposalYear = () => {
  const cDate = new Date();

  const cMonthFlag = cDate.getMonth() <= 3;
  if (cMonthFlag) return cDate.getFullYear() - 1;
  return cDate.getFullYear();
};
const mspDetails = {
  MSP000001: { name: "Safeway Insurance TPA Pvt Ltd" },
  MSP000002: { name: "MediAssit" },
  MSP000006: { name: "MDINDIA Health Insurance TPA" },
  MSP000007: { name: "Anmol Medicare Insurance TPA Ltd" },
  MSP000009: { name: "HealthIndia Insurance TPA Pvt. Ltd" },
  MSP000017: { name: "Health Assure Private Limited" },
};

//  MSP Code     Auto     Self
//   MSP000001:  working  not working
//   MSP000002:  working  working
//   MSP000006:  working  working
//   MSP000007: response getting in status
//   MSP000009:                                 add- Address1, Gender, MasterPolicyNo,sumAssured, MemberDOB
//   MSP000017:  working  working

const MSPProviders = [
  {
    // 560056
    msp: "MSP000001",
    api: "MSP000001_DiagonsticCenter",
    sheduleApi: "MSP000001_SchedulingApi",
    resPath: "finalResult.providerList",

    payload: {
      accessid: "accessid",
      pincode: "pincode",
      testname: "testname",
    },
    response: {
      dccode: "dccode",
      mspname: "mspname",
      dcaddress: "dcaddress",
      dcname: "dcname",
      contactEmail: "contactEmail",
      contactMobileNumber: "contactMobileNumber",
    },
  },
  // {
  //   // 400005 working
  //   msp: "MSP000002",
  //   api: "MSP000002_DiagonsticCenter",
  //   sheduleApi: "MSP000002_SchedulingApi",
  //   resPath: "finalResult.ProviderList",

  //   payload: {
  //     accessid: "accessId",
  //     pincode: "pinCode",
  //     testname: "testname",
  //   },
  //   response: {
  //     dccode: "dccode",
  //     mspname: "mspname",
  //     dcaddress: "dcaddress",
  //     dcname: "dcname",
  //     contactEmail: "contactEmail",
  //     contactMobileNumber: "contactMobileNumber",
  //   },
  // },
  {
    // 400012 working
    msp: "MSP000006",
    api: "MSP00006_DiagonsticCenter",
    sheduleApi: "LIC_MSP00006_Scheduling",
    resPath: "finalResult",

    payload: {
      accessid: "ProposalAccessId",
      pincode: "PINCODE",
      testname: "TESTNAMES",
    },
    response: {
      dccode: "DC_CODE",
      mspname: "MSP_Name",
      dcaddress: "DC_Address",
      dcname: "DC_NAME",
      contactEmail: "DC_EmailID",
      contactMobileNumber: "DC_ContactNos",
    },
  },
  // {
  // msp: "MSP000007",
  //   // 400054
  //   api: "MSP000007_DiagnosticCenter",
  //   sheduleApi: "MSP000007_SchedulingApi",
  //   resPath: "finalResult",
  //   dccode: "dccode",
  //   mspname: "mspname",
  //   dcaddress: "dcaddress",
  //   payload: {
  //     accessid: "accessid",
  //     pincode: "pincode",
  //     testname: "testname",
  //   },
  // },
  // {
  //   // 400021
  // msp: "MSP000009",
  //   api: "MSP000009_DiagonsticCenter",
  //   sheduleApi: "MSP000009_SchedulingApi",
  //   resPath: "finalResult.DCDetails",
  //   dccode: "DC_Code",
  //   mspname: "MSP_Name",
  //   dcaddress: "DC_Address",
  //   payload: {
  //     accessid: "accessid",
  //     pincode: "pincode",
  //     testname: "testname",
  //   },
  // },
  // {
  //   // 400072 working
  //   msp: "MSP000017",
  //   api: "MSP000017_DiagonsticCenter",
  //   sheduleApi: "MSP000017_SchedulingAPI",
  //   resPath: "finalResult.ProviderList",

  //   payload: {
  //     accessid: "ProposalAccessId",
  //     pincode: "Pincode",
  //     testname: "TestIds",
  //   },
  //   response: {
  //     dccode: "DCCode",
  //     mspname: "MSPName",
  //     dcaddress: "DCAddress",
  //     dcname: "DCName",
  //     contactEmail: "ContactEmail",
  //     contactMobileNumber: "ContactMobileNumber",
  //   },
  // },
];

export default function PostPayment() {
  const { search } = useLocation();
  const selectedId = new URLSearchParams(search).get("OpportunityId");
  const TxnStatus = new URLSearchParams(search).get("TxnStatus");
  const PaymentType = new URLSearchParams(search).get("PaymentType");
  const [DrawerFlg, setDrawerFlg] = useState(false);
  const [TxnStatusL, setTxnStatusL] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const matchesMd = useMediaQuery("(min-width:992px)");
  const [isVMHR, setIsVMHR] = useState(false);
  const [neftFlag, setNeftFlag] = useState(false);
  const [opportunityData, setOpportunityData] = useState({});
  const [pincode, setPincode] = useState("");
  const [DCClickCount, setDCClickCount] = useState(1);
  const [dto, setDto] = useState({
    ProposalList: [],
    ProposalData: [],
    RiskItems: [],
    scheduleType: "",
    appointmentDate: "",
    appointmentTime: "",
    MSP: {},
    ProposerDetails: {},
    Payment: {},
  });

  const [masters, setMasters] = useState({
    isMSP: false,
    MSPList: [],
    MSPSelection: [],
    pincode: "",
    IsMedicalCompleted: "",
  });

  const onMSPClick = (value, i1) => {
    masters.MSPSelection[i1].MSP = value;
    setMasters({ ...masters });
  };

  const onMSPDetails = (value, name, i1) => {
    masters.MSPSelection[i1][name] = value;

    if (name === "scheduleType") {
      masters.MSPSelection[i1].appointmentDate = "";
      masters.MSPSelection[i1].appointmentTime = "";
      masters.MSPSelection[i1].MSP = {};
    }
    setMasters({ ...masters });

    setDto({ ...dto });
  };

  useEffect(async () => {
    if (selectedId !== "" && selectedId !== undefined) {
      setLoader(true);
      await GetOpportunity(selectedId).then((res) => {
        setOpportunityData(res);
        setLoader(false);
        if (res?.AdditionalDetailsJson?.AutoSave?.RiskItems) {
          res.AdditionalDetailsJson.AutoSave.RiskItems.forEach((x) => {
            if (x?.Category?.MHRType === "VMHR") setIsVMHR(true);
          });
          setNeftFlag(
            res?.AdditionalDetailsJson?.AutoSave?.PaymentDetails?.PaymentMethod === "NEFT"
          );

          dto.RiskItems = res.AdditionalDetailsJson.AutoSave.RiskItems.filter(
            (x) => x.Category.MedicalType === "MSP" || x.Category.MedicalType === "VMER"
          );
          if (Array.isArray(dto.RiskItems)) {
            masters.MSPList = dto.RiskItems.map(() => []);
            masters.MSPSelection = dto.RiskItems.map((x) => ({
              testName: x.Category.MedicalReports,
              pincode: x.PermanentAddress.Pincode,
              Name: x.Name,
              scheduleType: "",
              appointmentDate: "",
              appointmentTime: "",
              MSP: {},
            }));
          }

          if (res.AdditionalDetailsJson?.AutoSave?.Category?.IsMedical === "Yes") {
            masters.isMSP = true;
            masters.IsMedicalCompleted = res.AdditionalDetailsJson?.AutoSave?.IsMedicalCompleted;
            masters.pincode =
              res.AdditionalDetailsJson?.AutoSave?.RiskItems?.[0]?.PermanentAddress?.Pincode;
          }
          if (res.OpportunityDetails !== undefined) {
            dto.ProposalList = _.uniqBy(
              [...res.OpportunityDetails.filter((x) => x.stageId === 4 && x.txnValue !== null)],
              "txnValue"
            ).map((x1) => x1.txnValue);
          }

          dto.ProposalList.forEach(async (proposalNo) => {
            await GetProposalByNumber(proposalNo).then((res1) => {
              if (res1[0] && res1[0].policyDetails !== undefined) {
                setDto((prevState) => ({
                  ...prevState,
                  ProposalData: [...prevState.ProposalData, res1[0].policyDetails],
                  ProposerDetails: res1[0].policyDetails.ProposerDetails,
                }));
                if (TxnStatus?.toString()?.includes("Success") && PaymentType !== "neft") {
                  GenericApi("LifeInsurance", "GenericMailAPi", {
                    communicationId: "384",
                    ProposalNo: proposalNo,
                    EmailID: res1[0].policyDetails.ProposerDetails.EmailId,
                  });
                  GenericApi("LifeInsurance", "PaymentConfirmationSMS", {
                    contactNo: res?.AdditionalDetailsJson?.AutoSave?.ProposerContactNo,
                    accessId: selectedId,
                    ProposalNo: proposalNo,
                    Amount: res?.AdditionalDetailsJson?.AutoSave?.PremiumDetails?.TotalPremium,
                  });
                }
                res1[0].policyDetails.InsurableItem[0].RiskItems.forEach((x3) => {
                  if (x3?.MSPResponse?.Status?.toLowerCase() === "success")
                    masters.IsMedicalCompleted = true;
                });
              }
            });
          });
        }
      });
      setDto({ ...dto });

      setMasters({ ...masters });
    }
  }, [selectedId]);

  useState(() => {
    if (TxnStatus?.toString()?.includes("Success")) {
      // Swal.fire({ icon: "success", text: "Payment Successful !" });
      setTxnStatusL(true);
    } else {
      setTxnStatusL(false);
      if (false) navigate(`/LifeCustomerPayment?OpportunityId=${selectedId}`);
    }
  }, [TxnStatus]);

  useEffect(() => {
    if (masters.MSPList.length > 0 && DCClickCount !== 0) {
      masters.MSPList = masters.MSPList.map(() => []);

      dto.RiskItems.forEach((x1, i1) => {
        // masters.MSPList[i1] =
        MSPProviders.forEach((x) => {
          GenericApi("LifeInsurance", x.api, {
            [x.payload.accessid]: opportunityData?.OpportunityNumber,
            [x.payload.pincode]: pincode, // x1.PermanentAddress?.Pincode, // 400005, //
            [x.payload.testname]: x1.Category?.MedicalReports,
            // "Video MER, Rest ECG, SBT 13, RUA, Haemogram, HbA1C, Urine Cotinine test, RUA, Lipidogram, ELISA for HIV, Hb%",
          }).then((res) => {
            if (Array.isArray(get(res, x.resPath)) && get(res, x.resPath).length > 0)
              masters.MSPList[i1] = [
                ...masters.MSPList[i1],
                ...get(res, x.resPath).map((y) => ({
                  ...y,
                  dccode: y[x.response.dccode],
                  // mspname: y[x.response.mspname],
                  dcname: y[x.response.dcname],
                  dcaddress: y[x.response.dcaddress],
                  contactMobileNumber: y[x.response.contactMobileNumber],
                  contactEmail: y[x.response.contactEmail]?.toString()?.split(";")?.[0],
                  schedulerApi: x.sheduleApi,
                  // mspID: x.msp,
                  mspcode: x.msp,
                  mspname: mspDetails[x.msp]?.name,
                })),
              ];
            setMasters({ ...masters });
          });
        });
        setMasters({ ...masters });
      });
    }
  }, [masters.isMSP, masters.MSPList.length, DCClickCount]);

  const onCancelMSP = (i1) => {
    masters.MSPSelection[i1].MSP = {};
    setMasters({ ...masters });

    setDto({ ...dto });
  };

  const onVierRedirection = () => {
    let proposalnumber = "";
    let proposername = "";
    let BranchCode = "";

    GetPayLoadByQueryDynamic({
      reportname: "PIVCQuery",
      paramList: [
        {
          parameterName: "OpportunityId",
          parameterValue: selectedId,
        },
      ],
    }).then(async (res1) => {
      proposername = res1?.finalResult?.[0]?.ProposerName;
      await GetProposalByNumber(res1?.finalResult?.[0]?.ProposalNo).then((res2) => {
        proposalnumber = res2?.[0]?.policyDetails?.CoreProposalNo;
      });
      if (
        res1?.finalResult?.[0]?.DivisionCode === "" ||
        res1?.finalResult?.[0]?.DivisionCode === null ||
        res1?.finalResult?.[0]?.DivisionCode === undefined
      ) {
        await GetProdPartnerMasterData("LifeCityMaseter", {}).then((res4) => {
          if (Array.isArray(res4))
            res4.forEach((x1) => {
              if (x1.BranchCode === res1?.finalResult?.[0]?.BranchCode) {
                if (x1.mID.toString().length === 2) BranchCode = `V0${x1.mID}`;
                else BranchCode = `V${x1.mID}`;
              }
            });
        });
      } else BranchCode = res1?.finalResult?.[0]?.DivisionCode;
      GenericApi("LifeInsurance", "LIC_PIVC", {
        // opportunityId: selectedId,
        proposalnumber,
        proposalyear: GetProposalYear(),
        proposername,
        opportunityid: selectedId,
        BranchCode,
      }).then((res) => {
        // setLoader(false);
        // const formData = {
        //   action: "https://securegw-stage.paytm.in/theia/customProcessTransaction",
        //   params: {
        //     msg: "LICofI06230095794482|480977489A314614|NA|9483|NA|NA|NA|INR|NA|R|ABCD|NA|NA|F|55K|480977489|8789405931|936|05|11-12-2023|15-07-53|https://techprouat2.licindia.in/eProcess/processpaytmpayment.do|C29B8697C53AA146EAFD18C1F0579C19316807D69F5180D84C3DAF65A9B4707E",
        //     mid: "LICofI06230095794482",
        //     orderid: "480977489A314614",
        //   },
        // };
        const form = buildForm({ action: res.finalResult.URL, params: res.finalResult });
        document.body.appendChild(form);
        form.submit();
        form.remove();
      });
    });
  };

  const onScheduleApi = () => {
    try {
      let flag1 = true;
      masters.MSPSelection.forEach((x, i) => {
        if (masters.MSPList[i].length > 0 && x.scheduleType === "") flag1 = false;
      });
      if (flag1 === false) Swal.fire({ icon: "error", text: "Please select schedule type" });
      else {
        let flag2 = true;
        masters.MSPSelection.forEach((x, i) => {
          if (
            masters.MSPList[i].length > 0 &&
            x.scheduleType === "Self" &&
            (x.appointmentDate === "" ||
              x.appointmentTime === "" ||
              Object.keys(x.MSP).length === 0)
          )
            flag2 = false;
        });
        if (flag2 === false)
          Swal.fire({ icon: "error", text: "Please select Diagnostic, Schedule Date and Time" });
        else {
          if (false) {
            const RiskArr = opportunityData?.AdditionalDetailsJson?.AutoSave?.RiskItems;
            try {
              if (Array.isArray(RiskArr)) {
                RiskArr.forEach((x1, i1) => {
                  masters.MSPSelection.forEach((x2) => {
                    if (x1.Name === x2.Name) RiskArr[i1].MSP = x2;
                  });
                });
              }
            } catch {
              //
            }
          }

          SaveOpportunity({
            opportunityId: selectedId,
            isAutoSave: true,
            AutoSave: {
              ...opportunityData.AdditionalDetailsJson?.AutoSave,
              IsMedicalCompleted: true,
              // RiskItems: RiskArr,
              workflowStage: "postPayment",
            },
            Category: opportunityData.AdditionalDetailsJson?.Category,
            MHRAllocation: opportunityData.AdditionalDetailsJson?.MHRAllocation,
            // stageStatusId: 2,
          });

          const branchCode =
            opportunityData?.AdditionalDetailsJson?.AutoSave?.ChannelDetails?.DivisionCode;
          const forMSp2 = DCodeForMSP2.includes(branchCode);

          masters.MSPSelection.forEach((x1, i1) => {
            if (
              x1.scheduleType === "Auto" ||
              x1.scheduleType === "" ||
              x1.scheduleType === undefined ||
              x1.scheduleType === null
            ) {
              masters.MSPSelection[i1].scheduleType = "Auto";
              masters.MSPSelection[i1].MSP.schedulerApi = forMSp2
                ? "MSP000002_SchedulingApi"
                : "MSP000001_SchedulingApi";
              // masters.MSPSelection[i1].MSP.mspID = "MSP000002";

              masters.MSPSelection[i1].MSP.mspcode = forMSp2 ? "MSP000002" : "MSP000001";
              masters.MSPSelection[i1].MSP.mspname = forMSp2
                ? mspDetails.MSP000002.name
                : mspDetails.MSP000001.name;
            }
          });

          // let resObj = {};

          Promise.all(
            masters.MSPSelection.map((x) =>
              GenericApi("LifeInsurance", x.MSP.schedulerApi, {
                accessid: opportunityData?.OpportunityNumber,
                nameoftheproposer: dto?.ProposerDetails?.Name,
                mobileNumber: checkValue(dto?.ProposerDetails?.ContactNo)
                  ? dto?.ProposerDetails?.ContactNo
                  : dto?.ProposerDetails?.AlternativeContactNo,
                emailId: dto?.ProposerDetails?.EmailId,
                proposalnumber: dto.ProposalData?.[0]?.CoreProposalNo,
                proposalYear: GetProposalYear(),
                fullProposalYear: GetProposalYear(),
                pincode: x.scheduleType === "Self" ? pincode : x.pincode,
                dccode: x.MSP?.dccode ? x.MSP.dccode : "",
                listofprepolicymedicalreportstobeconducted: x.testName,
                appointmentdate: x.scheduleType === "Auto" ? "" : x.appointmentDate,
                appointmenttime: x.scheduleType === "Auto" ? "" : x.appointmentTime,
                schedulingtype: x.scheduleType,
                branchCode,
              })
            )
          ).then((response) => {
            Promise.all(dto.ProposalData.map((x) => GetProposalByNumber(x.ProposalNo))).then(
              (res3) => {
                dto.ProposalData = res3.map((x1) => x1[0].policyDetails);

                dto.ProposalData.forEach((x5, i5) => {
                  x5.InsurableItem[0].RiskItems.forEach((x1, i1) => {
                    masters.MSPSelection.forEach((x2, i2) => {
                      if (
                        x1.Name === x2.Name &&
                        response?.[i2]?.finalResult?.Status?.toString()?.toLowerCase() === "success"
                      ) {
                        GenericApi("LifeInsurance", "LIC_MSPCustMailAPI", {
                          toMail1: dto?.ProposerDetails?.EmailId,
                          toMail2: masters.MSPSelection?.[i2]?.MSP?.contactEmail,
                          mailSubject: `Medical Tests for ${dto.ProposalData?.[0]?.Product} plan, Proposal no:${dto.ProposalData?.[0]?.CoreProposalNo} with reference to AccessID ${opportunityData?.OpportunityNumber}`,
                          AccessId: opportunityData?.OpportunityNumber,
                          opportunityId: selectedId,
                          ProductId: dto.ProposalData?.[0]?.ProductId,
                          Plan: dto.ProposalData?.[0]?.Product,
                          Name: dto?.ProposerDetails?.Name,
                          DOB: x1?.DOB,
                          ContactNo: checkValue(dto?.ProposerDetails?.ContactNo)
                            ? dto?.ProposerDetails?.ContactNo
                            : dto?.ProposerDetails?.AlternativeContactNo,
                          EmailId: dto?.ProposerDetails?.EmailId,
                          MedicalReports: x1?.Category?.MedicalReports,
                          SumProposed: dto.ProposalData?.[0]?.SumAssured,
                          PolicyTerm: dto.ProposalData?.[0]?.PolicyTerm,
                          LICDivisionName: "",
                          ProposalYear: GetProposalYear(),
                          BranchCode: dto.ProposalData?.[0]?.ChannelDetails?.DivisionCode,
                          ProposalNo: dto.ProposalData?.[0]?.CoreProposalNo,
                          MSP: {
                            scheduleType: masters.MSPSelection?.[i2]?.scheduleType,
                            appointmentDate: masters.MSPSelection?.[i2]?.MSP?.appointmentDate,
                            mspname: masters.MSPSelection?.[i2]?.MSP?.mspname,
                            dcname: masters.MSPSelection?.[i2]?.MSP?.dcname,
                            dccode: masters.MSPSelection?.[i2]?.MSP?.dccode,
                            dcaddress: masters.MSPSelection?.[i2]?.MSP?.dcaddress,
                            contactMobileNumber:
                              masters.MSPSelection?.[i2]?.MSP?.contactMobileNumber,
                            contactEmail: masters.MSPSelection?.[i2]?.MSP?.contactEmail,
                          },
                        }).then((mailRes) => {
                          dto.ProposalData[i5].InsurableItem[0].RiskItems[i1] = {
                            ...x1,
                            MSP: masters.MSPSelection[i2],
                            MSPResponse: response?.[i2]?.finalResult,
                            MSPMailResponse: mailRes?.finalResult,
                          };
                          setDto({ ...dto });
                          dto.ProposalData.map((y) => UpdateProposalDetails(y));
                        });
                      }
                      if (x1.Name === x2.Name) {
                        dto.ProposalData[i5].InsurableItem[0].RiskItems[i1] = {
                          ...x1,
                          MSP: masters.MSPSelection[i2],
                          MSPResponse: response?.[i2]?.finalResult,
                        };
                        setDto({ ...dto });
                      }
                    });
                  });
                });

                dto.ProposalData.map((y) => UpdateProposalDetails(y));
              }
            );
          });

          masters.IsMedicalCompleted = true;
          setMasters({ ...masters });
        }
      }
    } catch {
      //
    }
  };

  return neftFlag ? (
    <MDBox />
  ) : (
    <MDBox>
      <NavBar />
      <MDLoader loader={loader} />

      <MDBox p={2} pt={10}>
        {process.env.NODE_ENV === "development" && (
          <MDButton variant="text" onClick={() => setDrawerFlg(true)}>
            View Dto
          </MDButton>
        )}
        {TxnStatusL === true &&
          (masters.isMSP === false ||
            (masters.isMSP === true && masters.IsMedicalCompleted === true)) && (
            <MDBox sx={{ bgcolor: "#ffffff" }} p={2}>
              <MDBox sx={{ bgcolor: "#F0F6FF" }} p={2}>
                <Stack direction={matchesMd ? "row" : "column"}>
                  {matchesMd && (
                    <MDBox
                      sx={{ width: "50%", height: "100%" }}
                      component="img"
                      src={paymentSuccessImg}
                    />
                  )}
                  <Stack spacing={2} mt="5%">
                    <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                      <CheckCircleIcon color="success" sx={{ fontSize: "5rem !important" }} />
                    </MDBox>
                    {PaymentType !== "neft" && (
                      <MDTypography sx={{ textAlign: "center" }} variant="h4">
                        Your payment is successful
                      </MDTypography>
                    )}{" "}
                    {PaymentType !== "neft" && (
                      <MDTypography sx={{ textAlign: "center" }}>
                        Your proposal has been successfully registered
                      </MDTypography>
                    )}
                    {isVMHR && (
                      <MDTypography sx={{ textAlign: "center", fontSize: "1rem" }}>
                        You are required to record a self-identification video of 10 seconds from
                        the link provided below. While recording video, please speak your name and
                        four digit code displayed on the screen.
                      </MDTypography>
                    )}
                    {isVMHR && (
                      <MDTypography sx={{ textAlign: "center", fontSize: "1rem" }}>
                        You need to enable access to LOCATION, MICROPHONE, CAMERA on the recording
                        device preferably mobile phone/Laptop while recording self-identification
                        video. Please do not use desktop computers since it may not have location
                        and other required access facility. While recording video, please speak your
                        name and fourdigit code displayed on the screen
                      </MDTypography>
                    )}
                    {isVMHR && (
                      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                        <MDButton onClick={onVierRedirection}>Video Verification</MDButton>{" "}
                      </MDBox>
                    )}
                  </Stack>{" "}
                </Stack>
              </MDBox>
            </MDBox>
          )}
        {TxnStatusL === false && (
          <MDBox sx={{ bgcolor: "#ffffff" }} p={2}>
            <MDBox sx={{ bgcolor: "#F0F6FF" }} p={2}>
              <Stack direction={matchesMd ? "row" : "column"}>
                {matchesMd && (
                  <MDBox
                    pl={10}
                    pr={10}
                    sx={{ height: "70%" }}
                    component="img"
                    src={paymentFailureImg}
                  />
                )}{" "}
                <Stack spacing={2} mt="5%">
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <CancelIcon color="error" sx={{ fontSize: "5rem !important" }} />
                  </MDBox>
                  <MDTypography sx={{ textAlign: "center" }} variant="h4">
                    Your payment is failed
                  </MDTypography>
                  <MDTypography sx={{ textAlign: "center" }}>
                    Click retry payment and do the payment{" "}
                  </MDTypography>{" "}
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton
                      onClick={() => navigate(`/LifeCustomerPayment?OpportunityId=${selectedId}`)}
                    >
                      Retry Payment
                    </MDButton>{" "}
                  </MDBox>
                </Stack>{" "}
              </Stack>
            </MDBox>{" "}
          </MDBox>
        )}
      </MDBox>
      {masters.isMSP === true && masters.IsMedicalCompleted !== true && TxnStatusL === true && (
        // {true && (
        <MDBox m={2} p={5} pt={10} sx={{ bgcolor: cardColor }}>
          <MDTypography variant="h3" sx={{ textAlign: "center" }}>
            Medical Service Provider
          </MDTypography>
          {dto.RiskItems.map((x1, i1) => (
            <Accordion
              expanded="true"
              defaultExpanded
              disableGutters
              sx={{
                boxShadow: "unset",
                border: "unset",
                "&:before": { display: "none" },
                pt: "0.5rem",
                pb: "0.5rem",
                bgcolor: cardColor,
              }}
            >
              <AccordionSummary
                sx={{
                  background: ColorsSetting().primary.main,
                  mb: "0.5rem",
                  borderRadius: "0.7rem",
                }}
              >
                <MDTypography variant="h6" color="white">
                  {x1.Name}
                </MDTypography>
              </AccordionSummary>
              <AccordionDetails>
                <MDBox>
                  <Grid container spacing={2} marginTop={3}>
                    <Grid item xs={12} md={12} lg={12} xl={12} xxl={12}>
                      <Stack direction={matchesMd ? "row" : "column"} spacing={2}>
                        <MDTypography variant="h6" sx={{ alignSelf: "center" }}>
                          How would you like to schedule your appointment
                        </MDTypography>
                        <RadioGroup
                          row
                          value={masters.MSPSelection[i1].scheduleType}
                          onChange={(e) => onMSPDetails(e.target.value, "scheduleType", i1)}
                        >
                          <FormControlLabel value="Self" control={<Radio />} label="Self" />
                          <FormControlLabel value="Auto" control={<Radio />} label="Auto" />
                        </RadioGroup>
                      </Stack>
                    </Grid>
                    {masters.MSPSelection[i1].scheduleType === "Self" && (
                      <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="Enter Pincode"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                        />
                      </Grid>
                    )}
                    {masters.MSPSelection[i1].scheduleType === "Self" && (
                      <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
                        <MDButton onClick={() => setDCClickCount(DCClickCount + 1)}>
                          Fetch Diagnostics
                        </MDButton>
                      </Grid>
                    )}
                  </Grid>
                  {masters.MSPSelection[i1].appointmentTime !== undefined &&
                  masters.MSPList?.[i1]?.length > 0 ? (
                    <MDBox>
                      <Grid container spacing={2} marginTop={3}>
                        {masters.MSPSelection[i1].scheduleType === "Self" &&
                          masters.MSPSelection[i1].MSP.dccode && (
                            <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
                              <MSPCard
                                onClick={() => {}}
                                data={masters.MSPSelection[i1].MSP}
                                value={masters.MSPSelection[i1].MSP}
                                onCancel={() => onCancelMSP(i1)}
                              />
                            </Grid>
                          )}
                        {masters.MSPSelection[i1].MSP.dccode &&
                          masters.MSPSelection[i1].scheduleType === "Self" && (
                            <Grid item xs={12} md={12} lg={8} xl={8} xxl={8}>
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={12} lg={5} xl={5} xxl={5}>
                                  <MDDatePicker
                                    input={{
                                      label: "Appointment Date",
                                      value: masters.MSPSelection[i1].appointmentDate,
                                    }}
                                    value={masters.MSPSelection[i1].appointmentDate}
                                    onChange={(e, a) => onMSPDetails(a, "appointmentDate", i1)}
                                    fullWidth
                                    options={{
                                      dateFormat: "Y-m-d",
                                      altFormat: "d-m-Y",
                                      altInput: true,
                                      allowInput: true,
                                      disableMobile: true,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} lg={5} xl={5} xxl={5}>
                                  <MDDatePicker
                                    input={{
                                      label: "Appointment Time",
                                      value: masters.MSPSelection[i1].appointmentTime,

                                      InputProps: {
                                        endAdornment: (
                                          <InputAdornment
                                            position="end"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                          >
                                            <IconButton>
                                              <Icon>schedule</Icon>{" "}
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      },
                                    }}
                                    value={masters.MSPSelection[i1].appointmentTime}
                                    onChange={(e, a) => onMSPDetails(a, "appointmentTime", i1)}
                                    fullWidth
                                    options={{
                                      noCalendar: true,
                                      enableTime: true,
                                      dateFormat: "H:i:S",
                                      altFormat: "H:i:S",
                                      altInput: true,
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          )}

                        {!masters.MSPSelection[i1].MSP.dccode &&
                          masters.MSPSelection[i1].scheduleType === "Self" &&
                          masters.MSPList[i1].map((x) => (
                            <Grid item xs={12} md={12} lg={3} xl={3} xxl={3}>
                              <MSPCard
                                onClick={() => onMSPClick(x, i1)}
                                data={x}
                                value={masters.MSPSelection[i1].MSP}
                              />
                            </Grid>
                          ))}
                      </Grid>
                    </MDBox>
                  ) : (
                    <MDTypography sx={{ textAlign: "center" }}>
                      {/* Medical service providers not available for your details */}
                    </MDTypography>
                  )}
                </MDBox>{" "}
              </AccordionDetails>
            </Accordion>
          ))}
          <MDBox sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <MDButton onClick={onScheduleApi}>Schedule Appointment</MDButton>
          </MDBox>
        </MDBox>
      )}
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
        open={DrawerFlg}
        onClose={() => setDrawerFlg(false)}
      >
        <ReactJson
          src={{ ...dto, masters: { ...masters }, opportunityData }}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          // enableClipboard={0}
          // onAdd={(e) => setDto({ ...e.updated_src })}
          // onDelete={(e) => setDto({ ...e.updated_src })}
          // onEdit={(e) => setDto({ ...e.updated_src })}
          style={{ fontSize: 15 }}
          collapsed={1}
        />
      </Drawer>
    </MDBox>
  );
}
