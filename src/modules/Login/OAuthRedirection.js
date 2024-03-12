import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useMsal } from "@azure/msal-react";
import { OAuthAuthenticate, SearchUserSettingDetails } from "./data";

export default function OAuthRedirection() {
  const navigate = useNavigate();
  // const { accounts } = useMsal();
  //   console.log("accounts", accounts[0]);
  useEffect(async () => {
    navigate("/OAuthRedirection");

    /* eslint-disable */
    const loginuser = {
      Username: localStorage.getItem("userName"),
      Password: "",
      ProductType: "Mica",
      serverType: "",
      envId: 297,
      isAuth: true,
    };
    const login = await OAuthAuthenticate(loginuser);
    if (login.data.status === 1) {
      localStorage.setItem("userId", login.data.userId);
      localStorage.setItem("roleId", login.data.roleId);
      localStorage.setItem("organizationId", login.data.organizationId);
      localStorage.setItem("token", login.data.token);
      localStorage.setItem("partnerId", login.data.partnerId);
      localStorage.setItem("profilePicture", login.data.profileImage);
      localStorage.setItem("firstName", login.data.firstName);

      const res = await SearchUserSettingDetails("LandingPath", loginuser);
      if (res.data && res.data.data && res.data.data.LandingPath)
        navigate(res.data.data.LandingPath);
      else navigate(`/home/Dashboard`);
    } else {
      swal({
        text: "Wrong Password",
        icon: "error",
      });
    }
    console.log("OAuthAuthenticate", login);

    /* eslint-enable */
  }, []);
  useEffect(() => {
    navigate("/OAuthRedirection");
  }, []);

  return null;
}
