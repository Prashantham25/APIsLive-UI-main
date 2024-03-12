// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import MDBox from "../../../../../components/MDBox";
// // import MDButton from "../../../../../components/MDButton";

// // function PlanDetails() {
// //   const navigate = useNavigate();

// //   const onClick = () => {
// //     navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary`);
// //   };
// //   return (
// //     <MDBox>
// //       <MDButton onClick={onClick}>Proceed</MDButton>
// //     </MDBox>
// //   );
// // }
// // export default PlanDetails;
// import React, { useState } from "react";
// import MDTabs from "modules/PolicyLive/components/Tabs";
// import { Grid } from "@mui/material";
// import Card from "@mui/material/Card";
// import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";
// import { useNavigate } from "react-router-dom";
// import SBI from "../../../../../assets/images/BrokerPortal/CompanyLogos/SBI.png";
// import MDBox from "../../../../../components/MDBox";
// import MDTypography from "../../../../../components/MDTypography";
// import MDButton from "../../../../../components/MDButton";
// import MDAvatar from "../../../../../components/MDAvatar";
// import { useDataController } from "../../../context";

// function PlanDetails() {
//   const [value, setValue] = useState(0);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const tabs = [
//     {
//       label: "What is Coverd",
//       content: "Item 1",
//       value: 1,
//     },
//     {
//       label: "What is Not Coverd",
//       content: "Item 2",
//       value: 2,
//     },
//     {
//       label: "Claim Process",
//       content: "Item 3",
//       value: 3,
//     },
//     {
//       label: "Network Hospitals",
//       content: "Item 4",
//       value: 4,
//     },
//     {
//       label: "Brouchers/Forms",
//       content: "Item 5",
//       value: 5,
//     },
//   ];

//   const [controller, dispatch] = useDataController();
//   const data = controller.getQuoteOutput;
//   const { quickQuoteOutput } = controller;

//   console.log("")

//   const navigate = useNavigate();
//   const click = () => {
//     navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary`);
//   };
//   return (
//     <MDBox sx={{ width: "100%" }}>
//       <Grid align="end">
//         <IconButton sx={{ ml: "auto" }} onClick={click}>
//           <CloseIcon />
//         </IconButton>
//       </Grid>
//       <Grid
//         container
//         sx={{ mb: "0.15rem", background: "white" }}
//         xs={12}
//         sm={12}
//         md={12}
//         lg={12}
//         xl={12}
//         xxl={12}
//         pd={10}
//       >
//         <Grid item md={12} pd={5}>
//           <MDBox display="flex" flexDirection="row" sx={{ ml: "1.25rem" }}>
//             <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
//               Plans for Self, Spouse & 2 Kids
//             </MDTypography>
//             <MDTypography variant="body1" sx={{ fontSize: "0.75rem", color: "#1976D2" }}>
//               Edit Member Details
//             </MDTypography>
//           </MDBox>
//         </Grid>
//         <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
//           <MDAvatar src={SBI} size="logo" variant="square" sx={{ ml: "1.25rem" }} />
//         </Grid>
//         <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
//           <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
//             <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
//               plan Name
//             </MDTypography>
//             <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
//               Arogya Supreme
//               {/* ₹ */}
//               {/* {formatter.format(IDV)} */}
//             </MDTypography>
//           </MDBox>
//         </Grid>

//         <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
//           <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
//             <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
//               Network Hospitals
//             </MDTypography>
//             <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
//               362 Hospitals
//             </MDTypography>
//           </MDBox>
//         </Grid>
//         <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
//           <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
//             <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
//               Cover Amount
//             </MDTypography>
//             <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
//               5 Lakhs
//               {/* ₹{details?.premiumResult?.FinalPremium} */}
//               {/* {formatter.format(Premium.replace("INR", ""))} */}
//             </MDTypography>
//           </MDBox>
//         </Grid>
//         <Grid item xs={12} sm={1.5} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
//           <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
//             <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
//               Premium
//             </MDTypography>
//             <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
//               ₹ 2,987/Year
//               {/* ₹{details?.premiumResult?.FinalPremium} */}
//               {/* {formatter.format(Premium.replace("INR", ""))} */}
//             </MDTypography>
//           </MDBox>
//         </Grid>

//         <Grid
//           item
//           xs={12}
//           sm={2}
//           md={2}
//           lg={2}
//           xl={2}
//           xxl={2}
//           sx={{ textAlign: "center", alignSelf: "center" }}
//         >
//           <MDButton color="info">Buy</MDButton>
//         </Grid>
//       </Grid>
//       <Grid item xs={12} sm={12} md={12} sx={{ background: "#D9E7F2" }}>
//         <Card sx={{ height: "100%" }} background="#D9E7F2">
//           <MDTabs tabsList={tabs} onChange={handleChange} value={value} />
//         </Card>
//       </Grid>
//     </MDBox>
//   );
// }
// export default PlanDetails;
