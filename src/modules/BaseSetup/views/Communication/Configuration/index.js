import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
import swal from "sweetalert2";
import success from "assets/images/Gifs/Success.gif";
import oops from "assets/images/Gifs/somethingwentwrong.gif";
import MDInput from "../../../../../components/MDInput";
import MDTabs from "../../../../PolicyLive/components/Tabs";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import { GetMasterData, GetTemplateMasterData, saveCommunication } from "../data/index";

const columns = [
  { field: "stackHolderType", headerName: "Stakeholder Type", width: 700 },
  { field: "sendType", headerName: "Send Type", width: 300 },
];
const columnss = [{ field: "template", headerName: "Template", width: 700 }];
const { Card, Grid, Autocomplete, Stack } = require("@mui/material");

function StakeHolder({
  masterList,
  onHandleAutocomplete,
  onAdd,
  stakeHolderGrid,
  stakeHolderDetails,
}) {
  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="stackHolderTypeCode"
            options={
              masterList.length > 0
                ? masterList.filter((x) => x.mType === "StackeHolderType")[0].mdata
                : []
            }
            value={
              stakeHolderDetails.stackHolderTypeCode !== ""
                ? {
                    mID: stakeHolderDetails.stackHolderTypeCode,
                    mValue: masterList
                      .filter((x) => x.mType === "StackeHolderType")[0]
                      .mdata.filter((y) => y.typeCode === stakeHolderDetails.stackHolderTypeCode)[0]
                      .mValue,
                  }
                : {
                    mID: "",
                    mValue: "",
                  }
            }
            onChange={(e, value) => onHandleAutocomplete(e, value, "Stake")}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="StakeHolder Type" required />}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="sendType"
            name="sendType"
            options={
              masterList.length > 0 ? masterList.filter((x) => x.mType === "SendType")[0].mdata : []
            }
            value={
              stakeHolderDetails.sendType !== ""
                ? {
                    mID: stakeHolderDetails.sendType,
                    mValue: stakeHolderDetails.sendType,
                  }
                : {
                    mID: "",
                    mValue: "",
                  }
            }
            onChange={(e, value) => onHandleAutocomplete(e, value, "Stake")}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Send Type" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row">
            <MDButton onClick={() => onAdd("stake")}>ADD</MDButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={stakeHolderGrid}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.stackHolderType}
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}
function AttachmentDetails({
  templateMasterList,
  onHandleAutocomplete,
  attachmentsLst,
  onAdd,
  attachment,
}) {
  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="fffff">
            Attachment Details
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="templateId"
            onChange={(e, value) => onHandleAutocomplete(e, value, "Attachment")}
            options={templateMasterList}
            value={
              attachment.templateId !== ""
                ? {
                    mID: attachment.templateId,
                    mValue: templateMasterList.filter((x) => x.mID === attachment.templateId)[0]
                      .mValue,
                  }
                : {
                    mID: "",
                    mValue: "",
                  }
            }
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Template" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row">
            <MDButton onClick={() => onAdd("attach")}>ADD</MDButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={attachmentsLst}
              columns={columnss}
              pageSize={5}
              rowsPerPageOptions={[5]}
              getRowId={(row) => row.template}
            />
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}
function Configuration() {
  const [masterList, setMasterList] = useState([]);
  const [templateMasterList, setTemplateMaster] = useState([]);
  const [configDetails, setConfigDetails] = useState({
    eventTypeId: "",
    subType: "",
    communicationTypeId: "",
    contentTemplateId: "",
    CustomerSettingsId: "tt",
    description: "",
    stakeHoldersLst: [],
    attachmentsLst: [],
  });
  const [stakeHolderDetails, setStakeHolderDetails] = useState({
    stackHolderTypeCode: "",
    sendType: "",
  });
  const [attachment, setAttachment] = useState({
    templateId: "",
    template: "",
  });

  const [stakeHolderdata, setStakeHolderdata] = useState({
    stackHolderType: "",
    sendType: "",
  });

  const [stakeHolderGrid, setStakeHolderGrid] = useState([]);
  const [stakeHoldersLst, setStakeHolderList] = useState([]);
  const [attachmentsLst, setAttachmentsLst] = useState([]);
  const onHandleAutocomplete = (e, value, type) => {
    if (type === "Stake") {
      if (e.target.id.split("-")[0] === "stackHolderTypeCode") {
        stakeHolderDetails[e.target.id.split("-")[0]] = value.typeCode;
        setStakeHolderDetails((prev) => ({ ...prev, ...stakeHolderDetails }));
        stakeHolderdata.stackHolderType = value.mValue;
        setStakeHolderdata((prev) => ({ ...prev, ...stakeHolderdata }));
      } else {
        stakeHolderDetails[e.target.id.split("-")[0]] = value.mValue;
        setStakeHolderDetails((prev) => ({ ...prev, ...stakeHolderDetails }));
        stakeHolderdata.sendType = value.mValue;
        setStakeHolderdata((prev) => ({ ...prev, ...stakeHolderdata }));
      }
    } else if (type === "Attachment") {
      attachment[e.target.id.split("-")[0]] = value.mID;
      attachment.template = value.mValue;
      setAttachment((prev) => ({ ...prev, ...attachment }));
    } else {
      configDetails[e.target.id.split("-")[0]] = value.mID;
      setConfigDetails((prev) => ({ ...prev, ...configDetails }));
    }
  };

  const onAdd = (type) => {
    setStakeHolderDetails({
      stackHolderTypeCode: "",
      sendType: "",
    });
    setAttachment({
      templateId: "",
      template: "",
    });
    setStakeHolderdata({
      stackHolderType: "",
      sendType: "",
    });
    switch (type) {
      case "stake":
        setStakeHolderList((prev) => [...prev, stakeHolderDetails]);
        setStakeHolderGrid((prev) => [...prev, stakeHolderdata]);
        break;
      case "attach":
        setAttachmentsLst((prev) => [...prev, attachment]);
        break;
      default:
        break;
    }
  };
  const tabs = [
    {
      label: "StakeHolder Details",
      content: (
        <StakeHolder
          masterList={masterList}
          onHandleAutocomplete={onHandleAutocomplete}
          onAdd={onAdd}
          stakeHolderGrid={stakeHolderGrid}
          stakeHolderDetails={stakeHolderDetails}
        />
      ),
      value: 1,
    },
    {
      label: "Attachment Details",
      content: (
        <AttachmentDetails
          templateMasterList={templateMasterList}
          onHandleAutocomplete={onHandleAutocomplete}
          onAdd={onAdd}
          attachmentsLst={attachmentsLst}
          attachment={attachment}
        />
      ),
      value: 2,
    },
  ];
  const [value1, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInput = async (e) => {
    configDetails[e.target.name] = e.target.value;
    setConfigDetails((prev) => ({ ...prev, ...configDetails }));
  };
  useEffect(async () => {
    const Master = await GetMasterData();
    const TemplateMaster = await GetTemplateMasterData();
    if (Master.status === 200) {
      setMasterList(Master.data);
    }

    if (TemplateMaster.status === 200) {
      setTemplateMaster(TemplateMaster.data[0].mdata);
    }
    return null;
  }, []);

  const onSave = async () => {
    configDetails.stakeHoldersLst = [...configDetails.stakeHoldersLst, ...stakeHoldersLst];
    configDetails.attachmentsLst = [...configDetails.attachmentsLst, ...attachmentsLst];
    console.log(configDetails);
    const resp = await saveCommunication(configDetails);
    if (resp.status === 200) {
      swal.fire({
        imageUrl: success,
        imageHeight: 200,
        imageWidth: 250,
        text: resp.data.responseMessage,
      });
    } else {
      swal.fire({
        imageUrl: oops,
        imageHeight: 200,
        imageWidth: 250,
        text: resp.data.responseMessage,
      });
    }
  };
  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Communication Configuration
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="eventTypeId"
            name="eventTypeId"
            options={
              masterList.length > 0
                ? masterList.filter((x) => x.mType === "EventType")[0].mdata
                : []
            }
            onChange={(e, value) => onHandleAutocomplete(e, value)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Event Type" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Sub Type"
            onChange={handleInput}
            value={configDetails.subType}
            name="subType"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="communicationTypeId"
            name="communicationTypeId"
            options={
              masterList.length > 0
                ? masterList.filter((x) => x.mType === "CommunicationType")[0].mdata
                : []
            }
            onChange={(e, value) => onHandleAutocomplete(e, value)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Communication Type" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="contentTemplateId"
            name="contentTemplateId"
            options={templateMasterList}
            onChange={(e, value) => onHandleAutocomplete(e, value)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Content Template" required />}
          />
        </Grid>

        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="Customer Setting Details"
            name="Customer Setting Details"
            options={BaseSetupDataBind.DataType}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput {...params} label="Customer Setting Details" />
            )}
          />
        </Grid> */}
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Description"
            onChange={handleInput}
            value={configDetails.description}
            name="description"
          />
        </Grid>
        <br />
        <MDBox sx={{ width: "100%" }}>
          <MDTabs tabsList={tabs} onChange={handleChange} value={value1} />
        </MDBox>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row">
            <MDButton onClick={onSave}>SAVE</MDButton>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Configuration;
