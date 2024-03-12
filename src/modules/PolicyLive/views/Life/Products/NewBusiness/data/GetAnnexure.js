import objectPath from "object-path";
import { Autocomplete } from "@mui/material";

import { get } from "../../../../../../../Common/RenderControl/objectPath";
import MDInput from "../../../../../../../components/MDInput";

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};
const currYear = new Date().getFullYear();

export default function GetAnnexure({ dto, code, path, setDto, Country, tab }) {
  const radioList = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  let arr = [];
  console.log("GetAnnexure", code);

  const GetValue = (id, compareValue) => get(dto, `${path}.${code}_${id}`) === compareValue;

  // G113S1 Oil and Natural Gas
  // G112S1 mining industry
  // G114S1 sewage worker
  // G115S1 Construction And Tunneling / Construction

  const codeMapping = {
    G212S1: "G112S1",
    G213S1: "G113S1",
    G214S1: "G114S1",
    G215S1: "G115S1",

    G216S1: "G115S1", //
    G116S1: "G115S1",

    E412S1: "G112S1",
    E413S1: "G113S1",
    E414S1: "G114S1",
    E415S1: "G115S1",
    E416S1: "G115S1",
    S51S1: "S5",
    S51S2: "S5",
    S51S5: "S5",
    S57S1: "S5",
    S57S2: "S5",
    S57S5: "S5",
    S56S1: "S5",
    S56S2: "S5",
    S56S5: "S5",
  };

  const onAddTaxCountry = () => {
    const lDto = dto;
    const arr2 = objectPath.get(lDto, `${path}.${code}_CountryDetails`);
    if (Array.isArray(arr2))
      objectPath.set(lDto, `${path}.${code}_CountryDetails`, [...arr2, { id: arr2.length }]);
    else objectPath.set(lDto, `${path}.${code}_CountryDetails`, [{ id: 0 }]);
    setDto({ ...lDto });
  };

  const onTaxGridChanges = (value, name, ind) => {
    const lDto = dto;
    objectPath.set(lDto, `${path}.${code}_CountryDetails.${ind}.${name}`, value);
    setDto({ ...lDto });
  };

  const onPFQGrids = (value, name, ind, name2) => {
    const lDto = dto;
    objectPath.set(lDto, `${path}.${code}_${name2}.${ind}.${name}`, value);
    setDto({ ...lDto });
  };

  switch (codeMapping[code] ? codeMapping[code] : code) {
    case "Navy":
      arr = [
        {
          type: "InputSeparateLabel",
          label:
            "1 Give particulars regarding the branch of the Defence Forces, Regiment, etc. to which you belong and your present rank.",
          spacing: 12,
          path: 1,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "Typography",
          label: "2 (a) Are you, at present, engaged in",
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "i. Any flying duties as a Pilot or member of aircrew or other duties requiring you to remain aboard an aircraft otherwise than as a passenger for the purposes of  transport",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 2,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 3,
          visible: GetValue(2, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "ii. duties as a Paratrooper",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 4,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 5,
          visible: GetValue(4, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "iii. duties as a Glider Pilot",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 6,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 7,
          visible: GetValue(6, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "iv. duties as a member of aviation operating personnel or ground personnel",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 8,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 9,
          visible: GetValue(8, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "b) Were you engaged in the past in any of the duties mentioned under (a) above, and if so, are you likely or liable to return to the same in future?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 10,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "c) Have you undergone or are you now undergoing training for any of the duties mentioned under (a)above?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 11,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "d) Have you, under the terms and conditions of yourservice, any special liability to engage in Aviation,Gliding, Parachuting, Bomb disposal, Special Servicegroup, mine laying, etc?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 12,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "3) Are you a member of any Flying or Gliding Club?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 13,
        },
        {
          type: "InputSeparateLabel",
          label:
            "a) Whether you are undergoing training in flying, or gliding or whether you have completed such training?",
          spacing: 12,
          sx: { fontSize: "1rem" },
          required: true,

          path: 14,
        },
        {
          type: "InputSeparateLabel",
          label: "b) The number of flights made per  annum",
          spacing: 12,
          sx: { fontSize: "1rem" },
          required: true,

          path: 15,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "4 a) Have you ever been or do you intend to or are you  liable or likely to be engaged to do any work in a submarine, Minelayer or Minesweeper and if so, in  what capacity?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 16,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          visible: GetValue(16, "yes"),
          required: true,

          path: 17,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "b) Have you received any training or are you liable or likely to receive any training to work in a submarine, mine-layer or Mine-sweeper? If so, give details",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 18,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 19,
          visible: GetValue(18, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "5 a) Have you ever been required to or do you intend or are You  liable or likely to do diving in the course of your  duties?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 20,
        },

        {
          type: "InputSeparateLabel",
          label:
            "b) State the maximum depth up to which you have dived or have been trained to dive and number of dives undertaken during the last 12 months",
          spacing: 12,
          path: 21,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "6 Do you dive professionally / as an amateur / for pleasure?",
          spacing: 12,
          path: 22,
          sx: { fontSize: "1rem" },
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "7 For how long have you been engaged in diving?",
          spacing: 12,
          path: 23,
          sx: { fontSize: "1rem" },
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "8 Did you undergo special training for diving? If yes, please state",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 24,
          visible: GetValue(20, "yes"),
        },
        {
          type: "InputSeparateLabel",
          label: "a) Name and Address of the Training Institute",
          spacing: 12,
          path: 25,
          sx: { fontSize: "1rem" },
          visible: GetValue(24, "yes") && GetValue(20, "yes"),
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "b) Your qualification / grade",
          spacing: 12,
          path: 26,
          sx: { fontSize: "1rem" },
          visible: GetValue(24, "yes") && GetValue(20, "yes"),
          required: true,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "9 Are you a member of any Diving Club? If yes, state Name and address of the Club",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 27,
          visible: GetValue(20, "yes"),
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 28,
          sx: { fontSize: "1rem" },
          visible: GetValue(27, "yes") && GetValue(20, "yes"),
          required: true,
        },

        {
          type: "InputSeparateLabel",
          label: "10 Who is your current employer?",
          spacing: 12,
          path: 29,
          sx: { fontSize: "1rem" },
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "11 Do you use any equipment for diving?  If yes, state Make & Model of equipment",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 30,
          visible: GetValue(20, "yes"),
        },

        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 31,
          sx: { fontSize: "1rem" },
          visible: GetValue(30, "yes") && GetValue(20, "yes"),
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label:
            "12 Where do you normally dive?  Countries / states, Whether in deep sea, coastal waters, rivers,lakes",
          spacing: 12,
          path: 32,
          sx: { fontSize: "1rem" },
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "13 Please describe your precise duties whilst diving?",
          spacing: 12,
          path: 33,
          sx: { fontSize: "1rem" },
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "14 Do you ever use explosives?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 34,
          visible: GetValue(20, "yes"),
        },
        {
          type: "InputSeparateLabel",
          label: "15 How many dives do you make per month?",
          spacing: 12,
          path: 35,
          sx: { fontSize: "1rem" },
          visible: GetValue(20, "yes"),
          required: true,
        },

        {
          type: "Typography",
          label: "16 Depth of dives",
          spacing: 12,
          sx: { fontSize: "1rem" },
          visible: GetValue(20, "yes"),
        },
        {
          type: "Input",
          label: "Maximum depth to which you dive",
          path: 36,
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Average depth of dives",
          path: 37,
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "15 How many dives do you make per month?",
          spacing: 12,
          path: 38,
          sx: { fontSize: "1rem" },
          visible: GetValue(20, "yes"),
          required: true,
        },

        {
          type: "Typography",
          label: "17 Length of dives",
          spacing: 12,
          sx: { fontSize: "1rem" },
          visible: GetValue(20, "yes"),
        },
        {
          type: "Input",
          label: "Maximum length of dive",
          path: 39,
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Average length of dives",
          path: 40,
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "18 Do you engage in saturation diving?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 41,
          visible: GetValue(20, "yes"),
        },
        {
          type: "InputSeparateLabel",
          label: "19 Do you dive as a part of a team or solo?",
          spacing: 12,
          path: 42,
          sx: { fontSize: "1rem" },
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "a) If part of a team –How many divers are in the team?",
          spacing: 12,
          path: 43,
          sx: { fontSize: "1rem" },
          visible: GetValue(42, "yes") && GetValue(20, "yes"),
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "b) If solo – How many solo dives do you make per month?",
          spacing: 12,
          path: 44,
          sx: { fontSize: "1rem" },
          visible: GetValue(42, "yes") && GetValue(20, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "20 Have you ever suffered from any complaints during or after diving or had an accident while diving?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 45,
          visible: GetValue(20, "yes"),
        },
        {
          type: "Custom",
          spacing: 12,
          return: null,
        },
        {
          type: "Input",
          label: "On what date",
          path: 46,
          visible: GetValue(45, "yes") && GetValue(20, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Nature and duration of symptoms",
          path: 47,
          visible: GetValue(45, "yes") && GetValue(20, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Nature and duration of treatment",
          path: 48,
          visible: GetValue(45, "yes") && GetValue(20, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Any sequelae",
          path: 49,
          visible: GetValue(45, "yes") && GetValue(20, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Name and address of the Institution / Hospital /Doctor who treated you",
          path: 50,
          visible: GetValue(45, "yes") && GetValue(20, "yes"),
          required: true,
        },
        {
          type: "Custom",
          spacing: 12,
          return: null,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "21 Do you undergo regular medical check-up? If Yes, Name and address of the Institution /Hospital / doctor where these check-up are conducted",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 51,
          visible: GetValue(20, "yes"),
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 52,
          visible: GetValue(51, "yes") && GetValue(20, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "22 Were you ever advised to abstain from diving as a result of medical check ups? If yes, give details",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 53,
          visible: GetValue(20, "yes"),
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",

          path: 54,
          visible: GetValue(53, "yes") && GetValue(20, "yes"),
          required: true,
        },
      ];
      break;
    case "Army":
      arr = [
        {
          type: "InputSeparateLabel",
          label: "1. Full name of the Employer",
          spacing: 12,
          path: 1,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Department in which you work",
          spacing: 12,
          path: 2,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Your designation or Occupation",
          spacing: 12,
          path: 3,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Full details of the exact nature of your duties",
          spacing: 12,
          path: 4,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "If you are supervisor, nature or work done under your supervision",
          spacing: 12,
          path: 5,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label:
            "2 Give particulars regarding the branch of the Defense Forces, Regiment, etc. to which you belong and your present rank.",
          spacing: 12,
          path: 6,
          sx: { fontSize: "1rem" },
          required: true,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "3 a) i Are you, at present, engaged in :- Any flying duties as a Pilot or member of aircrew or other duties requiring you to remain aboard an aircraft otherwise than as a passenger for the purposes of  transport",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 7,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 8,
          visible: GetValue(7, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "ii. duties as a Paratrooper",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 9,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 10,
          visible: GetValue(9, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "iii. duties as a Glider Pilot",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 11,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 12,
          visible: GetValue(11, "yes"),
          required: true,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "iv. duties as a member of aviation operating personnel or ground personnel",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 13,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 14,
          visible: GetValue(13, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "b) Were you engaged in the past in any of the duties mentioned under (a) above, and if so, are you likely or liable to return to the same in future?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 15,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 16,
          visible: GetValue(15, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "c) Have you undergone or are you now undergoing training for any of the duties mentioned under (a)above?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 17,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 18,
          visible: GetValue(17, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "d) Have you, under the terms and conditions of your service, any special liability to engage in Aviation,Gliding, Parachuting, Bomb disposal, Special Servicegroup, mine laying, etc?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 19,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 20,
          visible: GetValue(19, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "4) Are you a member of any Flying or Gliding Club? If so, state:",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 21,
        },
        {
          type: "InputSeparateLabel",
          label:
            "a) Whether you are undergoing training in flying, or gliding or whether you have completed such training?",
          spacing: 12,
          path: 22,
          sx: { fontSize: "1rem" },
          visible: GetValue(21, "yes"),
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "b) The number of flights made per  annum",
          spacing: 12,
          path: 23,
          sx: { fontSize: "1rem" },
          visible: GetValue(21, "yes"),
          required: true,
        },
        {
          type: "Typography",
          label:
            "5) In addition to the duties to be performed by you , as a member of Armed Services, whether your duties require you to engage yourself in any other hazardous duties such as:",
          spacing: 12,
          sx: { fontSize: "1rem", color: "#000000" },
        },

        {
          type: "InputSeparateLabel",
          label: "a) Manufacture and / or reconditioning of Ammunitions",
          spacing: 12,
          path: 24,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "b) Construction work requiring use of explosives and / or compressed air",
          spacing: 12,
          path: 25,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "c) welding and spray painting",
          spacing: 12,
          path: 26,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label:
            "d) handling Electrical equipments carrying high voltage and / or working at heights",
          spacing: 12,
          path: 27,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "e) handling or remaining exposed to fumes, gas, acids or other chemicals",
          spacing: 12,
          path: 28,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "f) driving trucks or lorries or",
          spacing: 12,
          path: 29,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "g) other hazardous occupation,",
          spacing: 12,
          path: 30,
          sx: { fontSize: "1rem" },
          required: true,
        },
      ];
      break;
    case "Civil":
      arr = [
        {
          type: "InputSeparateLabel",
          label: "1. Full name of the Employer",
          spacing: 12,
          path: 1,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Department in which you work",
          spacing: 12,
          path: 2,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Your designation or Occupation",
          spacing: 12,
          path: 3,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Full details of the exact nature of your duties",
          spacing: 12,
          path: 4,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "If you are supervisor, nature or work done under your supervision",
          spacing: 12,
          path: 5,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "Typography",
          label: "2 Please state whether you fly as ",
          spacing: 12,
          sx: { fontSize: "1rem", color: "#000000" },
        },
        {
          type: "AutoComplete",
          label: "Commercial Pilot",
          spacing: 6,
          options: [
            { mValue: "Scheduled airline passenger flying" },
            { mValue: "Flight Instructor,Non-Scheduled passenger flying" },
            { mValue: "Freight carrying service" },
            { mValue: "Charter and sightseeing flying" },
            { mValue: "Aerial photography" },
            { mValue: "Business flying in Company owned planes" },
            { mValue: "Crop dusting" },
            { mValue: "Flying for testing prototype models" },
            { mValue: "Flying for checking flights of repaired and new-not prototype-planes" },
            { mValue: "Any other purpose" },
          ],
          path: 6,
          required: true,
        },

        {
          type: "AutoComplete",
          label: "Non-Commercial Pilot",
          spacing: 7,
          options: [
            { mValue: "pleasure" },
            { mValue: "business" },
            { mValue: "flight instructor" },
            { mValue: "Others" },
          ],
          path: 7,
          required: true,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "3. Whether you expect your future flying to differ from that done  in the past. ",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 8,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 9,
          visible: GetValue(8, "yes"),
          required: true,
        },
        {
          type: "Typography",
          label:
            "4. Particulars of the extent of flying done in the capacity shown under (2) above in the past and expected to be done in the next twelve months",
          spacing: 12,
          sx: { fontSize: "1rem", color: "#000000" },
        },

        {
          type: "Input",
          label: "Period",
          value: "Current calendar year to date",
          disabled: true,
        },
        {
          type: "Input",
          label: "In what capacity?",
          path: 10,
          spacing: 6,
          required: true,
        },
        {
          type: "Input",
          label: "No. of hours",
          path: 11,
          required: true,
        },
        {
          type: "Input",
          label: "Period",
          value: "Last full calendar year",
          disabled: true,
        },
        {
          type: "Input",
          label: "In what capacity?",
          path: 12,
          spacing: 6,
          required: true,
        },
        {
          type: "Input",
          label: "No. of hours",
          path: 13,
          required: true,
        },
        {
          type: "Input",
          label: "Period",
          value: "Previous to last full calendar year,All calendar years to date",
          disabled: true,
        },
        {
          type: "Input",
          label: "In what capacity?",
          path: 14,
          spacing: 6,
          required: true,
        },
        {
          type: "Input",
          label: "No. of hours",
          path: 15,
          required: true,
        },
        {
          type: "Input",
          label: "Period",
          value: "All calender years to date",
          disabled: true,
        },
        {
          type: "Input",
          label: "In what capacity?",
          path: 16,
          spacing: 6,
          required: true,
        },
        {
          type: "Input",
          label: "No. of hours",
          path: 17,
          required: true,
        },
        {
          type: "Input",
          label: "Period",
          value: "Estimated for next 12 months",
          disabled: true,
        },
        {
          type: "Input",
          label: "In what capacity?",
          path: 18,
          spacing: 6,
          required: true,
        },
        {
          type: "Input",
          label: "No. of hours",
          path: 19,
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "5. The type of aircraft",
          spacing: 12,
          path: 20,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "6. Who owns the aircraft and does the owner hold an Air, Operator’s Certificate?",
          spacing: 12,
          path: 21,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label:
            "7. Nature of arrangements for the maintenance and periodical, overhaul of the aircraft",
          spacing: 12,
          path: 22,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "8. Whether the aircrafts are flown only between Government, and   public aerodromes?  ",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 23,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 24,
          visible: GetValue(23, "yes"),
          required: true,
        },
        {
          type: "Typography",
          label: "9. Questions to be answered if you are a pilot",
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label: "a. What type of licence do you hold?",
          spacing: 12,
          path: 25,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "b. Which types of aircraft are you authorized to fly?",
          spacing: 12,
          path: 26,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "c. When did you learn to fly?",
          spacing: 12,
          path: 27,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "d. Have you been involved in any flying accidents?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 28,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 29,
          visible: GetValue(28, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "e. Have you ever had your licence revoked or been grounded? ",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 30,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Enter Details",
          path: 31,
          visible: GetValue(30, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "f. Do you intend to participate in air competitions of any kind, formula air  racing, exhibitions, aerobatics or stunt flying",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 32,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "g. Do you intend to undertake any low-level or specialized flying or manoeuvring?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 33,
        },

        {
          type: "Typography",
          label: `10. Questions to be answered by test pilots`,
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label: "a.The name of the Flying Club or school where you are receiving training",
          spacing: 12,
          path: 34,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "b.The flying certificate or licence for which you are undergoing training",
          spacing: 12,
          path: 35,
          sx: { fontSize: "1rem" },
          required: true,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "c. Whether you hold any flying certificate or   licence?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 36,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "d. Whether you intend to qualify as a commercial pilot?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 37,
        },
        {
          type: "Typography",
          label: `11. Questions to be answered by crew members`,
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label: "a.  Exact nature of duties on board the aircraft",
          spacing: 12,
          path: 38,
          sx: { fontSize: "1rem" },
          required: true,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "b. Whether you intend to undergo training as a  pilot?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 39,
        },
        {
          type: "Typography",
          label: `12. Questions to be answered by Ground staff`,
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label: "a. Exact nature of duties",
          spacing: 12,
          path: 40,
          sx: { fontSize: "1rem" },
          required: true,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "b. Are you required to fly in a capacity involving duties aboard an aircraft while in flight?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 41,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "c. Are you required to fly as a passenger?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 42,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "d. Whether you intend to undergo training as a  pilot or member of air crew? ",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 43,
        },
        {
          type: "Input",
          label: "",
          placeholder: "Please give details",
          path: 44,
          visible: GetValue(43, "yes"),
          required: true,
        },
        {
          type: "Typography",
          label: `13. Questions to be answered by passengers flying in aircraft other than scheduled airline planes`,
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "a. Are you a member of an Aeroplane Club?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 45,
        },
        {
          type: "InputSeparateLabel",
          label: "b. Name of the Club",
          spacing: 12,
          path: 46,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "c. Whether the non-schedule flying done by you is done entirely in aircraft owned by the Club?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 47,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "d. Whether you intend to take training as a pilot?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 9,
          path: 48,
        },
      ];
      break;
    case "MerchantMarine":
      arr = [
        {
          type: "InputSeparateLabel",
          label: "1. What type of vessel do you normally serve?",
          spacing: 12,
          path: 1,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "2. What type of cargo does the vessel carry?",
          spacing: 12,
          path: 2,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "3. What is your specific job title?",
          spacing: 12,
          path: 3,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "4. What are your precise duties?",
          spacing: 12,
          path: 4,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "5. Please mention your designation",
          spacing: 12,
          path: 5,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "6. List the countries where the vessel operate?",
          spacing: 12,
          path: 6,
          sx: { fontSize: "1rem" },
          required: true,
        },
      ];
      break;
    case "Mining":
      arr = [
        {
          type: "InputSeparateLabel",
          label: "1. Full name of the Employer",
          spacing: 12,
          path: 1,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Department in which you work",
          spacing: 12,
          path: 2,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Your designation or Occupation",
          spacing: 12,
          path: 3,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Full details of the exact nature of your duties",
          spacing: 12,
          path: 4,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "If you are supervisor, nature or work done under your supervision",
          spacing: 12,
          path: 5,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "2. Capacity in which you are working",
            fontSize: "1rem",
          },
          radioList: [
            { label: "With manual Labour", value: "With manual Labour" },
            { label: "Without manual Labour", value: "Without manual Labour" },
          ],
          justifyContent: "space-between",
          spacing: 12,
          path: 6,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "3. Whether you work underground?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 7,
        },
        {
          type: "InputSeparateLabel",
          label: "a) Type of Job",
          spacing: 12,
          path: 8,
          sx: { fontSize: "1rem" },
          visible: GetValue(7, "yes"),
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "b) The average number of hours spent underground per week?",
          spacing: 12,
          path: 9,
          sx: { fontSize: "1rem" },
          visible: GetValue(7, "yes"),
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "4. Are you an underground rescue worker?",
          spacing: 12,
          path: 10,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "5. Are you a short firer in colliery?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 11,
        },
        {
          type: "InputSeparateLabel",
          label:
            "6. Any other job with manual labour?  eg ; Electrician, mechanics, Heavy manual work ( unskilled) eg: labourer, rock wall workers, plant operator, Blaster, short firers, Fireman",
          spacing: 12,
          path: 12,
          sx: { fontSize: "1rem" },
          required: true,
        },
      ];
      break;
    case "Sewage":
      arr = [
        {
          type: "InputSeparateLabel",
          label: "1. Full name of the Employer",
          spacing: 12,
          path: 1,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Department in which you work",
          spacing: 12,
          path: 2,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Your designation or Occupation",
          spacing: 12,
          path: 3,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Full details of the exact nature of your duties",
          spacing: 12,
          path: 4,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "If you are supervisor, nature or work done under your supervision",
          spacing: 12,
          path: 5,
          sx: { fontSize: "1rem" },
          required: true,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "2. Are you a labourer, Cleaner, inspector of underground duties?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 6,
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "3. Are you Steeple Jack?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 7,
          required: true,
        },
      ];
      break;
    case "OilNatural":
      arr = [
        {
          type: "InputSeparateLabel",
          label: "1. Full name of the Employer",
          spacing: 12,
          path: 1,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Department in which you work",
          spacing: 12,
          path: 2,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Your designation or Occupation",
          spacing: 12,
          path: 3,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Full details of the exact nature of your duties and type of mine",
          spacing: 12,
          path: 4,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "If you are supervisor, nature or work done under your supervision",
          spacing: 12,
          path: 5,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "2. Are you based offshore or Inshore?",
          spacing: 12,
          path: 6,
          sx: { fontSize: "1rem" },
          required: true,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "3. Do your duties involve underwater work?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 7,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "4. Do your duties involve working at heights?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 8,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "5. Do you ever travel to and from rigs by helicopter?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 9,
        },
        {
          type: "InputSeparateLabel",
          label: "6. Can your occupation be described as:",
          spacing: 12,
          path: 10,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "7. Are you a well logger?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 11,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "8. Are you a diver?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 12,
        },
        {
          type: "Input",
          label: "Whether  off shore/ In shore",
          path: 13,
          visible: GetValue(12, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Purpose of Diving",
          path: 14,
          visible: GetValue(12, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Whether using explosive",
          path: 15,
          visible: GetValue(12, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Depth of diving",
          path: 16,
          visible: GetValue(12, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Frequency of diving",
          path: 17,
          visible: GetValue(12, "yes"),
          required: true,
        },
        {
          type: "Input",
          label: "Whether solo or  in a group",
          path: 18,
          visible: GetValue(12, "yes"),
          required: true,
        },
      ];
      break;
    case "ConstructionTunneling":
      arr = [
        {
          type: "InputSeparateLabel",
          label: "1. Full name of the Employer",
          spacing: 12,
          path: 1,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Department in which you work",
          spacing: 12,
          path: 2,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Your designation or occupation",
          spacing: 12,
          path: 3,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Full details of the exact nature of your duties",
          spacing: 12,
          path: 4,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "If you are supervisor, nature or work done under your supervision",
          spacing: 12,
          path: 5,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "Typography",
          label: "Only for Constructions",
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label:
            "1. Are you engaged in scaffolder/steel erector Activity (labourer), If yes please specify the height at works",
          spacing: 12,
          path: 6,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "2. Are you a painter-exterior, If yes please specify the height at works",
          spacing: 12,
          path: 7,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "3. Are you Roofer, If yes please specify the height at works",
          spacing: 12,
          path: 8,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label:
            "4. Steeplejack, Demolition worker with no explosive, Demolition worker using explosive",
          spacing: 12,
          path: 9,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "5. Building inspector or other supervisory work with no manual labour",
          spacing: 12,
          path: 10,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "6. Others",
          spacing: 12,
          path: 111,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "Typography",
          label: "Only For Tunnelling",
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label:
            "1. Are you air compressor operator, Civil engineer, Engineering geologist, Structural engineer, or any other supervisory post with no manual labour?",
          spacing: 12,
          path: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label:
            "2. Are you dumper shovel driver/Foreman (above ground)/Mechanical shovel driver/ Winch driver?",
          spacing: 12,
          path: 13,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label:
            "3. Are you conveyor operator/Foreman (below ground)/Manhole maker / Power loader operator/Roof bolter / Timberman?",
          spacing: 12,
          path: 14,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label:
            "5. Are you Shotfirer/Tunnel miner (using explosives)/Tunnel miner's labourer/ Tunneller (using explosives)?",
          spacing: 12,
          path: 15,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label:
            "5. Are you Shotfirer/Tunnel miner (using explosives)/Tunnel miner's labourer/ Tunneller (using explosives)?",
          spacing: 12,
          path: 16,
          sx: { fontSize: "1rem" },
        },
        {
          type: "InputSeparateLabel",
          label: "6. Others",
          spacing: 12,
          path: 17,
          sx: { fontSize: "1rem" },
        },
      ];

      break;
    case "Manufacture":
      arr = [
        {
          type: "InputSeparateLabel",
          label: "1. Full name of the Employer",
          spacing: 12,
          path: 1,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Department in which you work",
          spacing: 12,
          path: 2,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Your designation or occupation",
          spacing: 12,
          path: 3,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "Full details of the exact nature of your duties",
          spacing: 12,
          path: 4,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "If you are supervisor, nature or work done under your supervision",
          spacing: 12,
          path: 5,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "2. Acids: Are you a lead bumer working in vats of chambers?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 6,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "3. Explosive & Ammunition-Are you employed in salvage and reconditioning department employees persons handling explosive?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 7,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "4. Are you employed in salvage and reconditioning department?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 8,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "5. Chemical engineer, Chemist, lab technician, Research technician, tester, Toxicologist, Job of supervision",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 9,
        },

        {
          type: "InputSeparateLabel",
          label: "6. Others",
          spacing: 12,
          path: 10,
          sx: { fontSize: "1rem" },
          required: true,
        },
      ];

      break;

    case "NRI":
      arr = [
        {
          type: "InputSeparateLabel",
          label: "1. Your Nationality",
          spacing: 12,
          path: 1,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "2 a) Your Country of permanent residency",
          spacing: 12,
          path: 2,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label:
            "b) Date from which you become a permanent resident of country mentioned in (a) above",
          spacing: 12,
          path: 3,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "3 a) Date of leaving India for first time",
          spacing: 12,
          path: 4,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "b) Details of exchange facility availed of",
          spacing: 12,
          path: 5,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "c) Full particulars of Reserved Bank Permit No",
          spacing: 12,
          path: 6,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "d) Visa Status",
          spacing: 12,
          path: 7,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "e) Name of the Office of the Reserve Bank which granted above facilities",
          spacing: 12,
          path: 8,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "5 (a) Purpose of your stay abroad",
          spacing: 12,
          path: 9,
          sx: { fontSize: "1rem" },
          required: true,
        },

        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "(b) Are you gainfully employed abroad",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 10,
        },

        {
          type: "InputSeparateLabel",
          label:
            "(c)Your monthly income from employment in the foreign country (including Scholarship Assistantship etc. for those who are students or trainees) Please enclose true copies of the appointment Letter received from Government or Your Educational Institution",
          spacing: 12,
          path: 11,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "6 (a) Passport Number",
          spacing: 12,
          path: 12,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "(b) Date of Issue",
          spacing: 12,
          path: 13,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "(c) Place of Issue",
          spacing: 12,
          path: 14,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "(d) Date of birth",
          spacing: 12,
          path: 15,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label:
            "7 Whether you hold any Bank Account in India and if so Whether it is a Resident Account or Non-Resident Account Furnish full details thereof",
          spacing: 12,
          path: 16,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "8 The source from which the premiums will be paid",
          spacing: 12,
          path: 17,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "Typography",
          label:
            "9 Please indicate by which of the following manner you propose to remit the premiums to LIC of India",
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: false,
            label: "",
            fontSize: "1rem",
          },
          radioSpacing: 0.0,
          radioDirection: "column",
          required: true,

          radioList: [
            {
              label:
                "(a) By direct remittance from the country of your residence to India through Banking Channels (Preferably by Rupee Draft in favour of LIC) OR by remittance through Postal Channels like foreign money Orders",
              value: "a",
            },
            {
              label:
                "(b) By cheques drawn on your Non-Resident (External) or Foreign Currency(Non-Resident) Account with Bank in India",
              value: "b",
            },
            {
              label: "(c) By Cheques drawn on your resident non resident account bank in India",
              value: "c",
            },
            {
              label:
                "(d) By Cheques drawn on Account maintained by resident Parent or Spouse of the policyholder in their name or joint name with Other close relatives",
              value: "d",
            },
            {
              label:
                "(e) In case of bonafide students, Premiums can be accepted if paid In India by somebody else on behalf of the life assured",
              value: "e",
            },
          ],
          justifyContent: "space-between",
          spacing: 12,
          path: 18,
        },
        {
          type: "InputSeparateLabel",
          label: "10 Your full address in the country of your residence abroad",
          spacing: 12,
          path: 19,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label:
            "11 Since in accordance with the Exchange Control Regulation the Policy cannot be exported out of India, state full name and address of an Indian National Permanently residing in India to whom the policy may be despatched",
          spacing: 12,
          path: 20,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "12 Date of your leaving India/Date you left India(current visit)",
          spacing: 12,
          path: 21,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "InputSeparateLabel",
          label: "13 if you are a student, state the nature and full details of your studies",
          spacing: 12,
          path: 22,
          sx: { fontSize: "1rem" },
          required: true,
        },
      ];
      break;
    case "Tax":
      arr = [
        // {
        //   type: "RadioGroup",
        //   radioLabel: {
        //     labelVisible: true,
        //     label: "Is the country of Tax Residency outside India?",
        //     fontSize: "1rem",
        //   },
        //   radioList,
        //   justifyContent: "space-between",
        //   spacing: 12,
        //   path: 1,
        // },

        {
          type: "AutoComplete",
          options: [
            { mValue: "Policy Holder" },
            { mValue: "Joint Policy Holder" },
            { mValue: "Annuitant" },
            { mValue: "Joint Annuitant" },
            { mValue: "Beneficiary" },
            { mValue: "Assignee" },
            { mValue: "Re-assignee" },
            { mValue: "Payee" },
          ],
          spacing: 4,
          label: "Select Relevant Category",
          path: 1,
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "Residence for Tax Purposes in Jurisdiction(s) outside India:",
            fontSize: "1rem",
          },
          radioList,
          // justifyContent: "space-between",
          spacing: 12,
          path: 2,
          required: true,
        },
        {
          type: "Checkbox",
          spacing: 12,
          sx: { fontSize: "1rem" },
          checkedVal: "yes",
          unCheckedVal: "",
          path: "TaxDeclaration",
          required: true,
          label:
            "I hereby declare that the detail above are true and correct to the best of my knowledge and belief and I undertake to inform you of any changes therein within 30 days of such changes. In case any of the above information is found to be false or untrue or misleading or I am aware that I may be held liable for it.",
        },

        {
          type: "Button",
          label: "Add Details",
          spacing: 12,
          onClick: onAddTaxCountry,
          justifyContent: "right",
        },
        {
          type: "DataGrid",
          spacing: 12,
          sx: {
            "& .MuiDataGrid-columnHeaderTitle": {
              overflow: "visible",
              lineHeight: "1.43rem",
              whiteSpace: "normal",
            },
          },
          columns: [
            {
              headerName: "Country countries of tax residency",
              field: "Country",
              renderCell: (param) => (
                <Autocomplete
                  fullWidth
                  options={Country}
                  sx={{ ...autoStyle }}
                  value={param.row.Country}
                  getOptionLabel={(option) => option.mValue}
                  onChange={(e, a) => onTaxGridChanges(a.mValue, "country", param.row.id)}
                  renderInput={(params) => <MDInput {...params} label="" />}
                />
              ),
              width: 260,
            },
            {
              headerName: "Address in the Jurisdiction for Tax Residence",
              field: "Address",
              renderCell: (param) => (
                <MDInput
                  value={param.row.Address}
                  onChange={(e) => onTaxGridChanges(e.target.value, "Address", param.row.id)}
                />
              ),
              width: 260,
            },
            {
              headerName:
                "Address in the Jurisdiction for Tax Residence equivalent Number (Kindly attach proof of IN/functional equivalent)",
              field: "TIN",
              renderCell: (param) => (
                <MDInput
                  value={param.row.TIN}
                  onChange={(e) => onTaxGridChanges(e.target.value, "TIN", param.row.id)}
                />
              ),
              width: 260,
            },
            {
              headerName: "TIN/Functional equivalent Number Issuing Country",
              field: "TINFunction",
              renderCell: (param) => (
                <MDInput
                  value={param.row.TINFunction}
                  onChange={(e) => onTaxGridChanges(e.target.value, "TINFunction", param.row.id)}
                />
              ),
              width: 260,
            },
            {
              headerName: "Validity of documentary evidence provided",
              field: "Validity",
              renderCell: (param) => (
                <MDInput
                  value={param.row.Validity}
                  onChange={(e) => onTaxGridChanges(e.target.value, "Validity", param.row.id)}
                />
              ),
              width: 260,
            },
          ],
          rowId: "id",
          path: "CountryDetails",
        },
        {
          type: "Input",
          label: "Country of Birth",
          path: 3,
          required: true,
        },
        {
          type: "Input",
          label: "Citizenship",
          path: 4,
          required: true,
        },
        {
          type: "Input",
          label: "Nationality",
          path: 5,
          required: true,
        },
        {
          type: "Typography",
          spacing: 12,
          sx: { fontSize: "1rem" },
          label: "Address",
        },
        {
          type: "Input",
          label: "Number, Building Name, Street, Locality",
          path: 6,
          required: true,
        },
        {
          type: "Input",
          label: "City / Town",
          path: 7,
          required: true,
        },
        {
          type: "Input",
          label: "State / Province / Country",
          path: 8,
          required: true,
        },
        {
          type: "Input",
          label: "Postal Code",
          path: 9,
          required: true,
        },
        {
          type: "Typography",
          spacing: 12,
          sx: { fontSize: "1rem" },
          label: "Mailing address",
        },
        {
          type: "Input",
          label: "Number, Building Name, Street, Locality",
          path: 10,
          required: true,
        },
        {
          type: "Input",
          label: "City / Town",
          path: 11,
          required: true,
        },
        {
          type: "Input",
          label: "State / Province / Country",
          path: 12,
          required: true,
        },
        {
          type: "Input",
          label: "Postal Code",
          path: 13,
          required: true,
        },
        {
          type: "Typography",
          spacing: 12,
          sx: { fontSize: "1rem" },
          label: "Foreign address",
        },
        {
          type: "Input",
          label: "Number, Building Name, Street, Locality",
          path: 14,
          required: true,
        },
        {
          type: "Input",
          label: "City / Town",
          path: 15,
          required: true,
        },
        {
          type: "Input",
          label: "State / Province / Country",
          path: 16,
          required: true,
        },
        {
          type: "Input",
          label: "Postal Code",
          path: 17,
          required: true,
        },
        {
          type: "Typography",
          spacing: 12,
          sx: { fontSize: "1rem" },
          label: "Part II-Additional declaration to the self-certification form",
        },
        {
          type: "Typography",
          spacing: 12,
          sx: { fontSize: "1rem" },
          label:
            "to be given by the person whose country of tax residency is one of the jurisdictions that is notified by The Organisation of Economic Cooperation and Development (OECD) (Jurisdictions notified as of July 2021: Antigua and Barbuda, Bahamas, Bahrain, Barbados, Cyprus, Dor (DECO Saint Kits and Nevis, Saint Lucia, Seychelles, Turks and Caicos Islands, United Arab Emirates (UAE), and Vanuatu",
        },
        {
          type: "InputSeparateLabel",
          label: "1. Name of Jurisdiction(s) covered in OECD list in which you are tax resident",
          spacing: 12,
          path: 18,
          sx: { fontSize: "1rem" },
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "2. Did you obtain residence rights under any CHI RBI scheme in the above jurisdiction?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 19,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "3.a) Do you hold residence rights in any other jurisdiction(s) (ie. other than jurisdiction provided in (1) above)?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 20,
        },
        {
          type: "Input",
          label: "Please state the Name of Such Country(s)",
          path: 21,
          spacing: 6,
          visible: GetValue(20, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "3.b) Are you a tax resident of such Country?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 22,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "4.a) Have you spent more than 90 days in any other jurisdiction(s) (other than jurisdiction provided in (1) above) during the previous year?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 23,
        },
        {
          type: "Input",
          label: "Please state the Name of Such Country(s)",
          path: 24,
          spacing: 6,
          visible: GetValue(23, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "4.b) Are you are a tax resident of such Country?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 25,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label:
              "5.a) Have you filed personal income tax returns during the previous year in any other jurisdiction (other than jurisdiction provided in (1) above)",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 26,
        },
        {
          type: "Input",
          label: "Please state the Name of Such Country(s)",
          path: 27,
          spacing: 6,
          visible: GetValue(26, "yes"),
          required: true,
        },
        {
          type: "RadioGroup",
          radioLabel: {
            labelVisible: true,
            label: "5.b) Are you are a tax resident of such Country?",
            fontSize: "1rem",
          },
          radioList,
          justifyContent: "space-between",
          spacing: 12,
          path: 28,
        },
      ];

      break;
    case "PFQ":
      arr = [
        {
          type: "Typography",
          label: "PERSONAL FINANCIAL QUESTIONNAIRE",
          spacing: 12,
          variant: "h6",
        },
        {
          type: "Typography",
          label: "1. Please give details of your personal earning for the past 3 years",
          spacing: 12,
          sx: { fontSize: "1rem" },
        },

        {
          type: "DataGrid",
          spacing: 12,
          sx: {
            "& .MuiDataGrid-columnHeaderTitle": {
              overflow: "visible",
              lineHeight: "1.43rem",
              whiteSpace: "normal",
            },
          },
          columns: [
            {
              headerName: "Particulars",
              field: "Particulars",
              width: 350,
            },
            {
              headerName: `Year ${currYear - 1}-${currYear}`,
              field: "Year1",
              renderCell: (param) => (
                <MDInput
                  value={param.row.Year1}
                  onChange={(e) =>
                    onPFQGrids(e.target.value, "Year1", param.row.id, "PersonalEarnings")
                  }
                />
              ),
              width: 250,
            },
            {
              headerName: `Year ${currYear - 2}-${currYear - 1}`,
              field: "Year2",
              renderCell: (param) => (
                <MDInput
                  value={param.row.Year2}
                  onChange={(e) =>
                    onPFQGrids(e.target.value, "Year2", param.row.id, "PersonalEarnings")
                  }
                />
              ),
              width: 250,
            },
            {
              headerName: `Year ${currYear - 3}-${currYear - 2}`,
              field: "Year3",
              renderCell: (param) => (
                <MDInput
                  value={param.row.Year3}
                  onChange={(e) =>
                    onPFQGrids(e.target.value, "Year3", param.row.id, "PersonalEarnings")
                  }
                />
              ),
              width: 250,
            },
          ],
          rowId: "id",
          path: "PersonalEarnings",
        },
        {
          type: "Typography",
          label: "2. Business Details",
          spacing: 12,
          visible: "visibleDetails",
          visibleDetails: { path: `RiskItems.${tab}.Occupation.SourceOfIncomeCode`, value: "S5" },
          sx: { fontSize: "1rem" },
        },
        {
          type: "Input",
          label: "Name of Company/Partnership",
          path: 1,
          visible: "visibleDetails",
          visibleDetails: { path: `RiskItems.${tab}.Occupation.SourceOfIncomeCode`, value: "S5" },
          required: true,
        },
        {
          type: "Input",
          label: "Nature of Business",
          path: 2,
          visible: "visibleDetails",
          visibleDetails: { path: `RiskItems.${tab}.Occupation.SourceOfIncomeCode`, value: "S5" },
          required: true,
        },
        {
          type: "Input",
          label: "When was the business established",
          path: 3,
          visible: "visibleDetails",
          visibleDetails: { path: `RiskItems.${tab}.Occupation.SourceOfIncomeCode`, value: "S5" },
          required: true,
        },
        {
          type: "Input",
          label: "Number of employees",
          path: 4,
          visible: "visibleDetails",
          visibleDetails: { path: `RiskItems.${tab}.Occupation.SourceOfIncomeCode`, value: "S5" },
          required: true,
        },
        {
          type: "Input",
          label: "What percentage of the company’s share capital does the life to be insured own",
          path: 5,
          visible: "visibleDetails",

          visibleDetails: { path: `RiskItems.${tab}.Occupation.SourceOfIncomeCode`, value: "S5" },

          spacing: 6,
          required: true,
        },
        {
          type: "Typography",
          label:
            "3. Please give details of the turnover, gross profit and net profit before tax for the last 3 years, and projected figures for the next financial year :",
          spacing: 12,
          visible: "visibleDetails",

          visibleDetails: { path: `RiskItems.${tab}.Occupation.SourceOfIncomeCode`, value: "S5" },

          sx: { fontSize: "1rem" },
        },
        {
          type: "DataGrid",
          spacing: 12,
          visible: "visibleDetails",

          visibleDetails: { path: `RiskItems.${tab}.Occupation.SourceOfIncomeCode`, value: "S5" },

          sx: {
            "& .MuiDataGrid-columnHeaderTitle": {
              overflow: "visible",
              lineHeight: "1.43rem",
              whiteSpace: "normal",
            },
          },
          columns: [
            {
              headerName: `Year`,
              field: "Year",
              renderCell: (param) => (
                <MDInput
                  value={param.row.Year}
                  disabled={param.row.id === 3}
                  onChange={(e) => onPFQGrids(e.target.value, "Year", param.row.id, "Turnover")}
                />
              ),
              width: 300,
            },
            {
              headerName: `Turnover`,
              field: "Turnover",
              renderCell: (param) => (
                <MDInput
                  value={param.row.Turnover}
                  onChange={(e) => onPFQGrids(e.target.value, "Turnover", param.row.id, "Turnover")}
                />
              ),
              width: 250,
            },
            {
              headerName: `Gross Profit`,
              field: "GrossProfit",
              renderCell: (param) => (
                <MDInput
                  value={param.row.GrossProfit}
                  onChange={(e) =>
                    onPFQGrids(e.target.value, "GrossProfit", param.row.id, "Turnover")
                  }
                />
              ),
              width: 250,
            },
            {
              headerName: `Net Profit before Tax`,
              field: "NetProfit",
              renderCell: (param) => (
                <MDInput
                  value={param.row.NetProfit}
                  onChange={(e) => onPFQGrids(e.target.value, "NetProfit", param.row.id)}
                />
              ),
              width: 250,
            },
          ],
          rowId: "id",
          path: "Turnover",
        },
        {
          type: "Typography",
          label:
            "If a gross or net loss has been reported in these figures, please forward copies of the last 2 years accounts and an explanation of why the loss occurred.",
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "Typography",
          label:
            "Where information is unavailable due to recent formation of the company, please forward a copy of the current business plan including projections.",
          spacing: 12,
          sx: { fontSize: "1rem" },
        },
        {
          type: "Typography",
          label: "Please estimate the value of your assents and liabilities :",
          spacing: 12,
          sx: { fontSize: "1rem" },
        },

        {
          type: "DataGrid",
          spacing: 12,
          sx: {
            "& .MuiDataGrid-columnHeaderTitle": {
              overflow: "visible",
              lineHeight: "1.43rem",
              whiteSpace: "normal",
            },
          },
          columns: [
            {
              headerName: "Assets",
              field: "Assets",
              width: 400,
            },
            {
              headerName: `Rupees`,
              field: "AssetsValue",
              renderCell: (param) => (
                <MDInput
                  value={param.row.AssetsValue}
                  onChange={(e) =>
                    onPFQGrids(e.target.value, "AssetsValue", param.row.id, "AssetsLiabilities")
                  }
                />
              ),
              width: 250,
            },
            {
              headerName: `Liabilities`,
              field: "Liabilities",

              width: 350,
            },
            {
              headerName: `Rupees`,
              field: "LiabilityValue",
              renderCell: (param) =>
                param.row.Liabilities !== "" && (
                  <MDInput
                    value={param.row.LiabilityValue}
                    onChange={(e) =>
                      onPFQGrids(
                        e.target.value,
                        "LiabilityValue",
                        param.row.id,
                        "AssetsLiabilities"
                      )
                    }
                  />
                ),
              width: 250,
            },
          ],
          rowId: "id",
          path: "AssetsLiabilities",
        },
      ];

      break;

    default:
      arr = [];
  }
  return arr.map((x) => ({
    visible: true,
    ...x,
    path: x.path ? `${path}.${code}_${x.path}` : undefined,
  }));
}
