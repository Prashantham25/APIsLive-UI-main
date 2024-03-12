import React, { useState, useEffect } from "react";
import { Card, Grid, AccordionDetails, Accordion, AccordionSummary } from "@mui/material";
import NewRenderControl from "Common/RenderControl/NewRenderControl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import swal from "sweetalert";
import { AgeCalculator } from "Common/Validations";
import { GetProdPartnermasterData, getPincodeDetails } from "../data/APIs/USGIWCApi";
import { TravelJson, Masters } from "../data/Json/TravelJson";
import { get } from "../../../../../../../Common/RenderControl/objectPath";

function CreateUser() {
  const [dto, setDto] = useState(TravelJson);
  const [mst, setMasters] = useState(Masters);

  const handlePincode = async (e, name) => {
    if (name === "comm") {
      dto.Usercreation.ComStateCode = e.target.value;
      if (e.target.value.length === 6) {
        const cityCD = await GetProdPartnermasterData(782, "PinCode", {
          Pincode: e.target.value,
        });
        if (cityCD.length === 0) {
          swal({ icon: "error", text: "Enter valid Pincode" });
          mst.dropdown.City = [];
          dto.Usercreation.ComCityDistrict = "";
          dto.Usercreation.ComState = "";
        } else {
          mst.dropdown.City = cityCD;
        }
      } else {
        mst.dropdown.City = [];
        dto.Usercreation.ComCityDistrict = "";
        dto.Usercreation.ComState = "";
      }
    } else if (name === "Perm") {
      dto.Usercreation.PerPincode = e.target.value;

      if (e.target.value.length === 6) {
        const cityPD = await GetProdPartnermasterData(782, "PinCode", {
          Pincode: e.target.value,
        });
        if (cityPD.length === 0) {
          swal({ icon: "error", text: "Enter valid Pincode" });
          mst.dropdown.CityOf = [];
          dto.Usercreation.PerCityDistrict = "";
          dto.Usercreation.PerState = "";
        } else {
          mst.dropdown.CityOf = cityPD;
        }
      } else {
        mst.dropdown.CityOf = [];
        dto.Usercreation.PerCityDistrict = "";
        dto.Usercreation.PerState = "";
      }
    }
    setMasters({ ...mst });
    setDto({ ...dto });
  };
  const handleCity = async (e, v, name) => {
    const res = await getPincodeDetails(v.City_ID);
    if (name === "Comm") {
      dto.Usercreation.ComCityDistrict = v.mValue;
      dto.Usercreation.ComState = res.state[0].State_Name;
      dto.Usercreation.ComCityDistrictId = res.city[0].CityDistrict_CD;
      dto.Usercreation.ComStateCode = res.state[0].mID;
      dto.Usercreation.ComCountry = "INDIA";
    } else if (name === "Perm") {
      dto.Usercreation.PerCityDistrict = v.mValue;
      dto.Usercreation.PerState = res.state[0].State_Name;
      dto.Usercreation.PerCityDistrictId = res.city[0].CityDistrict_CD;
      dto.Usercreation.PerStateCode = res.state[0].mID;
      dto.Usercreation.PerCountry = "INDIA";
    }
    setDto({ ...dto });
  };
  const handleChange = (event) => {
    if (event.target.checked === true) {
      dto.Usercreation.IsPermanentAddsameasCommunicationAdd = "Yes";
      dto.Usercreation.ComAddressLine1 = dto.Usercreation.PerAddressLine1;
      dto.Usercreation.ComAddressLine2 = dto.Usercreation.PerAddressLine2;
      dto.Usercreation.ComPincode = dto.Usercreation.PerPincode;
      dto.Usercreation.ComCityDistrict = dto.Usercreation.PerCityDistrict;
      dto.Usercreation.ComState = dto.Usercreation.PerState;
      dto.Usercreation.ComCountry = dto.Usercreation.PerCountry;
    } else {
      dto.Usercreation.IsPermanentAddsameasCommunicationAdd = "No";
      dto.Usercreation.ComAddressLine1 = "";
      dto.Usercreation.ComAddressLine2 = "";
      dto.Usercreation.ComPincode = "";
      dto.Usercreation.ComCityDistrict = "";
      dto.Usercreation.ComState = "";
      dto.Usercreation.ComCountry = "";
    }
    setDto({ ...dto });
  };

  const handleMastersApiCalling = async () => {
    const gen = await GetProdPartnermasterData(1037, "Gender", { MasterType: "Gender" });
    mst.Gender = gen;

    const MaritalStatus = await GetProdPartnermasterData(1443, "MartialStatus", {
      MasterType: "MartialStatus",
    });
    mst.MaritalStatus = MaritalStatus;
    setMasters({ ...mst });
  };
  useEffect(async () => {
    mst.flag.midNextValidationId = 1;
    mst.flag.nextflag = false;
    await handleMastersApiCalling();
  }, []);

  const onDOBselect = (d) => {
    const age = AgeCalculator(new Date(d));
    if (age < 18) {
      dto.Usercreation.DOB = [""];

      swal({ icon: "error", text: "Age should not be less than 18 years" });
    } else {
      dto.Usercreation.DOB = d;
    }
    setDto({ ...dto });
  };

  const onClickMidNextValidation = () => {};
  const Data = [
    {
      UserDetailsData: [
        {
          label: "First Name",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `Usercreation.Firstname`,
          onChangeFuncs: ["IsAlphaSpace"],
          validationId: 1,
        },
        {
          label: "Middle Name",
          type: "Input",
          visible: true,
          spacing: 2.7,
          path: `Usercreation.middilename`,
          onChangeFuncs: ["IsAlphaSpace"],
          validationId: 1,
        },
        {
          label: "Last Name",
          type: "Input",
          visible: true,
          spacing: 2.7,
          path: `Usercreation.lastname`,
          onChangeFuncs: ["IsAlphaSpace"],
        },
        {
          label: "Marital Status ",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `Usercreation.martialstst`,
          options: Masters?.MaritalStatus,
          validationId: 1,
        },
        {
          label: "Gender ",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `Usercreation.Gender`,

          options: Masters?.Gender,
          validationId: 1,
        },
        {
          type: "MDDatePicker",
          label: "Date of Birth",
          visible: true,
          dateFormat: "d-m-Y",
          InputProps: { disabled: true },
          required: true,
          spacing: 2.7,
          path: `Usercreation.DOB`,
          validationId: 1,
          allowInput: true,
          maxDate: new Date(),
          customOnChange: (d) => onDOBselect(d),
        },
        {
          type: "MDDatePicker",
          label: "Date of Joining",
          visible: true,
          dateFormat: "d-m-Y",
          required: true,
          spacing: 2.7,
          path: `Usercreation.DateOfJoining`,
          validationId: 1,
        },
        {
          type: "Input",
          label: "Mobile Number",
          visible: true,
          spacing: 2.7,
          required: true,
          onChangeFuncs: ["IsNumeric"],
          InputProps: { maxLength: 10 },
          onBlurFuncs: ["IsMobileNumber"],
          path: `Usercreation.AlternateMobileNo`,
          validationId: 1,
        },
        {
          label: "Landline Office",
          type: "Input",
          visible: true,
          spacing: 2.7,
          path: `Usercreation.landlineoffice`,
        },
        {
          label: "Landline Resident",
          type: "Input",
          visible: true,
          spacing: 2.7,
          path: `Usercreation.landlineresident`,
        },
        {
          label: "Email ID",
          type: "Input",
          visible: true,
          spacing: 2.7,
          required: true,
          path: `Usercreation.EmailId`,
          onBlurFuncs: ["IsEmail"],
          validationId: 1,
        },
        {
          type: "Input",
          label: "PAN ",
          visible: true,
          spacing: 2.7,
          path: `Usercreation.PanNo`,
          onBlurFuncs: ["IsPan"],
          InputProps: { maxLength: 10 },
          validationId: 1,
        },
        {
          type: "Input",
          label: "Branch Name ",
          visible: true,
          spacing: 2.7,
          required: true,
          path: `Usercreation.BranchName`,
          onChangeFuncs: ["IsAlphaSpace"],
          validationId: 1,
        },
        {
          type: "Input",
          label: "Branch Code ",
          visible: true,
          spacing: 2.7,
          required: true,
          path: `Usercreation.Branchcode`,
          validationId: 1,
        },
      ],
    },
    {
      PermanentAddressData: [
        {
          type: "Input",
          label: "Address1",
          required: true,
          visible: true,
          spacing: 2.7,
          path: `Usercreation.PerAddressLine1`,
          validationId: 1,
        },
        {
          type: "Input",
          label: "Address2",
          visible: true,
          spacing: 2.7,
          path: `Usercreation.PerAddressLine2`,
        },
        {
          type: "Input",
          label: "Pincode",
          visible: true,
          required: true,
          InputProps: { maxLength: 6 },
          spacing: 2.7,
          path: `Usercreation.PerPincode`,
          customOnChange: (e) => handlePincode(e, "Perm"),
          validationId: 1,
        },
        {
          type: "AutoComplete",
          label: "City",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `Usercreation.PerCityDistrict`,
          options: mst.dropdown.CityOf,
          customOnChange: (e, v) => handleCity(e, v, "Perm"),
          validationId: 1,
        },
        {
          type: "Input",
          label: "State",
          required: true,
          visible: true,
          spacing: 2.7,
          onChangeFuncs: ["IsAlpha"],
          path: `Usercreation.PerState`,
          disabled: true,
          validationId: 1,
        },
        {
          type: "Input",
          label: "Country",
          required: true,
          visible: true,
          spacing: 2.7,
          onChangeFuncs: ["IsAlpha"],
          path: `Usercreation.PerCountry`,
          disabled: true,
          validationId: 1,
        },
        {
          type: "Checkbox",
          visible: true,
          label: "Permanent Address is same as Communication Address?",
          checkedVal: "Yes",
          unCheckedVal: "No",
          customOnChange: (e) => handleChange(e),
          path: "Usercreation.IsPermanentAddsameasCommunicationAdd",
          spacing: 12,
        },
      ],
    },
    {
      CommunicationAddressData: [
        {
          type: "Input",
          label: "Address1",
          required: true,
          visible: true,
          spacing: 2.7,
          path: `Usercreation.ComAddressLine1`,
          validationId: 1,
        },
        {
          type: "Input",
          label: "Address2",
          visible: true,
          spacing: 2.7,
          path: `Usercreation.ComAddressLine2`,
        },
        {
          type: "Input",
          label: "Pincode",
          visible: true,
          required: true,
          InputProps: { maxLength: 6 },
          spacing: 2.7,
          path: `Usercreation.ComPincode`,
          customOnChange: (e) => handlePincode(e, "comm"),
          validationId: 1,
        },
        {
          type: "AutoComplete",
          label: "City",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `Usercreation.ComCityDistrict`,
          options: mst.dropdown.City,
          customOnChange: (e, v) => handleCity(e, v, "Comm"),
          validationId: 1,
        },
        {
          type: "Input",
          label: "State",
          required: true,
          visible: true,
          spacing: 2.7,
          onChangeFuncs: ["IsAlpha"],
          path: `Usercreation.ComState`,
          disabled: true,
          validationId: 1,
        },
        {
          type: "Input",
          label: "Country",
          required: true,
          visible: true,
          spacing: 2.7,
          onChangeFuncs: ["IsAlpha"],
          path: `Usercreation.ComCountry`,
          disabled: true,
          validationId: 1,
        },
        {
          label: "",
          type: "Typography",
          visible: true,
          spacing: 9.5,
        },
        {
          label: "Reset",
          type: "Button",
          visible: true,
          spacing: 1,
        },
        {
          label: "Create",
          type: "ValidationControl",
          subType: "Button",
          visible: true,
          spacing: 1,
          validationId: 1,
          onClick: onClickMidNextValidation,
        },
      ],
    },
  ];
  const accordians = [
    {
      label: "User Details ",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: "Permanent Address",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: "Communication Address",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
  ];

  const midValidationCheck = (validationId) => {
    let validationFlag = true;
    Data.forEach((section) => {
      section[Object.keys(section)[0]].forEach((x2) => {
        if (
          x2.visible === true &&
          x2.validationId === validationId &&
          x2.type !== "ValidationControl"
        ) {
          const val = get(dto, x2.path);
          if (val === "" || val === undefined) validationFlag = false;
        }
      });
    });
    if (validationFlag === false) {
      Masters.flag.midNextValidationId = 1;
      Masters.flag.nextflag = true;
    } else {
      Masters.flag.midNextValidationId = -1;
      Masters.flag.nextflag = false;
    }
    setMasters({ ...Masters });
    return validationFlag;
  };

  return (
    <Card>
      <Grid item xs={12} ml={4}>
        Create User
      </Grid>
      {accordians.map((x, i) => (
        <Accordion defaultExpanded disableGutters sx={x.sx}>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
            <MDTypography variant="body1" fontWeight="bold" color="primary" ml={4}>
              {x.label}
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2} ml={2}>
              {Data.map(
                (section, j) =>
                  i === j &&
                  section[Object.keys(section)[0]].map((elem) =>
                    elem.visible ? (
                      <Grid item xs={elem.spacing}>
                        <NewRenderControl
                          item={elem}
                          dto={dto}
                          setDto={setDto}
                          nextFlag={mst.flag.nextflag}
                          onMidNextValidation={midValidationCheck}
                          midNextValidationId={mst.flag.midNextValidationId}
                        />
                      </Grid>
                    ) : null
                  )
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Card>
  );
}

export default CreateUser;
