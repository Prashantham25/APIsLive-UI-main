import React from "react";
import { Backdrop, Grid, CircularProgress } from "@mui/material";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// import { useNavigate } from "react-router-dom";
// import MDBox from "../../../../../components/MDBox";
// import MDTypography from "../../../../../components/MDTypography";
// import MDAvatar from "../../../../../components/MDAvatar";
// import interviewschedule from "../../../../../assets/images/BrokerPortal/POSPAAdded.png";

// function SendLink() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const navigate = useNavigate();

//   const onClick = () => {
//     navigate(`/modules/BrokerPortal/Pages/Admin/AppLication`);
//   };
//   return (
//     <div>
//       <MDButton onClick={handleOpen}>Add POSP</MDButton>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <MDBox>
//           <MDTypography id="modal-modal-description" sx={{ mt: 3 }}>
//             <MDBox pt={20} pl={60}>
//               <MDBox
//                 p={4}
//                 sx={{
//                   background: "#FFFFFF",
//                   height: "505px",
//                   width: "834px",
//                   borderRadius: "0px",
//                 }}
//               >
//                 <Grid container spacing={1}>
//                   <MDAvatar
//                     src={interviewschedule}
//                     sx={{ width: "142px", height: "198px", mx: "20rem" }}
//                     variant="square"
//                   />
//                   <Grid xs={12} textAlign="center" mt={1}>
//                     <MDTypography font-family="Roboto" fontSize="28px">
//                       POSP Added Successfully.
//                     </MDTypography>
//                   </Grid>
//                   <br />
//                   <Grid xs={12} textAlign="center" mt={3}>
//                     <MDButton onClick={onClick} pb={90} variant="contained">
//                       View Policies
//                     </MDButton>
//                   </Grid>
//                 </Grid>
//               </MDBox>
//             </MDBox>
//           </MDTypography>
//         </MDBox>
//       </Modal>
//     </div>
//   );
// }

function PolicySummary({ propFlag, PolicyDto, callMail, proposalNumber, mailFlag }) {
  console.log("policySummary", propFlag);
  return (
    <div>
      {/* <h1>Policy Issued</h1> */}
      <Grid container spacing={2}>
        {proposalNumber !== "" ? (
          <>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              xl={4}
              xxl={4}
              style={{ "padding-right": "80px" }}
            >
              <MDInput
                label="Email ID"
                name="EmailId"
                value={PolicyDto.ProposerDetails.EmailId}
                // onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              {" "}
              <MDButton onClick={callMail}>Send Payment Link</MDButton>
            </Grid>
          </>
        ) : (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={propFlag}
          >
            <CircularProgress />
          </Backdrop>
        )}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={mailFlag}
        >
          <CircularProgress />
        </Backdrop>
        {/* <MDButton sx={{ ml: 120 }} onClick={handleNext}>
          Save Payment
        </MDButton> */}
      </Grid>
    </div>
  );
}

export default PolicySummary;
