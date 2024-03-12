// import Swal from "sweetalert";
import genericApi from "Common/RenderControl/GenericAPIs";
// import {set} from "Common/RenderControl/objectPath"
import objectPath from "object-path";
import { getDynamicPage, getDynamicFunctionality } from "./DataBaseFile";
import { PolicyDto } from "./Json";

// { dto, setDto, activeStep }
const getOnNextClick = async ({ activeStep }) => {
  // const lDto = dto;
  let fun = true;
  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      // await Quotations(dto).then((x) => {
      //   if (x.status === 1 && x.finalResult) {
      //     lDto.PremiumDetails.netPremium = x.finalResult.NetPremium;
      //     lDto.PremiumDetails.gst = x.finalResult.GST;
      //     lDto.PremiumDetails.totalPremium = x.finalResult.FinalPremium;
      //     setDto({ ...lDto });
      //     fun = true;
      //   }
      // });
      fun = true;

      break;
    case 2:
      // await Policies(dto).then((x1) => {
      //   if (x1.status === 1) lDto.policyNo = x1.finalResult.id;
      // });
      // setDto({ ...lDto });
      // fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getUseEffect = async () => {
  const mst = getDynamicFunctionality().variables;
  const dto = PolicyDto();
  const onPageLoadApis = getDynamicFunctionality().onPageLoad;

  const res2 = onPageLoadApis.masters.map(async (x) => {
    const res = await genericApi(x.method, x.url, x.parameters);
    x.PathsToBind.forEach((x1, i1) => {
      const res1 = objectPath.get(res, x.PathsToBind[i1].from);
      if (x.whereToBind === "variables") objectPath.set(mst, x.PathsToBind[i1].to, res1);
      if (x.whereToBind === "json") objectPath.set(dto, x.PathsToBind[i1].to, res1);
    });
  });
  console.log("res3", mst);

  await Promise.all(res2);
  console.log("res4", mst);

  return { dto, masters: mst };
};

const getEventData = ({ dto, setDto, masters, setMasters }) => {
  const lDto = dto;
  const lMasters = masters;

  const onClick1 = async (flag, functionName) => {
    console.log("functionName", functionName);
    const y = getDynamicFunctionality();
    const x = y[functionName];
    const parameters = [];
    const { requestObj } = x;
    x.parameters.forEach((x1) => {
      if (x1.from === "variables") parameters.push(objectPath.get(lMasters, x1.path));
      if (x1.from === "json") parameters.push(objectPath.get(lDto, x1.path));
    });

    if (x.setRequestObj)
      x.setRequestObj.forEach((x1) => {
        objectPath.set(requestObj, x1.to, objectPath.get(dto, x1.from));
      });

    const res = await genericApi(x.method, x.url, requestObj, parameters);
    x.PathsToBind.forEach((x1, i1) => {
      const res1 = objectPath.get(res, x.PathsToBind[i1].from);
      if (x.whereToBind === "variables") objectPath.set(lMasters, x.PathsToBind[i1].to, res1);
      if (x.whereToBind === "json") objectPath.set(lDto, x.PathsToBind[i1].to, res1);
    });

    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };

  const onChange1 = async (e, v, p1, p2, functionName) => {
    console.log("functionName", functionName);
    const y = getDynamicFunctionality();
    const x = y[functionName];
    const parameters = [];
    const { requestObj } = x;

    x.parameters.forEach((x1) => {
      if (x1.from === "variables") parameters.push(objectPath.get(lMasters, x1.path));
      if (x1.from === "json") parameters.push(objectPath.get(lDto, x1.path));
    });

    if (x.setRequestObj)
      x.setRequestObj.forEach((x1) => {
        objectPath.set(requestObj, x1.to, objectPath.get(dto, x1.from));
      });

    const res = await genericApi(x.method, x.url, requestObj, parameters);
    x.PathsToBind.forEach((x1, i1) => {
      const res1 = objectPath.get(res, x.PathsToBind[i1].from);
      if (x.whereToBind === "variables") objectPath.set(lMasters, x.PathsToBind[i1].to, res1);
      if (x.whereToBind === "json") objectPath.set(lDto, x.PathsToBind[i1].to, res1);
    });

    setDto({ ...lDto });
    setMasters({ ...lMasters });
  };
  const customFunctions = { onClick1, onChange1 };
  return customFunctions;
};

export default [
  getDynamicPage,
  getDynamicFunctionality,

  getOnNextClick,
  getUseEffect,
  getEventData,
];
