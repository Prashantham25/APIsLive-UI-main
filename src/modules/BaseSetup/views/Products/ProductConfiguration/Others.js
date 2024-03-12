import React, { useState, useEffect } from "react";
import { Grid, Autocomplete } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import MDTypography from "components/MDTypography";

import MDDatePicker from "../../../../../components/MDDatePicker";
import MDInput from "../../../../../components/MDInput";

import { useDataController, setProductJson } from "../../../../BrokerPortal/context";

import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";

function Others() {
  const [controller, dispatch] = useDataController();
  const { ProductJson } = controller;
  // const { productChannels } = ProductJson;
  const columns = [
    {
      field: "channelName",
      headerName: "Channel",
      width: 250,
      //  type: "number",
    },

    {
      field: "effectiveFrom",
      headerName: "Effective From",

      width: 250,
    },

    {
      field: "effectiveTo",
      headerName: "Effective To",
      editable: true,
      width: 250,
      // renderCell: () => <WorkType setWorkItemType={setWorkItemType} />,
      // renderCell: () => (
      //   <Autocomplete
      //     fullWidth
      //     options={["FreshClaim", "ExistingClaim"]}
      //     getOptionLabel={(option) => option}
      //     sx={{
      //       "& .MuiOutlinedInput-root": {
      //         padding: "4px",
      //       },
      //     }}
      //     onChange={(e, newValue) => onAutoTypeClick({ e, newValue })}
      //     renderInput={(params) => <MDInput {...params} label="select type" />}
      //   />
      // ),
    },
    {
      field: "brokage",
      headerName: "Brokerage %",

      width: 250,
    },
  ];
  const [rows, setRows] = useState([]);
  const [obj, setObj] = useState({
    channelId: 0,
    productId: null,
    channelTypeId: 0,
    effectiveFrom: "",
    effectiveTo: "",
    brokage: 0,
    channelName: "",
  });
  const objD = {
    channelId: 0,
    productId: null,
    channelTypeId: 0,
    effectiveFrom: "",
    effectiveTo: "",
    brokage: 0,
    channelName: "",
  };
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [channel, setChannel] = useState({ mID: 0, mValue: "" });
  const channelD = { mID: 0, mValue: "" };

  const handleAutoComplete = (e, value) => {
    obj[e.target.id.split("-")[0]] = value.mValue;
    obj.channelTypeId = value.mID;
    channel.mID = value.mID;
    channel.mValue = value.mValue;

    setObj((prev) => ({ ...prev, ...obj }));
    setChannel((prev) => ({ ...prev, ...channel }));
  };
  const handleDate = (e, type) => {
    // debugger;
    const today = new Date(e[0].toDateString()).toLocaleDateString();
    let [mm, dd, yyyy] = today.split("/");
    if (mm < 10) {
      mm = `0${mm}`;
    }
    if (dd < 10) {
      dd = `0${dd}`;
    }
    yyyy = `${yyyy}`;

    const a = `${yyyy}-${mm}-${dd}`;
    obj[type] = a;
    setObj((prev) => ({ ...prev, ...obj }));

    if (type === "effectiveFrom") {
      setFrom(a);
    } else {
      setTo(a);
    }
  };
  const handleInput = (e) => {
    obj[e.target.name] = e.target.value;
    setObj((prev) => ({ ...prev, ...obj }));
  };

  const handleAdd = () => {
    //  debugger;
    setObj(objD);
    setFrom();
    setTo();
    setChannel(channelD);

    setRows([...rows, { ...obj }]);
    ProductJson.productChannels = [...ProductJson.productChannels, ...rows];
    setProductJson(dispatch, ProductJson);
  };

  useEffect(() => {
    console.log("rows", rows);
    console.log("json in other", ProductJson);
  }, [rows]);
  return (
    <MDBox>
      <Accordion
        // expanded={final[0]}
        // onChange={handleChange(passId)}
        // defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography variant="h6" color="primary">
                Channels{" "}
              </MDTypography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="channelName"
                options={[
                  { mID: 1, mValue: "Direct" },
                  { mID: 2, mValue: "Agency" },
                  { mID: 3, mValue: "Broking" },
                  { mID: 4, mValue: "Partner" },
                ]}
                getOptionLabel={(option) => option.mValue}
                value={channel}
                onChange={handleAutoComplete}
                renderInput={(params) => <MDInput {...params} label="Channel" />}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                name="effectiveFrom"
                input={{ label: "Effective From" }}
                value={from}
                onChange={(e) => handleDate(e, "effectiveFrom")}
                options={{ altFormat: "d-m-Y", altInput: true }}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                name="effectiveTo"
                input={{ label: "Effective To" }}
                value={to}
                onChange={(e) => handleDate(e, "effectiveTo")}
                options={{ altFormat: "d-m-Y", altInput: true }}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Brokerage %"
                name="brokage"
                // value={obj.brokage}
                onChange={handleInput}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={handleAdd}>Add</MDButton>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ width: "100%" }}>
                <DataGrid
                  autoHeight
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{ Toolbar: GridToolbar }}
                  editField="inEdit"
                  getRowId={(row) => row.channelName}
                  //  onRowClick={(ids) => onHandelMemberDetails(ids)}
                  // (ids) => setWorkItemType((prev) => ({ ...prev, MemberID: ids.id }))
                />
              </MDBox>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        // expanded={final[0]}
        // onChange={handleChange(passId)}
        // defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography variant="h6" color="primary">
                Parameters Mapping{" "}
              </MDTypography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <h4>Parameters Mapping</h4>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default Others;
