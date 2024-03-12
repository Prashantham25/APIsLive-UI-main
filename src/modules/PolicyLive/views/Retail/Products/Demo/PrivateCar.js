import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import objectPath from "object-path";

// import { Stack, Card, Grid } from "@mui/material";
import swal from "sweetalert";
import { PolicyJson, docDetails, localMasters } from "./data/Json";
import MDButton from "../../../../../../components/MDButton";
// import MDBox from "../../../../../../components/MDBox";
// import MDTypography from "../../../../../../components/MDTypography";
import { DocumenUpload } from "../USGI/data/APIs/USGIWCApi";
import RayzorPay from "../../data/RayzorPay";
import { GetProdPartnermasterData, GetProdPartnermasterData1 } from "../../../Customer/data";
import {
  arrayRange,
  DateFormatFromDateObject,
  IsAlphaSpace,
} from "../../../../../../Common/Validations";
import { CkycResponse } from "../NBRetail/data/APIs/NBTravelApi";
import MotorPremiumSummary from "./MotorPremiumSummary";
import { Policies, Proposals, Quotations } from "../../data/Apis";
import PaymentSuccess from "./PaymentSuccess";

// const currencyFormat = new Intl.NumberFormat("en-IN", {
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 2,
// });

const radioYesNoOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const getPolicyDto = ({ PolicyDto }) => {
  const obj = PolicyDto !== null && PolicyDto !== undefined ? { ...PolicyDto } : {};
  return { ...PolicyJson(), ...obj };
};

const getProcessSteps = () => {
  const steps = [
    "Risk Details",
    "Cover Details",
    "Quote Summary",
    "Proposal Details",
    "Premium Summary",
    "Payment",
  ];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, dto }) => {
  let steps = [];
  const policyNo = objectPath.get(dto, "PolicyNo");
  switch (activeStep) {
    case 0:
      steps = [
        { name: "Policy Details", visible: true },
        { name: "Vehicle Details", visible: true },
        { name: "Communication Details", visible: false },
        {
          name: "PYP Details",
          visible: dto.BusinessType === "RollOver" || dto.BusinessType === "Renewal",
        },
        // { name: "OD Specific Details", visible: true },
        // { name: "TP Specific Details", visible: true },
      ];
      break;
    case 1:
      steps = [
        { name: "", visible: true },
        { name: "Third Party Covers", visible: false },
        { name: "OD Covers", visible: false },
      ];
      break;
    case 2:
      steps = [{ name: "", visible: true }];
      break;
    case 3:
      steps = [
        { name: "", visible: true },
        { name: "Customer Details", visible: true },
        { name: "Communication Details", visible: true },
        { name: "Vehicle Details", visible: true },
        { name: "Hypothecation Details", visible: true },
        { name: "Nominee Details", visible: true },
      ];
      break;
    case 4:
      steps = [{ name: "", visible: true }];
      break;
    case 5:
      steps = [
        { name: "", visible: policyNo === null || policyNo === undefined || policyNo === "" },
        { name: "", visible: policyNo !== null && policyNo !== undefined && policyNo !== "" },
      ];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters, setBackDropFlag }) => {
  const lMasters = masters;
  const lDto = dto;

  let data = [];

  const onAddDocument = () => {
    lDto.documentDetails = [...dto.documentDetails, { ...docDetails() }];
    setDto({ ...lDto });
  };
  const handleFileUpload = async (event) => {
    console.log(event);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data.dMSDTOs[0].fileName !== null) {
        console.log("doc", result.data.dMSDTOs[0].fileName);
        lDto.documentDetails[Number(event.target.name)].fileName = file.name;
        lDto.documentDetails[Number(event.target.name)].UploadDocDate =
          new Date().toLocaleDateString();
        lDto.documentDetails[Number(event.target.name)].fileUploadStatus = true;
        lDto.documentDetails[Number(event.target.name)].DocId = result.data.dMSDTOs[0].docId;
        lMasters.flags.cancelIcon = true;
        setMasters({ ...lMasters });
        setDto({ ...lDto });
        swal({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };
  const spreedDocComponents = () => {
    const arr = [];
    dto?.documentDetails?.forEach((x, i) => {
      arr.push(
        {
          type: "AutoComplete",
          label: "Document Name",
          path: `documentDetails.${i}.DocName`,
          visible: true,
          options: masters.doc,
        },
        {
          type: "Input",
          label: "Document Remarks",
          path: `documentDetails.${i}.DocTypeName`,
          visible: true,
        },
        {
          type: "Custom",
          spacing: 1.5,
          visible: true,
          return: (
            <MDButton variant="outlined" component="label">
              Upload{" "}
              <input
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
          type: "TypographyVal",
          spacing: 2,
          sx: { fontSize: "14px" },
          path: `documentDetails.${i}.fileName`,
          visible: true,
        },
        {
          type: "Custom",
          visible: x.fileName !== "",
          spacing: 1,
          return: <CancelIcon color="primary" />,
        }
      );
    });
    return arr;
  };

  const onMMV = async (value, name, masterType, masterObj, mstVariable) => {
    lDto.PaymentDetails.InstrumentDate = DateFormatFromDateObject(new Date(), "d-m-y");
    lDto.InsurableItem[0].RiskItems[0][name] = value.mValue;
    setBackDropFlag(true);
    const res1 = await GetProdPartnermasterData(449, masterType, { [masterObj]: value.mID });
    setBackDropFlag(false);
    if (name === "Variant") {
      lDto.InsurableItem[0].RiskItems[0].SeatingCapacity = res1[0].Seating_Capacity;
      lDto.InsurableItem[0].RiskItems[0].CC = res1[0].Cubic_Capacity;
      lDto.InsurableItem[0].RiskItems[0].IDVofVehicle = res1[0].IDV;
      lDto.InsurableItem[0].RiskItems[0].FuelType = res1[0].Fuel_Type;
    }
    if (name !== "Variant") lMasters[mstVariable] = res1;
    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const getPinCodeDetails = async (value, name) => {
    const getPincodeDistrictStateData = async (type, id) => {
      let payload;
      switch (type) {
        case "Country":
          payload = { Country_Id: id };
          break;
        case "State":
          payload = { State_Id: id };
          break;
        case "CityDistrict":
          payload = { City_Id: id };
          break;
        case "DetailsPincode":
          payload = { Pincode: id };
          break;
        default:
          break;
      }
      const details = await GetProdPartnermasterData1(449, 62, type, payload);
      return details;
    };

    const pincodeData = await getPincodeDistrictStateData("DetailsPincode", value);
    const district = await getPincodeDistrictStateData("CityDistrict", pincodeData[0].CityId);
    const state = await getPincodeDistrictStateData("State", district[0].StateId);
    // await getPincodeDistrictStateData("Country", state[0].mID);

    lDto.ProposerDetails[name].CityDistrict = district[0].mValue;
    lDto.ProposerDetails[name].State = state[0].mValue;
    setDto({ ...lDto });
  };

  const onSameAddress = (e) => {
    lDto.ProposerDetails.PermanentAddressSameAsCommunicationAddress = e.target.value;
    if (e.target.value === "Yes") {
      lDto.ProposerDetails.CommunicationAddress = { ...lDto.ProposerDetails.PermanentAddress };
    } else {
      lDto.ProposerDetails.CommunicationAddress.AddressLine1 = "";
      lDto.ProposerDetails.CommunicationAddress.AddressLine2 = "";
      lDto.ProposerDetails.CommunicationAddress.AddressLine3 = "";
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      lDto.ProposerDetails.CommunicationAddress.State = "";
      lDto.ProposerDetails.CommunicationAddress.Pincode = "";
    }
    setDto({ ...lDto });
  };
  const onHandelChange = async (e, a, n) => {
    if (n === "ManufacturingYear") {
      lDto.InsurableItem[0].RiskItems[0].YearOfManufacture = a.mValue;
      lDto.InsurableItem[0].RiskItems[0].VehicleAge = new Date().getFullYear() - a.mValue;
      lDto.InsurableItem[0].RiskItems[0].Age = new Date().getFullYear() - a.mValue;
    }
    if (n === "RTO") {
      lDto.InsurableItem[0].RiskItems[0].RTO = a.mValue;

      const resCode = a.mValue.split("-")[0];
      lDto.InsurableItem[0].RiskItems[0].RTOId = a.mID;
      lDto.InsurableItem[0].RiskItems[0].RTOValue = a.mValue;
      lDto.InsurableItem[0].RiskItems[0].RTO = a.mValue;
      lDto.InsurableItem[0].RiskItems[0].RegistrationNumber = "NEW";
      lDto.InsurableItem[0].RiskItems[0].RegistrationNumber1 = `${resCode[0]}${resCode[1]}`;
      lDto.InsurableItem[0].RiskItems[0].RegistrationNumber2 = `${resCode[2]}${resCode[3]}`;

      const res = await GetProdPartnermasterData(449, "RtoDetails", {
        RTO_PK: a.mID,
      });
      lDto.InsurableItem[0].RiskItems[0].Zone = res[0].ZONE;
    }
    setDto({ ...lDto });
  };

  const onInitiateKyc = async (e) => {
    if (e === true) {
      try {
        const obj1 = {
          Pan: dto.ProposerDetails.PANNo,
          dob: dto.ProposerDetails.DOB,
          userName: "NIVABUPA",
          password: "M@xbup@!2#",
        };
        setBackDropFlag(true);
        await CkycResponse(obj1).then(async (res) => {
          setBackDropFlag(false);

          lDto.ProposerDetails.CKYCNo = res.data.CKYCID;
          lDto.ProposerDetails.FirstName = res.data.FirstName;
          lDto.ProposerDetails.LastName = res.data.LastName;
          lDto.ProposerDetails.MiddleName = res.data.MiddleName;
          lDto.ProposerDetails.PermanentAddress.AddressLine1 = res.data.Address1;
          lDto.ProposerDetails.PermanentAddress.AddressLine2 = res.data.Address2;
          lDto.ProposerDetails.PermanentAddress.AddressLine3 = res.data.LandMark;
          lDto.ProposerDetails.PermanentAddress.CityDistrict = res.data.District;
          lDto.ProposerDetails.PermanentAddress.Pincode = res.data.PinCode;
          if (res.data.Gender === "M") lDto.ProposerDetails.Gender = "Male";
          if (res.data.Gender === "F") lDto.ProposerDetails.Gender = "Female";

          await getPinCodeDetails(res.data.PinCode, "PermanentAddress");
        });
      } catch (ex) {
        swal({ icon: "warning", text: "Something went wrong! Please try again" });
      }
      setDto({ ...lDto });
    }
  };

  const onPayment = async (e, v) => {
    if (e.status === "success") {
      setBackDropFlag(true);
      await Policies(dto).then((x) => {
        setBackDropFlag(false);
        if (x.status === 1) {
          objectPath.set(lDto, "PolicyNo", x.finalResult.id);
          objectPath.set(lDto, "PaymentDetails.TransactionNo", e.paymentId);
          objectPath.set(lDto, "PaymentDetails.ModeOfPayment", v);
          objectPath.set(lDto, "PaymentDetails.PaymentStatus", "Success");
          setDto({ ...lDto });
        }
      });
    }
  };

  const onPaymentMode = (v) => {
    objectPath.set(lDto, "PaymentDetails.ModeOfPayment", v);
    setDto({ ...lDto });
    if (v === "OnlinePayment") {
      RayzorPay({
        key: "rzp_test_KK09FiPyLY2aKI",
        amount: parseInt(dto.PremiumDetails.TotalPremium, 10),
        PayeeName: dto?.ProposerDetails?.FirstName,
        PayeeEmail: dto?.ProposerDetails?.EmailId,
        PayeeContact: dto?.ProposerDetails?.MobileNumber,
        PayeeAddress: "Maharastra",
        onPayment: (e) => onPayment(e, v),
      });
    }
  };

  const onIssuePolicy = async (validation) => {
    if (validation) {
      setBackDropFlag(true);

      await Policies(dto).then((x) => {
        setBackDropFlag(false);
        if (x.status === 1) {
          objectPath.set(lDto, "PolicyNo", x.finalResult.id);
          objectPath.set(lDto, "PaymentDetails.TransactionNo", "");
          objectPath.set(lDto, "PaymentDetails.ModeOfPayment", "Cheque");
          objectPath.set(lDto, "PaymentDetails.PaymentStatus", "Success");
          setDto({ ...lDto });
        }
      });
    }
  };

  const CoversArr = () => {
    const ODArr = [
      {
        type: "Typography",
        visible: dto.CoverageType !== "Liability",
        spacing: 12,
        label: "OD Covers",
      },
    ];
    const TPArr = [
      {
        type: "Typography",
        visible: dto.CoverageType !== "Standalone OD",
        spacing: 12,
        label: "TP Covers",
      },
    ];
    const DisArr = [
      {
        type: "Typography",
        visible: dto.CoverageType !== "Liability",
        spacing: 12,
        label: "Discount",
      },
    ];
    const AddONArr = [{ type: "Typography", visible: true, spacing: 12, label: "Add-on" }];

    dto?.InsurableItem?.[0]?.Covers?.forEach((x, i) => {
      const x1 = [
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: {
            label: x.CoverName,
            labelVisible: true,
          },
          radioList: [
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ],
          path: `InsurableItem.0.Covers.${i}.Selected`,
          spacing: 6.1,
          justifyContent: "space-between",
          disabled: x?.AdditionalInfo?.disabled === "true",
        },
      ];

      if (x?.AdditionalInfo?.controls) {
        x.AdditionalInfo.controls.forEach((x2) => {
          x1.push({
            type: x2.type,
            visible: "visibleDetails",
            label: x2.label,
            path: `InsurableItem.0.Covers.${i}.CoverDetails.${x2.value}`,
            visibleDetails: {
              path: `InsurableItem.0.Covers.${i}.Selected`,
              value: x2.conditionValue,
            },
            options: x2?.options ? x2.options.map((x3) => ({ mID: x3, mValue: x3 })) : [],
            spacing: 2.5,
            required: "requiredDetails",
            requiredDetails: {
              path: `InsurableItem.0.Covers.${i}.Selected`,
              value: x2.conditionValue,
            },
          });
        });
      }

      if (x.CoverType === "OD" && dto.CoverageType !== "Liability") ODArr.push(...x1);
      if (x.CoverType === "TP" && dto.CoverageType !== "Standalone OD") TPArr.push(...x1);
      if (x.CoverType === "DISCOUNT" && dto.CoverageType !== "Liability") DisArr.push(...x1);
      if (x.CoverType === "ADDON") AddONArr.push(...x1);
    });

    return [...ODArr, ...TPArr, ...DisArr, ...AddONArr];
  };

  const onPolicyTenure = (e, a) => {
    const ODDate = new Date();
    const TPDate = new Date();
    const dd1 = new Date();
    const StartTime = `${dd1.getHours()}:${dd1.getMinutes()}:${dd1.getSeconds()}`;

    ODDate.setFullYear(new Date().getFullYear() + a.OD);
    ODDate.setMonth(new Date().getMonth());
    ODDate.setDate(new Date().getDate() - 1);

    TPDate.setFullYear(new Date().getFullYear() + a.TP);
    TPDate.setMonth(new Date().getMonth());
    TPDate.setDate(new Date().getDate() - 1);

    objectPath.set(lDto, "PolicyStartDate", DateFormatFromDateObject(new Date(), "y-m-d"));
    objectPath.set(lDto, "TPStartDate", DateFormatFromDateObject(new Date(), "y-m-d"));
    objectPath.set(lDto, "ODStartDate", DateFormatFromDateObject(new Date(), "y-m-d"));

    objectPath.set(lDto, "TPStartTime", StartTime);
    objectPath.set(lDto, "ODStartTime", StartTime);

    objectPath.set(lDto, "PolicyEndDate", DateFormatFromDateObject(ODDate, "y-m-d"));
    objectPath.set(lDto, "ODEndDate", DateFormatFromDateObject(ODDate, "y-m-d"));
    objectPath.set(lDto, "TPEndDate", DateFormatFromDateObject(TPDate, "y-m-d"));

    objectPath.set(lDto, "PolicyTenure", a.mValue);
    setDto({ ...lDto });
  };

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Coverage Type",
            path: "CoverageType",
            options: masters.CoverageType,
            setOption: "mID",
          },
          {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Business Type",
            path: "BusinessType",
            options: masters.BusinessType,
          },
          {
            type: "AutoComplete",
            label: "Customer Type",
            visible: true,
            required: true,
            path: "CustomerType",
            options: localMasters.customerType,
          },
          {
            type: "AutoComplete",
            label: "Policy Type",
            visible: true,
            required: true,
            path: "PolicyType",
            options: masters.PolicyType,
            paths: [{ path: "PolicyTenure", value: "" }],
          },
          {
            type: "AutoComplete",
            label: "Policy Tenure",
            visible: true,
            required: true,
            path: "PolicyTenure",
            options: localMasters.policyTenure.filter((x) => x.filterCode === dto.PolicyType),
            customOnChange: onPolicyTenure,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Make",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.Make",
            options: masters.Make,
            customOnChange: (e, v) => onMMV(v, "Make", "IModel", "Make_id", "Model"),
          },
          {
            type: "AutoComplete",
            label: "Model",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.Model",
            options: masters.Model,
            customOnChange: (e, v) => onMMV(v, "Model", "IVariant", "Model_Id", "Variant"),
          },
          {
            type: "AutoComplete",
            label: "Variant",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.Variant",
            options: masters.Variant,
            customOnChange: (e, v) => onMMV(v, "Variant", "VariantDetails", "Variant_Id", "k"),
          },
          {
            type: "Input",
            label: "Seating Capacity",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.SeatingCapacity",
            options: masters.SeatingCapacity,
            disabled: true,
          },
          {
            type: "Input",
            label: "CC/KW",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.CC",
            options: masters.CCKW,
            disabled: true,
          },
          {
            type: "Input",
            label: "Fuel Type",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.FuelType",
            options: masters.FuelType,
            disabled: true,
          },
          {
            type: "Input",
            label: "IDV",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.IDVofVehicle",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Manufacturing Year",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.YearOfManufacture",
            options: masters.ManufacturingYear,
            customOnChange: (e, a) => onHandelChange(e, a, "ManufacturingYear"),
          },
          {
            type: "MDDatePicker",
            label: "Reg / Purchase Date",
            visible: true,
            required: true,
            dateFormat: "d-m-Y",
            path: "InsurableItem.0.RiskItems.0.RegistrationDate",
            minDate:
              dto.BusinessType === "New Business"
                ? new Date("1-1-2000").setFullYear(new Date().getFullYear())
                : new Date(
                    `1-1-${
                      dto.InsurableItem[0].RiskItems[0].YearOfManufacture !== ""
                        ? dto.InsurableItem[0].RiskItems[0].YearOfManufacture
                        : new Date().getFullYear()
                    }`
                  ),
            maxDate: DateFormatFromDateObject(new Date(), "d-m-y"),
            // minDate: DateFormatFromDateObject(
            //   new Date().setFullYear(dto.InsurableItem[0].RiskItems[0].YearOfManufacture),
            //   "d-m-Y"
            // ),
          },
          {
            type: "AutoComplete",
            label: "RTO Location",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.RTO",
            options: masters.RTO,
            customOnChange: (e, a) => onHandelChange(e, a, "RTO"),
          },
          {
            type: "Input",
            label: "Vehicle Registration Number",
            visible: true,
            required: true,
            path: "InsurableItem.0.RiskItems.0.RegistrationNumber",
            disabled: dto.BusinessType === "New Business",
          },
        ],
        [
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: "",
            onChangeFuncs: ["IsNumeric"],
            onBlurFuncs: ["IsMobileNumber"],
          },
          {
            type: "Input",
            label: "Email ID",
            visible: true,
            path: "",
            onBlurFuncs: ["IsEmail"],
          },
          {
            type: "AutoComplete",
            label: "Customer State",
            visible: true,
            path: "",
          },
          {
            type: "Input",
            label: "GSTIN",
            visible: true,
            path: "",
          },
        ],
        [
          // {
          //   type: "RadioGroup",
          //   visible: true,
          //   required: true,
          //   radioLabel: { label: "NCB Reserving", labelVisible: true },
          //   radioList: [
          //     { value: "", label: "Yes" },
          //     { value: "", label: "No" },
          //   ],
          // path: "PreviousPolicyDetails.",
          // },
          {
            type: "AutoComplete",
            label: "NCB % for Expiring Policy",
            visible: true,
            path: "PreviousPolicyDetails.PreviousNCBPercentage",
            options: masters.NCB,
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: {
              label: "Have you done any claims in expiring policy ",
              labelVisible: true,
            },
            radioList: [
              { value: "Yes", label: "Yes" },
              { value: "No", label: "No" },
            ],
            path: "PreviousPolicyDetails.ClaimOnPreviousPolicy",
            spacing: 12,
          },
          // { type: "Typography", visible: true, spacing: 12, label: "OD Specific Details" },
          // { type: "Typography", visible: true, spacing: 12, label: "TP Specific Details" },
          {
            type: "AutoComplete",
            label: "Insurance Company",
            visible: true,
            path: "PreviousPolicyDetails.PreviousPolicyInsurerName",
            options: masters.PrevInsurers,
          },
          {
            type: "Input",
            label: "Policy Number",
            visible: true,
            path: "PreviousPolicyDetails.previousPolicyNumber",
          },
          {
            type: "AutoComplete",
            label: "Policy Type",
            visible: true,
            path: "PreviousPolicyDetails.previousPolicyType",
            options: masters.PreviousPolicyType,
          },

          {
            type: "MDDatePicker",
            label: "Previous Policy End Date",
            visible: true,
            dateFormat: "d-m-Y",
            path: "PreviousPolicyDetails.PreviousPolicyEndDate",
          },
        ],

        [],
        [],
        [],
      ];
      break;
    case 1:
      data = [[...CoversArr()]];
      break;
    case 2:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: <MotorPremiumSummary dto={dto} width="50%" />,
          },
        ],

        [
          ...spreedDocComponents(),
          {
            type: "Button",
            label: "Add Document",
            startIcon: <AddIcon />,
            visible: true,
            variant: "outlined",
            onClick: onAddDocument,
            spacing: 12,
          },
        ],
        [],
        [],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "MDDatePicker",
            label: "OD Start Date",
            visible: true,
            path: "ODStartDate",
            dateFormat: "Y-m-d",
            disabled: true,
          },
          {
            type: "Input",
            label: "OD Start Time",
            visible: true,
            path: "ODStartTime",
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "OD End Date",
            visible: true,
            path: "ODEndDate",
            dateFormat: "Y-m-d",
            disabled: true,
          },
          {
            type: "Input",
            label: "OD End Time",
            visible: true,
            path: "ODEndTime",
            disabled: true,
          },

          {
            type: "MDDatePicker",
            label: "TP Start Date",
            visible: true,
            path: "TPStartDate",
            dateFormat: "Y-m-d",
            disabled: true,
          },
          {
            type: "Input",
            label: "TP Start Time",
            visible: true,
            path: "TPStartTime",
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "TP End Date",
            visible: true,
            path: "TPEndDate",
            dateFormat: "Y-m-d",
            disabled: true,
          },
          {
            type: "Input",
            label: "TP End Time",
            visible: true,
            path: "TPEndTime",
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Previous Policy End Date",
            visible: dto.BusinessType !== "New Business",
            dateFormat: "d-m-Y",
            disabled: true,
            path: "PreviousPolicyDetails.PreviousPolicyEndDate",
          },

          {
            type: "AutoComplete",
            label: "Coverage Type",
            visible: true,
            path: "CoverageType",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Business Type",
            visible: true,
            path: "BusinessType",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Customer Type",
            visible: true,
            path: "CustomerType",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Policy Type",
            visible: true,
            path: "PolicyType",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Policy Tenure",
            visible: true,
            path: "PolicyTenure",
            disabled: true,
          },
        ],

        [
          {
            type: "Input",
            label: "PAN Card No.",
            visible: true,
            required: true,
            path: "ProposerDetails.PANNo",
            validationId: 1,
          },
          {
            type: "MDDatePicker",
            label: "DOB",
            visible: true,
            required: true,
            dateFormat: "d-m-Y",
            path: "ProposerDetails.DOB",
            validationId: 1,
          },
          {
            type: "ValidationControl",
            subType: "Button",
            label: "Initiate KYC",
            visible: true,
            onClick: onInitiateKyc,
            validationId: 1,
          },
          {
            type: "Input",
            label: "CKYC No",
            visible: true,
            required: true,
            path: "ProposerDetails.CKYCNo",
          },
          {
            type: "AutoComplete",
            label: "Salutation",
            visible: true,
            required: true,
            path: "ProposerDetails.Salutation",
            options: masters.Salutation,
          },
          {
            type: "Input",
            label: "First Name",
            visible: true,
            required: true,
            path: "ProposerDetails.FirstName",
            onChangeFuncs: [IsAlphaSpace],
          },
          {
            type: "Input",
            label: "Last Name",
            visible: true,
            required: true,
            path: "ProposerDetails.LastName",
            onChangeFuncs: [IsAlphaSpace],
          },

          {
            type: "AutoComplete",
            label: "Gender",
            visible: true,
            required: true,
            path: "ProposerDetails.Gender",
            options: masters.Gender,
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            required: true,
            path: "ProposerDetails.MobileNumber",
            onChangeFuncs: ["IsNumeric"],
            onBlurFuncs: ["IsMobileNumber"],
          },
          {
            type: "Input",
            label: "Email Id",
            visible: true,
            required: true,
            path: "ProposerDetails.EmailId",
            onBlurFuncs: ["IsEmail"],
          },
          {
            type: "Input",
            label: "GSTIN Number",
            visible: true,
            path: "ProposerDetails.GSTInNumber",
          },
        ],
        [
          {
            type: "Typography",
            visible: true,
            label: "Permanent Address",
            spacing: 12,
          },

          {
            type: "Input",
            visible: true,
            label: "Address 1",
            required: true,
            path: "ProposerDetails.PermanentAddress.AddressLine1",
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Address 2",
            path: "ProposerDetails.PermanentAddress.AddressLine2",
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Land Mark",
            path: "ProposerDetails.PermanentAddress.AddressLine3",
          },
          {
            type: "Input",
            visible: true,
            required: true,
            label: "Pincode",
            path: "ProposerDetails.PermanentAddress.Pincode",
            customOnBlur: (e) => getPinCodeDetails(e.target.value, "PermanentAddress"),
            onChangeFuncs: ["IsNumeric"],
          },
          {
            type: "Input",
            visible: true,
            label: "City",
            path: "ProposerDetails.PermanentAddress.CityDistrict",
            disabled: true,
          },
          {
            type: "Input",
            visible: true,
            label: "State",
            path: "ProposerDetails.PermanentAddress.State",
            disabled: true,
          },
          // {
          //   type: "AutoComplete",
          //   visible: true,
          //   label: "Country",
          //   path: "ProposerDetails.PermanentAddress.Country",
          // },

          {
            type: "Typography",
            visible: true,
            label: "Communication Address",
            spacing: 12,
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: {
              label: "Is Your Communication Address same as Permanent  Address",
              labelVisible: true,
            },
            radioList: radioYesNoOptions,
            path: "ProposerDetails.PermanentAddressSameAsCommunicationAddress",
            spacing: 12,
            customOnChange: onSameAddress,
          },

          {
            type: "Input",
            visible: true,
            label: "Address 1",
            required: true,
            path: "ProposerDetails.CommunicationAddress.AddressLine1",
            disabled: lDto.ProposerDetails.PermanentAddressSameAsCommunicationAddress === "Yes",
          },
          {
            type: "Input",
            visible: true,
            label: "Address 2",
            required: true,
            path: "ProposerDetails.CommunicationAddress.AddressLine2",
            disabled: lDto.ProposerDetails.PermanentAddressSameAsCommunicationAddress === "Yes",
          },
          {
            type: "Input",
            visible: true,
            label: "Land Mark",
            required: true,
            path: "ProposerDetails.CommunicationAddress.AddressLine3",
            disabled: lDto.ProposerDetails.PermanentAddressSameAsCommunicationAddress === "Yes",
          },
          {
            type: "Input",
            visible: true,
            label: "Pincode",
            required: true,
            path: "ProposerDetails.CommunicationAddress.Pincode",
            customOnBlur: (e) => getPinCodeDetails(e.target.value, "CommunicationAddress"),
            disabled: lDto.ProposerDetails.PermanentAddressSameAsCommunicationAddress === "Yes",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            type: "Input",
            visible: true,
            label: "City",
            path: "ProposerDetails.CommunicationAddress.CityDistrict",
            disabled: true,
          },
          {
            type: "Input",
            visible: true,
            label: "State",
            path: "ProposerDetails.CommunicationAddress.State",
            disabled: true,
          },
          // {
          //   type: "AutoComplete",
          //   visible: true,
          //   label: "Country",
          //   path: "ProposerDetails.CommunicationAddress.Country",
          // },

          {
            type: "RadioGroup",
            visible: true,
            radioLabel: {
              label: "Do you have e-Insurance Account Number",
              labelVisible: true,
            },
            radioList: radioYesNoOptions,
            path: "ProposerDetails.DOYouHaveEInsuranceAccountNumber",
            spacing: 12,
          },
          {
            type: "Input",
            visible: dto.ProposerDetails.DOYouHaveEInsuranceAccountNumber === "Yes",
            label: "e-Insurance Account Number",
            path: "ProposerDetails.EInsuranceAccountNumber",
            required: dto.ProposerDetails.DOYouHaveEInsuranceAccountNumber === "Yes",
          },
          {
            type: "Input",
            visible: dto.ProposerDetails.DOYouHaveEInsuranceAccountNumber === "Yes",
            label: "Bank RM Code/ BDR Code",
            path: "ProposerDetails.BankCode",
            required: dto.ProposerDetails.DOYouHaveEInsuranceAccountNumber === "Yes",
          },
          {
            type: "Input",
            visible: dto.ProposerDetails.DOYouHaveEInsuranceAccountNumber === "Yes",
            label: "LAN Code",
            path: "ProposerDetails.LANCode",
            required: dto.ProposerDetails.DOYouHaveEInsuranceAccountNumber === "Yes",
          },
          {
            type: "Input",
            visible: dto.ProposerDetails.DOYouHaveEInsuranceAccountNumber === "Yes",
            label: "Branch Code/ Bank SOL ID",
            path: "ProposerDetails.BranchCode",
            required: dto.ProposerDetails.DOYouHaveEInsuranceAccountNumber === "Yes",
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Make",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Make",
            options: masters.Make,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Model",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Model",
            options: masters.Model,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Variant",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.Variant",
            options: masters.Variant,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Reg / Purchase Date",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.RegistrationDate",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Manufacturing Year",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.YearOfManufacture",
            options: masters.ManufacturingYear,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "RTO Location",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.RTO",
            options: masters.RTO,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Seating Capacity",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.SeatingCapacity",
            options: masters.SeatingCapacity,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "CC/KW",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.CC",
            options: masters.CCKW,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Fuel Type",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.FuelType",
            options: masters.FuelType,
            disabled: true,
          },
          {
            type: "Input",
            label: "IDV",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.IDVofVehicle",
            disabled: true,
          },
          {
            type: "Input",
            label: "Chassis No.",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.ChassisNumber",
            required: true,
          },
          {
            type: "Input",
            label: "Engin No.",
            visible: true,
            path: "InsurableItem.0.RiskItems.0.EngineNumber",
            required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: {
              label: "Is Your Vehicle Hypothecated?",
              labelVisible: true,
            },
            radioList: radioYesNoOptions,
            path: "InsurableItem.0.RiskItems.0.ISYourVehicleHypothecated",
            spacing: 12,
          },
          {
            type: "AutoComplete",
            visible: dto.InsurableItem[0].RiskItems[0].ISYourVehicleHypothecated === "Yes",
            label: "Financier Type",
            path: "InsurableItem.0.RiskItems.0.FinancierType",
            options: masters.Hypothecation,
            required: dto.InsurableItem[0].RiskItems[0].ISYourVehicleHypothecated === "Yes",
          },
          {
            type: "Input",
            visible: dto.InsurableItem[0].RiskItems[0].ISYourVehicleHypothecated === "Yes",
            label: "Financier Name",
            path: "InsurableItem.0.RiskItems.0.FinancierName",
            required: dto.InsurableItem[0].RiskItems[0].ISYourVehicleHypothecated === "Yes",
          },
          {
            type: "Input",
            visible: dto.InsurableItem[0].RiskItems[0].ISYourVehicleHypothecated === "Yes",
            label: "Financier Address",
            path: "InsurableItem.0.RiskItems.0.FinancierAddress",
            required: dto.InsurableItem[0].RiskItems[0].ISYourVehicleHypothecated === "Yes",
          },
        ],
        [
          {
            type: "AutoComplete",
            visible: true,
            label: "Salutation",
            path: "NomineeDetails.0.Title",
            options: masters.Salutation,
            required: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Nominee Name",
            path: "NomineeDetails.0.NomineeName",
            required: true,
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "Relationship",
            path: "NomineeDetails.0.NomineeRelationWithProposer",
            options: masters.NomineeRelation,
            required: true,
          },
          {
            type: "MDDatePicker",
            visible: true,
            label: "DOB",
            path: "NomineeDetails.0.NomineeDOB",
            dateFormat: "Y-m-d",
            maxDate: DateFormatFromDateObject(new Date(), "y-m-d"),
            required: true,
          },
        ],
        [],
        [],
        [],
      ];
      break;
    case 4:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: <MotorPremiumSummary dto={dto} width="50%" />,
          },
        ],
        [],
      ];
      break;
    case 5:
      data = [
        [
          {
            type: "Split",
            visible: true,
            spacing: 12,
            split: [
              { id: 1, xs: 12, md: 2, lg: 2, xl: 2, xxl: 2, p: 1 },
              { id: 2, xs: 12, md: 4, lg: 4, xl: 4, xxl: 4, p: 4 },
              { id: 3, xs: 12, md: 6, lg: 6, xl: 6, xxl: 6, p: 2 },
            ],
          },
          {
            type: "Button",
            visible: true,
            spacing: 12,
            label: "Cheque",
            splitId: 1,
            sx: { width: "100%", display: "flex" },
            variant: dto.PaymentDetails.ModeOfPayment === "Cheque" ? "contained" : "outlined",
            onClick: () => onPaymentMode("Cheque"),
          },
          {
            type: "Button",
            visible: true,
            spacing: 12,
            label: "Online Payment",
            splitId: 1,
            sx: { width: "100%", display: "flex" },
            variant:
              dto.PaymentDetails.ModeOfPayment === "OnlinePayment" ? "contained" : "outlined",
            onClick: () => onPaymentMode("OnlinePayment"),
          },
          {
            type: "Button",
            visible: true,
            spacing: 12,
            label: "Send Payment Link",
            splitId: 1,
            sx: { width: "100%", display: "flex" },
            variant: dto.PaymentDetails.ModeOfPayment === "PaymentLink" ? "contained" : "outlined",
            onClick: () => onPaymentMode("PaymentLink"),
            disabled: true,
          },

          {
            type: "CurrencyInput",
            visible: dto.PaymentDetails.ModeOfPayment === "Cheque",
            spacing: 12,
            label: "Check Amount",
            splitId: 2,
            path: "PremiumDetails.TotalPremium",
            disabled: true,
            required: true,
          },
          {
            type: "Input",
            visible: dto.PaymentDetails.ModeOfPayment === "Cheque",
            spacing: 12,
            validationId: 2,
            label: "Instrument No",
            splitId: 2,
            path: "PaymentDetails.InstrumentNumber",
            required: true,
          },
          {
            type: "MDDatePicker",
            visible: dto.PaymentDetails.ModeOfPayment === "Cheque",
            spacing: 12,
            label: "Instrument Date",
            splitId: 2,
            dateFormat: "d-m-Y",
            path: "PaymentDetails.InstrumentDate",
            required: true,

            disabled: true,
          },
          {
            type: "Input",
            visible: dto.PaymentDetails.ModeOfPayment === "Cheque",
            spacing: 12,
            validationId: 2,
            label: "Bank Name",
            splitId: 2,
            path: "PaymentDetails.BankName",
            onChangeFuncs: ["IsAlpha"],
            required: true,
          },
          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 2,
            visible: dto.PaymentDetails.ModeOfPayment === "Cheque",
            spacing: 12,
            label: "Issue Policy",
            splitId: 2,
            justifyContent: "center",
            onClick: onIssuePolicy,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: <MotorPremiumSummary dto={dto} width="100%" />,
            splitId: 3,
          },
        ],
        [{ type: "Custom", visible: true, spacing: 12, return: <PaymentSuccess dto={dto} /> }],
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
  const lDto = dto;

  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      {
        const res1 = await Quotations(dto);
        if (res1.status === 1) {
          objectPath.set(lDto, "PremiumDetails", res1.finalResult);
          objectPath.set(lDto, "PremiumDetail.TotalPremium", res1.finalResult.TotalPremium);

          setDto({ ...lDto });

          fun = true;
        } else fun = false;
      }

      break;
    case 2:
      fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      {
        const res1 = await Proposals(dto);
        if (res1.status === 1) {
          objectPath.set(lDto, "ProposalNo", res1.finalResult.proposalNumber);
          setDto({ ...lDto });
          fun = true;
        } else fun = false;
      }

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
        next: { label: `Proceed`, visible: true, loader: "backDrop" },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: `Calculate Premium`, visible: true, loader: "backDrop" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: `Proceed to Proposal`, visible: true, loader: "backDrop" },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed to Payment", visible: true, loader: "backDrop" },
      };
      break;

    case 5:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "", visible: false, loader: "backDrop" },
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
  const mst = {
    quoteData: [{ "Basic OD": "", "Non Electrical Accessories": "", Final: "" }],
    Make: [],
    Model: [],
    Variant: [],
    ManufacturingYear: [],
    RTO: [],
    SeatingCapacity: [],
    CCKW: [],
    FuelType: [],
    Gender: [],
    NomineeRelation: [],
    Nationality: [],
    Salutation: [],
    MaritalStatus: [],
    Occupation: [],
    Hypothecation: [],
    PolicyType: [],
    BusinessType: [],
    Insurers: [],
    PreviousPolicyType: [],
    PrevInsurers: [],
    AllDiscounts: [],
    AddOnCovers: [],
    NCB: [],
    CoverageType: [],
  };
  const res1 = await GetProdPartnermasterData(449, "VehicleType", { VehicleType: "PvtCar" });
  mst.Make = res1;

  const curY = new Date().getFullYear();
  const res2 = arrayRange(curY - 14, curY, 1).reverse();

  mst.ManufacturingYear = res2.map((x) => ({ mID: x, mValue: x }));

  const res3 = await GetProdPartnermasterData(449, "RTO", {
    RTONumber: "",
  });
  mst.RTO = res3;

  const res4 = await GetProdPartnermasterData(449, "Gender", {
    Gender: "",
  });
  mst.Gender = res4;

  const res5 = await GetProdPartnermasterData1(449, 62, "NomineeRelation", {
    NomineeRelation: "",
  });
  mst.NomineeRelation = res5;

  const res6 = await GetProdPartnermasterData1(449, 62, "Nationality", {
    Nationality: "",
  });
  mst.Nationality = res6;

  const res7 = await GetProdPartnermasterData(449, "Salutation", {
    Salutation: "",
  });
  mst.Salutation = res7;

  const res8 = await GetProdPartnermasterData1(449, 62, "MaritalStatus", {
    MaritalStatus: "",
  });
  mst.MaritalStatus = res8;

  const res9 = await GetProdPartnermasterData(449, "Occupation", {
    Occupation: "",
  });
  mst.Occupation = res9;

  const res10 = await GetProdPartnermasterData(449, "MotorPolicyType", {});
  mst.PolicyType = res10;

  const res11 = await GetProdPartnermasterData1(449, 62, "Hypothecation", {
    Hypothecation: "",
  });
  mst.Hypothecation = res11;

  const res12 = await GetProdPartnermasterData(449, "MotorBusinessType", {});
  mst.BusinessType = res12;

  const res13 = await GetProdPartnermasterData(449, "NCB", {});
  mst.NCB = res13;

  const res14 = await GetProdPartnermasterData(449, "Insurers", {});
  mst.Insurers = res14;

  const res15 = await GetProdPartnermasterData(449, "AddOnCovers", {});
  mst.AddOnCovers = res15;

  const res16 = await GetProdPartnermasterData(449, "AllDiscounts", {});
  mst.AllDiscounts = res16;

  const res17 = await GetProdPartnermasterData(449, "PreviousPolicyType", {
    VehicleType: "PvtCar",
  });
  mst.PreviousPolicyType = res17;

  const res18 = await GetProdPartnermasterData(449, "PrevInsurers", {});
  mst.PrevInsurers = res18;

  const res19 = await GetProdPartnermasterData(449, "MotorCoverageType", {});
  mst.CoverageType = res19;

  return mst;
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
