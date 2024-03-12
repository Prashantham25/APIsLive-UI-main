import { useState, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import { useDataController } from "modules/BrokerPortal/context";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import { GetPolicyInfoByPolicyNumber } from "../data/index";
// import MDInput from "../../../../../components/MDInput/index";

function CIS() {
  const [controller] = useDataController();
  const { TravelClaimJson } = controller;
  const [rows, serRows] = useState([]);
  // const [totalSI, setTotalSI] = useState("");
  useEffect(async () => {
    // const OBJ = TravelClaimJson;
    const PolicyNumber = TravelClaimJson.policyNo;
    // const causeOfLoss = OBJ.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss;
    // const typeOfLoss = TravelClaimJson.claimTransactionDTO[0].transactionDetailsDto.typeOfLoss;
    const d1 = await GetPolicyInfoByPolicyNumber(PolicyNumber);
    const arr1 = d1.policy_details[0].policyRequest.BenefitDetails;
    const finalArr = [];
    let obj1 = {};
    let arr2 = [];
    arr1.forEach((r) => {
      if (r.CoverId === TravelClaimJson.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss)
        if (r.BenefitDetails !== null) {
          obj1 = r;
          arr2 = r.BenefitDetails;
        }
    });
    let num = 0;
    arr2.forEach((r) => {
      finalArr.push({
        Benefit: obj1.CoverName,
        ProcedureName: r.BenefitName,
        WaitingPeriod: parseInt(r.WaitingPeriod, 10),
        TotalSumInsured: "",
        UtilizedSumInsured: "",
        AvailableSumInsured: "",
        SublimitPerclaim: parseInt(r.SI, 10),
        Noofclaimsperyear: parseInt(obj1.NoOfClaims, 10),
        UtilizedClaim: "",
        AvailableClaim: "",
        ClaimsUnit: obj1.Unit,
        BenefitCode: r.BenefitCode,
      });
      num += parseInt(r.SI, 10);
    });
    finalArr.forEach((r, i) => {
      finalArr[i].TotalSumInsured = num;
    });
    serRows(finalArr);
    // setTotalSI(num);

    console.log("arr2", arr2);
  }, []);

  const columns = [
    {
      field: "Benefit",
      headerName: "Benefit",
      width: 250,
      rowSpan: 5,
    },
    {
      field: "ProcedureName",
      headerName: "Procedure Name",
      width: 300,
    },
    {
      field: "WaitingPeriod",
      headerName: "Waiting Period (months)",
      width: 200,
      type: "number",
    },
    {
      field: "TotalSumInsured",
      headerName: "Total Sum Insured",
      width: 200,
      type: "number",
    },
    {
      field: "UtilizedSumInsured",
      headerName: "Utilized Sum Insured",
      width: 200,
      type: "number",
    },
    {
      field: "AvailableSumInsured",
      headerName: "Available Sum Insured",
      width: 200,
      type: "number",
    },
    {
      field: "SublimitPerclaim",
      headerName: "Sub-limit Per claim",
      width: 200,
      type: "number",
    },
    {
      field: "Noofclaimsperyear",
      headerName: "No. of claims per year",
      width: 200,
      type: "number",
    },
    {
      field: "UtilizedClaim",
      headerName: "Utilized Claim",
      width: 200,
      type: "number",
    },
    {
      field: "AvailableClaim",
      headerName: "Available Claim",
      width: 200,
      type: "number",
    },
    {
      field: "ClaimsUnit",
      headerName: "Claims Unit",
      width: 150,
    },
  ];

  const sty = {
    border: "1px solid black",
    borderCollapse: "collapse",
    padding: "4px",
  };
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="body1" color="primary">
            Customer Information Sheet
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ width: "100%" }}>
                <DataGrid
                  getColumnHeight={() => "auto"}
                  autoHeight
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  // components={{ Toolbar: GridToolbar }}
                  editField="inEdit"
                  getRowId={(row) => row.BenefitCode}
                  loading={rows.length === 0}
                  // onRowClick={(ids) => onHandelMemberDetails(ids)}
                />
              </MDBox>
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Total Sum Insured" value={totalSI} />
            </Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ overflow: "auto" }}>
                <table style={{ ...sty }}>
                  <tr>
                    {columns.map((r) => (
                      <th style={sty}>{r.headerName}</th>
                    ))}
                  </tr>

                  {rows.map((r, i) => (
                    <tr>
                      {i === 0 && (
                        <td style={sty} rowSpan={rows.length}>
                          {r.Benefit}
                        </td>
                      )}
                      <td style={sty}>{r.ProcedureName}</td>
                      {i === 0 && (
                        <td style={sty} rowSpan={rows.length}>
                          {r.WaitingPeriod}
                        </td>
                      )}
                      {i === 0 && (
                        <td style={sty} rowSpan={rows.length}>
                          {r.TotalSumInsured}
                        </td>
                      )}
                      {i === 0 && (
                        <td style={sty} rowSpan={rows.length}>
                          {r.UtilizedSumInsured}
                        </td>
                      )}
                      {i === 0 && (
                        <td style={sty} rowSpan={rows.length}>
                          {r.AvailableSumInsured}
                        </td>
                      )}
                      <td style={sty}>{r.SublimitPerclaim}</td>
                      <td style={sty}>{r.Noofclaimsperyear}</td>
                      <td style={sty}>{r.UtilizedClaim}</td>
                      <td style={sty}>{r.AvailableClaim}</td>
                      {i === 0 && (
                        <td style={sty} rowSpan={rows.length}>
                          {r.ClaimsUnit}
                        </td>
                      )}
                    </tr>
                  ))}
                </table>
              </MDBox>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default CIS;
