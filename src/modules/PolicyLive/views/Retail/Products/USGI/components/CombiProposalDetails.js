import {
  TextField,
  Autocomplete,
  Grid,
  Stack,
  // /Radio,
  // RadioGroup,
  FormControlLabel,
} from "@mui/material";
import MDInput from "components/MDInput";
import swal from "sweetalert";
import DeleteIcon from "@mui/icons-material/Delete";
import MDButton from "components/MDButton";
import MDCheckbox from "components/MDCheckbox";
import MDTypography from "components/MDTypography";
import MDDatePicker from "components/MDDatePicker";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
// import FormControlLabel from "@mui/material/FormControlLabel";
import { AgeCalculator } from "Common/Validations";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { UploadFiles } from "modules/PolicyLive/views/Home/data/index";
import { formatDateKYC, Timer } from "../data/Json/USGIWCJson";
import { modelStyle1, modelStyle2 } from "../data/Json/CombiJson";
import CombiPremium from "./CombiPremium";
import { useDataController } from "../../../../../../BrokerPortal/context";
import { getOTP, GetOTP } from "../../../../../../BrokerPortal/Pages/Registration/data/index";
import { AgeCalculator1 } from "../data/Json/CyberInsurance";
import {
  // IsAlphaSpace,
  IsMobileNumber,
} from "../../../../../../../Common/Validations/index";
import {
  DeleteDocument,
  getCkycDetails,
  getCkycUpdateStatus,
  SendSMS,
  CkycRegMail,
} from "../data/APIs/USGIWCApi";

// import MDDatePicker from "components/MDDatePicker";
const Nomineedetails = () => {
  const obj = {
    IsNommineSameasHealth: "",
    NomineeName: "",
    NomineeDOB: "",
    NomineeGender: "",
    NomineeRelationWithProposer: "",
    PercentageOfShare: "",
    GuardianName: "",
    GuardianDOB: "",
    RelationshoipWithGuardian: "",
    RelationWithInsured: "",
    NomineeAddressLine1: "",
    NomineeAddressLine2: "",
    NomineeAddressLine3: "",
    NomineeMobile: "",
    NomineeEmailID: "",
    NomineeCity: "",
    NomineeState: "",
    NomineePincode: "",
    NomineeCountry: "",
    IsNomineeMinor: "",
    AppointeeName: "",
    ApointeeRelationwithNominee: "",
    AppointeeAddress: "",
    AppointeeDOB: "",
    AppointeeGender: "",
    AppointeeMobile: "",
    AppointeEmailID: "",
    NomineeOTP: "",
    AppointeOtherinfo1: "",
    AppointeOtherinfo2: "",
  };
  return obj;
};
const docDetails = () => {
  const obj = {
    contentType: "",
    DocumentType: "",
    DocumentId: "",
    DocumentName: "",
    fileName: "",
    UploadDocDate: "",
    fileUploadStatus: false,
  };
  return obj;
};
// const Family = () => {
//   const obj = {
//     FamilyMembers: "",
//     HealthStatus: "",
//     CurrentAge: "",
//     FamilyMember: "",
//     CauseofDeath: "",
//     AgeatDeath: "",
//   };
//   return obj;
// };
function CombiProposalDetails({ masters, setMasters, dto, setDto }) {
  const lDto = dto;
  const lMasters = masters;
  const handlePremiumBreakup = () => {
    let Validation = false;
    let AliveValid = false;
    let DeadValid = false;
    if (lDto.LifeJSON.FamilyHistory.Alive.length !== 0 && lDto.LifeJSON.FamilyHistory.Dead !== 0) {
      lDto.LifeJSON.FamilyHistory.Alive.forEach((x) => {
        lDto.LifeJSON.FamilyHistory.Dead.forEach((y) => {
          if (x.FamilyMembers === "Father" && y.FamilyMember === "Father") {
            Validation = true;
          }
          if (x.FamilyMembers === "Mother" && y.FamilyMember === "Mother") {
            Validation = true;
          }
        });
      });
    }
    if (lDto.LifeJSON.FamilyHistory.Alive.length !== 0) {
      lDto.LifeJSON.FamilyHistory.Alive.forEach((x, i) => {
        lDto.LifeJSON.FamilyHistory.Alive.forEach((y, j) => {
          if (i !== j) {
            if (x.FamilyMembers === "Father" && y.FamilyMembers === "Father") {
              lDto.LifeJSON.FamilyHistory.Alive[j].FamilyMembers = "";
              AliveValid = true;
            }

            if (x.FamilyMembers === "Mother" && y.FamilyMembers === "Mother") {
              lDto.LifeJSON.FamilyHistory.Alive[j].FamilyMembers = "";
              AliveValid = true;
            }
          }
        });
      });
    }
    if (lDto.LifeJSON.FamilyHistory.Dead.length !== 0) {
      lDto.LifeJSON.FamilyHistory.Dead.forEach((x, i) => {
        lDto.LifeJSON.FamilyHistory.Dead.forEach((y, j) => {
          if (i !== j) {
            if (x.FamilyMember === "Father" && y.FamilyMember === "Father") {
              lDto.LifeJSON.FamilyHistory.Dead[j].FamilyMember = "";
              DeadValid = true;
            }

            if (x.FamilyMember === "Mother" && y.FamilyMember === "Mother") {
              lDto.LifeJSON.FamilyHistory.Dead[j].FamilyMember = "";
              DeadValid = true;
            }
          }
        });
      });
    }
    if (Validation === true) {
      swal({ icon: "error", text: "Pls Select  Correct FamilyHistory" });
    } else if (DeadValid === true) {
      swal({ icon: "error", text: "pls select Correct Dead FamilyHistory" });
    } else if (AliveValid === true) {
      swal({ icon: "error", text: "Pls Select Correct Alive FamilyHistory" });
    } else {
      lMasters.Proposalflag = true;
      setMasters({ ...lMasters });
    }

    setDto({ ...lDto });
    // }
  };
  const [dispatch] = useDataController();
  const onTab = (e, a) => {
    lMasters.proposerProps.tabIndex = a;
    setMasters({ ...lMasters });
  };

  const NomineeDob = (d) => {
    lDto.HealthNomineeDetails[0].NomineeDOB = formatDateKYC(d);
    const age = AgeCalculator(new Date(d));
    if (age < 18) {
      lMasters.flags.nomineeage = true;
    } else {
      lMasters.flags.nomineeage = false;
    }
    setDto({ ...lDto });
  };
  // const ApointeeNomineeDob = (d) => {
  //   debugger;
  //   lDto.HealthNomineeDetails[0].ApointeeNomineeDob = formatDateKYC(d);
  //   // const nomineeDob = formatDateKYC(d);
  //   const currentDate = new Date();
  //   const ageDifference =
  //     currentDate.getFullYear() -
  //     lDto.HealthNomineeDetails[0].Appointee.ApointeeNomineeDob.getFullYear();
  //   if (ageDifference < 18) {
  //     swal({ icon: "error", text: "Age should not be less than 18 years" });
  //   }

  //   setDto({ ...lDto });
  // };
  const LifeNomineeDob = (d, i) => {
    lDto.LifeJSON.LifeInusred.Nominee[i].NomineeDOB = formatDateKYC(d);
    const age = AgeCalculator(new Date(d));
    lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge = age;
    // if (age < 18) {
    //   lMasters.flags.RiskNomineeAge = true;
    // } else {
    //   lMasters.flags.RiskNomineeAge = false;
    // }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const onAddNomineeDetails = () => {
    if (
      lDto.HealthNomineeDetails[0].NomineeName === "" ||
      // lDto.HealthNomineeDetails[0].NomineeGender === "" ||
      lDto.HealthNomineeDetails[0].NomineeDOB === "" ||
      // lDto.HealthNomineeDetails[0].NomineeRelationWithProposer === "" ||
      lDto.HealthNomineeDetails[0].NomineeAddressLine1 === ""
    ) {
      swal({ icon: "error", text: "Please fill Health Nominee Details first" });
    } else {
      lDto.LifeJSON.LifeInusred.Nominee = [
        ...dto.LifeJSON.LifeInusred.Nominee,
        { ...Nomineedetails() },
      ];
    }
    setDto({ ...lDto });
  };

  const onRemoveNomineeDetails = (i) => {
    const i2 = i - 1;
    const arr1 = lDto.LifeJSON.LifeInusred.Nominee.filter((x, i1) => i1 !== i2);
    lDto.LifeJSON.LifeInusred.Nominee = arr1;
    setDto({ ...lDto });
  };
  const handleNomineeSendOTP = (i) => {
    lMasters.i = i;
    if (dto.LifeJSON.LifeInusred.Nominee[i].AppointeEmailID === "") {
      swal({
        icon: "error",
        text: "Please enter email ID",
      });
    } else {
      lMasters.proposerProps.NomineestartCounterFlag[i] = true;
      const sendOtp = {
        name: "",
        otp: "1234",
        email: dto.LifeJSON.LifeInusred.Nominee[i].AppointeEmailID,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: dto.LifeJSON.LifeInusred.Nominee[i].AppointeeMobile,
        sendSms: true,
        isBerry: false,
        client: process.env.REACT_APP_Client,
      };

      getOTP(sendOtp).then((res) => {
        if (res.status === 1) {
          lMasters.proposerProps.Nomineestatus = true;
        } else {
          lMasters.proposerProps.Nomineestatus = false;
        }
      });
      setMasters({ ...lMasters });
    }
  };
  const handleNomineeVerifyOTP = (i) => {
    if (dto.LifeJSON.LifeInusred.Nominee[i].NomineeOTP === "") {
      swal({ icon: "error", text: "Please enter OTP" });
    } else {
      const verifyOTP = {
        otp: dto.LifeJSON.LifeInusred.Nominee[i].NomineeOTP,
        email: dto.LifeJSON.LifeInusred.Nominee[i].AppointeEmailID,
        mobileNumber: dto.LifeJSON.LifeInusred.Nominee[i].AppointeeMobile,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      GetOTP(dispatch, verifyOTP).then((res) => {
        console.log("res", res);
        if (res !== null) {
          if (res.status === 1) {
            swal({ icon: "success", text: "OTP verified successfully" });
            lMasters.proposerProps.NomineestartCounterFlag[i] = { NomineestartCounterFlag: false };
            lMasters.proposerProps.NomineeOtpfalg[i] = { Nomineeotpflag: true };
          } else {
            lMasters.proposerProps.NomineeOtpfalg[i] = { Nomineeotpflag: false };
            swal({ icon: "error", text: "Please enter valid OTP" });
          }
        } else {
          lMasters.proposerProps.NomineeOtpfalg[i] = { otpflag: false };
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      });
      setMasters({ ...lMasters });
    }
  };

  const spreedNomineedetails = () => {
    const arr = [];
    dto.LifeJSON.LifeInusred.Nominee.forEach((x, i) => {
      arr.push(
        {
          type: "Typography",
          label: `Nominee ${i + 1}`,
          visible: true,
          variant: "h6",
          spacing: 12,
        },
        {
          type: "Input",
          label: "Nominee name",
          spacing: 3,
          required: true,
          visible: true,
          onChangeFuncs: ["IsAlphaSpace"],
          path: `LifeJSON.LifeInusred.Nominee.${i}.NomineeName`,
          disabled: i === 0,
        },
        {
          type: "AutoComplete",
          label: "Gender",
          visible: true,
          spacing: 3,
          required: true,
          options: masters?.Gender,
          path: `LifeJSON.LifeInusred.Nominee.${i}.NomineeGender`,
          disabled: i === 0,
        },
        {
          type: "MDDatePicker",
          required: true,
          spacing: 3,
          visible: true,
          allowInput: true,
          dateFormat: "d-m-Y",
          customOnChange: (d) => LifeNomineeDob(d, i),
          label: "Nominee DOB",
          path: `LifeJSON.LifeInusred.Nominee.${i}.NomineeDOB`,
          disabled: i === 0,
        },
        {
          type: "AutoComplete",
          label: "Nominee Relationship",
          visible: true,
          spacing: 3,
          required: true,
          options: masters?.ReltionshipNominee,
          path: `LifeJSON.LifeInusred.Nominee.${i}.NomineeRelationWithProposer`,
          disabled: i === 0,
        },
        {
          type: "Input",
          label: "Nominee Address",
          spacing: 3,
          required: true,
          visible: true,
          path: `LifeJSON.LifeInusred.Nominee.${i}.NomineeAddressLine1`,
          disabled: i === 0,
        },
        {
          type: "Checkbox",
          label: "Is Nominee a Minor",
          spacing: 12,
          checkedVal: "Yes",
          unCheckedVal: "No",
          required: true,
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          path: `LifeJSON.LifeInusred.Nominee.${i}.IsNomineeMinor`,
          disabled: i === 0,
        },
        {
          type: "Input",
          label: "Appointee Name",
          spacing: 3,
          required: true,
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          path: `LifeJSON.LifeInusred.Nominee.${i}.AppointeeName`,
          disabled: i === 0,
        },
        {
          type: "AutoComplete",
          label: "Appointee Gender",
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          spacing: 3,
          required: true,
          options: masters.Gender,
          path: `LifeJSON.LifeInusred.Nominee.${i}.AppointeeGender`,
          disabled: i === 0,
        },
        {
          type: "MDDatePicker",
          required: true,
          spacing: 3,
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          disabled: i === 0,
          allowInput: true,
          dateFormat: "d-m-Y",
          label: "Appointee DOB",
          path: `LifeJSON.LifeInusred.Nominee.${i}.AppointeeDOB`,
        },
        {
          type: "AutoComplete",
          label: "Appointee Realtionship",
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          spacing: 3,
          required: true,
          path: `LifeJSON.LifeInusred.Nominee.${i}.ApointeeRelationwithNominee`,
          disabled: i === 0,
          options: masters?.ReltionshipAppointee,
        },
        {
          type: "Input",
          label: "Appointee Address",
          spacing: 3,
          required: true,
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          path: `LifeJSON.LifeInusred.Nominee.${i}.AppointeeAddress`,
          disabled: i === 0,
        },
        {
          type: "Input",
          label: "Appointee Email Id",
          spacing: 3,
          required: true,
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          path: `LifeJSON.LifeInusred.Nominee.${i}.AppointeEmailID`,
          // disabled: i === 0,
        },
        {
          type: "Input",
          label: "Appointee Mobile No",
          spacing: 3,
          required: true,
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          path: `LifeJSON.LifeInusred.Nominee.${i}.AppointeeMobile`,
          // disabled: i === 0,
        },
        {
          type: "Checkbox",
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          required: true,
          label: "Proposal Consent",
          spacing: 12,
          checkedVal: true,
          unCheckedVal: false,
          path: `LifeJSON.LifeInusred.Nominee.${i}.AppointeeConsent`,

          // customOnChange: (e) => onCheck(e),
        },
        {
          type: "Input",
          label: "Enter OTP",
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          required: true,
          path: `LifeJSON.LifeInusred.Nominee.${i}.NomineeOTP`,
          spacing: 3,
          onChangeFuncs: ["IsNumeric"],
          InputProps: { maxLength: 6 },
          disabled: masters?.proposerProps?.NomineeOtpfalg[i]?.otpflag,
        },
        {
          type: "Typography",
          label: "",
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          spacing: 1,
        },

        {
          type: "Custom",
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          return: (
            <Grid item xs={12} sm={12} md={6}>
              {masters?.proposerProps?.NomineeTimeFlag[i]?.NomineetimerFlag ? (
                <MDButton
                  color="primary"
                  variant="contained"
                  onClick={() => handleNomineeSendOTP(i)}
                  // disabled={masters?.proposerProps?.otpflag}
                >
                  Re-Send OTP
                </MDButton>
              ) : (
                dto.LifeJSON.LifeInusred.Nominee[i].AppointeeConsent === true && (
                  <MDButton
                    color="primary"
                    variant="contained"
                    onClick={() => handleNomineeSendOTP(i)}
                  >
                    Send OTP
                  </MDButton>
                )
              )}
            </Grid>
          ),
        },
        {
          type: "Button",
          label: "Verify OTP",
          visible:
            i === 0
              ? lMasters?.flags?.nomineeage
              : lDto.LifeJSON.LifeInusred.Nominee[i].NomineeAge < 18,
          spacing: 3,
          onClick: () => handleNomineeVerifyOTP(i),
          variant: "contained",
          disabled: masters?.proposerProps?.otpflag,
        },
        {
          type: "Typography",
          label: (
            <Timer counter={masters.proposerProps.counter} status={masters.proposerProps.status} />
          ),

          visible:
            dto.LifeJSON.LifeInusred.Nominee[i].AppointeeConsent &&
            masters?.proposerProps?.startCounterFlag,
          spacing: 7,
        }
      );
    });
    return arr;
  };
  const onAddFamilyMembers = () => {
    const obj = {
      SlNo: lDto.LifeJSON.FamilyHistory.Alive.length,
      FamilyMembers: "",
      HealthStatus: "",
      CurrentAge: "",
    };

    lDto.LifeJSON.FamilyHistory.Alive = [...dto.LifeJSON.FamilyHistory.Alive, obj];
    setDto({ ...lDto });
  };
  const OnDeathFamilyMembers = () => {
    const obj = {
      SlNo: lDto.LifeJSON.FamilyHistory.Dead.length,
      FamilyMember: "",
      CauseofDeath: "",
      AgeatDeath: "",
    };
    lDto.LifeJSON.FamilyHistory.Dead = [...dto.LifeJSON.FamilyHistory.Dead, obj];
    setDto({ ...lDto });
  };

  const onFamilyDetails = (e, value, name, param) => {
    const index = param.api.getRowIndex(param.row.SlNo);
    if (name === "FamilyMember") {
      lDto.LifeJSON.FamilyHistory.Alive[index].FamilyMembers = value.mValue;
    }
    if (name === "HealthStatus") {
      lDto.LifeJSON.FamilyHistory.Alive[index].HealthStatus = e.target.value;
    }
    if (name === "CurrentAge") {
      lDto.LifeJSON.FamilyHistory.Alive[index].CurrentAge = e.target.value;
    }
    let Validation = false;
    let AliveValid = false;
    if (lDto.LifeJSON.FamilyHistory.Alive.length !== 0 && lDto.LifeJSON.FamilyHistory.Dead === 0) {
      lDto.LifeJSON.FamilyHistory.Alive.forEach((x, i) => {
        lDto.LifeJSON.FamilyHistory.Dead.forEach((y, j) => {
          if (i === j) {
            if (x.FamilyMembers === "Father" && y.FamilyMember === "Father") {
              lDto.LifeJSON.FamilyHistory.Alive[i].FamilyMembers = "";
              Validation = true;
            }
            if (x.FamilyMembers === "Mother" && y.FamilyMember === "Mother") {
              lDto.LifeJSON.FamilyHistory.Alive[i].FamilyMembers = "";
              Validation = true;
            }
          }
        });
      });
    }
    if (lDto.LifeJSON.FamilyHistory.Alive.length !== 0) {
      lDto.LifeJSON.FamilyHistory.Alive.forEach((x, i) => {
        lDto.LifeJSON.FamilyHistory.Alive.forEach((y, j) => {
          if (i !== j) {
            if (x.FamilyMembers === "Father" && y.FamilyMembers === "Father") {
              lDto.LifeJSON.FamilyHistory.Alive[j].FamilyMembers = "";
              AliveValid = true;
            }

            if (x.FamilyMembers === "Mother" && y.FamilyMembers === "Mother") {
              lDto.LifeJSON.FamilyHistory.Alive[j].FamilyMembers = "";
              AliveValid = true;
            }
          }
        });
      });
    }
    if (Validation === true) {
      swal({ icon: "error", text: "Pls Select  Correct FamilyHistory" });
    }
    if (AliveValid === true) {
      swal({ icon: "error", text: "Pls Select Correct Alive FamilyHistory" });
    }
  };
  const onFamily = (e, value, name, param) => {
    const index = param.api.getRowIndex(param.row.SlNo);
    if (name === "Member") {
      lDto.LifeJSON.FamilyHistory.Dead[index].FamilyMember = value.mValue;
    }
    if (name === "CauseofDeath") {
      lDto.LifeJSON.FamilyHistory.Dead[index].CauseofDeath = e.target.value;
    }
    if (name === "AgeatDeath") {
      lDto.LifeJSON.FamilyHistory.Dead[index].AgeatDeath = e.target.value;
    }
    let Validation = false;
    let DeadValid = false;
    if (lDto.LifeJSON.FamilyHistory.Alive.length !== 0 && lDto.LifeJSON.FamilyHistory.Dead === 0) {
      lDto.LifeJSON.FamilyHistory.Alive.forEach((x, i) => {
        lDto.LifeJSON.FamilyHistory.Dead.forEach((y, j) => {
          if (i !== j) {
            if (x.FamilyMembers === "Father" && y.FamilyMember === "Father") {
              lDto.LifeJSON.FamilyHistory.Dead[j].FamilyMember = "";
              Validation = true;
            }
            if (x.FamilyMembers === "Mother" && y.FamilyMember === "Mother") {
              lDto.LifeJSON.FamilyHistory.Dead[j].FamilyMember = "";
              Validation = true;
            }
          }
        });
      });
    }
    if (lDto.LifeJSON.FamilyHistory.Dead.length !== 0) {
      lDto.LifeJSON.FamilyHistory.Dead.forEach((x, i) => {
        lDto.LifeJSON.FamilyHistory.Dead.forEach((y, j) => {
          if (i !== j) {
            if (x.FamilyMember === "Father" && y.FamilyMember === "Father") {
              lDto.LifeJSON.FamilyHistory.Dead[j].FamilyMember = "";
              DeadValid = true;
            }

            if (x.FamilyMember === "Mother" && y.FamilyMember === "Mother") {
              lDto.LifeJSON.FamilyHistory.Dead[j].FamilyMember = "";
              DeadValid = true;
            }
          }
        });
      });
    }
    if (Validation === true) {
      swal({ icon: "error", text: "Pls Select  Correct FamilyHistory" });
    }
    if (DeadValid === true) {
      swal({ icon: "error", text: "pls select Correct Dead FamilyHistory" });
    }
    setDto({ ...lDto });
  };

  const handleFileUpload = async (event) => {
    if (dto?.DocumentDetails.some((x) => x.DocumentName === "")) {
      swal({
        icon: "error",
        text: "Please select the Document Name before uploading",
      });
    } else {
      console.log(event);
      const file = event.target.files[0];
      const fsize = Math.round(event.target.files[0].size / 1024);
      if (fsize > 10240) {
        swal({
          icon: "error",
          text: "File Size should be less than 10 mb",
        });
      } else {
        const formData = new FormData();
        formData.append("file", file, file.name);
        await UploadFiles(formData).then((result) => {
          if (result.data[0].fileName !== null) {
            lDto.DocumentDetails[Number(event.target.name)].fileName = result.data[0].fileName;
            lDto.DocumentDetails[Number(event.target.name)].UploadDocDate =
              new Date().toLocaleDateString("en-GB");
            lDto.DocumentDetails[Number(event.target.name)].fileUploadStatus = true;
            lDto.DocumentDetails[Number(event.target.name)].DocumentId = result.data[0].docid;
            lMasters.proposerProps.cancelIcon = true;
            setMasters({ ...lMasters });
            setDto({ ...lDto });
            swal({
              icon: "success",
              text: "Document uploaded successfully",
            });
          }
        });
      }
    }
  };
  const handleDeleteFile = async (i) => {
    const fileName = dto.DocumentDetails.filter((x, i1) => i1 === i)[0].fileName.toString();

    await DeleteDocument(fileName).then((res) => {
      lDto.DocumentDetails[i].DocumentName = "";
      if (res.data.status === 5) {
        const filter = { ...dto.DocumentDetails[i] };
        filter.DocumentId = "";
        filter.DocumentType = "";
        filter.UploadDocDate = "";
        filter.contentType = "";
        filter.fileName = "";
        lDto.DocumentDetails.splice(i, 1, { ...filter });
        setDto({ ...lDto });
      }
    });
  };
  const onAddDocument = () => {
    if (dto?.DocumentDetails.some((x) => x.fileName === "")) {
      swal({
        icon: "error",
        text: "Please upload the file before Adding",
      });
    } else if (lDto.DocumentDetails.length < 10) {
      lDto.DocumentDetails = [...lDto.DocumentDetails, { ...docDetails() }];
      setDto({ ...lDto });
    } else {
      swal({
        icon: "error",
        text: "Only 10 documents can upload",
      });
    }
  };
  const handleDocFileDelete = async (i) => {
    const arr1 = dto.DocumentDetails.filter((x, i1) => i1 !== i);
    lDto.DocumentDetails = arr1;
    setDto({ ...lDto });
  };
  const spreedDocComponents = () => {
    const arr = [];
    dto.DocumentDetails.forEach((x, i) => {
      arr.push(
        {
          type: "AutoComplete",
          label: "Document Name",
          path: `DocumentDetails.${i}.DocumentName`,
          visible: masters?.proposerProps?.tabIndex === 0,
          disableClearable: true,
          // readOnly: lDto.documentDetails[i].fileName !== "",
          // disabled: lDto.documentDetails[i].fileName !== "",
          spacing: 3,
          options: masters?.documentname,
        },
        {
          type: "Input",
          spacing: 3,
          label: "Document Remarks",
          path: `DocumentDetails.${i}.DocumentType`,
          visible: masters?.proposerProps?.tabIndex === 0,
        },
        {
          type: "Custom",
          spacing: 2.5,
          visible: masters?.proposerProps?.tabIndex === 0,
          return: (
            <MDButton variant="outlined" component="label">
              CHOOSE AND UPLOAD
              <input
                id="fileInput"
                hidden
                name={i}
                accept="image/bmp, image/jpeg, image/png, .pdf"
                type="file"
                onChange={(e) => handleFileUpload(e)}
              />
            </MDButton>
          ),
        },
        {
          type: "Custom",

          visible: masters?.proposerProps?.tabIndex === 0,
          spacing: 0.7,
          return: <DeleteIcon color="primary" onClick={() => handleDeleteFile(i)} />,
        },
        {
          type: "Button",
          label: "ADD",
          startIcon: <AddIcon />,
          visible: masters?.proposerProps?.tabIndex === 0,
          variant: "outlined",
          disabled: dto.DocumentDetails.fileName === "",
          onClick: onAddDocument,
          spacing: 1.8,
        },
        {
          type: "Custom",

          visible: masters?.proposerProps?.tabIndex === 0 && i !== 0,
          spacing: 1,
          return: <CancelIcon color="primary" onClick={() => handleDocFileDelete(i)} />,
        },
        {
          type: "Custom",
          spacing: 6.2,
          visible: true,
        },
        {
          type: "TypographyVal",
          spacing: 4,
          sx: { fontSize: "10px" },
          path: `DocumentDetails.${i}.fileName`,
          visible: masters?.proposerProps?.tabIndex === 0,
        },
        {
          type: "Custom",
          spacing: 1.8,
          visible: true,
        }
      );
    });
    return arr;
  };

  const onLocationDetails = (e, name, value, params) => {
    lMasters.Maternity = false;
    const index = params.api.getRowIndex(params.row.InsuredSR);
    if (name === "SumInsured") {
      lDto.InsurableItem[0].RiskItems[index].SumInsured = value.mValue;
    }
    if (name === "FirstName") {
      lDto.InsurableItem[0].RiskItems[index].FirstName = e.target.value;
    }
    if (name === "LastName") {
      lDto.InsurableItem[0].RiskItems[index].LastName = e.target.value;
    }
    if (lDto.ProposerDetails.IsProposerPrimaryInsured === "No") {
      lDto.LifeJSON.LifeInusred.LINAME = `${lDto.InsurableItem[0].RiskItems[0].FirstName} ${lDto.InsurableItem[0].RiskItems[0].LastName}`;
    }

    if (name === "InsuredGender") {
      lDto.InsurableItem[0].RiskItems[index].InsuredGender = value.mValue;
    }
    if (name === "Nationality") {
      lDto.InsurableItem[0].RiskItems[index].Nationality = value.mValue;
    }
    if (name === "Height") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        lDto.InsurableItem[0].RiskItems[index].HeightCm = e.target.value;
      }
    }
    if (name === "Weight") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        lDto.InsurableItem[0].RiskItems[index].WeightKG = e.target.value;
      }
    }
    if (name === "BMI") {
      lDto.InsurableItem[0].RiskItems[index].BMI = e.target.value;
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const handlePanChange = (e) => {
    lDto.CustomerType = e.target.value;
    if (e.target.value === "Corporate") {
      lDto.ProposerDetails.PanNo = "";
      lDto.ProposerDetails.DOB = "";
      lDto.ProposerDetails.GSTNumber = "";
      lDto.ProposerDetails.CIN = "";
      lDto.ProposerDetails.CKYCParam = "";
    } else {
      lDto.ProposerDetails.PanNo = "";
      lDto.ProposerDetails.DOB = "";
    }
    setDto({ ...dto });
  };
  lDto.LifeJSON.LifeInusred.Nominee[0].NomineeName =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].NomineeName
      : "";
  lDto.LifeJSON.LifeInusred.Nominee[0].NomineeGender =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].NomineeGender
      : "";
  lDto.LifeJSON.LifeInusred.Nominee[0].NomineeDOB =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].NomineeDOB
      : "";
  lDto.LifeJSON.LifeInusred.Nominee[0].NomineeRelationWithProposer =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].NomineeRelationWithProposer
      : "";
  lDto.LifeJSON.LifeInusred.Nominee[0].NomineeAddressLine1 =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].NomineeAddressLine1
      : "";
  lDto.LifeJSON.LifeInusred.Nominee[0].IsNomineeMinor =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].IsNomineeMinor
      : "";
  lDto.LifeJSON.LifeInusred.Nominee[0].AppointeeName =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].Appointee.AppointeeName
      : "";
  lDto.LifeJSON.LifeInusred.Nominee[0].AppointeeGender =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].Appointee.AppointeeGender
      : "";
  lDto.LifeJSON.LifeInusred.Nominee[0].AppointeeDOB =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].Appointee.AppointeeDOB
      : "";

  lDto.LifeJSON.LifeInusred.Nominee[0].ApointeeRelationwithNominee =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].Appointee.ApointeeRelationwithNominee
      : "";
  lDto.LifeJSON.LifeInusred.Nominee[0].AppointeeAddress =
    lDto.LifeJSON.LifeInusred.Nominee[0].IsNommineSameasHealth === "Yes"
      ? dto.HealthNomineeDetails[0].Appointee.AppointeeAddress
      : "";
  // const handleQuestion = () => {
  //   // lMasters.Index = params.api.getRowIndex(params.row.InsuredSR);
  //   lMasters.flags.question = true;
  //   setMasters({ ...lMasters });
  // };
  const initiateCkyc = async () => {
    if (dto?.CustomerType === "Individual") {
      const dobString = lDto.ProposerDetails.DOB;
      const [day, month, year] = dobString.split("-");
      const date = new Date(`${year}-${month}-${day}`);
      const Age = AgeCalculator1(date.toLocaleDateString("en-ZA"));
      if (Age < 18) {
        lMasters.flags.dob = true;
      } else {
        lMasters.flags.dob = false;
      }
      setMasters({ ...lMasters });
    } else {
      lMasters.flags.dob = false;
      setMasters({ ...lMasters });
    }

    if (lMasters.flags.dob === true) {
      swal({
        icon: "error",
        text: "Age cannot be less than 18 Years",
      });
    } else {
      const objAadhar = {
        source: "AVO",
        customerType: dto.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "AVO/261122/009",
        idNo: dto.ProposerDetails.AadharID,
        idType: "AADHAAR",
        dob: dto.ProposerDetails.DOB,
        mobileNo: dto.ProposerDetails.AadharMobileNo,
        pincode: "",
        ckycNo: "",
        extraField1: dto.ProposerDetails.AadharName,
        extraField2: dto.ProposerDetails.AadharGender === "Female" ? "F" : "M",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      const obj1 = {
        source: "AVO",
        customerType: dto.CustomerType === "Individual" ? "I" : "C",
        uniqueTransactionNumber: "",
        idNo:
          dto.CustomerType === "Individual"
            ? dto?.ProposerDetails.PanNo
            : dto.CustomerType === "Corporate" &&
              (dto?.ProposerDetails?.PanNo ||
                dto?.ProposerDetails?.GSTNumber ||
                dto?.ProposerDetails?.CINNo),
        idType:
          dto.CustomerType === "Individual"
            ? dto?.ProposerDetails?.PanNo && "PAN"
            : dto.CustomerType === "Corporate" &&
              ((dto.ProposerDetails.PanNo && "PAN") ||
                (dto.ProposerDetails.GSTNumber && "GSTIN") ||
                (dto.ProposerDetails.CINNo && "CIN")),
        dob: dto?.ProposerDetails?.DOB,
        mobileNo: "",
        pincode: "",
        ckycNo: "",
        extraField1: "",
        extraField2: "",
        extraField3: "",
        extraField4: "",
        extraField5: "",
      };
      const obj2 = dto.ProposerDetails.AadharID !== "" ? objAadhar : obj1;
      const res1 = await getCkycDetails(1204, obj2);
      lDto.CkycStatus = res1.status;
      lDto.CkycDetails = res1;
      setDto({ ...lDto });
      if (res1.status === "success") {
        swal({
          text: `CKYC Successfull.`,
          icon: "success",
        });
      }
      if (res1.status === "failure") {
        swal({
          icon: "error",
          text: "CKYC Failure",
        });
      }
      lMasters.proposerProps.var = { ...lMasters.proposerProps.var, ...res1 };
    }

    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const updateckyc = async () => {
    const obj1 = {
      source: "AVO",
      uniqueTransactionNumber: masters.proposerProps.var.uniqueTransactionNumber,
      extraField1: "",
      extraField2: "",
      extraField3: "",
      extraField4: "",
      extraField5: "",
    };
    const res = await getCkycUpdateStatus(obj1);
    console.log("updateckyc", res);
    lDto.CkycStatus = res?.status;
    lDto.CkycDetails = res;

    if (res.status === "success") {
      // lMasters.flags.updateflags = true;
      swal({
        text: `CKYC Successfull.`,
        icon: "success",
      });

      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
  };
  const sendMail = async () => {
    const notificationReq = {
      notificationRequests: [
        {
          templateKey: "BGR_Ckyclink",
          sendEmail: false,
          isEmailBody: true,
          notificationPayload: JSON.stringify({
            CkycUrl: masters.proposerProps.var.result.manualKYCurl,
            ContactUsUrl: process.env.REACT_APP_CONTACTSUPPORT,
          }),
        },
      ],
      sendEmail: true,
      subject: "CKYC Registration Link",
      toEmail: dto.ProposerDetails.EmailId,
    };
    const mail = await CkycRegMail(notificationReq);
    console.log("mail", mail);
    if (mail.status === 1) {
      swal({
        text: `Email sent successfully.`,
        icon: "success",
      });
    }
    const MobileNo = dto.ProposerDetails.ContactNo;
    const message = `Dear customer ,
    Greetings from Universal Sompo General Insurance!  Click here ${masters.proposerProps.var.result.manualKYCurl} to complete your KYC. Please ignore if you have completed the KYC.`;
    await SendSMS("usgi", MobileNo, message).then((smsresp) => {
      console.log("smsresp", smsresp);
    });
  };

  const handleSendOTP = () => {
    if (dto.ProposerDetails.EmailId === "") {
      swal({
        icon: "error",
        text: "Please enter email ID",
      });
    } else {
      lMasters.proposerProps.startCounterFlag = true;

      const sendOtp = {
        name: "",
        otp: "1234",
        email: dto.ProposerDetails.EmailId,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: dto.ProposerDetails.ContactNo,
        sendSms: true,
        isBerry: false,
        client: process.env.REACT_APP_Client,
      };

      getOTP(sendOtp).then((res) => {
        if (res.status === 1) {
          lMasters.proposerProps.status = true;
        } else {
          lMasters.proposerProps.status = false;
        }
      });
      setMasters({ ...lMasters });
    }
  };

  const handleVerifyOTP = () => {
    if (dto.ProposalConsentandDeclartion.ProposalConsentOTP === "") {
      swal({ icon: "error", text: "Please enter OTP" });
    } else {
      const verifyOTP = {
        otp: dto.ProposalConsentandDeclartion.ProposalConsentOTP,
        email: dto.ProposerDetails.EmailId,
        mobileNumber: dto.ProposerDetails.ContactNo,
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "MICA",
        isFirstTimeUser: true,
        isClaimsLive: false,
      };
      GetOTP(dispatch, verifyOTP).then((res) => {
        console.log("res", res);
        if (res !== null) {
          if (res.status === 1) {
            swal({ icon: "success", text: "OTP verified successfully" });
            lMasters.proposerProps.startCounterFlag = false;
            lMasters.proposerProps.otpflag = true;
          } else {
            lMasters.proposerProps.otpflag = false;
            swal({ icon: "error", text: "Please enter valid OTP" });
          }
        } else {
          lMasters.proposerProps.otpflag = false;
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      });
      setMasters({ ...lMasters });
    }
  };
  // const handleQuestionValidation = () => {
  //   if (
  //     lMasters.proposerProps.Tabaccoflag === true &&
  //     lMasters.QuesArry[lMasters.Index].Ques.filter(
  //       (x) => x.IsRadioChecked === "No" && (x.Typecode === "726" || x.Typecode === "731")
  //     ).length <= 0
  //   ) {
  //     swal({ icon: "error", text: "Under Writer approved" });
  //   } else {
  //     lMasters.flags.question = false;
  //     setMasters({ ...lMasters });
  //   }
  // };
  const handelQuestionClose = () => {
    if (
      lMasters.proposerProps.Tabaccoflag === true &&
      lMasters.QuesArry[lMasters.Index].Ques.filter(
        (x) => x.IsRadioChecked === "No" && (x.Typecode === "726" || x.Typecode === "731")
      ).length <= 0
    ) {
      swal({ icon: "error", text: "Under Writer approved" });
    } else {
      lDto.InsurableItem[0].RiskItems[lMasters.Index].MedicalCaseIndividual = [];
      lMasters.QuesArry[lMasters.Index]?.Ques.forEach((x) => {
        lDto.InsurableItem[0].RiskItems[lMasters.Index]?.MedicalCaseIndividual.push(x);
      });
      lMasters.flags.question = false;

      setMasters({ ...lMasters });
    }
  };

  const handelDeclarationClose = () => {
    if (
      lMasters.proposerProps.Declareflag === true &&
      lMasters.DeclArry[lMasters.Index].Decl.filter(
        (x) => x.IsRadioChecked === "No" && (x.DeclarationID === "738" || x.DeclarationID === "742")
      ).length <= 0
    ) {
      swal({ icon: "error", text: "Under Writer approved" });
    } else {
      lDto.InsurableItem[0].RiskItems[lMasters.Index].DeclartaionIndividualPlan = [];
      lMasters.DeclArry[lMasters.Index]?.Decl.forEach((x) => {
        lDto.InsurableItem[0].RiskItems[lMasters.Index]?.DeclartaionIndividualPlan.push(x);
      });
      lMasters.flags.Declaration = false;
      setMasters({ ...lMasters });
    }
  };

  const handleQuestionRadio = (e, i, m, name) => {
    const ischecked = e.target.checked;
    if (name === "Yes" && ischecked === true) {
      // lMasters.Questionry.IsRadioChecked = e.target.value;
      // lMasters.Questionry.Typecode = t;
      // lMasters.Q.Ques[i] = { ...lMasters.Questionry };
      lMasters.QuesArry[lMasters.Index].Ques[i].IsRadioChecked = ischecked === true ? "Yes" : "No";
      if (m === "726" || m === "731") {
        lMasters.proposerProps.Tabaccoflag = true;
      }
    }
    if (name === "No" && ischecked === true) {
      lMasters.QuesArry[lMasters.Index].Ques[i].IsRadioChecked = ischecked === true ? "No" : "Yes";
      if (m === "726") {
        lMasters.QuesArry[lMasters.Index].Ques.forEach((x, j) => {
          if (Number(x.Typecode) > 726) {
            lMasters.QuesArry[lMasters.Index].Ques[j].IsRadioChecked = "No";
            setMasters({ ...lMasters });
          }
        });
      }
      if (m === "731") {
        lMasters.QuesArry[lMasters.Index].Ques.forEach((x, j) => {
          if (Number(x.Typecode) > 731) {
            lMasters.QuesArry[lMasters.Index].Ques[j].IsRadioChecked = "No";
            setMasters({ ...lMasters });
            // const y = { ...x };
            // y.IsRadioChecked = "No";
          }
        });
      }
    }
    if (name === "Weightgain") {
      lMasters.QuesArry[lMasters.Index].Ques[i].Weightgain = e.target.value;
    }
    if (name === "Weightloss") {
      lMasters.QuesArry[lMasters.Index].Ques[i].Weightloss = e.target.value;
    }
    if (name === "Reason") {
      lMasters.QuesArry[lMasters.Index].Ques[i].Reason = e.target.value;
    }
    setMasters({ ...lMasters });
  };
  console.log("keerthi", lDto);
  const handleDeclarationRadio = (e, i, m, name) => {
    const ischecked = e.target.checked;
    if (name === "Yes" && ischecked === true) {
      // lMasters.Questionry.IsRadioChecked = e.target.value;
      // lMasters.Questionry.Typecode = t;
      // lMasters.Q.Ques[i] = { ...lMasters.Questionry };
      lMasters.DeclArry[lMasters.Index].Decl[i].IsRadioChecked = ischecked === true ? "Yes" : "No";
      if (m === "738" || m === "742") {
        lMasters.proposerProps.Declareflag = true;
      }
    }
    if (name === "No" && ischecked === true) {
      lMasters.DeclArry[lMasters.Index].Decl[i].IsRadioChecked = ischecked === true ? "No" : "Yes";

      // lMasters.Questionry.IsRadioChecked = e.target.value;
      // lMasters.Q.Ques[i] = { ...lMasters.Questionry };
      // lMasters.QuesArry[lMasters.Index] = { ...lMasters.Q };
    }

    setMasters({ ...lMasters });
  };

  // const handleDeclarationValidation = () => {
  //   if (
  //     lMasters.proposerProps.Declareflag === true &&
  //     lMasters.DeclArry[lMasters.Index].Decl.filter(
  //       (x) => x.IsRadioChecked === "No" && (x.DeclarationID === "738" || x.DeclarationID === "742")
  //     ).length <= 0
  //   ) {
  //     swal({ icon: "error", text: "Under Writer approved" });
  //   } else {
  //     lMasters.flags.Declaration = false;
  //     setMasters({ ...lMasters });
  //   }
  // };
  return [
    [
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: { label: "Customer Type", labelVisible: true },
        radioList: [
          {
            value: "Individual",
            label: "Individual",
            disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
          {
            value: "Corporate",
            label: "Corporate",
            disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
        ],
        path: "CustomerType",
        customOnChange: (e) => handlePanChange(e),
        spacing: 12,
      },
      {
        type: "Input",
        label: "CKYC Status",
        visible: true,
        disabled: true,
        value: dto.CkycStatus,
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "",
      },
      {
        type: "AutoComplete",
        label: "Select ID Type",
        path: `ProposerDetails.CKYCParam`,
        options: masters?.CkycParams,
        visible: true,
        spacing: 3,
        required: true,
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "",
      },
      {
        type: "Input",
        label: "PAN Number",
        spacing: 2.3,
        visible:
          dto?.ProposerDetails?.CKYCParam === "PAN Number" || dto.CustomerType === "Corporate",
        required: true,
        // customOnBlur: (e) => handlevalidChange(e),
        // onBlurFuncs: ["IsPan"],
        path: `ProposerDetails.PanNo`,
        disabled:
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.CINNo !== "") ||
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.GSTNumber !== "") ||
          dto.CkycStatus === "success" ||
          dto.CkycStatus === "failure",
        // error: masters.proposerProps.panflag && dto.ProposerDetails.PanNo !== "",
        // errtext:
        //   masters.proposerProps.panflag && dto.ProposerDetails.PanNo !== "" && "Enter valid Pan No",
      },
      {
        type: "Input",
        label: "GST Number",
        visible: dto.CustomerType === "Corporate",
        required: dto.CustomerType === "Corporate",
        // customOnBlur: (e) => handlevalidChange(e),
        onBlurFuncs: ["IsGstNo"],
        disabled:
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.CIN !== "") ||
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.PanNo !== "") ||
          dto.CkycStatus === "success",
        path: `ProposerDetails.GSTNumber`,
        // error: masters.proposerProps.gstflag && dto.ProposerDetails.GSTNumber !== "",
        // errtext:
        //   masters.proposerProps.gstflag &&
        //   dto.ProposerDetails.GSTNumber !== "" &&
        //   "Enter valid GST No",
      },
      {
        type: "Input",
        label: "CIN Number",
        visible: dto.CustomerType === "Corporate",
        required: true,
        // customOnBlur: (e) => handlevalidChange(e),
        path: `ProposerDetails.CIN`,
        disabled:
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.GSTNumber !== "") ||
          (dto.CustomerType === "Corporate" && dto.ProposerDetails.PanNo !== "") ||
          dto.CkycStatus === "success",
      },

      {
        type: "Input",
        label: "Enter last 4 digits of Aadhaar",
        spacing: 2.3,
        visible: dto.ProposerDetails.CKYCParam === "Aadhaar Number",
        required: dto.CustomerType !== "Corporate",
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 4 },
        path: `ProposerDetails.AadharID`,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },
      {
        type: "MDDatePicker",
        required: true,
        spacing: 2.3,
        visible:
          dto?.ProposerDetails?.CKYCParam === "PAN Number" ||
          dto?.ProposerDetails?.CKYCParam === "Aadhaar Number" ||
          dto.CustomerType === "Corporate",
        dateFormat: "d-m-Y",
        label: dto.CustomerType === "Corporate" ? "Date of Incorporation" : "Date of Birth",
        maxDate: new Date(),
        path: `ProposerDetails.DOB`,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },

      {
        type: "Input",
        label: "Mobile No. as per Aadhaar",
        required: dto.CustomerType !== "Corporate",
        visible: dto.ProposerDetails.CKYCParam === "Aadhaar Number",
        onBlurFuncs: [IsMobileNumber],
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 10 },
        spacing: 2.3,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
        path: `ProposerDetails.AadharMobileNo`,
      },
      {
        type: "Input",
        label: "Full Name as per Aadhaar",
        spacing: 2.3,
        visible: dto.ProposerDetails.CKYCParam === "Aadhaar Number",
        required: dto.CustomerType !== "Corporate",
        onChangeFuncs: ["IsAlphaSpace"],
        InputProps: { maxLength: 50 },
        path: `ProposerDetails.AadharName`,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },
      {
        type: "AutoComplete",
        label: "Gender",
        spacing: 2.3,
        required: dto.CustomerType !== "Corporate",
        visible: dto.ProposerDetails.CKYCParam === "Aadhaar Number",
        path: `ProposerDetails.AadharGender`,
        options: masters?.Gender,
        disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
        // customOnChange: (e, v) => handleProposerMasters(e, v, "Gender"),
      },

      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "",
      },
      {
        type: "Button",
        label: "Initiate C-kyc",
        visible: true,
        variant: "contained",
        spacing: 3,
        onClick: initiateCkyc,
        disabled:
          (dto?.CustomerType === "Individual" &&
            dto.ProposerDetails.CKYCParam === "PAN Number" &&
            dto?.ProposerDetails?.PanNo === "") ||
          (dto.CustomerType === "Individual" &&
            dto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
            (dto.ProposerDetails.AadharID === "" ||
              dto.ProposerDetails.AadharMobileNo === "" ||
              dto.ProposerDetails.AadharGender === "" ||
              dto.ProposerDetails.AadharName === "")) ||
          (dto.CustomerType === "Corporate" &&
            !dto?.ProposerDetails?.GSTNumber &&
            !dto?.ProposerDetails?.PanNo &&
            !dto?.ProposerDetails?.CINNo) ||
          dto?.ProposerDetails?.DOB === "" ||
          dto.CkycStatus === "success" ||
          masters.proposerProps.cinflag ||
          masters.proposerProps.panflag ||
          masters.proposerProps.gstflag,
      },
      {
        type: "Button",
        label: "Update Status",
        visible: true,
        variant: "contained",
        spacing: 3,
        disabled:
          (dto.CustomerType !== "Corporate" &&
            dto.ProposerDetails.CKYCParam === "PAN Number" &&
            !dto?.ProposerDetails?.PanNo) ||
          (dto.CustomerType !== "Corporate" &&
            dto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
            !dto?.ProposerDetails?.AadharID &&
            !dto?.ProposalDetails?.AadharMobileNo &&
            !dto?.ProposalDetails?.AadharGender &&
            !dto?.ProposalDetails?.AadharName) ||
          !dto?.ProposerDetails?.DOB ||
          dto.CkycStatus === "success" ||
          dto.CkycStatus === "",
        onClick: updateckyc,
      },
      {
        type: "Button",
        label: "Send Email/SMS",
        visible: true,
        variant: "contained",
        spacing: 3,
        disabled:
          (dto.CustomerType !== "Corporate" &&
            dto.ProposerDetails.CKYCParam === "PAN Number" &&
            !dto?.ProposerDetails?.PanNo) ||
          (dto.CustomerType !== "Corporate" &&
            dto.ProposerDetails.CKYCParam === "Aadhaar Number" &&
            !dto?.ProposerDetails?.AadharID &&
            !dto?.ProposalDetails?.AadharMobileNo &&
            !dto?.ProposalDetails?.AadharGender &&
            !dto?.ProposalDetails?.AadharName) ||
          !dto?.ProposerDetails?.DOB ||
          dto.CkycStatus === "success" ||
          dto.CkycStatus === "",
        onClick: sendMail,
      },
    ],
    [
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Personal Details",
        sx: { fontSize: "17px" },
      },
      {
        type: "Input",
        label: "Quote No",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        // path: `CustomerDetails.PresentAddressLine1`,
      },
      {
        type: "Input",
        label: "Product Name",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        path: "ProductName",
      },
      {
        type: "Input",
        label: "Plan Name",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        path: "PolicyType",
      },
      {
        type: "AutoComplete",
        label: "Tenure",
        spacing: 3,
        required: true,
        visible: true,
        path: "PolicyTenure",
        disabled: true,
      },
      {
        type: "AutoComplete",
        label: "Family Composition",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        path: "FamilyCompostion",
      },
      {
        type: "AutoComplete",
        label: "Dependent Parent or in Laws",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        path: "ParentType",
      },
      {
        type: "Checkbox",
        label: "Include dependent Parent or Parent in laws",
        spacing: 12,
        required: true,
        checkedVal: "Yes",
        unCheckedVal: "No",
        path: "IncludeDependentParentsOrParentInLaws",
        visible: true,
        disabled: true,
      },
      {
        type: "Typography",
        label: "Sum Insured Details",
        spacing: 12,
        visible: true,
      },
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: {
          label: "Select Sum Insured Applicability",
          labelVisible: true,
          fontSize: "17px",
          fontWeight: "500",
        },
        radioList: [
          { value: "Individual", label: "Individual" },
          { value: "Family Floater", label: "Family Floater" },
        ],
        spacing: 12,
        path: "PolicyType",
        disabled: true,
      },
      {
        type: "Typography",
        visible: dto.PolicyType !== "Family Floater",
        spacing: 12,
        label: "Individual Sum Insured",
        sx: { fontSize: "17px" },
      },
      {
        type: "Typography",
        visible: dto.PolicyType === "Family Floater",
        spacing: 12,
        label: "Sum Insured",
        sx: { fontSize: "17px" },
      },
      {
        type: "AutoComplete",
        label: "Sum Insured",
        visible: dto.PolicyType === "Family Floater",
        required: true,
        options: masters.SumInsured,
        path: `InsurableItem.0.RiskItems.0.SumInsured`,
        spacing: 3,
        disabled: true,
      },

      {
        type: "DataGrid",
        spacing: 8,
        visible: dto.PolicyType !== "Family Floater",
        required: true,
        rowId: "InsuredSR",
        path: "InsurableItem.0.RiskItems",
        rowPerPage: 6,
        getRowHeight: 70,
        disabled: true,
        hideFooterPagination: true,

        columns: [
          {
            field: "InsuredSR",
            headerName: "Insured Type",
            width: 290,
            headerAlign: "left",
            columns: false,
            align: "center",
            // error: masters.flags.require && dto.InsurableItem[0].RiskItems[0].InsuredSR === "",
            // errtext:
            //   masters.flags.require &&
            //   dto.InsurableItem[0].RiskItems[0].InsuredSR === "" &&
            //   "Please fill this Field",

            renderCell: (params) => (
              <TextField
                type="text"
                name="InsuredSR"
                variant="standard"
                value={params.row.InsuredSR}
                sx={{ textAlign: "center" }}
                disabled
              />
            ),
          },
          {
            field: "SumInsured",
            headerName: "Individual Sum Insured",
            width: 290,
            headerAlign: "center",
            visible: true,
            disabled: true,
            align: "center",
            // error: masters.flags.require && dto.InsurableItem[0].RiskItems[0].SumInsured === "",
            // errtext:
            //   masters.flags.require &&
            //   dto.InsurableItem[0].RiskItems[0].SumInsured === "" &&
            //   "Please fill this Field",

            renderCell: (params) => (
              // dto.PolicyType === "Individual" && (
              <Autocomplete
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                disableClearable
                name="SumInsured"
                disabled
                options={masters.SumInsured || []}
                value={{ mValue: params.row.SumInsured }}
                // onChange={(e, value) => {
                //   onLocationDetails(e, "SumInsured", value, param);
                // }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(param) => <MDInput {...param} label="Sum Insured" />}
              />
            ),
            // ),
          },
        ],
      },

      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Insured Details",
        sx: { fontSize: "17px" },
      },
      {
        type: "DataGrid",
        spacing: 12,
        visible: true,
        required: true,
        rowId: "InsuredSR",
        path: "InsurableItem.0.RiskItems",
        rowPerPage: 6,
        getRowHeight: 70,
        hideFooterPagination: true,
        columns: [
          {
            field: "InsuredSR",
            headerName: "Insured Type",
            width: 250,
            headerAlign: "center",
            columns: false,
            align: "center",

            renderCell: (params) => (
              <TextField
                type="text"
                name="InsuredSR"
                variant="standard"
                value={params.row.InsuredSR}
                sx={{ textAlign: "center" }}
              />
            ),
          },
          {
            field: "InsuredID",
            headerName: "Insured ID",
            width: 250,
            headerAlign: "center",
            columns: false,
            align: "center",

            renderCell: (params) => (
              <TextField
                type="text"
                name="Insured ID"
                variant="standard"
                value={params.row.InsuredID}
                sx={{ textAlign: "center" }}
              />
            ),
          },
          {
            field: "AbhaID",
            headerName: "ABHA ID",
            width: 250,
            headerAlign: "center",
            columns: false,
            align: "center",

            renderCell: (param) => (
              <MDInput
                type="text"
                label="ABHA ID"
                value={param.row.AbhaID}
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onLocationDetails(e, "FirstName", value, param);
                }}
              />
            ),
          },
          {
            field: "ABHAAddress",
            headerName: "ABHA Address",
            width: 250,
            headerAlign: "center",
            columns: false,
            align: "center",
            renderCell: (param) => (
              <MDInput
                type="text"
                label="ABHA Address"
                value={param.row.ABHAAddress}
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onLocationDetails(e, "FirstName", value, param);
                }}
              />
            ),
          },
          {
            field: "generate",
            headerName: "Generate ABHA ID",
            width: 250,
            headerAlign: "center",
            columns: false,
            align: "center",
            renderCell: () => <MDButton>Generate ABHA ID</MDButton>,
          },
          {
            field: "update",
            headerName: "Update ABHA Address",
            width: 250,
            headerAlign: "center",
            columns: false,
            align: "center",
            renderCell: () => <MDButton>Update ABHA Address</MDButton>,
          },
          {
            field: "Salutation",
            headerName: "Salutation",
            width: 250,
            headerAlign: "center",
            align: "center",

            renderCell: (param) => (
              <Autocomplete
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                disableClearable
                name="Salutation"
                options={masters.Salutation || []}
                value={{ mValue: param.row.Salutation }}
                onChange={(e, value) => {
                  onLocationDetails(e, "Salutation", value, param);
                }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Salutation" />}
              />
            ),
          },

          {
            field: "DateofBirth",
            headerName: "Insured DOB",
            width: 250,
            headerAlign: "center",
            align: "center",
            error:
              masters?.flags?.require && dto?.InsurableItem[0]?.RiskItems[0]?.DateofBirth === "",
            errtext:
              masters?.flags?.require &&
              dto?.InsurableItem[0]?.RiskItems[0]?.DateofBirth === "" &&
              "Please fill this Field",

            renderCell: (params) => (
              <MDDatePicker
                options={{
                  altFormat: "d-m-Y",
                  dateFormat: "d-m-Y",
                  altInput: true,
                  allowInput: true,
                }}
                input={{
                  required: true,
                  label: "Date of Birth",

                  value: params.row.DateofBirth,
                  allowInput: true,

                  // placeholder: datePlaceHolder("d-m-Y"),
                  InputLabelProps: { shrink: true },
                }}
                name="DateofBirth"
                disabled
                value={params.row.DateofBirth}
                onChange={(e, value) => {
                  onLocationDetails(e, "DateofBirth", value, params);
                }}
              />
            ),
          },
          {
            field: "FirstName",
            headerName: "First Name",
            width: 250,
            headerAlign: "center",
            renderCell: (param) => (
              <MDInput
                type="text"
                label="First Name"
                value={param.row.FirstName}
                disabled
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onLocationDetails(e, "FirstName", value, param);
                }}
              />
            ),
          },
          {
            field: "LastName",
            headerName: "Last Name",
            width: 250,
            headerAlign: "center",
            renderCell: (param) => (
              <MDInput
                label="Last Name"
                value={param.row.LastName}
                disabled
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onLocationDetails(e, "LastName", value, param);
                }}
              />
            ),
          },
          {
            field: "InsuredGender",
            headerName: "Insured Gender",
            width: 250,
            headerAlign: "center",
            align: "center",
            error:
              masters?.flags?.require && dto?.InsurableItem[0]?.RiskItems[0]?.InsuredGender === "",
            errtext:
              masters?.flags?.require &&
              dto?.InsurableItem[0]?.RiskItems[0]?.InsuredGender === "" &&
              "Please fill this Field",

            renderCell: (param) => (
              <Autocomplete
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                disableClearable
                name="InsuredGender"
                options={masters.Gender || []}
                value={{ mValue: param.row.InsuredGender }}
                onChange={(e, value) => {
                  onLocationDetails(e, "InsuredGender", value, param);
                }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Insured Gender" />}
              />
            ),
          },
          {
            field: "Relationship",
            headerName: "Relationship with Proposer",
            width: 250,
            headerAlign: "center",
            align: "center",

            renderCell: (param) => (
              <Autocomplete
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                disableClearable
                name="Relationship with Proposer"
                disabled
                options={masters.InsuredRelationShip || []}
                value={{ mValue: param.row.Relationship }}
                onChange={(e, value) => {
                  onLocationDetails(e, "Relationship", value, param);
                }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Relationship with Proposer" />}
              />
            ),
          },
          {
            field: "Occupation",
            headerName: "Occupation",
            width: 250,
            headerAlign: "center",
            align: "center",

            renderCell: (param) => (
              <Autocomplete
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                disableClearable
                disabled
                name="Occupation"
                options={masters.OccupationLife || []}
                value={{ mValue: param.row.Occupation }}
                onChange={(e, value) => {
                  onLocationDetails(e, "Occupation", value, param);
                }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Occupation" />}
              />
            ),
          },
          {
            field: "Nationality",
            headerName: "Nationality",
            width: 250,
            headerAlign: "center",
            align: "center",

            renderCell: (param) => (
              <Autocomplete
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                disableClearable
                name="Nationality"
                options={masters.nationality || []}
                value={{ mValue: param.row.Nationality }}
                onChange={(e, value) => {
                  onLocationDetails(e, "Nationality", value, param);
                }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Nationality" />}
              />
            ),
          },
          {
            field: "HeightCm",
            headerName: "Height(CM)",
            width: 250,
            headerAlign: "center",
            renderCell: (param) => (
              <MDInput
                type="text"
                label="Height(CM)"
                value={param.row.HeightCm}
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onLocationDetails(e, "Height", value, param);
                }}
              />
            ),
          },
          {
            field: "WeightKG",
            headerName: "Weight(kg)",
            width: 250,
            headerAlign: "center",
            renderCell: (param) => (
              <MDInput
                label="Weight(kg)"
                value={param.row.WeightKG}
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onLocationDetails(e, "Weight", value, param);
                }}
              />
            ),
          },
          {
            field: "BMI",
            headerName: "BMI",
            width: 250,
            headerAlign: "center",
            renderCell: (param) => (
              <MDInput
                label="BMI"
                value={param.row.BMI}
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onLocationDetails(e, "BMI", value, param);
                }}
              />
            ),
          },
          {
            field: "Questions",
            headerName: "Question",
            width: 260,
            headerAlign: "center",
            renderCell: (params) => {
              const rowId = params;
              const handleQuestion = (row) => {
                const i = row.api.getRowIndex(row.row.InsuredSR);

                // lMasters.QuesArry[i] === undefined ? [] : lMasters.QuesArry[i].Ques;
                // console.log("344");
                if (lMasters.QuesArry[i] === undefined) {
                  lMasters.Q.Ques = [];
                  if (lDto.PolicyType === "Individual") {
                    masters.Individualquestion.forEach((x) => {
                      const obj = {
                        IsRadioChecked: "",
                        Weightgain: "",
                        Weightloss: "",
                        Reason: "",
                        Typecode: x.mID,
                        TobaccoQuestion: x.mValue,
                        ChainSmoker: "",
                        Sobber: "",
                        DrugAddict: "",
                      };
                      lMasters.Q.Ques.push(obj);
                    });
                  } else {
                    masters.Familyquestion.forEach((x) => {
                      const obj = {
                        IsRadioChecked: "",
                        Weightgain: "",
                        Weightloss: "",
                        Reason: "",
                        Typecode: x.mID,
                        TobaccoQuestion: x.mValue,
                        ChainSmoker: "",
                        Sobber: "",
                        DrugAddict: "",
                      };
                      lMasters.Q.Ques.push(obj);
                    });
                  }
                  setMasters({ ...lMasters });
                  lMasters.QuesArry[i] = { ...lMasters.Q };
                }
                // if (lMasters.Q.Ques[i]?.IsRadioChecked === undefined) {
                //   lMasters.Q.Ques[i] = {
                //     ...lMasters.Questionry,
                //   };
                // }

                lMasters.Index = row.api.getRowIndex(row.row.InsuredSR);
                lMasters.flags.question = true;
                setMasters({ ...lMasters });
              };
              return (
                <div>
                  <MDButton onClick={() => handleQuestion(rowId)}>Question</MDButton>
                </div>
              );
            },
          },
          {
            field: "Declartions",
            headerName: "Declaration",
            width: 250,
            headerAlign: "center",
            renderCell: (params) => {
              const rowId = params;
              const handleDeclaration = (row) => {
                const i = row.api.getRowIndex(row.row.InsuredSR);
                if (lMasters.DeclArry[i] === undefined) {
                  lMasters.D.Decl = [];
                  if (lDto.PolicyType === "Individual") {
                    masters.Individualdeclaration.forEach((x) => {
                      const obj = {
                        IsRadioChecked: "",
                        DeclarationQuestion: x.mValue,
                        DeclarationID: x.mID,
                      };
                      lMasters.D.Decl.push(obj);
                    });
                  } else {
                    masters.Familydeclaration.forEach((x) => {
                      const obj = {
                        IsRadioChecked: "",
                        DeclarationQuestion: x.mValue,
                        DeclarationID: x.mID,
                      };
                      lMasters.D.Decl.push(obj);
                    });
                  }
                  setMasters({ ...lMasters });
                  lMasters.DeclArry[i] = { ...lMasters.D };
                }
                // if (lMasters.Q.Ques[i]?.IsRadioChecked === undefined) {
                //   lMasters.Q.Ques[i] = {
                //     ...lMasters.Questionry,
                //   };
                // }

                lMasters.Index = row.api.getRowIndex(row.row.InsuredSR);
                lMasters.flags.Declaration = true;
                setMasters({ ...lMasters });
              };
              return (
                <div>
                  <MDButton onClick={() => handleDeclaration(rowId)}>Declarartion</MDButton>
                </div>
              );
            },
          },
        ],
      },
      {
        type: "Custom",
        visible: lMasters.flags.question,
        spacing: 9,
        return: (
          <Modal open={lMasters.flags.question}>
            <MDBox sx={modelStyle2}>
              <CloseIcon
                sx={{
                  position: "fixed",
                  top: "40px",
                  right: "40px",
                  cursor: "pointer !important",
                  transition: "transform 0.5s ease-in-out !important",
                }}
                onClick={handelQuestionClose}
              />

              {lMasters.Q.Ques.map((x, i) => (
                <Grid container>
                  {(x.Typecode === "726" || x.Typecode === "731") && lMasters.Index !== 0 ? (
                    <>
                      <Grid item xs={9}>
                        <MDTypography sx={{ fontSize: "17px" }}>
                          {/* Have any gain and loss in weight by more than 5kg in last one year? */}
                          {x.TobaccoQuestion}
                        </MDTypography>
                        {masters.proposerProps.Tabaccoflag === true &&
                        lMasters.QuesArry[lMasters.Index].Ques[i].IsRadioChecked === "Yes" &&
                        (x.Typecode === "726" || x.Typecode === "731") ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            This will be subject to underwriter Approval
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={3}>
                        <Stack direction="row">
                          {/* <RadioGroup
                          row
                          onChange={(event) => handleQuestionRadio(event, i, x.Typecode)}
                          value={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked}
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup> */}
                          <FormControlLabel
                            control={
                              <MDCheckbox
                                checked={
                                  lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked ===
                                  "Yes"
                                }
                                onChange={(event) =>
                                  handleQuestionRadio(event, i, x.Typecode, "Yes")
                                }
                                value={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked}
                              />
                            }
                            label="Yes"
                          />
                          <FormControlLabel
                            control={
                              <MDCheckbox
                                checked={
                                  lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked ===
                                  "No"
                                }
                                onChange={(event) =>
                                  handleQuestionRadio(event, i, x.Typecode, "No")
                                }
                                value={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked}
                              />
                            }
                            label="No"
                          />
                        </Stack>
                      </Grid>
                    </>
                  ) : null}
                  {(x.Typecode === "725" ||
                    x.Typecode === "726" ||
                    x.Typecode === "730" ||
                    x.Typecode === "731") &&
                  lMasters.Index === 0 &&
                  lDto.InsurableItem[0].RiskItems[0]?.InsuredSR === "Adult 1" ? (
                    <Grid container>
                      <Grid item xs={9}>
                        <MDTypography sx={{ fontSize: "17px" }}>
                          {/* Have any gain and loss in weight by more than 5kg in last one year? */}
                          {x.TobaccoQuestion}
                          {masters.proposerProps.Tabaccoflag === true &&
                          lMasters.QuesArry[lMasters.Index].Ques[i].IsRadioChecked === "Yes" &&
                          (x.Typecode === "726" || x.Typecode === "731") ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              This will be subject to underwriter Approval
                            </MDTypography>
                          ) : null}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={3}>
                        {/* <RadioGroup
                          row
                          onChange={(event) => handleQuestionRadio(event, i, x.Typecode)}
                          value={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked}
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup> */}
                        <Stack direction="row">
                          <FormControlLabel
                            control={
                              <MDCheckbox
                                checked={
                                  lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked ===
                                  "Yes"
                                }
                                onChange={(event) =>
                                  handleQuestionRadio(event, i, x.Typecode, "Yes")
                                }
                                value={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked}
                              />
                            }
                            label="Yes"
                          />
                          <FormControlLabel
                            control={
                              <MDCheckbox
                                checked={
                                  lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked ===
                                  "No"
                                }
                                onChange={(event) =>
                                  handleQuestionRadio(event, i, x.Typecode, "No")
                                }
                                value={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked}
                              />
                            }
                            label="No"
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  ) : null}
                  {lMasters.QuesArry[lMasters.Index]?.Ques[i]?.Typecode === "726" &&
                  lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked === "Yes" ? (
                    <>
                      {masters.Individualquestion.map(
                        (y, j) =>
                          y.mYes === "726" && (
                            <>
                              <Grid item xs={9}>
                                <MDTypography sx={{ fontSize: "17px" }}>
                                  {/* Have any gain and loss in weight by more than 5kg in last one year? */}
                                  {y.mValue}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={3}>
                                {/* <RadioGroup
                                  row
                                  onChange={(event) => handleQuestionRadio(event, j, x.Typecode)}
                                  value={lMasters.QuesArry[lMasters.Index]?.Ques[j]?.IsRadioChecked}
                                >
                                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                  <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup> */}
                                <Stack direction="row">
                                  <FormControlLabel
                                    control={
                                      <MDCheckbox
                                        checked={
                                          lMasters.QuesArry[lMasters.Index]?.Ques[j]
                                            ?.IsRadioChecked === "Yes"
                                        }
                                        onChange={(event) =>
                                          handleQuestionRadio(event, j, x.Typecode, "Yes")
                                        }
                                        value={
                                          lMasters.QuesArry[lMasters.Index]?.Ques[j]?.IsRadioChecked
                                        }
                                      />
                                    }
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    control={
                                      <MDCheckbox
                                        checked={
                                          lMasters.QuesArry[lMasters.Index]?.Ques[j]
                                            ?.IsRadioChecked === "No"
                                        }
                                        onChange={(event) =>
                                          handleQuestionRadio(event, j, x.Typecode, "No")
                                        }
                                        value={
                                          lMasters.QuesArry[lMasters.Index]?.Ques[j]?.IsRadioChecked
                                        }
                                      />
                                    }
                                    label="No"
                                  />
                                </Stack>
                              </Grid>
                            </>
                          )
                      )}
                    </>
                  ) : null}
                  {lMasters.QuesArry[lMasters.Index]?.Ques[i]?.Typecode === "731" &&
                  lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked === "Yes" ? (
                    <>
                      {masters.Familyquestion.map(
                        (y, j) =>
                          y.mYes === "731" && (
                            <>
                              <Grid item xs={9}>
                                <MDTypography sx={{ fontSize: "17px" }}>
                                  {/* Have any gain and loss in weight by more than 5kg in last one year? */}
                                  {y.mValue}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={3}>
                                {/* <RadioGroup
                                  row
                                  onChange={(event) => handleQuestionRadio(event, j, x.Typecode)}
                                  value={lMasters.QuesArry[lMasters.Index]?.Ques[j]?.IsRadioChecked}
                                >
                                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                  <FormControlLabel value="No" control={<Radio />} label="No" />
                                </RadioGroup> */}
                                <Stack direction="row">
                                  <FormControlLabel
                                    control={
                                      <MDCheckbox
                                        checked={
                                          lMasters.QuesArry[lMasters.Index]?.Ques[j]
                                            ?.IsRadioChecked === "Yes"
                                        }
                                        onChange={(event) =>
                                          handleQuestionRadio(event, j, x.Typecode, "Yes")
                                        }
                                        value={
                                          lMasters.QuesArry[lMasters.Index]?.Ques[j]?.IsRadioChecked
                                        }
                                      />
                                    }
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    control={
                                      <MDCheckbox
                                        checked={
                                          lMasters.QuesArry[lMasters.Index]?.Ques[j]
                                            ?.IsRadioChecked === "No"
                                        }
                                        onChange={(event) =>
                                          handleQuestionRadio(event, j, x.Typecode, "No")
                                        }
                                        value={
                                          lMasters.QuesArry[lMasters.Index]?.Ques[j]?.IsRadioChecked
                                        }
                                      />
                                    }
                                    label="No"
                                  />
                                </Stack>
                              </Grid>
                            </>
                          )
                      )}
                    </>
                  ) : null}
                  {lMasters.Index === 0 &&
                  (x.Typecode === "725" || x.Typecode === "730") &&
                  lMasters.QuesArry[lMasters.Index]?.Ques[i]?.IsRadioChecked === "Yes" ? (
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <MDInput
                          label="Weight Gain"
                          value={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.Weightgain}
                          disabled={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.Weightloss !== ""}
                          onChange={(event) => handleQuestionRadio(event, i, x.mID, "Weightgain")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MDInput
                          label="Weight Loss"
                          value={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.Weightloss}
                          disabled={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.Weightgain !== ""}
                          onChange={(event) => handleQuestionRadio(event, i, x.mID, "Weightloss")}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <MDInput
                          label="Reason for cause"
                          value={lMasters.QuesArry[lMasters.Index]?.Ques[i]?.Reason}
                          onChange={(event) => handleQuestionRadio(event, i, x.mID, "Reason")}
                        />
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
              ))}
              {/* <Grid>
                <MDButton onClick={handleQuestionValidation}>Save</MDButton>
              </Grid> */}
            </MDBox>
          </Modal>
        ),
      },
      {
        type: "Custom",
        visible: lMasters.flags.Declaration,
        spacing: 9,
        return: (
          <Modal open={lMasters.flags.Declaration}>
            <MDBox sx={modelStyle1}>
              <CloseIcon
                sx={{
                  position: "fixed",
                  top: "30px",
                  right: "30px",
                  cursor: "pointer !important",
                  transition: "transform 0.5s ease-in-out !important",
                }}
                onClick={handelDeclarationClose}
              />

              {lMasters.D.Decl.map((x, i) => (
                <Grid container>
                  {(x.DeclarationID === "735" ||
                    x.DeclarationID === "737" ||
                    x.DeclarationID === "738") &&
                  (lDto.InsurableItem[0].RiskItems[lMasters.Index]?.InsuredGender === "Male" ||
                    lDto.InsurableItem[0].RiskItems[lMasters.Index]?.InsuredGender === "Others") ? (
                    <Grid item xs={12}>
                      {x.DeclarationID === "735" && (
                        <MDTypography sx={{ fontSize: "25px", color: "red" }}>
                          Health Declaration for Individual Plan
                        </MDTypography>
                      )}
                      {x.DeclarationID === "735" && (
                        <MDTypography sx={{ fontSize: "14px", color: "red" }}>
                          Declaration for male
                        </MDTypography>
                      )}
                      {x.DeclarationID === "737" && (
                        <MDTypography sx={{ fontSize: "14px", color: "red" }}>
                          Occupation Declaration
                        </MDTypography>
                      )}

                      {x.DeclarationID === "738" && (
                        <MDTypography sx={{ fontSize: "14px", color: "red" }}>
                          Question for PEP/Criminal Activity and Avocation
                        </MDTypography>
                      )}

                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={9}>
                          <MDTypography sx={{ fontSize: "17px" }}>
                            {/* Have any gain and loss in weight by more than 5kg in last one year? */}
                            {x.DeclarationQuestion}
                          </MDTypography>
                          {masters.proposerProps.Declareflag === true &&
                          lMasters.DeclArry[lMasters.Index].Decl[i].IsRadioChecked === "Yes" &&
                          (x.DeclarationID === "738" || x.DeclarationID === "742") ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              This will be subject to underwriter Approval
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <RadioGroup
                            row
                            onChange={(event) => handleDeclarationRadio(event, i, x.DeclarationID)}
                            value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                          >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                          </RadioGroup> */}
                          <Stack direction="row">
                            <FormControlLabel
                              control={
                                <MDCheckbox
                                  checked={
                                    lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked ===
                                    "Yes"
                                  }
                                  onChange={(event) =>
                                    handleDeclarationRadio(event, i, x.DeclarationID, "Yes")
                                  }
                                  value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                                />
                              }
                              label="Yes"
                            />
                            <FormControlLabel
                              control={
                                <MDCheckbox
                                  checked={
                                    lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked ===
                                    "No"
                                  }
                                  onChange={(event) =>
                                    handleDeclarationRadio(event, i, x.DeclarationID, "No")
                                  }
                                  value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                                />
                              }
                              label="No"
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}
                  {(x.DeclarationID === "736" ||
                    x.DeclarationID === "737" ||
                    x.DeclarationID === "738") &&
                  lDto.InsurableItem[0].RiskItems[lMasters.Index]?.InsuredGender === "Female" ? (
                    <Grid item xs={12}>
                      {x.DeclarationID === "736" && (
                        <MDTypography sx={{ fontSize: "25px", color: "red" }}>
                          Health Declaration for Individual Plan
                        </MDTypography>
                      )}
                      {x.DeclarationID === "736" && (
                        <MDTypography sx={{ fontSize: "14px", color: "red" }}>
                          Declaration for Female
                        </MDTypography>
                      )}
                      {x.DeclarationID === "737" && (
                        <MDTypography sx={{ fontSize: "14px", color: "red" }}>
                          Occupation Declaration
                        </MDTypography>
                      )}
                      {x.DeclarationID === "738" && (
                        <MDTypography sx={{ fontSize: "14px", color: "red" }}>
                          Question for PEP/Criminal Activity and Avocation
                        </MDTypography>
                      )}
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                          <MDTypography sx={{ fontSize: "17px" }}>
                            {/* Have any gain and loss in weight by more than 5kg in last one year? */}
                            {x.DeclarationQuestion}
                          </MDTypography>
                          {masters.proposerProps.Declareflag === true &&
                          lMasters.DeclArry[lMasters.Index].Decl[i].IsRadioChecked === "Yes" &&
                          (x.DeclarationID === "738" || x.DeclarationID === "742") ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              This will be subject to underwriter Approval
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <RadioGroup
                            row
                            onChange={(event) => handleDeclarationRadio(event, i, x.DeclarationID)}
                            value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                          >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                          </RadioGroup> */}
                          <Stack direction="row">
                            <FormControlLabel
                              control={
                                <MDCheckbox
                                  checked={
                                    lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked ===
                                    "Yes"
                                  }
                                  onChange={(event) =>
                                    handleDeclarationRadio(event, i, x.DeclarationID, "Yes")
                                  }
                                  value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                                />
                              }
                              label="Yes"
                            />
                            <FormControlLabel
                              control={
                                <MDCheckbox
                                  checked={
                                    lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked ===
                                    "No"
                                  }
                                  onChange={(event) =>
                                    handleDeclarationRadio(event, i, x.DeclarationID, "No")
                                  }
                                  value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                                />
                              }
                              label="No"
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}
                  {(x.DeclarationID === "739" ||
                    x.DeclarationID === "741" ||
                    x.DeclarationID === "742") &&
                  lDto.PolicyType === "Family Floater" &&
                  (lDto.InsurableItem[0].RiskItems[lMasters.Index]?.InsuredGender === "Male" ||
                    lDto.InsurableItem[0].RiskItems[lMasters.Index]?.InsuredGender === "Others") ? (
                    <Grid item xs={12}>
                      {x.DeclarationID === "739" && (
                        <MDTypography sx={{ fontSize: "25px", color: "red" }}>
                          Health Declaration for Family Plan
                        </MDTypography>
                      )}
                      {x.DeclarationID === "739" && (
                        <MDTypography sx={{ fontSize: "14px", color: "red" }}>
                          Declaration for Male
                        </MDTypography>
                      )}
                      {x.DeclarationID === "741" && (
                        <MDTypography sx={{ fontSize: "14px", color: "red" }}>
                          Occupation Declaration
                        </MDTypography>
                      )}
                      {x.DeclarationID === "742" && (
                        <MDTypography sx={{ fontSize: "14px", color: "red" }}>
                          Question for PEP/Criminal Activity and Avocation
                        </MDTypography>
                      )}
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                          <MDTypography sx={{ fontSize: "17px" }}>
                            {/* Have any gain and loss in weight by more than 5kg in last one year? */}
                            {x.DeclarationQuestion}
                          </MDTypography>
                          {masters.proposerProps.Declareflag === true &&
                          lMasters.DeclArry[lMasters.Index].Decl[i].IsRadioChecked === "Yes" &&
                          (x.DeclarationID === "738" || x.DeclarationID === "742") ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              This will be subject to underwriter Approval
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <RadioGroup
                            row
                            onChange={(event) => handleDeclarationRadio(event, i, x.DeclarationID)}
                            value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                          >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                          </RadioGroup> */}
                          <Stack direction="row">
                            <FormControlLabel
                              control={
                                <MDCheckbox
                                  checked={
                                    lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked ===
                                    "Yes"
                                  }
                                  onChange={(event) =>
                                    handleDeclarationRadio(event, i, x.DeclarationID, "Yes")
                                  }
                                  value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                                />
                              }
                              label="Yes"
                            />
                            <FormControlLabel
                              control={
                                <MDCheckbox
                                  checked={
                                    lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked ===
                                    "No"
                                  }
                                  onChange={(event) =>
                                    handleDeclarationRadio(event, i, x.DeclarationID, "No")
                                  }
                                  value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                                />
                              }
                              label="No"
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}
                  {(x.DeclarationID === "740" ||
                    x.DeclarationID === "741" ||
                    x.DeclarationID === "742") &&
                  lDto.PolicyType === "Family Floater" &&
                  lDto.InsurableItem[0].RiskItems[lMasters.Index]?.InsuredGender === "Female" ? (
                    <Grid item xs={12}>
                      {x.DeclarationID === "740" && (
                        <MDTypography sx={{ fontSize: "25px", color: "red" }}>
                          Health Declaration for Family Plan
                        </MDTypography>
                      )}
                      {x.DeclarationID === "740" && (
                        <MDTypography sx={{ fontSize: "20px", color: "red" }}>
                          Declaration for Female
                        </MDTypography>
                      )}
                      {x.DeclarationID === "741" && (
                        <MDTypography sx={{ fontSize: "20px", color: "red" }}>
                          Occupation Declaration
                        </MDTypography>
                      )}
                      {x.DeclarationID === "742" && (
                        <MDTypography sx={{ fontSize: "20px", color: "red" }}>
                          Question for PEP/Criminal Activity and Avocation
                        </MDTypography>
                      )}
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                          <MDTypography sx={{ fontSize: "17px" }}>
                            {/* Have any gain and loss in weight by more than 5kg in last one year? */}
                            {x.DeclarationQuestion}
                          </MDTypography>
                          {masters.proposerProps.Declareflag === true &&
                          lMasters.DeclArry[lMasters.Index].Decl[i].IsRadioChecked === "Yes" &&
                          (x.DeclarationID === "738" || x.DeclarationID === "742") ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              This will be subject to underwriter Approval
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={3}>
                          {/* <RadioGroup
                            row
                            onChange={(event) => handleDeclarationRadio(event, i, x.DeclarationID)}
                            value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                          >
                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="No" control={<Radio />} label="No" />
                          </RadioGroup> */}
                          <Stack direction="row">
                            <FormControlLabel
                              control={
                                <MDCheckbox
                                  checked={
                                    lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked ===
                                    "Yes"
                                  }
                                  onChange={(event) =>
                                    handleDeclarationRadio(event, i, x.DeclarationID, "Yes")
                                  }
                                  value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                                />
                              }
                              label="Yes"
                            />
                            <FormControlLabel
                              control={
                                <MDCheckbox
                                  checked={
                                    lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked ===
                                    "No"
                                  }
                                  onChange={(event) =>
                                    handleDeclarationRadio(event, i, x.DeclarationID, "No")
                                  }
                                  value={lMasters.DeclArry[lMasters.Index]?.Decl[i]?.IsRadioChecked}
                                />
                              }
                              label="No"
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
              ))}
              {/* <Grid>
                <MDButton onClick={handleDeclarationValidation}>Save</MDButton>
              </Grid> */}
            </MDBox>
          </Modal>
        ),
      },

      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Family Doctor Details",
        sx: { fontSize: "17px" },
      },
      {
        type: "Input",
        label: "Family Doctor Name",
        visible: true,
        spacing: 3,
        required: true,
        path: `FamilyDocDetails.FamilyDocName`,
        // options: IssueAge,
      },
      {
        type: "Input",
        label: "Contact Number",
        visible: true,
        spacing: 3,
        required: true,
        path: `FamilyDocDetails.ContactNumber`,
        // options: IssueAge,
      },
      {
        type: "Input",
        label: "Clinic/Hospital Name",
        visible: true,
        spacing: 3,
        required: true,
        path: `FamilyDocDetails.ClinicName`,
        // options: IssueAge,
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Proposer Details",
        sx: { fontSize: "17px" },
      },
      {
        type: "AutoComplete",
        label: "Proposer Relationship with Insured ",
        visible: true,
        required: true,
        path: `ProposerDetails.RelationshipWithPrimaryInsured`,
        disabled: true,
        options: masters.InsuredRelationShip,
        spacing: 3,
      },
      // {
      //   type: "Input",
      //   label: "Proposer Name",
      //   spacing: 3,
      //   required: true,
      //   onChangeFuncs: ["IsAlphaSpace"],
      //   visible: true,
      //   disabled: true,
      //   path: `ProposerDetails.Name`,
      // },
      {
        type: "Input",
        label: "Proposer FirstName",
        spacing: 3,
        required: true,
        disabled: true,
        onChangeFuncs: ["IsAlphaSpace"],
        visible: true,
        path: `ProposerDetails.FirstName`,
        error: masters.flags.require && dto.ProposerDetails.FirstName === "",
        errtext:
          masters.flags.require && dto.ProposerDetails.FirstName === "" && "Please fill this Field",
      },
      {
        type: "Input",
        label: "Proposer LastName",
        spacing: 3,
        required: true,
        disabled: true,
        onChangeFuncs: ["IsAlphaSpace"],
        visible: true,
        path: `ProposerDetails.LastName`,
        error: masters.flags.require && dto.ProposerDetails.LastName === "",
        errtext:
          masters.flags.require && dto.ProposerDetails.LastName === "" && "Please fill this Field",
      },
      {
        type: "AutoComplete",
        label: "Gender",
        visible: true,
        required: true,
        path: `ProposerDetails.Gender`,
        options: masters.Gender,
        // customOnChange: (e, v) => handleWomen(e, v),
        disabled: true,
        spacing: 3,
      },
      {
        type: "MDDatePicker",
        required: true,
        spacing: 3,
        visible: true,
        allowInput: true,
        dateFormat: "d-m-Y",
        label: "Date of Birth",
        path: `ProposerDetails.DOB`,
        disabled: true,
        validationId: 1,
      },
      {
        type: "Input",
        label: "Mobile Number",
        visible: true,
        required: true,
        spacing: 3,
        path: `ProposerDetails.ContactNo`,
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 10 },
        disabled: true,
        onBlurFuncs: ["IsMobileNumber"],
      },
      {
        type: "Input",
        label: "Email ID",
        visible: true,
        required: true,
        spacing: 3,
        path: `ProposerDetails.EmailId`,
        onBlurFuncs: ["IsEmail"],
        disabled: true,
      },

      {
        type: "AutoComplete",
        label: "Type of occupation",
        visible: true,
        spacing: 3,
        required: true,
        path: `ProposerDetails.Occupation`,
        options: masters.OccupationLife,
        disabled: true,
      },
      {
        type: "Input",
        label: "Annual Income",
        spacing: 3,
        required: true,
        visible: true,
        path: `ProposerDetails.AnnualIncome`,
        disabled: true,
      },
      {
        type: "MDDatePicker",
        required: true,
        label: "Policy Start Date",
        visible: true,
        allowInput: true,
        path: "PolicyStartDate",
        dateFormat: "Y-m-d",
        spacing: 3,
        disabled: true,
        validationId: 1,
      },
      {
        type: "MDDatePicker",
        label: "Policy End Date",
        visible: true,
        dateFormat: "Y-m-d",
        path: "PolicyEndDate",
        disabled: true,
        InputProps: { disabled: true },
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Address Details",
        sx: { fontSize: "19px" },
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Communication Details",
        sx: { fontSize: "19px" },
      },
      {
        type: "Input",
        label: "Address",
        spacing: 3,
        required: true,
        visible: true,
        path: `ProposerDetails.CommunicationAddress.AddressLine1`,
        disabled: true,
      },

      {
        type: "Input",
        label: "Pincode",
        visible: true,
        required: true,
        onChangeFuncs: ["IsNumeric"],
        path: `ProposerDetails.CommunicationAddress.Pincode`,
        InputProps: { maxLength: 6 },
        disabled: true,
        // customOnChange: (e) => handlePincode(e, "Comm"),
      },
      {
        type: "AutoComplete",
        label: "City",
        visible: true,
        required: true,
        path: `ProposerDetails.CommunicationAddress.CityDistrict`,
        options: masters?.commCD,
        disabled: true,
        // customOnChange: (e, v) => handleCity(e, v, "Comm"),
      },
      {
        type: "Input",
        label: "State",
        visible: true,
        disabled: true,
        path: `ProposerDetails.CommunicationAddress.State`,
        onChangeFuncs: ["IsAlpha"],
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Permanent Details",
        sx: { fontSize: "19px" },
      },
      {
        type: "Input",
        label: "Address",
        spacing: 3,
        required: true,
        visible: true,
        path: `ProposerDetails.CommunicationAddress.AddressLine1`,
      },
      {
        type: "Input",
        label: "Email Id",
        spacing: 3,
        required: true,
        visible: true,
        path: `ProposerDetails.EmailId`,
      },
      {
        type: "Input",
        label: "Mobile No",
        spacing: 3,
        required: true,
        visible: true,
        path: `ProposerDetails.ContactNo`,
      },

      {
        type: "Input",
        label: "Pincode",
        visible: true,
        required: true,
        onChangeFuncs: ["IsNumeric"],
        path: `ProposerDetails.CommunicationAddress.Pincode`,
        InputProps: { maxLength: 6 },
        // customOnChange: (e) => handlePincode(e, "Comm"),
      },
      {
        type: "AutoComplete",
        label: "City",
        visible: true,
        required: true,
        path: `ProposerDetails.CommunicationAddress.CityDistrict`,
        options: masters?.commCD,
        // customOnChange: (e, v) => handleCity(e, v, "Comm"),
      },
      {
        type: "Input",
        label: "State",
        visible: true,
        disabled: true,
        path: `ProposerDetails.CommunicationAddress.State`,
        onChangeFuncs: ["IsAlpha"],
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Additional Information",
        sx: { fontSize: "17px" },
      },
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: {
          label: "Do You have E-Insurance Account Number?",
          labelVisible: true,
          fontSize: "17px",
          fontWeight: "500",
        },
        radioList: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        path: `EaccountDetails.DuhaveEaccount`,
        spacing: 6,
      },
      {
        type: "Input",
        label: "E-Insurance Account no",
        spacing: 3,
        required: true,
        visible: dto.EaccountDetails.DuhaveEaccount === "Yes",
        path: `EaccountDetails.EaccountNum`,
      },
      {
        type: "RadioGroup",
        visible: dto.EaccountDetails.DuhaveEaccount === "No",
        required: true,
        radioLabel: {
          label: "Do You Want to Open New Account?",
          labelVisible: true,
          fontSize: "17px",
          fontWeight: "500",
        },
        radioList: [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ],
        path: `EaccountDetails.DuwanttoOpenEAcc`,
        spacing: 12,
      },
      {
        type: "Input",
        label: "E Account Type",
        spacing: 3,
        required: true,
        visible: dto.EaccountDetails.DuwanttoOpenEAcc === "Yes",
        path: `EaccountDetails.`,
      },
      {
        type: "Input",
        label: "Remarks",
        spacing: 3,
        required: true,
        visible: dto.EaccountDetails.DuwanttoOpenEAcc === "Yes",
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Other Information",
        sx: { fontSize: "17px" },
      },
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: {
          label: "Enter Plan Details",
          labelVisible: true,
          fontSize: "17px",
          fontWeight: "500",
        },
        radioList: [
          { value: "Pan Number", label: "Pan Number" },
          { value: "Form 60", label: "Form 60" },
        ],
        path: `EaccountDetails.MyconsentforEaccounttype`,
        spacing: 12,
      },
      {
        type: "Input",
        label: "PAN Number",
        spacing: 3,
        required: true,
        visible: dto.EaccountDetails.MyconsentforEaccounttype === "Pan Number",
      },
      {
        type: "Input",
        label: "GSTIN Number",
        spacing: 3,
        required: true,
        visible: dto.EaccountDetails.MyconsentforEaccounttype === "Form 60",
      },
      {
        type: "Input",
        label: "Other Information 1",
        spacing: 3,
        required: true,
        visible: true,
        path: `EaccountDetails.OtherInformationOne`,
      },
      {
        type: "Input",
        label: "Other Information 2",
        spacing: 3,
        required: true,
        visible: true,
        path: `EaccountDetails.OtherInformationTwo`,
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Nominee Details",
        sx: { fontSize: "17px" },
      },
      {
        type: "Input",
        label: "Nominee name",
        spacing: 3,
        required: true,
        visible: true,
        onChangeFuncs: ["IsAlphaSpace"],
        path: `HealthNomineeDetails.0.NomineeName`,
        validationId: 1,
      },
      {
        type: "AutoComplete",
        label: "Gender",
        visible: true,
        spacing: 3,
        required: true,
        path: `HealthNomineeDetails.0.NomineeGender`,
        options: masters?.Gender,
      },
      {
        type: "MDDatePicker",
        required: true,
        spacing: 3,
        visible: true,
        allowInput: true,
        dateFormat: "d-m-Y",
        label: "Nominee DOB",
        customOnChange: (d) => NomineeDob(d, "NomineeDOB"),
        path: `HealthNomineeDetails.0.NomineeDOB`,
        // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },
      {
        type: "AutoComplete",
        label: "Nominee Relationship",
        visible: true,
        spacing: 3,
        required: true,
        path: `HealthNomineeDetails.0.NomineeRelationWithProposer`,
        options: masters?.ReltionshipNominee,
      },
      {
        type: "Input",
        label: "Nominee Address",
        spacing: 3,
        required: true,
        visible: true,
        path: `HealthNomineeDetails.0.NomineeAddressLine1`,
      },
      {
        type: "Checkbox",
        label: "Is Nominee a Minor",
        spacing: 12,
        checkedVal: "Yes",
        unCheckedVal: "No",
        required: lMasters.flags.nomineeage === true,
        visible: lMasters.flags.nomineeage === true,
        path: `HealthNomineeDetails.0.IsNomineeMinor`,
      },
      {
        type: "Input",
        label: "Appointee Name",
        spacing: 3,
        required: lMasters.flags.nomineeage === true,
        visible: lMasters.flags.nomineeage === true,
        path: `HealthNomineeDetails.0.Appointee.AppointeeName`,
      },
      {
        type: "AutoComplete",
        label: "Appointee Gender",
        visible: lMasters.flags.nomineeage === true,
        spacing: 3,
        required: lMasters.flags.nomineeage === true,
        path: `HealthNomineeDetails.0.Appointee.AppointeeGender`,
        options: masters?.Gender,
      },
      {
        type: "MDDatePicker",
        required: lMasters.flags.nomineeage === true,
        spacing: 3,
        visible: lMasters.flags.nomineeage === true,
        allowInput: true,
        dateFormat: "d-m-Y",
        // maxDate: new Date(),
        label: "Appointee DOB",
        path: `HealthNomineeDetails.0.Appointee.AppointeeDOB`,
        // customOnChange: (d) => ApointeeNomineeDob(d, "NomineeDOB"),
        // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },
      {
        type: "AutoComplete",
        label: "Appointee Realtionship",
        visible: lMasters.flags.nomineeage === true,
        spacing: 3,
        required: lMasters.flags.nomineeage === true,
        path: `HealthNomineeDetails.0.Appointee.ApointeeRelationwithNominee`,
        options: masters?.ReltionshipAppointee,
      },
      {
        type: "Input",
        label: "Appointee Address",
        spacing: 3,
        required: lMasters.flags.nomineeage === true,
        visible: lMasters.flags.nomineeage === true,
        path: `HealthNomineeDetails.0.Appointee.AppointeeAddress`,
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Premium Details",
        sx: { fontSize: "17px" },
      },
      {
        type: "AutoComplete",
        visible: true,
        spacing: 3,
        label: "Customer Opted for EMI Option?",
        required: true,
        path: `ProposerDetails.DummyFieldOne`,
        options: masters?.Smokingstatus,
      },
      {
        type: "AutoComplete",
        visible: true,
        spacing: 3,
        label: "Premium Payment Frequency",
        required: true,
        path: `ProposerDetails.DummyFieldTwo`,
      },
    ],
    [
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Personal Details",
        sx: { fontSize: "17px" },
      },
      {
        type: "Input",
        label: "Product Name",
        spacing: 3,
        required: true,
        path: "ProductName",
        visible: true,
      },
      {
        type: "Input",
        label: "Life Insured Name",
        spacing: 3,
        required: true,
        visible: true,
        onChangeFuncs: ["IsAlphaSpace"],
        path: `LifeJSON.LifeInusred.LINAME`,
        disabled: true,
      },
      {
        type: "MDDatePicker",
        required: true,
        spacing: 3,
        visible: true,
        allowInput: true,
        dateFormat: "d-m-Y",
        label: "Date of Birth",
        path: `LifeJSON.LifeInusred.LIDOB`,
        validationId: 1,
        // customOnChange: handleLifeDOB,
        disabled: true,
      },
      {
        type: "Input",
        label: "Issue Age",
        spacing: 3,
        required: true,
        visible: true,
        path: `LifeJSON.LifeInusred.LIENTRYAGE`,
        disabled: true,
      },
      {
        type: "AutoComplete",
        label: "Gender",
        visible: true,
        required: true,
        path: `LifeJSON.LifeInusred.LIGENDER`,
        options: masters.Gender,
        spacing: 3,
        disabled: true,
      },

      {
        type: "Input",
        label: "Life Insured Mobile",
        visible: true,
        required: true,
        spacing: 3,
        path: `LifeJSON.LifeInusred.LIMOBILENO`,
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 10 },
        onBlurFuncs: ["IsMobileNumber"],
        disabled: true,
      },
      {
        type: "Input",
        label: "Life Insured Email",
        visible: true,
        required: true,
        spacing: 3,
        path: `LifeJSON.LifeInusred.LIEMAILID`,
        onBlurFuncs: ["IsEmail"],
        disabled: true,
      },
      {
        type: "Input",
        label: "Date",
        visible: true,
        required: true,
        spacing: 3,
        path: `LifeJSON.LifeInusred.Dayofbirth`,
        disabled: true,
      },
      {
        type: "Input",
        label: "Month",
        visible: true,
        required: true,
        spacing: 3,
        path: `LifeJSON.LifeInusred.MonthBirth`,
        disabled: true,
      },
      {
        type: "Input",
        label: "Year",
        visible: true,
        required: true,
        spacing: 3,
        path: `LifeJSON.LifeInusred.YearofDOB`,
        disabled: true,
      },
      {
        type: "Input",
        label: "Father FirstName",
        visible: true,
        required: true,
        spacing: 3,
        path: `InsurableItem.0.RiskItems.0.FatherFirstName`,
        disabled: true,
      },
      {
        type: "Input",
        label: "Father LastName",
        visible: true,
        required: true,
        spacing: 3,
        path: `InsurableItem.0.RiskItems.0.FatherLastName`,
        disabled: true,
      },
      {
        type: "Input",
        label: "Martial status",
        visible: true,
        required: true,
        spacing: 3,
        path: `InsurableItem.0.RiskItems.0.InsuredMartialStatus`,
        disabled: true,
      },
      // {
      //   type: "MDDatePicker",
      //   required: true,
      //   spacing: 3,
      //   visible: true,
      //   allowInput: true,
      //   dateFormat: "d-m-Y",
      //   disabled: true,
      //   label: "Policy Maturity Date",
      //   path: `InsurableItem.0.RiskItems.0.InsuredMartialStatus`,
      //   // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      // },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Address Details",
        sx: { fontSize: "17px" },
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Communication Details",
        sx: { fontSize: "19px" },
      },
      {
        type: "Input",
        label: "Address",
        spacing: 3,
        required: true,
        visible: true,
        path: `LifeJSON.LifeInusred.CommunicationAddress.AddressLine1`,
        disabled: true,
      },

      {
        type: "Input",
        label: "Pincode",
        visible: true,
        required: true,
        onChangeFuncs: ["IsNumeric"],
        path: `LifeJSON.LifeInusred.CommunicationAddress.Pincode`,
        InputProps: { maxLength: 6 },
        disabled: true,
        // customOnChange: (e) => handlePincode(e, "Comm"),
      },
      {
        type: "AutoComplete",
        label: "City",
        visible: true,
        required: true,
        path: `LifeJSON.LifeInusred.CommunicationAddress.CityDistrict`,
        options: masters?.commCD,
        disabled: true,
        // customOnChange: (e, v) => handleCity(e, v, "Comm"),
      },
      {
        type: "Input",
        label: "State",
        visible: true,
        disabled: true,
        path: `LifeJSON.LifeInusred.CommunicationAddress.State`,
        onChangeFuncs: ["IsAlpha"],
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Permanent Details",
        sx: { fontSize: "19px" },
      },
      {
        type: "Input",
        label: "Address",
        spacing: 3,
        required: true,
        visible: true,
        path: `ProposerDetails.CommunicationAddress.AddressLine1`,
      },
      {
        type: "Input",
        label: "Email Id",
        spacing: 3,
        required: true,
        visible: true,
        // path: `ProposerDetails.CommunicationAddress.AddressLine1`,
      },
      {
        type: "Input",
        label: "Mobile No",
        spacing: 3,
        required: true,
        visible: true,
        // path: `ProposerDetails.CommunicationAddress.AddressLine1`,
      },

      {
        type: "Input",
        label: "Pincode",
        visible: true,
        required: true,
        onChangeFuncs: ["IsNumeric"],
        path: `ProposerDetails.CommunicationAddress.Pincode`,
        InputProps: { maxLength: 6 },
        // customOnChange: (e) => handlePincode(e, "Comm"),
      },
      {
        type: "AutoComplete",
        label: "City",
        visible: true,
        required: true,
        path: `ProposerDetails.CommunicationAddress.CityDistrict`,
        options: masters?.commCD,
        // customOnChange: (e, v) => handleCity(e, v, "Comm"),
      },
      {
        type: "Input",
        label: "State",
        visible: true,
        disabled: true,
        path: `ProposerDetails.CommunicationAddress.State`,
        onChangeFuncs: ["IsAlpha"],
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Family Personal Details",
        sx: { fontSize: "17px" },
      },
      // {
      //   type: "AutoComplete",
      //   label:
      //     "Has any of your family members ever been diagnosed with or died from heart disease, stroke, paralysis, high blood pressure, kidney disease, cancer or any hereditary/familial disorders?",
      //   visible: true,
      //   spacing: 3,
      //   required: true,
      //   path: `LifeJSON.FamilyHistory.FamilyHistoryofLifeInsured`,
      //   options: masters?.Smokingstatus,
      //   // options: IssueAge,
      // },
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: {
          label:
            "Has any of your family members ever been diagnosed with or died from heart disease, stroke, paralysis, high blood pressure, kidney disease, cancer or any hereditary/familial disorders?",
          labelVisible: true,
        },
        radioList: [
          {
            value: "Yes",
            label: "Yes",
          },
          {
            value: "No",
            label: "No",
          },
        ],
        path: `LifeJSON.FamilyHistory.FamilyHistoryofLifeInsured`,
        spacing: 12,
      },

      // {
      //   type: "Checkbox",
      //   visible: dto.LifeJSON.FamilyHistory.FamilyHistoryofLifeInsured === "Yes",
      //   spacing: 12,
      //   label: "Alive Status",
      //   sx: { fontSize: "17px" },
      // },
      {
        type: "Checkbox",
        label: "Alive Status",
        spacing: 12,
        checkedVal: "Yes",
        unCheckedVal: "No",
        required: dto.LifeJSON.FamilyHistory.FamilyHistoryofLifeInsured === "Yes",
        visible: dto.LifeJSON.FamilyHistory.FamilyHistoryofLifeInsured === "Yes",
        path: `LifeJSON.FamilyHistory.ISAlive`,
      },
      {
        type: "Button",
        label: "Add Family",
        startIcon: <AddIcon />,
        visible: dto.LifeJSON.FamilyHistory.ISAlive === "Yes",
        onClick: () => onAddFamilyMembers(),
        spacing: 3,
        disabled: dto.LifeJSON.FamilyHistory.Alive.length >= 3,
      },
      {
        type: "DataGrid",
        spacing: 10,
        visible: dto.LifeJSON.FamilyHistory.ISAlive === "Yes",
        required: true,
        rowId: "SlNo",
        path: "LifeJSON.FamilyHistory.Alive",
        rowPerPage: 6,
        getRowHeight: 70,
        hideFooterPagination: true,

        columns: [
          {
            field: "SlNo",
            headerName: "Sl. No.",
            width: 80,
            headerAlign: "center",
            align: "center",
            renderCell: (index) => index.api.getRowIndex(index.row.SlNo) + 1,
          },
          {
            field: "FamilyMembers",
            headerName: "Family Member",
            width: 250,
            headerAlign: "center",
            columns: false,
            align: "center",
            renderCell: (param) => (
              <Autocomplete
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                disableClearable
                name="FamilyMember"
                options={masters.family || []}
                value={{ mValue: param.row.FamilyMembers }}
                onChange={(e, value) => {
                  onFamilyDetails(e, value, "FamilyMember", param);
                }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Select" />}
              />
            ),
          },
          {
            field: "HealthStatus",
            headerName: "Health Status",
            width: 250,
            headerAlign: "center",

            align: "center",
            renderCell: (param) => (
              <MDInput
                type="text"
                label="Enter"
                value={param.row.HealthStatus}
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onFamilyDetails(e, value, "HealthStatus", param);
                }}
              />
            ),
          },
          {
            field: "CurrentAge",
            headerName: "Current Age",
            width: 250,
            headerAlign: "center",
            align: "center",
            renderCell: (param) => (
              <MDInput
                type="text"
                label="Enter"
                value={param.row.CurrentAge}
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onFamilyDetails(e, value, "CurrentAge", param);
                }}
              />
            ),
          },
        ],
      },
      {
        type: "Checkbox",
        label: "Decease Status",
        spacing: 12,
        checkedVal: "Yes",
        unCheckedVal: "No",
        required: dto.LifeJSON.FamilyHistory.FamilyHistoryofLifeInsured === "Yes",
        visible: dto.LifeJSON.FamilyHistory.FamilyHistoryofLifeInsured === "Yes",
        path: `LifeJSON.FamilyHistory.IsDead`,
      },
      {
        type: "Button",
        label: "Add Family",
        startIcon: <AddIcon />,
        visible: dto.LifeJSON.FamilyHistory.IsDead === "Yes",
        onClick: () => OnDeathFamilyMembers(),
        spacing: 3,
        disabled: dto.LifeJSON.FamilyHistory.Dead.length >= 3,
      },
      // {
      //   type: "Typography",
      //   visible: dto.LifeJSON.FamilyHistory.FamilyHistoryofLifeInsured === "Yes",
      //   spacing: 12,
      //   label: "Decease Status",
      //   sx: { fontSize: "17px" },
      // },
      {
        type: "DataGrid",
        spacing: 10,
        visible: dto.LifeJSON.FamilyHistory.IsDead === "Yes",
        required: true,
        rowId: "SlNo",
        path: "LifeJSON.FamilyHistory.Dead",
        rowPerPage: 6,
        getRowHeight: 70,
        hideFooterPagination: true,

        columns: [
          {
            field: "SlNo",
            headerName: "Sl. No.",
            width: 80,
            headerAlign: "center",
            align: "center",
            renderCell: (index) => index.api.getRowIndex(index.row.SlNo) + 1,
          },
          {
            field: "FamilyMember",
            headerName: "Family Member",
            width: 250,
            headerAlign: "center",
            columns: false,
            align: "center",
            renderCell: (param) => (
              <Autocomplete
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                disableClearable
                name="FamilyMember"
                options={masters.family || []}
                value={{ mValue: param.row.FamilyMember }}
                onChange={(e, value) => {
                  onFamily(e, value, "Member", param);
                }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Select" />}
              />
            ),
          },
          {
            field: "CauseofDeath",
            headerName: "Cause of Death",
            width: 250,
            headerAlign: "center",

            align: "center",
            renderCell: (param) => (
              <MDInput
                type="text"
                label="Enter"
                value={param.row.CauseofDeath}
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onFamily(e, value, "CauseofDeath", param);
                }}
                // onBlur={(e) => handleBlur(e)}
              />
            ),
          },
          {
            field: "AgeatDeath",
            headerName: "AgeatDeath",
            width: 250,
            headerAlign: "center",
            align: "center",
            renderCell: (param) => (
              <MDInput
                type="text"
                label="Enter"
                value={param.row.AgeatDeath}
                sx={{ textAlign: "center" }}
                onChange={(e, value) => {
                  onFamily(e, value, "AgeatDeath", param);
                }}
                // onBlur={(e) => handleBlur(e)}
              />
            ),
          },
        ],
      },
      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Nominee Details",
        sx: { fontSize: "17px" },
      },
      {
        type: "RadioGroup",
        visible: true,
        required: true,
        radioLabel: { label: "", labelVisible: true },
        radioList: [
          {
            value: "Yes",
            label: "Nominee 1 is same as Health Nominee",
          },
        ],
        path: "LifeJSON.LifeInusred.Nominee.0.IsNommineSameasHealth",
        // customOnChange: (e) => handleLifeNominee(e),
        spacing: 6,
      },
      {
        type: "Button",
        label: "Add Nominee",
        startIcon: <AddIcon />,
        visible: true,
        onClick: () => onAddNomineeDetails(),
        spacing: 3,
        disabled: dto.LifeJSON.LifeInusred.Nominee.length >= 3,
      },
      {
        type: "Button",
        label: "Remove Nominee",
        visible: true,
        startIcon: <RemoveIcon />,
        onClick: () => onRemoveNomineeDetails(dto.LifeJSON.LifeInusred.Nominee.length),
        spacing: 3,
      },
      ...spreedNomineedetails(),

      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Policy Details",
        sx: { fontSize: "17px" },
      },
      {
        type: "AutoComplete",
        label: "Type of occupation",
        visible: true,
        spacing: 3,
        required: true,
        path: `LifeJSON.LifeInusred.TYPEOFOCCUPATION`,
        options: masters.OccupationLife,
        disabled: true,
        error: masters.flags.require && dto.LifeJSON.LifeInusred.TYPEOFOCCUPATION === "",
        errtext:
          masters.flags.require &&
          dto.LifeJSON.LifeInusred.TYPEOFOCCUPATION === "" &&
          "Please fill this Field",
      },
      {
        type: "Input",
        label: "Policy Maturity Age",
        visible: true,
        required: true,
        spacing: 3,
        // path: `InsurableItem.0.RiskItems.0.FatherLastName`,
        disabled: true,
      },
      {
        type: "Input",
        label: "Annual Income",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        path: `LifeJSON.LifeInusred.AnnualIncome`,
        error: masters.flags.require && dto.LifeJSON.LifeInusred.AnnualIncome === "",
        errtext:
          masters.flags.require &&
          dto.LifeJSON.LifeInusred.AnnualIncome === "" &&
          "Please fill this Field",
      },
      {
        type: "AutoComplete",
        label: "Smoking Status",
        visible: true,
        spacing: 3,
        required: true,
        path: `LifeJSON.LifeInusred.LISMOKE`,
        options: masters.Smokingstatus,
        disabled: true,
        error: masters.flags.require && dto.LifeJSON.LifeInusred.LISMOKE === "",
        errtext:
          masters.flags.require &&
          dto.LifeJSON.LifeInusred.LISMOKE === "" &&
          "Please fill this Field",
        // value: masters.proposerSal,
        // customOnChange: handleSetValueParms,
        // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },
      {
        type: "MDDatePicker",
        required: true,
        spacing: 3,
        visible: true,
        allowInput: true,
        dateFormat: "d-m-Y",
        // maxDate: new Date(),
        label: "Date of Commencement",
        path: `LifeJSON.DOC`,
        disabled: true,
        error: masters.flags.require && dto.LifeJSON.DOC === "",
        errtext: masters.flags.require && dto.LifeJSON.DOC === "" && "Please fill this Field",
        // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
      },

      {
        type: "AutoComplete",
        label: "Channel",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        path: `LifeJSON.LifeAgentDetails.ChannelType`,
        options: masters.channeltype,
        // customOnChange: (e, v) => handlePOS(e, v),
      },

      {
        type: "Input",
        label: "Premium Paying Frequency",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        path: `LifeJSON.INPUTMODE`,
        error: masters.flags.require && dto.LifeJSON.INPUTMODE === "",
        errtext: masters.flags.require && dto.LifeJSON.INPUTMODE === "" && "Please fill this Field",
      },
      {
        type: "Input",
        label: "Premium Paying Option",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        path: `LifeJSON.LifeInusred.PremiumPayingOption`,
        error: masters.flags.require && dto.LifeJSON.LifeInusred.PremiumPayingOption === "",
        errtext:
          masters.flags.require &&
          dto.LifeJSON.LifeInusred.PremiumPayingOption === "" &&
          "Please fill this Field",
      },
      {
        type: "Input",
        label: "Policy term (In Years)",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        path: `LifeJSON.PRPT`,
      },
      {
        type: "AutoComplete",
        label: "Premium Type",
        visible: true,
        spacing: 3,
        required: true,
        disabled: true,
        path: `LifeJSON.LifeInusred.Premiumpayingtype`,
        options: masters.Lifepremiumtype,
        error: masters.flags.require && dto.LifeJSON.LifeInusred.Premiumpayingtype === "",
        errtext:
          masters.flags.require &&
          dto.LifeJSON.LifeInusred.Premiumpayingtype === "" &&
          "Please fill this Field",
      },
      {
        type: "AutoComplete",
        label: "Basic Death Sum Assured Amount",
        spacing: 3,
        required: true,
        visible: true,
        disabled: true,
        path: `LifeJSON.PRSA`,
        options: masters.Lifedeathsum,
        error: masters.flags.require && dto.LifeJSON.PRSA === "",
        errtext: masters.flags.require && dto.LifeJSON.PRSA === "" && "Please fill this Field",
      },

      {
        type: "Typography",
        visible: true,
        spacing: 12,
        label: "Staff Rebate",
        sx: { fontSize: "19px" },
      },
      {
        type: "Checkbox",
        visible: true,
        label: "Only for Aviva Employees",
        checkedVal: "Yes",
        unCheckedVal: "No",
        path: `LifeJSON.ISSTAFF`,
        spacing: 12,
      },
      // {
      //   type: "Typography",
      //   visible: dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS",
      //   spacing: 12,
      //   label: "Add on cover",
      // },
      // {
      //   type: "Checkbox",
      //   visible: dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS",
      //   label: "Cancer Cardio",
      //   checkedVal: "Yes",
      //   unCheckedVal: "No",
      //   path: `LifeJSON.LifeInusred.CancerBenfit`,
      //   spacing: 3,
      //   disabled:
      //     dto.LifeJSON.LifeAgentDetails.ChannelType === "POS" ||
      //     dto.LifeJSON.LifeInusred.CriticalIllness === "Yes",
      // },
      // {
      //   type: "Input",
      //   label: "Sum Insured",
      //   spacing: 3,
      //   required: true,
      //   visible:
      //     dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS" &&
      //     dto.LifeJSON.LifeInusred.CancerBenfit === "Yes",
      //   path: `LifeJSON.LifeInusred.CancerSumInsured`,
      //   // customOnChange: (e) => handlecancersum(e),
      //   disabled:
      //     dto.LifeJSON.LifeAgentDetails.ChannelType === "POS" ||
      //     dto.LifeJSON.LifeInusred.CriticalIllness === "Yes",
      //   error: masters.Cancerflag,
      //   errtext: masters.Cancerflag && "You can add from 5 lakh",
      // },
      // // {
      // //   type: "Typography",
      // //   visible: true,
      // //   spacing: 6,
      // //   label: "",
      // // },
      // {
      //   type: "Typography",
      //   visible: true,
      //   spacing: 12,
      //   label: "",
      // },

      // {
      //   type: "Checkbox",
      //   visible: dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS",
      //   label: "Ciritical Ileness Benfit",
      //   checkedVal: "Yes",
      //   unCheckedVal: "No",
      //   path: `LifeJSON.LifeInusred.CriticalIllness`,
      //   spacing: 3,
      //   disabled:
      //     dto.LifeJSON.LifeAgentDetails.ChannelType === "POS" ||
      //     dto.LifeJSON.LifeInusred.CancerBenfit === "Yes",
      // },
      // {
      //   type: "AutoComplete",
      //   label: "Ciritical Ileness Benfit Add on Cover",
      //   spacing: 3,
      //   required: true,
      //   visible:
      //     dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS" &&
      //     dto.LifeJSON.LifeInusred.CriticalIllness === "Yes",
      //   path: `LifeJSON.LifeInusred.CrticalIllnessAddon`,
      //   disabled:
      //     dto.LifeJSON.LifeAgentDetails.ChannelType === "POS" ||
      //     dto.LifeJSON.LifeInusred.CancerBenfit === "Yes",
      // },
      // {
      //   type: "Input",
      //   label: "Sum Insured",
      //   spacing: 3,
      //   required: true,
      //   visible:
      //     dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS" &&
      //     dto.LifeJSON.LifeInusred.CriticalIllness === "Yes",
      //   path: `LifeJSON.LifeInusred.CiriticalSumInsured`,
      //   // customOnChange: (e) => handlecancersum(e),
      //   disabled:
      //     dto.LifeJSON.LifeAgentDetails.ChannelType === "POS" ||
      //     dto.LifeJSON.LifeInusred.CancerBenfit === "Yes",
      //   error: masters.Cancerflag,
      //   errtext: masters.Cancerflag && "You can add from 5 lakh",
      // },
      // {
      //   type: "Typography",
      //   visible: true,
      //   spacing: 3,
      //   label: "",
      // },
    ],
    [
      {
        type: "Tabs",
        visible: true,
        spacing: 12,
        tabs: [{ label: "Upload" }, { label: "Download" }],
        value: masters?.proposerProps?.tabIndex,
        customOnChange: onTab,
      },
      {
        type: "Typography",
        label: `Document Name`,
        path: "DocumentDetails.DocumentName",
        // options: masters?.documentname,
        visible: masters?.proposerProps?.tabIndex === 0,
        variant: "h6",
        sx: { fontSize: "14px" },
        spacing: 3,
      },

      {
        type: "Typography",
        label: `Document Remark`,
        visible: masters?.proposerProps?.tabIndex === 0,
        variant: "h6",
        // path:`DocumentDetails.DocumentType`,
        sx: { fontSize: "14px" },
        spacing: 3,
      },

      {
        type: "Typography",
        label: `Browse File`,
        visible: masters?.proposerProps?.tabIndex === 0,
        sx: { fontSize: "14px" },
        variant: "h6",
        spacing: 6,
      },

      ...spreedDocComponents(),

      {
        type: "DataGrid",
        spacing: 12,
        visible: masters?.proposerProps?.tabIndex === 1,
        rowId: "fileName",
        path: "DocumentDetails",
        columns: [
          {
            field: "DocumentName",
            headerName: "Document Type",
            width: 300,
          },
          {
            field: "fileName",
            headerName: "File Name",
            sx: { fontSize: "12px" },
            width: 450,

            renderCell: (p) => (
              <div style={{ textAlign: "left", marginLeft: "-20px" }}>
                <MDButton
                  variant="text"
                  // onClick={() => onDownloadClick(p.row.fileName)}
                >
                  {p.row.fileName}
                </MDButton>
              </div>
            ),
          },
          {
            field: "UploadDocDate",
            headerName: "Uploaded Date",
            width: 250,
          },
        ],
      },
      {
        type: "Checkbox",
        visible: true,
        required: true,
        label: "Proposal Consent",
        spacing: 12,
        checkedVal: true,
        unCheckedVal: false,
        path: `ProposalConsentandDeclartion.ProposalConsentCheck`,

        // customOnChange: (e) => onCheck(e),
      },
      {
        type: "Input",
        label: "Enter OTP",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        required: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        path: `ProposalConsentandDeclartion.ProposalConsentOTP`,
        spacing: 3,
        onChangeFuncs: ["IsNumeric"],
        InputProps: { maxLength: 6 },
        disabled: masters?.proposerProps?.otpflag,
      },
      {
        type: "Typography",
        label: "",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        spacing: 1,
      },

      {
        type: "Custom",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        spacing: 3,
        return: (
          <Grid item xs={12} sm={12} md={6}>
            {masters?.proposerProps?.timerFlag ? (
              <MDButton
                color="primary"
                variant="contained"
                onClick={handleSendOTP}
                disabled={masters?.proposerProps?.otpflag}
              >
                Re-Send OTP
              </MDButton>
            ) : (
              <MDButton color="primary" variant="contained" onClick={handleSendOTP}>
                Send OTP
              </MDButton>
            )}
          </Grid>
        ),
      },
      {
        type: "Button",
        label: "Verify OTP",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        spacing: 3,
        onClick: handleVerifyOTP,
        variant: "contained",
        disabled: masters?.proposerProps?.otpflag,
      },
      {
        type: "Typography",
        label: (
          <Timer counter={masters.proposerProps.counter} status={masters.proposerProps.status} />
        ),
        visible:
          dto.ProposalConsentandDeclartion.ProposalConsentCheck &&
          masters?.proposerProps?.startCounterFlag,
        spacing: 7,
        // path: masters.verifyOTP,
      },

      {
        type: "Checkbox",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        label: `I/We Hereby declare that the statements made by me/us in this proposal form are true to the
          best of my/our knowledge and belief and I/We hereby agree that this declaration shall
          from the basis of the contract between  me/us and the Universal Sompo General Insurance
         Company Limited insurance Company`,
        spacing: 12,
        path: `ProposalConsentandDeclartion.ProposalConsentLine1`,
        required: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        checkedVal: true,
        unCheckedVal: false,
      },

      {
        type: "Checkbox",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        label:
          "I/We also declare that any addition alteration are carried out after the submission of this proposal form that the same would be conveyed to the insurance company immediately",
        spacing: 12,
        path: `ProposalConsentandDeclartion.ProposalConsentLine2`,
        required: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        checkedVal: true,
        unCheckedVal: false,
      },
      {
        type: "Typography",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        spacing: 12,
        label: "SIR Declaration",
        sx: { fontSize: "17px" },
      },
      {
        type: "Input",
        label: "Full Name of Proposer",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        required: true,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Full Name of Life Insured",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        required: true,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Name of SP/Agent",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        required: true,
        path: `ProposalConsentandDeclartion.SPNameAgent`,
        spacing: 3,
      },
      {
        type: "Input",
        label: "SP Certificate No/Agent Code",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        required: true,
        spacing: 3,
        path: `ProposalConsentandDeclartion.SpcertificateNoAgentCode`,
      },
      // {
      //   type: "Checkbox",
      //   visible: true,
      //   spacing: 12,
      //   // visible: dto.ProposalConsent.ProposalConsentCheck,
      //   label:
      //     " I hereby declare/ confirm that I have personally met the Life to be insured ('LI') and proposer (if any) at his/her residence/ office and have verified the identity of the proposer and LI as per the details mentioned in the Aadhaar Card/ KYC Documents/ The LI is not suffering from any physical deformity. I have also checked the health condition of the LI and have ensured that the details of any medical history are correctly mentioned in the proposal forml have also gathered information about the occupation, age proof, current income and source of income of LI and proposer that is essential for ascertaining the eligibility for proposed sum assured and premium payment and confirm that these details match with details mentioned in the proposal form I have collected the relevant documents pertaining to KYCAMLPOISage proof, income proof, past medical history and have explained all questionskey features and benefits of the insurance plan to proposerl have verified all documents provided by the proposer with the original documents before submitting the self attested copies of the same to the company. have also checked on the PEP (Politically Exposed Person) status of the proposer/ LI and his family members/ close relatives as well. I hereby declare and confirm that solicitation of the proposal have done by me and solemnly affirm that I have personally obtained the information form proposer and life insured The above statement is true and Here it should be best of my knowledge and belief and I further declare and confirm that the Company's processesproceduresand regulation have been complied with at the time of solicitationl understand and acknowledge that will be held responsible and liable in case the above declaration is found to be incorrect or false. I hereby declare that I have explained the Benefit Illustration for the selected product in its entirety to the proposer",
      //   required: true,
      //   checkedVal: true,
      //   unCheckedVal: false,
      // },
      {
        type: "Custom",
        visible: dto.ProposalConsentandDeclartion.ProposalConsentCheck,
        spacing: 12,
        path: `ProposalConsentandDeclartion.SIRDeclaration`,
        // visible: dto.ProposalConsent.ProposalConsentCheck,
        // label:
        //   " I hereby declare/ confirm that I have personally met the Life to be insured ('LI') and proposer (if any) at his/her residence/ office and have verified the identity of the proposer and LI as per the details mentioned in the Aadhaar Card/ KYC Documents/ The LI is not suffering from any physical deformity. I have also checked the health condition of the LI and have ensured that the details of any medical history are correctly mentioned in the proposal forml have also gathered information about the occupation, age proof, current income and source of income of LI and proposer that is essential for ascertaining the eligibility for proposed sum assured and premium payment and confirm that these details match with details mentioned in the proposal form I have collected the relevant documents pertaining to KYCAMLPOISage proof, income proof, past medical history and have explained all questionskey features and benefits of the insurance plan to proposerl have verified all documents provided by the proposer with the original documents before submitting the self attested copies of the same to the company. have also checked on the PEP (Politically Exposed Person) status of the proposer/ LI and his family members/ close relatives as well. I hereby declare and confirm that solicitation of the proposal have done by me and solemnly affirm that I have personally obtained the information form proposer and life insured The above statement is true and Here it should be best of my knowledge and belief and I further declare and confirm that the Company's processesproceduresand regulation have been complied with at the time of solicitationl understand and acknowledge that will be held responsible and liable in case the above declaration is found to be incorrect or false. I hereby declare that I have explained the Benefit Illustration for the selected product in its entirety to the proposer",
        required: true,
        // checkedVal: true,
        // unCheckedVal: false,
        return: (
          <Grid container>
            <Grid item xs={0.5}>
              <MDCheckbox

              // value="Silver Plan"
              />
            </Grid>
            <Grid item xs={11}>
              <MDTypography sx={{ fontSize: "17px" }}>
                I hereby declare/ confirm that I have personally met the Life to be insured
                (&quotLI&quot) and proposer (if any) at his/her residence/ office and have verified
                the identity of the proposer and LI as per the details mentioned in the Aadhaar
                Card/ KYC Documents/ The LI is not suffering from any physical deformity. I have
                also checked the health condition of the LI and have ensured that the details of any
                medical history are correctly mentioned in the proposal forml have also gathered
                information about the occupation, age proof, current income and source of income of
                LI and proposer that is essential for ascertaining the eligibility for proposed sum
                assured and premium payment and confirm that these details match with details
                mentioned in the proposal forml have collected the relevant documents pertaining to
                KYCAMLPOISage proof, income proof, past medical history and have explained all
                questionskey features and benefits of the insurance plan to proposerl have verified
                all documents provided by the proposer with the original documents before submitting
                the self attested copies of the same to the company. have also checked on the PEP
                (Politically Exposed Person) status of the proposer/ LI and his family members/
                close relatives as well. I hereby declare and confirm that solicitation of the
                proposal have done by me and solemnly affirm that I have personally obtained the
                information form proposer and life insured The above statement is true and Here it
                should be best of my knowledge and belief and I further declare and confirm that the
                Company&aposs processesproceduresand regulation have been complied with at the time
                of solicitationl understand and acknowledge that will be held responsible and liable
                in case the above declaration is found to be incorrect or false. I hereby declare
                that I have explained the Benefit Illustration for the selected product in its
                entirety to the proposer
              </MDTypography>
            </Grid>
          </Grid>
        ),
      },
      {
        type: "Typography",
        visible: true,
        spacing: 9.5,
        label: "",
      },
      {
        subtype: "button",
        type: "Button",
        label: "Proceed to premium BreakUp ",
        visible: true,
        variant: "contained",
        onClick: handlePremiumBreakup,
        spacing: 2.5,
        validationId: 1,
      },
    ],
    [
      {
        type: "Custom",
        visible: lMasters.Proposalflag === true,
        // visible: true,
        spacing: 12,
        return: <CombiPremium masters={masters} setMasters={setMasters} />,
      },
    ],
  ];
}
export default CombiProposalDetails;
