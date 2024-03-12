import { React, useState, useEffect } from "react";
import { Grid, Accordion, AccordionDetails } from "@mui/material";
import MDBox from "components/MDBox";
import Box from "@mui/material/Box";
import MDInput from "components/MDInput";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDButton from "components/MDButton";
import Autocomplete from "@mui/material/Autocomplete";
import ViewPolicyData from "modules/PolicyLive/views/Home/data/ViewPolicydata";
import { postRequest } from "core/clients/axiosclient";
import { DataGrid } from "@mui/x-data-grid";
import Policysearch from "./PolicySearchjson";
// import FetchPolicy from "./index";

function MDDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <MDInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

function viewPolicy() {
  const [Fetchdata] = useState(Policysearch);
  const [Value, setValue] = useState();
  const [flag, setFlag] = useState(false);
  const [tableData, setTableData] = useState([]);
  const handelset = (e) => {
    setValue(e.target.value);
    Fetchdata[e.target.name] = e.target.value;
  };

  const handleSetValue = (e, value) => {
    Fetchdata[e.target.id.split("-")[0]] = value.mValue;
  };
  const handleDateChange = (e, name) => {
    // const date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // const mm1 = date1.getMonth().toString();
    // const dd1 = date1.getDate().toString();
    // if (dd1 === 1 && mm1 === 0) {
    //   date1.setMonth(11);
    // } else {
    //   date1.setFullYear(date1.getFullYear() + 1);
    // }
    // date1.setDate(date1.getDate() - 1);

    if (name === "Quotation Creation Date From") {
      Fetchdata.eventDate = name;
    }
  };

  const callRetrieveMethod = async (jsonValue) => {
    try {
      const proposal = await postRequest(`Policy/PolicySearch`, jsonValue);
      return proposal;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const callPolicysearch = () => {
    console.log("RequestData", Fetchdata);
    callRetrieveMethod(Fetchdata).then((result) => {
      console.log("Responsedata", result);
      if (result.status === 200) {
        setTableData(result);
        setFlag(true);
      }
    });
  };

  useEffect(() => {
    if (flag === true) {
      callRetrieveMethod(Fetchdata)
        .then((data) => data.json())
        .then((data) => setTableData(data));
      console.log("Setbinddata", setTableData);
      console.log("binddata", tableData);
    }
  }, []);
  const columns = [
    { field: "id", headerName: "S.No", width: 90 },
    { field: "quoteNo", headerName: "Quote Number", width: 200 },
    { field: "insuredName", headerName: "Customer Name", width: 200 },
    { field: "policyStatus", headerName: "Status", width: 150 },
    { field: "createdDate", headerName: "Date", width: 150 },
    { field: "PolicyNumber", headerName: "Policy Number", width: 200 },
    { field: "mobileNumber", headerName: "Download", width: 200 },
  ];
  // if (setFlag === true) {
  //   useEffect(() => {
  //     callRetrieveMethod(Fetchdata)
  //       .then((data) => data.json())
  //       .then((data) => setTableData(data));
  //     console.log("Setbinddata", setTableData);
  //     console.log("binddata", tableData);
  //   }, []);
  // }
  // const rows = [
  //   {
  //     id: 1,
  //     quoteNo: 1,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  //   {
  //     id: 2,
  //     quoteNo: 2,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  //   {
  //     id: 3,
  //     quoteNo: 3,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  //   {
  //     id: 4,
  //     quoteNo: 4,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  //   {
  //     id: 5,
  //     quoteNo: 5,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  //   {
  //     id: 6,
  //     quoteNo: 6,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  //   {
  //     id: 7,
  //     quoteNo: 7,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  //   {
  //     id: 8,
  //     quoteNo: 8,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  //   {
  //     id: 9,
  //     quoteNo: 9,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  //   {
  //     id: 10,
  //     quoteNo: 10,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  //   {
  //     id: 11,
  //     quoteNo: 11,
  //     insuredName: "Snow",
  //     policyStatus: "Jon",
  //     createdDate: 35,
  //     PolicyNumber: "1263748",
  //     mobilenumber: "98394857829",
  //   },
  // ];

  return (
    <MDBox sx={{ width: "100%", px: 5 }}>
      <MDTypography>View Policy</MDTypography>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid px={50}>
            <Autocomplete
              id="Product"
              name="Product"
              options={ViewPolicyData.Product}
              onChange={handleSetValue}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Product" required />}
            />
          </Grid>
          <Grid pt={2} container spacing={2}>
            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                fullWidth
                justifyContent="center"
                label="Quotation Number"
                name="Quotation Number"
                input={{ label: "Quotation Number" }}
                // value={Value}
                // onChange={handelset}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                fullWidth
                label="Customer Name"
                name="customerName"
                // value={Value}
                // onChange={handelset}
                required
              />
            </Grid>
            <Grid item xs={10} sm={10} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="Status of Quote"
                name="Status of Quote"
                options={ViewPolicyData.QuoteStatus}
                onChange={handleSetValue}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Status of Quote" required />}
              />
            </Grid>
          </Grid>
          <Grid pt={2} container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                name="Quotation Creation Date From"
                options={{ altFormat: "d-m-Y", altInput: true }}
                input={{ label: "Quotation Creation Date From" }}
                value={{ label: "Quotation Creation Date From" }}
                onChange={(e) => handleDateChange(e, "Quotation Creation Date From")}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                name="Quotation Creation Date To"
                options={{ altFormat: "d-m-Y", altInput: true }}
                input={{ label: "Quotation Creation Date To" }}
                value={{ label: "Quotation Creation Date To" }}
                onChange={(e) => handleDateChange(e, "Quotation Creation Date To")}
                required
              />
              <span className="calender-placment">
                <i className="fal fa-calendar-alt" />
              </span>
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                fullWidth
                label="Policy Number"
                name="policynumber"
                value={Value}
                onChange={handelset}
                required
              />
            </Grid>
          </Grid>

          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }} justifyContent="right">
            <MDButton onClick={() => callPolicysearch()}>Search</MDButton>
          </MDBox>

          {flag ? (
            <Grid pt={2} container spacing={2}>
              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={tableData.data}
                  dataSource={tableData}
                  columns={columns}
                  getRowId={(row) => row.policyId}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                  // experimentalFeatures={{ newEditingApi: true }}
                />
              </Box>
            </Grid>
          ) : null}
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default viewPolicy;
