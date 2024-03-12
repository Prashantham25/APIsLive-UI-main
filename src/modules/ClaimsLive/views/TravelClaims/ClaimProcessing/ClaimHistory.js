import { useEffect, useState } from "react";
import { useDataController } from "modules/BrokerPortal/context";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Grid, AccordionSummary, AccordionDetails, Accordion, Backdrop } from "@mui/material";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import loader from "assets/images/Gifs/loading4.gif";
import { GetClaimHistory } from "../data/index";
// import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
// import EstimationBilling from "./EstimationBilling";

function ClaimHistory() {
  const [controller] = useDataController();
  const { TravelClaimJson, TravelEnquiryFlag } = controller;
  const [ClaimObj] = useState(TravelClaimJson);
  const [flag, setFlag] = useState(false);
  const [HistoryData, setHistoryData] = useState([]);

  const Tablecolumns = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
    },

    {
      field: "userName",
      headerName: "userName",
      width: 250,
    },

    {
      field: "modifiedDate",
      headerName: "Modified Date",
      width: 250,
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 250,
    },
  ];

  useEffect(async () => {
    setFlag(true);
    const SearchObj = { TransactionNumber: ClaimObj.claimTransactionDTO[0].transactionNumber };
    const Data = await GetClaimHistory({ SearchObj });
    console.log("mkmkm", Data);
    setHistoryData(Data);
    console.log("4234234", HistoryData);
    setFlag(false);
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
            Claim History
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
                  components={{ Toolbar: GridToolbar }}
                  editField="inEdit"
                  getRowId={(row) => row.action}
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
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={flag}>
        <img
          alt=""
          src={loader}
          style={{ justifyContent: "center", height: "150px", width: "150px" }}
        />{" "}
      </Backdrop>
    </MDBox>
  );
}
export default ClaimHistory;
