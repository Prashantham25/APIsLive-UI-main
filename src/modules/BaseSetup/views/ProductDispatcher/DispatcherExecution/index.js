import React, { useEffect, useState } from "react";
import { Card, Grid, Autocomplete, Stack, TextareaAutosize, Backdrop } from "@mui/material";
import ReactJson from "react-json-view";
import loader from "assets/images/Gifs/loading4.gif";
import error from "assets/images/Gifs/error.gif";
import oops from "assets/images/Gifs/somethingwentwrong.gif";
import swal from "sweetalert2";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import { getDispatcherList, dispatcherExecutions, dispatcherTaskExecution } from "../../../data";
import ExecutionStyle from "./ExecutionStyle.css";

function DispatcherExecution() {
  const [finalDispatcher, setFinalDispatcher] = useState([]);
  const [dispatcherTaskName, setDispatcherTaskDTOName] = useState({});
  const [DispatcherMasterDTO, setDispatcherMasterDTO] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loaderFlag, setLoaderFlag] = useState(false);
  const [gifFlag, setGif] = useState(false);
  const var1 = true;
  const placeholder = JSON.stringify({
    TxnObject: null,
    TxnDetails: true,
    TxnNo: null,
  });

  const [dispatcherTask, setDispatcherTask] = useState({
    product: "",
    productCode: "",
  });
  const [fields, setFields] = useState({
    requestObject: placeholder,
  });

  const handleAutoComplete = async (e, value) => {
    dispatcherTask.productCode = value.mID;
    dispatcherTask.product = value.mValue;
    setDispatcherTask(dispatcherTask);
    console.log("dispatcherTask", dispatcherTask);
  };

  const handleJson = async () => {
    setFlag(false);
    setLoaderFlag(true);
    try {
      const parsedJSon = JSON.parse(fields.requestObject);
      const code = parsedJSon["Product Code"];
      const data = await dispatcherExecutions(dispatcherTask.productCode, fields, code);
      if (data.status === 200) {
        setDispatcherTaskDTOName({ ...data.data });
      } else {
        setLoaderFlag(false);
        setGif(true);
      }
      const calldispatcherTaskExecution = await dispatcherTaskExecution(dispatcherTask.productCode);
      if (calldispatcherTaskExecution.status === 200) {
        setLoaderFlag(false);
        setFlag(true);
        const arr = [];
        calldispatcherTaskExecution.data.dispatcher.dispatcherTaskDTO.map((r) =>
          arr.push({ Input: r.inputObject, Output: r.outputObject, URL: r.api })
        );
        setFinalDispatcher(arr);
      } else {
        setLoaderFlag(false);
        setGif(true);
      }
    } catch (e) {
      setLoaderFlag(false);
      swal.fire({
        imageUrl: error,
        imageHeight: 200,
        imageWidth: 250,
        title: "Invalid JSON",
      });
      return false;
    }
    return null;
  };

  useEffect(async () => {
    await getDispatcherList().then((response) => {
      setDispatcherMasterDTO(response);
    });
  }, []);

  return (
    <Card>
      {gifFlag === false ? (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" color="primary">
              Dispatcher Execution
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px",
                },
              }}
              id="activityId"
              name="Select Dispatcher"
              options={DispatcherMasterDTO}
              onChange={handleAutoComplete}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Select Dispatcher" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <TextareaAutosize
              minRows={5}
              style={{
                width: "800px",
                border: "0.1px solid #ada5a5 ",
                height: "auto",
                overflow: "auto",
                resize: "none",
                padding: "8px",
              }}
              label="jsonObject"
              value={fields.requestObject}
              placeholder={placeholder}
              onChange={(e) => setFields({ ...fields, requestObject: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack justifyContent="right" direction="row">
              <MDButton onClick={handleJson}>Execute</MDButton>
            </Stack>
          </Grid>
          {flag === true ? (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" color="black">
                  Dispatcher Execution
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <div className={ExecutionStyle}>
                  <table>
                    <thead>
                      <tr>
                        <th>Input Request</th>
                        <th>Output Response</th>
                        <th>URL</th>
                      </tr>
                    </thead>

                    <tbody>
                      {finalDispatcher.map((value, ind) => (
                        <tr ind={ind}>
                          <td>
                            {ind !== 0 ? (
                              <ReactJson src={dispatcherTaskName[value.Input]} collapsed={var1} />
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            <MDBox>
                              <ReactJson src={dispatcherTaskName[value.Output]} collapsed={var1} />
                            </MDBox>
                          </td>
                          <td>{value.URL}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Grid>
            </>
          ) : null}

          <Backdrop
            sx={{ backgroundColor: "transparent", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loaderFlag}
          >
            <img
              alt=""
              src={loader}
              style={{ justifyContent: "center", height: "150px", width: "150px" }}
            />
          </Backdrop>
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="center" direction="row">
            <img
              alt=""
              src={oops}
              style={{ justifyContent: "center", height: "600px", width: "500px" }}
            />
          </Stack>
        </Grid>
      )}
    </Card>
  );
}

export default DispatcherExecution;
