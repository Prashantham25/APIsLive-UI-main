import React, { useState, useEffect } from "react";
import {
  Grid,
  // MenuList,
  // MenuItem,
  // ListItemText,
  Autocomplete,
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import loader from "assets/images/Gifs/loading4.gif";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
// import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDDatePicker from "../../../../../components/MDDatePicker";
import { setClaimsJson, setpolicyData, useDataController } from "../../../../BrokerPortal/context";
import { getJsondetails, getAccordianSteps, getAccordianContent } from "./data/index";
import { getPolicyDetails } from "../data";

function RenderControl({ i, ClaimsJson, dispatch }) {
  const onInputChange = (e) => {
    const ClaimsJsonL = ClaimsJson;
    switch (i.path) {
      case "memberDetails":
        ClaimsJsonL.claimBasicDetails[i.path][e.target.name] = e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "transactionDetails":
        ClaimsJsonL.transactionDataDTO[0][i.path][e.target.name] = e.target.value;
        setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        break;
      case "hospitalDetails":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][e.target.name] =
          e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "hospitalizationDetails":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][e.target.name] =
          e.target.value;
        setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        break;
      case "paymentObj":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][e.target.name] =
          e.target.value;
        // setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        setClaimsJson(dispatch, ClaimsJsonL);

        break;
      default:
        ClaimsJsonL[e.target.name] = e.target.value;
        setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        break;
    }
  };
  // const onButtonClick = async () => {
  //   const res = await SaveClaimDetails(ClaimsJson);
  //   if (res.status === 200) {
  //     swal({
  //       html: true,
  //       icon: "success",
  //       title: "Claim saved Successful",
  //       // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
  //     });
  //   } else {
  //     swal({
  //       html: true,
  //       icon: "error",
  //       title: "Something went wrong!",
  //       // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
  //     });
  //   }
  // };
  const onDateTimeChange = (e) => {
    const ClaimsJsonL = ClaimsJson;
    const today = new Date(e[0].toDateString()).toLocaleDateString();
    let [mm, dd, yyyy] = today.split("/");
    if (mm <= 9) {
      mm = `0${mm}`;
    }
    if (dd <= 9) {
      dd = `0${dd}`;
    }
    yyyy = `${yyyy}`;
    const ab = `${yyyy}-${mm}-${dd}`;
    switch (i.path) {
      case "hospitalizationDetails":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][i.name] = ab;
        setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        break;
      default:
        break;
    }
  };

  const handleAutoComplete = (e, value) => {
    const ClaimsJsonL = ClaimsJson;
    switch (i.path) {
      case "benefitDetails":
        // claimData.transactionDataDTO[0].transactionDetails.benefitDetails[item.name] = value.mID;
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName = value;
        setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {(() => {
        switch (i.type) {
          case "Input":
            return (
              <MDInput
                label={i.label}
                name={i.name}
                value={i.value ? i.value : ""}
                disabled={i.InputProps}
                onChange={(e) => onInputChange(e)}
              />
            );
          case "DateTime":
            return (
              <MDDatePicker
                input={{ label: i.label }}
                name={i.name}
                value={i.value ? i.value : ""}
                options={{ altFormat: "d-m-Y", altInput: true }}
                disabled={i.InputProps}
                onChange={(e) => onDateTimeChange(e)}
              />
            );
          case "AutoComplete":
            return (
              <Autocomplete
                options={i.option}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleAutoComplete(e, value)}
                renderInput={(params) => <MDInput {...params} label={i.label} />}
              />
            );
          case "DataGrid":
            return (
              <MDBox sx={{ width: "100%" }}>
                <DataGrid
                  autoHeight
                  rows={i.rows}
                  columns={i.columns}
                  getRowId={(option) => option[i.rowId]}
                  // onRowClick={i.onRowClick}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                  // components={{ Toolbar: item.GridToolbar ? GridToolbar : false }}
                  // editField="inEdit"
                  // checkboxSelection={item.checkboxSelection}
                />
              </MDBox>
            );
          case "Button":
            return (
              <MDButton color="primary">
                {/* <MDButton color="primary" onClick={() => onButtonClick()}> */}
                {i.label}
              </MDButton>
            );
          default:
            return <MDInput label={i.label} />;
        }
      })()}
    </div>
  );
}

function GenericIntimation() {
  const [json, setJson] = useState({});
  const [controller, dispatch] = useDataController();
  const { ClaimsJson, policyData } = controller;
  const [expanded, setExpanded] = useState(-1);
  // const [xid, setX] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [items, setItems] = useState([]);
  const [flag, setFlag] = useState(false);
  const accordianSteps = getAccordianSteps("GroupTravelV1", flag);
  useEffect(() => {
    const data = getJsondetails("GroupTravelV1");
    setJson(data);
  }, []);
  useEffect(() => {
    setClaimsJson(dispatch, { ...ClaimsJson, ...json });
    console.log("json", ClaimsJson);
  }, [json]);
  const handleAccordian = (panel, x) => (e, isExpanded) => {
    setItems([]);
    setExpanded(isExpanded ? panel : -1);
    // setX(x);
    const content = getAccordianContent("GroupTravelV1", x.accname, ClaimsJson, policyData);
    setItems([...content]);
  };
  useEffect(() => {
    setItems([]);
    setExpanded(0);
    const content = getAccordianContent(
      "GroupTravelV1",
      accordianSteps[0].accname,
      ClaimsJson,
      policyData
    );
    setItems([...content]);
  }, []);

  const handleSearch = async () => {
    setFlag(true);
    const policyDetails = await getPolicyDetails(policyNumber);
    if (policyDetails.status === 200) {
      setpolicyData(dispatch, { ...policyData, ...policyDetails.data });
      setFlag(false);
    } else {
      setFlag(true);
    }
  };
  useEffect(() => {
    console.log("policy", policyData);
  }, [policyData]);
  return (
    <Card>
      <Grid container spacing={4} p={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Policy Number"
            name="PolicyNumber"
            value={policyNumber}
            onChange={(e) => setPolicyNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton onClick={() => handleSearch()}>SEARCH</MDButton>
        </Grid>
      </Grid>
      {accordianSteps !== null &&
        accordianSteps.length > 0 &&
        accordianSteps.map((x, j) =>
          x.visible ? (
            <Accordion expanded={expanded === j} onChange={handleAccordian(j, x)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12} md={12} xl={12} xxl={12}>
                    <MDTypography variant="body1" color="primary">
                      {x.accname}
                    </MDTypography>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={4}>
                  {items !== null &&
                    items.length > 0 &&
                    items.map((i) =>
                      i.visible ? (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={i.spacing ? i.spacing : 4}
                          lg={i.spacing ? i.spacing : 4}
                          xl={i.spacing ? i.spacing : 4}
                          xxl={i.spacing ? i.spacing : 4}
                        >
                          <RenderControl i={i} dispatch={dispatch} ClaimsJson={ClaimsJson} />
                        </Grid>
                      ) : null
                    )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ) : null
        )}
      <Backdrop
        sx={{ backgroundColor: "transparent", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={flag}
      >
        <img
          alt=""
          src={loader}
          style={{ justifyContent: "center", height: "150px", width: "150px" }}
        />
      </Backdrop>
    </Card>
  );
}

export default GenericIntimation;
