import { useState } from "react";
import { Stack, Grid, Autocomplete, Chip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Swal from "sweetalert2";

import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";
import {
  GetProposalByNumber,
  GenericApi,
} from "../../../PolicyLive/views/Life/Products/NewBusiness/data";
import MDLoader from "../../../../components/MDLoader";
import MDBox from "../../../../components/MDBox";

const colorName = { success: "success", failure: "error", "": "primary" };

const columns = [
  {
    headerName: "ProposalNo",
    field: "ProposalNo",
    width: 150,
  },
  {
    headerName: "CoreProposalNo",
    field: "CoreProposalNo",
    width: 150,
  },
  {
    headerName: "OpportunityId",
    field: "OpportunityId",
    width: 150,
  },
  {
    headerName: "OpportunityNo",
    field: "OpportunityNumber",
    width: 150,
  },

  {
    headerName: "ContactNo",
    field: "ContactNo",
    width: 150,
  },
  {
    headerName: "EmailID",
    field: "EmailID",
    width: 300,
  },
  {
    headerName: "Status",
    field: "responseStatus",
    width: 120,
    renderCell: (p) =>
      p.row.responseStatus !== "" ? (
        <Chip label={p.row.responseStatus} color={colorName[p.row.responseStatus]} />
      ) : null,
  },
];

// PIVC---------------
// Whatsapp LICPIVCWatsApp
// mail GenericMailAPi 390

// Tech term Question --------------------
// Whatsapp LICAdditionalDetailsWatsApp

export default function GenericMailTrigger() {
  const [proposalListString, setProposalListString] = useState("");
  const [ProposalList, setProposalList] = useState([]);
  const [ProposalsData, setProposalsData] = useState([]);
  const [communicationId, setCommunicationId] = useState("");
  const [communicationType, setCommunicationType] = useState("");
  const [apiName, setApiName] = useState("");
  const [stopFlag, setStopFlag] = useState(false);
  const [loader, setLoader] = useState(false);

  const onProposalListString = (e) => {
    setProposalListString(e.target.value);
    setProposalList(e.target.value.trim().split(" "));
  };

  const onProposalData = () => {
    if (apiName === "" || communicationType === "")
      Swal.fire({ icon: "warning", text: "Please Enter Api Name and Communication Type" });
    setLoader(true);
    Promise.all(ProposalList.map((x) => GetProposalByNumber(x))).then((res) => {
      setLoader(false);
      const arr = [];

      res.forEach((r) => {
        arr.push({
          OpportunityNumber: r[0].policyDetails.OpportunityNumber,
          OpportunityId: r[0].policyDetails.opportunityId,

          ProposalNo: r[0]?.policyDetails?.ProposalNo,
          CoreProposalNo: r[0]?.policyDetails?.CoreProposalNo,
          EmailID: r[0]?.policyDetails?.ProposerDetails?.EmailId,
          ContactNo: r[0]?.policyDetails?.ProposerDetails?.ContactNo,
          AlternativeContactNo: r[0]?.policyDetails?.ProposerDetails?.AlternativeContactNo,

          responseStatus: "",
        });
      });
      setProposalsData([...arr]);
    });
  };

  const onTriggerMail = async (i) => {
    if (stopFlag === false) {
      if (ProposalsData[i].responseStatus === "success") {
        onTriggerMail(i + 1);
      } else {
        setLoader(true);
        if (communicationType === "WhatsApp")
          GenericApi("LifeInsurance", apiName, {
            communicationId,
            ...ProposalsData[i],
            ProposalNo:
              apiName === "LICAdditionalDetailsWatsApp"
                ? ProposalsData[i].OpportunityNumber
                : ProposalsData[i].ProposalNo,
            ContactNo: ProposalsData[i].AlternativeContactNo,
          });
        await GenericApi("LifeInsurance", apiName, {
          communicationId,
          ...ProposalsData[i],
          ProposalNo:
            apiName === "LICAdditionalDetailsWatsApp"
              ? ProposalsData[i].OpportunityNumber
              : ProposalsData[i].ProposalNo,
        }).then((res) => {
          setLoader(false);

          if (i < ProposalsData.length) {
            console.log(
              "Mail response",
              ProposalsData[i].ProposalNo,
              res?.data?.LICQuotationMailOutput
            );
            if (communicationType === "Email")
              ProposalsData[i].responseStatus =
                res?.data?.LICQuotationMailOutput?.status === "queued" ? "success" : "failure";
            if (communicationType === "WhatsApp")
              ProposalsData[i].responseStatus = res?.finalResult?.MESSAGEACK?.GUID?.GUID
                ? "success"
                : "failure";
            setProposalsData([...ProposalsData]);
            setTimeout(() => {
              onTriggerMail(i + 1);
            }, [communicationType === "Email" ? 2000 : 0]);
          }
        });
      }
    }
  };

  const onClearData = () => {
    setProposalListString("");
    setProposalList([]);
    setProposalsData([]);
    setCommunicationId("");
    setCommunicationType("");
    setApiName("");
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDButton onClick={onClearData}>Clear All</MDButton>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDLoader loader={loader} />
        <MDInput
          value={communicationId}
          label="Communication ID"
          onChange={(e) => setCommunicationId(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput value={apiName} label="Api Name" onChange={(e) => setApiName(e.target.value)} />
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          options={["Email", "WhatsApp"]}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          getOptionLabel={(option) => option}
          value={communicationType}
          onChange={(e, a) => setCommunicationType(a)}
          renderInput={(params) => <MDInput {...params} label="Communication Type" />}
        />{" "}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDInput
          value={proposalListString}
          label="Proposal List"
          onChange={onProposalListString}
          multiple
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDTypography variant="h5">{`Proposals count ${ProposalList.length} `}</MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" justifyContent="space-between">
          <MDButton onClick={onProposalData}>Get Proposal Data</MDButton>
          <MDButton
            onClick={() => {
              setStopFlag(false);

              onTriggerMail(0);
            }}
          >{`Trigger ${communicationType}`}</MDButton>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDTypography variant="h6" color="primary">{`Total trigged count ${
          ProposalsData.filter((x) => x.responseStatus !== "").length
        } `}</MDTypography>
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDTypography variant="h6" color="success">{`Success count ${
          ProposalsData.filter((x) => x.responseStatus === "success").length
        } `}</MDTypography>
      </Grid>{" "}
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDTypography variant="h6" color="error">{`Failure count ${
          ProposalsData.filter((x) => x.responseStatus === "failure").length
        } `}</MDTypography>{" "}
      </Grid>
      {false && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
            <MDButton
              variant="outlined"
              color="error"
              onClick={() => {
                setStopFlag(true);
                setLoader(false);
              }}
            >
              Stop
            </MDButton>
          </MDBox>
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <DataGrid
          rows={ProposalsData.map((x, i) => ({ ...x, id: i }))}
          getRowId={(row) => row.id}
          rowHeight={25}
          autoHeight
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[30, 50, 100]}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection

          //   sx={headerStyle}
          //   onCellKeyDown={{ handleKeyDown }}
        />
      </Grid>
    </Grid>
  );
}
