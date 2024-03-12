import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetSsoDetails } from "./data";

function CommonRedirection() {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(async () => {
    const serialNO = new URLSearchParams(search).get("ClientId");
    console.log("serialNO", serialNO);
    const serialNO1 = serialNO.split(" ").join("%2B");
    localStorage.setItem("token", "");
    const response = await GetSsoDetails(serialNO1);
    localStorage.setItem("userId", response.data.userId);
    localStorage.setItem("roleId", response.data.additionDetails.RoleId);
    localStorage.setItem("partnerId", response.data.additionDetails.PartnerId);
    localStorage.setItem("token", response.data.token);

    if (response.data && response.data.additionDetails && response.data.additionDetails.ReturnUrl) {
      const rUrl = response.data.additionDetails.ReturnUrl;
      const url1 = search;
      const url2 = url1.split("?");
      const url3 = url2[1].split("&");
      const arr = [];
      url3.forEach((x, i) => {
        if (i !== 0) arr.push(x);
      });
      let url = "";
      if (arr.length > 0) {
        if (rUrl.includes("?")) {
          url = rUrl.concat("&", arr.join("&"));
        } else {
          url = rUrl.concat("?", arr.join("&"));
        }
      } else {
        url = rUrl;
      }
      // const url =
      //   arr.length > 0
      //     ? rUrl.includes("?")
      //       ? rUrl.concat("&", arr.join("&"))
      //       : rUrl.concat("?", arr.join("&"))
      //     : rUrl;

      console.log("url", url);
      //  const url = rUrl.concat("?", arr.join("&"));
      navigate(url);
    }
  }, []);

  return null;
}
export default CommonRedirection;
