import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { useDataController, setChannelDetails } from "../BrokerPortal/context";
import MDLoader from "../../components/MDLoader";
import { Authenticate } from "./data";

export default function LifeBancaLogin() {
  const [, dispatch] = useDataController();
  // const { channelDetails } = controller;
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  console.log("search", search);
  const type = new URLSearchParams(search).get("LeadId");
  console.log("type", type);
  const Navigate = useNavigate();
  useEffect(async () => {
    setChannelDetails(dispatch, { ChannelType: "BANCA", Bank: "Axis" });
    // console.log("channelBanca", channelDetails);
    const loginuser = {
      Username: "LICBanca01@gmail.com",
      Password: "lic@123",
      ProductType: "Mica",
      envId: process.env.REACT_APP_EnvId,
    };
    setLoading(true);
    const login = await Authenticate(loginuser);
    console.log("login", login);
    setLoading(false);
    if (login.data.status === 1) {
      localStorage.setItem("userName", login.data.userName);
      localStorage.setItem("userId", login.data.userId);
      localStorage.setItem("roleId", login.data.roleId);
      localStorage.setItem("organizationId", login.data.organizationId);
      localStorage.setItem("token", login.data.token);
      localStorage.setItem("partnerId", login.data.partnerId);
      localStorage.setItem("profilePicture", login.data.profileImage);
      localStorage.setItem("firstName", login.data.firstName);
      localStorage.setItem("mobileNumber", login.data.mobileNumber);
      localStorage.setItem("email", login.data.email);
    }
    Navigate(`/Quotation?LeadId=${type}`);
  }, []);
  return (
    <Grid>
      <MDLoader loader={loading} />
      Redirection...
    </Grid>
  );
}
