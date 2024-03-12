import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MDButton from "../../../../components/MDButton";
import MDBox from "../../../../components/MDBox";
import MDInput from "../../../../components/MDInput";

const ss = {
  TransactionId: "810ee3bc-2cf9-473b-b8eb-115b63db40fd",
  Amount: "1545.00",
  MerchantId: "Dkwlba66uUF1DZ",
  GatewayId: 54,
  GatewayName: "RazorPay",
  Success: "True",
  AdditionalInfo1: "1021766147",
  AdditionalInfo2: "100418037561",
  AdditionalInfo3: "",
  AdditionalInfo4: "",
  AdditionalInfo5: "",
  AdditionalInfo6: "",
  AdditionalInfo7: "",
  AdditionalInfo8: "",
  AdditionalInfo9: "",
  AdditionalInfo10: "",
  AdditionalInfo11: "",
  AdditionalInfo12: "",
  AdditionalInfo13: "",
  AdditionalInfo14: "",
  AdditionalInfo15: "",
  GatewayErrorCode: "",
  GatewayErrorText: "",
  PGIMasterErrorCode: "",
  pgiUserErrorCode: "",
  AuthCode: "LvmBBVYEVRZ8SJ",
  PGTransactionId: "pay_LvmBBVYEVRZ8SJ",
  PGTransactionDate: "",
  PGPaymentId: "",
  OrderId: "",
};
function FormBasedRedirection() {
  console.log(111111, ss);
  const [details, setDetails] = useState({ url: "", obj: "" });

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const buildForm = ({ action, params }) => {
    console.log("buildForm", action, params);
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      console.log("element", key, params[key]);
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", params[key]);
      form.appendChild(input);
    });
    console.log("PaymentForm", form);
    return form;
  };

  const onClick = () => {
    localStorage.setItem("url123123", details.url);
    localStorage.setItem("obj123123", details.obj);

    const formData = {
      action: details.url,
      params: JSON.parse(details.obj),
    };
    const form = buildForm(formData);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  useEffect(() => {
    const url123 = localStorage.getItem("url123123");
    const obj123 = localStorage.getItem("obj123123");
    setDetails({ url: url123, obj: obj123 });
  }, []);

  return (
    <MDBox>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {" "}
          <MDInput
            label="Enter Redirection URL"
            value={details.url}
            onChange={onChange}
            name="url"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {" "}
          <MDInput
            name="obj"
            label="Enter Post  Details Object"
            value={details.obj}
            onChange={onChange}
            minRows={5}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        {" "}
        <MDButton onClick={onClick}>Redirect</MDButton>
      </Grid>
    </MDBox>
  );
}

export default FormBasedRedirection;
