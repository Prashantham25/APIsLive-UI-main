import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
// import processingData from "../../data/JsonData";

function RenderControl({ item }) {
  //   const enterinvoiceD = enterinvoicedata;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  //   const handlechange = (e) => {
  //     enterinvoiceD.DescriptiveRepairAssessmentsheet.EnterInvoiceDetails[e.target.name] =
  //       e.target.value;
  //     setenterinvoicedata((prev) => ({ ...prev, ...enterinvoiceD }));
  //   };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    // enterinvoiceD.cashLossInfo[type] = value.mValue;
    // setenterinvoicedata({ ...enterinvoiceD });
    // console.log("enterinvoiceD", enterinvoiceD);
    console.log(value.mValue, type);
  };
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput
                label={item.label}
                // name={item.name}
                // value={
                //   enterinvoiceD.DescriptiveRepairAssessmentsheet.EnterInvoiceDetails[item.name]
                // }
                // onChange={handlechange}
              />
            );
          case "DateTime":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy hh:mm:ss a"
                  value={datevalue}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "Date":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy"
                  value={datevalue}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "AutoComplete":
            return (
              <Autocomplete
                // id="Salutation"
                options={ComboValue}
                // groupBy={(option) => option.firstLetter}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // value={{
                //   mValue:
                //     enterinvoiceD.DescriptiveRepairAssessmentsheet.EnterInvoiceDetails[item.name],
                // }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, item.label, value)}
                renderInput={(params) => <MDInput {...params} label={item.label} />}
              />
            );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function SalvageDiscount({ onClose }) {
  //   const [enterinvoicedata, setenterinvoicedata] = useState(processingData);
  const salvagedis = [
    {
      field: "particulars",
      headerName: "Particulars",
      width: 250,
      headerAlign: "center",
    },
    {
      field: "metal",
      headerName: "Metal/Wooden%",
      width: 250,
      headerAlign: "center",
      // editable: true,
      renderCell: () => (
        <MDInput
        // // disabled={TravelEnquiryFlag}
        // name="billNo"
        // value={param.row.billNo}
        // onChange={(e) => {
        //   onBillDetails({ e, param });
        // }}
        />
      ),
    },
    {
      field: "plastic",
      headerName: "Plastic/Rubber%",
      width: 250,
      headerAlign: "center",
      // editable: true,
      renderCell: () => (
        <MDInput
        // disabled={TravelEnquiryFlag}
        // name="billNo"
        // value={param.row.billNo}
        // onChange={(e) => {
        //   onBillDetails({ e, param });
        // }}
        />
      ),
    },
    {
      field: "fiber",
      headerName: "Fiber%",
      width: 250,
      headerAlign: "center",
      // editable: true,
      renderCell: () => (
        <MDInput
        // // disabled={TravelEnquiryFlag}
        // name="billNo"
        // value={param.row.billNo}
        // onChange={(e) => {
        //   onBillDetails({ e, param });
        // }}
        />
      ),
    },
    {
      field: "glass",
      headerName: "Glass%",
      width: 250,
      headerAlign: "center",
      // editable: true,
      renderCell: () => (
        <MDInput
        // disabled={TravelEnquiryFlag}
        // name="billNo"
        // value={param.row.billNo}
        // onChange={(e) => {
        //   onBillDetails({ e, param });
        // }}
        />
      ),
    },
    {
      field: "paint",
      headerName: "Paint Material%",
      width: 250,
      headerAlign: "center",
      // editable: true,
      renderCell: () => (
        <MDInput
        // disabled={TravelEnquiryFlag}
        // name="billNo"
        // value={param.row.billNo}
        // onChange={(e) => {
        //   onBillDetails({ e, param });
        // }}
        />
      ),
    },
  ];
  const input = [{ type: "Input", label: "Spot Settlement Discount Amount", visible: true }];
  const rows = [
    { id: 1, particulars: "Salvage Rate" },
    { id: 2, particulars: "Discount on Parts" },
  ];

  return (
    <MDBox>
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <MDButton onClick={onClose}>X</MDButton>
      </MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderBottom: 1, borderColor: "primary.main" }}
        >
          <MDTypography color="primary">Salvage Discount</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            {salvagedis.map((item) =>
              item.visible ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RenderControl item={item} />
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <DataGrid autoHeight rows={rows} columns={salvagedis} />
      </Grid>
      <Grid container spacing={1.5}>
        {input.map((item) =>
          item.visible ? (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <RenderControl item={item} />
            </Grid>
          ) : null
        )}
      </Grid>
    </MDBox>
  );
}
export default SalvageDiscount;
