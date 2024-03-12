import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GetOpportunity, SaveOpportunity, RedirectionTransaction } from ".";
import { DateFormatFromStringDate } from "../../../../../../../Common/Validations";
import MDTypography from "../../../../../../../components/MDTypography";

// const res = {
//   transactionid: "102345678912",
//   accessid: 12345789,
//   mobileno: 8291852122,
//   message1: "SUCCESS",
//   image: "",
//   fullName: "Robins",
//   address1: ", , K/267 Katra, Barabanki, Nawabganj, Nawabganj, Bara Banki, Uttar Pradesh",
//   dob: "22-03-1987",
//   gender: "M",
//   pincode: 225001,
//   dist: "Bara Banki",
//   house: "",
//   loc: "K/267 Katra",
//   po: "Barabanki",
//   state: "Uttar Pradesh",
//   street: "",
//   subdist: "Nawabganj",
//   village: "Nawabganj",
//   statusmsg: "00",
//   addhaar_number: "9038",
// };

export default function EKYCRedirection() {
  const { search } = useLocation();
  const TxnId = new URLSearchParams(search).get("TxnId");
  const navigate = useNavigate();

  useEffect(async () => {
    // apiCall(txnId).then(res=>{})
    // commonDetails.AdditionalDetailsJson?.AutoSave?.isProposerStage
    if (TxnId !== null && TxnId !== undefined) {
      const res1 = await RedirectionTransaction(TxnId);
      if (res1.status === 1 && res1.finalResult.ResponseStatus === "Success") {
        const str = res1.finalResult.TxnNo.toString();
        // const memberId = str.charAt(str.length - 1);
        // const flowId = str.charAt(str.length - 2);
        const memberId = str.split("").reverse()[0];
        const flowId = str.split("").reverse()[1];
        const data1 = await GetOpportunity(res1.finalResult.RefNo);
        // console.log("-----", memberId, flowId);
        const data2 = data1.AdditionalDetailsJson;
        const RiskItems = data1.AdditionalDetailsJson?.AutoSave?.RiskItems;
        const ekycData = res1.finalResult.AdditionalDetailsJson;
        if (
          // true
          ekycData.dob === DateFormatFromStringDate(RiskItems[memberId].DOB, "y-m-d", "d-m-y") &&
          ekycData.gender[0] === RiskItems[memberId].Gender[0]
        ) {
          try {
            RiskItems[memberId].Name = ekycData.fullName;
            RiskItems[memberId].AadhaarNo = ekycData.addhaar_number;
            RiskItems[memberId].EKYCDeclaration = "Yes";
            RiskItems[memberId].KYCThrough = "ekyc";
            RiskItems[memberId].CKYCDetails = {
              image: `data:image/jpg;base64,${ekycData.image}`,
              DOB: ekycData.dob,
              GENDER: ekycData.gender,
              PERM_LINE1: ekycData.address1,
              PERM_LINE2: ekycData.address2,
              PERM_LINE3: ekycData.address3,
              PERM_CITY: ekycData.loc,
              PERM_DIST: ekycData.dist,
              PERM_STATE: ekycData.state,
              PERM_COUNTRY: "India",
              PERM_PIN: ekycData.pincode,
              full_name: ekycData.fullName,
            };
            RiskItems[memberId].ContactNo = ekycData.mobileno;
            const PermanentAddress = {
              AddressLine1: ekycData.address1,
              AddressLine2: ekycData.address2,
              AddressLine3: ekycData.address3,
              City: ekycData.loc,
              District: ekycData.dist,
              State: ekycData.state,
              Country: "India",
              Pincode: ekycData.pincode,
            };
            RiskItems[memberId].PermanentAddress = { ...PermanentAddress };
            await SaveOpportunity({
              opportunityId: res1.finalResult.RefNo,
              isAutoSave: true,
              ...data2,
              AutoSave: {
                ...data2.AutoSave,
                RiskItems,
              },
            });
            if (flowId === "1") navigate(`/Proposal?OpportunityId=${res1.finalResult.RefNo}`);
            if (flowId === "3")
              navigate(`/lifeCustomerProposals?OpportunityId=${res1.finalResult.RefNo}`);
          } catch {
            //
          }
        } else {
          if (flowId === "1") navigate(`/Proposal?OpportunityId=${res1.finalResult.RefNo}`);
          if (flowId === "3")
            navigate(`/lifeCustomerProposals?OpportunityId=${res1.finalResult.RefNo}`);
        }
      } else {
        const str = res1.finalResult.TxnNo.toString();
        const flowId = str.split("").reverse()[1];
        if (flowId === "1") navigate(`/Proposal?OpportunityId=${res1.finalResult.RefNo}`);
        if (flowId === "3")
          navigate(`/lifeCustomerProposals?OpportunityId=${res1.finalResult.RefNo}`);
      }
    }
  }, [TxnId]);

  return <MDTypography>Loading...</MDTypography>;
}
