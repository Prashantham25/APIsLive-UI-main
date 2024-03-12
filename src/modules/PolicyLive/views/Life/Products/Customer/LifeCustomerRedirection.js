import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDataController, setLifeDetails } from "../../../../../BrokerPortal/context";
import { Authenticate } from "../../../../../Login/data";
import { GetProdPartnerMasterData } from "../NewBusiness/data";
import MDLoader from "../../../../../../components/MDLoader";

export default function LifeCustomerRedirection() {
  const { search } = useLocation();
  const PlanNo = new URLSearchParams(search).get("plan");
  const navigate = useNavigate();
  const [, dispatch] = useDataController();
  const [loader, setLoader] = useState(false);

  useEffect(async () => {
    try {
      const loginuser = {
        Username: "LICCustomer01@gmail.com",
        Password: "Mica@123",
        ProductType: "Mica",
        envId: process.env.REACT_APP_EnvId,
      };
      setLoader(true);
      await Authenticate(loginuser).then((res) => {
        setLoader(false);
        if (res.data.status === 1) {
          localStorage.setItem("userName", res.data.userName);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("roleId", res.data.roleId);
          localStorage.setItem("organizationId", res.data.organizationId);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("partnerId", res.data.partnerId);
          localStorage.setItem("profilePicture", res.data.profileImage);
          localStorage.setItem("firstName", res.data.firstName);
        }
      });
      setLoader(true);
      const res = await GetProdPartnerMasterData("Product", { parentID: "0" });
      setLoader(false);
      const planDetails = res.filter((x) => x.planNumber === PlanNo)[0];

      setLifeDetails(dispatch, {
        plans: [{ ...planDetails, Product: planDetails.mValue, ProductId: planDetails.mID }],
      });
      navigate(`/CustomerQuote?plan=${planDetails?.planNumber}`);
    } catch (e) {
      console.log(e);
      //
    }
  }, []);
  return <MDLoader loader={loader} />;
}
