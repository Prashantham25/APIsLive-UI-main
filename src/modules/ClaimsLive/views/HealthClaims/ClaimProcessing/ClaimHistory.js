import { useEffect, useState } from "react";
import { useDataController } from "modules/BrokerPortal/context";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, AccordionSummary, AccordionDetails, Accordion } from "@mui/material";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GetClaimHistory } from "../data/index";
// import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
// import EstimationBilling from "./EstimationBilling";

function ClaimHistory() {
  const [controller] = useDataController();
  const { TravelClaimJson, TravelEnquiryFlag } = controller;
  const [ClaimObj] = useState(TravelClaimJson);

  const [HistoryData, setHistoryData] = useState([]);

  const Tablecolumns = [
    { field: "id", headerName: "ID", hide: true },
    {
      field: "action",
      headerName: "Action",
      width: 200,
    },

    {
      field: "userName",
      headerName: "userName",
      width: 200,
    },

    {
      field: "modifiedDate",
      headerName: "Modified Date",
      width: 250,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 200,
    },
  ];

  useEffect(async () => {
    const SearchObj = { TransactionNumber: ClaimObj.claimTransactionDTO[0].transactionNumber };
    const Data = await GetClaimHistory({ SearchObj });
    console.log("mkmkm", Data);
    const name = "id";
    Data.forEach((row, index) => {
      Data[index][name] = index;
    });

    setHistoryData([...Data]);
    console.log("4234234", HistoryData);
  }, []);

  // const onSave = () => {
  //   setContent(<EstimationBilling />);
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
            Audit Trail
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ width: "100%" }}>
                <DataGrid
                  autoHeight
                  rows={HistoryData}
                  columns={Tablecolumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  // components={{ Toolbar: GridToolbar }}
                  editField="inEdit"
                  loading={HistoryData.length === 0}
                  // getRowId={(row) => row.action}
                  // onRowClick={(ids) => onHandelMemberDetails(ids)}
                  // (ids) => setWorkItemType((prev) => ({ ...prev, MemberID: ids.id }))
                />
              </MDBox>
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
export default ClaimHistory;
