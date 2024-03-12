import { Card, CardActions, CardContent, Grid, Icon, ToggleButton } from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";
import { successGreen } from "./Constants";

const successOption = {
  color: "#000",
  backgroundColor: successGreen,
};
function Question({
  question,
  index,
  handleNext,
  handlePrevious,
  handleSkip,
  disableNext,
  disablePrev,
  answer,
  handleAnswer,
  displaySubmit,
  handleSubmit,
}) {
  return (
    <MDBox sx={{ p: 4 }}>
      <MDTypography variant="body2" color="error">
        <Icon>
          <InfoIcon />
        </Icon>
        &nbsp;
        <span>
          01 Mark for each Correct answer (You need to score atleast 40% of marks to get the
          certificate)
        </span>
      </MDTypography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardContent>
              <MDBox direction="flex" flexDirection="row">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <MDTypography variant="h4">{`Question ${index + 1}`}</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <MDTypography variant="body1">
                      <MDBox
                        style={{
                          inlineSize: "100%",
                          overflow: "hidden",
                          whiteSpace: "break-spaces",
                        }}
                      >
                        {question.QText}
                      </MDBox>
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <MDTypography variant="h6">Answer</MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
              {question.AdditionalDetails.MultiOption.map((option) => (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item sx={12} sm={12} md={12}>
                    <ToggleButton
                      sx={answer === option[0].mID ? { ...successOption } : null}
                      onClick={() => handleAnswer(option[0].mID)}
                      fullWidth
                      disableRipple
                      style={{
                        inlineSize: "100%",
                        overflow: "hidden",
                        whiteSpace: "break-spaces",
                      }}
                    >
                      {option[0].mValue}
                    </ToggleButton>
                  </Grid>
                  <Grid item sx={12} sm={12} md={12}>
                    <ToggleButton
                      sx={answer === option[1].mID ? { ...successOption } : null}
                      onClick={() => handleAnswer(option[1].mID)}
                      fullWidth
                      disableRipple
                      style={{
                        inlineSize: "100%",
                        overflow: "hidden",
                        whiteSpace: "break-spaces",
                      }}
                    >
                      {option[1].mValue}
                    </ToggleButton>
                  </Grid>
                </Grid>
              ))}
            </CardContent>
            <CardActions>
              <MDTypography variant="body2" color="primary">
                Note: You need to answer all the questions in order to submit the test (No negative
                marking)
              </MDTypography>
            </CardActions>
          </Card>
          <Grid container justifyContent="space-between" spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              {!displaySubmit && (
                <MDButton
                  sx={{ display: disablePrev ? "none" : "block" }}
                  onClick={handlePrevious}
                  disabled={displaySubmit}
                >
                  Previous
                </MDButton>
              )}
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                {!displaySubmit && (
                  <>
                    <Grid item>
                      <MDButton
                        sx={{ display: disableNext ? "none" : "block" }}
                        onClick={handleSkip}
                        disabled={displaySubmit}
                      >
                        Skip
                      </MDButton>
                    </Grid>
                    <Grid item>
                      <MDButton
                        sx={{ display: disableNext ? "none" : "block" }}
                        onClick={handleNext}
                        disabled={displaySubmit}
                      >
                        Next
                      </MDButton>
                    </Grid>
                  </>
                )}
                <Grid item>
                  <MDButton
                    sx={{ display: disableNext || displaySubmit ? "block" : "none" }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </MDButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Question;
