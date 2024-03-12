import { useEffect, useState } from "react";
import { Grid, Modal, FormControlLabel } from "@mui/material";
import { PolicyJson } from "./data/Json/MarineOpenCOIJson";
import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";
import NewRenderControl from "../../../../../../Common/RenderControl/NewRenderControl";
import MDCheckbox from "../../../../../../components/MDCheckbox";
import { get } from "../../../../../../Common/RenderControl/objectPath";
import MDTypography from "../../../../../../components/MDTypography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  // border: "2px solid #000",
  boxShadow: 24,
};
function PremiumModal({ open, dto }) {
  return (
    <Modal open={open} sx={style}>
      <MDBox sx={{ bgcolor: "#ffffff" }}>
        <Grid container spacing={2} p={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography textAlign="center" variant="h5">
              Certificate Premium Calculation
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography variant="h6">Total Premium</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDTypography variant="h6">{dto.TotalPremium}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography variant="h6">Service Tax (if applicable)</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDTypography variant="h6">{dto.ServiceTex}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <MDTypography variant="h6">Total</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDTypography variant="h6">{dto.Total}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <FormControlLabel
              control={
                <MDCheckbox
                //   checked={value === item.checkedVal}
                //   onChange={(e, a) => onChangeEvent(e, a)}
                />
              }
              label="Premium on certificate not be displayed, the certificate only display 'As Agreed' against the premium field"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton>Submit</MDButton>
            </MDBox>
          </Grid>
        </Grid>{" "}
      </MDBox>
    </Modal>
  );
}

export default function MarineOpenPolicy() {
  const components = [
    {
      type: "Input",
      visible: true,
      required: true,
      label: "Policy No",
      path: "PolicyNo",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Broker/Agent/Direct",
      path: "BrokerAgentDirect",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Name of Insured",
      path: "NameOfInsured",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Address",
      path: "Address",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Subject Matter Insured",
      path: "SubjectMatterInsured",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Basis of Valuation",
      path: "BasisOfValuation",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Cargo Sum Insured (in INR)",
      path: "CargoSumInsuredInINR",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Currency Type",
      path: "CurrencyType",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Cargo Sum Insured (Foreign Currency)",
      path: "Cargo Sum Insured (Foreign Currency)",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Duty Sum Insured",
      path: "DutySumInsured",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Containerized (LCL/FCL)",
      path: "ContainerizedLCLFCL",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Container No",
      path: "ContainerNo",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Marks Numbers",
      path: "MarksNumbers",
    },
    {
      type: "MDDatePicker",
      visible: true,
      required: false,
      label: "Expected Date of Transit",
      path: "ExpectedDateOfTransit",

      altFormat: "Y-m-d",
      dateFormat: "Y-m-d",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Invoice No",
      path: "InvoiceNo",
    },
    {
      type: "MDDatePicker",
      visible: true,
      required: false,
      label: "Invoice Date",
      path: "InvoiceDate",

      altFormat: "Y-m-d",
      dateFormat: "Y-m-d",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Type of Transit",
      path: "TypeOfTransit",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Mode of Transit",
      path: "ModeOfTransit",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Transit From",
      path: "TransitFrom",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Transit To",
      path: "TransitTo",
    },
    {
      type: "AutoComplete",
      visible: true,
      required: false,
      label: "Country of Loading",
      path: "CountryOfLoading",
    },
    {
      type: "AutoComplete",
      visible: true,
      required: false,
      label: "Destination Country",
      path: "DestinationCountry",
    },
    {
      type: "AutoComplete",
      visible: true,
      required: false,
      label: "Port of Loading",
      path: "PortOfLoading",
    },
    {
      type: "AutoComplete",
      visible: true,
      required: false,
      label: "Port of Destination",
      path: "PortOfDestination",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "No of Packages",
      path: "NoOfPackages",
    },
    {
      type: "AutoComplete",
      visible: true,
      required: false,
      label: "Type of Packing",
      path: "TypeOfPacking",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Vessel Name",
      path: "VesselName",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "IMO Name",
      path: "IMOName",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Voyage Number",
      path: "VoyageNumber",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "AWBBLLRRRConsignement Note No",
      path: "AWBBLLRRRConsignementNoteNo",
    },
    {
      type: "MDDatePicker",
      visible: true,
      required: false,
      label: "Date",
      path: "AWBBLLRRRConsignementNoteNoDate",

      altFormat: "Y-m-d",
      dateFormat: "Y-m-d",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Consignee Name",
      path: "ConsigneeName",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Consignee Address",
      path: "ConsigneeAddress",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Cosignee Contact No",
      path: "CosigneeContactNo",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Excess",
      path: "Excess",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Additional Information",
      path: "AdditionalInformation",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "LC No",
      path: "LCNo",
    },
    {
      type: "MDDatePicker",
      visible: true,
      required: false,
      label: "LC Date",
      path: "LCDate",

      altFormat: "Y-m-d",
      dateFormat: "Y-m-d",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Survey Agent",
      path: "SurveyAgent",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Settling Agent",
      path: "SettlingAgent",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Balance SI Before Current Certificate",
      path: "BalanceSIBeforeCurrentCertificate",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Balance Premium Before Current Certificate",
      path: "BalancePremiumBeforeCurrentCertificate",
    },
    {
      type: "Input",
      visible: true,
      required: false,
      label: "Declaration Frequency",
      path: "DeclarationFrequency",
    },
  ];
  const [dto, setDto] = useState("");
  const [nextFlg, setNextFlg] = useState(false);
  const [nextCount, setNextCount] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);

  useEffect(() => {
    setDto({ ...PolicyJson() });
  }, []);

  const onCalculate = () => {
    let validationFlag = true;
    components.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(dto, x2.path);
        if (val === "" || val === undefined) validationFlag = false;
      }
    });

    if (validationFlag === false) {
      setNextFlg(true);
      setNextCount(nextCount + 1);
    } else {
      setNextFlg(false);
      setModelOpen(true);
    }
  };

  return (
    <MDBox sx={{ bgcolor: "#ffffff" }}>
      {dto !== "" && (
        <Grid container spacing={2} p={3}>
          {components.map((item) => (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <NewRenderControl
                item={item}
                dto={dto}
                setDto={setDto}
                nextFlag={nextFlg}
                nextCount={nextCount}
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox>
              <MDButton variant="outlined" onClick={onCalculate}>
                Calculate
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      )}
      <PremiumModal open={modelOpen} dto={dto} />
    </MDBox>
  );
}
