import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDataController, setGenericInfo } from "../../../../BrokerPortal/context/index";

function RedirectToRetail() {
  const { search } = useLocation();
  const Navigate = useNavigate();
  const [, dispatch] = useDataController();
  // const { genericInfo } = control;

  useEffect(() => {
    const prodCode = new URLSearchParams(search).get("prodCode");
    const prodLabel = new URLSearchParams(search).get("prodLabel");
    const url = new URLSearchParams(search).get("url");

    setGenericInfo(dispatch, {
      // ...genericInfo,
      prod: prodCode,
      prodLabel: prodLabel.toString(),
    });

    const url1 = search;
    const url2 = url1.split("?");
    const url3 = url2[1].split("&");
    const arr1 = [];
    url3.forEach((x1) => {
      const quaryParam = x1.split("=")[0];
      if (quaryParam !== "prodCode" && quaryParam !== "prodLabel" && quaryParam !== "url")
        arr1.push(`${quaryParam}=${new URLSearchParams(search).get(quaryParam)}`);
    });

    Navigate(`${url}?${arr1.join("&")}`);
  }, []);
  return null;
}
export default RedirectToRetail;
