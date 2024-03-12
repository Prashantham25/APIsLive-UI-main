import React from "react";
import { Grid, Stack, TableRow, Table, TableBody, TableCell } from "@mui/material";
import { Share } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import swal from "sweetalert";
import MDButton from "components/MDButton";
import MDBox from "../../../../components/MDBox";

// import MDTypography from "../../../../components/MDTypography";
import { BGRQuoteMail, callUpdateQuoteMethod } from "./data/index";
import { postRequest } from "../../../../core/clients/axiosclient";

const detArray = [
  "Sum Insured",
  // "Base Premium",
  // "Terrorism Base",
  "Add On (Premium)",
  // "Loss(Terrorism)",
  // "Long term",
  // "Net Premium",
  // "Disc/Loading %",
  // "Prem aft Disc",
  "Terrorism Premium",
  "Total Premium",
  "SGST",
  "CGST",
  "Total with Tax",
];

function PremiumBreakup({
  PolicyDto,
  QuoteData,
  valueTab,
  quote2,
  quote3,
  QuoteSave,

  // CalculateValidations,
  // calculate,
}) {
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });
  let calculate = false;
  // {
  //   /* const simpleFormat = new Intl.NumberFormat("de-DE", {
  //   style: "percent",
  //   maximumFractionDigits: 2,
  // });*/
  // }
  const CalculateValidations = () => {
    // debugger;

    if (
      PolicyDto[valueTab].PremiumDetails["Total with Tax"] === "0" ||
      QuoteSave[valueTab].InsurableItem[0].RiskItems[0]["Additional Parameter"] !==
        PolicyDto[valueTab].InsurableItem[0].RiskItems[0]["Additional Parameter"] ||
      QuoteSave[valueTab].InsurableItem[0].RiskItems[0][
        "Do You want to take Personal Accident Cover?"
      ] !==
        PolicyDto[valueTab].InsurableItem[0].RiskItems[0][
          "Do You want to take Personal Accident Cover?"
        ] ||
      QuoteSave[valueTab].InsurableItem[0].RiskItems[0][
        "Do you want to cover Rent for Alternative Accommodation ?"
      ] !==
        PolicyDto[valueTab].InsurableItem[0].RiskItems[0][
          "Do you want to cover Rent for Alternative Accommodation ?"
        ] ||
      QuoteSave[valueTab].InsurableItem[0].RiskItems[0].TerrorismCover !==
        PolicyDto[valueTab].InsurableItem[0].RiskItems[0].TerrorismCover ||
      PolicyDto[valueTab].InsurableItem[0].RiskItems[0][
        "Insured Members Covered under Individual PA?"
      ] !==
        QuoteSave[valueTab].InsurableItem[0].RiskItems[0][
          "Insured Members Covered under Individual PA?"
        ] ||
      PolicyDto[valueTab].InsurableItem[0].RiskItems[0].Loading !==
        QuoteSave[valueTab].InsurableItem[0].RiskItems[0].Loading ||
      PolicyDto[valueTab].ProposerDetails["Policy Tenure"] !==
        QuoteSave[valueTab].ProposerDetails["Policy Tenure"]
    ) {
      calculate = true;
      // swal({ icon: "error", text: "Please click on Calculate Premium" });
    }
  };
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    console.log("FilenameQuote", link.download);

    link.click();
  };

  const HandleDownload = async (quoteNo) => {
    CalculateValidations();
    if (calculate === true) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else {
      await callUpdateQuoteMethod(PolicyDto[valueTab]).then(async (res) => {
        console.log("Quoteqoute", quoteNo, res);
        const downloadDTO = {
          key: quoteNo,
          templateId: 78,
          referenceId: "",
        };
        await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
          console.log("result", result);
          if (result.status === 200) {
            generateFile(result.data, quoteNo);
          }
        });
      });
    }
  };

  const handleClick = async () => {
    CalculateValidations();
    if (calculate === true) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else {
      await callUpdateQuoteMethod(PolicyDto[valueTab]).then(async () => {
        await BGRQuoteMail(
          PolicyDto[valueTab].QuoteNo,
          PolicyDto[valueTab].ProposerDetails["Email ID"]
        );
      });
    }
  };
  console.log("PolicyDto", PolicyDto);
  console.log("QuoteData", QuoteData);
  const q2 = quote2;
  const q3 = quote3;
  // const dSize = 3 + (q2 ? 0 : 3) + (q3 ? 0 : 3);

  return (
    <MDBox pt={0} ml={1} mt={3.5} sx={{ backgroundColor: "#f2f2f2" }}>
      <Grid container px={2} spacing={2}>
        <Table aria-label="simple table" mt={1} sx={{ maxwidth: "100%" }}>
          <TableRow tabIndex={-1}>
            <TableCell style={{ borderBottom: "none", fontWeight: "bold" }}>
              Premium Summary
            </TableCell>
            <TableCell
              style={{
                borderBottom: "none",
                fontWeight: "bold",
                textAlign: "right",
              }}
              sx={valueTab === 0 ? { backgroundColor: "#c70825", color: "white !important" } : {}}
            >
              {" "}
              Quote 1
            </TableCell>
            {q2 && (
              <TableCell
                style={{
                  borderBottom: "none",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
                sx={valueTab === 1 ? { backgroundColor: "#c70825", color: "white !important" } : {}}
              >
                {" "}
                Quote 2
              </TableCell>
            )}
            {q3 && (
              <TableCell
                style={{
                  borderBottom: "none",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
                sx={valueTab === 2 ? { backgroundColor: "#c70825", color: "white !important" } : {}}
              >
                {" "}
                Quote 3
              </TableCell>
            )}
          </TableRow>
          <TableBody>
            {detArray.map((item) => (
              <TableRow>
                <TableCell
                  style={{
                    borderBottom: "none",
                    fontWeight: item === "Total with Tax" ? "bold" : "normal",
                  }}
                >
                  {" "}
                  {item}
                </TableCell>
                <TableCell
                  style={{
                    borderBottom: "none",
                    textAlign: "right",
                    fontWeight: item === "Total with Tax" ? "bold" : "normal",
                  }}
                  sx={
                    valueTab === 0
                      ? {
                          backgroundColor: "#c70825",
                          color: "white !important",
                        }
                      : {}
                  }
                >
                  {formatter.format(PolicyDto[0].PremiumDetails[item])}
                </TableCell>
                {q2 && (
                  <TableCell
                    style={{
                      borderBottom: "none",
                      textAlign: "right",
                      fontWeight: item === "Total with Tax" ? "bold" : "normal",
                    }}
                    sx={
                      valueTab === 1
                        ? {
                            backgroundColor: "#c70825",
                            color: "white !important",
                          }
                        : {}
                    }
                  >
                    {formatter.format(PolicyDto[1].PremiumDetails[item])}
                  </TableCell>
                )}
                {q3 && (
                  <TableCell
                    style={{
                      borderBottom: "none",
                      textAlign: "right",
                      fontWeight: item === "Total with Tax" ? "bold" : "normal",
                    }}
                    sx={
                      valueTab === 2
                        ? {
                            backgroundColor: "#c70825",
                            color: "white !important",
                          }
                        : {}
                    }
                  >
                    {formatter.format(PolicyDto[2].PremiumDetails[item])}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* 
        {detArray.map((item) => (
          <>
            <Grid item xs={dSize} sm={dSize} md={dSize} lg={dSize} xl={dSize} xxl={dSize}>
              <MDTypography variant="body2" fontWeight="bold" sx={{ color: "#000000" }}>
                {item}
              </MDTypography>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography
                variant="body2"
                // sx={{ color: "#000000", fontWeight: "regular", textAlign: "right" }}
                sx={
                  valueTab === 0
                    ? { backgroundColor: "#c70825", textAlign: "right", color: "white !important" }
                    : { color: "#000000", fontWeight: "regular", textAlign: "right" }
                }
              >
                {formatter.format(PolicyDto[0].PremiumDetails[item])}
              </MDTypography>
            </Grid>
            {q2 ? (
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography
                  variant="body2"
                  // sx={{ color: "#000000", fontWeight: "regular", textAlign: "right" }}
                  sx={
                    valueTab === 1
                      ? {
                          backgroundColor: "#c70825",
                          textAlign: "right",
                          color: "white !important",
                        }
                      : { color: "#000000", fontWeight: "regular", textAlign: "right" }
                  }
                >
                  {formatter.format(PolicyDto[1].PremiumDetails[item])}
                </MDTypography>
              </Grid>
            ) : null}
            {q3 ? (
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography
                  variant="body2"
                  // sx={{ color: "#000000", fontWeight: "regular", textAlign: "right" }}
                  sx={
                    valueTab === 2
                      ? {
                          backgroundColor: "#c70825",
                          textAlign: "right",
                          color: "white !important",
                        }
                      : { color: "#000000", fontWeight: "regular", textAlign: "right" }
                  }
                >
                  {formatter.format(PolicyDto[2].PremiumDetails[item])}
                </MDTypography>
              </Grid>
            ) : null}
          </>
        ))} */}
      </Grid>
      <Stack direction="row" p={2} justifyContent="space-between" alignItems="center">
        <MDButton
          size="medium"
          startIcon={<ArrowDownwardIcon />}
          fullwidth
          color="white"
          onClick={() => HandleDownload(PolicyDto[valueTab].QuoteNo)}
          sx={{
            textSize: "0.87rem",
            borderRadius: "0.25rem",
            borderColor: "primary",
            border: 1,
            background: "transparent",
          }}
        >
          Download Quote
        </MDButton>
        <MDButton
          size="medium"
          startIcon={<Share />}
          color="white"
          onClick={() => handleClick(PolicyDto[valueTab].QuoteNo)}
          sx={{
            textSize: "0.87rem",
            borderRadius: "0.25rem",
            borderColor: "primary",
            border: 1,
            background: "transparent",
          }}
        >
          Share Quote
        </MDButton>
      </Stack>
    </MDBox>
  );
}

export default PremiumBreakup;
