import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Card, Stack } from "@mui/material";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import { GetCertificateGrid, HandleDownload } from "./data/index";

function ViewCertificateStop() {
  const [res, setRes] = useState([]);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const CertificateNo = query.get("CertificateNo");

  useEffect(async () => {
    const result = await GetCertificateGrid(CertificateNo);
    console.log("res", result.data[0].PolicyRequest);
    setRes(result.data[0].PolicyRequest);
  }, []);

  console.log("res2s", res.PolicyNo);
  const autocomplete = [];
  const ViewCertificate = [
    {
      type: "Input",
      label: "Policy No",
      value: res.PolicyNo || "",
    },
    { type: "Input", label: "Broker/Agent/Driect", value: res.BrokerAgentDirect || "" },
    { type: "Input", label: "Name of Insured", value: res.NameOfInsured || "" },
    { type: "Input", label: "Address", value: res.Address || "" },
    { type: "Input", label: "Subject Matter Insured", value: res.SubjectMatterInsured || "" },
    { type: "Input", label: "Basis of Valuation", value: res.BasisOfValuation || "" },
    { type: "Input", label: "Cargo Sum Insured(in INR)", value: res.CargoSumInsuredInINR || "" },
    { type: "Input", label: "Currency Type*", option: autocomplete, value: res.CurrencyType || "" },
    {
      type: "Input",
      label: "Rate Of Exchange*",
      option: autocomplete,
      value: res.ExchangeRate || "",
    },
    {
      type: "Input",
      label: "Cargo Sum Insured(Foreign Currency)",
      value: res.CargoSumInsuredForeignCurrency || "",
    },
    { type: "Input", label: "Duty Sum Insured", value: res.DutySumInsured || "" },
    { type: "Input", label: "Containerized(LCL/FCL)", value: res.ContainerizedLCLFCL || "" },
    { type: "Input", label: "Container No", value: res.ContainerNo || "" },
    { type: "Input", label: "Marks & Number", value: res.MarksNumbers || "" },
    { type: "Input", label: "Expected Date of Transit", value: res.ExpectedDateOfTransit || "" },
    { type: "Input", label: "Invoice No", value: res.InvoiceNo || "" },
    { type: "Input", label: "Invoice Date", value: res.InvoiceDate || "" },
    { type: "Input", label: "Type Of Transit", value: res.TypeOfTransit || "" },
    { type: "Input", label: "Mode of Transit", value: res.ModeOfTransit || "" },
    { type: "Input", label: "Transit From", value: res.TransitFrom || "" },
    { type: "Input", label: "Transit To", value: res.TransitTo || "" },
    {
      type: "Input",
      label: "Country of Loading",
      option: autocomplete,
      value: res.CountryOfLoading || "",
    },
    {
      type: "Input",
      label: "Designation Country",
      option: autocomplete,
      value: res.DestinationCountry || "",
    },
    {
      type: "Input",
      label: "Port of Loading",
      option: autocomplete,
      value: res.PortOfLoading || "",
    },
    {
      type: "Input",
      label: "Port of Destination*",
      option: autocomplete,
      value: res.PortOfDestination || "",
    },
    { type: "Input", label: "No of Packages", value: res.NoOfPackages || "" },
    { type: "Input", label: "Type of Packing", value: res.TypeOfPacking || "" },
    { type: "Input", label: "Vessel Name", value: res.VesselName || "" },
    { type: "Input", label: "IMO Name", value: res.IMOName || "" },
    { type: "Input", label: "Voyage Number", value: res.VoyageNumber || "" },
    {
      type: "Input",
      label: "AWB/BL/LR/RR/Consignment Note No",
      value: res.AWBBLLRRRConsignementNoteNo || "",
    },
    { type: "Input", label: "Date", value: res.AWBBLLRRRConsignementNoteNoDate || "" },
    { type: "Input", label: "consignee Name", value: res.ConsigneeName || "" },
    { type: "Input", label: "consignee Address", value: res.ConsigneeAddress || "" },
    { type: "Input", label: "consignee Contact No", value: res.CosigneeContactNo || "" },
    { type: "Input", label: "Excess", value: res.Excess || "" },
    { type: "Input", label: "Additional Information", value: res.AdditionalInformation || "" },
    { type: "Input", label: "L/C No", value: res.LCNo || "" },
    { type: "Input", label: "L/C Date", value: res.LCDate || "" },
    { type: "Input", label: "Survey Agent", value: res.SurveyAgent || "" },
    { type: "Input", label: "Settling Agent", value: res.SettlingAgent || "" },
    { type: "Input", label: "Declartion Frequency", value: res.DeclarationFrequency || "" },
  ];

  const navigate = useNavigate();
  const handleBack = (id) => {
    navigate(`/Marine/MSTOP/CertificateIssueStop?PolicyNo=${id}`);
  };
  return (
    <MDBox mt={3}>
      <Card sx={{ borderRadius: "1px" }}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={4} mb={3} mt={2}>
          <MDButton
            variant="outlined"
            color="error"
            onClick={() => handleBack(res.PolicyNo)}
            sx={{ borderRadius: "1px" }}
          >
            GO BACK
          </MDButton>
        </Grid>
        <Grid item md={12} l={12} xxl={12} ml="2rem" width="100%" mt={1} m={0} mb={3}>
          <Stack direction="row" justifyContent="space-between" p={1}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} ml={3}>
              <MDTypography sx={{ fontSize: 18 }}>
                View Certificate: <b>{CertificateNo}</b>
              </MDTypography>
            </Grid>
            <Grid xs={4}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
                mr={3}
              >
                <MDButton color="error" onClick={() => HandleDownload(CertificateNo)}>
                  Download Certificate
                </MDButton>
              </Stack>
            </Grid>
          </Stack>
        </Grid>
        <div>
          <Grid container spacing={2} ml={2} mb={2}>
            {ViewCertificate.map((item) => {
              switch (item.type) {
                case "Input":
                  return (
                    <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
                      <MDInput label={item.label} name={item.name} value={item.value} disabled />
                    </Grid>
                  );

                default:
                  return <MDInput label={item.label} />;
              }
            })}
          </Grid>
        </div>
      </Card>
    </MDBox>
  );
}
export default ViewCertificateStop;
