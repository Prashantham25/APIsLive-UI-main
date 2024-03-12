import { React, useState } from "react";
import { Grid, Stack } from "@mui/material";
import swal from "sweetalert2";
import Success from "assets/images/NBRetail/Success.png";
import MDTypography from "../../../../../../components/MDTypography";
import MDInput from "../../../../../../components/MDInput";
import MDButton from "../../../../../../components/MDButton";
import { policyDto } from "./data/NBTravelJson";

import { ProposerLink } from "./data/APIs/NBTravelApi";

function CustomerPolicyIssuance() {
  const [data, setData] = useState(policyDto);
  const [disable, setDisable] = useState(true);
  const handleProposer = (e) => {
    if (e.target.name === "Name") {
      data.ProposerDetails.Name = e.target.value;
    }
    if (e.target.name === "EmailId") {
      data.ProposerDetails.EmailId = e.target.value;
    }
    if (e.target.name === "MobileNbr") {
      data.ProposerDetails.ContactNo = e.target.value;
    }
    setData({ ...data });

    if (
      data.ProposerDetails.ContactNo !== "" &&
      data.ProposerDetails.Name !== "" &&
      data.ProposerDetails.EmailId !== ""
    ) {
      setDisable(false);
    }

    if (
      data.ProposerDetails.ContactNo === "" ||
      data.ProposerDetails.Name === "" ||
      data.ProposerDetails.EmailId === ""
    ) {
      setDisable(true);
    }
  };
  console.log("data", data);

  const onSendLink = async () => {
    const notificationReq = {
      notificationRequests: [
        {
          templateKey: "ProposerLink",
          sendEmail: false,
          isEmailBody: true,
          notificationPayload: JSON.stringify({
            Name: data.ProposerDetails.Name,
            ProductName: "TravelAssure",
          }),
        },
      ],
      sendEmail: true,
      subject: `Travel Insurance`,
      toEmail: data.ProposerDetails.EmailId,
    };
    const mail = await ProposerLink(notificationReq);
    console.log("1234444444445", mail);
    swal.fire({
      html: `<img src=${Success} alt="success image" style="display: block; margin: 0 auto;"></br>
      <p style="font-weight: bold; margin: 5px 0;">Link has been successfully shared to ${data.ProposerDetails.Name}</p>`,
      //   icon: <MDBox component="img" src={Success} />,
      //   // "<?= base_url(); ?>assets/addon-media/icon_information.png"
      text: `Link has been successfully shared to ${data.ProposerDetails.Name}`,
      confirmButtonColor: `#3085d6`,
      confirmButtonText: `Go to Home`,
    });
  };

  const onReset = () => {
    // debugger;
    data.ProposerDetails.Name = "";
    data.ProposerDetails.EmailId = "";
    data.ProposerDetails.ContactNo = "";
    setData({ ...data });
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2} ml={2}>
        <MDTypography
          variant="h6"
          sx={{ fontSize: "1.5rem", ml: "0rem", width: "100%", color: "#33ccff" }}
        >
          Customer Policy Issuance
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDInput
          label="Product Name"
          value={data.ProductName}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDInput
          label="Proposer Name"
          name="Name"
          value={data.ProposerDetails.Name}
          onChange={(e) => handleProposer(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDInput
          label="Proposer Email ID"
          name="EmailId"
          value={data.ProposerDetails.EmailId}
          onChange={(e) => handleProposer(e)}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDInput
          label="Proposer Mobile No"
          name="MobileNbr"
          value={data.ProposerDetails.ContactNo}
          onChange={(e) => handleProposer(e)}
        />
      </Grid>
      <Grid container justifyContent="right" mt={2} spacing={2}>
        <Stack direction="row" spacing={2}>
          <MDButton variant="outlined" onClick={(e) => onReset(e)}>
            Reset
          </MDButton>

          <MDButton
            variant="contained"
            color="info"
            onClick={(e) => onSendLink(e)}
            disabled={disable}
          >
            SendLink
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default CustomerPolicyIssuance;
