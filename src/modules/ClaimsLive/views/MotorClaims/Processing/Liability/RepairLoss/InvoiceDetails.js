import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Grid } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import MDBox from "../../../../../../../components/MDBox";
import MDButton from "../../../../../../../components/MDButton";
import MDTypography from "../../../../../../../components/MDTypography";
import { processingData, dispObj, VDA } from "../../data/JsonData";
import { dispatcherDetails } from "../../data/index";
// import { GetAction } from "../../../../../../Login/data";

function RenderControl({ item }) {
  // const invoiceD = invoicedata;
  const [datevalue, setDateValue] = useState("");

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  // const handlechange = (e) => {
  //   invoiceD.InvoiceDetails[0].Invoicetable[0][e.target.name] = e.target.value;
  //   setinvoicedata((prev) => ({ ...prev, ...invoiceD }));
  //   console.log("invoicedata", invoiceD);
  // };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
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
                name={item.name}
                // value={invoicedata.InvoiceDetails[0][item.name]}
                // onChange={handlechange}
                value={item.value}
                onChange={item.onchange}
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
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, item.label, value)}
                renderInput={(params) => <MDInput {...params} label={item.label} />}
              />
            );
          default:
            return <div />;
        }
      })()}
    </div>
  );
}

function InvoiceDetails() {
  const [invoicedata, setinvoicedata] = useState(processingData);
  const Location = useLocation();
  // const [dispatcherObj, setDispatcherData] = useState({ dispObj });
  const vda = useState({ VDA });
  // const [actionData, setActionData] = useState([]);
  useEffect(async () => {
    Object.assign(dispObj.TxnObject, Location.state.claimData.finalResult[0]);
    Object.assign(dispObj.TxnObject.transactionDataDTO[0].transactionDetails, vda);
    dispObj.TxnObject.workflowId = Location.state.value;
    // console.log("dispObj", dispObj);
    // setDispatcherData(dispObj);
  }, []);
  console.log("processingData", processingData);
  // useEffect(async () => {
  //   debugger;
  //   const data1 = await GetAction(Location.state.value2);
  //   console.log(data1);
  //   if (data1.status === 200) {
  //     console.log("action data", data1.data);
  //     setActionData(data1.data);
  //   }
  // }, []);
  const handleSubmit = async () => {
    const resp = await dispatcherDetails(dispObj);
    if (resp.status === 200) {
      alert("Saved!");
    }
  };
  // const handlechange1 = (e) => {
  //   invoicedata.InvoiceDetails[0][e.target.name] = e.target.value;
  //   setinvoicedata((prev) => ({ ...prev, ...invoicedata }));
  //   console.log("invoicedata", invoicedata);
  // };
  const handlechange2 = (e) => {
    invoicedata.SummarizedReport[e.target.name] = e.target.value;
    setinvoicedata((prev) => ({ ...prev, ...invoicedata }));
    console.log("invoicedata", invoicedata);
  };

  const SummarizedReportItems = [
    {
      type: "Input",
      label: "Part assessed",
      visible: true,
      name: "partAssessed",
      value: invoicedata.SummarizedReport.partAssessed,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Metal Part Amount    ",
      visible: true,
      name: "metalPartAmount",
      value: invoicedata.SummarizedReport.metalPartAmount,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Rubber/Plastic amount",
      visible: true,
      name: "rubberPlasticAmount",
      value: invoicedata.SummarizedReport.rubberPlasticAmount,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Fiber part amount",
      visible: true,
      name: "fiberPartAmount",
      value: invoicedata.SummarizedReport.fiberPartAmount,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Glass part amount",
      visible: true,
      name: "glassPartAmount",
      value: invoicedata.SummarizedReport.glassPartAmount,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Repair Labour",
      visible: true,
      name: "repairlabour",
      value: invoicedata.SummarizedReport.repairlabour,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Remove/Refit Labour",
      visible: true,
      name: "removelabour",
      value: invoicedata.SummarizedReport.removelabour,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Paint",
      visible: true,
      name: "paint",
      value: invoicedata.SummarizedReport.paint,
      onchange: handlechange2,
    },
    // {
    //   type: "Input",
    //   label: "Deductible Component (Parts)",
    //   visible: true,
    //   name: "deductibleComponentLabour",
    //   value: invoicedata.SummarizedReport.deductibleComponentLabour,
    //   onchange: handlechange2,
    // },
    {
      type: "Input",
      label: "Towing charges",
      visible: true,
      name: "towingCharges",
      value: invoicedata.SummarizedReport.towingCharges,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Total Consumable Amount",
      visible: true,
      name: "Totalconsumableamount",
      value: invoicedata.SummarizedReport.Totalconsumableamount,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Total Key replacement cover",
      visible: true,
      name: "TotalKeyreplacementcover",
      value: invoicedata.SummarizedReport.TotalKeyreplacementcover,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Total Hydrostatic lock cover amount",
      visible: true,
      name: "totalHydrostaticlockCoverAmount",
      value: invoicedata.SummarizedReport.totalHydrostaticlockCoverAmount,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Total Engine and gearbox protection cover",
      visible: true,
      name: "enginegearboxprotection",
      value: invoicedata.SummarizedReport.enginegearboxprotection,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Loss of Personal Belongings Clause",
      visible: true,
      name: "lossofpersonal",
      value: invoicedata.SummarizedReport.lossofpersonal,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Secure Towing",
      visible: true,
      name: "towing",
      value: invoicedata.SummarizedReport.towing,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Engine Protector",
      visible: true,
      name: "engineprotector",
      value: invoicedata.SummarizedReport.engineprotector,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "NCB Protector",
      visible: true,
      name: "ncb",
      value: invoicedata.SummarizedReport.ncb,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Daily Cash Allowance Benefit",
      visible: true,
      name: "allowancebenefit",
      value: invoicedata.SummarizedReport.allowancebenefit,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Road side Assistance Cover",
      visible: true,
      name: "roadsideassitencecover",
      value: invoicedata.SummarizedReport.roadsideassitencecover,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Tyre And Rim Secure",
      visible: true,
      name: "tyrerimsecure",
      value: invoicedata.SummarizedReport.tyrerimsecure,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Wrong Fuel Cover",
      visible: true,
      name: "wrongfuelcover",
      value: invoicedata.SummarizedReport.wrongfuelcover,
      onchange: handlechange2,
    },
    // { type: "AutoComplete", label: "Depreciation cover Amount", visible: true },
    {
      type: "Input",
      label: "Additional Expense Coverage Clause(Emergency Hotel & Transportation)",
      visible: true,
      name: "additionalexpense",
      value: invoicedata.SummarizedReport.additionalexpense,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Insurance at Manufacturing Selling Price",
      visible: true,
      name: "manufacturingsellingprice",
      value: invoicedata.SummarizedReport.manufacturingsellingprice,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "License and Registration Certificate",
      visible: true,
      name: "licensecertificate",
      value: invoicedata.SummarizedReport.licensecertificate,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Hospital Daily Cash Cover",
      visible: true,
      name: "dailycashcover",
      value: invoicedata.SummarizedReport.dailycashcover,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Accidental Hospitalization Cover for Family",
      visible: true,
      name: "hopitalcover",
      value: invoicedata.SummarizedReport.hopitalcover,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Tyre Protector",
      visible: true,
      name: "tyreprotector",
      value: invoicedata.SummarizedReport.tyreprotector,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Net Parts Amount With Depreciation",
      visible: true,
      name: "netpartwithdep",
      value: invoicedata.SummarizedReport.netpartwithdep,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Net Parts Amount without Depreciation",
      visible: true,
      name: "netpartwithoutdep",
      value: invoicedata.SummarizedReport.netpartwithoutdep,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Net Paint Amount with Depreciation",
      visible: true,
      name: "netpaintwithdep",
      value: invoicedata.SummarizedReport.netpaintwithdep,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Net Paint Amount without Depreciation",
      visible: true,
      name: "netpaintwithoutdep",
      value: invoicedata.SummarizedReport.netpaintwithoutdep,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Depriciated amount inclusive of taxes on paint",
      visible: true,
      name: "depamtpaint",
      value: invoicedata.SummarizedReport.depamtpaint,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Depriciated amount inclusive of taxes on parts",
      visible: true,
      name: "depamtpart",
      value: invoicedata.SummarizedReport.depamtpart,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Less: compulsory excess",
      visible: true,
      name: "lessC",
      value: invoicedata.SummarizedReport.lessC,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Less: Voluntary excess",
      visible: true,
      name: "lessV",
      value: invoicedata.SummarizedReport.lessV,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Less: Salvage",
      visible: true,
      name: "lessS",
      value: invoicedata.SummarizedReport.lessS,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Less: Discount",
      visible: true,
      name: "lessD",
      value: invoicedata.SummarizedReport.lessD,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Total deductions",
      visible: true,
      name: "dedctions",
      value: invoicedata.SummarizedReport.dedctions,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Net Settlement",
      visible: true,
      name: "netSettlement",
      value: invoicedata.SummarizedReport.netSettlement,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Non Standard %",
      visible: true,
      name: "nonstandard",
      value: invoicedata.SummarizedReport.nonstandard,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Non Standard Deduction Amount",
      visible: true,
      name: "nonstandereddeductionamt",
      value: invoicedata.SummarizedReport.nonstandereddeductionamt,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Final Claim Amount",
      visible: true,
      name: "finalclaimamt",
      value: invoicedata.SummarizedReport.finalclaimamt,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "GST on Parts",
      visible: true,
      name: "gstparts",
      value: invoicedata.SummarizedReport.gstparts,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "GST on Labour",
      visible: true,
      name: "gstlabour",
      value: invoicedata.SummarizedReport.gstlabour,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "GST on Paint",
      visible: true,
      name: "gstpaint",
      value: invoicedata.SummarizedReport.gstpaint,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Tota lGST",
      visible: true,
      name: "totaligst",
      value: invoicedata.SummarizedReport.totaligst,
      onchange: handlechange2,
    },
    {
      type: "Input",
      label: "Net Claim Amount",
      visible: true,
      name: "netclaimamnt",
      value: invoicedata.SummarizedReport.netclaimamnt,
      onchange: handlechange2,
    },
  ];
  const liabilitysumm = [
    {
      type: "Input",
      label: "Net Payable Without GST",
      visible: true,
      name: "netpayablewithoutgst",
    },
    {
      type: "Input",
      label: "CGST",
      visible: true,
      name: "cgst",
    },
    { type: "Input", label: "SGST", visible: true, name: "sgst" },
    { type: "Input", label: "UGST", visible: true, name: "ugst" },
    { type: "Input", label: "IGST", visible: true, name: "igst" },
    { type: "Input", label: "Total GST", visible: true, name: "totalgst" },
    { type: "Input", label: "Payable Amount", visible: true, name: "payableamt" },
  ];

  return (
    <Grid container spacing={1}>
      {SummarizedReportItems.map(
        (item) =>
          // item.visible && item.type === "space" ? (
          item.type === "space" ? (
            <Grid item xs={12} sm={12} md={0.75} lg={0.75} xl={0.75} xxl={0.75}>
              <RenderControl item={item} />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={2.25} lg={2.25} xl={2.25} xxl={2.25}>
              <RenderControl
                item={item}
                invoicedata={invoicedata}
                setinvoicedata={setinvoicedata}
              />
            </Grid>
          )
        // ) : null
      )}
      <MDBox>
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ borderBottom: 1, borderColor: "primary.main" }}
          >
            <MDTypography color="primary">Liability Summary</MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1.5}>
              {liabilitysumm.map((item) =>
                item.visible ? (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <RenderControl item={item} />
                  </Grid>
                ) : null
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDButton>Save</MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDButton onClick={() => handleSubmit()}>Submit FLA</MDButton>
            {/* <MDButton>Submit FLA</MDButton> */}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDButton>Print and Preview</MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Grid>
  );
}
export default InvoiceDetails;
