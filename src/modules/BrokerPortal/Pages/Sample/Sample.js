import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRequest } from "../../../../core/clients/axiosclient";

function SamplePage() {
  const search = useLocation();

  useEffect(async () => {
    console.log("location data", search);
    const url = new URL(search.state);
    console.log("url", url);
    const iD = new URLSearchParams(url.search).get("ClientId");
    const Data = await getRequest(`CustomerProvisioning/GetSsoDetails?serialNO=${iD}`);
    console.log("Data", Data);
    if (Data.data !== "") {
      localStorage.setItem("userId", Data.data.userId);
      localStorage.setItem("roleId", Data.data.additionDetails);
      localStorage.setItem("token", Data.data.token);
      window.location.href = search.state;
    }
  });

  return null;
}

export default SamplePage;
