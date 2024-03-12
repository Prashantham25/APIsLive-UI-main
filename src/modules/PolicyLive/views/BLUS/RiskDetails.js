import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Checkbox,
  FormGroup,
  Autocomplete,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import swal from "sweetalert";
import CloseIcon from "@mui/icons-material/CancelRounded";

import MDButton from "../../../../components/MDButton";
// import RiskDetailsMaster from "./data/RiskDetailsDataBind";
import {
  // getState,
  // getDistrict,
  callPremiumMethod,
  GetBLUSBSUSMasters,
  // getZoneByPincode,
} from "./data/index";
import { postRequest, getRequest } from "../../../../core/clients/axiosclient";
// import data from "./JsonData";
import { callSaveQuoteMethod, callUpdateQuoteMethod, fetchVericalData } from "../Home/data/index";

function RiskDetails({
  PolicyDto,
  setPolicyDto,
  handleNext,
  setRatingData,
  setMaster,
  master,
  // ratingData,
  rowsID,
  setRowsID,
  addLoc,
  setaddLoc,
  setRiskPincode,
  riskPincode,
}) {
  const {
    AgeOfBuildingBLUSBSUS,
    RiskTerrainBLUSBSUS,
    HouseKeepingBLUSBSUS,
    StockExposureBLUSBSUS,
    DstPublicFireBrigade,
    ClientBusinessExperiance,
    TypeOfConstructionBLUSBSUS,
    ClaimsRationBLUSBSUS,
    FireProtection,
    PastFlooding,
    BasementExposure,
    ClaimExperience,
    OccupancyBLUSBSUS,
  } = GetBLUSBSUSMasters().blusMaster.Masters;
  const { search } = useLocation();
  const quoteNoo = new URLSearchParams(search).get("quotationno");
  const LPolicyDto = PolicyDto;
  const masterArray = master;
  const addLocation = addLoc;
  console.log("12345", master);
  const [riskError, setRiskError] = useState(false);
  const [flags, setFlags] = useState({
    emailflag: false,
    mobileFlag: false,
  });
  const [loading, setLoading] = useState(false);

  // const [LocRadioFlag, setLocRadioFlag] = React.useState(true);
  // const [addLocFlag, setaddlocFlag] = React.useState(false);
  const handleChannel = (ProductCode) => {
    getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
      async (result) => {
        console.log("result", result);
        const { partnerId } = result.data.userDetails[0];
        await getRequest(
          `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
            "userId"
          )}&productCode=${ProductCode}`
        ).then(async (res) => {
          console.log("qwertyuiop", res);
          const partnerDetailssss = res.data.additionalDetails;
          console.log("123456789", partnerDetailssss);
          const partnerDetail = JSON.parse(partnerDetailssss);
          const { Channel } = LPolicyDto;
          Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
          Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
          Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
          Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
          Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
          Channel.AgentContactNo = partnerDetail.Mobile;
          Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
          Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
          Channel.PrimaryVerticalCode = partnerDetail.AdditionalDetails.PrimaryVerticalCode;
          const res1 = await fetchVericalData("782", "VerticalName", {});
          Channel.PrimaryVerticalName =
            partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
              ? res1.filter(
                  (x) =>
                    x.VerticalCode ===
                    partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
                )[0].mValue
              : partnerDetail.AdditionalDetails.PrimaryVerticalName;
          Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
          Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
          Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
          Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
          Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
          Channel.DealId = partnerDetail.AdditionalDetails.DealId;
          LPolicyDto["Agent Id"] = partnerDetail.AdditionalDetails.IntermediaryCode;
          setPolicyDto({ ...LPolicyDto });
          setPolicyDto((prev) => ({ ...prev, Channel }));
        });
      }
    );
  };
  const handleSetRadio = (e) => {
    if (e.target.name === "SubProduct") {
      LPolicyDto[e.target.name] = e.target.value;
      if (e.target.value === "BSUS") {
        LPolicyDto.GCProductCode = "2125";
        LPolicyDto.GCProductName = "UNIVERSAL SOMPO - BHARAT SUKHSHMA UDYAM SURAKSHA";
        LPolicyDto.ProductName = "BHARAT SUKHSHMA UDYAM SURAKSHA";
        // LPolicyDto = data;
        handleChannel(LPolicyDto.GCProductCode);
      } else {
        LPolicyDto.GCProductCode = "2124";
        LPolicyDto.GCProductName = "UNIVERSAL SOMPO - BHARAT LAGHU UDYAM SURAKSHA";
        LPolicyDto.ProductName = "BHARAT LAGHU UDYAM SURAKSHA";
        handleChannel(LPolicyDto.GCProductCode);
        // LPolicyDto = data;
      }
    }
    if (e.target.name === "TransactionType") {
      LPolicyDto[e.target.name] = e.target.value;
    }
    if (e.target.name === "Location") {
      LPolicyDto[e.target.name] = e.target.value;
    }
    if (e.target.name === "FloaterforStock") {
      LPolicyDto[e.target.name] = e.target.value;
    }
    if (e.target.name === "DeclarationforStock") {
      LPolicyDto[e.target.name] = e.target.value;
    }
    setPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
  };
  const theme = createTheme({
    status: {
      danger: "#c70825",
      outline: grey[500],
    },
  });
  const CustomRadio = styled(Radio)(() => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  // const addLocation = () => {
  //   // counter = +1;
  //   // setCounter(counter + 1);
  //   // console.log(counter);
  //   // if (counter < 10) {
  //   setaddlocFlag(true);
  //   setLocRadioFlag(false);
  //   // } else setaddlocFlag(false);
  // };

  const handleSetAutoComplete = (e, type, values) => {
    console.log("567", type);

    if (
      type === "PastFlooding" ||
      type === "BasementExposure" ||
      type === "ClaimExperience" ||
      type === "AgeofBuilding" ||
      type === "HousekeepingType" ||
      type === "ClaimsRatio" ||
      type === "RiskTerrain" ||
      type === "StockExposure" ||
      type === "Distancefrompublicfirebrigade" ||
      type === "ClientsBusinessExperience" ||
      type === "TypeofConstruction"
    ) {
      masterArray[type] = values;
      LPolicyDto[type] = values.mValue;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    } else if (type === "FireProtection") {
      masterArray[type] = values;
      LPolicyDto[type] = values.TypeCode;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    } else if (type === "Occupancy") {
      masterArray[type] = values;
      LPolicyDto[type] = values.TypeCode;
      LPolicyDto.OccupancyType = values.mValue;
      LPolicyDto.OccupancyWarrenty = values.Warrenty === "" ? "N/A" : values.Warrenty;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    }
  };

  const handleSetChange = (e) => {
    if (e.target.name === "ProposerName") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
          LPolicyDto.ProposerDetails.Name = e.target.value;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    } else if (e.target.name === "InsuredMobileNo") {
      if (e.target.value.length < 11) {
        const mobileRegex = /^[6-9]\d{1}[0-9]\d{8}$/;
        if (!mobileRegex.test(e.target.value) || e.target.value === "") {
          LPolicyDto[e.target.name] = e.target.value;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    } else if (e.target.name === "EmailID") {
      if (e.target.value.length < 50) {
        // const mobileRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
        // if (!mobileRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "TotalSumInsuredProposed") {
      if (e.target.value.length < 20) {
        const SumRegex = /^[0-9]*$/;
        if (SumRegex.test(e.target.value) || e.target.value === "") {
          LPolicyDto[e.target.name] = e.target.value;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    } else if (e.target.name === "Loading") {
      if (e.target.value.length < 20) {
        const PreRegex = /^[0-9]*$/;
        if (PreRegex.test(e.target.value) || e.target.value === "") {
          LPolicyDto[e.target.name] = e.target.value;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    }
  };
  const handleSetProposer = (e) => {
    if (e.target.name === "QuoteEmail") {
      if (e.target.value.length < 50) {
        LPolicyDto[e.target.name] = e.target.value;
        LPolicyDto.ProposerDetails.EmailId = e.target.value;
        LPolicyDto.ProposerDetails["Email ID"] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
        // }
      }
    } else if (e.target.name === "QuoteMobileNo") {
      if (e.target.value.length < 11) {
        const mobileRegex = /^[0-9]*$/;
        if (mobileRegex.test(e.target.value) || e.target.value === "") {
          LPolicyDto[e.target.name] = e.target.value;
          LPolicyDto.ProposerDetails.MobileNo = e.target.value;
          LPolicyDto.ProposerDetails["Mobile Number"] = e.target.value;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    }
  };

  const handlecheck = (e) => {
    let newValue;
    if (e.target.checked === true) {
      newValue = { ...PolicyDto, [e.target.name]: "Yes" };
    } else {
      newValue = { ...PolicyDto, [e.target.name]: "No" };
    }
    setPolicyDto(newValue);
  };

  const handleAddon = (e) => {
    if (e.target.name === "Accidental Damage") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherCovers[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Protection and Preservation") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherCovers[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Additional Removal Debris") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherCovers[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Involuntary Betterment") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherCovers[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Escalation Clause") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherCovers[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Loss of Rent") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherCovers[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Extra Expenses") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherCovers[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Cost of Clearing Drains") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto.OtherCovers[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    }
  };

  const [addLocFlag, setAddLocFlag] = useState(false);
  const [disableProceed, setDisableProceed] = useState(false);
  const [error, setError] = useState(false);
  const [totalSIError, setTotalSIError] = useState(false);
  console.log("totalSIError", totalSIError);
  const [nstpError, setNstpError] = useState(false);
  // const [TotalSum, setTotalSum] = useState({
  //   BuildingSI: 0,
  //   PlantandMachinerySI: 0,
  //   FurnitureFixtureandFittingsSI: 0,
  //   OtherContentSI: 0,
  //   RawMaterialSI: 0,
  //   StockinProgressSI: 0,
  //   FinishedStockSI: 0,
  // });
  // const [removeLoc, setRemoveLoc] = useState(true);

  useEffect(() => {
    if (addLocation.length > 1 && LPolicyDto.Location === "Single") {
      const removeLocation = addLocation.filter((x, i) => i === 0);
      setRowsID(removeLocation.length);
      setaddLoc(removeLocation);
    }
  }, [addLocation?.length > 1, LPolicyDto?.Location === "Single"]);

  useEffect(() => {
    if (LPolicyDto.SubProduct === "BSUS") {
      addLocation.forEach((x) => {
        if (x.Total !== 0) {
          const total =
            Number(x.SumInsuredBifurcation["Finished Stock"]) +
            Number(x.SumInsuredBifurcation["Stock in Progress"]);
          const percentOfTOtal = (60 / 100) * x.Total;
          if (x.Total > 50000000) {
            setError(true);
          } else {
            setError(false);
          }
          if (total > percentOfTOtal) {
            setNstpError(true);
          } else {
            setNstpError(false);
          }
          if (x.Total > 50000000 || total > percentOfTOtal) {
            setAddLocFlag(true);
            setDisableProceed(true);
          } else {
            setAddLocFlag(false);
            setDisableProceed(false);
          }
        }
      });
    }
    if (LPolicyDto.SubProduct === "BLUS") {
      addLocation.forEach((x) => {
        if (x.Total !== 0) {
          const total =
            Number(x.SumInsuredBifurcation["Finished Stock"]) +
            Number(x.SumInsuredBifurcation["Stock in Progress"]);
          const percentOfTOtal = (60 / 100) * x.Total;
          if (x.Total < 50000000 || x.Total > 500000000) {
            setError(true);
          } else {
            setError(false);
          }
          if (total > percentOfTOtal) {
            setNstpError(true);
          } else {
            setNstpError(false);
          }
          if (x.Total < 50000000 || x.Total > 500000000 || total > percentOfTOtal) {
            setAddLocFlag(true);
            setDisableProceed(true);
          } else {
            setAddLocFlag(false);
            setDisableProceed(false);
          }
        }
      });
    }
    // debugger;
  }, [addLocation, LPolicyDto?.SubProduct]);

  useEffect(() => {
    if (
      LPolicyDto.ClearingDrains === "Yes" &&
      LPolicyDto.OtherCovers["Cost of Clearing Drains"] !== ""
    ) {
      const total = (10 / 100) * Number(PolicyDto.OtherCovers["Cost of Clearing Drains"]);
      if (total > PolicyDto.TotalSumInsuredProposed) {
        setNstpError(true);
        setDisableProceed(true);
      } else {
        setNstpError(false);
        setDisableProceed(false);
      }
    }
  }, [LPolicyDto?.ClearingDrains === "Yes", LPolicyDto?.OtherCovers["Cost of Clearing Drains"]]);

  const handlecounter = () => {
    // setRemoveLoc(false);
    if (addLocation.some((x) => x.Total === 0)) {
      swal({
        icon: "error",
        text: "Please fill all the fields in grid",
      });
    } else {
      console.log("1234567890");
      if (addLocation.length < 10) {
        console.log("1234567890");
        if (addLocation.length === 10) {
          setAddLocFlag(true);
        }
        setaddLoc([
          ...addLocation,
          {
            id: rowsID + 1,
            cancelFlag: true,
            Pincode: "",
            State: "",
            City: "",
            Address1: "",
            Address2: "",
            GSTNo: "",
            Total: 0,
            TariffZone: "",
            SumInsuredBifurcation: {
              Building: "",
              "Plant and Machinery": "",
              "Furniture Fixture and Fittings": "",
              "Other Content": "",
              "Raw Material": "",
              "Stock in Progress": "",
              "Finished Stock": "",
              "Other Contents Please Specify": "",
            },
          },
        ]);
        setRowsID(rowsID + 1);
      } else {
        setAddLocFlag(true);
        swal({
          icon: "error",
          text: "Cannot add more than 10 locations",
        });
      }
    }
  };

  const handleRemoveLoc = ({ param }) => {
    const index = param.api.getRowIndex(param.row.id);
    console.log("1234", index);
    if (addLocation.length === 1) {
      // setRemoveLoc(true);
    } else {
      // setRemoveLoc(false);
      // const copyAddLoc = [...addLocation];
      // copyAddLoc.pop();
      const copyAddLoc = addLocation.filter((x, i) => i !== index);
      // const newValue = copyAddLoc.splice(-1, 1);
      setaddLoc(copyAddLoc);
      // console.log("1234567890", newValue);
      setRowsID(addLocation.length);
    }
  };

  const getPincodeDetails = async (pincodeValue) => {
    const ProductId = 782;
    const getPincodeDistrictStateData = async (type, id) => {
      const urlString = `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${type}`;
      let payload;
      switch (type) {
        case "State":
          payload = { State_Code: id };
          break;
        case "District":
          payload = { District_ID_PK: id };
          break;
        case "City":
          payload = { City_ID: id };
          break;
        case "Pincode":
          payload = { Pincode: id };
          break;
        default:
          break;
      }

      const dataValue = await (await postRequest(urlString, payload)).data;
      return dataValue;
    };

    // const pincodeData = await getPincodeDistrictStateData("Pincode", pincodeValue);

    const city = await getPincodeDistrictStateData("City", pincodeValue);

    const district = await getPincodeDistrictStateData("District", city[0].DistrictID);

    const state = await getPincodeDistrictStateData("State", city[0].State_CD);

    return { city, district, state };
  };

  const onLocaionDetails = async ({ e, param }) => {
    console.log("3", addLoc);
    console.log("LocDetailsRow", addLocation);
    const index = param.api.getRowIndex(param.row.id);
    console.log("1234567890", index);
    // const name = [e.target.name];
    // addLocation[index][e.target.name] = e.target.value;
    // LPolicyDto.InsurableItem[0].RiskItems = addLocation;
    // // setaddLoc([...addLocation]);
    // setPolicyDto({ ...LPolicyDto });
    if (e.target.name === "Pincode") {
      if (e.target.value.length < 7) {
        const PinRegex = /^[0-9]{0,6}$/;
        if (PinRegex.test(e.target.value) || e.target.value === "") {
          const name = [e.target.name];
          addLocation[index][name] = e.target.value;
          setaddLoc([...addLocation]);

          console.log("addLocdata", addLoc);
          // LPolicyDto.InsurableItem[0].RiskItems = addLocation;
          // setPolicyDto((prevState) => ({
          //   ...prevState,
          //   ...LPolicyDto,
          // }))
        }
        if (addLocation[index].Pincode.length === 6) {
          const obj = { Pincode: addLocation[index].Pincode };
          await postRequest(
            `Product/GetProdPartnermasterData?ProductId=782&MasterType=PinCode`,
            obj
          ).then((res) => {
            if (res.data.length > 0) {
              setRiskPincode(res.data);
            } else {
              addLocation[index].Pincode = "";

              setaddLoc([...addLocation]);
              swal({
                text: "Data not found for this Pincode.Please enter a valid pincode",
                icon: "error",
              });
            }
          });
        }
      }
    } else if (e.target.name === "Building") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        addLocation[index].SumInsuredBifurcation[e.target.name] = e.target.value;
        addLocation[index].Total =
          Number(addLocation[index].SumInsuredBifurcation.Building) +
          Number(addLocation[index].SumInsuredBifurcation["Furniture Fixture and Fittings"]) +
          Number(addLocation[index].SumInsuredBifurcation["Plant and Machinery"]) +
          Number(addLocation[index].SumInsuredBifurcation["Raw Material"]) +
          Number(addLocation[index].SumInsuredBifurcation["Stock in Progress"]) +
          Number(addLocation[index].SumInsuredBifurcation["Finished Stock"]) +
          Number(addLocation[index].SumInsuredBifurcation["Other Content"]);
        setaddLoc([...addLocation]);
      }
    } else if (e.target.name === "Furniture Fixture and Fittings") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        addLocation[index].SumInsuredBifurcation[e.target.name] = e.target.value;
        addLocation[index].Total =
          Number(addLocation[index].SumInsuredBifurcation.Building) +
          Number(addLocation[index].SumInsuredBifurcation["Furniture Fixture and Fittings"]) +
          Number(addLocation[index].SumInsuredBifurcation["Plant and Machinery"]) +
          Number(addLocation[index].SumInsuredBifurcation["Raw Material"]) +
          Number(addLocation[index].SumInsuredBifurcation["Stock in Progress"]) +
          Number(addLocation[index].SumInsuredBifurcation["Finished Stock"]) +
          Number(addLocation[index].SumInsuredBifurcation["Other Content"]);
        setaddLoc([...addLocation]);
      }
    } else if (e.target.name === "Plant and Machinery") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        addLocation[index].SumInsuredBifurcation[e.target.name] = e.target.value;
        addLocation[index].Total =
          Number(addLocation[index].SumInsuredBifurcation.Building) +
          Number(addLocation[index].SumInsuredBifurcation["Furniture Fixture and Fittings"]) +
          Number(addLocation[index].SumInsuredBifurcation["Plant and Machinery"]) +
          Number(addLocation[index].SumInsuredBifurcation["Raw Material"]) +
          Number(addLocation[index].SumInsuredBifurcation["Stock in Progress"]) +
          Number(addLocation[index].SumInsuredBifurcation["Finished Stock"]) +
          Number(addLocation[index].SumInsuredBifurcation["Other Content"]);
        setaddLoc([...addLocation]);
      }
    } else if (e.target.name === "Raw Material") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        addLocation[index].SumInsuredBifurcation[e.target.name] = e.target.value;
        addLocation[index].Total =
          Number(addLocation[index].SumInsuredBifurcation.Building) +
          Number(addLocation[index].SumInsuredBifurcation["Furniture Fixture and Fittings"]) +
          Number(addLocation[index].SumInsuredBifurcation["Plant and Machinery"]) +
          Number(addLocation[index].SumInsuredBifurcation["Raw Material"]) +
          Number(addLocation[index].SumInsuredBifurcation["Stock in Progress"]) +
          Number(addLocation[index].SumInsuredBifurcation["Finished Stock"]) +
          Number(addLocation[index].SumInsuredBifurcation["Other Content"]);
        setaddLoc([...addLocation]);
      }
    } else if (e.target.name === "Stock in Progress") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        addLocation[index].SumInsuredBifurcation[e.target.name] = e.target.value;
        addLocation[index].Total =
          Number(addLocation[index].SumInsuredBifurcation.Building) +
          Number(addLocation[index].SumInsuredBifurcation["Furniture Fixture and Fittings"]) +
          Number(addLocation[index].SumInsuredBifurcation["Plant and Machinery"]) +
          Number(addLocation[index].SumInsuredBifurcation["Raw Material"]) +
          Number(addLocation[index].SumInsuredBifurcation["Stock in Progress"]) +
          Number(addLocation[index].SumInsuredBifurcation["Finished Stock"]) +
          Number(addLocation[index].SumInsuredBifurcation["Other Content"]);
        setaddLoc([...addLocation]);
      }
    } else if (e.target.name === "Finished Stock") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        addLocation[index].SumInsuredBifurcation[e.target.name] = e.target.value;
        addLocation[index].Total =
          Number(addLocation[index].SumInsuredBifurcation.Building) +
          Number(addLocation[index].SumInsuredBifurcation["Furniture Fixture and Fittings"]) +
          Number(addLocation[index].SumInsuredBifurcation["Plant and Machinery"]) +
          Number(addLocation[index].SumInsuredBifurcation["Raw Material"]) +
          Number(addLocation[index].SumInsuredBifurcation["Stock in Progress"]) +
          Number(addLocation[index].SumInsuredBifurcation["Finished Stock"]) +
          Number(addLocation[index].SumInsuredBifurcation["Other Content"]);
        setaddLoc([...addLocation]);
      }
    } else if (e.target.name === "Other Content") {
      const AmoRegex = /^[0-9]*$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        addLocation[index].SumInsuredBifurcation[e.target.name] = e.target.value;
        addLocation[index].Total =
          Number(addLocation[index].SumInsuredBifurcation.Building) +
          Number(addLocation[index].SumInsuredBifurcation["Furniture Fixture and Fittings"]) +
          Number(addLocation[index].SumInsuredBifurcation["Plant and Machinery"]) +
          Number(addLocation[index].SumInsuredBifurcation["Raw Material"]) +
          Number(addLocation[index].SumInsuredBifurcation["Stock in Progress"]) +
          Number(addLocation[index].SumInsuredBifurcation["Finished Stock"]) +
          Number(addLocation[index].SumInsuredBifurcation["Other Content"]);
        setaddLoc([...addLocation]);
      }
    } else if (e.target.name === "Other Contents Please Specify") {
      const AmoRegex = /^[a-zA-Z\s]+$/;
      if (AmoRegex.test(e.target.value) || e.target.value === "") {
        addLocation[index].SumInsuredBifurcation[e.target.name] = e.target.value;
        addLocation[index].Total =
          Number(addLocation[index].SumInsuredBifurcation.Building) +
          Number(addLocation[index].SumInsuredBifurcation["Furniture Fixture and Fittings"]) +
          Number(addLocation[index].SumInsuredBifurcation["Plant and Machinery"]) +
          Number(addLocation[index].SumInsuredBifurcation["Raw Material"]) +
          Number(addLocation[index].SumInsuredBifurcation["Stock in Progress"]) +
          Number(addLocation[index].SumInsuredBifurcation["Finished Stock"]) +
          Number(addLocation[index].SumInsuredBifurcation["Other Content"]);
        setaddLoc([...addLocation]);
      }
    }
  };

  const onCityDetails = async (e, value, param) => {
    const index = param.api.getRowIndex(param.row.id);
    const data1 = await getPincodeDetails(value.City_ID);
    addLocation[index].City = value.mValue;
    addLocation[index].TariffZone = value.Zone === "null" ? "" : value.Zone;
    addLocation[index].State = data1.state[0].State_Name;
    setaddLoc([...addLocation]);
  };

  const columns = [
    {
      field: "Pincode",
      headerName: "Risk location Pincode",
      headerClassName: "super-app-theme--header",
      width: 200,
      headerAlign: "center",

      renderCell: (param) => (
        <MDInput
          required
          sx={{
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          }}
          name="Pincode"
          value={param.row.Pincode}
          onChange={(e) => {
            onLocaionDetails({ e, param });
          }}
          inputProps={{ maxLength: 6 }}
          error={param.row.Pincode === "" ? riskError : null}
        />
      ),
    },
    {
      field: "City",
      headerName: "City",
      headerClassName: "super-app-theme--header",
      width: 200,
      headerAlign: "center",
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
          name="City"
          options={riskPincode || []}
          value={{ mValue: param.row.City }}
          onChange={(e, value) => {
            onCityDetails(e, value, param);
          }}
          getOptionLabel={(option) => option.mValue}
          renderInput={(params) => <MDInput {...params} label="City" />}
        />
      ),
    },
    {
      field: "BuildingSI",
      headerName: "Building SI",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (param) => (
        <MDInput
          name="Building"
          value={param.row.SumInsuredBifurcation.Building}
          onChange={(e) => {
            onLocaionDetails({ e, param });
          }}
        />
      ),
    },

    {
      field: "PlantandMachinerySI",
      headerName: "Plan and Machinery SI",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (param) => (
        <MDInput
          name="Plant and Machinery"
          value={param.row.SumInsuredBifurcation["Plant and Machinery"]}
          onChange={(e) => {
            onLocaionDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "FurnitureFurnitureandFittingsSI",
      headerName: "Furniture,Fixtures and Fittings SI",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 290,
      renderCell: (param) => (
        <MDInput
          name="Furniture Fixture and Fittings"
          value={param.row.SumInsuredBifurcation["Furniture Fixture and Fittings"]}
          onChange={(e) => {
            onLocaionDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "RawMaterialSI",
      headerName: "Raw material SI",
      headerAlign: "center",
      headerClassName: "super-app-theme--header",
      width: 200,
      renderCell: (param) => (
        <MDInput
          name="Raw Material"
          value={param.row.SumInsuredBifurcation["Raw Material"]}
          onChange={(e) => {
            onLocaionDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "StockinProgressSI",
      headerName: "Stock in progress SI ",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (param) => (
        <MDInput
          name="Stock in Progress"
          value={param.row.SumInsuredBifurcation["Stock in Progress"]}
          onChange={(e) => {
            onLocaionDetails({ e, param });
          }}
        />
      ),
    },

    {
      field: "FinishedStockSI",
      headerName: "Finished stock SI",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (param) => (
        <MDInput
          name="Finished Stock"
          value={param.row.SumInsuredBifurcation["Finished Stock"]}
          onChange={(e) => {
            onLocaionDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "OtherContentsPleaseSpecify",
      headerName: "Other Content(Specify)",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      renderCell: (param) => (
        <MDInput
          name="Other Contents Please Specify"
          value={param.row.SumInsuredBifurcation["Other Contents Please Specify"]}
          onChange={(e) => {
            onLocaionDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "OtherContentSI",
      headerName: "Other Contents SI",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: (param) => (
        <MDInput
          name="Other Content"
          value={param.row.SumInsuredBifurcation["Other Content"]}
          onChange={(e) => {
            onLocaionDetails({ e, param });
          }}
        />
      ),
    },
    {
      field: "TotalSI",
      headerName: "Total SI",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      renderCell: (param) => (
        <MDInput
          name="TotalSI"
          value={param.row.Total}
          // value={param.row.total}
          // onChange={(e) => {
          //   onLocaionDetails({ e, param });
          // }}
        />
      ),
    },
    {
      field: "Remove",
      headerName: "",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
      renderCell: (param) =>
        param.row.cancelFlag === true ? (
          <CloseIcon
            onClick={() => handleRemoveLoc({ param })}
            color="primary"
            sx={{ cursor: "pointer" }}
          />
        ) : null,
    },
  ];

  useEffect(() => {
    let total = 0;
    addLocation.forEach((item) => {
      total += item.Total;
    });
    LPolicyDto.TotalSumInsuredProposed = total;

    setPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
    if (
      LPolicyDto.TotalSumInsuredProposed < 500000 ||
      LPolicyDto.TotalSumInsuredProposed > 50000000
    ) {
      setTotalSIError(true);
    } else {
      setTotalSIError(false);
    }
    console.log("total", total);
  }, [addLocation]);

  // useEffect(() => {
  //   if (Object.keys(ratingData).length > 0) {

  // }, [ratingData]);

  const callPremiumData = async () => {
    await callPremiumMethod(PolicyDto).then(async (result) => {
      console.log("Premium Called", result);
      if (result.status === 1) {
        LPolicyDto.PremiumDetails.SGST = Number(result.finalResult.BLSUSGIRatingNew01.SGSTSum)
          .toFixed(0)
          .toString();
        LPolicyDto.PremiumDetails.CGST = Number(result.finalResult.BLSUSGIRatingNew01.CGSTSum)
          .toFixed(0)
          .toString();
        LPolicyDto.PremiumDetails["Net Premium"] = Number(
          result.finalResult.BLSUSGIRatingNew01.NetPremiumSum
        )
          .toFixed(0)
          .toString();
        LPolicyDto.PremiumDetails["Long term"] = Number(
          result.finalResult.BLSUSGIRatingNew01.NetPremiumSum
        )
          .toFixed(0)
          .toString();
        LPolicyDto.PremiumDetails["Total with Tax"] = Number(
          result.finalResult.BLSUSGIRatingNew01.FinalPremiumSum
        )
          .toFixed(0)
          .toString();
        let TotalPremiumExcTerrorism = 0;
        let TotalTerrorismPremium = 0;
        let TotalFirePremium = 0;
        const premiumArray = result.finalResult.BLSUSGIRatingNew01.output.map((x) => {
          const obj = {
            TerrorismPremium: Number(x.TerrorismPremium).toFixed(0).toString(),
            EarthquakePremium: Number(x.EarthquakePremium).toFixed(0).toString(),
            STFIPremium: Number(x.STFIPremium).toFixed(0).toString(),
            BaseFirePremium: Number(x.BaseFirePremium).toFixed(0).toString(),
            STFIDiscountedRate: Number(x.STFIDiscountedRate).toFixed(0).toString(),
            BaseDiscountedRate: Number(x.BaseDiscountedRate).toFixed(0).toString(),
            EQDiscountedRate: Number(x.EQDiscountedRate).toFixed(0).toString(),
            TerrorismDiscountedRate: Number(x.TerrorismDiscountedRate).toFixed(0).toString(),
            PremiumExcTerrorism: Number(x.PremiumExcTerrorism).toFixed(0).toString(),
            TotalAddOnPremium: Number(x.TotalAddOnPremium).toFixed(0).toString(),
            "Net Premium": Number(x.NetPremium).toFixed(0).toString(),
            SGST: Number(x.SGST).toFixed(0).toString(),
            CGST: Number(x.CGST).toFixed(0).toString(),
            "Total with Tax": Number(x.FinalPremium).toFixed(0).toString(),
            GCBasewithLoadingPremium: Number(x.GCLoadingBasePremiumBsusBlus).toFixed().toString(),
          };
          if (obj.TerrorismPremium !== "0" && obj.TerrorismDiscountedRate !== "0") {
            obj.TerrorismCover = "True";
          } else if (obj.EarthquakePremium !== "0" && obj.EQDiscountedRate !== "0") {
            obj.EarthquakeCover = "True";
          } else if (obj.STFIPremium !== "0" && obj.STFIDiscountedRate !== "0") {
            obj.STFICover = "True";
          } else if (obj.BaseFirePremium !== "0" && obj.BaseDiscountedRate !== "0") {
            obj.BaseFireCover = "True";
          } else {
            obj.TerrorismCover = "False";
            obj.STFICover = "False";
            obj.EarthquakeCover = "False";
            obj.BaseFireCover = "False";
          }
          TotalPremiumExcTerrorism += Number(x.PremiumExcTerrorism);
          TotalTerrorismPremium += Number(x.TerrorismPremium);
          const total =
            Number(x.BaseFirePremium) +
            Number(x.STFIPremium) +
            Number(x.EarthquakePremium) +
            Number(x.TotalAddOnPremium);
          TotalFirePremium += total;
          return obj;
        });
        LPolicyDto.PremiumDetails.TotalPremiumExcTerrorism =
          TotalPremiumExcTerrorism.toFixed(0).toString();
        LPolicyDto.PremiumDetails.TotalFirePremium = TotalFirePremium.toFixed(0).toString();
        LPolicyDto.PremiumDetails.TotalTerrorismPremium =
          TotalTerrorismPremium.toFixed(0).toString();
        LPolicyDto.PremiumDetails.AdditionalPremiumDetails = premiumArray;
        setPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
        //  LPolicyDto.permiumamount = result.finalResult.FinalPremium;
        setRatingData({ ...result.finalResult });
        if (quoteNoo !== null || LPolicyDto["Quotation No"] !== "") {
          await callUpdateQuoteMethod(LPolicyDto);
        } else {
          await callSaveQuoteMethod(LPolicyDto).then(async (results) => {
            if (results.data.quotation.quoteNo !== "") {
              LPolicyDto.QuoteNo = results.data.quotation.quoteNo;
              LPolicyDto["Quotation No"] = results.data.quotation.quoteNo;
              const obj = {
                ...LPolicyDto,
                "Quotation No": results.data.quotation.quoteNo,
              };
              await callUpdateQuoteMethod(obj);
              setPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
            }
          });
        }
        setLoading(false);
        // setPolicyDto((prev)=>({...prev,...LonNextPolicyDto}));
      }
    });
  };
  // const busssprofile = "Business Profile";

  const onNext = async () => {
    const returnedObject = addLocation.map((x) => {
      const riskKey = Object.keys(x.SumInsuredBifurcation);
      const BifurcationData = riskKey.map((item) => {
        const Obj = {
          RiskType: item,
          SI: x.SumInsuredBifurcation[item],
        };
        return Obj;
      });
      return {
        ...x,
        SumInsuredBifurcation: BifurcationData,
      };
    });

    const otherCoverKeys = Object.keys(LPolicyDto.OtherCovers);
    const returnedOtherCovers = otherCoverKeys.map((x) => {
      const Obj = {
        CoverName: x,
        SI: LPolicyDto.OtherCovers[x],
      };
      return Obj;
    });
    console.log("1234567", returnedObject, returnedOtherCovers);
    LPolicyDto.InsurableItem[0].RiskItems = returnedObject;
    LPolicyDto.OptionalCovers = returnedOtherCovers;
    if (LPolicyDto.Loading === "") {
      LPolicyDto.Loading = "0";
    }
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    // console.log("1234567890", TotalSum);
    if (
      PolicyDto.SubProduct === "" ||
      PolicyDto.TransactionType === "" ||
      PolicyDto.Location === "" ||
      PolicyDto.PastFlooding === "" ||
      PolicyDto.ProposerDetails.ProposerName === "" ||
      PolicyDto.ProposerDetails.MobileNo === "" ||
      PolicyDto.ProposerDetails.EmailId === "" ||
      PolicyDto.Occupancy === "" ||
      PolicyDto.TotalSumInsuredProposed === "" ||
      (PolicyDto.AccidentalDamageCover === "Yes"
        ? PolicyDto.OtherCovers["Accidental Damage"] === ""
        : null) ||
      (PolicyDto.LossofRent === "Yes" ? PolicyDto.OtherCovers["Loss of Rent"] === "" : null) ||
      (PolicyDto.EscalationClause === "Yes"
        ? PolicyDto.OtherCovers["Escalation Clause"] === ""
        : null) ||
      (PolicyDto.InvoluntaryBettermentCover === "Yes"
        ? PolicyDto.OtherCovers["Involuntary Betterment"] === ""
        : null) ||
      (PolicyDto.AdditionalRemovalofDebris === "Yes"
        ? PolicyDto.OtherCovers["Additional Removal Debris"] === ""
        : null) ||
      (PolicyDto.PreservationofProperty === "Yes"
        ? PolicyDto.OtherCovers["Protection and Preservation"] === ""
        : null) ||
      (PolicyDto.ClearingDrains === "Yes"
        ? PolicyDto.OtherCovers["Cost of Clearing Drains"] === ""
        : null) ||
      (PolicyDto.ExpenseInsurance === true
        ? PolicyDto.OtherCovers["Extra Expenses"] === ""
        : null) ||
      addLocation.some((x) => x.Pincode === "")
    ) {
      console.log("1234567890");
      setRiskError(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      setRiskError(false);
      if (flags.emailflag && flags.mobileFlag === false) {
        swal({ icon: "error", text: "Please fill valid mail ID" });
      } else if (flags.emailflag === false && flags.mobileFlag) {
        swal({ icon: "error", text: "Please fill valid Mobile Number" });
      } else if (flags.emailflag && flags.mobileFlag) {
        swal({ icon: "error", text: "Please fill valid Email ID & Mobile Number" });
      } else if (PolicyDto.PastFlooding === "Yes" || PolicyDto.BasementExposure === "Yes") {
        swal({ icon: "error", text: "Policy is subject to Underwriter Approval" });
      } else if (PolicyDto.ClaimExperience === "Non Banca Policy With Loss in 3 Years") {
        swal({ icon: "error", text: "Policy is subject to Underwriter Approval" });
      } else if (PolicyDto.TotalSumInsuredProposed === 0) {
        swal({ icon: "error", text: "Total Sum Insured Should not be Zero" });
      } else if (totalSIError && LPolicyDto.SubProduct === "BSUS") {
        swal({
          icon: "error",
          text: "Total SI should be minimum Rs.5 lakh and maximum upto Rs.5 Cr",
        });
      } else if (
        PolicyDto.ExpenseInsurance === "Yes" ||
        PolicyDto.AccidentalDamageCover === "Yes"
      ) {
        swal({
          icon: "error",
          text: "Subject to underwriter approval",
        });
      } else {
        setLoading(true);
        await callPremiumData();

        handleNext();
      }
    }
  };

  const handleFieldValidation = (e) => {
    //
    if (e.target.name === "QuoteEmail") {
      const emialReg =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/i;
      if (!emialReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, emailflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailflag: false }));
      }
    } else if (e.target.name === "QuoteMobileNo") {
      const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!mobileRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, mobileFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, mobileFlag: false }));
      }
    }
  };

  const handleBusinessProfile = (e) => {
    LPolicyDto.BusinessProfile = e.target.value;
    setPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
  };

  return (
    <MDBox>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Grid container>
        <Grid item sx={12} md={12} l={12} xl={12} xxl={12} ml={0}>
          <MDBox pt={3} width="95%">
            <Grid container>
              <MDBox pt={1} width="100%">
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  {/* <Stack direction="row"> */}
                  {/* <MDTypography
                      variant="h6"
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "1.2rem",
                        textAlign: "left",
                        ml: "2%",
                      }}
                    >
                      <font color="#1E90FF">PlanDetails</font>
                    </MDTypography> */}
                  {/* <Divider
                      orientation="horizontal"
                      textAlign="left"
                      style={{
                        backgroundColor: "#00008B",
                        height: "0.1rem",
                        marginLeft: "1rem",
                        width: "55rem",
                      }}
                    /> */}
                  {/* </Stack> */}
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                            Select Product Type *
                          </MDTypography>
                          <ThemeProvider theme={theme}>
                            <RadioGroup
                              row
                              name="SubProduct"
                              value={PolicyDto?.SubProduct}
                              onChange={handleSetRadio}
                            >
                              <FormControlLabel
                                value="BLUS"
                                control={<CustomRadio />}
                                // disabled={PolicyDto?.SubProduct !== ""}
                                label="BLUS (Per location SI above Rs.5 Crs and upto Rs.50 Crs) "
                              />
                              <FormControlLabel
                                value="BSUS"
                                control={<CustomRadio />}
                                // disabled={PolicyDto?.SubProduct !== ""}
                                label="BSUS (Per location SI upto Rs.5 Crs)"
                              />
                            </RadioGroup>
                          </ThemeProvider>
                          {/* <MDBox sx={{ mt: "1rem" }} mr={1} width="15rem">
                            <MDInput label="Risk location Pincode" justifyContent="flex-end" />
                          </MDBox> */}
                        </Stack>
                        {riskError && PolicyDto?.SubProduct === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                            Transaction Type &nbsp; *
                          </MDTypography>
                          <ThemeProvider theme={theme}>
                            <RadioGroup
                              row
                              name="TransactionType"
                              value={LPolicyDto?.TransactionType}
                              onChange={handleSetRadio}
                            >
                              <FormControlLabel
                                value="New Business"
                                control={<CustomRadio />}
                                label="New"
                              />
                              <FormControlLabel
                                value="RollOver"
                                control={<CustomRadio disabled />}
                                label="RollOver"
                              />
                              {/* <FormControlLabel value="Renewal" control={<Radio />} label="Renewal" /> */}
                            </RadioGroup>
                          </ThemeProvider>
                        </Stack>
                        {riskError && PolicyDto.TransactionType === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}> */}
                        <MDBox mb={2} mt={2} width="15rem">
                          <MDInput
                            label="Business Profile"
                            value={PolicyDto.BusinessProfile}
                            onChange={handleBusinessProfile}
                            name="BusinessProfile"
                          />
                          {/* justifyContent="flex-end" */}
                        </MDBox>
                        {/* </Grid> */}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}>
                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                          <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                            Risk Location &nbsp; *
                          </MDTypography>
                          <ThemeProvider theme={theme}>
                            <RadioGroup
                              row
                              name="Location"
                              value={PolicyDto.Location}
                              onChange={handleSetRadio}
                            >
                              <FormControlLabel
                                value="Single"
                                control={<CustomRadio />}
                                label="Single"
                              />
                              <FormControlLabel
                                value="Multiple"
                                control={<CustomRadio />}
                                label="Multiple"
                              />
                            </RadioGroup>
                          </ThemeProvider>
                        </Stack>
                        {riskError && PolicyDto.Location === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="Proposer Name"
                          name="ProposerName"
                          value={PolicyDto.ProposerDetails.ProposerName}
                          onChange={handleSetChange}
                          required
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                          error={PolicyDto.ProposerDetails.ProposerName === "" ? riskError : null}
                        />
                        {riskError && PolicyDto.ProposerDetails.ProposerName === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="Email ID"
                          name="QuoteEmail"
                          value={PolicyDto.QuoteEmail}
                          onChange={handleSetProposer}
                          onBlur={handleFieldValidation}
                          required
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                          error={PolicyDto.QuoteEmail === "" ? riskError : null}
                        />
                        {riskError && PolicyDto.QuoteEmail === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                        {flags.emailflag && PolicyDto.QuoteEmail !== "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill valid email id
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="Insured's Mobile No"
                          name="QuoteMobileNo"
                          value={PolicyDto.QuoteMobileNo}
                          onChange={handleSetProposer}
                          onBlur={handleFieldValidation}
                          required
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                          error={PolicyDto.QuoteMobileNo === "" ? riskError : null}
                        />
                        {riskError && PolicyDto.QuoteMobileNo === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                        {flags.mobileFlag && PolicyDto.QuoteMobileNo !== "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill valid Mobile Number
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="Occupancy"
                          // options={[]}
                          disableClearable
                          value={{
                            mValue: PolicyDto.Occupancy,
                          }}
                          // value={masterArray.Occupancy}
                          getOptionLabel={(option) => option.mValue}
                          options={OccupancyBLUSBSUS || []}
                          onChange={(e, values) => handleSetAutoComplete(e, "Occupancy", values)}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              label="Occupancy"
                              required
                              sx={{
                                "& .MuiFormLabel-asterisk": {
                                  color: "red",
                                },
                              }}
                              error={
                                Object.values(masterArray.Occupancy || {}).every(
                                  (x) => x === "" || x === null
                                )
                                  ? riskError
                                  : null
                              }
                            />
                          )}
                        />
                        {riskError &&
                        Object.values(masterArray.Occupancy || {}).every(
                          (x) => x === "" || x === null
                        ) ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="Total Sum Insured Proposed"
                          name="TotalSumInsuredProposed"
                          value={PolicyDto.TotalSumInsuredProposed}
                          onChange={handleSetChange}
                          required
                          sx={{
                            "& .MuiFormLabel-asterisk": {
                              color: "red",
                            },
                          }}
                          disabled
                        />
                        {riskError && PolicyDto.TotalSumInsuredProposed === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                {/* <Stack direction="row" spacing={4} ml="1rem" mt="1rem">
                  <FormGroup row>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Send Whatsapp" />
                    <FormControlLabel control={<Checkbox />} label="Send Email" />
                  </FormGroup>
                </Stack> */}
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="Insured Mobile No"
                          value={PolicyDto.InsuredMobileNo}
                          inputProps={{ maxLength: 10 }}
                          name="InsuredMobileNo"
                          onChange={handleSetChange}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label="Email ID"
                          value={PolicyDto.EmailID}
                          name="EmailID"
                          onChange={handleSetChange}
                          required
                        />
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput label="Past Flooding" />
                      </Grid> */}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <MDTypography variant="h6" color="primary">
                      {/* Property Risk Details */}
                      Sum Insured Bifurcation
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}>
                        <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                          {/* Location 1 */}
                          Location
                        </MDTypography>
                      </Grid>
                    </Grid>

                    <DataGrid
                      autoHeight
                      getRowHeight={() => 70}
                      rows={addLocation}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      experimentalFeatures={{ newEditingApi: true }}
                      getRowId={(r) => r.id}
                    />
                    {riskError && addLocation.some((x) => x.Pincode === "") ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill Pincode in the above grid
                      </MDTypography>
                    ) : null}
                    {error && LPolicyDto.SubProduct === "BLUS" ? (
                      <MDTypography sx={{ color: "red", fontSize: "12px" }}>
                        Per location SI above Rs.5 Crs and upto Rs.50 Crs
                      </MDTypography>
                    ) : null}
                    {error && LPolicyDto.SubProduct === "BSUS" ? (
                      <MDTypography sx={{ color: "red", fontSize: "12px" }}>
                        Per location SI upto Rs.5 Crs
                      </MDTypography>
                    ) : null}
                    {totalSIError && LPolicyDto.SubProduct === "BSUS" ? (
                      <MDTypography sx={{ color: "red", fontSize: "12px" }}>
                        Total SI should be minimum Rs.5 lakh and maximum upto Rs.5 Cr
                      </MDTypography>
                    ) : null}
                    {nstpError &&
                    (LPolicyDto.SubProduct === "BLUS" || LPolicyDto.SubProduct === "BSUS") ? (
                      <MDTypography sx={{ color: "red", fontSize: "12px" }}>
                        Total of Stock in Process and Finished Stock SI should not be more than 60%
                        of Total SI.
                      </MDTypography>
                    ) : null}
                    {/* {addLocation && (
                      <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput
                            label="Risk location Pincode"
                            // value={PolicyDto.InsurableItem[0].RiskItems[0].Pincode}
                            // name="Pincode"
                            // onChange={handleSetInsured}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Building SI" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Plan and Machinery SI " />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Furniture,Fixtures and Fittings SI " />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Raw material SI " />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Stock in progress SI " />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Finished stock SI " />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="other content(specify)" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Other Contents SI " />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Total SI " />
                        </Grid>
                      </Grid>
                    )} */}
                    {LPolicyDto.Location === "Multiple" ? (
                      <MDButton sx={{ mt: "2rem" }} onClick={handlecounter} disabled={addLocFlag}>
                        +Add Location
                      </MDButton>
                    ) : null}
                    {/* {LPolicyDto.Location === "Multiple" ? (
                      <MDButton
                        sx={{ mt: "2rem", ml: "2rem" }}
                        onClick={handleRemoveLoc}
                        disabled={removeLoc}
                      >
                        Remove Location
                      </MDButton>
                    ) : null} */}
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <MDTypography variant="h6" color="primary">
                      {/* Risk Details Loading */}
                      Risk Details (For Top Location)
                    </MDTypography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {/* <MDInput label="Past Flooding" /> */}
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="PastFlooding"
                          value={{
                            mValue: PolicyDto.PastFlooding,
                          }}
                          // value={master.PastFlooding}
                          disableClearable
                          getOptionLabel={(option) => option.mValue}
                          options={PastFlooding || []}
                          onChange={(e, values) => handleSetAutoComplete(e, "PastFlooding", values)}
                          renderInput={(params) => (
                            <MDInput
                              {...params}
                              label="Past Flooding"
                              required
                              sx={{
                                "& .MuiFormLabel-asterisk": {
                                  color: "red",
                                },
                              }}
                              error={
                                Object.values(master.PastFlooding || {}).every(
                                  (x) => x === "" || x === null
                                )
                                  ? riskError
                                  : null
                              }
                            />
                          )}
                        />
                        {riskError &&
                        Object.values(master.PastFlooding || {}).every(
                          (x) => x === "" || x === null
                        ) ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {/* <MDInput label="Basement Exposure" /> */}
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="BasementExposure"
                          // options={[]}

                          value={{
                            mValue: PolicyDto.BasementExposure,
                          }}
                          // value={master.BasementExposure}
                          getOptionLabel={(option) => option.mValue}
                          disableClearable
                          options={BasementExposure || []}
                          onChange={(e, values) =>
                            handleSetAutoComplete(e, "BasementExposure", values)
                          }
                          renderInput={(params) => (
                            <MDInput {...params} label="Basement Exposure" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        {/* <MDInput label="Claim Experiance" /> */}{" "}
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="ClaimExperience"
                          // options={[]}

                          value={{
                            mValue: PolicyDto.ClaimExperience,
                          }}
                          disableClearable
                          // value={master.ClaimExperience}
                          getOptionLabel={(option) => option.mValue}
                          options={ClaimExperience || []}
                          onChange={(e, values) =>
                            handleSetAutoComplete(e, "ClaimExperience", values)
                          }
                          renderInput={(params) => <MDInput {...params} label="Claim Experience" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="AgeofBuilding"
                          value={{
                            mValue: PolicyDto.AgeofBuilding,
                          }}
                          disableClearable
                          // value={master.AgeofBuilding}
                          getOptionLabel={(option) => option.mValue}
                          options={AgeOfBuildingBLUSBSUS || []}
                          onChange={(e, values) =>
                            handleSetAutoComplete(e, "AgeofBuilding", values)
                          }
                          renderInput={(params) => <MDInput {...params} label="Age of Building" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="HousekeepingType"
                          disableClearable
                          value={{
                            mValue: PolicyDto.HousekeepingType,
                          }}
                          options={HouseKeepingBLUSBSUS || []}
                          getOptionLabel={(option) => option.mValue}
                          //  value={master.HousekeepingType}
                          onChange={(e, values) =>
                            handleSetAutoComplete(e, "HousekeepingType", values)
                          }
                          renderInput={(params) => (
                            <MDInput {...params} label="Housekeeping Type" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="ClaimsRatio"
                          // value={master.ClaimsRatio}

                          value={{
                            mValue: PolicyDto.ClaimsRatio,
                          }}
                          disableClearable
                          getOptionLabel={(option) => option.mValue}
                          options={ClaimsRationBLUSBSUS || []}
                          onChange={(e, values) => handleSetAutoComplete(e, "ClaimsRatio", values)}
                          renderInput={(params) => <MDInput {...params} label="Claims Ratio" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="RiskTerrain"
                          value={{
                            mValue: PolicyDto.RiskTerrain,
                          }}
                          // value={master.RiskTerrain}
                          disableClearable
                          getOptionLabel={(option) => option.mValue}
                          options={RiskTerrainBLUSBSUS || []}
                          onChange={(e, values) => handleSetAutoComplete(e, "RiskTerrain", values)}
                          renderInput={(params) => <MDInput {...params} label="Risk Terrian" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="StockExposure"
                          // value={master.StockExposure}

                          value={{
                            mValue: PolicyDto.StockExposure,
                          }}
                          disableClearable
                          options={StockExposureBLUSBSUS || []}
                          getOptionLabel={(option) => option.mValue}
                          onChange={(e, values) =>
                            handleSetAutoComplete(e, "StockExposure", values)
                          }
                          renderInput={(params) => <MDInput {...params} label="Stock Exposure" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="Distancefrompublicfirebrigade"
                          value={{
                            mValue: PolicyDto.Distancefrompublicfirebrigade,
                          }}
                          // value={master.Distancefrompublicfirebrigade}
                          disableClearable
                          options={DstPublicFireBrigade || []}
                          getOptionLabel={(option) => option.mValue}
                          onChange={(e, values) =>
                            handleSetAutoComplete(e, "Distancefrompublicfirebrigade", values)
                          }
                          renderInput={(params) => (
                            <MDInput {...params} label="Distance from Public Fire Brigade" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="ClientsBusinessExperience"
                          options={ClientBusinessExperiance || []}
                          getOptionLabel={(option) => option.mValue}
                          value={{
                            mValue: PolicyDto.ClientsBusinessExperience,
                          }}
                          // value={master.ClientsBusinessExperience}
                          disableClearable
                          onChange={(e, values) =>
                            handleSetAutoComplete(e, "ClientsBusinessExperience", values)
                          }
                          renderInput={(params) => (
                            <MDInput {...params} label="Client Business Experience" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="TypeOfConstruction"
                          options={TypeOfConstructionBLUSBSUS || []}
                          getOptionLabel={(option) => option.mValue}
                          value={{
                            mValue: PolicyDto.TypeofConstruction,
                          }}
                          // value={master.TypeofConstruction}
                          disableClearable
                          onChange={(e, values) =>
                            handleSetAutoComplete(e, "TypeofConstruction", values)
                          }
                          renderInput={(params) => (
                            <MDInput {...params} label="Type Of Construction" />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <Autocomplete
                          fullWidth
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "4px!important",
                            },
                          }}
                          id="FireProtection"
                          options={FireProtection || []}
                          disableClearable
                          getOptionLabel={(option) => option.mValue}
                          // value={master.FireProtection}

                          value={{
                            mValue: PolicyDto.FireProtection,
                          }}
                          onChange={(e, values) =>
                            handleSetAutoComplete(e, "FireProtection", values)
                          }
                          renderInput={(params) => <MDInput {...params} label="Fire Protection" />}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          // label="Loading Amount"
                          label="Loading"
                          value={PolicyDto.Loading}
                          name="Loading"
                          onChange={handleSetChange}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                {LPolicyDto.SubProduct === "BLUS" &&
                LPolicyDto.Location === "Multiple" &&
                addLocation.some((x) => x.SumInsuredBifurcation["Raw Material"] !== "") ? (
                  <Accordion
                    defaultExpanded
                    disableGutters
                    sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <MDTypography variant="h6" color="primary">
                        Floater
                      </MDTypography>
                    </AccordionSummary>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Stack direction="row" spacing={2} alignItems="center" ml={3}>
                          <MDTypography sx={{ color: "#000000", fontSize: "1rem" }} mr={14}>
                            {/* Floater option Required? */}
                            Floater
                          </MDTypography>
                          <ThemeProvider theme={theme}>
                            <RadioGroup
                              row
                              name="FloaterforStock"
                              value={PolicyDto.FloaterforStock}
                              onChange={handleSetRadio}
                            >
                              <FormControlLabel value="yes" control={<CustomRadio />} label="Yes" />
                              <FormControlLabel value="No" control={<CustomRadio />} label="No" />
                            </RadioGroup>
                          </ThemeProvider>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Stack direction="row" spacing={2} alignItems="center" ml={3}>
                          <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                            Declaration for Stocks
                          </MDTypography>
                          <ThemeProvider theme={theme}>
                            <RadioGroup
                              row
                              name="DeclarationforStock"
                              value={PolicyDto.DeclarationforStock}
                              onChange={handleSetRadio}
                            >
                              <FormControlLabel value="yes" control={<CustomRadio />} label="Yes" />
                              <FormControlLabel value="No" control={<CustomRadio />} label="No" />
                            </RadioGroup>
                          </ThemeProvider>
                        </Stack>
                      </Grid>
                    </Grid>
                    {/* <AccordionDetails>
                    {FloaterRadioFlag ? (
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <MDTypography variant="h6" color="primary">
                              Floater option
                            </MDTypography>
                            <RadioGroup row>
                              <FormControlLabel
                                value="yes"
                                control={<Radio />}
                                label="Only Floater"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="Floater Declaration"
                              />
                            </RadioGroup>
                          </Stack>
                        </Grid> */}
                    {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="TAC Occupancy Code/Description" />
                        </Grid> */}
                    {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Sum Insured" />
                        </Grid> */}
                    {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Highest Sum Insured at one location" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                          <MDInput label="Floater Location 1" />
                        </Grid> */}
                    {/* <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                          xxl={12}
                          textAlign="right"
                        >
                          <MDButton>+AddLocation</MDButton>
                        </Grid>
                      </Grid>
                    ) : null}
                  </AccordionDetails> */}
                  </Accordion>
                ) : null}
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Stack direction="row">
                      <MDTypography variant="h6" color="primary">
                        {/* Do you want to opt for add on covers? */}
                        Select Add-on Covers from Below
                      </MDTypography>
                      {/* <Divider
                        orientation="horizontal"
                        textAlign="left"
                        style={{
                          backgroundColor: "darkblue",
                          height: "0.1rem",
                          marginLeft: "1rem",
                          width: "50rem",
                        }}
                      /> */}
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* <Grid container spacing={3}>
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}>
                        <MDTypography variant="h6" sx={{ color: "#1E90FF", fontSize: "1.2rem" }}>
                          Do you want to opt for add on covers?
                        </MDTypography>
                        <RadioGroup
                          row
                          onChange={(e) => handleCoverChange(e)}
                          value={value1}
                        >
                          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </Grid>
                    </Grid> */}
                    {/* {CoverRadioFlag ? ( */}
                    <>
                      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={12}>
                        <MDTypography
                          variant="h6"
                          // sx={{
                          //   color: "#ffffff",
                          //   fontSize: "1.2rem",
                          //   backgroundColor: "#1E90FF",
                          //   mb: "2rem",
                          // }}
                          color="primary"
                        >
                          Select Addon Covers from Below
                        </MDTypography>
                      </Grid> */}
                      <Grid container spacing={3}>
                        {/* <MDTypography
          variant="h6"
          sx={{
            color: "#ffffff",
            fontSize: "1.2rem",
            backgroundColor: "purple",
          }}
        >
          ADD ON COVERS
        </MDTypography> */}
                        <MDTypography
                          ml={4}
                          mt={2}
                          variant="h6"
                          sx={{ color: "#1E90FF", fontSize: "1.2rem" }}
                        >
                          <FormGroup column>
                            <FormControlLabel
                              // defaultChecked
                              control={
                                <Checkbox
                                  onChange={handlecheck}
                                  name="AccidentalDamageCover"
                                  checked={PolicyDto.AccidentalDamageCover === "Yes"}
                                  value="No"
                                />
                              }
                              label="Accidental Damage"
                            />
                            {PolicyDto.AccidentalDamageCover === "Yes" ? (
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="AD Sum Insured"
                                  name="Accidental Damage"
                                  onChange={handleAddon}
                                  inputProps={{ maxLength: 10 }}
                                  value={PolicyDto.OtherCovers["Accidental Damage"]}
                                  error={
                                    PolicyDto.OtherCovers["Accidental Damage"] === ""
                                      ? riskError
                                      : null
                                  }
                                />
                                {riskError && PolicyDto.OtherCovers["Accidental Damage"] === "" ? (
                                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                    Please fill this Field
                                  </MDTypography>
                                ) : null}
                              </Grid>
                            ) : null}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handlecheck}
                                  name="LossofRent"
                                  checked={PolicyDto.LossofRent === "Yes"}
                                  value="No"
                                />
                              }
                              label="Loss of Rent"
                            />
                            {PolicyDto.LossofRent === "Yes" ? (
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="LOR Sum Insured"
                                  name="Loss of Rent"
                                  onChange={handleAddon}
                                  inputProps={{ maxLength: 10 }}
                                  value={PolicyDto.OtherCovers["Loss of Rent"]}
                                  error={
                                    PolicyDto.OtherCovers["Loss of Rent"] === "" ? riskError : null
                                  }
                                />
                                {riskError && PolicyDto.OtherCovers["Loss of Rent"] === "" ? (
                                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                    Please fill this Field
                                  </MDTypography>
                                ) : null}
                              </Grid>
                            ) : null}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handlecheck}
                                  name="EscalationClause"
                                  checked={PolicyDto.EscalationClause === "Yes"}
                                  value="No"
                                />
                              }
                              label="Escalation Clause"
                            />
                            {PolicyDto.EscalationClause === "Yes" ? (
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="EC Sum Insured"
                                  name="Escalation Clause"
                                  onChange={handleAddon}
                                  inputProps={{ maxLength: 10 }}
                                  value={PolicyDto.OtherCovers["Escalation Clause"]}
                                  error={
                                    PolicyDto.OtherCovers["Escalation Clause"] === ""
                                      ? riskError
                                      : null
                                  }
                                />
                                {riskError && PolicyDto.OtherCovers["Escalation Clause"] === "" ? (
                                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                    Please fill this Field
                                  </MDTypography>
                                ) : null}
                              </Grid>
                            ) : null}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handlecheck}
                                  name="InvoluntaryBettermentCover"
                                  checked={PolicyDto.InvoluntaryBettermentCover === "Yes"}
                                  value="No"
                                />
                              }
                              label="Involuntry Betterment"
                            />
                            {PolicyDto.InvoluntaryBettermentCover === "Yes" ? (
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="IB Sum Insured"
                                  name="Involuntary Betterment"
                                  onChange={handleAddon}
                                  inputProps={{ maxLength: 10 }}
                                  value={PolicyDto.OtherCovers["Involuntary Betterment"]}
                                  error={
                                    PolicyDto.OtherCovers["Involuntary Betterment"] === ""
                                      ? riskError
                                      : null
                                  }
                                />
                                {riskError &&
                                PolicyDto.OtherCovers["Involuntary Betterment"] === "" ? (
                                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                    Please fill this Field
                                  </MDTypography>
                                ) : null}
                              </Grid>
                            ) : null}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handlecheck}
                                  name="AdditionalRemovalofDebris"
                                  checked={PolicyDto.AdditionalRemovalofDebris === "Yes"}
                                  value="No"
                                />
                              }
                              label="Additional Removal Debris"
                            />
                            {PolicyDto.AdditionalRemovalofDebris === "Yes" ? (
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="ARO Sum Insured"
                                  name="Additional Removal Debris"
                                  onChange={handleAddon}
                                  inputProps={{ maxLength: 10 }}
                                  value={PolicyDto.OtherCovers["Additional Removal Debris"]}
                                  error={
                                    PolicyDto.OtherCovers["Additional Removal Debris"] === ""
                                      ? riskError
                                      : null
                                  }
                                />
                                {riskError &&
                                PolicyDto.OtherCovers["Additional Removal Debris"] === "" ? (
                                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                    Please fill this Field
                                  </MDTypography>
                                ) : null}
                              </Grid>
                            ) : null}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handlecheck}
                                  name="PreservationofProperty"
                                  checked={PolicyDto.PreservationofProperty === "Yes"}
                                  value="No"
                                />
                              }
                              label="Protection and Preservation"
                            />
                            {PolicyDto.PreservationofProperty === "Yes" ? (
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="POP Sum Insured"
                                  name="Protection and Preservation"
                                  onChange={handleAddon}
                                  inputProps={{ maxLength: 10 }}
                                  value={PolicyDto.OtherCovers["Protection and Preservation"]}
                                  error={
                                    PolicyDto.OtherCovers["Protection and Preservation"] === ""
                                      ? riskError
                                      : null
                                  }
                                />
                                {riskError &&
                                PolicyDto.OtherCovers["Protection and Preservation"] === "" ? (
                                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                    Please fill this Field
                                  </MDTypography>
                                ) : null}
                              </Grid>
                            ) : null}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handlecheck}
                                  name="ClearingDrains"
                                  checked={PolicyDto.ClearingDrains === "Yes"}
                                  value="No"
                                />
                              }
                              label="Cost of Clearing Drains"
                            />
                            {PolicyDto.ClearingDrains === "Yes" ? (
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="CD Sum Insured"
                                  name="Cost of Clearing Drains"
                                  onChange={handleAddon}
                                  inputProps={{ maxLength: 10 }}
                                  value={PolicyDto.OtherCovers["Cost of Clearing Drains"]}
                                  error={
                                    PolicyDto.OtherCovers["Cost of Clearing Drains"] === ""
                                      ? riskError
                                      : null
                                  }
                                />
                                {riskError &&
                                PolicyDto.OtherCovers["Cost of Clearing Drains"] === "" ? (
                                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                    Please fill this Field
                                  </MDTypography>
                                ) : null}
                                {nstpError &&
                                PolicyDto.OtherCovers["Cost of Clearing Drains"] !== "" ? (
                                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                    Maximum Limit Crossed
                                  </MDTypography>
                                ) : null}
                              </Grid>
                            ) : null}
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={handlecheck}
                                  name="ExpenseInsurance"
                                  checked={PolicyDto.ExpenseInsurance === "Yes"}
                                  value="No"
                                />
                              }
                              label="Extra Expenses"
                            />
                            {PolicyDto.ExpenseInsurance === "Yes" ? (
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <MDInput
                                  label="EE Sum Insured"
                                  name="Extra Expenses"
                                  onChange={handleAddon}
                                  inputProps={{ maxLength: 10 }}
                                  value={PolicyDto.OtherCovers["Extra Expenses"]}
                                  error={
                                    PolicyDto.OtherCovers["Extra Expenses"] === ""
                                      ? riskError
                                      : null
                                  }
                                />
                                {riskError && PolicyDto.OtherCovers["Extra Expenses"] === "" ? (
                                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                                    Please fill this Field
                                  </MDTypography>
                                ) : null}
                              </Grid>
                            ) : null}
                          </FormGroup>
                        </MDTypography>
                      </Grid>
                    </>
                    {/* ) : null} */}
                  </AccordionDetails>
                </Accordion>
              </MDBox>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end">
        <MDButton color="primary" variant="contained" onClick={onNext} disabled={disableProceed}>
          Proceed
        </MDButton>
      </Grid>
    </MDBox>
  );
}

export default RiskDetails;
