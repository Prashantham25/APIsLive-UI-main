import styled from "@emotion/styled";
import { Card, CardContent, Grid, Paper, Stack } from "@mui/material";
import React from "react";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { skippedOrange, successGreen, yetToAttendGray, selectedBlue } from "./Constants";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.caption,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
}));

const QuestionBox = styled(Paper)(({ theme }) => ({
  ...theme.typography.caption,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#fff",
  width: "36px",
  height: "36px",
  borderRadius: "5px",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "400",
  letterSpacing: "0em",
  margin: theme.spacing(1),
  cursor: "pointer",
}));

function QuestionareSidebar({
  questionSidebarCount,
  questionNumber,
  answers,
  handleQuestionClick,
  NoOfQuestion,
}) {
  const handleBgColor = (id) => {
    let color = yetToAttendGray;
    if (id === questionNumber && (answers[id] === null || answers[id] !== null)) {
      color = selectedBlue;
    } else if (id !== questionNumber && answers[id] === null) {
      color = yetToAttendGray;
    } else if (id !== questionNumber && answers[id] === -1) {
      color = skippedOrange;
    } else if (id !== questionNumber && answers[id] !== null) {
      color = successGreen;
    }
    return color;
  };
  return (
    <MDBox sx={{ p: 4 }}>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <MDTypography>Questions({NoOfQuestion})</MDTypography>
              {questionSidebarCount.map((item) => (
                <Stack direction="row">
                  {item.map((it) => (
                    <QuestionBox
                      key={it}
                      style={{
                        backgroundColor: handleBgColor(it),
                      }}
                      onClick={() => handleQuestionClick(it)}
                    >
                      {it + 1}
                    </QuestionBox>
                  ))}
                </Stack>
              ))}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Stack direction="row" spacing={2}>
                <Item style={{ backgroundColor: successGreen }}>Attended</Item>
                <Item style={{ backgroundColor: skippedOrange }}>Skipped</Item>
                <Item style={{ backgroundColor: yetToAttendGray }}>Yet to Attend</Item>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </MDBox>
  );
}

export default QuestionareSidebar;
