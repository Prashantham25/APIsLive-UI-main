import React from "react";
import { Grid, Stack, Modal } from "@mui/material";
import MDTypography from "components/MDTypography";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import MDButton from "components/MDButton";
import CloseIcon from "@mui/icons-material/Close";
import MDBox from "components/MDBox";

const data1 = [
  { label: "Basic Sum Assured", name: "BasicSumAssured", amount: 24000, total: 24000 },
  { label: "Sum Assured on Maturity", name: "SumAssuredonMaturity", amount: 8000, total: 8000 },
  { label: "Rebate", name: "Rebate", amount: 6000, total: 6000 },
  { label: "Annual premium", name: "Annualpremium", amount: 2500, total: 25000 },
  { label: "Premium With Out GST ", name: "GST", amount: 5000, total: 5000 },
  { label: "GST @ 18% ", name: "GST", amount: 5000, total: 5000 },
  { label: "Premium With GST", name: "GST", amount: 5000, total: 5000 },
  // { label: "Total Premium ", name: "TotalPremium", amount: 35000, total: 35000 },
];

const data2 = [
  {
    label: "Total Premium With Out Tax",
    name: "TotalPremiumofHealth",
    amount: 35000,
    total: 35000,
  },
  { label: "GST 18%", name: "GST", amount: 678, total: 678 },
  { label: "Total Premium With Tax", name: "TotalPremiumofLife", amount: 35000, total: 35000 },
  // { label: "GST 18% ", name: "GST", amount: 5000, total: 5000 },
  // {
  //   label: "Total Premium of Combi Product",
  //   name: "TotalPremiumofCombiProduct",
  //   amount: 70000,
  //   total: 70000,
  // },
];

const datas = [
  { label: "Basic Premium", name: "Basic Premium" },

  { label: "Add on Covers", name: "Add on Covers" },
  { label: "Non Medical Items", name: "Non Medical Items" },
  { label: "Discount", name: "Discount" },
  { label: "Women Discount", name: "Women Discount" },
  { label: "Total Without Tax", name: "Total Without Tax" },
  { label: "GST 18%", name: "GST 18%" },
  { label: "Total Premium", name: "Total Premium" },
];

// const Members = [
//   { label: "Adult1", minWidth: 195 },
//   { label: "Adult2", minWidth: 195 },
//   { label: "Children 1", minWidth: 195 },
//   { label: "Children 2", minWidth: 195 },
//   { label: "Parent in law", minWidth: 195 },
// ];
// const Permium = [
//   { label: "₹2345" },
//   { label: "₹2345" },
//   { label: "₹2345" },
//   { label: "₹2345" },
//   { label: "₹2345" },
//   { label: "₹2345" },
//   { label: "₹2345" },
//   { label: "₹2345" },
// ];

function CombiPremium({ masters, setMasters, dto }) {
  const lMasters = masters;
  const lDto = dto;
  console.log("lDto", lDto);
  const handleViewPremium = () => {
    lMasters.open = true;
    setMasters({ ...lMasters });
  };
  const handlemodelClose = () => {
    lMasters.open = false;
    setMasters({ ...lMasters });
  };
  return (
    <Grid>
      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} sm={3} md={4} lg={4} xl={4} xxl={4}>
          <MDTypography sx={{ color: "#FF0000" }}>Health Insurance Quote Summary</MDTypography>
          <MDBox sx={{ maxWidth: "100%", overflowX: "auto", backgroundColor: "#f2f2f2" }}>
            <Table minWidth="100%">
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{
                      borderBottom: "none",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Components
                  </TableCell>

                  <TableCell
                    style={{
                      borderBottom: "none",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                    sx={{ backgroundColor: "#c70825", color: "white !important" }}
                  >
                    Total
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{
                      borderBottom: "none",
                      fontWeight: "bold",
                      textAlign: "left",
                    }}
                  >
                    {datas.map((x) => (
                      <TableRow>
                        <TableCell
                          style={{
                            borderBottom: "none",
                            fontWeight: "bold",
                            textAlign: "left",
                          }}
                        >
                          {x.label}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableCell>

                  <TableCell
                    style={{
                      borderBottom: "none",
                      textAlign: "right",
                    }}
                    sx={{ backgroundColor: "#c70825", color: "white !important" }}
                  >
                    {lMasters.permiumarr.map((x) => (
                      <TableRow>
                        <TableCell
                          style={{
                            borderBottom: "none",
                            fontWeight: "bold",
                            textAlign: "left",
                            color: "white",
                          }}
                        >
                          {x.SumInsured}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <MDButton
              variant="outlined"
              alignItems="right"
              sx={{ ml: 16, mt: 1, mb: 1 }}
              onClick={handleViewPremium}
            >
              View Premium
            </MDButton>
            <Modal
              open={lMasters.open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              align="center"
              // align-item="center"
              onClose={handlemodelClose}
              style={{
                display: "flex",
                // alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <MDBox sx={{ maxWidth: "100%", overflowX: "auto", backgroundColor: "#f2f2f2" }}></MDBox> */}
              <MDBox
                align-item="center"
                sx={{
                  position: "absolute",
                  top: "5%",
                  left: "20%",
                  width: 600,
                  // height: 600,
                  backgroundColor: "#f2f2f2",
                  overflowX: "auto",
                  p: 1,
                }}
              >
                <CloseIcon
                  style={{
                    position: "absolute",
                    right: 6,
                    top: 6,
                  }}
                  // sx={handCursorStyle}
                  color="action"
                  onClick={handlemodelClose}
                  variant="text"
                />
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        style={{
                          borderBottom: "none",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        Components
                      </TableCell>
                      {/* {Members.map((x) => ( */}
                      {lMasters.permiumarr.map((x) => (
                        <TableCell
                        // style={{
                        //   borderBottom: "none",
                        //   fontWeight: "bold",
                        //   textAlign: "Center",
                        // }}
                        // sx={{ backgroundColor: "#FFFFFF" }}
                        >
                          {x.label}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{
                          borderBottom: "none",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        {datas.map((x) => (
                          <TableRow>
                            <TableCell
                              style={{
                                borderBottom: "none",
                                fontWeight: "bold",
                                textAlign: "left",
                              }}
                            >
                              {x.label}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                      <TableCell>
                        {lMasters.permiumarr.map((x) => (
                          <TableRow>
                            <TableCell
                              style={{
                                borderBottom: "none",
                                fontWeight: "bold",
                                textAlign: "left",
                              }}
                              // sx={{ backgroundColor: "#FFFFFF" }}
                            >
                              {x.SumInsured}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                      <TableCell>
                        {lMasters.permiumarr.map((x) => (
                          <TableRow>
                            <TableCell
                              style={{
                                borderBottom: "none",
                                fontWeight: "bold",
                                textAlign: "Center",
                              }}
                              // sx={{ backgroundColor: "#FFFFFF" }}
                            >
                              {x.SumInsured}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                      <TableCell>
                        {lMasters.permiumarr.map((x) => (
                          <TableRow>
                            <TableCell
                              style={{
                                borderBottom: "none",
                                fontWeight: "bold",
                                textAlign: "Center",
                              }}
                              // sx={{ backgroundColor: "#FFFFFF" }}
                            >
                              {x.SumInsured}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                      <TableCell>
                        {lMasters.permiumarr.map((x) => (
                          <TableRow>
                            <TableCell
                              style={{
                                borderBottom: "none",
                                fontWeight: "bold",
                                textAlign: "Center",
                              }}
                              // sx={{ backgroundColor: "#FFFFFF" }}
                            >
                              {x.SumInsured}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                      <TableCell>
                        {lMasters.permiumarr.map((x) => (
                          <TableRow>
                            <TableCell
                              style={{
                                borderBottom: "none",
                                fontWeight: "bold",
                                textAlign: "Center",
                              }}
                              // sx={{ backgroundColor: "#FFFFFF" }}
                            >
                              {x.SumInsured}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </MDBox>
            </Modal>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6} ml={6}>
          {/* <div style={{ display: "row", justifyContent: "row" }}> */}
          <Stack direction="row" spacing={6} mb={5}>
            <MDTypography sx={{ color: "#FF0000", textAlign: "left" }}>
              Life Insurance Quote Summary
            </MDTypography>
            <MDButton
              variant="outlined"
              style={{ padding: "11px" }}
              sx={{ ml: 45, mt: -9, alignItems: "end" }}
            >
              Download Illustration
            </MDButton>
          </Stack>
          {/* <MDBox pt={1} sx={{ backgroundColor: "#b0e0e6" }} p={2}> */}
          <Grid px={1} spacing={1}>
            <MDBox sx={{ maxWidth: "100%", overflowX: "auto", backgroundColor: "#f2f2f2" }}>
              <Table aria-label="simple table" sx={{ minwidth: "100%" }}>
                <TableRow tabIndex={-1}>
                  <TableCell style={{ borderBottom: "none" }} sx={{ fontWeight: "bold" }}>
                    Components
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "none",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                    // sx={
                    //   masters.flags.selectedColumn === 0
                    //     ? { backgroundColor: "#c70825", color: "white !important" }
                    //     : {}
                    // }
                    sx={{ backgroundColor: "#FFFFFF" }}
                  >
                    {" "}
                    Adult&nbsp;1
                  </TableCell>
                  <TableCell
                    style={{
                      borderBottom: "none",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                    //   sx={
                    //     masters.flags.selectedColumn === 2
                    //       ? { backgroundColor: "#c70825", color: "white !important" }
                    //       : {}
                    //   }
                    sx={{ backgroundColor: "#c70825", color: "white !important" }}
                  >
                    {" "}
                    Total
                  </TableCell>
                </TableRow>
                <TableBody>
                  {data1.map((item) => (
                    <TableRow>
                      <TableCell
                        style={{
                          borderBottom: "none",
                          //   fontWeight: i === 0 || i > 12 ? "bold" : "normal",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        {item.label}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "none",
                          textAlign: "right",
                          //   fontWeight:
                          //     item.name === "BasicSumAssured" &&
                          //     item.name === "SumAssuredonMaturity" &&
                          //     item.name === "Rebate" &&
                          //     item.name === "Annualpremium" &&
                          //     item.name === "GST"
                          //       ? "bold"
                          //       : "normal",
                        }}
                        sx={{ backgroundColor: "#FFFFFF" }}
                      >
                        {/* {masters.Quotes[0][item.name] === "NA"
                                  ? masters.Quotes[0][item.name]
                                  : formatter.format(masters.Quotes[0][item.name])} */}
                        <CurrencyRupeeIcon />
                        {item.amount}
                      </TableCell>
                      <TableCell
                        style={{
                          borderBottom: "none",
                          textAlign: "right",
                        }}
                        sx={{ backgroundColor: "#c70825", color: "white !important" }}
                      >
                        {/* {masters.Quotes[0][item.name] === "NA"
                                  ? masters.Quotes[0][item.name]
                                  : formatter.format(masters.Quotes[0][item.name])} */}
                        <CurrencyRupeeIcon />
                        {item.total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* <Grid container justifyContent="space-between" my={2}> */}
              {/* <MDButton variant="outlined" onClick={saveAndExit}>
                        Save & Exit
                      </MDButton> */}
              {/* <MDButton variant="outlined" onClick={DownloadQuote}>
                        Download Quote
                      </MDButton>
                      <MDButton variant="outlined" onClick={onShareQuote}>
                        share Quote
                      </MDButton> */}

              {/* </Grid> */}
            </MDBox>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6} ml={35} mt={8}>
            <MDTypography sx={{ color: "#FF0000" }}>Overall Quote Summary</MDTypography>
            <MDBox pt={1} sx={{ backgroundColor: "#f2f2f2" }} p={2}>
              <Grid px={1} spacing={1}>
                <Table aria-label="simple table" mt="2%" sx={{ maxwidth: "100%" }}>
                  <TableBody>
                    {data2.map((item1) => (
                      <TableRow>
                        <TableCell
                          style={{
                            borderBottom: "none",
                            //   fontWeight: i === 0 || i > 12 ? "bold" : "normal",
                            fontWeight: "bold",
                            color:
                              item1.name === "TotalPremiumofCombiProduct" ? "#c70825" : "#000000",
                          }}
                        >
                          {" "}
                          {item1.label}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "none",
                            textAlign: "center",
                            fontWeight:
                              item1.name === "TotalPremiumofCombiProduct" ? "bold" : "normal",
                            color:
                              item1.name === "TotalPremiumofCombiProduct" ? "#c70825" : "#000000",
                          }}
                        >
                          {/* {masters.Quotes[0][item.name] === "NA"
                                  ? masters.Quotes[0][item.name]
                                  : formatter.format(masters.Quotes[0][item.name])} */}
                          <CurrencyRupeeIcon />
                          {item1.total}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <Grid container justifyContent="space-between" sx={{ mt: "10px" }}>
                    <MDButton variant="outlined" sx={{ ml: 1, mt: 2 }}>
                      Share Quote
                    </MDButton>
                    <MDButton variant="outlined" sx={{ mt: 2, ml: 10 }}>
                      Download Quote
                    </MDButton>
                  </Grid>
                  {/* </Grid> */}
                </Table>
              </Grid>
            </MDBox>
            <Grid container justifyContent="space-between" my={2}>
              {/* <MDButton variant="outlined">Back</MDButton>
              <MDButton variant="outlined" sx={{ ml: 40, mt: 15 }}>
                Save & Exit
              </MDButton> */}
              {/* <MDButton variant="contained">Proceed</MDButton> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default CombiPremium;
