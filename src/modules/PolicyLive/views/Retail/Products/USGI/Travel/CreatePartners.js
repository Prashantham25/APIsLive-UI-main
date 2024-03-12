import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import NewRenderControl from "Common/RenderControl/NewRenderControl";
import { get } from "Common/RenderControl/objectPath";
import { getRequest } from "core/clients/axiosclient";
import swal from "sweetalert";
import { TravelJson, Masters, IsEmail, modelStyle } from "../data/Json/TravelJson";
import { GetProdPartnermasterData, getPincodeDetails } from "../data/APIs/USGIWCApi";
import { CreatePartnerApi } from "../data/APIs/GroupTravelApi";

function CreatePartners() {
  const [lDto, setDto] = useState(TravelJson);
  const [lMasters, setMasters] = useState(Masters);

  const handleMatersAPICalling = async () => {
    lMasters.dropdown.Salutation = await GetProdPartnermasterData(1037, "Salutation", {
      MasterType: "Salutation",
    });
    lMasters.dropdown.PartnerClass = await GetProdPartnermasterData(1443, "PartnerClass", {
      MasterType: "PartnerClass",
    });

    setMasters({ ...lMasters });
  };

  const handleChannel = async () => {
    await getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
      async (result) => {
        console.log("result", result);
        const { partnerId } = result.data.userDetails[0];
        await getRequest(
          `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
            "userId"
          )}&productCode=2123`
        ).then(async (reslt) => {
          console.log("qwertyuiop", reslt);
          const partnerDetailssss = reslt.data.additionalDetails;
          const partnerDetail = JSON.parse(partnerDetailssss);
          console.log("DeatDetailsresult", partnerDetail);
          lDto.PartnerCreation.SalespersonCode = partnerDetail.AdditionalDetails.SalesPersonCode;
          lDto.PartnerCreation.SalespersonName = partnerDetail.AdditionalDetails.SalesPersonName;
          lDto.PartnerCreation.BranchName = partnerDetail.AdditionalDetails.BranchName;
          lDto.PartnerCreation.BranchCode = partnerDetail.AdditionalDetails.BranchCode;
          lDto.PartnerCreation.IMDSalespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
          lDto.PartnerCreation.IMDSalespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
          lDto.PartnerCreation.DealID = partnerDetail.AdditionalDetails.DealID;
          lDto.PartnerCreation.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
          lDto.PartnerCreation.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
          lDto.PartnerCreation.PolicyIssuingOfficeAddress =
            partnerDetail.AdditionalDetails.OfficeAddress;
          // lDto.partnerDetail["PolicyIssuingOffice Code"] =
          //   partnerDetail.AdditionalDetails.OfficeCode;
        });
      }
    );
    setDto({ ...lDto });
  };

  useEffect(async () => {
    lMasters.flag.midNextValidationId = -1;
    lMasters.flag.nextflag = false;
    await handleMatersAPICalling();
    await handleChannel();
  }, []);
  const handlePincode = async (e, name) => {
    if (name === "comm") {
      lDto.PartnerCreation.ComPincode = e.target.value;
      if (e.target.value.length === 6) {
        const city = await GetProdPartnermasterData(782, "PinCode", {
          Pincode: e.target.value,
        });
        console.log("error", city);
        if (city.length === 0) {
          swal({ icon: "error", text: "Enter valid Pincode" });
          lMasters.dropdown.City = [];
          lDto.PartnerCreation.ComCityDistrict = "";
          lDto.PartnerCreation.ComState = "";
          lDto.PartnerCreation.ComStateCode = "";
          lDto.PartnerCreation.ComCountry = "";
          lDto.PartnerCreation.ComCityDistrictCode = "";
        } else {
          lMasters.dropdown.City = city;
        }
      } else {
        lMasters.dropdown.City = [];
        lDto.PartnerCreation.ComCityDistrict = "";
        lDto.PartnerCreation.ComState = "";
        lDto.PartnerCreation.ComStateCode = "";
        lDto.PartnerCreation.ComCountry = "";
        lDto.PartnerCreation.ComCityDistrictCode = "";
      }
    } else {
      lDto.PartnerCreation.PerPincode = e.target.value;
      if (e.target.value.length === 6) {
        const city = await GetProdPartnermasterData(782, "PinCode", {
          Pincode: e.target.value,
        });
        console.log("error", city);
        if (city.length === 0) {
          swal({ icon: "error", text: "Enter valid Pincode" });
          lMasters.dropdown.CityOf = [];
          lDto.PartnerCreation.PerCityDistrict = "";
          lDto.PartnerCreation.PerState = "";
          lDto.PartnerCreation.PerStateCode = "";
          lDto.PartnerCreation.PerCountry = "";
          lDto.PartnerCreation.PerCityDistrictCode = "";
        } else {
          lMasters.dropdown.CityOf = city;
        }
      } else {
        lMasters.dropdown.City = [];
        lDto.PartnerCreation.PerCityDistrict = "";
        lDto.PartnerCreation.PerState = "";
        lDto.PartnerCreation.PerStateCode = "";
        lDto.PartnerCreation.PerCountry = "";
        lDto.PartnerCreation.PerCityDistrictCode = "";
      }
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const handleCity = async (e, v, name) => {
    if (name === "comm") {
      lDto.PartnerCreation.ComCityDistrict = v.mValue;
      const state = await getPincodeDetails(lMasters.dropdown.City[0].City_ID);
      lDto.PartnerCreation.ComCityDistrictCode = lMasters.dropdown.City[0].City_ID;
      lDto.PartnerCreation.ComState = state.state[0].State_Name;
      lDto.PartnerCreation.ComStateCode = state.state[0].mID;
      lDto.PartnerCreation.ComCountry = "INDIA";
    } else if (name === "office") {
      lDto.PartnerCreation.PerCityDistrict = v.mValue;
      const state = await getPincodeDetails(lMasters.dropdown.CityOf[0].City_ID);
      lDto.PartnerCreation.PerCityDistrictCode = lMasters.dropdown.CityOf[0].City_ID;
      lDto.PartnerCreation.PerState = state.state[0].State_Name;
      lDto.PartnerCreation.PerStateCode = state.state[0].mID;
      lDto.PartnerCreation.PerCountry = "INDIA";
    }
    setDto({ ...lDto });
  };
  const handleCheckOffice = (e) => {
    if (e.target.checked === true) {
      lMasters.dropdown.CityOf = lMasters.dropdown.City;
      lDto.PartnerCreation.IsCommuinAddSameasPermanentAdd = "Yes";
      lDto.PartnerCreation.PerAddressLine1 = lDto.PartnerCreation.CommAddressLine1;
      lDto.PartnerCreation.perAddressLine2 = lDto.PartnerCreation.CommAddressLine2;
      lDto.PartnerCreation.PerPincode = lDto.PartnerCreation.ComPincode;
      lDto.PartnerCreation.PerCityDistrict = lDto.PartnerCreation.ComCityDistrict;
      lDto.PartnerCreation.PerCityDistrictCode = lDto.PartnerCreation.ComCityDistrictCode;
      lDto.PartnerCreation.PerState = lDto.PartnerCreation.ComState;
      lDto.PartnerCreation.PerStateCode = lDto.PartnerCreation.ComStateCode;
      lDto.PartnerCreation.PerCountry = lDto.PartnerCreation.ComCountrys;
    } else {
      lMasters.dropdown.CityOf = [];
      lDto.PartnerCreation.IsCommuinAddSameasPermanentAdd = "No";
      lDto.PartnerCreation.PerAddressLine1 = "";
      lDto.PartnerCreation.perAddressLine2 = "";
      lDto.PartnerCreation.PerPincode = "";
      lDto.PartnerCreation.PerCityDistrict = "";
      lDto.PartnerCreation.PerCityDistrictCode = "";
      lDto.PartnerCreation.PerState = "";
      lDto.PartnerCreation.PerStateCode = "";
      lDto.PartnerCreation.PerCountry = "";
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const handlePartnerIDS = (e, v, name) => {
    if (name === "PartnerType") {
      lDto.PartnerCreation.PartnerType = v.mValue;
      lDto.PartnerCreation.PartnerTypeId = v.mID;
    } else if (name === "PartnerClass") {
      lDto.PartnerCreation.PartnerClass = v.mValue;
      lDto.PartnerCreation.PartnerClassID = v.mID;
    } else if (name === "Salutation") {
      lDto.PartnerCreation.Salutation = v.mValue;
      lDto.PartnerCreation.SalutationID = v.mID;
    }
    setDto({ ...lDto });
  };
  const handlesavePartner = async (flag) => {
    if (flag === true) {
      const responseData = await CreatePartnerApi(lDto.PartnerCreation);
      console.log("Create partner", responseData);
      lMasters.flag.open = true;
      setMasters({ ...lMasters });
    } else {
      swal({ icon: "error", text: "Please Fill requried field" });
    }
  };

  const Data = [
    {
      PartnerDetailsData: [
        {
          label: "Partner Name",
          type: "Input",
          visible: true,
          required: true,
          path: `PartnerCreation.PartnerName`,
          spacing: 2.7,
          validationId: 1,
          onChangeFuncs: ["IsAlphaSpace"],
        },
        {
          label: "Partner Type",
          type: "AutoComplete",
          visible: true,
          Option: [],
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.PartnerType`,
          options: Masters.dropdown.PartnerType,
          validationId: 1,
          customOnChange: (e, v) => handlePartnerIDS(e, v, "PartnerType"),
        },
        {
          label: "Partner Class",
          type: "AutoComplete",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.PartnerClass`,
          options: lMasters.dropdown.PartnerClass,
          validationId: 1,
          customOnChange: (e, v) => handlePartnerIDS(e, v, "PartnerClass"),
        },
        {
          label: "Salutation",
          type: "AutoComplete",
          visible: true,
          required: true,
          options: lMasters.dropdown.Salutation,
          spacing: 2.7,
          path: `PartnerCreation.Salutation`,
          validationId: 1,
          customOnChange: (e, v) => handlePartnerIDS(e, v, "Salutation"),
        },
        {
          type: "Input",
          label: "Telephone",
          visible: true,
          spacing: 2.7,
          path: `PartnerCreation.Telphone`,
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
          path: `PartnerCreation.Mobile`,
          validationId: 1,
        },
        {
          type: "Input",
          label: "Email",
          visible: true,
          required: true,
          onBlurFuncs: [IsEmail],
          spacing: 2.7,
          path: `PartnerCreation.Email`,
          validationId: 1,
        },
        {
          type: "Input",
          label: "Website",
          visible: true,
          spacing: 2.7,
          path: `PartnerCreation.Website`,
        },
        {
          type: "Input",
          label: "Partner Code",
          visible: true,
          spacing: 2.7,
          path: `PartnerCreation.PartnerCode`,
        },
        {
          label: "Branch Name",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.BranchName`,
          validationId: 1,
          disabled: true,
        },
        {
          label: "Sales Person Name",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.SalespersonName`,
          validationId: 1,
          disabled: true,
        },
        {
          label: "Sales Person Code",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.SalespersonCode`,
          validationId: 1,
          disabled: true,
        },
        {
          label: "PAN No",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.Pan`,
          validationId: 1,
          onBlurFuncs: ["IsPanNo"],
        },
        {
          label: "GST No",
          type: "Input",
          visible: true,
          required: true,
          spacing: 2.7,
          path: `PartnerCreation.GSTINNo`,
          validationId: 1,
          onBlurFuncs: ["IsGstNo"],
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
          validationId: 1,
          path: `PartnerCreation.CommAddressLine1`,
        },
        {
          type: "Input",
          label: "Address2",
          visible: true,
          spacing: 2.7,
          path: `PartnerCreation.CommAddressLine2`,
        },
        {
          type: "Input",
          label: "Pincode",
          visible: true,
          required: true,
          validationId: 1,
          InputProps: { maxLength: 6 },
          spacing: 2.7,
          path: `PartnerCreation.ComPincode`,
          onChangeFuncs: ["IsNumeric"],
          customOnChange: (e) => handlePincode(e, "comm"),
        },
        {
          type: "AutoComplete",
          label: "City",
          visible: true,
          required: true,
          options: lMasters.dropdown.City,
          spacing: 2.7,
          validationId: 1,
          path: `PartnerCreation.ComCityDistrict`,
          customOnChange: (e, v) => handleCity(e, v, "comm"),
        },

        {
          type: "Input",
          label: "State",
          required: true,
          visible: true,
          spacing: 2.7,
          disabled: true,
          onChangeFuncs: ["IsAlpha"],
          path: `PartnerCreation.ComState`,
        },
        {
          type: "Input",
          label: "Country",
          required: true,
          visible: true,
          disabled: true,
          spacing: 2.7,
          onChangeFuncs: ["IsAlpha"],
          path: `PartnerCreation.ComCountry`,
        },
        {
          type: "Checkbox",
          visible: true,
          label: "Office Address is same as Communication Address?",
          checkedVal: "Yes",
          unCheckedVal: "No",
          customOnChange: (e) => handleCheckOffice(e),
          path: "PartnerCreation.IsCommuinAddSameasPermanentAdd",
          spacing: 12,
        },
      ],
    },
    {
      OfficeAddressData: [
        {
          type: "Input",
          label: "Address1",
          required: true,
          visible: true,
          spacing: 2.7,
          path: `PartnerCreation.PerAddressLine1`,
          validationId: 1,
        },
        {
          type: "Input",
          label: "Address2",
          visible: true,
          spacing: 2.7,
          path: `PartnerCreation.perAddressLine2`,
        },
        {
          type: "Input",
          label: "Pincode",
          visible: true,
          required: true,
          InputProps: { maxLength: 6 },
          spacing: 2.7,
          path: `PartnerCreation.PerPincode`,
          validationId: 1,
          customOnChange: (e) => handlePincode(e, "office"),
        },
        {
          type: "AutoComplete",
          label: "City",
          visible: true,
          required: true,
          spacing: 2.7,
          validationId: 1,
          path: `PartnerCreation.PerCityDistrict`,
          options: lMasters.dropdown.CityOf,
          customOnChange: (e, v) => handleCity(e, v, "office"),
        },

        {
          type: "Input",
          label: "State",
          required: true,
          visible: true,
          spacing: 2.7,
          disabled: true,
          onChangeFuncs: ["IsAlpha"],
          path: `PartnerCreation.PerState`,
        },
        {
          type: "Input",
          label: "Country",
          required: true,
          visible: true,
          spacing: 2.7,
          onChangeFuncs: ["IsAlpha"],
          path: `PartnerCreation.PerCountry`,

          disabled: true,
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
          label: "Save",
          type: "ValidationControl",
          subType: "Button",
          visible: true,
          spacing: 1,
          validationId: 1,
          onClick: handlesavePartner,
        },
      ],
    },
  ];
  const accordians = [
    {
      label: "Partner Details ",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: "Communication Address",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
    {
      label: "Office Address",
      visible: true,
      sx: { boxShadow: "unset", border: "unset", "&:before": { display: "none" } },
    },
  ];
  const modelClose = () => {
    lMasters.flag.open = false;
    setMasters({ ...lMasters });
    console.log("Partner", lDto.PartnerCreation);
  };
  const midValidationCheck = (validationId) => {
    let validationFlag = true;
    Data.forEach((section) => {
      section[Object.keys(section)[0]].forEach((x2) => {
        if (
          x2.visible === true &&
          x2.validationId === validationId &&
          x2.type !== "ValidationControl"
        ) {
          const val = get(lDto, x2.path);
          if (val === "" || val === undefined) validationFlag = false;
        }
      });
    });
    if (validationFlag === false) {
      lMasters.flag.midNextValidationId = 1;
      lMasters.flag.nextflag = true;
    } else {
      lMasters.flag.midNextValidationId = -1;
      lMasters.flag.nextflag = false;
    }
    setMasters({ ...lMasters });
    return validationFlag;
  };
  return (
    <Card>
      <Grid item xs={12} ml={5}>
        Partners
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
                          dto={lDto}
                          setDto={setDto}
                          nextFlag={lMasters.flag.nextflag}
                          onMidNextValidation={midValidationCheck}
                          midNextValidationId={lMasters.flag.midNextValidationId}
                        />
                      </Grid>
                    ) : null
                  )
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Modal
        open={lMasters.flag.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        align="center"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MDBox align-item="center" sx={modelStyle}>
          <IconButton
            aria-label="Close"
            onClick={() => modelClose()}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={1}>
              <MDTypography variant="body1" fontWeight="bold" color="success">
                Parnter Created Suceessfully!
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={1}>
              <MDTypography variant="body1" fontWeight="bold">
                Parnter Name :&nbsp;&nbsp;USGI
              </MDTypography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={1}>
            <MDButton variant="outlined" onClick={modelClose}>
              Close
            </MDButton>
          </Grid>
        </MDBox>
      </Modal>
    </Card>
  );
}

export default CreatePartners;
