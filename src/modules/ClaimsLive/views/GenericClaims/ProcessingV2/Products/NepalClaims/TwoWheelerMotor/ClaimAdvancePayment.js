import swal from "sweetalert";
import swal2 from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  SearchClaimDetailsByRegClaimNo,
  UpdateClaimDetails,
  SaveClaimHistory,
} from "../../../../../HealthClaims/data";
// import { useDataController } from "../../../../../../../BrokerPortal/context";

const getTopLevelContent = () => [
  { label: "Claim Number", path: "claimNumber", visible: true },
  {
    label: "Total Payable",
    visible: true,
    disabled: true,
    path: "",
    // spacing: 3,
  },
  {
    label: "Claimant Name",
    visible: true,
    disabled: true,
    path: "",
    // spacing: 3,
  },
];

const getMenus = () => [{ label: "Claim Advance Payment", icon: "", visible: true }];

const getAccordions = ({ menuIndex }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [
        { label: "", visible: true },
        { label: "", visible: true },
      ];
      break;
    default:
      data = [];
      break;
  }

  return data;
};

const getControls = ({ menuIndex, dto }) => {
  const userNameId = localStorage.getItem("userId");

  const navigate = useNavigate();
  const handleTrackClaims = () => {
    navigate(`/NepalClaims/Dashboard`, { productCode: "NepalMotorTwoWheeler" });
  };

  const handleProceed = async () => {
    // if (
    //   dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment
    //     .TotalAmountinAdvance !== "" &&
    //   dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment.PayeeName !== "" &&
    //   dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment
    //     .ReasonForAdvancePayment !== "" &&
    //   dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment.ModeofPayment !== "" &&
    //   dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment.BankAccNo !== ""
    // ) {
    const res = await UpdateClaimDetails(dto);
    if (res.status === 1) {
      const data = {
        TransactionNumber: res.finalResult.transactionDataDTO[0].transactionNumber,
        CreatedBy: userNameId,
      };
      await SaveClaimHistory(data);

      swal2
        .fire({
          icon: "success",
          html: `
        <div>
           <p>Claim Advance Payment is Processed </p><br/>
         </div>
          `,

          confirmButtonColor: "#000099",
          confirmButtonText: "OK",
        })
        .then((res1) => {
          if (res1.isConfirmed) {
            handleTrackClaims();
          }
        });
    }
    // } else {
    //   swal({
    //     html: true,
    //     icon: "error",
    //     text: "Please Fill the required fields",
    //   });
    // }
  };

  const handleUserConsent = () => {
    if (
      dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment
        .TotalAmountinAdvance !== "" &&
      dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment.PayeeName !== "" &&
      dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment
        .ReasonForAdvancePayment !== "" &&
      dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment.ModeofPayment !== "" &&
      dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment.BankAccNo !== ""
    ) {
      swal2
        .fire({
          icon: "success",
          html: `
  <div>
    <p>Amount of ${dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.AdvancePayment.TotalAmountinAdvance} is paid in Advance to the beneficiary </p><br/>
  </div>
`,
          confirmButtonColor: "#000099",
          confirmButtonText: "SUBMIT",
        })
        .then((res1) => {
          if (res1.isConfirmed) {
            handleProceed();
          }
        });
    } else {
      swal({
        html: true,
        icon: "error",
        text: "Please Fill the required fields",
      });
    }
  };

  let data = [];

  switch (menuIndex) {
    case 0:
      data = [
        [
          {
            path: "transactionDataDTO.0.transactionDetails.ClaimsInfo.AdvancePayment.PayeeName",
            visible: true,
            type: "Input",
            label: "Pay To (Beneficiary)",
            validationId: 1,
            required: true,
            spacing: 4,
          },
          {
            path: "transactionDataDTO.0.transactionDetails.ClaimsInfo.AdvancePayment.TotalAmountinAdvance",
            visible: true,
            type: "Input",
            label: "Total Amount beign Paid in Advance",
            validationId: 1,
            required: true,
            onChangeFuncs: ["IsNumeric"],
            spacing: 4,
          },
          {
            path: "transactionDataDTO.0.transactionDetails.ClaimsInfo.AdvancePayment.ModeofPayment",
            visible: true,
            type: "Input",
            label: "Mode of Payment",
            validationId: 1,
            required: true,
            spacing: 4,
          },
          {
            // validationId: 1,
            path: "transactionDataDTO.0.transactionDetails.ClaimsInfo.AdvancePayment.BankAccNo",
            visible: true,
            type: "Input",
            label: "Bank A/C Number",
            // required: true,
            spacing: 4,
          },
          {
            path: "transactionDataDTO.0.transactionDetails.ClaimsInfo.AdvancePayment.ReasonForAdvancePayment",
            visible: true,
            type: "Input",
            label: "Reason for Advance Payment",
            validationId: 1,
            required: true,
            spacing: 12,
            multiline: true,
            rows: 4,
          },
        ],
        [
          { type: "Typography", label: "", path: "", visible: true },
          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 1,
            label: "User Consent",
            visible: true,
            component: "label",
            justifyContent: "center",
            onClick: () => handleUserConsent(),
            spacing: 12,
          },
          // {
          //   path: "path8",
          //   visible: true,
          //   type: "Button",
          //   label: "User Consent",
          //   onClick: () => handleUserConsent(),
          //   required: true,
          // },
        ],
      ];
      break;

    default:
      data = [];
      break;
  }

  return data;
};

const getPolicyDto = async ({ genericInfo }) => {
  const res = await SearchClaimDetailsByRegClaimNo("", genericInfo.claimNo);
  console.log("res", res.finalResult);
  return res.finalResult;
  // const [control] = useDataController();
  // const { genericInfo } = control;
  // const dto = genericInfo.claimJson;
  // console.log("dto", dto);
  // return dto;
};

const getMasters = () => ({
  gender: [{ mValue: "male" }, { mValue: "female" }],
});

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
