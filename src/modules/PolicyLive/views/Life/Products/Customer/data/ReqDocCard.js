import { useState } from "react";
import { Card, Stack, Drawer, IconButton, Grid, Icon, useMediaQuery } from "@mui/material";
import PDFIcon from "assets/images/Life/PDFIcon.png";
import ImageIcon from "assets/images/Life/ImageIcon.png";
import ZipIcon from "assets/images/Life/zip.png";
import MDBox from "components/MDBox";
import parse from "html-react-parser";

import MDTypography from "../../../../../../../components/MDTypography";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";

function EligibleDoc({ open, setOpen, doc }) {
  const matches = useMediaQuery("(min-width:700px)");
  const data = [
    {
      heading: "Income/Investment Proof",
      subText: "Below is the List of Eligible Documents for Income/Investment Proof",
      docs: [
        "Salary Certificate",
        "Certificate from Chartered Accountant",
        "ITRs of last 3 years (All Pages)",
        "Income from Partnership firm",
        "Income from Proprietary firm / profession",
        "Income from private limited / public limited companies",
        "Last 3 months Bank Statements (Only as a supporting proof)",
        "Export Income",
        "Form 16 of Last 3 years",
        "Last 3 months Salary Slip / Salary Certificate",
        "Employment Appointment / offer letter",
      ],
    },

    {
      heading: "Communication Address Proof",
      subText: "Below is the List of Eligible Documents for Address Proof",
      docs: [
        "Utility Bill",
        "Property/Municipal Tax Receipt",
        "Bank Passbook",
        "Pension Orders",
        "Allotment Letter/Lease Agreement",
        "Documents issued by Govt.",
        "Passport",
        "Driving License",
        "Voter ID",
        "Masked Aadhaar Card/Masked e-Aadhaar Card",
      ],
    },
    {
      heading: "Address/Age Proof",
      subText: "Below is the List of Eligible Documents for Address/Age Proof",
      docs: ["Aadhar Card", "Driving Licence", "Passport (Mandatory for NRI)", "PanCard"],
    },
    {
      heading: "Proof of education",
      subText: "Below is the List of Eligible Documents for Proof of education",
      docs: [
        "Certified copy of loan papers and copies of evidence of higher studies / education are to be submitted",
        "Declaration to be obtained from Major student as well as from the parents that they are regularly attending college / technical institute",
        "Copy of passing certificate",
        "Appearance report at the examination of the just completed academic year to be obtained",
        "Copy of latest school report",

        "Immunisation record of child",
        "College report",
        "Recent Photograph",
      ],
    },
    {
      heading: "Loan sanction letter",
      subText: "Below is the List of Eligible Documents for Loan sanction letter",
      docs: [
        "Copy of educational loan sanction",
        "Letter from Institution confirming admission for which education loan has been taken",
      ],
    },
    {
      heading: "Offline e-KYC instructions",
      subText: "",
      docs: [
        `1. Click <u><a href="https://myaadhaar.uidai.gov.in/" target="_blank">myAadhaar website</a></u>    and login using your Aadhaar number.`,

        "2. Enter the Captcha and click on ‘Send OTP’. Enter the OTP that you will receive in your registered mobile number to login.",

        "3. The list of services will open up, choose ‘Offline KYC’.",

        "4. You will be asked to create a 4-digit share code. Input the code of your choice and remember it.. ",

        "5. Finally click on ‘Download’. A Zip file will be downloaded. ",

        "6. In the LIC's  Aadhar ekyc page, key in the mobile number and the 4-digit share code , which you created in step 4.",

        "7. Choose the zip file you download in step 5 and upload it.",

        "8. eKYC is complete.",
      ],
    },
    // {
    //   heading: "Investment Proof",
    //   subText: "Below is the List of Eligible Documents for Investment Proof",
    //   docs: [
    //     "Investment proof",
    //     "Fixed deposit",
    //     "Equity Linked Saving Schemes",
    //     "Latest rental agreement",
    //     "Interest earned from Investments",
    //     "Property Certificate issued by Govt. Authority",
    //     "Salary Certificate",
    //     "Bank statement showing credit of Rent",
    //     "Proof of lump sum income",
    //     "Business documents showing name of the life proposed",
    //     "Self-attested bank statement showing regular income from business ",
    //     "Profit & Loss A/c & Balance Sheet for the last 3 years",
    //     "Self-attested copies of the lease ",
    //     "Rent receipts",
    //   ],
    // },
  ];
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          margin: "0rem",
          width: matches ? "40vw" : "100vw",
          minHeight: "100vh",
          overflowX: "hidden",
          zIndex: 10001,
          borderRadius: 0,
          "&:before": {
            content: '""',
            display: "block",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            // height: "100%",
            zIndex: 0,
          },
        },
      }}
    >
      <MDBox p={2} sx={{ zIndex: 1, minHeight: "100vh", bgcolor: ColorsSetting().secondary.focus }}>
        <Grid container justifyContent="flex-end">
          <IconButton onClick={() => setOpen(false)}>
            <Icon fontSize="large">close</Icon>
          </IconButton>
        </Grid>

        {data
          .filter((y) => y.heading === doc)
          .map((x) => (
            <Grid container spacing={2} p={2}>
              <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                <MDTypography
                  sx={{
                    fontSize: "1.2rem",
                    textTransform: "capitalize",
                    fontWeight: 600,
                    color: "#1d4e9e",
                    whiteSpace: "normal",
                  }}
                >
                  {x.heading}
                </MDTypography>
              </Grid>
              <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                <MDTypography
                  sx={{
                    fontSize: "0.9rem",
                    textTransform: "capitalize",
                    whiteSpace: "normal",
                  }}
                >
                  {x.subText}
                </MDTypography>
              </Grid>
              {x.docs.map((y) => (
                <Grid item xxl={12} xl={12} md={12} sm={12} xs={12}>
                  <Stack direction="row" display="flex">
                    <Icon fontSize="medium" sx={{ color: "#1d4e9e" }}>
                      play_arrow
                    </Icon>

                    <MDTypography
                      sx={{
                        fontSize: "1rem",
                        // textTransform: "capitalize",
                        whiteSpace: "normal",
                      }}
                    >
                      {parse(y)}
                    </MDTypography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          ))}
      </MDBox>
    </Drawer>
  );
}
export default function ReqDocCard({ mobileView }) {
  const [open, setOpen] = useState(false);
  const [doc, setDoc] = useState("");
  const OpenDrawer = (x) => {
    setOpen(true);
    setDoc(x);
  };
  const data = [
    {
      docType: "Income/Investment Proof",
      format: "(only PDF format, max file size is 500KB)",
      view: "View eligible documents",
      icon: PDFIcon,
    },
    {
      docType: "Self Cancelled Cheque",
      format: "(only PDF format, max file size is 500KB)",
      view: "",
      icon: PDFIcon,
    },
    {
      docType: "Communication Address Proof",
      format: "(only PDF format, max file size is 500KB)",
      view: "View eligible documents",
      icon: PDFIcon,
    },
    {
      docType: "Birth Certificate (only for minors)",
      format: "(only PDF format, max file size is 500KB)",
      view: "",
      icon: PDFIcon,
    },
    {
      docType: "Photograph",
      format: "(only JPEG format, max file size is 500KB)",
      view: "",
      icon: ImageIcon,
    },
    {
      docType: "Signature",
      format: "(only JPEG format, max file size is 500KB)",
      view: "",
      icon: ImageIcon,
    },
    {
      docType: "Offline e-KYC instructions",
      format: "",
      view: "Steps to download offline zip",
      icon: ZipIcon,
    },
    // {
    //   docType: "Address/Age Proof",
    //   format: "(only PDF format)",
    //   view: "View eligible documents",
    //   icon: PDFIcon,
    // },
    // {
    //   docType: "Proof of education",
    //   format: "(only PDF format)",
    //   view: "View eligible documents",
    //   icon: PDFIcon,
    // },
    // {
    //   docType: "Loan sanction letter",
    //   format: "(only PDF format)",
    //   view: "View eligible documents",
    //   icon: PDFIcon,
    // },
    // {
    //   docType: "Covid Vaccination certificate",
    //   format: "(only PDF format)",
    //   view: "",
    //   icon: PDFIcon,
    // },
  ];
  return (
    <MDBox>
      <EligibleDoc open={open} setOpen={setOpen} doc={doc} />
      {/* <Stack direction={mobileView === true ? "row" : "column"} spacing={2}> */}
      <Grid container spacing={2} p={2}>
        {data.map((x) => (
          <Grid item xxl={3} xl={3} md={6} sm={12} xs={12}>
            <Card
              sx={{
                background: "#C0DAFF80",
                height: mobileView === true ? "12rem" : "100%",
              }}
            >
              <Stack p={2} direction="column" alignItems="center">
                <MDBox component="img" src={x.icon} height="3rem" width="3rem" />
                <MDTypography sx={{ fontWeight: 600, fontSize: "0.9rem", whiteSpace: "normal" }}>
                  {x.docType}
                </MDTypography>
                <MDTypography sx={{ fontSize: "0.7rem" }}>
                  <i>{x.format}</i>
                </MDTypography>

                <MDTypography
                  sx={{ fontSize: "0.8rem", cursor: "pointer" }}
                  onClick={() => OpenDrawer(x.docType)}
                >
                  <i style={{ textDecoration: "underline", color: "#0071D9" }}>{x.view}</i>
                </MDTypography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* </Stack> */}
    </MDBox>
  );
}
