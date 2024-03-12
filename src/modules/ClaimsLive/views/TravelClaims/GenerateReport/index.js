import { useState } from "react";
import { Grid, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDTypography from "../../../../../components/MDTypography";
import { GetClaimTransactionFinanceBankData } from "../data/index";

function GenerateReport() {
  const [SearchObj, setSearchObj] = useState({ fromDate: "", toDate: "", value: "Approved" });
  const [Rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadedData, setDownloadedData] = useState([]);

  const columns = [
    {
      field: "policyNo",
      headerName: "Policy No.",
      width: 170,
    },
    {
      field: "claimNo",
      headerName: "Claim No.",
      width: 150,
    },
    {
      field: "claimStatus",
      headerName: "Claim Status",
      width: 110,
    },
    {
      field: "transactionNumber",
      headerName: "Transaction Number",
      width: 170,
    },
    {
      field: "insuredName",
      headerName: "Insured Name",
      width: 250,
    },
    {
      field: "insuredRefNo",
      headerName: "Insured Ref Number",
      width: 250,
    },
    {
      field: "bankAccountHolderName",
      headerName: "Bank Account Holder Name",
      width: 250,
    },
    {
      field: "bankName",
      headerName: "Bank Name",
      width: 250,
    },
    {
      field: "bankAccountNumber",
      headerName: "Bank Account Number",
      width: 250,
    },
    {
      field: "bankBranchAddress",
      headerName: "Bank Branch Address",
      width: 200,
    },
    {
      field: "bankIfsccode",
      headerName: "Bank IFSC Code",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
    },
    {
      field: "utr",
      headerName: "UTRNo",
      width: 200,
    },
    {
      field: "paymentStatus",
      headerName: "PaymentStatus",
      width: 200,
    },
    {
      field: "paymentDate",
      headerName: "PaymentDate",
      width: 200,
    },
    {
      field: "paymentType",
      headerName: "PaymentType",
      width: 200,
    },
    {
      field: "paymentMethod",
      headerName: "PaymentMethod",
      width: 200,
    },
    {
      field: "referenceNumber",
      headerName: "ReferenceNumber",
      width: 200,
    },
    {
      field: "claimSubmittedBy",
      headerName: "ClaimSubmittedBy",
      width: 200,
    },
  ];

  const onHandelFromDate = (e, date) => {
    setSearchObj({ ...SearchObj, fromDate: date });
    console.log(SearchObj);
  };
  const onHandelToDate = (e, date) => {
    setSearchObj({ ...SearchObj, toDate: date });
    console.log(SearchObj);
  };
  const onSearch = async () => {
    setLoading(true);
    const data = await GetClaimTransactionFinanceBankData({ SearchObj });

    setRows(data);
    setLoading(false);
    console.log("rrr", Rows);
    console.log("data11", data);
  };

  const handleClick = (item) => {
    console.log(item);
    const itemL = item;
    delete itemL.row.bankFileId;
    delete itemL.row.createdDate;
    delete itemL.row.modifiedDate;
    delete itemL.row.tansactionID;
    delete itemL.row.claimId;

    setDownloadedData((prev) => [...prev, { ...itemL.row }]);
  };

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(downloadedData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Data${fileExtension}`);
  };

  return (
    <MDBox>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography>Generate/Download Bank File</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                value={SearchObj.fromDate === "" ? " " : new Date(SearchObj.fromDate)}
                input={{ label: "From Date", name: "fromDate" }}
                onChange={(e, date) => onHandelFromDate(e, date)}
                options={{ dateFormat: "Y-m-d", altFormat: "Y-m-d" }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                value={SearchObj.toDate === "" ? " " : new Date(SearchObj.toDate)}
                input={{ label: "To Date", name: "toDate" }}
                onChange={(e, date) => onHandelToDate(e, date)}
                options={{ dateFormat: "Y-m-d", altFormat: "Y-m-d" }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDButton onClick={onSearch}>SEARCH</MDButton>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ width: "100%" }}>
                <DataGrid
                  autoHeight
                  rows={Rows}
                  columns={columns}
                  checkboxSelection
                  loading={loading}
                  pageSize={25}
                  rowsPerPageOptions={[25]}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{ Toolbar: GridToolbar }}
                  editField="inEdit"
                  getRowId={(row) => row.transactionNumber}
                  onCellClick={handleClick}
                />
              </MDBox>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
              <MDButton onClick={exportToCSV}>DOWNLOAD EXCEL</MDButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default GenerateReport;
