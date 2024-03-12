import { useState } from "react";
import { Grid } from "@mui/material";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import { SendDocuSignEmail } from "./data";

export default function DocuSign() {
  const [obj, SetObj] = useState({
    signerName: "",
    signerEmail: "",
    ccName: "",
    ccEmail: "",
  });
  const handler = (e) => {
    obj[e.target.name] = e.target.value;
    SetObj({ ...obj });
  };
  const onSend = () => {
    SendDocuSignEmail(obj);
  };

  return (
    <Grid container spacing={2} p={3}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="signer Name" name="signerName" value={obj.signerName} onChange={handler} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="signer Email"
          name="signerEmail"
          value={obj.signerEmail}
          onChange={handler}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="cc Name" name="ccName" value={obj.ccName} onChange={handler} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="cc Email" name="ccEmail" value={obj.ccEmail} onChange={handler} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDButton onClick={onSend}>Send Mail</MDButton>{" "}
      </Grid>
    </Grid>
  );
}
