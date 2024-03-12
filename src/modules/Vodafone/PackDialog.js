import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Badge, Grid } from "@mui/material";
import SmallAvatar from "./SmallAvatar";
import MDButton from "../../components/MDButton";

export default function PackDialog({
  handleClose,
  open,
  plan,
  handlePayment,
  handleChange,
  state,
}) {
  return (
    <Dialog open={open}>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <MDButton onClick={handleClose} color="error" variant="text">
            X
          </MDButton>
        </Grid>
      </Grid>
      <DialogTitle sx={{ textAlign: "center" }}>Selected Plan</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ p: 2 }}>
          {plan === 1 ? (
            <>
              <Grid container justifyContent="center">
                <Grid item>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    badgeContent={<SmallAvatar>16 OMR</SmallAvatar>}
                  >
                    <Avatar sx={{ width: 56, height: 56, background: "#E60000", color: "#fff" }}>
                      35
                    </Avatar>
                  </Badge>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item>
                  Vodafone <strong>RED ELITE</strong>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid container justifyContent="center">
                <Grid item>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    badgeContent={<SmallAvatar>8 OMR</SmallAvatar>}
                  >
                    <Avatar sx={{ width: 56, height: 56, background: "#E60000", color: "#fff" }}>
                      15
                    </Avatar>
                  </Badge>
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item>
                  Vodafone <strong>RED PREMIUM</strong>
                </Grid>
              </Grid>
            </>
          )}
        </DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Phone number"
          type="mobile"
          name="mobileNumber"
          value={state.mobileNumber}
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          name="emailID"
          value={state.emailID}
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="center">
          <Grid item>
            <MDButton onClick={handlePayment} color="error" variant="contained">
              Make Payment
            </MDButton>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
