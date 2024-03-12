import swal from "sweetalert";
import swal2 from "sweetalert2";
import { Icon } from "@mui/material";

import {
  IsNumeric,
  IsFreetextNoSpace,
  IsMobileNumber,
  IsEmail,
  AgeCalculator,
} from "../../../../../../Common/Validations";
import {
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  Transliteration,
  GetProdPartnermasterData,
  DocumenUpload,
  DeleteDocument,
} from "./data/APIs/MotorCycleApi";
import {
  //  ProposerDetails,
  docDetails,
  BranchDetails,
} from "./data/Json/PropertyInsuranceJson";
// import { Bankdetails } from "./data/Json/PrivateVehicleJson";

const IsNumaricSpecialNoSpace = (str) => {
  const regex = /^[0-9-+]+[0-9-+\s]*$/;
  if (regex.test(str) || str === "") {
    return true;
  }
  return "Allows only numbers and special characters";
};
const onBlurTransliteration = async (e, a, EF, ET, i, dto, setDto) => {
  const lDto = dto;
  EF(false);
  ET("");
  // production
  // development
  if (process.env.NODE_ENV === "development") {
    const iText = e.target.value;
    const varName = e.target.name;
    const obj = {
      textList: [{ Text: iText }],
    };
    const res = await Transliteration(obj);
    const Text = res?.[0]?.text ? res[0].text : "";

    if (varName === "BankNameinEnglish") {
      lDto.Bankdetails.BankorFinancialInstituionNameinNepali = Text;
    }
    if (varName === "BankAddressEnglish") {
      lDto.Bankdetails.AddressNepali = Text;
    }
    if (varName === "BranchNameinEnglish") {
      lDto.Bankdetails.BranchDetails[i].AddressNepali = Text;
    }
    if (varName === "InsuredNameEnglish") {
      lDto.ProposerDetails[i].InsuredNameNepali = Text;
    }
    if (varName === "TemporaryAddressEnglish") {
      lDto.ProposerDetails[i].CommunicationAddress.TemporaryAddressNepali = Text;
    }
    if (varName === "IndividualTemporaryAddressEnglish") {
      lDto.ProposerDetails[i].CommunicationAddress.TemporaryAddressNepali = Text;
    }
    if (varName === "PermanentAdrressEnglish") {
      lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
    }
    if (varName === "IndividualHusbandNameEnglish") {
      lDto.ProposerDetails[i].HusbandNameNepali = Text;
    }
    if (varName === "IndividualWifeNameEnglish") {
      lDto.ProposerDetails[i].WifeNameNepali = Text;
    }
    if (varName === "IndividualFatherNameEnglish") {
      lDto.ProposerDetails[i].FatherNameNepali = Text;
    }
    if (varName === "IndividualGrandfatherNameEnglish") {
      lDto.ProposerDetails[i].GrandfatherNameNepali = Text;
    }
    if (varName === "IndividualPermanentAddressEnglish") {
      lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
    }
    if (varName === "IndividualTownEnglish") {
      lDto.ProposerDetails[i].PermanentAdrress.TownNepali = Text;
    }
    if (varName === "IndividualCityEnglish") {
      lDto.ProposerDetails[i].PermanentAdrress.CityNepali = Text;
    }
    if (varName === "IndividualResidenceEnglish") {
      lDto.ProposerDetails[i].CommunicationAddress.ResidenceNepali = Text;
    }
    if (varName === "WifeNameEnglish") {
      lDto.ProposerDetails[i].WifeNameNepali = Text;
    }
    if (varName === "FatherNameEnglish") {
      lDto.ProposerDetails[i].FatherNameNepali = Text;
    }
    if (varName === "GrandFatherNameEnglish") {
      lDto.ProposerDetails[i].GrandfatherNameNepali = Text;
    }
    if (varName === "AddressEnglish111") {
      lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
    }
    if (varName === "HusbandNameEnglish") {
      lDto.ProposerDetails[i].HusbandNameNepali = Text;
    }
    if (varName === "TownEnglish1111") {
      lDto.ProposerDetails[i].PermanentAdrress.TownNepali = Text;
    }
    if (varName === "CityEnglish11111") {
      lDto.ProposerDetails[i].PermanentAdrress.CityNepali = Text;
    }
    // if (varName === "TemporaryAddressEnglish") {
    //   lDto.ProposerDetails[i].CommunicationAddress.TempAddresNepali = Text;
    // }
    if (varName === "TempAddresEnglish") {
      lDto.ProposerDetails[i].CommunicationAddress.TempAddresNepali = Text;
    }
    if (varName === "ProprietorNameEnglish") {
      lDto.ProposerDetails[0].ProprietorNameNepali = Text;
    }
    if (varName === "RiskAddressEnglish") {
      lDto.RiskAddressDetails.AddressNepali = Text;
    }
    if (varName === "VehicleNoEnglish") {
      lDto.InsurableItem[0].RiskItems[0].VehicleNoNepali = Text;
    }
    if (varName === "MemberNameEnglish") {
      lDto.ProposerDetails[i].MemberNameNepali = Text;
    }
    if (varName === "DesignationEnglish") {
      lDto.ProposerDetails[i].DesignationNepali = Text;
    }
    if (varName === "CareofNameEnglish") {
      lDto.ProposerDetails[0].CareofNameNepali = Text;
    }
    if (varName === "CareofAddressEnglish") {
      lDto.ProposerDetails[0].CareofAddressNepali = Text;
    }
    if (varName === "ToleStreetNameEnglish") {
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.ToleStreetNameNepali = Text;
    }
    setDto({ ...lDto });
  }
};
const OnPlaceSelect = async (e, a, n, index, dto, setDto, masters, setMasters) => {
  const lDto = dto;
  const masters1 = masters;
  if (n === "State1") {
    if (a !== null) {
      const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
      lDto.Bankdetails.ProvinceorState = a.mValue;
      lDto.Bankdetails.District = "";
      lDto.Bankdetails.Municipality = "";
      masters1.District1 = res.data;
      // masters1.Municipality1 = [];
    } else {
      lDto.Bankdetails.ProvinceorState = "";
      lDto.Bankdetails.District = "";
      lDto.Bankdetails.Municipality = "";
      lDto.Bankdetails.WardNumber = "";
    }
  }
  if (n === "District1") {
    if (a !== null) {
      const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
      lDto.Bankdetails.District = a.mValue;
      lDto.Bankdetails.Municipality = "";
      masters1.Municipality1 = res.data;
      // masters1.Municipality1 = [];
    } else {
      lDto.Bankdetails.District = "";
      lDto.Bankdetails.Municipality = "";
      lDto.Bankdetails.WardNumber = "";
    }
  }
  // if (n === "Municipality1") {
  //   lDto.Bankdetails.Municipality = a.mValue;
  // }
  if (n === "State2") {
    if (a !== null) {
      const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
      lDto.ProposerDetails[index].PermanentAdrress.ProvinceState = a.mValue;
      lDto.ProposerDetails[index].PermanentAdrress.District = "";
      lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
      masters1.District2 = res.data;
    } else {
      lDto.ProposerDetails[index].PermanentAdrress.ProvinceState = "";
      lDto.ProposerDetails[index].PermanentAdrress.District = "";
      lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
      lDto.ProposerDetails[index].PermanentAdrress.WardNumber = "";
    }
  }
  if (n === "District2") {
    if (a !== null) {
      const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
      lDto.ProposerDetails[index].PermanentAdrress.District = a.mValue;
      lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
      masters1.Municipality2 = res.data;
    } else {
      lDto.ProposerDetails[index].PermanentAdrress.District = "";
      lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
      lDto.ProposerDetails[index].PermanentAdrress.WardNumber = "";
    }
  }
  // if (n === "Municipality2") {
  //   lDto.ProposerDetails.PermanentAdrress.Municipality = a.mValue;
  // }

  if (n === "State3") {
    if (a !== null) {
      const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
      lDto.RiskAddressDetails.ProvinceState = a.mValue;
      lDto.RiskAddressDetails.District = "";
      lDto.RiskAddressDetails.Municipality = "";
      masters1.District3 = res.data;
    } else {
      lDto.RiskAddressDetails.ProvinceState = "";
      lDto.RiskAddressDetails.District = "";
      lDto.RiskAddressDetails.Municipality = "";
      lDto.RiskAddressDetails.WardNumber = "";
    }
  }
  if (n === "District3") {
    if (a !== null) {
      const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
      lDto.RiskAddressDetails.District = a.mValue;
      lDto.RiskAddressDetails.Municipality = "";
      masters1.Municipality3 = res.data;
    } else {
      lDto.RiskAddressDetails.District = "";
      lDto.RiskAddressDetails.Municipality = "";
      lDto.RiskAddressDetails.WardNumber = "";
    }
  }
  // if (n === "Municipality3") {
  //   lDto.RiskAddressDetails.Municipality = a.mValue;
  // }

  if (n === "State4") {
    if (a !== null) {
      // masters1.Municipalitynew = [];
      const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
      lDto.Bankdetails.BranchDetails[index].ProvinceState = a.mValue;
      lDto.Bankdetails.BranchDetails[index].District = "";
      lDto.Bankdetails.BranchDetails[index].Municipality = "";
      masters1.placeMasters[index].district = res.data;
    } else {
      lDto.Bankdetails.BranchDetails[index].ProvinceState = "";
      lDto.Bankdetails.BranchDetails[index].District = "";
      lDto.Bankdetails.BranchDetails[index].Municipality = "";
      lDto.Bankdetails.BranchDetails[index].WardNumber = "";
    }
  }
  if (n === "District4") {
    if (a !== null) {
      // masters1.Municipalitynew = [];
      const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
      lDto.Bankdetails.BranchDetails[index].District = a.mValue;
      lDto.Bankdetails.BranchDetails[index].Municipality = "";
      masters1.placeMasters[index].municipality = res.data;
    } else {
      lDto.Bankdetails.BranchDetails[index].District = "";
      lDto.Bankdetails.BranchDetails[index].Municipality = "";
      lDto.Bankdetails.BranchDetails[index].WardNumber = "";
    }
  }
  // if (n === "Municipality4") {
  //   lDto.Bankdetails.BranchDetails[index].Municipality = a.mValue;
  // }
  if (n === "State6") {
    if (a !== null) {
      // masters1.Municipalitynew = [];
      const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.ProvinceState = a.mValue;
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
      masters1.District6 = res.data;
    } else {
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.ProvinceState = "";
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.WardNumber = "";
    }
  }
  if (n === "District6") {
    if (a !== null) {
      const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });

      lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = a.mValue;
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
      masters1.Municipality6 = res.data;
    } else {
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.District = "";
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.Municipality = "";
      lDto.InsurableItem[0].RiskItems[0].RiskLocation.WardNumber = "";
    }
  }
  setDto({ ...lDto });
  setMasters({ ...masters1 });
};
const spreadDocumentDetails = ({ proposerIndex, dto, setDto }) => {
  const i1 = proposerIndex;
  const lDto = dto;
  const onCancelClick = async (i2, i) => {
    const file = lDto.ProposerDetails[i2].documentDetails[i].FileName;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.ProposerDetails[i2].documentDetails[i].FileName = "";
        lDto.ProposerDetails[i2].documentDetails[i].DocId = "";
        lDto.ProposerDetails[i2].documentDetails[i].UploadDocDate = "";
        setDto({ ...lDto });
      }
    });
  };
  const handleDocFileDelete = async (i2, i3) => {
    const file = lDto.ProposerDetails[i2].documentDetails[i3].FileName;
    if (file !== "") await DeleteDocument(file);
    const arr1 = lDto.ProposerDetails[i2].documentDetails.filter((x, i) => i !== i2);
    lDto.ProposerDetails[i2].documentDetails = arr1;
    setDto({ ...lDto });
  };
  const handleDublicateDoc = (e, i2, index) => {
    lDto.ProposerDetails[i2].documentDetails.forEach((x, i) => {
      if (x.DocName === e.target.value && i !== index && x.DocName !== "") {
        swal({
          icon: "error",
          text: `"${(lDto.ProposerDetails[i2].documentDetails[index].DocName =
            e.target.value)}" Already Exist`,
        });
        lDto.ProposerDetails[i2].documentDetails[index].DocName = "";
      }
    });
    setDto({ ...lDto });
  };
  const onDocUplode = async (file, i2, i) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data[0].fileName !== null) {
        lDto.ProposerDetails[i2].documentDetails[i].FileName = file.name;
        lDto.ProposerDetails[i2].documentDetails[i].UploadDocDate = new Date().toLocaleDateString();
        lDto.ProposerDetails[i2].documentDetails[i].DocId = result.data[0].docid;
        setDto({ ...lDto });
        swal({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };
  const handleFileUpload = async (event, i2, index) => {
    await onDocUplode(event.target.files[0], i2, index);
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      inputElement.value = "";
    }
    file1.target.value = "";
  };

  const arr = [];
  dto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
    arr.push(
      {
        type: "Input",
        visible: true,
        label: "Document Name",
        path: `ProposerDetails.${i1}.documentDetails.${i}.DocName`,
        onChangeFuncs: [IsFreetextNoSpace],
        customOnBlur: (e) => handleDublicateDoc(e, i1, i),
      },
      {
        type: "Button",
        visible: true,
        spacing: 2,
        component: "label",
        label: "Upload",
        typeFormat: (
          <input
            hidden
            name={i}
            accept="image/bmp, image/jpeg, image/png, .pdf"
            type="file"
            onChange={(e) => handleFileUpload(e, i1, i)}
          />
        ),
      },
      {
        type: "Typography",
        label: lDto.ProposerDetails[i1].documentDetails[i].FileName,
        spacing: 3.9,
        visible: lDto.ProposerDetails[i1].documentDetails[i].FileName !== "",
        sx: { fontSize: "15px", paddingTop: 1 },
      },
      {
        type: "IconButton",
        icon: "close",
        spacing: 2,
        visible: lDto.ProposerDetails[i1].documentDetails[i].FileName !== "",
        onClick: () => onCancelClick(i1, i),
      },
      {
        type: "IconButton",
        icon: "delete",
        color: "primary",
        spacing: 0.1,
        visible: i !== 0,
        onClick: () => handleDocFileDelete(i1, i),
      },
      {
        type: "TypographyVal",
        label: "",
        spacing: 12,
        visible: true,
      }
    );
  });
  return arr;
};
const InsuredDetails = ({ setDto, dto, masters, setMasters }) => {
  const lDto = dto;

  //  const RemoveMultiKYC = (e) => {
  //   // debugger;
  //   lDto.IsMultiKYCApplicable = e.target.value;

  //   if (lDto.IsMultiKYCApplicable === "Yes") {
  //     // lDto.NumberofInsured = 1;
  //     lDto.ProposerDetails = [{ ...ProposerDetails() }];
  //   }

  //   if (lDto.IsMultiKYCApplicable === "No") {
  //     const newarray = lDto.ProposerDetails[0];
  //     lDto.ProposerDetails = [newarray];
  //     lDto.ProposerDetails = [{ ...ProposerDetails() }];
  //   }
  //   // else {
  //   //   lDto.ProposerDetails = [{ ...ProposerDetails() }];
  //   // }

  //   setDto({ ...lDto });
  // };
  // const OnADDMultiKYCDetailsnew = (e) => {
  //   console.log(e, 111111);
  //   if (e.target.value === "") {
  //     const newarray = lDto.ProposerDetails[0];
  //     lDto.ProposerDetails = [newarray];
  //     //   lDto.NumberofInsured = 1;
  //   }
  //   lDto.NumberofInsured = e.target.value;
  //   const arr1 = arrayRange(1, e.target.value - 1, 1);
  //   arr1.forEach(() => {
  //     lDto.ProposerDetails.push({ ...ProposerDetails() });
  //   });

  //   setDto({ ...lDto });
  // };

  // const OnADDMultiKYCDetails = () => {
  //   lDto.ProposerDetails.push({ ...ProposerDetails() });
  //   lDto.NumberofInsured = lDto.ProposerDetails.length;
  //   setDto({ ...lDto });
  // };
  // const RemoveMultiKYCDetails = (i) => {
  //   const arr = lDto.ProposerDetails.filter((x, i1) => i1 !== i);
  //   lDto.ProposerDetails = arr;
  //   // lDto.NumberofInsured = lDto.ProposerDetails.length;
  //   lDto.NumberofInsured = arr.length;

  //   setDto({ ...lDto });
  // };

  const onAddDocument = (i) => {
    lDto.ProposerDetails[i].documentDetails = [
      ...lDto.ProposerDetails[i].documentDetails,
      { ...docDetails() },
    ];

    setDto({ ...lDto });
  };

  const GenderNepali = [
    { mID: 1, mValue: "Male", translation: "पुरुष" },
    { mID: 2, mValue: "Female", translation: "महिला" },
    { mID: 3, mValue: "Others", translation: "अन्य" },
  ];
  const handleGender = (e, a, i) => {
    if (a !== null) {
      lDto.ProposerDetails[i].GenderEnglish = a.mValue;
      lDto.ProposerDetails[i].GenderNepali = a.translation;
    } else {
      lDto.ProposerDetails[i].GenderEnglish = "";
      lDto.ProposerDetails[i].GenderNepali = "";
    }
    setDto({ ...lDto });
  };
  const MaritalStatus = [
    { mID: 1, mValue: "Unmarried", translation: "अविवाहित" },
    { mID: 2, mValue: "Married", translation: "विवाहित" },
    { mID: 3, mValue: "Divorced", translation: "विभाजक" },
    { mID: 4, mValue: "Widow", translation: "विधवा" },
  ];
  const handleMarital = (e, a, i) => {
    if (a !== null) {
      lDto.ProposerDetails[i].MaritalStatusEnglish = a.mValue;
      lDto.ProposerDetails[i].MaritalStatusNepali = a.translation;
    } else {
      lDto.ProposerDetails[i].MaritalStatusEnglish = "";
      lDto.ProposerDetails[i].MaritalStatusNepali = "";
    }
    setDto({ ...lDto });
  };
  const OnInsuredNameEnglish = (e, name, i) => {
    lDto.ProposerDetails[i].PermanentAdrress[name] = e.target.value;
    lDto.ProposerDetails[i][name] = e.target.value;
    const Name = lDto.ProposerDetails[i].InsuredNameEnglish;
    const Address = lDto.ProposerDetails[i].PermanentAdrress.AddressEnglish;
    if (Name !== undefined) {
      lDto.ProposerDetails[i].NameoftheOrganisation = Name;
    }
    if (Address !== undefined) {
      lDto.ProposerDetails[i].OrganizationAddress = Address;
    }
    lDto.ProposerDetails[0].PolicyHolderDetails.PolicyHolderName = "";
    lDto.ProposerDetails[0].PolicyHolderDetails.Address = "";
    setDto({ ...lDto });
  };
  const onCancelClickProfilePicture = async (i) => {
    // lDto.ProposerDetails[i].ProfilePicture = e.target.value;
    const file = lDto.ProposerDetails[i].ProfilePicture;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.ProposerDetails[i].ProfilePicture = "";
        setDto({ ...lDto });
      }
    });
  };

  const OnProfilePicture = async (e, i) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    const fileExtension = file.name.split(".").pop();
    if (fileExtension === "jpeg" || fileExtension === "png") {
      await DocumenUpload(formData);
      lDto.ProposerDetails[i].ProfilePicture = file.name;
      setDto({ ...lDto });
      swal({
        icon: "success",
        text: "Profile picture uploaded successfully",
      });
    } else {
      swal({
        icon: "error",
        text: "Accepts only JPEG or PNG formats",
        confirmButtonColor: "#0079CE",
      });
    }
    const inputElement = document.getElementById("fileInput");
    const file1 = e;
    if (inputElement) {
      inputElement.value = "";
    }
    file1.target.value = "";
  };
  const onDOBselect = (e, d, i) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      lDto.ProposerDetails[i].DoB = "";
      swal2.fire({
        icon: "error",
        text: `Age of the Policy Holder must be above 16 Years.`,
        confirmButtonColor: "#0079CE",
      });
    } else {
      lDto.ProposerDetails[i].DoB = d;
    }
    setDto({ ...lDto });
  };
  const OnInsuredType = (e, a, i) => {
    if (a !== null) {
      lDto.ProposerDetails[i].InsuredType = a.mValue;
    } else {
      lDto.ProposerDetails[i].InsuredType = "";
    }
    lDto.ProposerDetails[i].ProfilePicture = "";
    setDto({ ...lDto });
  };

  const IsPhoneNumber = (number) => {
    const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
    if (number.length === 10) {
      if (mobileRegex.test(number)) return true;
      return "Invalid Phone Number";
    }
    return "Number should be 10 digits";
  };

  const arr = [];
  dto.ProposerDetails.forEach((x, i) => {
    arr.push([
      // {
      //   type: "Button",
      //   label: "Delete",
      //   spacing: 12,
      //   justifyContent: "end",
      //   visible: i !== 0,
      //   onClick: () => RemoveMultiKYCDetails(i),
      // },
      {
        type: "AutoComplete",
        label: "KYC Category",
        visible: true,
        path: `ProposerDetails.${i}.KYCCategory`,
        options: masters.KYCCategory,
        required: true,
        disableOnReset: true,
      },
      {
        type: "AutoComplete",
        label: "Insured Type",
        visible: true,
        path: `ProposerDetails.${i}.InsuredType`,
        options: masters.InsuredType,
        required: true,
        customOnChange: (e, a) => OnInsuredType(e, a, i),
      },
      {
        type: "Input",
        label: "Special Client",
        visible: true,
        path: `ProposerDetails.${i}.SpecialClient`,
        onChangeFuncs: [IsAlphaNumNoSpace],
        disableOnReset: true,
      },
      {
        type: "Input",
        label: "Insured Name English",
        visible: true,
        path: `ProposerDetails.${i}.InsuredNameEnglish`,
        required: true,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "InsuredNameEnglish",
        customOnChange: (e) => OnInsuredNameEnglish(e, "InsuredNameEnglish", i),
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Insured Name Nepali",
        visible: true,
        path: `ProposerDetails.${i}.InsuredNameNepali`,
        // required: true,
        disabled: true,
      },
      {
        type: "Input",
        label: "KYC Classification",
        visible: true,
        path: `ProposerDetails.${i}.KYCClassification`,
        onChangeFuncs: [IsAlphaNumNoSpace],
      },
      {
        type: "AutoComplete",
        label: "KYC Risk Category",
        visible: true,
        path: `ProposerDetails.${i}.KYCRiskCategory`,
        options: masters.KYCRiskCategory,
        required: true,
      },
      {
        type: "AutoComplete",
        label: "Is Beneficiary Owner",
        visible: true,
        path: `ProposerDetails.${i}.IsBeneficiaryOwner`,
        options: masters.IsBeneficiaryOwner,
        disableOnReset: true,
      },
      {
        type: "AutoComplete",
        label: "Occupation",
        visible: true,
        path: `ProposerDetails.${i}.Occuptation`,
        options: masters.Occupation,
        required: true,
      },
      {
        type: "AutoComplete",
        label: "Income Source",
        visible: true,
        path: `ProposerDetails.${i}.IncomeSource`,
        options: masters.IncomeSource,
        required: true,
      },
      {
        type: "Input",
        label: "Contact Person Name",
        visible: true,
        path: `ProposerDetails.${i}.ContactPersonName`,
        onChangeFuncs: [IsAlphaNoSpace],
      },
      {
        type: "Input",
        label: "Email Address",
        visible: true,
        path: `ProposerDetails.${i}.EmailId`,
        onBlurFuncs: [IsEmail],
      },
      {
        type: "Input",
        label: "PAN Number",
        visible: true,
        path: `ProposerDetails.${i}.PANNumber`,
        onChangeFuncs: [IsAlphaNumNoSpace],
        // InputProps: { maxLength: 9 },
        required:
          lDto.ProposerDetails[i].InsuredType !== "Individual" &&
          lDto.ProposerDetails[i].InsuredType !== "Government body",
      },
      {
        type: "Input",
        label: "VAT Number",
        visible: true,
        path: `ProposerDetails.${i}.VATNumber`,
        onChangeFuncs: [IsAlphaNumNoSpace],
        // InputProps: { maxLength: 9 },
        required:
          lDto.ProposerDetails[i].InsuredType !== "Individual" &&
          lDto.ProposerDetails[i].InsuredType !== "Government body",
      },
      {
        type: "Input",
        label: "Registration Number",
        visible: true,
        path: `ProposerDetails.${i}.RegistrationNumber`,
        onChangeFuncs: [IsAlphaNumNoSpace],
      },
      {
        type: "MDDatePicker",
        label: "Registration Date",
        visible: true,
        path: `ProposerDetails.${i}.RegistrationDate`,
      },
      {
        type: "MDDatePicker",
        label: "Registration Close Date",
        visible: true,
        path: `ProposerDetails.${i}.RegisterationCloseDate`,
        // disabled: lDto.ProposerDetails[i].RegistrationDate === "",
        minDate: new Date(lDto.ProposerDetails[i].RegistrationDate),
      },
      {
        type: "Input",
        label: "Registration Office",
        visible: true,
        path: `ProposerDetails.${i}.RegistrationOffice`,
        onChangeFuncs: [IsAlphaNumNoSpace],
      },
      {
        type: "Input",
        label: "Reference Insured Name",
        visible: true,
        path: `ProposerDetails.${i}.ReferenceInsuredName`,
        onChangeFuncs: [IsAlphaNumNoSpace],
      },
      {
        type: "Input",
        label: "Phone Number",
        visible: true,
        path: `ProposerDetails.${i}.PhoneNumber`,
        onChangeFuncs: [IsNumaricSpecialNoSpace],
      },
      {
        type: "Input",
        label: "Mobile Number",
        visible: true,
        path: `ProposerDetails.${i}.MobileNo`,
        onChangeFuncs: [IsNumeric],
        onBlurFuncs: [IsMobileNumber],
        InputProps: { maxLength: 10 },
        required: true,
      },
      {
        type: "Input",
        label: "TDS Category",
        visible: true,
        path: `ProposerDetails.${i}.TDSCategory`,
        onChangeFuncs: [IsAlphaNumNoSpace],
      },
      {
        type: "AutoComplete",
        label: "Country",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.Country`,
        options: masters.Country,
        disableOnReset: true,
        disabled: true,
        required: true,
      },
      {
        type: "AutoComplete",
        label: "Province/State",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.ProvinceState`,
        options: lDto.ProposerDetails[i].PermanentAdrress.Country !== "" ? masters.State : [],
        required: true,
        customOnChange: (e, a) =>
          OnPlaceSelect(e, a, "State2", i, dto, setDto, masters, setMasters),
      },
      {
        type: "AutoComplete",
        label: "District",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.District`,
        options:
          lDto.ProposerDetails[i].PermanentAdrress.ProvinceState !== "" ? masters.District2 : [],
        required: true,
        customOnChange: (e, a) =>
          OnPlaceSelect(e, a, "District2", i, dto, setDto, masters, setMasters),
      },
      {
        type: "AutoComplete",
        label: "Municipality",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.Municipality`,
        options:
          lDto.ProposerDetails[i].PermanentAdrress.District !== "" ? masters.Municipality2 : [],
        required: true,
        // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality2"),
      },
      {
        type: "AutoComplete",
        label: "Ward Number",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.WardNumber`,
        options: masters.WardNumber,
      },
      {
        type: "Input",
        label: "Address(English) ",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
        onChangeFuncs: [IsFreetextNoSpace],
        required: true,
        name: "PermanentAdrressEnglish",
        customOnChange: (e) => OnInsuredNameEnglish(e, "AddressEnglish", i),
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Address(Nepali) ",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
        onChangeFuncs: [IsFreetextNoSpace],
        // required: true,
        disabled: true,
      },
      {
        type: "Input",
        label: "Area",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.Area`,
        onChangeFuncs: [IsAlphaNoSpace],
      },
      {
        type: "Input",
        label: "Tole/Street Name",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.ToleStreetName`,
        onChangeFuncs: [IsAlphaNumNoSpace],
      },
      {
        type: "Input",
        label: "House Number",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.HouseNumber`,
        onChangeFuncs: [IsFreetextNoSpace],
      },
      {
        type: "Input",
        label: "Plot Number",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.PlotNumber`,
        onChangeFuncs: [IsNumeric],
      },
      {
        type: "Input",
        label: "Temporary Address-English ",
        visible: true,
        path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,
        onChangeFuncs: [IsFreetextNoSpace],
        name: "TemporaryAddressEnglish",
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Temporary Address-Nepali ",
        visible: true,
        path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
        disabled: true,
      },
      { type: "Typography", label: "Document Section", visible: true, spacing: 12 },
      {
        type: "Button",
        label: "Add Document",
        visible: true,
        startIcon: <Icon>add</Icon>,
        variant: "outlined",
        onClick: () => onAddDocument(i),
        spacing: 12,
      },
      ...spreadDocumentDetails({ proposerIndex: i, dto, setDto }),
      {
        type: "Accordions",
        //   visible: lDto.ProposerDetails[i].InsuredType !== "",
        spacing: 12,
        accordionList: [
          {
            id: 1,
            label: lDto.ProposerDetails[i].InsuredType,
            visible:
              lDto.FinancingType !== "" && lDto.ProposerDetails[i].InsuredType === "Individual",
          },
          {
            id: 2,
            label: lDto.ProposerDetails[i].InsuredType,
            visible:
              lDto.FinancingType !== "" &&
              lDto.ProposerDetails[i].InsuredType !== "" &&
              lDto.ProposerDetails[i].InsuredType !== "Individual",
          },
        ],
      },

      //   ffffffffffffff
      {
        type: "Typography",
        label: "Upload Profile Picture",
        visible: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Button",
        visible: true,
        component: "label",
        label: "Upload",
        spacing: 2,
        accordionId: 1,
        typeFormat: (
          <input
            hidden
            accept="image/bmp, image/jpeg, image/png,"
            type="file"
            onChange={(e) => OnProfilePicture(e, i)}
          />
        ),
      },
      {
        type: "Typography",
        label: lDto.ProposerDetails[i].ProfilePicture,
        visible: true,
        accordionId: 1,
        spacing: 3.9,
        sx: { fontSize: "15px", paddingTop: 1 },
      },
      {
        type: "IconButton",
        icon: "close",
        // spacing: 2,
        visible: lDto.ProposerDetails[i].ProfilePicture !== "",
        onClick: () => onCancelClickProfilePicture(i),
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Typography",
        label: "",
        visible: true,
        spacing: 12,
        accordionId: 1,
      },
      {
        type: "AutoComplete",
        label: "Gender (English)",
        visible: true,
        path: `ProposerDetails.${i}.GenderEnglish`,
        // options: masters.Gender,
        options: GenderNepali,
        required: true,
        customOnChange: (e, a) => handleGender(e, a, i),
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Gender (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.GenderNepali`,
        required: true,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "AutoComplete",
        label: "Marital status (English)",
        visible: true,
        path: `ProposerDetails.${i}.MaritalStatusEnglish`,
        // options: masters.MaritalStatus,
        options: MaritalStatus,
        customOnChange: (e, a) => handleMarital(e, a, i),
        required: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Marital status (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.MaritalStatusNepali`,
        required: true,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Husband's Name(English)",
        visible: true,
        path: `ProposerDetails.${i}.HusbandNameEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "IndividualHusbandNameEnglish",
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Husband's Name(Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.HusbandNameNepali`,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Wife Name (English)",
        visible: true,
        path: `ProposerDetails.${i}.WifeNameEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "IndividualWifeNameEnglish",
        accordionId: 1,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Wife Name (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.WifeNameNepali`,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Father Name (English)",
        visible: true,
        path: `ProposerDetails.${i}.FatherNameEnglish`,
        required: true,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "IndividualFatherNameEnglish",
        accordionId: 1,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Father Name (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.FatherNameNepali`,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "GrandFather Name (English)",
        visible: true,
        path: `ProposerDetails.${i}.GrandfatherNameEnglish`,
        required: true,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "IndividualGrandfatherNameEnglish",
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "GrandFather Name (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.GrandfatherNameNepali`,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Nationality (English)",
        visible: true,
        path: `ProposerDetails.${i}.NationalityEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Permanent Address (English)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
        onChangeFuncs: [IsFreetextNoSpace],
        name: "IndividualPermanentAddressEnglish",
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Permanent Address (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Town (English)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.TownEnglish`,
        onChangeFuncs: [IsAlphaNumNoSpace],
        name: "IndividualTownEnglish",
        accordionId: 1,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Town (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.TownNepali`,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "City (English)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.CityEnglish`,
        onChangeFuncs: [IsAlphaNumNoSpace],
        name: "IndividualCityEnglish",
        accordionId: 1,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "City (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.CityNepali`,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Temporary Address (English)",
        visible: true,
        path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,
        onChangeFuncs: [IsFreetextNoSpace],
        name: "IndividualTemporaryAddressEnglish",
        accordionId: 1,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Temporary Address (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Residence(English)",
        visible: true,
        path: `ProposerDetails.${i}.CommunicationAddress.ResidenceEnglish`,
        onChangeFuncs: [IsAlphaNumNoSpace],
        name: "IndividualResidenceEnglish",
        accordionId: 1,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Residence(Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.CommunicationAddress.ResidenceNepali`,
        disabled: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Citizenship Number",
        visible: true,
        path: `ProposerDetails.${i}.CitizenshipNumber`,
        required: true,
        accordionId: 1,
        spacing: 3,
        onChangeFuncs: [IsAlphaNumNoSpace],
      },
      {
        type: "MDDatePicker",
        label: "Citizenship Issued Date",
        visible: true,
        path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
        required: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "AutoComplete",
        label: "Citizenship Issue District",
        visible: true,
        path: `ProposerDetails.${i}.IssueDistrict`,
        options: masters.District,
        required: true,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "MDDatePicker",
        label: "Date Of Birth",
        visible: true,
        path: `ProposerDetails.${i}.DoB`,
        required: true,
        dateFormat: "m-d-Y",
        maxDate: new Date(),
        accordionId: 1,
        spacing: 3,
        customOnChange: (e, d) => onDOBselect(e, d, i),
      },
      {
        type: "Input",
        label: "License Number",
        visible: true,
        spacing: 3,
        path: `ProposerDetails.${i}.LicenseNumber`,
        onChangeFuncs: [IsFreetextNoSpace],
        accordionId: 1,
      },
      {
        type: "RadioGroup",
        visible: true,
        radioLabel: { label: "Passport Issued By", labelVisible: true },
        radioList: [
          { value: "India", label: "India" },
          { value: "Nepal", label: "Nepal" },
        ],
        path: `ProposerDetails.${i}.PassportIssuedBy`,
        spacing: 3.2,
        accordionId: 1,
      },

      {
        type: "Input",
        label: "Passport Number",
        visible: true,
        path: `ProposerDetails.${i}.PassportNumber`,
        InputProps: { maxLength: 8 },
        onChangeFuncs: [IsAlphaNumNoSpace],
        accordionId: 1,
        spacing: 2.8,
      },
      {
        type: "MDDatePicker",
        label: "Passport Issued Date",
        visible: true,
        path: `ProposerDetails.${i}.PassportIssuedDate`,
        accordionId: 1,
        spacing: 3,
      },
      {
        type: "MDDatePicker",
        label: "Passport Expiry Date",
        visible: true,
        path: `ProposerDetails.${i}.PassportExpiryDate`,
        minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate).setDate(
          new Date(lDto.ProposerDetails[i].PassportIssuedDate).getDate() + 1
        ),
        accordionId: 1,
        disabled: lDto.ProposerDetails[i].PassportIssuedDate === "",
        spacing: 3,
      },

      //   fffffffffffffffffff
      {
        type: "Input",
        label: "Name of the Organization",
        visible: true,
        path: `ProposerDetails.${i}.NameoftheOrganisation`,
        required: true,
        disabled: true,
        onChangeFuncs: [IsAlphaNumNoSpace],
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Address of Organization",
        visible: true,
        path: `ProposerDetails.${i}.OrganizationAddress`,
        required: true,
        onChangeFuncs: [IsFreetextNoSpace],
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Organization Phone Number",
        visible: true,
        path: `ProposerDetails.${i}.OrganizationContactNo`,
        onBlurFuncs: [IsPhoneNumber],
        onChangeFuncs: [IsNumeric],
        accordionId: 2,
        InputProps: { maxLength: 10 },
        spacing: 3,
      },
      {
        type: "Typography",
        label: "Member Details",
        visible: true,
        spacing: 12,
        accordionId: 2,
      },
      {
        type: "AutoComplete",
        label: "Member Type",
        visible: true,
        path: `ProposerDetails.${i}.MemberType`,
        options: masters.MemberType,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Role",
        visible: true,
        path: `ProposerDetails.${i}.Role`,
        onChangeFuncs: [IsFreetextNoSpace],
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Member Name (English)",
        visible: true,
        path: `ProposerDetails.${i}.MemberNameEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "MemberNameEnglish",
        accordionId: 2,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Member Name (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.MemberNameNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Designation (English)",
        visible: true,
        path: `ProposerDetails.${i}.DesignationEnglish`,
        onChangeFuncs: [IsAlphaNumNoSpace],
        name: "DesignationEnglish",
        accordionId: 2,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Designation (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.DesignationNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "AutoComplete",
        label: "Gender (English)",
        visible: true,
        path: `ProposerDetails.${i}.GenderEnglish`,
        options: GenderNepali,
        customOnChange: (e, a) => handleGender(e, a, i),
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Gender (Nepali)",
        visible: true,
        disabled: true,
        path: `ProposerDetails.${i}.GenderNepali`,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "AutoComplete",
        label: "Marital Status (English)",
        visible: true,
        path: `ProposerDetails.${i}.MaritalStatusEnglish`,
        options: MaritalStatus,
        customOnChange: (e, a) => handleMarital(e, a, i),
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Marital Status (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.MaritalStatusNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Husband's Name(English)",
        visible: true,
        path: `ProposerDetails.${i}.HusbandNameEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "HusbandNameEnglish",
        accordionId: 2,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Husband's Name(Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.HusbandNameNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Wife Name (English)",
        visible: true,
        path: `ProposerDetails.${i}.WifeNameEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "WifeNameEnglish",
        accordionId: 2,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Wife Name (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.WifeNameNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Father Name (English)",
        visible: true,
        path: `ProposerDetails.${i}.FatherNameEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "FatherNameEnglish",
        accordionId: 2,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Father Name (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.FatherNameNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "GrandFather Name (English)",
        visible: true,
        path: `ProposerDetails.${i}.GrandfatherNameEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "GrandFatherNameEnglish",
        accordionId: 2,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "GrandFather Name (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.GrandfatherNameNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Nationality (English)",
        visible: true,
        path: `ProposerDetails.${i}.NationalityEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Permanent Address (English)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
        onChangeFuncs: [IsFreetextNoSpace],
        name: "AddressEnglish111",
        accordionId: 2,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Permanent Address (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Town (English)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.TownEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "TownEnglish1111",
        accordionId: 2,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Town (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.TownNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "City (English)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.CityEnglish`,
        onChangeFuncs: [IsAlphaNoSpace],
        name: "CityEnglish11111",
        accordionId: 2,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "City (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.PermanentAdrress.CityNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Temporary Address (English)",
        visible: true,
        path: `ProposerDetails.${i}.CommunicationAddress.TempAddresEnglish`,
        onChangeFuncs: [IsFreetextNoSpace],
        name: "TempAddresEnglish",
        accordionId: 2,
        spacing: 3,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Temporary Address (Nepali)",
        visible: true,
        path: `ProposerDetails.${i}.CommunicationAddress.TempAddresNepali`,
        disabled: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Input",
        label: "Identification Type",
        visible: true,
        path: `ProposerDetails.${i}.IdentificationType`,
        onChangeFuncs: [IsAlphaNoSpace],
        accordionId: 2,
        spacing: 3,
      },

      {
        type: "Input",
        label: "Citizenship Number",
        visible: true,
        path: `ProposerDetails.${i}.CitizenshipNumber`,
        onChangeFuncs: [IsAlphaNumNoSpace],
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "MDDatePicker",
        label: "Citizenship Issued Date",
        visible: true,
        path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "AutoComplete",
        label: "Citizenship Issue District",
        visible: true,
        path: `ProposerDetails.${i}.IssueDistrict`,
        options: masters.District,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "MDDatePicker",
        label: "Date Of Birth",
        visible: true,
        path: `ProposerDetails.${i}.DoB`,
        dateFormat: "m-d-Y",
        maxDate: new Date(),
        accordionId: 2,
        spacing: 3,
        customOnChange: (e, d) => onDOBselect(e, d, i),
      },
      {
        type: "RadioGroup",
        visible: true,
        radioLabel: { label: "Passport Issued By", labelVisible: true },
        radioList: [
          { value: "India", label: "India" },
          { value: "Nepal", label: "Nepal" },
        ],
        path: `ProposerDetails.${i}.PassportIssuedBy`,
        spacing: 3.2,
        accordionId: 2,
      },
      {
        type: "Input",
        label: "Passport Number",
        visible: true,
        path: `ProposerDetails.${i}.PassportNumber`,
        onChangeFuncs: [IsAlphaNumNoSpace],
        InputProps: { maxLength: 9 },
        accordionId: 2,
        spacing: 2.8,
      },
      {
        type: "MDDatePicker",
        label: "Passport Issued Date",
        visible: true,
        path: `ProposerDetails.${i}.PassportIssuedDate`,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "MDDatePicker",
        label: "Passport Expiry Date",
        visible: true,
        path: `ProposerDetails.${i}.PassportExpiryDate`,
        minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate).setDate(
          new Date(lDto.ProposerDetails[i].PassportIssuedDate).getDate() + 1
        ),
        accordionId: 2,
        // disabled: lDto.ProposerDetails[i].PassportIssuedDate === "",
        spacing: 3,
      },

      {
        type: "Input",
        label: "License Number",
        visible: true,
        spacing: 3,
        path: `ProposerDetails.${i}.LicenseNumber`,
        onChangeFuncs: [IsFreetextNoSpace],
        accordionId: 2,
      },
      {
        type: "AutoComplete",
        label: "Status",
        visible: true,
        path: `ProposerDetails.${i}.Status`,
        options: masters.Status,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "MDDatePicker",
        label: "Appoint Date",
        visible: true,
        path: `ProposerDetails.${i}.AppointDate`,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Typography",
        label: "",
        visible: true,
        spacing: 12,
        accordionId: 2,
      },
      {
        type: "Typography",
        label: "Upload Profile Picture",
        visible: true,
        accordionId: 2,
        spacing: 3,
      },
      {
        type: "Button",
        visible: true,
        component: "label",
        label: "Upload",
        spacing: 2,
        accordionId: 2,
        typeFormat: (
          <input
            hidden
            accept="image/bmp, image/jpeg, image/png,"
            type="file"
            onChange={(e) => OnProfilePicture(e, i)}
          />
        ),
      },
      {
        type: "Typography",
        label: lDto.ProposerDetails[i].ProfilePicture,
        visible: true,
        accordionId: 2,
        spacing: 3.9,
        sx: { fontSize: "15px", paddingTop: 1 },
      },
      {
        type: "IconButton",
        icon: "close",
        accordionId: 2,
        spacing: 3,
        visible: lDto.ProposerDetails[i].ProfilePicture !== "",
        onClick: () => onCancelClickProfilePicture(i),
      },
    ]);
  });
  return arr;
};
const CustomerDetailsControls = ({ dto, setDto }) => {
  const lDto = dto;
  const OnFinancingDetails = (e) => {
    if (e != null) {
      lDto.FinancingType = e.target.value;
    } else {
      lDto.FinancingType = "";
    }
    lDto.PolicyRiskType = "";
    lDto.PolicyRiskCategory = "";
    // lDto.Bankdetails = { ...Bankdetails() };
    // lDto.ProposerDetails = [{ ...ProposerDetails() }];
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    setDto({ ...lDto });
  };

  return [
    {
      type: "MDDatePicker",
      visible: true,
      label: "Policy Start Date",
      path: "PolicyStartDate",
      InputProps: { disabled: true },
      disableOnReset: true,
      disabled: true,
      // dateFormat: "m/d/Y",
      required: true,
    },
    {
      type: "MDDatePicker",
      visible: true,
      label: "Policy End Date",
      path: "PolicyEndDate",
      // dateFormat: "m/d/Y",
      disabled: true,
      disableOnReset: true,
      InputProps: { disabled: true },
      required: true,
    },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { label: "Financing Details", labelVisible: true },
      radioList: [
        { value: "Direct", label: "Direct" },
        { value: "Bank/Financial Institution", label: "Bank/Financial Institution" },
      ],
      path: "FinancingType",
      spacing: 12,
      required: true,
      customOnChange: (e) => OnFinancingDetails(e),
    },
  ];
};
const BankFinancialInstitutionDetailsControls = ({ dto, setDto, masters, setMasters }) => {
  const lDto = dto;
  const masters1 = masters;

  const handleBankCategory = async (e, a, key) => {
    // console.log("aaaaa", a);
    if (key === "BankCategory") {
      if (a !== null) {
        lDto.Bankdetails.BankCategory = a.mValue;
        const res = await GetProdPartnermasterData("BankDetails", {
          BankFinancialInstitution: a.fieldName,
        });
        masters1.BankorFinancialInstituionNameinEnglish = res.data;
        masters1.BranchMasters = [];
        lDto.Bankdetails.BankCategorylabel = a.fieldName;
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.AddressNepali = "";
        lDto.Bankdetails.BranchDetails.forEach((x, i) => {
          lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
          lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
          lDto.Bankdetails.BranchDetails[i].WardNumber = "";
          lDto.Bankdetails.BranchDetails[i].Municipality = "";
          lDto.Bankdetails.BranchDetails[i].District = "";
          lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
          lDto.Bankdetails.BranchDetails[i].BranchName = "";
        });
        setDto({ ...lDto });
      } else {
        // masters1.BankorFinancialInstituionNameinEnglish = [];
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.BankCategory = "";
        lDto.Bankdetails.BankCategorylabel = "";
        lDto.Bankdetails.AddressNepali = "";
        setDto({ ...lDto });
      }
    }
    if (key === "BankorFinancial") {
      if (a !== null) {
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = a.mValue;
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.mValue }],
          };
          const res = await Transliteration(obj);
          lDto.Bankdetails.BankorFinancialInstituionNameinNepali = res[0].text;
        }
        lDto.Bankdetails.Country = a.Country;
        lDto.Bankdetails.ProvinceorState = a.Province;
        lDto.Bankdetails.Municipality = a.Municipality;
        lDto.Bankdetails.District = a.District;
        lDto.Bankdetails.AddressEnglish = a.Address;
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.Address }],
          };
          const res = await Transliteration(obj);
          lDto.Bankdetails.AddressNepali = res[0].text;
        }
        setDto({ ...lDto });
        const res = await GetProdPartnermasterData("BranchMasters", {
          BankFinancialInstitution: lDto.Bankdetails.BankCategorylabel,
          Bankname: a.mValue,
        });
        masters1.BranchMasters = res.data;
        setDto({ ...lDto });
      } else {
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.AddressNepali = "";
        setDto({ ...lDto });
        masters1.BranchMasters = [];
      }
      setMasters({ ...masters1 });
    }
  };

  const OnBankNonBank = (e, a) => {
    if (a !== null) {
      lDto.Bankdetails.BankorNonBank = a.mValue;
    } else {
      lDto.Bankdetails.BankorNonBank = "";
    }
    lDto.Bankdetails = {
      ...lDto.Bankdetails,
      BankCategory: "",
      BankorFinancialInstituionNameinEnglish: "",
      BankorFinancialInstituionNameinNepali: "",
      ProvinceorState: "",
      District: "",
      Municipality: "",
      WardNumber: "",
      AddressEnglish: "",
      AddressNepali: "",
    };
    setDto({ ...lDto });
  };

  return [
    {
      type: "AutoComplete",
      label: "Bank/Non-Bank",
      visible: true,
      path: "Bankdetails.BankorNonBank",
      options: masters.BankNonBank,
      required: true,
      customOnChange: (e, a) => OnBankNonBank(e, a),
    },
    {
      type: "AutoComplete",
      label: "Bank Category",
      visible: true,
      path: "Bankdetails.BankCategory",
      options: masters.BankCategory.filter(
        (x) =>
          (lDto.Bankdetails.BankorNonBank === "Bank" && x.description !== "Non-Bank") ||
          (lDto.Bankdetails.BankorNonBank === "Non-Bank" && x.description === "Non-Bank")
      ),
      required: true,
      customOnChange: (e, a) => handleBankCategory(e, a, "BankCategory"),
    },
    {
      type: "AutoComplete",
      label: "Bank/Financial Institution Name in English",
      visible: true,
      path: "Bankdetails.BankorFinancialInstituionNameinEnglish",
      onChangeFuncs: [IsAlphaNumNoSpace],
      options:
        lDto.Bankdetails.BankCategory !== "" ? masters.BankorFinancialInstituionNameinEnglish : [],
      required: true,
      // name: "BankNameinEnglish",
      // customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
      customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
    },
    {
      type: "Input",
      label: "Bank/Financial Institution Name in Nepali",
      visible: true,
      path: "Bankdetails.BankorFinancialInstituionNameinNepali",
      // onChangeFuncs: [IsFreetextNoSpace],
      // required: true,
      disabled: true,
    },
    {
      type: "Input",
      label: "Bank Code",
      visible: true,
      path: "Bankdetails.BankCode",
      onChangeFuncs: [IsFreetextNoSpace],
    },
    {
      type: "Input",
      label: "Short Code",
      visible: true,
      path: "Bankdetails.ShortCode",
      onChangeFuncs: [IsFreetextNoSpace],
    },
    {
      type: "Input",
      label: "Swift/Pseudo Code",
      visible: true,
      path: "Bankdetails.SwiftPseudoCode",
      onChangeFuncs: [IsAlphaNumNoSpace],
    },
    {
      type: "Input",
      label: "Contact Person 1",
      visible: true,
      path: "Bankdetails.ContactPerson1",
      onChangeFuncs: [IsAlphaNoSpace],
    },
    {
      type: "Input",
      label: "Contact Person 2",
      visible: true,
      path: "Bankdetails.ContactPerson2",
      onChangeFuncs: [IsAlphaNoSpace],
    },
    {
      type: "Input",
      label: "Contact Person 3",
      visible: true,
      path: "Bankdetails.ContactPerson3",
      onChangeFuncs: [IsAlphaNoSpace],
    },
    {
      type: "Input",
      label: "Phone Number",
      visible: true,
      path: "Bankdetails.PhoneNumber",
      onChangeFuncs: [IsNumaricSpecialNoSpace],
    },
    {
      type: "Input",
      label: "Mobile Number",
      visible: true,
      path: "Bankdetails.MobileNumber",
      onChangeFuncs: [IsNumeric],
      onBlurFuncs: [IsMobileNumber],
      InputProps: { maxLength: 10 },
    },
    {
      type: "Input",
      label: "Fax Number",
      visible: true,
      path: "Bankdetails.FaxNumber",
      onChangeFuncs: [IsNumaricSpecialNoSpace],
    },
    {
      type: "Input",
      label: "Website",
      visible: true,
      path: "Bankdetails.Website",
      onChangeFuncs: [IsFreetextNoSpace],
    },
    {
      type: "Input",
      label: "Email",
      visible: true,
      path: "Bankdetails.Email",
      onBlurFuncs: [IsEmail],
    },
    {
      type: "Input",
      label: "PAN Number",
      visible: true,
      path: "Bankdetails.PANNumber",
      onChangeFuncs: [IsAlphaNumNoSpace],
      // InputProps: { maxLength: 9 },
    },
    {
      type: "Input",
      label: "Bank Agent Code",
      visible: true,
      path: "Bankdetails.BankAgentCode",
      onChangeFuncs: [IsFreetextNoSpace],
    },
    {
      type: "Input",
      label: "CEO Name",
      visible: true,
      path: "Bankdetails.CEO",
      onChangeFuncs: [IsAlphaNoSpace],
    },
    {
      type: "AutoComplete",
      label: "Country",
      visible: true,
      path: "Bankdetails.Country",
      options: masters.Country,
      disableOnReset: true,
      disabled: true,
      required: true,
    },
    {
      type: "AutoComplete",
      label: "Province/State",
      visible: true,
      path: "Bankdetails.ProvinceorState",
      // options: lDto.Bankdetails.Country !== "" ? masters.State : [],
      required: true,
      disabled: true,
      // customOnChange: (e, a) => OnPlaceSelect(e, a, "State1"),
    },
    {
      type: "AutoComplete",
      label: "District",
      visible: true,
      path: "Bankdetails.District",
      // options: lDto.Bankdetails.ProvinceorState !== "" ? masters.District1 : [],
      required: true,
      disabled: true,
      // customOnChange: (e, a) => OnPlaceSelect(e, a, "District1"),
    },
    {
      type: "AutoComplete",
      label: "Municipality",
      visible: true,
      disabled: true,
      path: "Bankdetails.Municipality",
      // options: lDto.Bankdetails.District !== "" ? masters.Municipality1 : [],
      // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality1"),
    },
    {
      type: "AutoComplete",
      label: "Ward Number",
      visible: true,
      path: "Bankdetails.WardNumber",
      options: masters.WardNumber,
    },
    {
      type: "Input",
      label: "Address(English)",
      visible: true,
      path: "Bankdetails.AddressEnglish",
      onChangeFuncs: [IsFreetextNoSpace],
      name: "BankAddressEnglish",
      disabled: true,
      customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, dto, setDto),
    },
    {
      type: "Input",
      label: "Address(Nepali)",
      visible: true,
      path: "Bankdetails.AddressNepali",
      // required: true,
      disabled: true,
    },
    {
      type: "Input",
      label: "Area",
      visible: true,
      path: "Bankdetails.Area",
      onChangeFuncs: [IsAlphaNoSpace],
    },
    {
      type: "Input",
      label: "Tole/Street Name",
      visible: true,
      path: "Bankdetails.ToleStreetName",
      onChangeFuncs: [IsAlphaNumNoSpace],
    },
    {
      type: "Input",
      label: "House Number",
      visible: true,
      path: "Bankdetails.HouseNumber",
      onChangeFuncs: [IsFreetextNoSpace],
    },
    {
      type: "Input",
      label: "Plot Number",
      visible: true,
      path: "Bankdetails.PlotNumber",
      onChangeFuncs: [IsNumeric],
    },
  ];
};
const BranchDetailsControls = ({ dto, setDto, masters, setMasters }) => {
  const lDto = dto;
  const masters1 = masters;
  const onAddBranchDetails = () => {
    lDto.Bankdetails.BranchDetails.push({ ...BranchDetails() });
    masters1.placeMasters.push({ district: [], municipality: [] });
    setDto({ ...lDto });
  };
  const handleBranchName = async (e, a, i) => {
    if (a !== null) {
      lDto.Bankdetails.BranchDetails[i].BranchName = a.mValue;
      lDto.Bankdetails.BranchDetails[i].Country = a.Country;
      lDto.Bankdetails.BranchDetails[i].ProvinceState = a.Province;
      lDto.Bankdetails.BranchDetails[i].District = a.District;
      lDto.Bankdetails.BranchDetails[i].Municipality = a.Municipality;
      lDto.Bankdetails.BranchDetails[i].AddressEnglish = a.mValue;
      lDto.Bankdetails.BranchDetails[i].WardNumber = a.WardNo;
      if (process.env.NODE_ENV === "production") {
        const obj = {
          textList: [{ Text: a.mValue }],
        };
        const res = await Transliteration(obj);
        lDto.Bankdetails.BranchDetails[i].AddressNepali = res[0].text;
      }
    } else {
      lDto.Bankdetails.BranchDetails[i].BranchName = "";
      lDto.Bankdetails.BranchDetails[i].Country = "";
      lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
      lDto.Bankdetails.BranchDetails[i].District = "";
      lDto.Bankdetails.BranchDetails[i].Municipality = "";
      lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
      lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
      lDto.Bankdetails.BranchDetails[i].WardNumber = "";
    }
    setDto({ ...lDto });
  };
  const RemoveBranchDetails = (i) => {
    const arr = dto.Bankdetails.BranchDetails.filter((x, i1) => i1 !== i);
    lDto.Bankdetails.BranchDetails = arr;
    setDto({ ...lDto });
  };
  const arr = [];
  dto.Bankdetails.BranchDetails.forEach((x, i) => {
    arr.push([
      {
        type: "Button",
        label: "ADD BRANCH DETAILS",
        // visible: flag.ExistingDetails1,
        visible: i === 0,
        // startIcon: <AddIcon />,
        variant: "outlined",
        component: "label",
        onClick: onAddBranchDetails,
        spacing: 12,
      },
      {
        type: "Button",
        label: "Delete",
        spacing: 12,
        // startIcon: <DeleteIcon />,
        justifyContent: "end",
        visible: i !== 0,
        onClick: () => RemoveBranchDetails(i),
      },
      {
        type: "AutoComplete",
        label: "Branch Name",
        visible: masters.BranchMasters.length > 0,
        options: masters.BranchMasters,
        // visible: true,
        path: `Bankdetails.BranchDetails.${i}.BranchName`,
        // onChangeFuncs: [IsAlphaNoSpace],
        required: true,
        customOnChange: (e, a) => handleBranchName(e, a, i),
      },
      {
        type: "Input",
        label: "Country",
        // visible: true,
        visible: masters.BranchMasters.length > 0,
        path: `Bankdetails.BranchDetails.${i}.Country`,
        // options: masters.Country,
        disableOnReset: true,
        disabled: true,
        required: true,
      },
      {
        type: "Input",
        label: "Province/State",
        // visible: true,
        visible: masters.BranchMasters.length > 0,
        path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
        options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
        required: true,
        disabled: true,
        // customOnChange: (e, a) => OnPlaceSelect(e, a, "State4", i),
      },
      {
        type: "Input",
        label: "District",
        // visible: true,
        visible: masters.BranchMasters.length > 0,
        path: `Bankdetails.BranchDetails.${i}.District`,
        // options:
        //   lDto.Bankdetails.BranchDetails[i].ProvinceState !== ""
        //     ? masters.placeMasters[i].district
        //     : [],
        required: true,
        disabled: true,

        // customOnChange: (e, a) => OnPlaceSelect(e, a, "District4", i),
      },
      {
        type: "Input",
        label: "Municipality",
        // visible: true,
        visible: masters.BranchMasters.length > 0,
        path: `Bankdetails.BranchDetails.${i}.Municipality`,
        disabled: true,
        // options:
        //   lDto.Bankdetails.BranchDetails[i].District !== ""
        //     ? masters.placeMasters[i].municipality
        //     : [],
        // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality4", i),
      },
      {
        type: "Input",
        label: "Ward Number",
        // visible: true,
        visible: masters.BranchMasters.length > 0,
        path: `Bankdetails.BranchDetails.${i}.WardNumber`,
        // options: masters.WardNumber,
        disabled: true,
      },
      {
        type: "Input",
        label: "Address(English)",
        visible: masters.BranchMasters.length > 0,
        path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
        name: "BranchNameinEnglish",
        disabled: true,
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
      },
      {
        type: "Input",
        label: "Branch Name",
        visible: masters.BranchMasters.length === undefined,
        required: true,
        path: `Bankdetails.BranchDetails.${i}.BranchName`,
      },
      {
        type: "AutoComplete",
        label: "Country",
        // visible: true,
        visible: masters.BranchMasters.length === undefined,
        path: `Bankdetails.BranchDetails.${i}.Country`,
        options: masters.Country,
        disableOnReset: true,
        disabled: true,
        required: true,
      },
      {
        type: "AutoComplete",
        label: "Province/State",
        // visible: true,
        visible: masters.BranchMasters.length === undefined,
        path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
        options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
        required: true,
        customOnChange: (e, a) =>
          OnPlaceSelect(e, a, "State4", i, dto, setDto, masters, setMasters),
      },
      {
        type: "AutoComplete",
        label: "District",
        // visible: true,
        visible: masters.BranchMasters.length === undefined,
        path: `Bankdetails.BranchDetails.${i}.District`,
        options:
          lDto.Bankdetails.BranchDetails[i].ProvinceState !== ""
            ? masters.placeMasters[i].district
            : [],
        required: true,
        customOnChange: (e, a) =>
          OnPlaceSelect(e, a, "District4", i, dto, setDto, masters, setMasters),
      },
      {
        type: "AutoComplete",
        label: "Municipality",
        // visible: true,
        visible: masters.BranchMasters.length === undefined,
        path: `Bankdetails.BranchDetails.${i}.Municipality`,
        options:
          lDto.Bankdetails.BranchDetails[i].District !== ""
            ? masters.placeMasters[i].municipality
            : [],
        // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality4", i),
      },
      {
        type: "AutoComplete",
        label: "Ward Number",
        // visible: true,
        visible: masters.BranchMasters.length === undefined,
        path: `Bankdetails.BranchDetails.${i}.WardNumber`,
        options: masters.WardNumber,
      },
      {
        type: "Input",
        label: "Address(English)",
        visible: masters.BranchMasters.length === undefined,
        path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
        onChangeFuncs: [IsFreetextNoSpace],
        name: "BranchNameinEnglish",
        customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i, dto, setDto),
        onBlurFuncs: [IsFreetextNoSpace],
      },
      {
        type: "Input",
        label: "Address(Nepali)",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.AddressNepali`,
        // required: true,
        disabled: true,
      },
      {
        type: "Input",
        label: "Area",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.Area`,
        onChangeFuncs: [IsAlphaNoSpace],
      },
      {
        type: "Input",
        label: "Tole/Street Name",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.ToleStreetName`,
        onChangeFuncs: [IsAlphaNumNoSpace],
      },
      {
        type: "Input",
        label: "House Number",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.HouseNumber`,
        onChangeFuncs: [IsFreetextNoSpace],
      },
      {
        type: "Input",
        label: "Plot Number",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.PlotNumber`,
        onChangeFuncs: [IsFreetextNoSpace],
      },
      {
        type: "Input",
        label: "Contact Person 1",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.ContactPerson1`,
        onChangeFuncs: [IsAlphaNoSpace],
      },
      {
        type: "Input",
        label: "Contact Person 2",
        visible: true,
        onChangeFuncs: [IsAlphaNoSpace],
        path: `Bankdetails.BranchDetails.${i}.ContactPerson2`,
      },
      {
        type: "Input",
        label: "Contact Person 3",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.ContactPerson3`,
        onChangeFuncs: [IsAlphaNoSpace],
      },
      {
        type: "Input",
        label: "Phone Number",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.PhoneNumber`,
        onChangeFuncs: [IsNumaricSpecialNoSpace],
      },
      {
        type: "Input",
        label: "Mobile Number",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.MobileNumber`,
        onChangeFuncs: [IsNumeric],
        onBlurFuncs: [IsMobileNumber],
        InputProps: { maxLength: 10 },
      },
      {
        type: "Input",
        label: "Fax Number",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.FaxNumber`,
        onChangeFuncs: [IsNumaricSpecialNoSpace],
      },
      {
        type: "Input",
        label: "Branch Manager",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.BranchManager`,
        onChangeFuncs: [IsAlphaNumNoSpace],
      },
      {
        type: "Input",
        label: "Email ID",
        visible: true,
        path: `Bankdetails.BranchDetails.${i}.Email`,
        onBlurFuncs: [IsEmail],
      },
      {
        type: "Typography",
        label: "",
        spacing: 12,
        visible: true,
      },
    ]);
  });
  return arr;
  // return [
  //   {
  //     type: "Button",
  //     label: "ADD BRANCH DETAILS",
  //     // visible: flag.ExistingDetails1,
  //     visible: true,
  //     // startIcon: <AddIcon />,
  //     variant: "outlined",
  //     component: "label",
  //     onClick: onAddBranchDetails,
  //     spacing: 12,
  //   },
  //   ...spreadBranchDetails({ setDto, dto, masters, setMasters })[0],
  // ];
};
const ProposerDetailsControls = () => [
  {
    type: "Input",
    label: "Name",
    visible: true,
    path: "ProposerDetails.0.Name",
    onChangeFuncs: [IsAlphaNoSpace],
    paths: [
      { path: "ProposerDetails.0.PolicyHolderDetails.PolicyHolderName", value: "" },
      { path: "ProposerDetails.0.PolicyHolderDetails.Address", value: "" },
    ],
  },
  {
    type: "Input",
    label: "Designation",
    visible: true,
    path: "ProposerDetails.0.Designation",
    onChangeFuncs: [IsAlphaNoSpace],
  },
  {
    type: "Input",
    label: "Occupation",
    visible: true,
    path: "ProposerDetails.0.Occupation",
    onChangeFuncs: [IsAlphaNoSpace],
  },
  {
    type: "Input",
    label: "Address",
    visible: true,
    path: "ProposerDetails.0.Address",
    onChangeFuncs: [IsFreetextNoSpace],
    paths: [
      { path: "ProposerDetails.0.PolicyHolderDetails.PolicyHolderName", value: "" },
      { path: "ProposerDetails.0.PolicyHolderDetails.Address", value: "" },
    ],
  },
];

const PolicyHolderControls = ({ dto, setDto }) => {
  const lDto = dto;
  const OnPolicyHolderName = (e, a) => {
    if (a !== null) {
      lDto.ProposerDetails[0].PolicyHolderDetails.PolicyHolderName = a.mValue;
      lDto.ProposerDetails[0].PolicyHolderDetails.Address = a.address;
    } else {
      lDto.ProposerDetails[0].PolicyHolderDetails.Address = "";
      lDto.ProposerDetails[0].PolicyHolderDetails.PolicyHolderName = "";
    }
    setDto({ ...lDto });
  };

  return [
    {
      type: "AutoComplete",
      label: "Policy Holder Name",
      visible: true,
      path: "ProposerDetails.0.PolicyHolderDetails.PolicyHolderName",
      options: [
        { mValue: lDto.ProposerDetails[0].Name, address: lDto.ProposerDetails[0].Address },
        {
          mValue: lDto.ProposerDetails[0].InsuredNameEnglish,
          address: lDto.ProposerDetails[0].PermanentAdrress.AddressEnglish,
        },
      ],
      customOnChange: (e, a) => OnPolicyHolderName(e, a),
    },
    {
      type: "Input",
      label: "Address",
      visible: true,
      path: "ProposerDetails.0.PolicyHolderDetails.Address",
      onChangeFuncs: [IsAlphaNoSpace],
    },
  ];
};
const CareofNameEnglishControls = ({ dto, setDto }) => [
  { type: "Typography", label: "Care of (English)", visible: true, spacing: 12 },
  {
    type: "Input",
    label: "Name",
    visible: true,
    path: `ProposerDetails.0.CareofNameEnglish`,
    onChangeFuncs: [IsAlphaNoSpace],
    name: "CareofNameEnglish",
    customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, dto, setDto),
  },
  {
    type: "Input",
    label: "PAN Number",
    visible: true,
    path: "ProposerDetails.0.CareofPANNumber",
    onChangeFuncs: [IsAlphaNumNoSpace],
    // InputProps: { maxLength: 9 },
  },
  {
    type: "Input",
    label: "Contact Number",
    visible: true,
    path: "ProposerDetails.0.CareofContactNumber",
    onChangeFuncs: [IsNumaricSpecialNoSpace],
    InputProps: { maxLength: 10 },
  },
  {
    type: "Input",
    label: "Address",
    visible: true,
    path: `ProposerDetails.0.CareofAddressEnglish`,
    onChangeFuncs: [IsFreetextNoSpace],
    name: "CareofAddressEnglish",
    customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, dto, setDto),
  },
  { type: "Typography", label: "Care of (Nepali)", visible: true, spacing: 12 },
  {
    type: "Input",
    label: "Name",
    visible: true,
    path: "ProposerDetails.0.CareofNameNepali",
    onChangeFuncs: [IsAlphaNoSpace],
    disabled: true,
  },
  {
    type: "Input",
    label: "Address",
    visible: true,
    path: "ProposerDetails.0.CareofAddressNepali",
    onChangeFuncs: [IsFreetextNoSpace],
    disabled: true,
  },
];
const ProprietorNameEnglish = ({ dto, setDto }) => [
  {
    type: "Input",
    label: "Proprietor Name (English)",
    visible: true,
    onChangeFuncs: [IsAlphaNoSpace],
    path: `ProposerDetails.0.ProprietorNameEnglish`,
    name: "ProprietorNameEnglish",
    customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, dto, setDto),
  },
  {
    type: "Input",
    label: "Proprietor Name (Nepali)",
    visible: true,
    path: "ProposerDetails.0.ProprietorNameNepali",
    disabled: true,
  },
];
const OtherDetailsControls = () => [
  {
    type: "Input",
    label: "Subject Matter",
    visible: true,
    path: "ProposerDetails.0.SubjectMatter",
    onChangeFuncs: [IsAlphaNoSpace],
  },
  {
    type: "Input",
    label: "Policy Risk Type",
    visible: true,
    path: "PolicyRiskType",
    onChangeFuncs: [IsAlphaNoSpace],
  },
  {
    type: "Input",
    label: "Policy Risk Category",
    visible: true,
    path: "PolicyRiskCategory",
    required: true,
    onChangeFuncs: [IsAlphaNoSpace],
  },
];

const AllCustomerDetailspage = ({ setDto, dto, masters, setMasters }) => [
  CustomerDetailsControls({ setDto, dto, masters, setMasters }),
  BankFinancialInstitutionDetailsControls({ setDto, dto, masters, setMasters }),
  ...BranchDetailsControls({ setDto, dto, masters, setMasters }),
  ProposerDetailsControls({ setDto, dto, masters, setMasters }),
  ...InsuredDetails({ setDto, dto, masters, setMasters }),
  PolicyHolderControls({ setDto, dto, masters, setMasters }),
  CareofNameEnglishControls({ setDto, dto, masters, setMasters }),
  ProprietorNameEnglish({ setDto, dto, masters, setMasters }),
  OtherDetailsControls({ setDto, dto, masters, setMasters }),
];

// function GenericCustomerDetailsAccordion() {}

export {
  ProposerDetailsControls,
  CustomerDetailsControls,
  BankFinancialInstitutionDetailsControls,
  BranchDetailsControls,
  InsuredDetails,
  PolicyHolderControls,
  CareofNameEnglishControls,
  ProprietorNameEnglish,
  AllCustomerDetailspage,
  OtherDetailsControls,
};
