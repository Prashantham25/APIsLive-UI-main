import { useState } from "react";
import { Grid } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import RayzorPay from "../../../PolicyLive/views/Retail/data/RayzorPay";
import MDInput from "../../../../components/MDInput";

function AllPaymentMethods() {
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [rayzorObj, setRayzorObj] = useState({
    key: "",
    amount: "",
    PayeeName: "",
    PayeeEmail: "",
    PayeeContact: "",
    PayeeAddress: "",
  });
  const onRayzorChange = (e) => {
    rayzorObj[e.target.name] = e.target.value;
    setRayzorObj({ ...rayzorObj });
  };
  const onRayzor = () => {
    setPaymentMethod("Rayzor");
  };
  const onRayzorPay = () => {
    RayzorPay(rayzorObj);
  };

  return (
    <MDBox>
      <Grid container spacing={2} p={3}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDButton variant="outlined" onClick={onRayzor}>
            Rayzor Pay
          </MDButton>
        </Grid>
      </Grid>
      {PaymentMethod === "Rayzor" && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput label="Key" name="key" value={rayzorObj.key} onChange={onRayzorChange} />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Amount"
              name="amount"
              value={rayzorObj.amount}
              onChange={onRayzorChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Payee Name"
              name="PayeeName"
              value={rayzorObj.PayeeName}
              onChange={onRayzorChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Payee EmailId"
              name="PayeeEmail"
              value={rayzorObj.PayeeEmail}
              onChange={onRayzorChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Payee Contact Number"
              name="PayeeContact"
              value={rayzorObj.PayeeContact}
              onChange={onRayzorChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Payee Address"
              name="PayeeAddress"
              value={rayzorObj.PayeeAddress}
              onChange={onRayzorChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDButton onClick={onRayzorPay}>Pay</MDButton>
          </Grid>
        </Grid>
      )}
    </MDBox>
  );
}

export default AllPaymentMethods;
