import { useState } from "react";
import { Grid, Paper, Popover } from "@mui/material";
import swal from "sweetalert";
import Swal2 from "sweetalert2";
import { Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import MDTypography from "../../../../../../../components/MDTypography";
// import MDBox from "../../../../../../../components/MDBox";
import GenericApi from "../data";
import PolicyJson from "./Json/LifeProposalJson";
import RayzorPay from "../../../../Retail/data/RayzorPay";
import { Proposals, Policies } from "../../../../Retail/data/Apis";
import {
  EventCommunicationExecution,
  GetMasters,
  DocumentUpload,
  DeleteDocument,
  GetDocumentById,
  ExecuteProcedure,
  SaveOpportunity,
} from "../../NewBusiness/data";
import {
  DateFormatFromDateObject,
  DateFormatFromStringDate,
  IsPan,
} from "../../../../../../../Common/Validations";
import { CkycResponse } from "../../../../Retail/Products/NBRetail/data/APIs/NBTravelApi";
import { getOcrData } from "../../../../../../BaseSetup/views/MachineLearning/data";
import MDBox from "../../../../../../../components/MDBox";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";
import MDButton from "../../../../../../../components/MDButton";

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

const getProcessSteps = () => {
  const steps = ["Basic Details", "Insured Details", "Summary"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];

  switch (activeStep) {
    case 0:
      steps = [
        { name: "Proposal Form", visible: true },
        { name: "KYC", visible: true },
        { name: "Policy Owner Details", visible: true },
        { name: "Permanent Address Details", visible: true },
        { name: "Communication  Address Details", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "", visible: false },
        { name: "Member Details", visible: true },
        { name: "Questionnaire", visible: true },
        { name: "Document Details", visible: true },
      ];
      break;

    case 2:
      steps = [{ name: "", visible: false }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

const ff = new Intl.NumberFormat("en-IN");

function ProposerSummary({ dto, onMakePayment }) {
  return (
    <MDBox sx={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ bgcolor: "#CEEBFF", display: "flex", width: "40%" }}>
        <Grid container spacing={2} p={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4" sx={{ display: "flex", justifyContent: "center" }}>
              Proposal Summary
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography variant="h6">Proposal Number</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography variant="h6" textAlign="right">
              {dto.ProposalNo}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography variant="h6">Total Premium</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography textAlign="right" variant="h6">
              {`₹ ${ff.format(dto?.PremiumDetail?.TotalPremium)}`}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton onClick={onMakePayment}>Make Payment</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </Paper>
    </MDBox>
  );
}

function PolicySummary() {
  return (
    <Paper sx={{ bgcolor: ColorsSetting().primary.main }}>
      <Grid container spacing={2} p={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h5">Policy Summary</MDTypography>
        </Grid>
      </Grid>
    </Paper>
  );
}

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, dto, setDto, masters, setLoading }) => {
  const lDto = dto;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const Navigate = useNavigate();

  const [img, setImg] = useState("");

  // const [paymentStatus, setPaymentStatus] = useState(false);
  const [tab, setTab] = useState(0);

  const onPayment = async (e) => {
    if (e.status === "success") {
      lDto["Product Code"] = dto.ProductCode;
      lDto.PaymentDetails.TransactionNo = e.paymentId;
      setLoading(true);
      await Policies({ ...lDto }).then((res) => {
        setLoading(false);

        if (res.status === 1) {
          lDto.PolicyNo = res?.finalResult?.id;
          Swal2.fire({
            icon: "success",
            title: `Your Policy Created Successfully`,
            text: `Your Policy No ${res?.finalResult?.id}\nYour Policy details shared to your registered mailID `,
            width: 600,
            padding: "3em",
            color: "#716add",
            allowOutsideClick: false,
            background: "#fff",
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat
            `,
            showConfirmButton: true,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              Navigate("/customerlifelanding");
            }
          });
        }
      });
      // setPaymentStatus(true);
    }
    setDto({ ...lDto });
  };

  const onMakePayment = () => {
    RayzorPay({
      key: "rzp_test_KK09FiPyLY2aKI",
      amount:
        dto.PremiumDetail.TotalPremium !== "" && dto.PremiumDetail.TotalPremium !== null
          ? parseInt(dto.PremiumDetail.TotalPremium, 10)
          : 1000,
      PayeeName: dto.ProposerDetails.FirstName,
      PayeeEmail: dto.ProposerDetails.EmailId,
      PayeeContact: dto.ProposerDetails.ContactNo,
      PayeeAddress: "Maharastra",
      onPayment,
    });
  };

  const onPANUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const obj = {
        OcrType: "Other",
        OcrTypeId: 186,
        base64: reader.result.split(",")[1],
      };
      setLoading(true);
      try {
        await getOcrData(obj).then((res) => {
          const line = res.data.analyzeResult.readResults[0].lines;
          line.forEach((x) => {
            if (IsPan(x.text) === true) lDto.ProposerDetails.PanNo = x.text;
            if (x.text.length === 10 && x.text.split("/").length === 3) {
              lDto.ProposerDetails.DOB = x.text.split("/").join("-");
            }
          });
        });
      } catch (ex) {
        swal({ icon: "warning", text: "Something went wrong! Please try again" });
        setLoading(false);
      }
      setLoading(false);
    };
    reader.readAsDataURL(file);
    const inputElement = document.getElementById("fileInput");
    if (inputElement) {
      inputElement.value = "";
    }

    file.target.value = "";
  };
  const onInitiateKyc = async () => {
    setLoading(true);
    const obj1 = {
      Pan: dto.ProposerDetails.PanNo,
      dob: DateFormatFromStringDate(dto.ProposerDetails.DOB, "y-m-d", "d-m-y"),
      userName: "NIVABUPA",
      password: "M@xbup@!2#",
    };
    const address = {};
    await CkycResponse(obj1).then((res) => {
      if (res?.data?.Status === "Success") {
        lDto.ProposerDetails.CKYCNo = res.data.CKYCID;
        lDto.ProposerDetails.FirstName = res.data.FirstName;
        lDto.ProposerDetails.LastName = res.data.LastName;
        lDto.ProposerDetails.MiddleName = res.data.MiddleName;

        address.AddressLine1 = res.data.Address1;
        address.AddressLine2 = res.data.Address2;
        address.CityDistrict = res.data.District;
        address.State = res.data.State;
        address.Pincode = res.data.PinCode;
        lDto.ProposerDetails.PermanentAddress = address;
      } else swal({ icon: "warning", text: "Something went wrong! Please try again" });
    });
    setLoading(false);
    setDto({ ...lDto });
  };

  const onSameAddress = (e) => {
    lDto.ProposerDetails.isPermanentAddrSameAsCommAddr = e.target.checked;
    if (e.target.checked) {
      lDto.ProposerDetails.CommunicationAddress = { ...lDto.ProposerDetails.PermanentAddress };
    } else {
      lDto.ProposerDetails.CommunicationAddress = {
        Pincode: "",
        Country: "",
        State: "",
        District: "",
        City: "",
        Landmark: "",
        AddressLine3: "",
        AddressLine2: "",
        AddressLine1: "",
      };
    }
    setDto({ ...lDto });
  };

  const onPanNo = (e) => {
    lDto.ProposerDetails.PanNo = e.target.value.toUpperCase();
    setDto({ ...lDto });
  };

  const onSameProposer = (e) => {
    lDto.ProposerDetails.IsMainLifeSameAsProposer = e.target.checked;
    if (e.target.checked) {
      lDto.InsurableItem[0].RiskItems[0].Name = lDto.ProposerDetails.FirstName;
      lDto.InsurableItem[0].RiskItems[0].DOB = lDto.ProposerDetails.DOB;
      lDto.InsurableItem[0].RiskItems[0].Gender = lDto.ProposerDetails.gender;
    } else {
      lDto.InsurableItem[0].RiskItems[0].Name = "";
      lDto.InsurableItem[0].RiskItems[0].DOB = "";
      lDto.InsurableItem[0].RiskItems[0].Gender = "";
    }
    setDto({ ...lDto });
  };

  const handleFileUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append(file.name, file, file.name);
    await DocumentUpload(formData).then((result) => {
      setLoading(false);
      if (result.dMSDTOs[0].fileName !== null) {
        lDto.DocumentDetails[Number(event.target.name)].DocumentName = file.name;

        lDto.DocumentDetails[Number(event.target.name)].DocumentId = result.dMSDTOs[0].fileName;
        setDto({ ...lDto });
        swal({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
    setLoading(false);
  };

  const handleDocFileDelete = async (i) => {
    setLoading(true);
    const fileId = dto.DocumentDetails[i].DocumentId.toString();
    lDto.DocumentDetails[i] = {
      DocumentType: "",
      DocumentId: "",
      DocumentName: "",
      ContentType: "",
    };
    await DeleteDocument(fileId).then(() => {
      setLoading(false);
    });
    setDto({ ...lDto });
  };

  const generateFile = async (e, fileName) => {
    setLoading(true);
    setAnchorEl(e.currentTarget);
    await GetDocumentById(fileName).then((res) => {
      setLoading(false);
      const src = `data:application/img;base64,${res.data}`;
      setImg(src);
      // const link = document.createElement("a");
      // link.href = src;
      // link.download = fileName;
      // link.click();
    });
  };

  const spreadDocComponents = () => {
    const arr = [];
    dto.DocumentDetails.forEach((x, i) => {
      arr.push(
        { type: "Typography", visible: true, spacing: 12 },
        {
          type: "Input",
          label: "Document Name",
          path: `DocumentDetails.${i}.DocumentType`,
          visible: true,
          multiline: true,
          spacing: 4,
          disabled: true,
        },
        {
          type: "Button",
          spacing: 1.5,
          visible: true,
          variant: "outlined",
          component: "label",
          label: "Upload",
          justifyContent: "center",
          color: "error",
          typeFormat: (
            <input
              hidden
              name={i}
              accept="image/jpg, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
          ),
        },
        {
          type: "TypographyVal",
          spacing: 2,
          sx: { fontSize: "14px", "&:hover": { cursor: "pointer" } },
          path: `DocumentDetails.${i}.DocumentName`,
          onClick: (e) => generateFile(e, x.DocumentId),
          visible: true,
        },
        {
          type: "Custom",
          visible: x.DocumentName !== "" && x.DocumentName !== undefined,
          spacing: 1,
          return: (
            <Cancel
              color="error"
              onClick={() => handleDocFileDelete(i)}
              sx={{ "&:hover": { cursor: "pointer" } }}
            />
          ),
        },
        { type: "Typography", visible: true, spacing: 12 }
      );
    });
    return arr;
  };

  let data = [];
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Typography",
            visible: true,
            label: "IMPORTANT",
            spacing: 12,
          },
          {
            type: "TypographyVal",
            visible: true,
            value: "1. Please answer all the questions accurately.",
            spacing: 12,
          },
          {
            type: "TypographyVal",
            visible: true,
            value: "2. Please do not withhold any information.",
            spacing: 12,
          },
          {
            type: "TypographyVal",
            visible: true,
            value:
              "3. If you are in doubt whether some information need to be disclosed, please disclose them.",
            spacing: 12,
          },
          {
            type: "TypographyVal",
            visible: true,
            value:
              "4. Please make sure that you answer all the questions before placing your signature.",
            spacing: 12,
          },
        ],
        [
          {
            type: "Input",
            visible: true,
            required: true,
            label: "PAN No",
            path: "ProposerDetails.PanNo",
            onBlurFuncs: [IsPan],
            customOnChange: onPanNo,
          },
          {
            type: "MDDatePicker",
            visible: true,
            required: true,
            label: "Date of Birth",
            dateFormat: "Y-m-d",
            path: "ProposerDetails.DOB",
          },
          {
            type: "Button",
            visible: true,
            component: "label",
            typeFormat: <input hidden id="fileInput" type="file" onChange={onPANUpload} />,
            label: "Upload PAN Card",
          },
          {
            type: "Button",
            visible: true,
            label: "Initiate KYC",
            onClick: onInitiateKyc,
          },
          {
            type: "Typography",
            visible: true,
            label: "",
            spacing: 12,
          },
          {
            type: "Input",
            visible: true,
            label: "CKYC No",
            path: "ProposerDetails.CKYCNo",
            disabled: true,
          },
        ],
        [
          {
            type: "AutoComplete", // AutoComplete
            visible: true,
            required: true,
            label: "Salutation",
            path: "ProposerDetails.salutation",
            options: [...masters.Salutation],
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "First Name",
            path: "ProposerDetails.FirstName",
          },
          {
            type: "Input",
            visible: true,
            label: "Middel Name",
            path: "ProposerDetails.MiddleName",
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Last Name",
            path: "ProposerDetails.LastName",
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Father's Name",
            path: "ProposerDetails.FatherName",
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Mother's Name",
            path: "ProposerDetails.MotherName",
          },
          {
            type: "MDDatePicker",
            visible: true,
            required: true,
            label: "Date of Birth",
            path: "ProposerDetails.DOB",
            dateFormat: "d-m-Y",
          },
          // {
          //   type: "Input",
          //   visible: true,
          //   required: true,
          //   label: "Age",
          //   path: "ProposerDetails.Age",
          // },
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Gender",
            path: "ProposerDetails.gender",
            options: [...masters.Gender],
          },
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Marital Status",
            path: "ProposerDetails.MaritalStatus",
            options: [...masters.MaritalStatus],
          },
          // {
          //   type: "AutoComplete",
          //   visible: true,
          //   // required: false,
          //   label: "Occupation",
          //   path: "ProposerDetails.OccupationCode",

          // },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Annual Income",
            path: "ProposerDetails.AnnualIncome",
            inputType: "number",
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Contact Number",
            path: "ProposerDetails.ContactNo",
            // onChangeFuncs: [IsMobileNumber],
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Email ID",
            path: "ProposerDetails.EmailId",
            // onChangeFuncs: [IsEmail],
          },
          // {
          //   type: "AutoComplete",
          //   visible: true,
          //   required: false,
          //   label: "Nationality",
          //   path: "ProposerDetails.Nationality",

          // },
        ],
        [
          {
            type: "Input",
            visible: true,
            label: "Address1",
            required: true,
            path: "ProposerDetails.PermanentAddress.AddressLine1",
          },
          {
            type: "Input",
            visible: true,
            label: "Address2",
            required: true,
            path: "ProposerDetails.PermanentAddress.AddressLine2",
          },
          {
            type: "Input",
            visible: true,
            label: "District",
            required: true,
            path: "ProposerDetails.PermanentAddress.CityDistrict",
          },
          {
            type: "Input",
            visible: true,
            label: "State",
            required: true,
            path: "ProposerDetails.PermanentAddress.State",
          },
          {
            type: "Input",
            visible: true,
            label: "Pincode",
            required: true,
            path: "ProposerDetails.PermanentAddress.Pincode",
          },
        ],
        [
          {
            type: "Checkbox",
            visible: true,
            required: false,
            checkedVal: true,
            uncheckVal: false,
            label: "Is communication Address same as permanent address",
            path: "ProposerDetails.isPermanentAddrSameAsCommAddr",
            spacing: 12,
            customOnChange: onSameAddress,
          },
          {
            type: "Input",
            visible: true,
            label: "Address1",
            required: true,
            path: "ProposerDetails.CommunicationAddress.AddressLine1",
          },
          {
            type: "Input",
            visible: true,
            label: "Address2",
            required: true,
            path: "ProposerDetails.CommunicationAddress.AddressLine2",
          },
          {
            type: "Input",
            visible: true,
            label: "District",
            required: true,
            path: "ProposerDetails.CommunicationAddress.CityDistrict",
          },
          {
            type: "Input",
            visible: true,
            label: "State",
            required: true,
            path: "ProposerDetails.CommunicationAddress.State",
          },
          {
            type: "Input",
            visible: true,
            label: "Pincode",
            required: true,
            path: "ProposerDetails.CommunicationAddress.Pincode",
          },
        ],
        [],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => setTab(newValue),
            tabs: dto.InsurableItem[0].RiskItems.map((elem, index) => ({
              value: index,
              label: "Main Life",
            })),
            spacing: dto.InsurableItem[0].RiskItems.length * 2.4,
          },
          {
            type: "Checkbox",
            visible: true,
            required: false,
            checkedVal: true,
            uncheckVal: false,
            label: "Is Main Life same as Proposer?",
            path: "ProposerDetails.IsMainLifeSameAsProposer",
            spacing: 12,
            customOnChange: onSameProposer,
          },
        ],
        [
          {
            type: "Input",
            visible: true,
            label: "First Name",
            path: "InsurableItem.0.RiskItems.0.Name",
            required: true,
          },
          {
            type: "MDDatePicker",
            visible: true,
            label: "DOB",
            path: "InsurableItem.0.RiskItems.0.DOB",
            required: true,
            dateFormat: "d-m-Y",
            maxDate: DateFormatFromDateObject(new Date(), "d-m-Y"),
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "Gender",
            path: "InsurableItem.0.RiskItems.0.Gender",
            options: [...masters.Gender],
            required: true,
          },
        ],
        [...masters.questions],
        [
          {
            type: "Custom",
            spacing: 12,
            visible: true,
            return: (
              <Popover
                open={open}
                onClick={() => {
                  setAnchorEl(null);
                  setImg("");
                }}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
              >
                {img !== "" && (
                  <MDBox width="800px" height="500px" component="img" src={img} alt="" />
                )}
              </Popover>
            ),
          },
          ...spreadDocComponents(),
        ],
      ];
      break;

    case 2:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: <ProposerSummary dto={dto} onMakePayment={onMakePayment} />,
          },

          { type: "Custom", visible: false, spacing: 12, return: <PolicySummary /> },
        ],
        [],
        [],
      ];
      break;
    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ dto, setDto, activeStep }) => {
  let fun = true;
  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      await Proposals(dto).then(async (res) => {
        setDto({ ...dto, ProposalNo: res?.finalResult?.ProposalResponse?.proposalNumber });

        const opportunityJson = {
          opportunityId: 0,
          needAnalysisJson: null,
          stageId: 4,
          stageStatusId: 1,
          txnType: "",
          txnValue: res?.finalResult?.ProposalResponse?.proposalNumber,
          txnValueId: res?.finalResult?.ProposalResponse?.id,
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
        });
        EventCommunicationExecution({
          communicationId: 213,
          keyType: "BGRProposal",
          key: res?.finalResult?.ProposalResponse?.proposalNumber,
          stakeHolderDetails: [
            {
              communicationType: "Email",
              stakeholderCode: "CUS",
              communicationValue: dto.ProposerDetails.EmailId,
            },
          ],
        });
      });
      fun = true;

      break;
    case 2:
      fun = true;

      break;
    case 3:
      fun = true;

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

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop1" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: false, loader: "backDrop1" },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop1" },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async ({ setDto, selectedId, setLoading }) => {
  const dto = getPolicyDto();
  let mst = { Salutation: [], Gender: [], questions: [] };
  const arr = [];
  const question = [];
  const docs = [];

  if (selectedId !== null && selectedId !== undefined) {
    setLoading(true);
    const res = await GenericApi("BaseLifeInsurance", "LifeProposalAPI", { QuoteNo: selectedId });

    setLoading(true);
    const res1 = await ExecuteProcedure("po.usp_GetLifeProposalCommonDetails", {
      OpportunityId: localStorage.getItem("opportunityId"),
    });
    setLoading(false);

    if (res1.finalResult !== undefined) {
      // const newRiskItems = [...res1.finalResult.RiskItems];
      res1.finalResult.QuotationWiseDetails[0].RiskItems[0].Questionnare.forEach((x) => {
        if (x.ControlType === "Header" && x.Visibility === "true") {
          arr.push({
            type: "Typography",
            visible: true,
            label: x.QText,
            spacing: 12,
            // QSubType: x.QSubType,
            // splitId: 2,
          });
        }

        if (x.ControlType === "Radio" && x.Visibility === "true") {
          arr.push({
            type: "RadioGroup",
            visible: true,
            path: `InsurableItem.0.RiskItems.0.Questionnare.${question.length}.Answer`,
            radioLabel: {
              labelVisible: true,
              label: x.QText,
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            justifyContent: "space-between",
            spacing: 9,
            // splitId: 2,
          });

          if (x.DetailsLabel) {
            arr.push({
              type: "Input",
              required: "requiredDetails",
              requiredDetails: {
                path: `InsurableItem.0.RiskItems.0.Questionnare.${question.length}.Answer`,
                value: x.ShowDetailsOnValue,
              },
              visible: "visibleDetails",
              visibleDetails: {
                path: `InsurableItem.0.RiskItems.0.Questionnare.${question.length}.Answer`,
                value: x.ShowDetailsOnValue,
              },
              path: `InsurableItem.0.RiskItems.0.Questionnare.${question.length}.${x.DetailsLabel}`,
              label: x.DetailsLabel,
              spacing: 3,
              // splitId: 2,
              multiline: true,
            });
          }

          question.push({
            QId: x.QId,
            Question: x.QText,
            Answer: x.DefaultValue,
            [x.DetailsLabel]: "",
          });
        }

        if (x.ControlType === "TextBox" && x.Visibility === "true") {
          arr.push({
            type: "Input",
            visible: true,
            path: `InsurableItem.0.RiskItems.0.Questionnare.${question.length}.Answer`,
            label: x.QText,
            spacing: 4,
            splitId: 2,
            multiline: true,
          });
          question.push({
            QId: x.QId,
            Question: x.QText,
            Answer: x.DefaultValue,
          });
        }
      });
      res1.finalResult.QuotationWiseDetails[0].RiskItems[0].DocumentDetails.forEach((x) => {
        docs.push({
          DocumentType: x.DocumentType,
          DocumentId: "",
          DocumentName: "",
          ContentType: "",
        });
      });
    }
    const dto1 = res.finalResult;
    dto1.InsurableItem[0].RiskItems[0].Questionnare = question;

    setDto({
      ...dto,
      ...dto1,
      DocumentDetails: [...docs],
      PolicyStartDate: DateFormatFromDateObject(new Date(), "y-m-d"),
      PolicyEndDate: DateFormatFromDateObject(new Date(), "y-m-d"),
    });
  }

  mst.questions = [...arr];
  setLoading(true);

  await GetMasters().then((x) => {
    setLoading(false);

    x.forEach((x1) => {
      mst = { ...mst, [x1.mType]: x1.mdata };
    });
  });

  return mst;
};

const getProposalStepper = {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
};

export default getProposalStepper;
