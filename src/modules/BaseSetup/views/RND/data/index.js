import { postRequest, getRequest } from "../../../../../core/clients/axiosclient";

const WhatsAppApi = async (url, token, obj) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(obj),
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const Transliteration = async (obj) => {
  try {
    const res = await postRequest(`ML/Transliteration`, obj);
    return res.data.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetQuote = async (QuoteNumber) => {
  try {
    const res = await getRequest(`Quotation/GetQuote?QuoteNumber=${QuoteNumber}`);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const GetDynamicPermissionsbyRoles = async () => {
  try {
    const res = await postRequest(`Permission/GetDynamicPermissionsbyRoles`, {
      userId: "01aae464-6e25-48f7-b907-f6a53ce49228",
      roleId: ["8e53635f-4a91-48fd-9228-931cb152fe47"],
    });
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const SendDocuSignEmail = async (obj) => {
  try {
    const res = await postRequest(`DocuSign/SendDocuSignEmail`, obj);
    return res;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export { WhatsAppApi, Transliteration, GetQuote, GetDynamicPermissionsbyRoles, SendDocuSignEmail };
