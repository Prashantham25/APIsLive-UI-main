import React, { useEffect, useState } from "react";
import { Card, Grid, Stack, Autocomplete } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import { GetAllCommunications, SaveGroupCommunication } from "../data/index";

function GroupCommunication() {
  const [json, setJson] = useState({
    GroupCommId: 0,
    GroupName: "",
    CommunicationDetails: [],
  });
  const [commDet, setCommDetails] = useState({
    CommunicationId: 0,
    CommunicationName: "",
    Event: "",
  });
  const dup = {
    CommunicationId: 0,
    CommunicationName: "",
    Event: "",
  };
  const [masterData, setMasterData] = useState([]);

  const columns = [
    { field: "CommunicationId", headerName: "CommunicationId", width: 300 },
    { field: "CommunicationName", headerName: "Name", width: 400 },
    { field: "Event", headerName: "Event", width: 200 },
  ];

  const onGroupName = (e) => {
    json.GroupName = e.target.value;
    setJson((prev) => ({ ...prev, ...json }));
  };

  const setEvent = (val) => {
    commDet.Event = val;
    setCommDetails((prev) => ({ ...prev, ...commDet }));
  };

  const onHandleAutocomplete = (e, value) => {
    commDet.CommunicationId = value.communicationId != null ? value.communicationId : 0;
    commDet.CommunicationName = value.description;
    setCommDetails((prev) => ({ ...prev, ...commDet }));
  };

  const handleAdd = () => {
    json.CommunicationDetails = [...json.CommunicationDetails, { ...commDet }];
    setJson((prev) => ({ ...prev, ...json }));
    setCommDetails((prev) => ({ ...prev, ...dup }));
  };

  const handleSubmit = async () => {
    const response = await SaveGroupCommunication(json);
    if (response.status === 200)
      swal({ text: "Group Communication Configured Successfully!", icon: "success", html: true });
    else swal({ text: response.data.responseMessage, icon: "error", html: true });
  };

  useEffect(() => {
    console.log(json);
  }, [json]);

  useEffect(async () => {
    const data = await GetAllCommunications();
    if (data.status === 200) {
      setMasterData(data.data.finalResult);
    }
  }, []);

  return (
    <Card>
      <MDBox>
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="body1" color="primary">
              Group Communication
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Group Name"
              name="GroupName"
              value={json.GroupName}
              onChange={(e) => onGroupName(e)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} p={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              id="CommunicationName"
              name="CommunicationName"
              options={masterData.length > 0 ? masterData : []}
              onChange={(e, value) => onHandleAutocomplete(e, value)}
              getOptionLabel={(option) => option.description}
              renderInput={(params) => <MDInput {...params} label="Communication Name" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Event"
              name="Event"
              value={commDet.Event}
              onChange={(e) => setEvent(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Stack justifyContent="right" direction="row" spacing={2}>
              <MDButton onClick={() => handleAdd()}>ADD</MDButton>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <div style={{ height: 400, width: "100%", alignItems: "center" }}>
              <DataGrid
                rows={json.CommunicationDetails}
                columns={columns}
                getRowId={(row) => row.CommunicationId}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="right" direction="row" spacing={2}>
              <MDButton onClick={() => handleSubmit()}>Save</MDButton>
            </Stack>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default GroupCommunication;
