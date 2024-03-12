import React, { useState, useEffect } from "react";
import { Grid, Autocomplete } from "@mui/material";
import MDDatePicker from "components/MDDatePicker";
import MDTypography from "components/MDTypography";
import masters from "./data/masterData";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
// import MDButton from "../../../../../components/MDButton";

// function SavePayment() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 500,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 8,
//   };

//   return (
//     <div>
//       <MDButton onClick={handleOpen} sx={{ ml: 120 }}>
//         Save Payment
//       </MDButton>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <MDBox sx={style}>
//           <MDTypography font-family="Roboto" fontSize="20px" mb={1}>
//             <strong>Payment Details Saved & Policy Details Shared Successfully</strong>
//           </MDTypography>

//           <MDButton sx={{ ml: 15, mt: 3 }}>View Policies</MDButton>
//         </MDBox>
//       </Modal>
//     </div>
//   );
// }

function Payment({ handleDateChange, handleSetAutoComplete }) {
  const [Offlinepayment, setofflinepayment] = useState({
    PaymentMode: "",
    PayerType: "",
    PayerCode: "",
    PayerName: "",
    InstrumentNumber: "",
    PaymentAmount: "",
    InstrumentDate: "",
    BranchName: "",
  });
  const handleChange = (e) => {
    setofflinepayment((Prev) => ({ ...Prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(Offlinepayment);
  });
  return (
    <div>
      <MDTypography variant="h6" color="primary">
        Offline Payment Details
      </MDTypography>
      <MDBox pt={3}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Payment Mode"
              value={Offlinepayment.PaymentMode}
              onChange={handleChange}
              name="PaymentMode"
            />
          </Grid> */}

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            {/* <MDInput label="Policy Type" value={PolicyDto.PolicyType} onChange={handleChange} /> */}
            <Autocomplete
              id="ModeOfPayment"
              options={masters.PaymentMode}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, value) => handleSetAutoComplete(e, "ModeOfPayment", value)}
              renderInput={(params) => <MDInput {...params} label="Payment Mode" />}
            />
          </Grid>

          {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Payer Type"
              value={Offlinepayment.PayerType}
              onChange={handleChange}
              name="PayerType"
            />
          </Grid> */}
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            {/* <MDInput label="Policy Type" value={PolicyDto.PolicyType} onChange={handleChange} /> */}
            <Autocomplete
              id="PayerType"
              options={masters.PayerType}
              // onChange={calculateInsurer("2A+3C")}
              // onchange={(value) => calculateInsurer(value)}
              // onChange={(e, value) => handleSetAutoComplete(e, "FamilyType", value)}
              getOptionLabel={(option) => option.mValue}
              // onChange={(e, mValue) => calculateInsurer(e, mValue)}
              onChange={(e, mValue) => handleChange(e, mValue)}
              renderInput={(params) => <MDInput {...params} label="Payer Type" />}
            />
          </Grid>
          {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Payer Code"
              value={Offlinepayment.PayerCode}
              onChange={handleChange}
              name="PayerCode"
            />
          </Grid> */}
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            {/* <MDInput label="Policy Type" value={PolicyDto.PolicyType} onChange={handleChange} /> */}
            <Autocomplete
              id="PayerCode"
              options={masters.PayerCode}
              // onChange={calculateInsurer("2A+3C")}
              // onchange={(value) => calculateInsurer(value)}
              // onChange={(e, value) => handleSetAutoComplete(e, "FamilyType", value)}
              getOptionLabel={(option) => option.mValue}
              // onChange={(e, mValue) => calculateInsurer(e, mValue)}
              onChange={(e, mValue) => handleChange(e, mValue)}
              renderInput={(params) => <MDInput {...params} label="Payer Code" />}
            />
          </Grid>
          {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Payer Name"
              value={Offlinepayment.PayerName}
              onChange={handleChange}
              name="PayerName"
            />
          </Grid> */}
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            {/* <MDInput label="Policy Type" value={PolicyDto.PolicyType} onChange={handleChange} /> */}
            <Autocomplete
              id="PayerName"
              options={masters.PayerName}
              // onChange={calculateInsurer("2A+3C")}
              // onchange={(value) => calculateInsurer(value)}
              // onChange={(e, value) => handleSetAutoComplete(e, "FamilyType", value)}
              getOptionLabel={(option) => option.mValue}
              // onChange={(e, mValue) => calculateInsurer(e, mValue)}
              onChange={(e, mValue) => handleChange(e, mValue)}
              renderInput={(params) => <MDInput {...params} label="Payer Name" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Instrument Number"
              value={Offlinepayment.InstrumentNumber}
              onChange={handleChange}
              name="InstrumentNumber"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              fullWidth
              input={{ label: "Instrument Date" }}
              // value={InstrumentDate}
              onChange={(e) => handleDateChange(e, "InstrumentDate")}
              options={{ altFormat: "d-m-Y", altInput: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Payment Amount"
              value={Offlinepayment.PaymentAmount}
              onChange={handleChange}
              name="PaymentAmount"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Bank Name"
              value={Offlinepayment.BankName}
              onChange={handleChange}
              name="BankName"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Branch Name"
              value={Offlinepayment.BranchName}
              onChange={handleChange}
              name="BranchName"
            />
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <SavePayment />
        </Grid> */}
        {/* <MDButton sx={{ ml: 120 }} onClick={handleNext}>
          Save Payment
        </MDButton> */}
      </MDBox>
    </div>
  );
}

export default Payment;
