import { useEffect, useState } from "react";
import { Grid, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDataController } from "modules/BrokerPortal/context";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
// import MDButton from "../../../../../components/MDButton";
import { RuleExecution } from "../data/index";
// mport ClaimProcessing from "./ClaimProcessing";

function Validation() {
  const [controller] = useDataController();
  const { TravelClaimJson, TravelEnquiryFlag } = controller;
  const [ClaimObj] = useState(TravelClaimJson);
  const ValidationTablecolumns = [
    {
      field: "Validator",
      headerName: "Validator",
      width: 250,
    },

    {
      field: "Status",
      headerName: "Status",
      width: 250,
    },

    {
      field: "Message",
      headerName: "Message",
      width: 250,
    },
  ];

  useEffect(async () => {
    const doddol = new Date(ClaimObj.claimTransactionDTO[0].transactionDetailsDto.doaDol);
    const pes = new Date(ClaimObj.basicDetails.policyDetails.policyEndDate);
    const psd = new Date(ClaimObj.basicDetails.policyDetails.policyStartDate);
    const ted = new Date(ClaimObj.basicDetails.claimDetails.travelEndDate);
    const tsd = new Date(ClaimObj.basicDetails.claimDetails.travelStartDate);
    const SearchObj = {
      rateParameter: {},
      ruleParameter: {
        DoaDol: [doddol.getMonth() + 1, doddol.getDate(), doddol.getFullYear()].join("/"), // "05/02/2022",
        PolicyEndDate: [pes.getMonth() + 1, pes.getDate(), pes.getFullYear()].join("/"), // "05/31/2022",
        PolicyStartDate: [psd.getMonth() + 1, psd.getDate(), psd.getFullYear()].join("/"), // "05/1/2022",
        RuleName: 30358,
        TravelEndDate: [ted.getMonth() + 1, ted.getFullYear(), ted.getDate()].join("/"), // "5/2022/31",
        TravelStartDate: [tsd.getMonth() + 1, tsd.getFullYear(), tsd.getDate()].join("/"), // "5/2022/1",
      },
    };
    const result = await RuleExecution({ SearchObj });
    console.log(45455, result);
  }, [ClaimObj]);

  // const onSave = () => {
  //   setContent(<ClaimProcessing />);
  // };

  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Validations
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <DataGrid
                autoHeight
                rows={[]}
                columns={ValidationTablecolumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: GridToolbar }}
                editField="inEdit"
                // getRowId={(row) => row.id}
                // onRowClick={(ids) => onHandelMemberDetails(ids)}
                // (ids) => setWorkItemType((prev) => ({ ...prev, MemberID: ids.id }))
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {!TravelEnquiryFlag && (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              {/* <MDButton onClick={onSave}>SAVE</MDButton> */}
              <MDTypography> </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}
export default Validation;
