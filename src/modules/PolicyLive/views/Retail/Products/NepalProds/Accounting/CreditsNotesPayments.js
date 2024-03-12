import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import swal from "sweetalert";
import { Accordion, Grid, Stack, Autocomplete, Backdrop, CircularProgress } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import MDButton from "../../../../../../../components/MDButton";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDInput from "../../../../../../../components/MDInput";

import {
  // GetProdPartnermasterData,
  // GetPolicies,
  // UpdateGenerateDeposit,
  GetNPCommonMaster,
  GetPayLoadByQueryDynamic,
  getPolicyDetailsByNumber,
  // AccountConfig,
} from "../data/APIs/MotorCycleApi";

const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};

function CreditsNotesPayments() {
  const navigate = useNavigate();
  const [flag, setFlag] = useState({ dateFlag: false });
  const helperText = "This field is Required";
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  const [rows, setRows] = useState([]);
  // const [rows1, setRows1] = useState([]);
  const getMinDateForToDate = (fromDate) => fromDate || null;
  const [CreditsNotesPayment, setCreditsNotesPayment] = useState({
    Branch: "",
    SubBranch: "",
    FromDate: "",
    ToDate: "",
    PolicyNo: "",
    CreditNoteNo: "",
    IssuingBranch: [],
    masters: {
      PaymentMode: [],
      BankorFinancialInstituionNameinEnglish: [],
    },
  });
  console.log("CreditsNotesPayment", CreditsNotesPayment);
  const [dt, setDt] = useState({
    paramList: [
      {
        ParameterValue: "",
        ParameterName: "FromDate",
      },
      {
        ParameterValue: "",
        ParameterName: "ToDate",
      },
      {
        ParameterValue: "",
        ParameterName: "BranchName",
      },
      {
        ParameterValue: "",
        ParameterName: "SubBranch",
      },
      {
        ParameterValue: "",
        ParameterName: "PolicyNumber",
      },
      {
        ParameterValue: "",
        ParameterName: "CreditNoteNo",
      },
    ],
    reportname: "NepalCreditNotePaymentsQuery",
  });

  console.log("dt", dt);

  const onNext = async (p) => {
    setLoading(true);
    // if (gridData.CreditNoteIssused === "true") {
    //   gridData.PaidStatus = "Paid";
    // } else {
    //   PaidStatus = "";
    // }
    // const PaidStatus = "Paid";
    const policyResult = await getPolicyDetailsByNumber(p.row.PolicyNo);
    console.log("policyResult", policyResult);
    navigate(`/Accounting/CreditNotePaymentsDetails`, {
      state: {
        gridData: { ...policyResult },
        // productCode: "",
        EndorsementNumber: p.row.EndorsementNumber,
      },
    });
    setLoading(false);
  };
  const handleChange = (e, type, value) => {
    if (type === "Branch") {
      if (value === null) {
        CreditsNotesPayment.Branch = "";
        setRows([]);
      } else {
        CreditsNotesPayment.Branch = value.mValue;
      }
    }

    if (type === "SubBranch") {
      CreditsNotesPayment.SubBranch = e.target.value;
    }
    if (type === "FromDate") {
      // setFlag((prevstate) => ({ ...prevstate, dateFlag: true }));
      setRows([]);
      CreditsNotesPayment.FromDate = value;
    }
    if (type === "ToDate") {
      CreditsNotesPayment.ToDate = value;
    }
    if (type === "PolicyNo") {
      setRows([]);
      CreditsNotesPayment.PolicyNo = e.target.value;
    }
    if (type === "CreditNoteNo") {
      setRows([]);
      CreditsNotesPayment.CreditNoteNo = e.target.value;
    }
    if (CreditsNotesPayment.FromDate === "") {
      CreditsNotesPayment.ToDate = "";
      setFlag((prevstate) => ({ ...prevstate, dateFlag: false }));
    }
    setCreditsNotesPayment({ ...CreditsNotesPayment });
    console.log("CreditsNotesPayment", CreditsNotesPayment);
  };

  const handleSearch = async () => {
    if (
      CreditsNotesPayment.Branch === "" &&
      CreditsNotesPayment.SubBranch === "" &&
      CreditsNotesPayment.FromDate === "" &&
      CreditsNotesPayment.ToDate === "" &&
      CreditsNotesPayment.PolicyNo === "" &&
      CreditsNotesPayment.CreditNoteNo === ""
    ) {
      swal({
        html: true,
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      setLoading(true);
      dt.paramList.filter((y) => {
        const x = y;
        if (x.ParameterName === "FromDate") {
          x.ParameterValue = CreditsNotesPayment.FromDate;
        }
        if (x.ParameterName === "ToDate") {
          x.ParameterValue = CreditsNotesPayment.ToDate;
        }
        if (x.ParameterName === "BranchName") {
          x.ParameterValue = CreditsNotesPayment.Branch;
        }
        if (x.ParameterName === "SubBranch") {
          x.ParameterValue = CreditsNotesPayment.SubBranch;
        }
        if (x.ParameterName === "PolicyNumber") {
          x.ParameterValue = CreditsNotesPayment.PolicyNo;
        }
        if (x.ParameterName === "CreditNoteNo") {
          x.ParameterValue = CreditsNotesPayment.CreditNoteNo;
        }
        return true;
      });
      setDt((prev) => ({ ...prev, ...dt }));
      if (CreditsNotesPayment.FromDate !== "" && CreditsNotesPayment.ToDate === "") {
        setFlag((prevstate) => ({ ...prevstate, dateFlag: true }));

        swal({ text: "Please fill the required Field", icon: "error" });
        setLoading(false);
      } else {
        const data = await GetPayLoadByQueryDynamic(dt);
        console.log("data", data);

        // const Type = "Credit";
        // const Policies = await AccountConfig(Type);
        // setRows1([...Policies]);
        // console.log(rows1, Policies);
        if (data === null) {
          setRows([]);
          swal({ text: "Data not Found!", icon: "error" });
        }
        if (data !== null && data.status === 200) {
          const newData = data.data.finalResult.map((row, index) => ({ ...row, id: index }));

          setRows([...newData]);
          console.log("newData", newData);
        }
        setLoading(false);
        console.log("rows", rows);
        // const Data = rowsp.filter(
        //   (x) => x.BranchName === CreditsNotesPayment.Branch
        // new Date(x.policyIssueDate) >= new Date(Bankdeposite.FromDate) ||
        // new Date(x.policyIssueDate) <= new Date(Bankdeposite.ToDate) ||
        // );
        // console.log("Data", Data);
        // setrows([...Data]);
        // setrows1([...Data]);
      }
    }
  };

  const columnsp = [
    {
      field: "id",
      headerName: "ID",
      width: 160,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      hide: true,
    },
    {
      field: "CreditNoteNo",
      headerName: "Credit Note No.",
      width: 300,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (p, i) => (
        <MDTypography
          style={{
            color: p.row.CreditNoteVoucherNo !== null ? "gray" : "blue",
            textDecoration: "underline",
            fontSize: "14px",
            cursor: p.row.CreditNoteVoucherNo !== null ? "not-allowed" : "pointer",
            pointerEvents: p.row.CreditNoteVoucherNo !== null ? "none" : "auto",
          }}
          onClick={() => {
            if (p.row.CreditNoteVoucherNo === null) {
              onNext(p, i);
            }
          }}
        >
          {p.row.CreditNoteNo}
        </MDTypography>
      ),
    },

    {
      field: "PolicyNo",
      headerName: "Policy No.",
      width: 300,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "PolicyIssuedDate",
      headerName: "Policy Issued Date",
      width: 180,
      sortable: false,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "PaymentMode",
      headerName: "Payment Mode",
      width: 200,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },

    {
      field: "PaymentAmount",
      headerName: "Amount",
      sortable: false,
      width: 180,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
  ];

  useEffect(async () => {
    if (
      localStorage.getItem("NepalCompanySelect") !== null ||
      process.env.REACT_APP_EnvId !== "297"
    ) {
      let Company = "";
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Company = "NMIC";
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Company = "PMIC";
      }
      console.log("company", Company);
      // await GetProdPartnermasterData("BranchName", {
      //   Description: Company,
      // }).then((res) => {
      // CreditsNotesPayment.IssuingBranch = res.data;
      // });
    }
    await GetNPCommonMaster().then((r) => {
      console.log(r, 2222);
      r.forEach((x) => {
        // Bankdeposite.masters
        // const Data = x.mType;
        CreditsNotesPayment.masters[x.mType] = x.mdata.filter((y) => y.mValue !== "Renewal");
        setCreditsNotesPayment({ ...CreditsNotesPayment });
      });
    });

    const data = { sMasterlist: "BranchName" };
    const Result = await GetNPCommonMaster(data);

    Result.forEach((x) => {
      if (x.mType === "BranchName") {
        // setBranchName([...x.mdata]);
        CreditsNotesPayment.IssuingBranch = [...x.mdata];
      }
    });

    setCreditsNotesPayment({ ...CreditsNotesPayment });
  }, []);

  return (
    <Accordion style={{ display: "flex", justifyContent: "center" }}>
      <MDBox>
        <Grid container>
          {loading ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : null}
          <Grid container spacing={1} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5">Credit Note Payments</MDTypography>
            </Grid>
          </Grid>
        </Grid>
        <MDBox>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                options={CreditsNotesPayment.IssuingBranch || []}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  ...redAsterisk,
                }}
                value={{ mValue: CreditsNotesPayment.Branch }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleChange(e, "Branch", value)}
                renderInput={(params) => <MDInput {...params} label="Branch" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                disabled
                options={[]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  ...redAsterisk,
                }}
                // value={{ mValue: CreditsNotesPayment.Branch }}
                // getOptionLabel={(option) => option.mValue}
                // onChange={(e, value) => handleChange(e, "Sub-Branch", value)}
                renderInput={(params) => <MDInput {...params} label="Sub-Branch" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDDatePicker
                fullWidth
                options={{
                  dateFormat: "Y-m-d",
                  altFormat: "d/m/Y",
                  altInput: true,
                }}
                input={{
                  label: "From Date",
                  value: CreditsNotesPayment.FromDate,
                  // error: ErrorFlag && CreditsNotesPayment.FromDate === "",
                  // helperText: ErrorFlag && CreditsNotesPayment.FromDate === "" ? helperText : "",
                  // required: true,
                  // sx: redAsterisk,
                }}
                value={CreditsNotesPayment.FromDate}
                onChange={(e, date) => handleChange(e, "FromDate", date)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDDatePicker
                fullWidth
                // minDate={CreditsNotesPayment.FromDate}
                // maxDate={}
                disabled={CreditsNotesPayment.FromDate === ""}
                options={{
                  dateFormat: "Y-m-d",
                  altFormat: "d/m/Y",
                  altInput: true,
                  minDate: getMinDateForToDate(CreditsNotesPayment.FromDate),
                }}
                input={{
                  label: "To Date",
                  value: CreditsNotesPayment.ToDate,

                  required: CreditsNotesPayment.FromDate,
                  error: flag.dateFlag && CreditsNotesPayment.ToDate === "",
                  helperText: flag.dateFlag && CreditsNotesPayment.ToDate === "" ? helperText : "",

                  sx: redAsterisk,
                }}
                value={CreditsNotesPayment.ToDate}
                onChange={(e, date) => handleChange(e, "ToDate", date)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Policy No."
                name="PolicyNo"
                value={CreditsNotesPayment.PolicyNo}
                onChange={(e, value) => handleChange(e, "PolicyNo", value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Credit Note No."
                name="CreditNoteNo"
                value={CreditsNotesPayment.CreditNoteNo}
                onChange={(e, value) => handleChange(e, "CreditNoteNo", value)}
                // error={ErrorFlag && PaymentDetails.PolicyNo === ""}
                // helperText={ErrorFlag && PaymentDetails.PolicyNo === "" ? helperText : ""}
                // required
                // sx={redAsterisk}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Stack justifyContent="right" direction="row">
                <MDButton
                  onClick={handleSearch}
                  // disabled={
                  //   CreditsNotesPayment.FromDate === "" &&
                  //   CreditsNotesPayment.ToDate === "" &&
                  //   CreditsNotesPayment.Branch === "" &&
                  //   CreditsNotesPayment.PolicyNo === "" &&
                  //   CreditsNotesPayment.CreditNoteNo === ""
                  // }
                >
                  Search
                </MDButton>
              </Stack>
            </Grid>
          </Grid>
        </MDBox>

        {/* <MDBox width="1000px" style={{ display: "flex", justifyContent: "center" }}> */}
        <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" m={0}>
          <Stack justifyContent="space-between" p={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {rows.length > 0 ? (
                <DataGrid
                  sx={{ fontSize: "14px", fontWeight: "400" }}
                  autoHeight
                  rows={rows}
                  // checkboxSelection
                  columns={columnsp}
                  pageSize={pageSize}
                  // getRowId={(row) => row.policyNumber}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[10, 15, 20, 25]}
                  pagination
                  disableColumnMenu={!false}
                />
              ) : null}
            </Grid>
          </Stack>
        </Grid>
        {/* </MDBox> */}
      </MDBox>
    </Accordion>
  );
}

export default CreditsNotesPayments;
