import React from "react";
import { Grid, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

function Notes({
  handleNoteSave,
  handleChange,
  masters,
  IntimateJson,
  Saveclaimjson,
  Note,
  NoteColumn,
  modelNoteClose,
  modelViewNoteClose,
}) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="body1" fontWeight="bold">
            Note Details
          </MDTypography>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mr={4}>
          <MDBox
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              pb: 2,
              justifyContent: "left",
              // pl: 10,
            }}
          >
            <MDButton variant="outlined" color="secondary" onClick={() => modelNoteClose("Create")}>
              Create New Note
            </MDButton>
          </MDBox>
        </Grid>
        {masters.CreateNote === true && Saveclaimjson !== 0 && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="body1" fontWeight="normal" mr={40}>
              Select the claim number for which the note needs to be saved :-
            </MDTypography>
          </Grid>
        )}
        {masters.CreateNote === true &&
          IntimateJson !== 0 &&
          IntimateJson.transactionDataDTO.map((x, i) => (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={-2}>
              <FormControlLabel
                label={`${x.transactionNumber}`}
                labelPlacement="bottom"
                control={
                  <Checkbox
                    onChange={(e) => handleNoteSave(e, i, x.transactionNumber)}
                    checked={masters?.checked[i]?.Note === x.transactionNumber}
                  />
                }
              />
            </Grid>
          ))}

        {masters.checked.length !== 0 && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput
              label="Notes"
              name="Notes"
              // minRows={5}
              multiline
              placeholder="Enter Here"
              value={Note}
              onChange={(e, v) => handleChange(e, v, "Notes")}
              style={{
                width: "800px",
              }}
            />
          </Grid>
        )}
      </Grid>
      {masters.checked.length !== 0 && (
        <Grid item align="center" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2} mr={10}>
          <MDButton
            variant="contained"
            color="secondary"
            disabled={Note === ""}
            onClick={() => modelNoteClose("Save")}
          >
            Save
          </MDButton>
        </Grid>
      )}
      <DataGrid
        autoHeight
        rows={masters.NotesRows || []}
        columns={NoteColumn}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        getRowId={(row) => row.Sno}
        // onRowClick={(param) => handleMemberClick(param)}
      />
      <Modal
        open={masters.Noteviewopen}
        align="center"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MDBox
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            width: 900,
            maxHeight: "80vh",
            padding: 8,
            boxShadow: 24,
            overflowY: "auto",
            p: 2,
          }}
        >
          <IconButton
            aria-label="Close"
            onClick={() => modelViewNoteClose()}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Grid container p={4}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput
                label="Notes"
                name="Notes"
                minRows={5}
                multiline
                placeholder="Enter Here"
                value={IntimateJson.claimBasicDetails.Remarks}
                onChange={(e, v) => handleChange(e, v, "Notes")}
                style={{
                  width: "800px",
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
    </>
  );
}
export default Notes;
