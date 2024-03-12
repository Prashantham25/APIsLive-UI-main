import genericApi from "Common/RenderControl/GenericAPIs";
import objectPath from "object-path";
import Swal from "sweetalert2";
import { isFunction } from "../../../../../../Common/Validations";
import AddFunctions from "./AddFunctions";
// import { set } from "../../../../../../Common/RenderControl/objectPath";

const getUseEffect = async ({ FunctionalityData }) => {
  const mst = FunctionalityData?.variables;
  const dto = {};
  const onPageLoadApis = FunctionalityData?.onPageLoad;

  const setDefaultValues = FunctionalityData?.onPageLoad?.setDefaultValues;
  if (Array.isArray(setDefaultValues)) {
    setDefaultValues.forEach((x) => {
      if (x.valueFrom === "value") {
        if (x.valueType === "Object") objectPath.set(dto, x.toPath, JSON.parse(x.value));
        if (x.valueType === "String") objectPath.set(dto, x.toPath, x.value);
        if (x.valueType === "Array") objectPath.set(dto, x.toPath, JSON.parse(x.value));
        if (x.valueType === "Integer") objectPath.set(dto, x.toPath, parseInt(x.value, 10));
        if (x.valueType === "Boolean") objectPath.set(dto, x.toPath, x.value === "True");
        if (x.valueType === "Floating") objectPath.set(dto, x.toPath, parseFloat(x.value, 10));
      }
      if (x.valueFrom === "environment") objectPath.set(dto, x.toPath, process.env[x.fromPath]);
      if (x.valueFrom === "local storage")
        objectPath.set(dto, x.toPath, localStorage.getItem(x.fromPath));
      // if (x.valueFrom === "context") objectPath.set(dto, x.toPath, x.value);
      // if (x.valueFrom === "today Date") objectPath.set(dto, x.toPath, x.value);
    });
  }

  try {
    if (FunctionalityData !== null) {
      const res2 = onPageLoadApis.masters.map(async (x) => {
        const res = await genericApi(x.method, x.url, x.requestObj, x.parameters);
        if (x.bindingType === "All (mType-mData)") {
          res.forEach((x1) => {
            objectPath.set(mst, x1.mType, x1.mdata);
          });
        }
        if (x.bindingType === "Individual") {
          x.pathsToBind.forEach((x1, i1) => {
            const res1 = objectPath.get(res, x.pathsToBind[i1].from);
            if (x.whereToBind === "variables") objectPath.set(mst, x.pathsToBind[i1].to, res1);
            if (x.whereToBind === "json") objectPath.set(dto, x.pathsToBind[i1].to, res1);
          });
        }
      });

      await Promise.all(res2);
    }
  } catch {
    console.log("");
  }

  return { dto, masters: mst };
};

const getEventData = ({ prod, masters, setMasters, FunctionalityData }) => {
  // const lDto = dto;
  const lMasters = masters;
  const y = FunctionalityData?.customOnClick;

  const ApiCall = async ({ functionName, propDto }) => {
    const lDto = propDto;
    if (isFunction(FunctionalityData?.customOnClick[functionName])) {
      AddFunctions({ productCode: prod })[functionName]({ lDto });
    } else {
      const x = y?.[functionName]?.[0];
      const parameters = [];
      const requestObj = x?.requestObj ? x.requestObj : undefined;
      const requestObjType = x?.requestObjType ? x.requestObjType : undefined;

      let requestObj1 = {};

      if (Array.isArray(x?.parameters))
        x.parameters.forEach((x1) => {
          if (x1.from === "variables") parameters.push(objectPath.get(lMasters, x1.path));
          if (x1.from === "json") parameters.push(objectPath.get(lDto, x1.path));
        });

      // console.log("requestObj", requestObj, x.setRequestObj, lDto);
      if (x?.setRequestObj)
        x.setRequestObj.forEach((x1) => {
          objectPath.set(requestObj, x1.to, objectPath.get(lDto, x1.from));
        });
      console.log("requestObj", requestObj);

      if (requestObjType === "dto") requestObj1 = { ...lDto };
      else if (requestObjType === "custom") requestObj1 = { ...requestObj };

      if (x?.method) {
        const res = await genericApi(x.method, x.url, requestObj1, parameters);
        x.pathsToBind.forEach((x1, i1) => {
          const res1 = objectPath.get(res, x.pathsToBind[i1].from);
          if (x1.whereToBind === "variables") objectPath.set(lMasters, x.pathsToBind[i1].to, res1);
          if (x1.whereToBind === "json") objectPath.set(lDto, x.pathsToBind[i1].to, res1);
        });
      }

      if (x?.resetValues && Array.isArray(x.resetValues)) {
        x.resetValues.forEach((x1) => {
          if (x1.whereToRest === "variables") objectPath.set(lMasters, x1.path, x1.value);
          if (x1.whereToRest === "json") objectPath.set(lDto, x1.path, x1.value);
        });
      }
      setMasters({ ...lMasters });
    }

    return lDto;
  };

  const GenerateNumberArray = () => {};

  const SetValues = ({ functionName, propDto }) => {
    const dto = propDto;
    const x = y?.[functionName]?.[0];
    /* eslint-disable */
    x.paths.forEach((x1) => {
      if (x1.isConditionBased === "Yes" && eval(x1.condition)) {
        if (x1.valueFrom === "dto") objectPath.set(propDto, x1.path, objectPath.get(dto, x1.value));
        if (x1.valueFrom === "value") objectPath.set(propDto, x1.path, x1.value);
      }
      if (x1.isConditionBased === "No") {
        if (x1.valueFrom === "dto") objectPath.set(propDto, x1.path, objectPath.get(dto, x1.value));
        if (x1.valueFrom === "value") objectPath.set(propDto, x1.path, x1.value);
      }
    });
    /* eslint-enable */

    return dto;
  };

  const SetValuesOnCondition = () => {};
  const functionDefinitionsList = { ApiCall, SetValues, SetValuesOnCondition, GenerateNumberArray };

  const onChangeEvents = async (e, v, p1, p2, functionList, dto, setDto, eventType) => {
    let propDto = { ...dto };
    console.log("propDto1", propDto, functionList);
    // functionList.forEach(async (x) => {
    //   propDto = await functionDefinitionsList[x.functionType]({
    //     functionName: x.functionName,
    //     propDto,
    //   });
    // });
    const getFunType = (ind) => y?.[functionList[ind].functionName]?.[0]?.functionType;
    if (functionList?.[0] && functionList[0].eventType === eventType)
      propDto = await functionDefinitionsList[getFunType(0)]({
        functionName: functionList[0].functionName,
        propDto,
      });
    if (functionList?.[1] && functionList[1].eventType === eventType)
      propDto = await functionDefinitionsList[getFunType(1)]({
        functionName: functionList[1].functionName,
        propDto,
      });
    if (functionList?.[2] && functionList[2].eventType === eventType)
      propDto = await functionDefinitionsList[getFunType(2)]({
        functionName: functionList[2].functionName,
        propDto,
      });
    if (functionList?.[3] && functionList[3].eventType === eventType)
      propDto = await functionDefinitionsList[getFunType(3)]({
        functionName: functionList[3].functionName,
        propDto,
      });
    if (functionList?.[4] && functionList[4].eventType === eventType)
      propDto = await functionDefinitionsList[getFunType(4)]({
        functionName: functionList[4].functionName,
        propDto,
      });
    if (functionList?.[5] && functionList[5].eventType === eventType)
      propDto = await functionDefinitionsList[getFunType(5)]({
        functionName: functionList[5].functionName,
        propDto,
      });

    console.log("propDto2", propDto);

    setDto({ ...propDto });
  };

  const customFunctions = { onChangeEvents };
  return customFunctions;
};

const onProceedButton = async ({
  activeStep,
  dto,
  setDto,
  masters,
  setMasters,
  FunctionalityData,
}) => {
  let flag = true;
  const lDto = dto;
  const lMasters = masters;
  // debugger;
  try {
    const x = FunctionalityData.onProceedButton[activeStep][0];
    const parameters = [];
    const { requestObj, requestObjType, failure, success } = x;
    console.log(x, "onProceed");
    if (Array.isArray(x.parameters))
      x?.parameters?.forEach((x1) => {
        if (x1.from === "variables") parameters.push(objectPath.get(lMasters, x1.path));
        if (x1.from === "json") parameters.push(objectPath.get(lDto, x1.path));
      });

    if (x.setRequestObj && requestObjType !== "dto")
      x?.setRequestObj?.forEach((x1) => {
        objectPath.set(requestObj, x1.to, objectPath.get(dto, x1.from));
      });

    const res = await genericApi(
      x.method,
      x.url,
      requestObjType === "dto" ? dto : requestObj,
      parameters
    );
    if (failure !== null && failure !== undefined && failure !== "") {
      if (failure?.path && objectPath.get(res, failure.path) === failure?.value) {
        flag = false;
        Swal.fire({
          icon: failure?.icon,
          title: failure?.title,
          text: failure?.text,
          allowOutsideClick: false,
        });
      }
    }
    if (success !== null && success !== undefined && success !== "") {
      if (success?.path && objectPath.get(res, success.path) === success?.value) {
        Swal.fire({
          icon: success?.icon,
          title: success?.title,
          text: success?.text,
          allowOutsideClick: false,
        });
        if (Array.isArray(x?.pathsToBind)) {
          x.pathsToBind.forEach((x1, i1) => {
            const res1 = objectPath.get(res, x.pathsToBind[i1].from);
            if (x.whereToBind === "variables") objectPath.set(lMasters, x.pathsToBind[i1].to, res1);
            if (x.whereToBind === "json") objectPath.set(lDto, x.pathsToBind[i1].to, res1);
          });
        }
      }
    }
    if (Array.isArray(x?.pathsToBind)) {
      x.pathsToBind.forEach((x1, i1) => {
        const res1 = objectPath.get(res, x.pathsToBind[i1].from);
        if (x.whereToBind === "variables" && x.pathsToBind[i1].to !== "")
          objectPath.set(lMasters, x.pathsToBind[i1].to, res1);
        if (x.whereToBind === "json" && x.pathsToBind[i1].to !== "")
          objectPath.set(lDto, x.pathsToBind[i1].to, res1);
      });
    }

    setDto({ ...lDto });
    setMasters({ ...lMasters });
  } catch (e) {
    console.log(e);
  }

  return flag;
};

export { getUseEffect, getEventData, onProceedButton };
