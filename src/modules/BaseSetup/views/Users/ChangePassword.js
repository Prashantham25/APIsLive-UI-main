import React, { useState } from "react";
import { Grid, Card } from "@mui/material";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";
import MDBox from "../../../../components/MDBox";
import { ChangePasswordd } from "./data";

function ChangePassword() {
  const [errMsg1, setErrMsg1] = useState("");
  const [errMsg2, setErrMsg2] = useState("");
  const [matchflag1, setMatchFlag1] = useState(false);
  const [matchflag2, setMatchFlag2] = useState(false);
  const navigate = useNavigate();

  const [obj, setObj] = useState({
    Password: {
      id: "",
      isChangePassword: true,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      productType: localStorage.getItem("ProductType"),
      envId: "297",
    },
  });
  const onSave = async () => {
    if (
      matchflag1 === false &&
      matchflag2 === false &&
      obj.Password.newPassword !== "" &&
      obj.Password.oldPassword !== "" &&
      obj.Password.confirmPassword !== ""
    ) {
      const idd = obj;
      const userId = localStorage.getItem("userId");
      idd.Password.id = userId;
      const obj1 = idd.Password;
      const res = await ChangePasswordd(obj1);
      console.log("responce", res);
      if (res === null || res.data.status === 401) {
        swal({
          text: "Invalid old password",
          icon: "error",
        });
      }
      if (res.status === 500) {
        swal({
          text: "Please enter valid password",
          icon: "error",
        });
      }
      if (res.data.status === 2) {
        swal({
          text: res.data.responseMessage,
          icon: "success",
        });
        navigate("/home/Dashboard");
      }

      if (res.data.status === 9) {
        swal({
          text: "Password typed is not matching",
          icon: "error",
        });
      }
    } else {
      swal({
        icon: "error",
        text: "some fields are missing or Please check the data you entered",
      });
      //  setMatchFlag3(true);
    }
  };

  const onPasswordChange = async (e) => {
    if (e.target.name === "oldpassword") {
      obj.Password.oldPassword = e.target.value;
      setObj(obj);
    }
    if (e.target.name === "newpassword") {
      obj.Password.newPassword = e.target.value;

      if (obj.Password.newPassword.length >= 8) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{:;"'?/><,.\\[\]-]).{8,}$/;
        if (regex.test(e.target.value)) {
          setErrMsg1("");
          setMatchFlag1(false);
        }
      } else {
        setErrMsg1(
          "Please enter valid Password:The Password should contain more than 8 characters with at least one lowercase alphabet,one upper case alphabet, one numeric digit and a special character"
        );
        setMatchFlag1(true);
      }

      if (obj.Password.newPassword !== obj.Password.confirmPassword) {
        setErrMsg2("Password is not matched");
        setMatchFlag2(false);
      }
      setObj(obj);
    }
    if (obj.Password.oldPassword === obj.Password.newPassword) {
      setErrMsg1("New password should not same as old password");
      setMatchFlag1(true);
    }
    if (e.target.name === "confirmedpassword") {
      obj.Password.confirmPassword = e.target.value;
      if (obj.Password.newPassword === obj.Password.confirmPassword) {
        setErrMsg2("Password is matched");
        setMatchFlag2(false);
      } else {
        setErrMsg2("Password is not matched");
        setMatchFlag2(true);
      }
      setObj(obj);
    }
  };
  return (
    <Card>
      <MDBox p={2}>
        <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <MDTypography variant="body1" color="primary">
            Change Password
          </MDTypography>
        </MDBox>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              name="oldpassword"
              required
              label="Old Password"
              // value={obj.Password.oldPassword}
              onChange={onPasswordChange}
              type="password"
              //  error={matchflag3}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              name="newpassword"
              required
              label="New Password"
              onChange={onPasswordChange}
              helperText={errMsg1}
              // value={obj.Password.newPassword}
              type="password"
              error={matchflag1}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              name="confirmedpassword"
              required
              label="Confirmed Password"
              onChange={onPasswordChange}
              //  value={obj.Password.confirmPassword}
              type="password"
              helperText={errMsg2}
              //  error={matchflag3}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton onClick={onSave} color="success">
                SAVE
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default ChangePassword;
