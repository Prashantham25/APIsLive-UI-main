import swal from "sweetalert";
import { setProductJson } from "../../../../../BrokerPortal/context";

const handleCustomInput = (e, type, dispatch, obj, setObj) => {
  //  debugger;
  const objL = obj;
  switch (type) {
    case "basic":
      setProductJson(dispatch, { key: e.target.name, value: e.target.value });

      break;
    case "insurables":
      objL[e.target.name] = e.target.value;
      setObj((prev) => ({ ...prev, ...objL }));
      break;

    case "covers":
      objL[e.target.name] = e.target.value;
      setObj((prev) => ({ ...prev, ...objL }));
      break;
    case "benefits":
      objL[e.target.name] = e.target.value;

      setObj((prev) => ({ ...prev, ...objL }));
      break;
    case "si":
      if (e.target.name === "siValue") {
        setObj(e.target.value);
      }
      break;
    case "limit":
      if (e.target.name === "limitValue") {
        setObj(e.target.value);
      }
      break;
    case "limits":
      if (e.target.name === "limitValue1") {
        setObj(e.target.value);
      }
      break;
    //   case "V2":
    //     Benefits[e.target.name] = e.target.value;
    //     setBenefits((prev) => ({ ...prev, ...Benefits }));
    //     break;
    //   case "V21":
    //     BenefitDetails[e.target.name] = e.target.value;
    //     setBenefitDetails((prev) => ({ ...prev, ...BenefitDetails }));
    //     break;
    case "benefitss":
      objL[e.target.name] = e.target.value;
      setObj((prev) => ({ ...prev, ...objL }));
      break;
    default:
      console.log("wrong choice");
  }
};

const handleAutoComplete = (e, value, type, dispatch, obj, setObj) => {
  // debugger;

  const objL1 = obj;
  const key = e.target.id.split("-")[0];
  const val = value;
  switch (type) {
    case "basic":
      setProductJson(dispatch, { key, value: val });

      break;

    case "insurables":
      objL1[e.target.id.split("-")[0]] = value.mID;
      setObj((prev) => ({ ...prev, ...objL1 }));
      break;
    case "covers":
      objL1[e.target.id.split("-")[0]] = value.mID;

      setObj((prev) => ({ ...prev, ...objL1 }));
      break;
    case "benefits":
      //  debugger
      if (e.target.id.split("-")[0] === "benefitTypes") {
        //  objL1.benefitTypes = [...objL1.benefitTypes, ...value.mID];
        const len = value.length;
        objL1.benefitTypes.push(value[len - 1].mID);
      } else if (e.target.id.split("-")[0] === "basedOn" && value.mID === 3) {
        objL1[e.target.id.split("-")[0]] = value.mID;
        objL1.limitList = [];
      } else if (e.target.id.split("-")[0] === "basedOn" && value.mID === 2) {
        objL1[e.target.id.split("-")[0]] = value.mID;
        objL1.limitList = [];
      } else if (
        e.target.id.split("-")[0] === "benefitTypeId" ||
        e.target.id.split("-")[0] === "currencyId" ||
        e.target.id.split("-")[0] === "basedOn"
      ) {
        if (e.target.id.split("-")[0] === "benefitTypeId") {
          objL1.benefitCriterias = value.mValue;
        }
        objL1[e.target.id.split("-")[0]] = value.mID;
      } else {
        objL1[e.target.id.split("-")[0]] = value.mID;
      }
      setObj((prev) => ({ ...prev, ...objL1 }));
      break;

    case "benefitss":
      if (
        e.target.id.split("-")[0] === "basedOn" ||
        value.mValue === "Base SI" ||
        value.mValue === "Cover SI"
      ) {
        objL1.coverSiType = "";
      }
      objL1[e.target.id.split("-")[0]] = value.mID;
      setObj((prev) => ({ ...prev, ...objL1 }));
      break;
    default:
      console.log("wrong choice");
  }
};

const handleDelete = (obj, setObj, dispatch, keyi, keyc, keyb) => {
  //  debugger;
  swal("Are you sure you want to Delete?", {
    buttons: {
      cancel: {
        text: "No",
        value: "no",
        visible: true,
        className: "",
        closeModal: true,
      },
      confirm: {
        text: "Yes",
        value: "confirm",
        visible: true,
        className: "",
        closeModal: true,
      },
    },
  }).then((value) => {
    if (value === "confirm") {
      const objL = obj;

      if (keyi > -1 && keyc === undefined && keyb === undefined) {
        const newArr = objL.productInsurableItems.filter((x, i) => (i !== keyi ? x : null));

        objL.productInsurableItems = [...newArr];
        setProductJson(dispatch, { ...obj, ...objL });
        console.log("obj", obj);
      } else if (keyi > -1 && keyc > -1 && keyb === undefined) {
        //  debugger
        if (obj.policyType !== "VersionV2") {
          const newArr = objL.productInsurableItems[keyi].productCovers.filter((x, i) =>
            i !== keyc ? x : null
          );
          objL.productInsurableItems[keyi].coversData[0].forEach((y, yi) => {
            if (
              objL.productInsurableItems[keyi].coversData[0][yi].mValue ===
              objL.productInsurableItems[keyi].productCovers[keyc].cover
            ) {
              objL.productInsurableItems[keyi].coversData[0][yi].disable = false;
            }
          });
          objL.productInsurableItems[keyi].productCovers = [...newArr];
        } else {
          const newArr1 = objL.productInsurableItems[keyi].covers.filter((x, i) =>
            i !== keyc ? x : null
          );

          objL.productInsurableItems[keyi].coversData[0].forEach((y, yi) => {
            if (
              objL.productInsurableItems[keyi].coversData[0][yi].mValue ===
              objL.productInsurableItems[keyi].covers[keyc].coverName
            ) {
              objL.productInsurableItems[keyi].coversData[0][yi].disable = false;
            }
          });
          objL.productInsurableItems[keyi].covers = [...newArr1];
        }

        setProductJson(dispatch, { ...obj, ...objL });
      } else {
        if (objL.policyType !== "VersionV2") {
          const newArr = objL.productInsurableItems[keyi].productCovers[
            keyc
          ].productBenefits.filter((x, i) => (i !== keyb ? x : null));

          objL.productInsurableItems[keyi].productCovers[keyc].productBenefits = [...newArr];
        } else {
          const newArr1 = objL.productInsurableItems[keyi].covers[keyc].benefits.filter((x, i) =>
            i !== keyb ? x : null
          );

          objL.productInsurableItems[keyi].covers[keyc].benefits = [...newArr1];
        }

        setProductJson(dispatch, { ...obj, ...objL });
      }
    }
  });
};
export { handleCustomInput, handleAutoComplete, handleDelete };
