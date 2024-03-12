import { GeneratePaymentRequest, GeneratePGUrl } from "./Apis";

const buildForm = ({
  ACTION,
  MERCHANTID,
  APPID,
  APPNAME,
  TXNID,
  TXNDATE,
  TXNCRNCY,
  TXNAMT,
  REFERENCEID,
  REMARKS,
  PARTICULARS,
  TOKEN,
  // SUCCESSURL,
  // FAILUREURL,
}) => {
  const form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("ACTION", ACTION);
  const input = document.createElement("input");
  input.setAttribute("type", "hidden");
  input.setAttribute("name", "MERCHANTID");
  input.setAttribute("value", MERCHANTID);
  form.appendChild(input);
  const appid1 = document.createElement("input");
  appid1.setAttribute("type", "hidden");
  appid1.setAttribute("name", "APPID");
  appid1.setAttribute("value", APPID);
  form.appendChild(appid1);
  const txnid1 = document.createElement("input");
  txnid1.setAttribute("name", "TXNID");
  txnid1.setAttribute("value", TXNID);
  form.appendChild(txnid1);
  const txndate1 = document.createElement("input");
  txndate1.setAttribute("name", "TXNDATE");
  txndate1.setAttribute("value", TXNDATE);
  form.appendChild(txndate1);
  const txncrncy1 = document.createElement("input");
  txncrncy1.setAttribute("name", "TXNCRNCY");
  txncrncy1.setAttribute("value", TXNCRNCY);
  form.appendChild(txncrncy1);
  const txnamt1 = document.createElement("input");
  txnamt1.setAttribute("name", "TXNAMT");
  txnamt1.setAttribute("value", TXNAMT);
  form.appendChild(txnamt1);
  const referenceid1 = document.createElement("input");
  referenceid1.setAttribute("name", "REFERENCEID");
  referenceid1.setAttribute("value", REFERENCEID);
  form.appendChild(referenceid1);
  const remarks1 = document.createElement("input");
  remarks1.setAttribute("name", "REMARKS");
  remarks1.setAttribute("value", REMARKS);
  form.appendChild(remarks1);
  const particulars1 = document.createElement("input");
  particulars1.setAttribute("name", "PARTICULARS");
  particulars1.setAttribute("value", PARTICULARS);
  form.appendChild(particulars1);
  const appname1 = document.createElement("input");
  appname1.setAttribute("name", "APPNAME");
  appname1.setAttribute("value", APPNAME);
  form.appendChild(appname1);
  const token1 = document.createElement("input");
  token1.setAttribute("name", "TOKEN");
  token1.setAttribute("value", TOKEN);
  form.appendChild(token1);
  // const surl = document.createElement("input");
  // surl.setAttribute("name", "SUCCESSURL");
  // surl.setAttribute("value", SUCCESSURL);
  // form.appendChild(surl);
  // const furl = document.createElement("input");
  // furl.setAttribute("name", "FAILUREURL");
  // furl.setAttribute("value", FAILUREURL);
  // form.appendChild(furl);

  // form.setre;
  console.log("form", form);
  return form;
};
const post = (details) => {
  const form = buildForm(details);
  document.body.appendChild(form);
  form.submit();
  form.remove();
};

const NepalClearingHouse = async ({ GetDetails }) => {
  // const lDto = { ...GetDetails };
  let Amount = GetDetails.PaymentAmount;
  // Amount = Number(GetDetails.PaymentAmount);
  Amount = parseFloat(GetDetails.PaymentAmount) * 100;
  Amount = parseInt(Amount, 10);
  const res1 = await GeneratePGUrl(
    1193,
    GetDetails.ProposalNo,
    // GetDetails.PaymentAmount
    Amount
  );

  const obj = { TxnId: res1.data.paymentRefNo, TxnCurrency: "NPR", TxnAmt: res1.data.amount };
  // const localPayment = { ...lDto, ...PaymentDetails };
  // await GenericApi("NepalMotorTwoWheeler", "ShankarNepalIssuePolicy", localPayment);
  await GeneratePaymentRequest(obj).then((data) => {
    console.log("data", data);
    // setGenericInfo(dispatch,data.)
    const details = {
      ACTION: data.data.responseMessage,
      MERCHANTID: data.data.data.merchantid,
      APPID: data.data.data.appid,
      APPNAME: data.data.data.appname,
      TXNID: data.data.data.txnid,
      TXNDATE: data.data.data.txndate,
      TXNCRNCY: data.data.data.txncrncy,
      TXNAMT: data.data.data.txnamt,
      REFERENCEID: data.data.data.referenceid,
      REMARKS: data.data.data.remarks,
      PARTICULARS: data.data.data.particulars,
      TOKEN: data.data.data.token,
      // SUCCESSURL: "",
      // FAILUREURL: "https://localhost:3000/dashboard",
    };
    console.log("payment details", data);
    console.log("params", data.data.checksumHash);
    console.log("payment details", details);
    post(details);
  });
};

export default NepalClearingHouse;
