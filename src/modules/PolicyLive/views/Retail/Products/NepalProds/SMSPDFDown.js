import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetTemplatePayload } from "../../Payment/Apis";

function SMSPDFDown() {
  const { search } = useLocation();

  const generateFile = (content, fileName) => {
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;
    link.download = fileName;
    console.log("FilenameQuote", link.download);
    // document.body.innerHTML = `<embed src=${src} />`;
    link.click();
  };

  useEffect(async () => {
    let TemplateId = new URLSearchParams(search).get("TemplateId");
    let ProposalNo = new URLSearchParams(search).get("ProposalNo");

    /* eslint-disable */
    if (
      (ProposalNo === undefined || ProposalNo === null) &&
      TemplateId !== null &&
      TemplateId !== undefined
    ) {
      const arr1 = TemplateId.split("$");
      TemplateId = arr1[0];
      ProposalNo = arr1[1].split("=")[1];
    }
    /* eslint-enable */

    const downloadDTO = {
      key: ProposalNo,
      keyValue: "",
      templateKey: "",
      templateId: TemplateId,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      if (result.status === 200) {
        generateFile(result.data, ProposalNo);
      }
    });
  }, []);
  return null;
}
export default SMSPDFDown;
