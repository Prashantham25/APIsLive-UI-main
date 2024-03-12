import { useEffect } from "react";
// useLocation
import { useNavigate } from "react-router-dom";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../../BrokerPortal/context";
import { policyDto } from "./data/NBTravelJson";

function NBCommon() {
  // const { search } = useLocation();
  const Navigate = useNavigate();
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  useEffect(() => {
    if (genericInfo) {
      setGenericInfo(dispatch, { ...genericInfo, prod: "NBTravelRetail" });
      setGenericPolicyDto(dispatch, { ...policyDto() });
      Navigate("/newRetail");
    }
  }, [genericInfo]);
  return null;
}
export default NBCommon;
