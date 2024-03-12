import * as React from "react";
import { Card, Grid, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { postRequest } from "core/clients/axiosclient";
import swal from "sweetalert2";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import { get } from "../../../../../../../Common/RenderControl/objectPath";
import {
  IsAlphaNumNoSpace,
  IsEmail,
  GetNPCommonMaster,
  GetProdPartnermasterData,
} from "../data/APIs/MotorCycleApi";
import {
  AgeCalculator,
  IsNumeric,
  IsMobileNumber,
  IsFreetextNoSpace,
} from "../../../../../../../Common/Validations";
import MDButton from "../../../../../../../components/MDButton";
import MDLoader from "../../../../../../../components/MDLoader";
import {
  GetMasterData,
  GetLocation,
  GetState,
  GetDistrict,
  GetCity,
  CreateProfileUser,
} from "../../../../../../BaseSetup/views/Users/data";

function CreateUser({ dto1, mode }) {
  // const [values, setValues] = React.useState(0);
  const [tab, setTab] = useState(0);
  const [nextCount, setNextCount] = useState(0);
  const [nextFlg, setNextFlg] = useState(false);
  const [masters, setMasters] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dto, setDto] = useState(
    dto1 !== null && dto1 !== undefined
      ? dto1
      : {
        PermanentAddressSameAsCommunicationAddress: "",
        id: "",
        userName: "",
        email: "",
        emailConfirmed: true,
        passwordHash: "",
        securityStamp: "",
        concurrencyStamp: "",
        phoneNumber: "",
        phoneNumberConfirmed: true,
        twoFactorEnabled: true,
        lockoutEnabled: true,
        accessFailedCount: 0,
        WardNumber: "",
        userDetails: [
          {
            userId: "",
            userName: "",
            status: true,
            createdBy: "",
            createdDate: "",
            locked: true,
            lockedReason: "",
            lockStartDate: "",
            lockEndDate: "",
            lockMechanism: true,
            officeId: 0,
            firstName: "",
            middleName: "",
            lastName: "",
            employeeNumber: 0,
            dob: "",
            doj: "",
            genderDetail: "",
            genderId: "",
            email: "",
            roleId: null,
            passportNumber: "",
            drivingLicenceNumber: "",
            contactNumber: "",
            userTypeId: "1004",
            panNo: "",
            lastLoginDateTime: "",
            isIos: true,
            isAndroid: true,
            isWindows: true,
            isPasswordChanged: true,
            landLineOffice: "",
            landLineResidence: "",
            partnerId: 0,
            branchName: "",
            branchCode: "",
            multipleBranches: [],
            multipleCode: [],
            designation: "",
            maritalStatus: "",
            maritalStatusId: "",
            profileImage: "",
            partnerName: "",
            userCountryId: "",
            userStateId: "",
            userDistrictId: "",
            userCityId: "",
            userPincodeId: "",
            userAddressLine1: "",
            userAddressLine2: "",
            userAddressLine3: "",
            Department: "",
          },
        ],
        userAddress: [
          {
            id: "",
            userAddressType: "",
            country: "",
            userCountryId: "",
            state: "",
            userStateId: "",
            district: "",
            userDistrictId: "",
            city: "",
            userCityId: "",
            userAddressLine1: "",
            userAddressLine2: "",
            userAddressLine3: "",
            userPincodeId: "12345",
            userWardNo: "",
          },
          {
            id: "",
            userAddressType: "",
            country: "",
            userCountryId: "",
            state: "",
            userStateId: "",
            district: "",
            userDistrictId: "",
            city: "",
            userCityId: "",
            userAddressLine1: "",
            userAddressLine2: "",
            userAddressLine3: "",
            userPincodeId: "12345",
            userWardNo: "",
          },
        ],
      }
  );

  // useEffect(() => {
  //   if (dto1 !== undefined && dto1 !== null) {
  //     setDto({ ...dto1 });
  //   }
  // }, []);

  // const IsAlphaSpecial = (str) => {
  //   const regex = /^[a-zA-Z!@#$%^&*()_+{}[\]:;<>,.?~\\_-/-]*$/;
  //   if (regex.test(str)) return true;
  //   return "Allows only Alphabets and Special characters";
  // };

  // const handleCountry = (e, a) => {
  //   // debugger;
  //   const r = await SearchUserDetails();
  //   masters.country1 = r.data;
  //   dto.userAddress[0].userCountryId = a.mID;
  //   dto.userAddress[0].country = a.mValue;
  //   // dto.userAddress[1].userCountryId = a.mID;
  //   setDto({ ...dto });
  // };

  // const handleCountry = async (e, a) => {
  //   // debugger;
  //   const r = await GetState(a.mID);
  //   setMasterState(r.data);
  //   dto.userAddress[0].userCountryId = a.mID;
  //   dto.userAddress[0].country = a.mValue;
  //   // dto.userAddress[1].userCountryId = a.mID;
  //   setDto({ ...dto });
  // };

  // const handleState = async (e, a) => {
  //   const r = await GetDistrict(a.mID);
  //   setMasterDistrict(r.data);
  //   dto.userAddress[0].userStateId = a.mID;
  //   // dto.PermanentAdrress.State = a.mValue;
  //   dto.userAddress[1].userStateId = a.mID;
  //   setDto({ ...dto });
  // };
  // const handleDistrict = async (e, a) => {
  //   const r = await GetCity(a.mID);
  //   setMasterCity(r.data);
  //   dto.userAddress[0].userDistrictId = a.mID;
  //   // dto.PermanentAdrress.District = a.mValue;
  //   dto.userAddress[1].userDistrictId = a.mID;
  //   setDto({ ...dto });
  // };
  // const handleCity = async (e, a) => {
  //   dto.userAddress[0].userCityId = a.mID;
  //   // dto.PermanentAdrress.Municipality = a.mValue;
  //   dto.userAddress[1].userCityId = a.mID;
  //   setDto({ ...dto });
  // };

  const onDOBselect = (e, d) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      dto.userDetails[0].dob = [""];
      swal.fire({
        icon: "error",
        text: `Age of the Policy Holder must be above 16 Years.`,
        confirmButtonColor: "#0079CE",
      });
    } else {
      dto.userDetails[0].dob = d;
    }
    setDto({ ...dto });
  };

  const OnAddresstype = (e) => {
    dto.PermanentAddressSameAsCommunicationAddress = e.target.value;
    if (dto.PermanentAddressSameAsCommunicationAddress === "Yes") {
      dto.userAddress[1].userAddressLine1 = dto.userAddress[0].userAddressLine1;
      dto.userAddress[1].userAddressLine2 = dto.userAddress[0].userAddressLine2;
      dto.userAddress[1].userAddressLine3 = dto.userAddress[0].userAddressLine3;
      dto.userAddress[1].userCountryId = dto.userAddress[0].userCountryId;
      dto.userAddress[1].country = dto.userAddress[0].country;
      dto.userAddress[1].state = dto.userAddress[0].state;
      dto.userAddress[1].userStateId = dto.userAddress[0].userStateId;
      dto.userAddress[1].district = dto.userAddress[0].district;
      dto.userAddress[1].userDistrictId = dto.userAddress[0].userDistrictId;
      dto.userAddress[1].city = dto.userAddress[0].city;
      dto.userAddress[1].userCityId = dto.userAddress[0].userCityId;
      dto.userAddress[1].userWardNo = dto.userAddress[0].userWardNo;
    }
    if (dto.PermanentAddressSameAsCommunicationAddress === "No") {
      dto.userAddress[1] = {
        ...dto.userAddress[1],
        country: "",
        userCountryId: "",
        state: "",
        userStateId: "",
        district: "",
        userDistrictId: "",
        city: "",
        userCityId: "",
        userAddressLine1: "",
        userAddressLine2: "",
        userAddressLine3: "",
        userPincodeId: "",
        userWardNo: "",
      };
    }

    setDto({ ...dto });
  };

  // const OnWardNo = (e, a) => {
  //   dto.userAddress[0][a];

  //   if (tab === 0) {
  //     (dto.WardNumber = dto.userAddress[0].userAddressLine1), dto.userAddress[0].userWardNo;
  //   }
  //   setDto({ ...dto });
  // };

  const OnPlaceSelect = async (e, a, key) => {
    if (key === "country") {
      if (a !== null) {
        const res = await GetState(a.mID);
        dto.userAddress[0].userCountryId = a.mID;
        dto.userAddress[0].country = a.mValue;
        masters.State = res.data;
      } else {
        dto.userAddress[0] = {
          ...dto.userAddress[0],
          userCountryId: "",
          country: "",
          userStateId: "",
          state: "",
          userDistrictId: "",
          district: "",
          userCityId: "",
          city: "",
          userWardNo: "",
        };
      }
    }
    if (key === "state") {
      if (a !== null) {
        const res = await GetDistrict(a.mID);
        dto.userAddress[0].userStateId = a.mID;
        // dto.userAddress[0].state = a.mValue;
        dto.userAddress[0].state = a.mValue;
        dto.userAddress[0] = {
          ...dto.userAddress[0],
          userDistrictId: "",
          district: "",
          userCityId: "",
          city: "",
          userWardNo: "",
        };
        masters.District = res.data;
      } else {
        dto.userAddress[0] = {
          ...dto.userAddress[0],
          userStateId: "",
          state: "",
          userDistrictId: "",
          district: "",
          userCityId: "",
          city: "",
          userWardNo: "",
        };
      }
    }
    if (key === "district") {
      if (a !== null) {
        const res = await GetCity(a.mID);
        dto.userAddress[0].userDistrictId = a.mID;
        // dto.userAddress[0].district = a.mValue;
        dto.userAddress[0].district = a.mValue;

        dto.userAddress[0] = {
          ...dto.userAddress[0],
          userCityId: "",
          city: "",
          userWardNo: "",
        };
        masters.Municipality = res.data;
      } else {
        dto.userAddress[0] = {
          ...dto.userAddress[0],
          userDistrictId: "",
          district: "",
          userCityId: "",
          city: "",
          userWardNo: "",
        };
      }
    }
    if (key === "city") {
      if (a !== null) {
        dto.userAddress[0].userCityId = a.mID;
        // dto.userAddress[0].city = a.mValue;
        dto.userAddress[0].city = a.mValue;

        dto.userAddress[0].userWardNo = "";
      } else {
        dto.userAddress[0].userCityId = "";
        dto.userAddress[0].city = "";
        dto.userAddress[0].userWardNo = "";
      }
    }

    if (key === "userCountryId") {
      if (a !== null) {
        const res = await GetState(a.mID);
        dto.userAddress[1].userCountryId = a.mID;
        dto.userAddress[1].country = a.mValue;
        masters.State1 = res.data;
      } else {
        dto.userAddress[1] = {
          ...dto.userAddress[1],
          userCountryId: "",
          country: "",
          userStateId: "",
          state: "",
          userDistrictId: "",
          district: "",
          userCityId: "",
          city: "",
          userWardNo: "",
        };
      }
    }
    if (key === "userStateId") {
      if (a !== null) {
        const res = await GetDistrict(a.mID);
        dto.userAddress[1].userStateId = a.mID;
        dto.userAddress[1].state = a.mValue;
        dto.userAddress[1] = {
          ...dto.userAddress[1],
          userDistrictId: "",
          district: "",
          userCityId: "",
          city: "",
          userWardNo: "",
        };
        masters.District1 = res.data;
      } else {
        dto.userAddress[1] = {
          ...dto.userAddress[1],
          userStateId: "",
          state: "",
          userDistrictId: "",
          district: "",
          userCityId: "",
          city: "",
          userWardNo: "",
        };
      }
    }
    if (key === "userDistrictId") {
      if (a !== null) {
        const res = await GetCity(a.mID);
        dto.userAddress[1].userDistrictId = a.mID;
        dto.userAddress[1].district = a.mValue;
        dto.userAddress[1] = {
          ...dto.userAddress[1],
          userCityId: "",
          city: "",
          userWardNo: "",
        };
        masters.Municipality1 = res.data;
      } else {
        dto.userAddress[1] = {
          ...dto.userAddress[1],
          userDistrictId: "",
          district: "",
          userCityId: "",
          city: "",
          userWardNo: "",
        };
      }
    }
    if (key === "userCityId") {
      if (a !== null) {
        dto.userAddress[1].userCityId = a.mID;
        dto.userAddress[1].city = a.mValue;
        dto.userAddress[1].userWardNo = "";
      } else {
        dto.userAddress[1].userCityId = "";
        dto.userAddress[1].city = "";
        dto.userAddress[1].userWardNo = "";
      }
    }
    setDto({ ...dto });
    setMasters({ ...masters });
  };

  // const OnbranchName = (e, a) => {
  //   // console.log(111, a);
  //   dto.userDetails[0].multipleBranches = a;
  //   // dto.userDetails[0].multipleBranchs = a.map((x) => ({
  //   //   mValue: x.mValue,
  //   //   ShortCode: x.ShortCode,
  //   // }));
  //   dto.userDetails[0].branchCode = a.map((x) => x.ShortCode).join(",");
  //   dto.userDetails[0].branchName = a.map((x) => x.mValue).join(",");
  //   setDto({ ...dto });
  // };

  const OnbranchName = (e, a, key) => {
    dto.userDetails[0].multipleBranches = a;
    dto.userDetails[0].multipleCode = a;
    if (key === "multipleBranches" || key === "multipleCode") {
      if (a !== null) {
        dto.userDetails[0].branchCode = a.map((x) => x.ShortCode).join(",");
        dto.userDetails[0].branchName = a.map((x) => x.mValue).join(",");
      } else {
        dto.userDetails[0].branchCode = "";
        dto.userDetails[0].branchName = "";
      }
    }
    // if (key === "multipleBranches" || key === "multipleCode") {
    //   dto.userDetails[0].multipleBranches = dto.userDetails[0].branchName;
    //   dto.userDetails[0].multipleCode = dto.userDetails[0].branchCode;
    // }
    setDto({ ...dto });
  };

  const renderItems = [
    {
      type: "Input",
      label: "First Name",
      path: "userDetails.0.firstName",
      required: true,
      visible: true,
      spacing: 3,
      // onChangeFuncs: [IsAlphaSpecial],
      InputProps: { maxLength: 20 },
    },
    {
      type: "Input",
      label: "Middle Name",
      path: "userDetails.0.middleName",
      visible: true,
      spacing: 3,
      // onChangeFuncs: [IsAlphaSpecial],
      InputProps: { maxLength: 20 },
    },
    {
      type: "Input",
      label: "Last Name",
      path: "userDetails.0.lastName",
      required: true,
      visible: true,
      spacing: 3,
      // onChangeFuncs: [IsAlphaSpecial],
      InputProps: { maxLength: 20 },
    },
    {
      type: "AutoComplete",
      label: "Marital Status",
      path: "userDetails.0.maritalStatus",
      paths: [{ parameter: "mID", path: "userDetails.0.maritalStatusId" }],
      visible: true,
      required: true,
      options: masters.MaritalStatus,
      spacing: 3,
    },
    {
      type: "AutoComplete",
      label: "Gender",
      path: "userDetails.0.genderDetail",
      paths: [{ parameter: "mID", path: "userDetails.0.genderId" }],
      required: true,
      visible: true,
      options: masters.Gender,
      spacing: 3,
    },
    {
      type: "MDDatePicker",
      label: "Date of Birth",
      path: "userDetails.0.dob",
      required: true,
      visible: true,
      altFormat: "d-m-Y",
      dateFormat: "Y-m-d",
      spacing: 3,
      maxDate: new Date(),
      customOnChange: (e, d) => onDOBselect(e, d),
    },
    {
      type: "MDDatePicker",
      label: "Date of Joining",
      path: "userDetails.0.doj",
      maxDate: new Date(),
      required: true,
      visible: true,
      altFormat: "d-m-Y",
      dateFormat: "Y-m-d",
      spacing: 3,
    },
    {
      type: "Input",
      label: "Mobile Number",
      path: "userDetails.0.contactNumber",
      required: true,
      visible: true,
      spacing: 3,
      onChangeFuncs: [IsNumeric],
      onBlurFuncs: [IsMobileNumber],
      InputProps: { maxLength: 10 },
    },
    {
      type: "Input",
      label: "Alternative Mobile No",
      path: "userDetails.0.landLineOffice",
      visible: true,
      spacing: 3,
      onChangeFuncs: [IsNumeric],
      onBlurFuncs: [IsMobileNumber],
      InputProps: { maxLength: 10 },
    },
    {
      type: "Input",
      label: "Email ID",
      path: "userDetails.0.email",
      visible: true,
      required: true,
      spacing: 3,
      onBlurFuncs: [IsEmail],
    },
    {
      type: "Input",
      label: "PAN/CitizenshipNo",
      path: "userDetails.0.panNo",
      visible: true,
      spacing: 3,
      onChangeFuncs: [IsAlphaNumNoSpace],
    },
    {
      type: "Input",
      label: "Designation",
      path: "userDetails.0.designation",
      required: true,
      visible: true,
      spacing: 3,
      onChangeFuncs: [IsAlphaNumNoSpace],
      InputProps: { maxLength: 30 },
    },
    {
      type: "Input",
      label: "Department",
      path: "userDetails.0.Department",
      required: true,
      visible: mode !== "edit" && mode !== "view",
      spacing: 3,
      onChangeFuncs: [IsAlphaNumNoSpace],
      InputProps: { maxLength: 30 },
    },

    {
      type: "AutoComplete",
      label: "Branch Name",
      // path: "userDetails.0.multipleBranches",
      value: Array.isArray(dto.userDetails?.[0]?.multipleBranches)
        ? dto.userDetails[0].multipleBranches
        : [],
      required: true,
      disableCloseOnSelect: true,
      visible: true,
      multiple: true,
      options: masters.IssuingBranch,
      spacing: 3,
      customOnChange: (e, a) => OnbranchName(e, a, "multipleBranches"),
    },
    {
      type: "AutoComplete",
      label: "Branch Code",
      // path: "userDetails.0.multipleCode",
      value: Array.isArray(dto.userDetails?.[0]?.multipleCode)
        ? dto.userDetails[0].multipleCode
        : [],
      visible: true,
      required: true,
      spacing: 3,
      multiple: true,
      options: masters.IssuingBranch,
      disableCloseOnSelect: true,
      optionLabel: "ShortCode",
      customOnChange: (e, a) => OnbranchName(e, a, "multipleCode"),
    },
    {
      type: "Tabs",
      value: tab,
      visible: true,
      customOnChange: (e, newValue) => setTab(newValue),
      tabs: [
        {
          value: 0,
          label: "Permanent Address",
        },
        {
          value: 1,
          label: "Communication Address",
        },
      ],
      spacing: 12,
    },
    {
      type: "Input",
      label: "Address 01",
      path: "userAddress.0.userAddressLine1",
      required: true,
      visible: tab === 0,
      spacing: 3,
      onChangeFuncs: [IsFreetextNoSpace],
      InputProps: { maxLength: 100 },
      // customOnChange: (e, a) => OnWardNo(e, a),
    },
    {
      type: "Input",
      label: "Address 02",
      path: "userAddress.0.userAddressLine2",
      required: true,
      visible: tab === 0,
      spacing: 3,
      onChangeFuncs: [IsFreetextNoSpace],
      InputProps: { maxLength: 100 },
    },
    {
      type: "Input",
      label: "Address 03",
      path: "userAddress.0.userAddressLine3",
      visible: tab === 0,
      spacing: 3,
      onChangeFuncs: [IsFreetextNoSpace],
      InputProps: { maxLength: 100 },
    },
    {
      type: "AutoComplete",
      label: "Country",
      path: "userAddress.0.country",
      // paths: [{ parameter: "mID", path: "userCountryId" }],
      required: true,
      options: masters.country,
      visible: tab === 0,
      spacing: 3,
      customOnChange: (e, a) => OnPlaceSelect(e, a, "country"),
    },
    {
      type: "AutoComplete",
      label: "Province/State",
      // path: "userAddress.0.state",
      path: "userAddress.0.state",
      required: true,
      options: dto.userAddress[0].country !== "" ? masters.State : [],
      visible: tab === 0,
      customOnChange: (e, a) => OnPlaceSelect(e, a, "state"),
      spacing: 3,
    },
    {
      type: "AutoComplete",
      label: "District",
      path: "userAddress.0.district",
      required: true,
      visible: tab === 0,
      spacing: 3,
      options: dto.userAddress[0].state !== "" ? masters.District : [],
      customOnChange: (e, a) => OnPlaceSelect(e, a, "district"),
    },
    {
      type: "AutoComplete",
      label: "Municipality",
      path: "userAddress.0.city",
      required: true,
      visible: tab === 0,
      options: dto.userAddress[0].district !== "" ? masters.Municipality : [],
      spacing: 3,
      customOnChange: (e, a) => OnPlaceSelect(e, a, "city"),
    },
    {
      type: "AutoComplete",
      label: "Ward Number",
      path: "userAddress.0.userWardNo",
      visible: tab === 0,
      options: dto.userAddress[0].city !== "" ? masters.WardNumber : [],
      spacing: 3,
      // customOnChange: (e, a) => OnWardNo(e, a),
    },
    {
      type: "RadioGroup",
      visible: tab === 1,
      radioLabel: { label: "Permanent Address same as Communication Address", labelVisible: true },
      radioList: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      path: "PermanentAddressSameAsCommunicationAddress",
      spacing: 12,
      required: true,
      customOnChange: (e) => OnAddresstype(e),
    },
    {
      type: "Input",
      label: "Address 01",
      path: "userAddress.1.userAddressLine1",
      required: true,
      visible: tab === 1,
      spacing: 3,
      onChangeFuncs: [IsFreetextNoSpace],
      InputProps: { maxLength: 100 },
    },
    {
      type: "Input",
      label: "Address 02",
      path: "userAddress.1.userAddressLine2",
      required: true,
      visible: tab === 1,
      spacing: 3,
      onChangeFuncs: [IsFreetextNoSpace],
      InputProps: { maxLength: 100 },
    },
    {
      type: "Input",
      label: "Address 03",
      path: "userAddress.1.userAddressLine3",
      visible: tab === 1,
      spacing: 3,
      onChangeFuncs: [IsFreetextNoSpace],
      InputProps: { maxLength: 100 },
    },
    {
      type: "AutoComplete",
      label: "Country",
      path: "userAddress.1.country",
      required: true,
      visible: tab === 1,
      spacing: 3,
      options: masters.country,
      customOnChange: (e, a) => OnPlaceSelect(e, a, "userCountryId"),
    },
    {
      type: "AutoComplete",
      label: "Province/State",
      path: "userAddress.1.state",
      required: true,
      visible: tab === 1,
      spacing: 3,
      options: dto.userAddress[1].country !== "" ? masters.State1 : [],
      customOnChange: (e, a) => OnPlaceSelect(e, a, "userStateId"),
    },
    {
      type: "AutoComplete",
      label: "District",
      path: "userAddress.1.district",
      required: true,
      visible: tab === 1,
      spacing: 3,
      options: dto.userAddress[1].state !== "" ? masters.District1 : [],
      customOnChange: (e, a) => OnPlaceSelect(e, a, "userDistrictId"),
    },
    {
      type: "AutoComplete",
      label: "Municipality",
      path: "userAddress.1.city",
      required: true,
      visible: tab === 1,
      options: dto.userAddress[1].district !== "" ? masters.Municipality1 : [],
      spacing: 3,
      customOnChange: (e, a) => OnPlaceSelect(e, a, "userCityId"),
    },
    {
      type: "AutoComplete",
      label: "Ward Number",
      path: "userAddress.1.userWardNo",
      visible: tab === 1,
      spacing: 3,
      options: dto.userAddress[1].city !== "" ? masters.WardNumber : [],
    },
  ];
  console.log("1111", dto);
  console.log("22", masters);

  useEffect(async () => {
    await GetNPCommonMaster().then((r) => {
      r.forEach((x) => {
        masters[x.mType] = x.mdata;
      });
      // masters.Country = masters.Country.filter((x) => x.mValue === "Nepal");
    });

    await GetMasterData().then((r) => {
      r.data.forEach((x) => {
        if (Array.isArray(x.mdata)) masters[x.mType] = x.mdata;
      });
    });

    await GetLocation("country", {}).then((r) => {
      // setCountry(r.data);
      // masters.country = r.data;
      // if (Array.isArray(r.data))
      masters.country = r.data.filter((x) => x.mValue === "Nepal");
    });

    // await GetProdPartnermasterData("State", {}).then((r) => {
    //   masters.State = r.data;
    // });

    // await GetLocation("Country").then((r1) => {
    //   masters.Country = r1.data;
    // });
    // await GetState("State", {}).then((r2) => {
    //   masters.State = r2.data;
    // });

    // const res2 = await GetDistrict("District", 0);
    // masters.District = res2.data;
    if (
      localStorage.getItem("NepalCompanySelect") !== null ||
      process.env.REACT_APP_EnvId !== "297"
    ) {
      masters.Company = "";
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        masters.Company = "NMIC";
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        masters.Company = "PMIC";
      }
      await GetProdPartnermasterData("BranchName", {
        Description: masters.Company,
      }).then((res) => {
        if (Array.isArray(res.data)) masters.IssuingBranch = res.data;
      });
    }

    // masters.IssuingBranch = masters.IssuingBranch.filter(
    //   (x) =>
    //     x.mValue === "Biratnagar" ||
    //     x.mValue === "Dhangadhi" ||
    //     x.mValue === "Chitwan" ||
    //     x.mValue === "Kathmandu"
    // );
    setMasters({ ...masters });
  }, []);
  // }, [dto]);

  useEffect(() => {
    if (dto1 !== null && dto1 !== undefined && masters.IssuingBranch?.length > 0) {
      const branchNameString = dto.userDetails[0].branchName.split(",");
      // const branchCodeString = dto.userDetails[0].branchCode.split(",");
      dto.userDetails[0].multipleBranches = masters.IssuingBranch.filter((x) =>
        branchNameString.includes(x.mValue)
      );
      dto.userDetails[0].multipleCode = masters.IssuingBranch.filter((x) =>
        branchNameString.includes(x.mValue)
      );
      console.log("branchNameString", branchNameString);
      // console.log("branchCodeString", branchCodeString);
      setDto({ ...dto });
    }
  }, [dto1, masters.IssuingBranch]);

  const HandleCreatuser = async () => {
    setNextCount(nextCount + 1);
    let validationFlag = true;
    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(dto1, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });
    if (validationFlag === false) {
      setNextFlg(true);
      swal.fire({
        text: "Please fill the required fields",
        icon: "error",
      });
    } else if (tab !== 1) {
      swal.fire({
        text: "Please select Communication Address",
        icon: "error",
      });
    } else {
      setNextFlg(false);
      setLoading(true);
      const res = await CreateProfileUser(dto);
      setLoading(false);
      if (res === null) {
        swal.fire({
          icon: "error",
          text: `User already exist`,
        });
      } else {
        postRequest(`UserProfile/UpdateCustomer?Email=${dto.userDetails[0].email}`, dto).then(
          (result) => {
            console.log(result);
          }
        );
        swal
          .fire({
            allowOutsideClick: false,
            icon: "success",
            text: `User Created Successfully for user:${dto.userDetails[0].email}`,
          })
          .then((res1) => {
            if (res1.isConfirmed) {
              if (window.location.reload());
              return true;
            }
            return false;
          });
      }
      setDto({ ...dto });
    }
  };

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem" }}>
        <Stack paddingBottom={2}>
          {mode === "view" && <MDTypography fontSize="1.5rem">View User</MDTypography>}
          {mode === "edit" && <MDTypography fontSize="1.5rem">Update User</MDTypography>}
          {mode !== "view" && mode !== "edit" && (
            <MDTypography fontSize="1.5rem">Create User</MDTypography>
          )}
        </Stack>
        <MDBox>
          <Grid container spacing={2} paddingRight={2}>
            {renderItems.map(
              (item) =>
                item.visible === true && (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={item.spacing ? item.spacing : 3}
                    lg={item.spacing ? item.spacing : 3}
                    xl={item.spacing ? item.spacing : 3}
                    xxl={item.spacing ? item.spacing : 3}
                  >
                    <NewRenderControl
                      item={{ ...item, disabled: mode === "view" }}
                      dto={dto}
                      setDto={setDto}
                      nextFlag={nextFlg}
                      nextCount={nextCount}
                    />
                  </Grid>
                )
            )}
          </Grid>
          {mode !== "view" && (
            <Stack justifyContent="right" direction="row" paddingTop={3} paddingRight={2}>
              <MDButton onClick={HandleCreatuser}>
                {mode === "edit" ? "Update User" : "Create User"}

              </MDButton>
            </Stack>
          )}
        </MDBox>
      </Card>
    </MDBox>
  );
}
export default CreateUser;
