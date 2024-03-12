import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Backdrop, Autocomplete, Card, CircularProgress } from "@mui/material";
// import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDBox from "components/MDBox";
import swal2 from "sweetalert2";
import { GetProdPartnermasterData, AccountConfig } from "../data/APIs/MotorCycleApi";
import { QueryExecution } from "../../../../Reports/data";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDInput from "../../../../../../../components/MDInput";
import MDButton from "../../../../../../../components/MDButton";

function TotalAccounting() {
  const [dateFlag, setDateFlag] = useState(false);
  const [crediteddateFlag, setCreditedDateFlag] = useState(false);
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };

  const helperText = "This field is Required";
  const [ErrorFlag, setErrorFlag] = useState(false);

  function amountFormat(amt) {
    let amount1 = "";
    const amt1 = amt.split(",");

    amt1.forEach((x) => {
      amount1 += x;
    });

    console.log(111111, amt1, amount1);
    return amount1;
  }

  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const getMinDateForToDate = (fromDate) => fromDate || null;
  // const [pageSize, setPageSize] = useState(10);
  const [rowsp, setRowsp] = useState([]);
  const [loader, setLoader] = useState(false);

  const [Totalaccounts, SetTotalaccounts] = useState({
    Branch: "",
    FromDate: "",
    ToDate: "",
    creditedFromDate: "",
    creditedToDate: "",
    IssuingBranch: [],
  });

  const HandleTotalAccounts = (e, type, value) => {
    // debugger;
    if (type === "Branch") {
      if (value === null) {
        Totalaccounts.Branch = "";
      } else {
        Totalaccounts.Branch = value.mValue;
      }
    }
    if (type === "FromDate") {
      if (value === null) {
        Totalaccounts.FromDate = "";
      } else {
        Totalaccounts.ToDate = "";
        Totalaccounts.FromDate = value;
      }
    }
    if (type === "ToDate") {
      if (value === null) {
        Totalaccounts.ToDate = "";
      } else {
        setDateFlag(true);
        Totalaccounts.ToDate = value;
      }
    }
    if (type === "creditedFromDate") {
      if (value === null) {
        Totalaccounts.creditedFromDate = "";
      } else {
        Totalaccounts.creditedToDate = "";
        Totalaccounts.creditedFromDate = value;
      }
    }
    if (type === "creditedToDate") {
      if (value === null) {
        Totalaccounts.creditedToDate = "";
      } else {
        Totalaccounts.creditedToDate = value;
        setCreditedDateFlag(true);
      }
    }
    setRowsp([]);
    SetTotalaccounts({ ...Totalaccounts });
    console.log("Totalaccounts", Totalaccounts);
  };

  useEffect(async () => {
    setLoader(true);
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
      await GetProdPartnermasterData("BranchName", {
        Description: Company,
      }).then((res) => {
        Totalaccounts.IssuingBranch = res.data;
      });
      SetTotalaccounts({ ...Totalaccounts });
    }
    const Payload = {
      reportname: "Nepal_AccountingCount",
      reportConfigId: 446,
      pageNumber: 0,
      isDefaultEncryption: true,
      paramList: [
        {
          parameterName: "Nepal",
          parameterValue: "Company",
        },
      ],
    };

    const TotalCount = await QueryExecution(Payload);
    console.log("TotalCount", TotalCount);
    const serializedData = TotalCount.data[0]["jsoN_F52E2B61-18A1-11d1-B105-00805F49916B"];
    const properJsonArray = JSON.parse(serializedData.replace(/\\/g, ""));
    console.log("properJsonArray", properJsonArray);

    setLoader(false);
    console.log("rowsp", rowsp);
  }, []);

  const HandleSearch = async () => {
    if (
      (Totalaccounts.creditedFromDate !== "" && Totalaccounts.creditedToDate === "") ||
      (Totalaccounts.FromDate !== "" && Totalaccounts.ToDate === "")
    ) {
      setErrorFlag(true);
      swal2.fire({
        width: "550px",
        padding: "28px",
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      setLoader(true);
      setRowsp([]);
      const Type = "";
      const Policies = await AccountConfig(Type);
      console.log("Policies", Policies);
      const Data = Policies.filter((x) => {
        const Branchname = Totalaccounts.Branch !== "";
        const depositedFromDate = Totalaccounts.FromDate !== "";
        const depositedToDate = Totalaccounts.ToDate !== "";
        const creditedFromDate = Totalaccounts.creditedFromDate !== "";
        const creditedToDate = Totalaccounts.creditedToDate !== "";

        if (
          Branchname &&
          depositedFromDate &&
          dateFlag &&
          depositedToDate &&
          creditedFromDate &&
          crediteddateFlag &&
          creditedToDate
        ) {
          return (
            x.creditedDate !== "" &&
            x.branchName === Totalaccounts.Branch &&
            x.creditedFromDate === Totalaccounts.creditedFromDate &&
            x.depositedDate >= Totalaccounts.FromDate &&
            x.depositedDate <= Totalaccounts.ToDate &&
            x.creditedDate >= Totalaccounts.creditedFromDate &&
            x.creditedDate <= Totalaccounts.creditedToDate
          );
        }
        if (Branchname && depositedFromDate && dateFlag && depositedToDate) {
          return (
            x.branchName === Totalaccounts.Branch &&
            x.depositedDate >= Totalaccounts.FromDate &&
            x.depositedDate <= Totalaccounts.ToDate
          );
        }
        if (Branchname && creditedFromDate && crediteddateFlag && creditedToDate) {
          return (
            x.creditedDate !== "" &&
            x.branchName === Totalaccounts.Branch &&
            x.Crediteddate >= Totalaccounts.creditedFromDate &&
            x.Crediteddate <= Totalaccounts.creditedToDate
          );
        }
        if (
          creditedFromDate &&
          crediteddateFlag &&
          creditedToDate &&
          depositedFromDate &&
          dateFlag &&
          depositedToDate
        ) {
          return (
            x.creditedDate !== "" &&
            x.creditedDate >= Totalaccounts.creditedFromDate &&
            x.creditedDate <= Totalaccounts.creditedToDate &&
            x.depositedDate >= Totalaccounts.FromDate &&
            x.depositedDate <= Totalaccounts.ToDate
          );
        }
        if (depositedFromDate && dateFlag && depositedToDate) {
          return (
            x.depositedDate >= Totalaccounts.FromDate && x.depositedDate <= Totalaccounts.ToDate
          );
        }
        if (creditedFromDate && crediteddateFlag && creditedToDate) {
          return (
            x.creditedDate !== "" &&
            x.creditedDate >= Totalaccounts.creditedFromDate &&
            x.creditedDate <= Totalaccounts.creditedToDate
          );
        }
        if (Branchname) {
          return x.branchName === Totalaccounts.Branch;
        }
        return true;
      });

      let cashInCollections = 0;
      let chequeInCollections = 0;
      let collectionsCount = 0;

      let cashdeposit = 0;
      let chequedeposit = 0;
      let depositedCount = 0;

      let depnotCredited = 0;
      let chequenotCredited = 0;
      let cashnotCredited = 0;

      let cashcredit = 0;
      let chequecredit = 0;
      let creditCount = 0;

      if (Array.isArray(Data)) {
        Data.forEach((policy) => {
          // debugger;
          // const amount = parseFloat(policy.amount);
          const amount11 = amountFormat(policy.amount);
          const amount = parseFloat(amount11);
          console.log("amount", amount);
          switch (policy.type) {
            case "Collections":
              if (policy.paymentMode === "Cash") {
                cashInCollections += amount;
              } else if (policy.paymentMode === "Cheque") {
                chequeInCollections += amount;
              }
              collectionsCount = cashInCollections + chequeInCollections;
              break;

            case "Deposited":
              if (policy.paymentMode === "Cash" && policy.status === "") {
                cashnotCredited += amount;
              } else if (policy.paymentMode === "Cheque") {
                chequenotCredited += amount;
              }

              break;
            case "Credit":
              if (policy.paymentMode === "Cash") {
                if (policy.status === "Credited") {
                  cashcredit += amount;
                  cashdeposit += amount;
                }
              } else if (policy.paymentMode === "Cheque") {
                if (policy.status === "Credited") {
                  chequecredit += amount;
                }
                if (policy.status === "Not Credited") {
                  chequedeposit += amount;
                }
              }
              break;
            default:
              break;
          }
          depnotCredited = cashnotCredited + chequenotCredited;
          depositedCount = cashdeposit + chequedeposit;
          creditCount = cashcredit + chequecredit;
        });
      } else {
        console.log("Policies is not an array.");
      }
      const formattedData = [
        {
          id: 1,
          Cash: formater.format(cashInCollections),
          Cheque: formater.format(chequeInCollections),
          Total: formater.format(collectionsCount),
        },
        {
          id: 2,
          Cash: formater.format(cashdeposit),
          Cheque: formater.format(chequedeposit),
          Total: formater.format(depositedCount),
        },
        {
          id: 3,
          Cash: formater.format(cashnotCredited),
          Cheque: formater.format(chequenotCredited),
          Total: formater.format(depnotCredited),
        },
        {
          id: 4,
          Cash: formater.format(cashcredit),
          Cheque: formater.format(chequecredit),
          Total: formater.format(creditCount),
        },
      ];

      setRowsp(formattedData);
      console.log("formattedData", formattedData);
      setLoader(false);
    }
  };

  const options = {
    pagination: false,
    rowsPerPageOptions: [],
  };

  const columnsp = [
    {
      field: "Name",
      headerName: "",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      valueGetter: (params) => {
        if (params.field === "Name") {
          switch (params.row.id) {
            case 1:
              return "Total Collections";
            case 2:
              return "Total Deposits";
            case 3:
              return "Total Undeposited";
            case 4:
              return "Total Credits";
            default:
              return "";
          }
        }
        return params.getValue(params.field);
      },
    },
    {
      field: "Cash",
      headerName: "Cash",
      width: 230,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "Cheque",
      headerName: "Cheque",
      width: 230,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },

    {
      field: "Total",
      headerName: "Total",
      width: 230,
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <Card style={{ display: "flex", justifyContent: "center" }}>
      {loader ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
      <Grid container spacing={1} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h5">Accounting / Total Accounting</MDTypography>
        </Grid>
      </Grid>
      <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2} spacing={1}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            options={Totalaccounts.IssuingBranch || []}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            value={{ mValue: Totalaccounts.Branch }}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, value) => HandleTotalAccounts(e, "Branch", value)}
            renderInput={(params) => <MDInput {...params} label="Branch" />}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            fullWidth
            options={{
              dateFormat: "d/m/Y",
              altFormat: "d-m-Y",
              altInput: true,
              maxDate: new Date(),
            }}
            input={{
              label: "Deposited Date From",
              value: Totalaccounts.FromDate,
            }}
            value={Totalaccounts.FromDate}
            onChange={(e, date) => HandleTotalAccounts(e, "FromDate", date)}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            fullWidth
            disabled={Totalaccounts.FromDate === ""}
            options={{
              dateFormat: "d/m/Y",
              altFormat: "d-m-Y",
              altInput: true,
              minDate: getMinDateForToDate(Totalaccounts.FromDate),
              maxDate: new Date(),
            }}
            input={{
              label: "Deposited Date To",
              value: Totalaccounts.ToDate,
              error: Totalaccounts.FromDate !== "" && ErrorFlag && Totalaccounts.ToDate === "",
              helperText:
                Totalaccounts.FromDate !== "" && ErrorFlag && Totalaccounts.ToDate === ""
                  ? helperText
                  : "",
              required: Totalaccounts.FromDate !== "",
              sx: redAsterisk,
            }}
            value={Totalaccounts.ToDate}
            onChange={(e, date) => HandleTotalAccounts(e, "ToDate", date)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            fullWidth
            options={{
              dateFormat: "d/m/Y",
              altFormat: "d-m-Y",
              altInput: true,
              maxDate: new Date(),
            }}
            input={{
              label: "Credited From Date",
              value: Totalaccounts.creditedFromDate,
            }}
            value={Totalaccounts.creditedFromDate}
            onChange={(e, date) => HandleTotalAccounts(e, "creditedFromDate", date)}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            fullWidth
            disabled={Totalaccounts.creditedFromDate === ""}
            options={{
              dateFormat: "d/m/Y",
              altFormat: "d-m-Y",
              altInput: true,
              minDate: getMinDateForToDate(Totalaccounts.creditedFromDate),
              maxDate: new Date(),
            }}
            input={{
              label: "Credited To Date",
              value: Totalaccounts.creditedToDate,
              error:
                Totalaccounts.creditedFromDate !== "" &&
                ErrorFlag &&
                Totalaccounts.creditedToDate === "",
              helperText:
                Totalaccounts.creditedFromDate !== "" &&
                ErrorFlag &&
                Totalaccounts.creditedToDate === ""
                  ? helperText
                  : "",
              required: Totalaccounts.creditedFromDate !== "",
              sx: redAsterisk,
            }}
            value={Totalaccounts.creditedToDate}
            onChange={(e, date) => HandleTotalAccounts(e, "creditedToDate", date)}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} marginLeft="1120px">
          <MDButton color="info" variant="outlined" onClick={HandleSearch}>
            Search
          </MDButton>
        </Grid>
      </Grid>
      <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} marginLeft="125px">
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10} marginRight="135px">
          {rowsp.length > 0 ? (
            <DataGrid
              sx={{
                fontSize: "18px",
                fontWeight: "400",
                justifyContent: "center",
              }}
              autoHeight
              rows={rowsp}
              columns={columnsp}
              options={options}
              pageSize={8}
              hideFooter
            />
          ) : null}
        </Grid>
      </Grid>
    </Card>
  );
}

export default TotalAccounting;
