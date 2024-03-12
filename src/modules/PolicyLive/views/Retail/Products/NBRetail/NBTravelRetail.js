import { useState, useRef } from "react";
import {
  Radio,
  Card,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  // Backdrop,
  // CircularProgress,
  Stack,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import swal from "sweetalert2";
import objectPath from "object-path";
import { useNavigate } from "react-router-dom";
import { policyDto, riskDetails, Questionaire } from "./data/JSON/NBJson";
import MDBox from "../../../../../../components/MDBox";
import {
  getPlanByGroupId,
  getMasterData1,
  getCoverBenfitData,
  GetProdPartnermasterData,
  GetPolicyTripTenureMaster,
  CkycResponse,
  sendProposalLink,
  calculatePremium,
  calculateProposal,
  makePayment,
  fetchPaymentURL,
  IsName,
  IsPincode,
  Documentuploadaws,
  getDisplayNameByProductId,
  getProductIdByProductcode,
  getRelWithProposer,
  // UploadDocument,
} from "./data/APIs/NBTravelApi";
import {
  diffDaysCalculator,
  arrayRange,
  addDays,
  IsAlphaNum,
  IsMobileNumber,
  IsAlphaSpace,
  AgeCalculator1,
} from "../../../../../../Common/Validations";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";

const getPolicyDto = () => {
  console.log(".");
  return policyDto();
};

const getProcessSteps = () => {
  const steps = [
    "Quick Quote ",
    "Proposer Details",
    "Insured Details",
    "Other Details",
    "Premium Summary",
    "Payment",
  ];
  return steps;
};

// ({ activeStep, dto, masters }
const getPageContent = ({ activeStep, dto, masters }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        { name: "Plan Details", visible: true },
        { name: "Cover Details", visible: true },
        { name: "Trip Details", visible: true },
        { name: "Traveler details", visible: true },
        { name: "Proposer Details", visible: true },
        { name: "Medical Declaration", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "Proposer Details", visible: true },
        { name: "E-KYC", visible: true },
        { name: "Communication Details", visible: true },
      ];
      break;
    case 2:
      steps = [...masters.MemberAccordionArr];
      break;
    case 3:
      steps = [
        { name: "Nominee details", visible: true },
        { name: "University Details ", visible: dto.TripType === "StudentTravel" },
        { name: "Sponsor Details ", visible: dto.TripType === "StudentTravel" },
      ];
      break;
    case 4:
      steps = [{ name: "Premium Summary", visible: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ dto, setDto, activeStep, masters, setMasters, setBackDropFlag }) => {
  const Navigate = useNavigate();
  const lDto = dto;
  const lMasters = masters;
  const onPlanSelect = async (e, v) => {
    if (v === null) {
      lDto.Display_Name = "";
      lDto.Plan = "";
      lDto.TripType = "";
      lDto.SumInsured = "";
      lDto.Geography = "";
      // lDto.Temp.GroupID = "";
      lDto.ListOfDestination = [];
    } else {
      lDto.Display_Name = v.displayName;
      lDto.Plan = v.groupName;
      lDto.TripType = "";
      lDto.SumInsured = "";
      lDto.Geography = "";

      // lDto.Temp.GroupID = v.groupId;
      lDto.ListOfDestination = [];
      //
      const res2 = await getPlanByGroupId(v.groupId);
      if (res2[1].mdata[0].mValue === "SingleTrip" || res2[1].mdata[0].mValue === "StudentTravel") {
        lDto.Geography = res2[2].mdata[0].mValue;
      } else if (res2[1].mdata[0].mValue === "MultiTrip") {
        lDto.Geography = res2[2].mdata[1].mValue;
      }
      res2.forEach((item) => {
        if (item.mType === "SI")
          lMasters.SI = item.mdata.filter(
            (item1, index, self) =>
              index ===
              self.findIndex((obj) => obj.mValue === item1.mValue && obj.mType === item1.mType)
          );
        if (item.mType === "Type")
          lMasters.TripType = item.mdata.filter(
            (item1, index, self) =>
              index ===
              self.findIndex((obj) => obj.mValue === item1.mValue && obj.mType === item1.mType)
          );

        if (item.mType === "Region")
          lMasters.Geography = item.mdata.filter(
            (item1, index, self) =>
              index ===
              self.findIndex((obj) => obj.mValue === item1.mValue && obj.mType === item1.mType)
          );
      });
      // setDto({ ...lDto });

      const geo = lDto.Geography;
      const res5 = await getMasterData1();
      if (geo === "APAC") {
        res5.forEach((item) => {
          if (item.mType === "APAC") {
            lMasters.Country = item.mdata;
          }
        });
      } else if (geo === "WWIC") {
        res5.forEach((item) => {
          if (item.mType === "Worldwide") {
            lMasters.Country = item.mdata;
          }
        });
      } else if (geo === "WWEU") {
        res5.forEach((item) => {
          if (item.mType === "Worldwide Excluding US/Canada") {
            lMasters.Country = item.mdata;
          }
        });
      }
    }
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const CallBenifitdata = async (e, v) => {
    if (v === null) lDto.SumInsured = "";
    lDto.SumInsured = v.mValue;
    if (dto.Geography === "APAC") {
      lDto.ProductCode = "AsiaPacific";
      lDto.ProductId = lMasters.productcode1;
    } else if (dto.Geography === "WWEU") {
      lDto.ProductCode = "WorldWide Excl USA-Canada";
      lDto.ProductId = lMasters.productcode6;
    } else if (dto.Geography === "WWIC") {
      if (
        dto.Display_Name === "Basic Student Travel - WWIC /WWEU" ||
        dto.Display_Name === "Comprehensive Student Travel -WWIC /WWEU"
      ) {
        lDto.ProductCode = "Student Travel";
        lDto.ProductId = lMasters.productcode4;
      } else {
        lDto.ProductCode = "WorldWide";
        lDto.ProductId = lMasters.productcode5;
      }
    }

    if (dto.TripType !== "" && dto.SumInsured !== "" && dto.Geography !== "" && dto.Plan !== "") {
      const obj1 = {
        productCode: dto.ProductCode,
        planType: dto.Plan,
        filterCriteria: [
          { SI: dto.SumInsured, Type: dto.TripType, Region: dto.Geography, currency: "USD" },
        ],
        isFilterMemberWise: false,
        setBenefitMemberWise: false,
        insurableItems: null,
        // groupId: dto.Temp.GroupID,
      };
      const res1 = await getCoverBenfitData(obj1);
      lMasters.BenifitList = res1.finalResult.benefits;
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const onSendProposalLink = async () => {
    localStorage.setItem("patmentMethodType", "false");
    const link = await sendProposalLink(lDto.ProposalNo, lDto.ProposerDetails.EmailId);
    // debugger; // eslint-disable-line
    //
    console.log("link", link);
    if (link.status === 1) {
      swal
        .fire({
          icon: "success",
          text: "Payment link has been shared with customer",
          confirmButtonText: "OK",
          confirmButtonColor: "#0079CE",
          allowOutsideClick: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            Navigate("/Retail/NBHome");
            // Navigate("/redirectToRetail?prodCode=NBTravel1&prodLabel=NB&url=/retail");
            // window.location.reload();
            // redirecttohome();
          }
        });
    }
    if (link.status !== 1) {
      swal.fire({
        icon: "error",
        text: "Failed to sent Email",
        confirmButtonColor: "#0079CE",
      });
    }
  };

  const [Paymentdetailss, setPaymentdetailss] = useState("");
  const [transactionID, settransactionID] = useState();
  const [Successurl, setSuccessurl] = useState();
  const [Failureurl, setFailureurl] = useState();
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const onProceedtoPayment = async () => {
    const tDto = { ...dto };
    const ProposalNo = objectPath.get(dto, `ProposalNo`);
    // console.log("Procheck", masters.ProposalNo);
    console.log("Procheck1", ProposalNo);

    const premiumamount = objectPath.get(dto, `PremiumDetail.TotalPremium`);

    const resp = await fetchPaymentURL(lDto.ProductId, ProposalNo, premiumamount);
    console.log("hojayegaablagtahe", resp);
    setPaymentdetailss(resp);
    console.log("paymentdetailschek", Paymentdetailss);
    settransactionID(resp.transactionID);
    console.log("MilgayaKya", transactionID);
    setSuccessurl(resp.surl);
    console.log("yetoagaya", Successurl);
    objectPath.set(dto, "PremiumDetail.transectionID", resp.transactionID);
    objectPath.set(dto, "PremiumDetail.Successurl", resp.surl);
    setFailureurl(resp.furl);
    console.log("yevaya", Failureurl);
    const pay = await makePayment(tDto);
    console.log("payment", pay);
  };

  const onTravellerDOB = (e, v, i1) => {
    lDto.InsurableItem[0].RiskItems[i1].DOB = v;
    const EDate = dto.PolicyStartDate.split("-");
    const PDATE = `${EDate[1]}-${EDate[2]}-${EDate[0]}`;
    const SSDate = dto.TripStartDate.split("-");
    const TDATE = `${SSDate[1]}-${SSDate[2]}-${SSDate[0]}`;
    if (dto.TripType === "MultiTrip") {
      const age = AgeCalculator1(new Date(e), new Date(PDATE));
      lDto.Temp.age[i1] = age;
    } else if (dto.TripType === "SingleTrip" || dto.TripType === "StudentTravel") {
      const age = AgeCalculator1(new Date(e), new Date(TDATE));
      lDto.Temp.age[i1] = age;
    }
    setDto({ ...lDto });
  };

  const onNomineeDOB = (e, v) => {
    // debugger;
    lDto.NomineeDetails[0].NomineeDOB = v;
    const EDate = dto.PolicyStartDate.split("-");
    const PDATE = `${EDate[1]}-${EDate[2]}-${EDate[0]}`;
    const SSDate = dto.TripStartDate.split("-");
    const TDATE = `${SSDate[1]}-${SSDate[2]}-${SSDate[0]}`;
    if (dto.TripType === "MultiTrip") {
      const NODate = diffDaysCalculator(new Date(e), new Date(PDATE));
      const age = NODate / 365.000684931507;
      lDto.Temp.agee = age;
    } else if (dto.TripType === "SingleTrip" || dto.TripType === "StudentTravel") {
      const NODate = diffDaysCalculator(new Date(e), new Date(TDATE));
      const age = NODate / 365.000684931507;
      lDto.Temp.agee = age;
    }
    setDto({ ...lDto });
  };

  const onClickAllyesOrno = (e, v, p) => {
    const ri = dto.InsurableItem[0].RiskItems;
    lDto.InsurableItem[0].RiskItems[p].Clickyesorno = v;
    ri.forEach((x, o) => {
      if (o === p) {
        console.log("ssssss", p);
        x.Questionaire.forEach((x1, i1) => {
          if (i1 !== 7) {
            lDto.InsurableItem[0].RiskItems[p].Questionaire[i1].Answer = v;
          }
        });
      }
    });
    setDto({ ...lDto });
  };

  const settripstartdatefunc = (e, v) => {
    if (v === "") {
      lDto.PolicyStartDate = "";
      lDto.TripStartDate = "";
    } else {
      lDto.TripStartDate = v;
      lDto.PolicyStartDate = v;
    }
    lDto.NOOfDays = "";
    lDto.TripEndDate = "";

    setDto({ ...lDto });
  };

  const settripdatefunc = (e, v) => {
    if (v === "") {
      lDto.PolicyEndDate = "";
      lDto.TripEndDate = "";
      lDto.NOOfDays = "";
    } else {
      lDto.TripEndDate = v;
      lDto.PolicyEndDate = v;

      const TSD = dto.TripStartDate;
      const TED = dto.TripEndDate;

      if (TSD !== undefined && TSD !== "" && TED !== undefined && TED !== "") {
        const NOD = diffDaysCalculator(new Date(TSD), new Date(TED)) + 1;
        lDto.NOOfDays = NOD;
      }

      if (dto.NOOfDays > 180) {
        swal.fire({
          icon: "error",
          text: "Maximum limit of travel days is 180 days ",
          timer: 3000,
          showConfirmButton: false,
        });

        lDto.PolicyEndDate = "";
        lDto.TripEndDate = "";
        lDto.NOOfDays = "";
      }
    }
    setDto({ ...lDto });
  };
  const IsPan1 = (e) => {
    lDto.ProposerDetails.PanNo = e.target.value.toUpperCase();
    setDto({ ...dto });
  };

  const IsPass = (e1, i) => {
    lDto.InsurableItem[0].RiskItems[i].PassportNo = e1.target.value.toUpperCase();
    setDto({ ...dto });
  };
  const onSameAddress = (e) => {
    lDto.ProposerDetails.SameasCommunicationAddress = e.target.value;
    if (e.target.value === "Yes") {
      lDto.ProposerDetails.PermanentAddress.AddressLine1 =
        lDto.ProposerDetails.CommunicationAddress.AddressLine1;
      lDto.ProposerDetails.PermanentAddress.AddressLine2 =
        lDto.ProposerDetails.CommunicationAddress.AddressLine2;
      lDto.ProposerDetails.PermanentAddress.AddressLine3 =
        lDto.ProposerDetails.CommunicationAddress.AddressLine3;
      lDto.ProposerDetails.PermanentAddress.State = lDto.ProposerDetails.CommunicationAddress.State;
      lDto.ProposerDetails.PermanentAddress.District =
        lDto.ProposerDetails.CommunicationAddress.District;
      lDto.ProposerDetails.PermanentAddress.CityDistrict =
        lDto.ProposerDetails.CommunicationAddress.CityDistrict;
      lDto.ProposerDetails.PermanentAddress.Pincode =
        lDto.ProposerDetails.CommunicationAddress.Pincode;
    }
    if (e.target.value === "No") {
      lDto.ProposerDetails.PermanentAddress.AddressLine1 = "";
      lDto.ProposerDetails.PermanentAddress.AddressLine2 = "";
      lDto.ProposerDetails.PermanentAddress.AddressLine3 = "";
      lDto.ProposerDetails.PermanentAddress.State = "";
      lDto.ProposerDetails.PermanentAddress.District = "";
      lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      lDto.ProposerDetails.PermanentAddress.Pincode = "";
    }
    setDto({ ...dto });
  };

  const onNomAddress = (e) => {
    lDto.NomineeDetails[0].SameasCommunicationAddress = e.target.value;
    if (e.target.value === "Yes") {
      lDto.NomineeDetails[0].NomineeAddressLine1 =
        lDto.ProposerDetails.CommunicationAddress.AddressLine1;
      lDto.NomineeDetails[0].NomineeAddressLine2 =
        lDto.ProposerDetails.CommunicationAddress.AddressLine2;
      lDto.NomineeDetails[0].NomineeAddressLine3 =
        lDto.ProposerDetails.CommunicationAddress.AddressLine3;
      lDto.NomineeDetails[0].NomineeState = lDto.ProposerDetails.CommunicationAddress.State;
      lDto.NomineeDetails[0].NomineeDistrict = lDto.ProposerDetails.CommunicationAddress.District;
      lDto.NomineeDetails[0].NomineeCity = lDto.ProposerDetails.CommunicationAddress.CityDistrict;
      lDto.NomineeDetails[0].NomineePincode = lDto.ProposerDetails.CommunicationAddress.Pincode;
    }
    if (e.target.value === "No") {
      lDto.NomineeDetails[0].NomineeAddressLine1 = "";
      lDto.NomineeDetails[0].NomineeAddressLine2 = "";
      lDto.NomineeDetails[0].NomineeAddressLine3 = "";
      lDto.NomineeDetails[0].NomineeState = "";
      lDto.NomineeDetails[0].NomineeDistrict = "";
      lDto.NomineeDetails[0].NomineeCity = "";
      lDto.NomineeDetails[0].NomineePincode = "";
    }
    // if (lDto.documentDetails[1].DocName === "" && lDto.documentDetails[2].DocName === "") {
    //   objectPath.set(lDto, "documentDetails", []);
    // }
    setDto({ ...lDto });
  };

  const onSelectTravelers = (e, v) => {
    const arr1 = [];
    const arr2 = [];
    const arr3 = [];
    const arr4 = [];

    lDto.NOOfTravellingMembers = v.mValue;
    const NOT = arrayRange(1, parseInt(v.mID, 10), 1);

    NOT.forEach(() => {
      arr1.push({ ...riskDetails(), Questionaire: [...Questionaire()] });
    });
    lDto.InsurableItem[0].RiskItems = arr1;

    NOT.forEach((x, i) => {
      lDto.Temp.age[i] = "";
      arr2.push({ name: `Insured Details ${x}`, visible: true });
      arr3.push(
        {
          type: "MDDatePicker",
          visible: dto.TripType === "SingleTrip" || dto.TripType === "MultiTrip",
          label: `Traveller ${x} DOB`,
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${i}.DOB`,
          dateFormat: "Y-m-d",
          required: true,
          maxDate: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,
          minDate: `${new Date().getFullYear() - 70}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,
          customOnChange: (e1, v1) => onTravellerDOB(e1, v1, i),
        },
        {
          type: "MDDatePicker",
          visible: dto.TripType === "StudentTravel",
          label: `Traveller ${x} DOB`,
          spacing: 3,
          path: `InsurableItem.0.RiskItems.${i}.DOB`,
          dateFormat: "Y-m-d",
          required: true,
          maxDate: `${new Date().getFullYear() - 12}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,
          minDate: `${new Date().getFullYear() - 60}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,
          customOnChange: (e1, v1) => onTravellerDOB(e1, v1, i),
        },
        {
          type: "Input",
          label: `Traveller ${x} Age`,
          visible: true,
          path: `Temp.age.${i}`,
          InputProps: { disabled: true },
        }
      );
      arr4.push([
        {
          type: "Input",
          required: true,
          label: "Name",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.Name`,
          onChangeFuncs: [IsName],
        },
        {
          type: "AutoComplete",
          label: " Gender",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.Gender`,
          options: masters.Gender,
          required: true,
        },
        {
          type: "MDDatePicker",
          required: true,
          label: "Date of Birth",
          visible: true,
          path: `InsurableItem.0.RiskItems.${i}.DOB`,
          dateFormat: "Y-m-d",
          disableOnReset: true,
          InputProps: { disabled: true },
        },
        {
          type: "Input",
          required: true,
          label: "Age",
          visible: true,
          disableOnReset: true,
          path: `Temp.age.${i}`,
          InputProps: { disabled: true },
        },
        {
          type: "AutoComplete",
          required: true,
          label: "Relationship with Proposer",
          path: `InsurableItem.0.RiskItems.${i}.relationShipToProposer`,
          visible: true,
          options: masters.RelationInsured,
        },
        {
          type: "Input",
          required: true,
          label: "Passport Number",
          path: `InsurableItem.0.RiskItems.${i}.PassportNo`,
          visible: true,
          customOnChange: (e1) => IsPass(e1, i),
          onBlurFuncs: ["IsPassport"],
          InputProps: { maxLength: 8 },
        },
        {
          type: "AutoComplete",
          // required: true,
          label: "Visa Type",
          path: `InsurableItem.0.RiskItems.${i}.VisaType`,
          visible: true,
          options: masters.VisaType,
        },
        {
          type: "Input",
          required: true,
          label: "Nationality",
          path: `InsurableItem.0.RiskItems.${i}.Nationality`,
          visible: true,
          InputProps: { disabled: true },
          disableOnReset: true,
        },
        {
          type: "RadioGroup",
          // required: true,
          justifyContent: "space-between",
          visible: true,
          radioLabel: {
            label: "Click Yes or No",
            labelVisible: true,
          },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ], // value: `InsurableItem.0.RiskItems.${i}.Questionaire.0.Answer`, // value: ` ClickYesorNo`,
          path: `InsurableItem.0.RiskItems.${i}.Clickyesorno`,
          spacing: 12,
          customOnChange: (e1, v1) => onClickAllyesOrno(e1, v1, i),
        },
        {
          type: "RadioGroup",
          justifyContent: "space-between",
          required: true,
          visible: true,
          radioLabel: {
            label:
              "Heart disease like Heart attack,Heart faliure,lsechemic heart disease or Coronary heart disease,Angina ect. ",
            labelVisible: true,
          },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No ", value: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.0.Answer`,
          spacing: 12,
        },
        {
          type: "RadioGroup",
          required: true,
          justifyContent: "space-between",
          visible: true,
          radioLabel: {
            label: "Tumor, Cancer of any organ,Leukemia,Lymphoma,Sarcoma ",
            labelVisible: true,
          },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No ", value: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.1.Answer`,
          spacing: 12,
        },
        {
          type: "RadioGroup",
          required: true,
          justifyContent: "space-between",
          visible: true,
          radioLabel: {
            label: "Major organ failure (Kidney,Liver,Heart,Lungs etc.)",
            labelVisible: true,
          },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No ", value: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.2.Answer`,
          spacing: 12,
        },
        {
          type: "RadioGroup",
          required: true,
          justifyContent: "space-between",
          visible: true,
          radioLabel: {
            label: "Stroke,Encephalopathy, Brain abscess, or any neurological disease",
            labelVisible: true,
          },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No ", value: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.3.Answer`,
          spacing: 12,
        },
        {
          type: "RadioGroup",
          required: true,
          justifyContent: "space-between",
          visible: true,
          radioLabel: {
            label: "Pulmonary fibrosis,collapse of lungs or Interstital lung disease (ILD)",
            labelVisible: true,
          },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No ", value: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.4.Answer`,
          spacing: 12,
        },
        {
          type: "RadioGroup",
          required: true,
          justifyContent: "space-between",
          visible: true,
          radioLabel: {
            label: "Hepatitis B or C, Chronic liver disease,Crohn's disease,Ulcerative colitis",
            labelVisible: true,
          },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No ", value: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.5.Answer`,
          spacing: 12,
        },
        {
          type: "RadioGroup",
          required: true,
          justifyContent: "space-between",
          visible: true,
          radioLabel: {
            label: "Any anaemia other than iron deficiency anaemia",
            labelVisible: true,
          },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No ", value: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.6.Answer`,
          spacing: 12,
        },

        {
          type: "RadioGroup",
          required: true,
          justifyContent: "space-between",
          visible: true,
          radioLabel: {
            label: "Any other medical details/declarations",
            labelVisible: true,
          },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No ", value: "No" },
          ],
          path: `InsurableItem.0.RiskItems.${i}.Questionaire.7.Answer`,
          spacing: 12,
        },
        {
          type: "Input",
          required: true,
          spacing: 6,
          label: "Any other medical details/declarations",
          value: objectPath.get(masters, `Otherdetails.${i}`),
          visible: "visibleDetails",
          visibleDetails: {
            path: `InsurableItem.0.RiskItems.${i}.Questionaire.7.Answer`,
            value: "Yes",
          },
        },
      ]);
    });
    lMasters.MemberAccordionArr = arr2;
    lMasters.MembersDateComArr = arr3;
    lMasters.InsuredComArr = arr4;
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onCheckboxDefaultAddr = async (e) => {
    // debugger;
    lDto.Temp.CheckboxDefaultAddr = e.target.checked ? "Yes" : "No";
    lDto.Temp.CheckboxDifferentAddr = "";
    if (lDto.Temp.CheckboxDefaultAddr === "Yes") {
      lDto.ProposerDetails.PermanentAddress.Pincode = lDto.ckycResponce.PinCode;
      lDto.ProposerDetails.PermanentAddress.AddressLine1 = lDto.ckycResponce.Address1;
      lDto.ProposerDetails.PermanentAddress.CityDistrict = lDto.ckycResponce.city1;
      lDto.ProposerDetails.PermanentAddress.District = lDto.ckycResponce.District1;
      lDto.ProposerDetails.PermanentAddress.State = lDto.ckycResponce.State1;
    }
    if (lDto.Temp.CheckboxDefaultAddr === "No") {
      lDto.ProposerDetails.PermanentAddress.AddressLine1 = "";
      lDto.ProposerDetails.PermanentAddress.AddressLine2 = "";
      lDto.ProposerDetails.PermanentAddress.AddressLine3 = "";
      lDto.ProposerDetails.PermanentAddress.State = "";
      lDto.ProposerDetails.PermanentAddress.District = "";
      lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      lDto.ProposerDetails.PermanentAddress.Pincode = "";
    }
    setDto({ ...lDto });
  };

  const onCheckboxDifferentAddr = async (e) => {
    // debugger;
    lDto.Temp.CheckboxDifferentAddr = e.target.checked ? "Yes" : "No";
    lDto.Temp.CheckboxDefaultAddr = "";
    if (lDto.Temp.CheckboxDifferentAddr === "Yes") {
      lDto.ProposerDetails.PermanentAddress.AddressLine1 = "";
      lDto.ProposerDetails.PermanentAddress.AddressLine2 = "";
      lDto.ProposerDetails.PermanentAddress.AddressLine3 = "";
      lDto.ProposerDetails.PermanentAddress.State = "";
      lDto.ProposerDetails.PermanentAddress.District = "";
      lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      lDto.ProposerDetails.PermanentAddress.Pincode = "";
    }
    setDto({ ...lDto });
  };

  const onProposerStateSelect = async (e, v) => {
    if (v === null) {
      lDto.ProposerDetails.CommunicationAddress.State = "";
      lDto.ProposerDetails.CommunicationAddress.District = "";
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      lDto.ProposerDetails.CommunicationAddress.Pincode = "";
    } else {
      lDto.ProposerDetails.CommunicationAddress.State = v.mValue;
      lDto.ProposerDetails.CommunicationAddress.District = "";
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      lDto.ProposerDetails.CommunicationAddress.Pincode = "";
      setDto({ ...lDto });
      console.log("ggggggggggg", masters.productcode2);
      const res3 = await GetProdPartnermasterData(masters.productcode2, "NBDistrictMaster", {
        StateID: v.mID,
      });
      lMasters.ProposerCommDistrict = [...res3];
    }
    setMasters({ ...lMasters });
  };
  const onProposerState1Select = async (e, v) => {
    if (v === null) {
      lDto.ProposerDetails.PermanentAddress.State = "";
      lDto.ProposerDetails.PermanentAddress.District = "";
      lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      lDto.ProposerDetails.PermanentAddress.Pincode = "";
    } else {
      lDto.ProposerDetails.PermanentAddress.State = v.mValue;
      lDto.ProposerDetails.PermanentAddress.District = "";
      lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      lDto.ProposerDetails.PermanentAddress.Pincode = "";
      setDto({ ...lDto });
      const res3 = await GetProdPartnermasterData(masters.productcode2, "NBDistrictMaster", {
        StateID: v.mID,
      });
      lMasters.ProposerComm1District = [...res3];
    }
    setMasters({ ...lMasters });
  };

  const onProposerState2Select = async (e, v) => {
    if (v === null) {
      lDto.NomineeDetails[0].NomineeState = "";
      lDto.NomineeDetails[0].NomineeDistrict = "";
      lDto.NomineeDetails[0].NomineeCity = "";
      lDto.NomineeDetails[0].NomineePincode = "";
    } else {
      lDto.NomineeDetails[0].NomineeState = v.mValue;
      lDto.NomineeDetails[0].NomineeDistrict = "";
      lDto.NomineeDetails[0].NomineeCity = "";
      lDto.NomineeDetails[0].NomineePincode = "";
      setDto({ ...lDto });
      const res3 = await GetProdPartnermasterData(masters.productcode2, "NBDistrictMaster", {
        StateID: v.mID,
      });
      lMasters.NomineeDistrict = [...res3];
    }
    setMasters({ ...lMasters });
  };

  const onProposerDistrictSelect = async (e, v) => {
    if (v === null) {
      lDto.ProposerDetails.CommunicationAddress.District = "";
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      lDto.ProposerDetails.CommunicationAddress.Pincode = "";
    } else {
      lDto.ProposerDetails.CommunicationAddress.District = v.mValue;
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      lDto.ProposerDetails.CommunicationAddress.Pincode = "";
      setDto(lDto);

      const res5 = await GetProdPartnermasterData(masters.productcode2, "NBCityMaster", {
        DistrictID: v.mID,
      });

      lMasters.ProposerCommCity = [...res5];
      setMasters({ ...lMasters });
    }
  };

  const onProposerDistrict1Select = async (e, v) => {
    if (v === null) {
      lDto.ProposerDetails.PermanentAddress.District = "";
      lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      lDto.ProposerDetails.PermanentAddress.Pincode = "";
    } else {
      lDto.ProposerDetails.PermanentAddress.District = v.mValue;
      lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      lDto.ProposerDetails.PermanentAddress.Pincode = "";
      setDto(lDto);

      const res5 = await GetProdPartnermasterData(masters.productcode2, "NBCityMaster", {
        DistrictID: v.mID,
      });

      lMasters.ProposerComm1City = [...res5];
      setMasters({ ...lMasters });
    }
  };

  const onProposerDistrict2Select = async (e, v) => {
    if (v === null) {
      lDto.NomineeDetails[0].NomineeDistrict = "";
      lDto.NomineeDetails[0].NomineeCity = "";
      lDto.NomineeDetails[0].NomineePincode = "";
    } else {
      lDto.NomineeDetails[0].NomineeDistrict = v.mValue;
      lDto.NomineeDetails[0].NomineeCity = "";
      lDto.NomineeDetails[0].NomineePincode = "";
      setDto(lDto);

      const res5 = await GetProdPartnermasterData(masters.productcode2, "NBCityMaster", {
        DistrictID: v.mID,
      });

      lMasters.NomineeCity = [...res5];
      setMasters({ ...lMasters });
    }
  };

  const onProposerCitySelect = async (e, v) => {
    if (v === null) {
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      lDto.ProposerDetails.CommunicationAddress.Pincode = "";
    } else {
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = v.mValue;
      lDto.ProposerDetails.CommunicationAddress.Pincode = "";
      setDto(lDto);

      const res6 = await GetProdPartnermasterData(masters.productcode2, "NBPincodeMaster", {
        CityID: v.mID,
      });
      lMasters.ProposerCommPincode = [...res6];
      setMasters({ ...lMasters });
    }
  };
  const onProposerCity1Select = async (e, v) => {
    if (v === null) {
      lDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      lDto.ProposerDetails.PermanentAddress.Pincode = "";
    } else {
      lDto.ProposerDetails.PermanentAddress.CityDistrict = v.mValue;
      lDto.ProposerDetails.PermanentAddress.Pincode = "";
      setDto(lDto);

      const res6 = await GetProdPartnermasterData(masters.productcode2, "NBPincodeMaster", {
        CityID: v.mID,
      });
      lMasters.ProposerComm1Pincode = [...res6];
      setMasters({ ...lMasters });
    }
  };

  const onProposerCity2Select = async (e, v) => {
    if (v === null) {
      lDto.NomineeDetails[0].NomineeCity = "";
      lDto.NomineeDetails[0].NomineePincode = "";
    } else {
      lDto.NomineeDetails[0].NomineeCity = v.mValue;
      lDto.NomineeDetails[0].NomineePincode = "";
      setDto(lDto);

      const res6 = await GetProdPartnermasterData(masters.productcode2, "NBPincodeMaster", {
        CityID: v.mID,
      });
      lMasters.NomineePincode = [...res6];
      console.log("pincode", lMasters.NomineePincode);
      setMasters({ ...lMasters });
    }
  };
  const UploadDocument = async (file, type) => {
    const formData = new FormData();
    formData.append(file.name, file, file.name);
    const uploadres = await Documentuploadaws(formData);
    console.log("111", uploadres);
    if (uploadres.status === 1) {
      swal.fire({
        icon: "success",
        text: `Document Uploaded Successfully`,
        confirmButtonColor: "#0079CE",
        allowOutsideClick: false,
      });
    }
    if (type === "_Pan") {
      lMasters.flags.panUpload = true;
      lDto.documentDetails[0].DocName = uploadres.fileName;
      lDto.documentDetails[0].DocId = uploadres.docid;
      setDto({ ...lDto });
    }
    if (type === "_PassportFront") {
      lMasters.flags.passportFrontUpload = true;
      lDto.documentDetails[1].DocName = uploadres.fileName;
      lDto.documentDetails[1].DocId = uploadres.docid;
      setDto({ ...lDto });
    }
    if (type === "_PassportBack") {
      lMasters.flags.passportBackUpload = true;
      lDto.documentDetails[2].DocName = uploadres.fileName;
      lDto.documentDetails[2].DocId = uploadres.docid;
      setDto({ ...lDto });
    }
  };
  const handleFileUpload = async (event, type) => {
    // debugger;
    await UploadDocument(event.target.files[0], type);
    console.log("files", event.target.files[0]);
  };
  const handleFiledelete = async (event, type) => {
    if (type === "_Pan") {
      lMasters.flags.panUpload = false;
      ref.current.value = "";
      lDto.documentDetails[0].DocName = "";
      lDto.documentDetails[0].DocId = "";
      setDto({ ...lDto });
    }
    if (type === "_PassportFront") {
      lMasters.flags.passportFrontUpload = false;
      ref2.current.value = "";
      lDto.documentDetails[1].DocName = "";
      lDto.documentDetails[1].DocId = "";
      setDto({ ...lDto });
    }

    if (type === "_PassportBack") {
      ref3.current.value = "";
      lMasters.flags.passportBackUpload = false;
      lDto.documentDetails[2].DocName = "";
      lDto.documentDetails[2].DocId = "";
      setDto({ ...lDto });
    }
  };
  const onAllyesOrno = (e) => {
    const ri = dto.InsurableItem[0].RiskItems;
    lDto.PreExistingDisease = e.target.value;
    ri.forEach((x, i) => {
      if (dto.PreExistingDisease === "Yes") {
        x.Questionaire.forEach((x1, i1) => {
          if (i1 !== 7) {
            lDto.InsurableItem[0].RiskItems[i].Questionaire[i1].Answer = "Yes";
          }
        });
      } else if (dto.PreExistingDisease === "No") {
        x.Questionaire.forEach((x1, i1) => {
          if (i1 !== 7) {
            lDto.InsurableItem[0].RiskItems[i].Questionaire[i1].Answer = "No";
          }
        });
      }
    });
    setDto({ ...lDto });
  };

  const onInitiateKyc = async () => {
    lMasters.flags.onclickeKYC = true;
    if (dto.ProposerDetails.PanNo === "") {
      swal.fire({
        icon: "error",
        text: `Please Provide Pan Number before Initiating KYC `,
        timer: 3000,
        showConfirmButton: false,
      });
      lMasters.flags.Kyc = false;
      //
    }
    if (dto.ProposerDetails.PanNo !== "") {
      lMasters.flags.onclickeKYC = false;
      const obj1 = {
        Pan: dto.ProposerDetails.PanNo,
        dob: dto.ProposerDetails.DOB.split("-").reverse().join("-"),
        partnername: "Agency",
        userName: "NIVABUPA",
        password: "M@xbup@!2#",
        athorizationToken: "11111",
        uri: "https://otc1.nivabupa.com/t/api/KYC/GenerateToken",
      };

      setBackDropFlag(true);
      const res1 = await CkycResponse(obj1);
      setBackDropFlag(false);
      lMasters.flags.onclickeKYC = true;
      console.log("ckyc", res1);

      lDto.ckycResponce = { ...lDto.ckycResponce, ...res1.data };
      if (res1.data.Status === "Success") {
        lDto.ProposerDetails.CKYCNo = res1.data.CKYCID;
      } else {
        lDto.ProposerDetails.CKYCNo = "";
      }
      if (lDto.ckycResponce.Status === "Success") {
        const obj2 = {
          Pincode: lDto.ckycResponce.PinCode,
        };
        const City = await GetProdPartnermasterData(masters.productcode2, "NBRCityMaster", obj2);
        console.log("gotcity1", City);
        const obj3 = {
          CityID: City[0].mID,
        };
        const Taluk = await GetProdPartnermasterData(
          masters.productcode2,
          "NBRDistrictMaster",
          obj3
        );
        console.log("gotcity2", Taluk);

        const obj4 = {
          DistrictID: Taluk[0].mId,
        };
        const District = await GetProdPartnermasterData(
          masters.productcode2,
          "NBRStateMaster",
          obj4
        );
        console.log("gotdistrict", District);

        const obj5 = {
          StateID: District[0].mID,
        };
        const State = await GetProdPartnermasterData(
          masters.productcode2,
          "NBRCountryMaster",
          obj5
        );
        // const State = await GetProdPartnermasterData(698, "NBRStateMaster", obj4);
        console.log("gotdistrict", State);

        lDto.ckycResponce.city1 = Taluk[0].mValue;
        lDto.ckycResponce.District1 = District[0].mValue;
        lDto.ckycResponce.State1 = State[0].mValue;
        swal.fire({
          icon: "success",
          text: "cKYC has been initiated successfully",
          confirmButtonColor: "#0079CE",
          allowOutsideClick: false,
        });
        lMasters.flags.ckycStatus = true;
        lMasters.flags.onclickeKYC = false;
        lMasters.flags.Status = true;
      } else {
        swal.fire({
          icon: "error",
          text: `No cKYC details found for the given proposer`,
          confirmButtonColor: "#0079CE",
          allowOutsideClick: false,
        });
        // lMasters.flags.onclickeKYC = false;
        lMasters.flags.Status = true;
      }
    }
    if (lDto.ckycResponce.Status !== "Success") {
      lDto.ckycResponce.CKYCID = "";
      lMasters.flags.onclickeKYC = false;
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const checkLeap = (psd1) => {
    console.log("qqq", psd1);
    const year = Number(psd1[0]);
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 366;
    }
    return 365;
  };
  const onPolicySDate = (e, v) => {
    lDto.PolicyStartDate = v;
    lDto.TripStartDate = v;
    const psd1 = dto.PolicyStartDate.split("-");
    const days = checkLeap(psd1);
    const nod1 = addDays(`${psd1[1]}-${psd1[2]}-${psd1[0]}`, days).split("-");
    lDto.PolicyEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
    lDto.TripEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
    setDto({ ...lDto });
  };
  const onTripduration = (e, v) => {
    if (dto.TripType === "MultiTrip") {
      console.log("newtrip", v);
      lDto.TripDuration = v.mValue;
      lDto.NOOfDays = v.mID;
    }
    if (dto.TripType === "StudentTravel") {
      lDto.TripDuration = v.mValue;
      lDto.NOOfDays = v.mID;
      console.log("mID", v.mID);
      const days1 = v.mID;
      const TSD = lDto.TripStartDate.split("-");
      const nod1 = addDays(`${TSD[1]}-${TSD[2]}-${TSD[0]}`, days1).split("-");
      lDto.TripEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
      lDto.PolicyEndDate = `${nod1[2]}-${nod1[0]}-${nod1[1]}`;
    }
    setDto({ ...lDto });
  };
  let data = [];
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Input",
            required: true,
            label: "Product",
            visible: true,
            spacing: 3,
            path: "ProductName",
            defaultValue: "Travel Assure",
            InputProps: { disabled: true },
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Plan",
            visible: true,
            path: "Display_Name",
            spacing: 3,
            required: true,
            options: masters.Plans,
            optionLabel: "displayName",
            customOnChange: onPlanSelect,
          },
          {
            type: "AutoComplete",
            label: "Trip Type",
            visible: true,
            spacing: 3,
            path: `TripType`,
            options: masters.TripType,
            required: true,
          },
          {
            type: "AutoComplete",
            label: " SumInsured",
            visible: true,
            spacing: 3,
            path: `SumInsured`,
            options: masters.SI,
            required: true,
            customOnChange: (e, v) => CallBenifitdata(e, v),
          },
          {
            type: "AutoComplete",
            label: "Country of Visit",
            visible: true,
            spacing: 6,
            path: `ListOfDestination`,
            options: masters.Country,
            required: true,
            multiple: true,
            disableOnReset: false,
          },
          {
            type: "AutoComplete",
            label: "Geography",
            visible: false,
            path: `Geography`,
            spacing: 3,
            options: masters.Geography,
            // customOnChange: CallBenifitdata,
            required: true,
          },
        ],
        [
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            rowPerPage: 100,
            columns: [
              { field: "CoverName", headerName: "Benefit Name", width: 220, headerAlign: "center" },
              {
                field: "Deductible",
                headerName: "Deductible",
                width: 150,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Value",
                headerName: "Sum Insured",
                width: 150,
                headerAlign: "center",
                align: "center",
              },

              {
                field: "AddOptionalCovers",
                headerName: "Add Optional Covers",
                width: 170,
                headerAlign: "center",
                renderCell: (param) => (
                  <MDBox>
                    {param.row.IsOptional === true && (
                      <RadioGroup row value={param.row.AddOptionalCovers}>
                        <FormControlLabel label="Yes" value="a" control={<Radio />} />
                        <FormControlLabel label="No" value="b" control={<Radio />} />
                      </RadioGroup>
                    )}
                  </MDBox>
                ),
              },
            ],
            rowId: "BenefitID",
            // path: "Temp.BenifitList",
            value: dto.SumInsured === "" ? [] : masters.BenifitList,
          },
        ],
        [
          {
            type: "MDDatePicker",
            required: true,
            label: "Trip Start Date",
            visible: dto.TripType === "SingleTrip" || dto.TripType === "StudentTravel",
            path: `TripStartDate`,
            dateFormat: "Y-m-d",
            minDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            customOnChange: (e, v) => settripstartdatefunc(e, v),
          },
          {
            type: "AutoComplete",
            label: "Trip Duration",
            visible: dto.TripType === "StudentTravel",
            path: "TripDuration",
            options: masters.TripDuration, // TripDuration,
            customOnChange: (e, v) => onTripduration(e, v),
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Trip Duration",
            visible: dto.TripType === "MultiTrip",
            path: "TripDuration",
            options: masters.TripDuration1, // TripDuration,
            customOnChange: (e, v) => onTripduration(e, v),
            required: true,
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Trip End Date",
            visible: dto.TripType === "SingleTrip",
            path: `TripEndDate`,
            dateFormat: "Y-m-d",
            minDate: dto.TripStartDate,
            maxDate: new Date(dto.TripStartDate).setDate(
              new Date(dto.TripStartDate).getDate() + 179
            ),
            InputProps: {
              disabled: dto.TripType === "StudentTravel",
            },
            customOnChange: (e, v) => settripdatefunc(e, v),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Trip End Date",
            visible: dto.TripType === "StudentTravel",
            path: `TripEndDate`,
            dateFormat: "Y-m-d",
            // minDate: objectPath.get(dto, "TripStartDate"),
            // maxDate: new Date(dto.TripStartDate).setDate(
            //   new Date(dto.TripStartDate).getDate() + 179
            // ),
            customOnChange: (e, v) => settripdatefunc(e, v),
            InputProps: {
              disabled: dto.TripType === "StudentTravel",
            },
          },
          {
            type: "Input",
            required: true,
            label: "No of Days",
            visible: dto.TripType === "SingleTrip",
            path: "NOOfDays",
            InputProps: { disabled: true },
          },

          {
            type: "MDDatePicker",
            required: true,
            label: "Policy start Date",
            visible: dto.TripType === "MultiTrip",
            path: `PolicyStartDate`,
            dateFormat: "Y-m-d",
            minDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            customOnChange: (e, v) => onPolicySDate(e, v),
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy End Date",
            dateFormat: "Y-m-d",
            visible: dto.TripType === "MultiTrip",
            path: `PolicyEndDate`,
            minDate: dto.PolicyStartDate,
            InputProps: { disabled: true },
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "No of Travellers",
            visible: dto.TripType === "SingleTrip" || dto.TripType === "MultiTrip",
            path: `NOOfTravellingMembers`,
            options: masters.NoOfTraveelerArr,
            required: true,
            readOnly: lDto.PolicyStartDate === "" || lDto.TripStartDate === "",
            customOnChange: onSelectTravelers,
          },
          {
            type: "AutoComplete",
            label: "No of Travellers",
            visible: dto.TripType === "StudentTravel",
            path: `NOOfTravellingMembers`,
            options: masters.NoOfTraveelerArr1,
            required: true,
            readOnly: lDto.PolicyStartDate === "" || lDto.TripStartDate === "",
            customOnChange: onSelectTravelers,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "",
          },
          ...masters.MembersDateComArr,

          //   ...noOfTravellerDatePicker,
        ],
        [
          {
            type: "MDDatePicker",
            required: true,
            label: "Proposer DOB",
            visible: true,
            path: `ProposerDetails.DOB`,
            dateFormat: "Y-m-d",
            maxDate: `${new Date().getFullYear() - 18}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            minDate: `${new Date().getFullYear() - 80}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
          },
          {
            type: "AutoComplete",
            label: "Proposer State",
            visible: true,
            path: `ProposerDetails.CommunicationAddress.State`,
            options: masters.ProposerCommState,
            required: true,
            customOnChange: onProposerStateSelect,
          },
          {
            type: "Input",
            required: true,
            label: "Email ID",
            visible: true,
            path: `ProposerDetails.EmailId`,
            onBlurFuncs: ["IsEmail"],
          },
          {
            type: "Input",
            required: true,
            label: "Mobile No",
            visible: true,
            path: `ProposerDetails.ContactNo`,
            onBlurFuncs: ["IsMobileNumber"],
            InputProps: { maxLength: 10 },
          },
        ],
        [
          {
            type: "RadioGroup",
            required: true,
            justifyContent: "space-between",
            visible: true,
            radioLabel: {
              label: "Does any of the travelers have Pre-Existing Medical Condition? ",
              color: "black",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No ", value: "No" },
            ],
            path: `PreExistingDisease`,
            spacing: 12,
            customOnChange: (e) => onAllyesOrno(e),
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Salutation",
            visible: true,
            path: `ProposerDetails.Salutation`,
            options: masters.Salutation,
            required: true,
          },
          {
            type: "Input",
            required: true,
            label: "Name",
            visible: true,
            path: `ProposerDetails.Name`,
            onChangeFuncs: [IsName],
          },
          {
            type: "AutoComplete",
            label: " Gender",
            visible: true,
            path: `ProposerDetails.Gender`,
            options: masters.Gender,
            required: true,
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Proposer Date of Birth",
            visible: true,
            path: `ProposerDetails.DOB`,
            dateFormat: "Y-m-d",
            InputProps: { disabled: true },
            disableOnReset: true,
          },
          {
            type: "Input",
            required: true,
            label: "Email",
            visible: true,
            path: `ProposerDetails.EmailId`,
            InputProps: { disabled: true },
            onBlurFuncs: ["IsEmail"],
            disableOnReset: true,
          },
          {
            type: "Input",
            required: true,
            label: "PAN No.",
            visible: true,
            path: `ProposerDetails.PanNo`,
            customOnChange: (e) => IsPan1(e),
            onBlurFuncs: ["IsPan"],
            InputProps: {
              maxLength: 10,
              disabled: lMasters.flags.Status === true,
            },
          },
          {
            type: "Input",
            required: true,
            label: "Mobile number",
            visible: true,
            path: `ProposerDetails.ContactNo`,
            InputProps: { disabled: true },
            // onBlurFuncs: [IsMobileNumber],
            disableOnReset: true,
          },

          {
            type: "Input",
            label: "Father Name",
            visible:
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.passportFrontUpload === true,
            path: `ProposerDetails.FatherName`,
            required: true,
            onChangeFuncs: [IsName],
          },
        ],
        [
          {
            type: "Input",
            required: true,
            label: "PAN No.",
            visible: true,
            path: `ProposerDetails.PanNo`,
            disableOnReset: true,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Typography",
            visible: false,
            spacing: 0,
            label: "",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Date of Birth",
            visible: true,
            path: `ProposerDetails.DOB`,
            dateFormat: "Y-m-d",
            InputProps: { disabled: true },
            disableOnReset: true,
          },
          {
            type: "Input",
            label: "CKYC Number",
            visible: true,
            path: `ProposerDetails.CKYCNo`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Custom",
            // visible: !topFlag.Kyc,
            spacing: 12,

            visible: true,
            return: (
              <MDBox>
                <MDBox
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <Grid container justifyContent="left" mt={2}>
                    <MDButton
                      onClick={onInitiateKyc}
                      disabled={dto.ProposerDetails.CKYCNo !== "" || lMasters.flags.Status === true}
                    >
                      Initiate KYC
                    </MDButton>

                    {/* <Backdrop
                      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={lMasters.flags.onclickeKYC}
                    >
                      <CircularProgress />
                    </Backdrop> */}
                  </Grid>
                </MDBox>
              </MDBox>
            ),
          },
          {
            type: "AutoComplete",
            label: "Title/Salutation",
            visible: lDto.ckycResponce.Status === "Success" && lDto.ckycResponce.CKYCID !== "",
            path: `ProposerDetails.Salutation`,
            // disableOnReset: true,
            readOnly: true,
          },
          {
            type: "Input",
            label: "First Name",
            visible: lDto.ckycResponce.Status === "Success",
            // disableOnReset: true,
            path: `ckycResponce.FirstName`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "Middle Name",
            // disableOnReset: true,
            visible: lDto.ckycResponce.Status === "Success",
            path: `ckycResponce.MiddleName`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "Input",
            label: "Last Name",
            // disableOnReset: true,
            visible: lDto.ckycResponce.Status === "Success",
            path: `ckycResponce.LastName`,
            InputProps: {
              readOnly: true,
              disabled: true,
            },
          },
          {
            type: "RadioGroup",
            visible: lDto.ckycResponce.Status === "Success",
            justifyContent: "space-between",
            radioLabel: {
              label: "Gender",
              labelVisible: true,
              // disableOnReset: true,
            },
            radioList: [
              { label: "Male", value: "M", disabled: true },
              { label: "Female ", value: "F", disabled: true },
              { label: "Others ", value: "O", disabled: true },
            ],
            path: `ckycResponce.Gender`,
            spacing: 6,
          },
          {
            type: "Typography",
            label: "Address 01",
            visible: lDto.ckycResponce.Status === "Success",
            spacing: 12,
            fontSize: 16,
          },
          {
            type: "Checkbox",
            visible: lDto.ckycResponce.Status === "Success",
            label: "Select Address 01 as Default Address",
            path: `Temp.CheckboxDefaultAddr`,
            // disableOnReset: true,
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 12,
            customOnChange: (e) => onCheckboxDefaultAddr(e),
          },
          {
            type: "Input",
            label: "Address Line",
            visible: lDto.ckycResponce.Status === "Success",
            path: `ckycResponce.Address1`,
            spacing: 6,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "State",
            visible: lDto.ckycResponce.Status === "Success",
            path: `ckycResponce.State1`,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "City",
            visible: lDto.ckycResponce.Status === "Success",
            path: `ckycResponce.city1`,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Input",
            label: "Pincode",
            visible: lDto.ckycResponce.Status === "Success",
            path: `ckycResponce.PinCode`,
            InputProps: {
              readOnly: true,
            },
          },
          {
            type: "Checkbox",
            visible: lDto.ckycResponce.Status === "Success",
            label: "Want to have different Address?",
            path: `Temp.CheckboxDifferentAddr`,
            checkedVal: "Yes",
            unCheckedVal: "No",
            spacing: 12,
            // disableOnReset: true,
            customOnChange: (e) => onCheckboxDifferentAddr(e),
          },
        ],
        [
          {
            type: "Typography",
            label: "Communication Address",
            visible: true,
            spacing: 12,
            fontSize: 15,
          },
          {
            type: "Input",
            required: true,
            label: "Address Line 1",
            visible: true,
            path: `ProposerDetails.CommunicationAddress.AddressLine1`,
          },
          {
            type: "Input",
            label: "Address Line 2",
            visible: true,
            path: `ProposerDetails.CommunicationAddress.AddressLine2`,
          },
          {
            type: "Input",
            // required: true,
            label: "Address Line 3",
            visible: true,
            path: `ProposerDetails.CommunicationAddress.AddressLine3`,
          },
          {
            type: "Input",
            required: true,
            label: "State",
            visible: true,
            path: `ProposerDetails.CommunicationAddress.State`,
            InputProps: { disabled: true },
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "District",
            visible: true,
            path: `ProposerDetails.CommunicationAddress.District`,
            options: masters.ProposerCommDistrict,
            customOnChange: onProposerDistrictSelect,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "City",
            visible: true,
            path: `ProposerDetails.CommunicationAddress.CityDistrict`,
            options: masters.ProposerCommCity,
            customOnChange: onProposerCitySelect,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Pincode",
            visible: true,
            path: `ProposerDetails.CommunicationAddress.Pincode`,
            optionLabel: "mID",
            options: masters.ProposerCommPincode,
          },
          {
            type: "RadioGroup",
            visible: lDto.ckycResponce.Status === null || lDto.ckycResponce.Status === "Failed",
            required: true,
            radioLabel: {
              label: "Is Permanent address same as Communication address",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: `ProposerDetails.SameasCommunicationAddress`,
            spacing: 12,
            customOnChange: (e) => onSameAddress(e),
          },
          {
            type: "Typography",
            label: "Permanent  Address",
            visible:
              lDto.Temp.CheckboxDefaultAddr === "Yes" ||
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === "Failed",
            spacing: 12,
            fontSize: 15,
          },
          {
            type: "Input",
            required: true,
            label: "Address Line 1",
            visible:
              lDto.Temp.CheckboxDefaultAddr === "Yes" ||
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === "Failed",
            path: `ProposerDetails.PermanentAddress.AddressLine1`,
            InputProps: {
              readOnly:
                lDto.ProposerDetails.SameasCommunicationAddress === "Yes" ||
                lDto.Temp.CheckboxDefaultAddr === "Yes",
            },
          },
          {
            type: "Input",
            label: "Address Line 2",
            visible:
              lDto.Temp.CheckboxDefaultAddr === "Yes" ||
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === "Failed",
            path: `ProposerDetails.PermanentAddress.AddressLine2`,
            InputProps: {
              readOnly:
                lDto.ProposerDetails.SameasCommunicationAddress === "Yes" ||
                lDto.Temp.CheckboxDefaultAddr === "Yes",
            },
          },
          {
            type: "Input",
            // required: true,
            label: "Address Line 3",
            visible:
              lDto.Temp.CheckboxDefaultAddr === "Yes" ||
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === "Failed",
            path: `ProposerDetails.PermanentAddress.AddressLine3`,
            InputProps: {
              readOnly:
                lDto.ProposerDetails.SameasCommunicationAddress === "Yes" ||
                lDto.Temp.CheckboxDefaultAddr === "Yes",
            },
          },
          {
            type: "AutoComplete",
            required: true,
            label: "State",
            visible:
              lDto.Temp.CheckboxDefaultAddr === "Yes" ||
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === "Failed",
            path: `ProposerDetails.PermanentAddress.State`,
            options: masters.ProposerCommState,
            disableOnReset: true,
            readOnly:
              lDto.ProposerDetails.SameasCommunicationAddress === "Yes" ||
              lDto.Temp.CheckboxDefaultAddr === "Yes",
            customOnChange: onProposerState1Select,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "District",
            visible:
              lDto.Temp.CheckboxDefaultAddr === "Yes" ||
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === "Failed",
            path: `ProposerDetails.PermanentAddress.District`,
            options: masters.ProposerComm1District,
            readOnly:
              lDto.ProposerDetails.SameasCommunicationAddress === "Yes" ||
              lDto.Temp.CheckboxDefaultAddr === "Yes",
            customOnChange: onProposerDistrict1Select,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "City",
            visible:
              lDto.Temp.CheckboxDefaultAddr === "Yes" ||
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === "Failed",
            path: `ProposerDetails.PermanentAddress.CityDistrict`,
            options: lMasters.ProposerComm1City,
            readOnly:
              lDto.ProposerDetails.SameasCommunicationAddress === "Yes" ||
              lDto.Temp.CheckboxDefaultAddr === "Yes",
            customOnChange: onProposerCity1Select,
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Pincode",
            visible:
              lDto.Temp.CheckboxDefaultAddr === "Yes" ||
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === "Failed",
            path: `ProposerDetails.PermanentAddress.Pincode`,
            readOnly:
              lDto.ProposerDetails.SameasCommunicationAddress === "Yes" ||
              lDto.Temp.CheckboxDefaultAddr === "Yes",
            optionLabel: "mID",
            options: masters.ProposerComm1Pincode,
          },
          {
            type: "Typography",
            label: "Address Proof",
            visible:
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.panUpload === true,
            spacing: 12,
            fontSize: 16,
          },
          {
            type: "Typography",
            label: "Pan Document",
            visible:
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.panUpload === true,
            spacing: 3,
            path: `documentDetails[0].DocTypeName`,
            fontSize: 15,
          },
          {
            type: "Custom",
            visible:
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.panUpload === true,
            spacing: 4,
            return: (
              <MDBox>
                <Grid container justifyContent="center">
                  <MDButton
                    variant="outlined"
                    color="info"
                    component="label"
                    disabled={lMasters.flags.panUpload === true}
                  >
                    Upload
                    <input
                      hidden
                      accept="image/bmp, image/jpeg, image/png, .pdf"
                      type="file"
                      onChange={(e) => handleFileUpload(e, "_Pan")}
                      ref={ref}
                    />
                  </MDButton>
                </Grid>
              </MDBox>
            ),
          },
          {
            type: "Custom",
            visible:
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.panUpload === true,
            spacing: 3,
            return: (
              <Typography sx={{ textAlign: "right", fontSize: "12px" }}>
                {lDto.documentDetails[0].DocName}
              </Typography>
            ),
          },
          {
            type: "Custom",
            visible: lMasters.flags.panUpload === true,
            spacing: 2,
            return: (
              <CancelOutlinedIcon color="error" onClick={(e) => handleFiledelete(e, "_Pan")} />
            ),
          },
          {
            type: "Typography",
            label: "Passport Front Copy",
            visible:
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.passportFrontUpload === true,
            spacing: 3,
            fontSize: 15,
          },
          {
            type: "Custom",
            visible:
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.passportFrontUpload === true,
            spacing: 4,
            return: (
              <MDBox>
                <Grid container justifyContent="center">
                  <MDButton
                    variant="outlined"
                    color="info"
                    component="label"
                    disabled={lMasters.flags.passportFrontUpload === true}
                  >
                    Upload
                    <input
                      hidden
                      accept="image/bmp, image/jpeg, image/png, .pdf"
                      type="file"
                      ref={ref2}
                      onChange={(e) => handleFileUpload(e, "_PassportFront")}
                    />
                  </MDButton>
                </Grid>
              </MDBox>
            ),
          },

          {
            type: "Custom",
            visible:
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.passportFrontUpload === true,
            spacing: 3,
            return: (
              <Typography sx={{ textAlign: "right", fontSize: "12px" }}>
                {lDto.documentDetails[1].DocName}
              </Typography>
            ),
          },

          {
            type: "Custom",
            visible: lMasters.flags.passportFrontUpload === true,
            spacing: 2,
            return: (
              <CancelOutlinedIcon
                color="error"
                onClick={(e) => handleFiledelete(e, "_PassportFront")}
              />
            ),
          },

          {
            type: "Typography",
            label: "Passport Back Copy",
            visible:
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.passportBackUpload === true,
            spacing: 3,
            fontSize: 15,
          },
          {
            type: "Custom",
            visible:
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.passportBackUpload === true,
            spacing: 4,
            return: (
              <MDBox>
                <Grid container justifyContent="center">
                  <MDButton
                    variant="outlined"
                    color="info"
                    component="label"
                    disabled={lMasters.flags.passportBackUpload === true}
                  >
                    Upload
                    <input
                      hidden
                      accept="image/bmp, image/jpeg, image/png, .pdf"
                      type="file"
                      ref={ref3}
                      onChange={(e) => handleFileUpload(e, "_PassportBack")}
                    />
                  </MDButton>
                </Grid>
              </MDBox>
            ),
          },

          {
            type: "Custom",
            visible:
              lDto.Temp.CheckboxDifferentAddr === "Yes" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed" ||
              lMasters.flags.passportBackUpload === true,
            spacing: 3,
            return: (
              <Typography sx={{ textAlign: "right", fontSize: "12px" }}>
                {lDto.documentDetails[2].DocName}
              </Typography>
            ),
          },

          {
            type: "Custom",
            visible: lMasters.flags.passportBackUpload === true,
            spacing: 2,
            return: (
              <CancelOutlinedIcon
                color="error"
                onClick={(e) => handleFiledelete(e, "_PassportBack")}
              />
            ),
          },
          {
            type: "Typography",
            label:
              "Uploading Passport Front and Back copy is Mandatory" ||
              lDto.ckycResponce.Status === null ||
              lDto.ckycResponce.Status === "Failed",
            visible: lDto.Temp.CheckboxDifferentAddr === "Yes",
            spacing: 12,
            fontSize: 10,
          },
        ],
      ];

      break;
    case 2:
      data = [...masters.InsuredComArr];
      break;
    case 3:
      data = [
        [
          {
            type: "Input",
            required: true,
            label: "Name",
            visible: true,
            path: `NomineeDetails.0.NomineeName`,
            onBlurFuncs: [IsName],
          },
          {
            type: "AutoComplete",
            label: "Nominee Relationship",
            visible: true,
            required: true,
            path: `NomineeDetails.0.NomineeRelationWithProposer`,
            options: masters.NomineeRelation,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible: true,
            path: `NomineeDetails.0.NomineeGender`,
            options: masters.Gender,
          },
          {
            type: "Typography",
            visible: false,
            spacing: 0,
            label: "",
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            visible: true,
            required: true,
            path: `NomineeDetails.0.NomineeDOB`,
            dateFormat: "Y-m-d",
            maxDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            customOnChange: (e1, v1) => onNomineeDOB(e1, v1),
          },
          {
            type: "Input",
            label: "Email ID",
            visible: true,
            path: `NomineeDetails.0.NomineeEmailID`,
            onBlurFuncs: ["IsEmail"],
          },
          {
            type: "Input",
            label: "Mobile number",
            visible: true,
            path: `NomineeDetails.0.NomineeMobile`,
            onBlurFuncs: ["IsMobileNumber"],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            required: true,
            label: "Appointee Name",
            visible: dto.Temp.agee >= 0 && dto.Temp.agee < 18.01,
            path: `NomineeDetails.0.AppointeeName`,
            onBlurFuncs: [IsName],
          },
          {
            type: "RadioGroup",
            justifyContent: "space-between",
            visible: true,
            radioLabel: {
              label: "Is the Nominee Address same as the Proposer's communication address? ",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No ", value: "No" },
            ],
            path: "NomineeDetails.0.SameasCommunicationAddress",
            spacing: 12,
            customOnChange: (e) => onNomAddress(e),
          },
          {
            type: "Typography",
            path: "Nominee's communication Address",
            visible: true,
            spacing: 12,
            fontSize: 16,
          },
          {
            type: "Input",
            label: "Address Line 1",
            visible: true,
            path: `NomineeDetails.0.NomineeAddressLine1`,
            InputProps: {
              readOnly: dto.NomineeDetails[0].SameasCommunicationAddress === "Yes",
            },
          },
          {
            type: "Input",
            label: "Address Line 2",
            visible: true,
            path: `NomineeDetails.0.NomineeAddressLine2`,
            InputProps: {
              readOnly: dto.NomineeDetails[0].SameasCommunicationAddress === "Yes",
            },
          },
          {
            type: "Input",
            label: "Address Line 3",
            visible: true,
            path: `NomineeDetails.0.NomineeAddressLine3`,
            InputProps: {
              readOnly: dto.NomineeDetails[0].SameasCommunicationAddress === "Yes",
            },
          },
          {
            type: "AutoComplete",
            label: "State",
            visible: true,
            path: `NomineeDetails.0.NomineeState`,
            readOnly: dto.NomineeDetails[0].SameasCommunicationAddress === "Yes",
            options: masters.ProposerCommState,
            customOnChange: onProposerState2Select,
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            path: `NomineeDetails.0.NomineeDistrict`,
            readOnly: dto.NomineeDetails[0].SameasCommunicationAddress === "Yes",
            options: masters.NomineeDistrict, // masters.district,
            customOnChange: onProposerDistrict2Select,
          },
          {
            type: "AutoComplete",
            label: "City",
            visible: true,
            path: `NomineeDetails.0.NomineeCity`,
            readOnly: dto.NomineeDetails[0].SameasCommunicationAddress === "Yes",
            options: masters.NomineeCity, // masters.city,
            customOnChange: onProposerCity2Select,
          },

          {
            type: "AutoComplete",
            label: "Pincode",
            visible: true,
            path: `NomineeDetails.0.NomineePincode`,
            readOnly: dto.NomineeDetails[0].SameasCommunicationAddress === "Yes",
            optionLabel: "mID",
            options: masters.NomineePincode, // masters.pincode,
            // customOnChange: onPincode2Select,
          },
        ],
        [
          {
            type: "Input",
            required: true,
            label: "University Name",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Name`,
            onBlurFuncs: [IsName],
          },
          {
            type: "Input",
            required: true,
            label: "Pincode/ Zipcode",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.PinCode`,
            InputProps: { maxLength: 6 },
            onBlurFuncs: [IsPincode],
          },
          {
            type: "Input",
            label: "Country",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Country`,
            onBlurFuncs: [IsName],
          },
          {
            type: "Input",
            label: "State",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.State`,
            onBlurFuncs: [IsName],
          },
          {
            type: "Input",
            label: "City",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.City`,
            onBlurFuncs: [IsName],
          },
          {
            type: "Input",
            required: true,
            label: "Address Line 1",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.AddressLine1`,
          },
          {
            type: "Input",
            label: " Address Line 2",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.AddressLine2`,
          },
          {
            type: "Input",
            label: "Address Line 3",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.AddressLine3`,
          },
          {
            type: "Input",
            required: true,
            label: "Course Opted for",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.CourseOptedFor`,
            onBlurFuncs: [IsName],
          },
          {
            type: "Input",
            required: true,
            label: "Course Duration",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.CourseDuration`,
            onBlurFuncs: [IsAlphaNum],
          },
        ],
        [
          {
            type: "Input",
            required: true,
            label: "Name of the sponsor",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.Name`,
            onBlurFuncs: [IsName],
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.Gender`,
            options: masters.Gender,
          },
          {
            type: "MDDatePicker",
            label: "Date of Birth",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.DOB`,
            dateFormat: "Y-m-d",
          },
          {
            type: "AutoComplete",
            required: true,
            label: "Relationship with Student",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.RelationshipwithStudent`,
            options: masters.RelationwithStudent,
          },
          {
            type: "Input",
            required: true,
            label: "Email Id",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.Email`,
            onBlurFuncs: ["IsEmail"],
          },
          {
            type: "Input",
            required: true,
            label: "Mobile number",
            visible: dto.TripType === "StudentTravel",
            path: "Department",
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Typography",
            label: "Sponsor communication Address",
            visible: dto.TripType === "StudentTravel",
            spacing: 12,
            fontSize: 16,
          },
          {
            type: "Input",
            label: "Address Line 1",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.AddressLine1`,
          },
          {
            type: "Input",
            label: "Address Line 2",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.AddressLine2`,
          },
          {
            type: "Input",
            label: "Address Line 3",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.AddressLine3`,
          },
          {
            type: "Input",
            label: "Pincode",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.PinCode`,
            InputProps: { maxLength: 6 },
            onBlurFuncs: [IsPincode],
          },
          {
            type: "Input",
            label: "City",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.City`,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "District",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.District`,
            onBlurFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "State",
            visible: dto.TripType === "StudentTravel",
            path: `UniversityDetails.Sponsor.0.State`,
            onBlurFuncs: [IsAlphaSpace],
          },
        ],
      ];
      break;
    case 4:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox>
                <MDBox
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "50%",
                    ml: "25%",
                  }}
                >
                  <Card
                    sx={{
                      backgroundColor: "#F0F0F0",
                    }}
                  >
                    <Grid container spacing={2} p={3}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Sum Insured</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>₹{dto.SumInsured}</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Basic Premium</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹{dto.PremiumDetail.BasicPremium}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Discount</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹{dto.PremiumDetail.Discount}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Gross Premium</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹{dto.PremiumDetail.GrossPremium}
                        </MDTypography>
                      </Grid>
                      {dto.ProposerDetails.CommunicationAddress.State !== "UTTAR PRADESH" ? (
                        <>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography>IGST(18%)</MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography sx={{ textAlign: "right" }}>
                              ₹{dto.PremiumDetail.TaxDetails[2].Amount}
                            </MDTypography>
                          </Grid>
                        </>
                      ) : null}
                      {dto.ProposerDetails.CommunicationAddress.State === "UTTAR PRADESH" ? (
                        <>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography>CGST(9%)</MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography sx={{ textAlign: "right" }}>
                              ₹{dto.PremiumDetail.TaxDetails[0].Amount}
                            </MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography>SGST(9%)</MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography sx={{ textAlign: "right" }}>
                              ₹{dto.PremiumDetail.TaxDetails[0].Amount}
                            </MDTypography>
                          </Grid>
                        </>
                      ) : null}
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography>Total Premium</MDTypography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDTypography sx={{ textAlign: "right" }}>
                          ₹{dto.PremiumDetail.TotalPremium}
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </Card>
                </MDBox>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  {/* <Stack direction="row" spacing={2} p={5}>
                    <MDButton onClick={() => onSendProposalLink()}>Send the payment link</MDButton>
                    <MDButton onClick={() => onProceedtoPayment()}> Proceed to Payment</MDButton>
                  </Stack> */}
                </MDBox>
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <Stack direction="row" spacing={2} p={5}>
                    <MDButton onClick={() => onSendProposalLink()}>Send the payment link</MDButton>
                    <MDButton onClick={() => onProceedtoPayment()}> Proceed to Payment</MDButton>
                  </Stack>
                </MDBox>
              </MDBox>
            ),
          },
        ],
      ];
      break;
    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep, dto, setDto, setBackDropFlag, masters }) => {
  const lMasters = masters;
  let fun = false;
  let fun3 = false;
  const lDto = dto;

  console.log("ldtto", dto);
  const mDto = { ...dto };
  const CheckYes = () => {
    const ri = lDto.InsurableItem[0].RiskItems;
    fun = true;
    ri.forEach((y) => {
      y.Questionaire.forEach((y1, a) => {
        if (a !== 7) {
          if (y1.Answer === "Yes") {
            fun = false;
          }
        }
      });
    });

    return fun;
  };
  switch (activeStep) {
    case 0:
      fun = await calculatePremium(dto).then(async (res) => {
        if (res) {
          lDto.PremiumDetail.BasicPremium = res.data.premiumDetail.BasicPremium;
          lDto.PremiumDetail.Discount = res.data.premiumDetail.Discount;
          lDto.PremiumDetail.GrossPremium = res.data.premiumDetail.GrossPremium;
          lDto.PremiumDetail.TaxDetails[2].Amount = res.data.premiumDetail.TaxDetails[2].Amount;
          lDto.PremiumDetail.TaxDetails[0].Amount = res.data.premiumDetail.TaxDetails[0].Amount;
          lDto.PremiumDetail.TaxDetails[1].Amount = res.data.premiumDetail.TaxDetails[1].Amount;
          lDto.PremiumDetail.TotalPremium = res.data.premiumDetail.TotalPremium;
          console.log("check", res);
          // setGenericPolicyDto(topDispatch, { ...topDto });
          setDto({ ...lDto });
          setBackDropFlag(false);
          const fun1 = await swal
            .fire({
              title: "<strong>PREMIUM</strong>",
              html: `<div style={{display:"flex",justifyContent:"center"}}>
      <table width="100%"><tr><td style="textAlign:left ;padding-bottom: 20px">GrossPremium</td>
      <td style="textAlign:left ;padding-bottom: 20px">₹ ${parseFloat(
        res.data.premiumDetail.GrossPremium
      ).toFixed(0)}
      </td></tr>
      ${
        dto.ProposerDetails.CommunicationAddress.State === "UTTAR PRADESH"
          ? `<tr><td style="textAlign:left ;padding-bottom: 20px">SGST(9%)</td><td style="textAlign:left ;padding-bottom: 20px">₹ ${parseFloat(
              res.data.premiumDetail.TaxDetails[1].Amount
            ).toFixed(0)}</td></tr>
      <tr><td style="textAlign:left ;padding-bottom: 20px">CGST(9%)</td><td style="textAlign:left ;padding-bottom: 20px">₹ ${parseFloat(
        res.data.premiumDetail.TaxDetails[0].Amount
      ).toFixed(0)}
      </td></tr>`
          : `<tr><td style="textAlign:left ;padding-bottom: 20px">IGST(18%)</td><td style="textAlign:left ;padding-bottom: 20px">₹ ${parseFloat(
              res.data.premiumDetail.TaxDetails[2].Amount
            ).toFixed(0)}
            </td></tr>`
      }
      <tr><td style="textAlign:left ;padding-bottom: 20px">Total Premium</td><td style="textAlign:left ;padding-bottom: 20px">₹ ${parseFloat(
        res.data.premiumDetail.TotalPremium
      ).toFixed(0)}</td></tr></table></div>`,
              showConfirmButton: true,
              confirmButtonText: "Proceed",
              confirmButtonColor: "#0079CE",
              showCancelButton: true,
              allowOutsideClick: false,
            })
            .then((resX) => {
              if (resX.isConfirmed) return true;
              return false;
            });
          return fun1;
        }
        return false;
      });
      break;
    case 1:
      // debugger;
      fun = false;
      if (lDto.ckycResponce.Status === null || lDto.ckycResponce.Status === "Failed") {
        const fun2 = true;
        if (lDto.documentDetails[1].DocName === "" && lDto.documentDetails[2].DocName === "") {
          swal.fire({
            icon: "error",
            text: `Please upload Passport Front and Back Document `,
            confirmButtonColor: "#0079CE",
            allowOutsideClick: false,
          });
          return fun;
        }

        if (lDto.documentDetails[1].DocName === "") {
          swal.fire({
            icon: "error",
            text: `Please upload Passport Front Document `,
            confirmButtonColor: "#0079CE",
            allowOutsideClick: false,
          });
          return fun;
        }
        if (lDto.documentDetails[2].DocName === "") {
          swal.fire({
            icon: "error",
            text: `Please upload Passport Back Document `,
            confirmButtonColor: "#0079CE",
            allowOutsideClick: false,
          });
          return fun;
        }
        return fun2;
      }

      if (lDto.ckycResponce.Status === "Success") {
        const fun2 = true;
        if (lDto.Temp.CheckboxDifferentAddr === "Yes") {
          if (lDto.documentDetails[1].DocName === "" && lDto.documentDetails[2].DocName === "") {
            swal.fire({
              icon: "error",
              text: `Please upload Passport Front and Back Document `,
              confirmButtonColor: "#0079CE",
              allowOutsideClick: false,
            });
            return fun;
          }

          if (lDto.documentDetails[1].DocName === "") {
            swal.fire({
              icon: "error",
              text: `Please upload Passport Front Document `,
              confirmButtonColor: "#0079CE",
              allowOutsideClick: false,
            });
            return fun;
          }
          if (lDto.documentDetails[2].DocName === "") {
            swal.fire({
              icon: "error",
              text: `Please upload Passport Back Document `,
              confirmButtonColor: "#0079CE",
              allowOutsideClick: false,
            });
            return fun;
          }
        }
        return fun2;
      }
      if (lMasters.flags.passportBackUpload === true) {
        const fun2 = true;
        return fun2;
      }

      break;
    case 2:
      fun = CheckYes();
      if (fun === false) {
        swal.fire({
          icon: "error",
          confirmButtonColor: "#0079CE",
          text: `Sorry. We are not able to issue policy for select disease(s)`,
          allowOutsideClick: false,
        });
      }
      break;
    case 3:
      objectPath.del(mDto, "PremiumDetail");
      fun = await calculateProposal(mDto).then(async (results) => {
        if (results.data.status === 2) {
          lDto.ProposalNo = results.data.proposalNumber;
          // lMasters.ProposalNo = results.data.proposalNumber;

          console.log("eeeeeeeeeee", results.data.proposalNumber);
          // console.log("lDto.ProposalNo", lMasters.ProposalNo);
          setDto({ ...lDto });
          // setBackDropFlag(false);
          swal.fire({
            icon: "success",
            text: results.data.responseMessage,
            confirmButtonColor: "#0079CE",
            allowOutsideClick: false,
          });
          fun3 = true;
        }
        if (results.data.status !== 2) {
          swal.fire({
            icon: "error",
            text: results.data.responseMessage,
            confirmButtonColor: "#0079CE",
            allowOutsideClick: false,
          });
          fun3 = false;
        }
        return fun3;
      });
      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep, masters }) => {
  const lMasters = masters;
  let btnDetails = {};
  const onReset1 = (dto, setDto) => {
    const lDto = dto;
    lMasters.flags.Status = false;
    lDto.documentDetails[0].DocName = "";
    lDto.documentDetails[0].DocId = "";
    lDto.documentDetails[1].DocName = "";
    lDto.documentDetails[1].DocId = "";
    lDto.documentDetails[2].DocName = "";
    lDto.documentDetails[2].DocId = "";
    lMasters.flags.panUpload = false;
    lMasters.flags.passportFrontUpload = false;
    lMasters.flags.passportBackUpload = false;
    setDto({ ...lDto });
  };
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Calculate Premium", visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true, onClick: onReset1 },
        next: { label: "Proceed", visible: lMasters.flags.Status, loader: "backDrop" },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: false, loader: "backDrop" },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async () => {
  const masters = {
    NoOfTraveelerArr: [
      { mID: 1, mValue: "1", age: "" },
      { mID: 2, mValue: "2", age: "" },
      { mID: 3, mValue: "3", age: "" },
      { mID: 4, mValue: "4", age: "" },
      { mID: 5, mValue: "5", age: "" },
      { mID: 6, mValue: "6", age: "" },
    ],
    VisaType: [
      { mValue: "Tourist/Vistor Visa" },
      { mValue: "Long term Work Visa(stay more than 6 months)" },
      { mValue: "Permanent Resident Card/Immigrant" },
      { mValue: "Dependent Visa" },
      { mValue: "Diplomatic Visa" },
      { mValue: "Student Visa" },
      { mValue: "Expat(No Visa Required)" },
    ],

    NoOfTraveelerArr1: [{ mID: 1, mValue: "1" }],
    Salutation: [],
    Gender: [],
    Geography: [],
    Plans: [],
    SI: [],
    BenifitList: [],
    TripType: [],
    TripDuration: [],
    Country: [],
    NomineeRelation: [],
    RelationInsured: [],
    ProposerDistrictList: [],
    ProposerCityList: [],
    ProposerPincodeList: [],
    StateList: [],
    RelationwithStudent: [],
    ProposerDistrict1List: [],
    ProposerPincode1List: [],
    ProposerDistrict2List: [],
    ProposerDistrict3List: [],
    ProposerPincode2List: [],

    ProposerCommState: [],
    ProposerCommDistrict: [],
    ProposerCommCity: [],
    ProposerCommPincode: [],

    ProposerPermentState: [],
    ProposerComm1District: [],
    ProposerComm1City: [],
    ProposerComm1Pincode: [],

    NomineeDistrict: [],
    NomineeCity: [],
    NNomineePincode: [],

    MemberAccordionArr: [],
    MembersDateComArr: [],
    InsuredComArr: [],
    OtherDetails: [],
    flags: {
      kyc: false,
      panUpload: false,
      passportFrontUpload: false,
      passportBackUpload: false,
      ckycStatus: false,
      onclickeKYC: false,
      Status: false, // for proceed button in Proposer Details Page
    },
    // ProposalNo: "",

    // var: {
    //   Name: "",
    //   Gender: "",
    //   DOB: "",
    //   City: "",
    //   State: "",
    //   PinCode: "",
    //   Country: "",
    //   Address1: "",
    //   Address2: "",
    //   LandMark: "",
    //   District: "",
    //   Status: "",
    //   FirstName: "",
    //   LastName: "",
    //   MiddleName: "",
    //   Vendor: "",
    //   CKYCID: "",
    //   Remarks: "",
    //   PerCity: "",
    //   PerState: "",
    //   PerPinCode: "",
    //   Age: "",
    //   District1: "",
    //   city1: "",
    //   State1: "",
    // },
  };

  // const pid1 = await getProductIdByProductcode("TravelAssure");
  // const pid2 = await getProductIdByProductcode("Asiapacific");
  // const pid3 = await getProductIdByProductcode("WorldWide");
  // const pid4 = await getProductIdByProductcode("WorldWide Excl USA-Canada");
  // const pid5 = await getProductIdByProductcode("Student Travel");

  // console.log("qqqq", pid2.productId);
  // const res1 = await getDisplayNameByProductId(pid1.productId);
  // const res2 = await getDisplayNameByProductId(pid2.productId);
  // const res3 = await getDisplayNameByProductId(pid3.productId);
  // const res4 = await getDisplayNameByProductId(pid4.productId);
  // const res5 = await getDisplayNameByProductId(pid5.productId);

  const productcode1 = await getProductIdByProductcode("Asiapacific"); // 410
  const productcode2 = await getProductIdByProductcode("NBHTIOP22148V012122"); // 698
  const productcode3 = await getProductIdByProductcode("GroupTravelV1"); //  595
  const productcode4 = await getProductIdByProductcode("Student Travel"); //  455
  const productcode5 = await getProductIdByProductcode("WorldWide"); //  419
  const productcode6 = await getProductIdByProductcode("WorldWide Excl USA-Canada"); //  420
  masters.productcode1 = productcode1.productId;
  masters.productcode2 = productcode2.productId;
  masters.productcode3 = productcode3.productId;
  masters.productcode4 = productcode4.productId;
  masters.productcode5 = productcode5.productId;
  masters.productcode6 = productcode6.productId;

  console.log("gggggg", productcode2);
  // const res1 = await getDisplayNameByProductId (productcode2.productId);
  const res2 = await getDisplayNameByProductId(productcode4.productId);
  const res3 = await getDisplayNameByProductId(productcode1.productId);
  const res4 = await getDisplayNameByProductId(productcode5.productId);
  const res5 = await getDisplayNameByProductId(productcode6.productId);
  const result = [...res3, ...res2, ...res4, ...res5];
  masters.Plans = result;

  const res6 = await getMasterData1();
  res6.forEach((item) => {
    if (item.mType === "Salutation")
      masters.Salutation = item.mdata.filter((x) => x.mValue !== "M/S.");
    if (item.mType === "Gender")
      masters.Gender = item.mdata.filter((x) => x.mValue !== "Transgender");
    if (item.mType === "NomineeRelation")
      masters.NomineeRelation = item.mdata.filter((x) => x.mValue !== "Others");
  });

  const res7 = await getRelWithProposer(true);
  res7.forEach((item) => {
    if (item.mType === "Relation") masters.RelationInsured = item.mdata;
  });

  const res8 = await GetProdPartnermasterData(productcode2.productId, "RelationwithStudent", {
    MasterType: "RelationwithStudent",
  });
  masters.RelationwithStudent = res8;

  const res9 = await GetProdPartnermasterData(productcode2.productId, "ProposerState", {
    countryId: "1",
  });

  masters.ProposerCommState = res9.sort((a, b) => (a.mValue > b.mValue ? 1 : -1));
  console.log("Atozz1", masters.ProposerCommState);

  const res10 = await GetPolicyTripTenureMaster(masters.productcode3, "StudentTravel");
  masters.TripDuration = res10;

  const res11 = await GetPolicyTripTenureMaster(masters.productcode3, "Multitrip");
  masters.TripDuration1 = res11;

  return masters;
};

export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
