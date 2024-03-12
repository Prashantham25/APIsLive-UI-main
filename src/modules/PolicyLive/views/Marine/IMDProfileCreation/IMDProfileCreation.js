import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import { postRequest } from "core/clients/axiosclient";
import AccordionDetails from "@mui/material/AccordionDetails";
import { setLogo, setCustTheme, useDataController } from "modules/BrokerPortal/context";
import { v4 as uuid } from "uuid";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { Alert, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import swal from "sweetalert";
import RadioGroup from "@mui/material/RadioGroup";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import { useNavigate } from "react-router-dom";
import MDBox from "../../../../../components/MDBox";
// import UpdateProfile from "./IMDProfileUpdation";
import MDTypography from "../../../../../components/MDTypography";
import MarineProfileCreation from "../../../../../assets/images/MarineProfileCreation.png";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import data from "./JsonData";
import IMDMaster from "./data/IMDMaster";
import MDLoader from "../../../../../components/MDLoader";
import {
  Saveprofile,
  getMasterDatalist,
  // BranchData,
  fetchuser,
  fetchProfile,
  ClauseData,
  // fetchusername,
} from "./data";
// import { getRequest } from "../../../../../core/clients/axiosclient";

function handleClause(
  PolicyDto,
  ImportAir,
  ImportAirc,
  ImportSea,
  ImportSeac,
  ImportRail,
  ImportRailc,
  ImportPost,
  ImportPostc,
  InlandAir,
  InlandAirc,
  InlandSea,
  InlandSeac,
  InlandAirt,
  setInlandAirt,
  inpo16,
  setinpo16,
  allair,
  setallair,
  allair2,
  setallair2,
  allair12,
  setallair12,
  allair3,
  setallair3,
  allair4,
  setallair4,
  allair5,
  setallair5,
  allair13,
  setallair13,
  allsea,
  setallsea,
  allsea1,
  setallsea1,
  allsea2,
  setallsea2,
  allsea6,
  setallsea6,
  allsea3,
  setallsea3,
  allsea4,
  setallsea4,
  allsea15,
  setallsea15,
  allsea7,
  setallsea7,
  allair14,
  setallair14,
  allair15,
  setallair15,
  allair17,
  setallair17,
  allair19,
  setallair19,
  allair21,
  setallair21,
  allair8,
  setallair8,
  allair16,
  setallair16,
  allair18,
  setallair18,
  allair20,
  setallair20,
  allair22,
  setallair22,
  allair23,
  setallair23,
  allair24,
  setallair24,
  allair25,
  setallair25,
  allair26,
  setallair26,
  allair27,
  setallair27,
  expo1,
  setexpo1,
  expo2,
  setexpo2,
  expo3,
  setexpo3,
  expo4,
  setexpo4,
  expo5,
  setexpo5,
  expo6,
  setexpo6,
  expo7,
  setexpo7,
  expo8,
  setexpo8,
  expo9,
  setexpo9,
  expo10,
  setexpo10,
  expo11,
  setexpo11,
  expo12,
  setexpo12,
  expo13,
  setexpo13,
  expo14,
  setexpo14,
  expo15,
  setexpo15,
  impo1,
  setimpo1,
  impo2,
  setimpo2,
  impo3,
  setimpo3,
  impo4,
  setimpo4,
  impo5,
  setimpo5,
  impo6,
  setimpo6,
  impo7,
  setimpo7,
  impo8,
  setimpo8,
  impo9,
  setimpo9,
  impo10,
  setimpo10,
  impo11,
  setimpo11,
  impo12,
  setimpo12,
  impo13,
  setimpo13,
  impo14,
  setimpo14,
  impo15,
  setimpo15,
  inpo1,
  setinpo1,
  inpo2,
  setinpo2,
  inpo3,
  setinpo3,
  inpo4,
  setinpo4,
  inpo5,
  setinpo5,
  inpo6,
  setinpo6,
  inpo7,
  setinpo7,
  inpo8,
  setinpo8,
  inpo9,
  setinpo9,
  inpo10,
  setinpo10,
  inpo11,
  setinpo11,
  inpo12,
  setinpo12,
  inpo13,
  setinpo13,
  inpo14,
  setinpo14,
  inpo15,
  setinpo15,
  allair7,
  setallair7,
  inpo17,
  setinpo17,
  allair9,
  setallair9,
  allair10,
  setallair10,
  allair28,
  setallair28,
  checked1,
  setChecked,
  checked2,
  setChecked1,
  inst1,
  setinst1,
  inst2,
  setinst2,
  inst3,
  setinst3,
  inst4,
  setinst4,
  inst5,
  setinst5,
  inst6,
  setinst6,
  setPolicyDto,
  row1,
  row2,
  selected2
) {
  console.log(PolicyDto, "handleclausepolicy");
  console.log(ImportAirc, setInlandAirt, "ImportAirImportAir1");
  const LPolicyDto = PolicyDto;
  console.log("push alle", allair5);
  console.log(LPolicyDto, "handleclausepolicyLPolicyDto");
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handletransitinlandair = (e, type, value) => {
    if (type === "Marine Specific Voyage Inland") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo16(InlandAirt);
          console.log("push all", inpo16);
        } else {
          const tarr = [...value];
          tarr.shift();
          setinpo16(tarr);
          console.log("rmove all", inpo16);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 126) {
            setinpo16(InlandAirt);
          } else {
            setinpo16(value);
          }
          console.log("push all", inpo16);
        } else if (value.length === 126 && value[0].mID !== 0) {
          setinpo16([]);
          console.log("rmove all", inpo16);
        } else {
          setinpo16(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].air.InlandTransitClauses = [...inpo16];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handletransitinlandair1 = (e, type, value) => {
    if (type === "Marine Specific Voyage Inland") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo17(ImportRail);
          console.log("push all", inpo17);
        } else {
          const tarr = [...value];
          tarr.shift();
          setinpo17(tarr);
          console.log("rmove all", inpo17);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 126) {
            setinpo17(ImportRail);
          } else {
            setinpo17(value);
          }
          console.log("push all", inpo17);
        } else if (value.length === 126 && value[0].mID !== 0) {
          setinpo17([]);
          console.log("rmove all", inpo17);
        } else {
          setinpo17(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].air.NonInstituteClauses = [...inpo17];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handleselectallinlandair = (e, type, value) => {
    if (type === "Marine Specific Voyage Inland") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair7(InlandAirc);
          console.log("push all", allair7);
        } else {
          const tarr = [...value];
          tarr.shift();
          setallair7(tarr);
          console.log("rmove all", allair7);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 127) {
            setallair7(InlandAirc);
          } else {
            setallair7(value);
          }
          console.log("push all", allair7);
        } else if (value.length === 127 && value[0].mID !== 0) {
          setallair7([]);
          console.log("rmove all", allair7);
        } else {
          setallair7(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].air.CommonClauses = [...allair7];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handlecheckedtransitinlandair = (row11) => {
    if (row11 === "Marine Specific Voyage Inland") {
      return inpo16;
    }
    return null;
  };
  const handlecheckedtransitinlandair1 = (row11) => {
    if (row11 === "Marine Specific Voyage Inland") {
      return inpo17;
    }
    return null;
  };

  const handleselectallair = (e, type, value) => {
    console.log(e, "reason");
    console.log(value, "reason");
    console.log(type, "reason");
    console.log(e.target.checked, "reason");
    if (type === "Marine Specific Voyage Import") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair(ImportAirc);
          console.log("push all", allair);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair(tarr);

          console.log("rmove all", allair);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 127) {
            setallair(ImportAirc);
          } else {
            setallair(uniq);
          }

          console.log("push all", allair);
        } else if (uniq.length === 127 && uniq[0].mID !== 0) {
          setallair([]);
          console.log("rmove all", allair);
        } else {
          setallair(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].air.CommonClauses = [...allair];
    } else if (type === "Marine Specific Voyage Export") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair2(ImportAirc);
          console.log("push all", allair2);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair2(tarr);
          console.log("rmove all", allair2);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 127) {
            setallair2(ImportAirc);
          } else {
            setallair2(uniq);
          }
          console.log("push all", allair2);
        } else if (uniq.length === 127 && uniq[0].mID !== 0) {
          setallair2([]);
          console.log("rmove all", allair2);
        } else {
          setallair2(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].air.CommonClauses = [...allair2];
    }
    // else if (type === "Marine Specific Voyage Export FOB") {
    //   let iairflag = false;
    //   value.map((col) => {
    //     if (col.mValue === "Select All") {
    //       console.log("reasoncargo", col.mValue);
    //       iairflag = true;
    //     }
    //     return null;
    //   });
    //   console.log(iairflag, "reasoncargo");
    //   if (iairflag === true) {
    //     if (e.target.checked === true) {
    //       setallair2(ImportAirc);
    //       console.log("push all", allair2);
    //     } else {
    //       const tarr = [...value];
    //       tarr.shift();
    //       setallair2(tarr);
    //       console.log("rmove all", allair2);
    //     }
    //   } else if (iairflag === false) {
    //     if (e.target.checked === true) {
    //       if (value.length === 127) {
    //         setallair2(ImportAirc);
    //       } else {
    //         setallair2(value);
    //       }
    //       console.log("push all", allair2);
    //     } else if (value.length === 127 && value[0].mID !== 0) {
    //       setallair2([]);
    //       console.log("rmove all", allair2);
    //     } else {
    //       setallair2(value);
    //     }
    //   }
    //   LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].air.CommonClauses = [...allair2];
    // }
    else if (type === "Marine Specifc Voyage Duty") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair12(ImportAirc);
          console.log("push all", allair12);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair12(tarr);
          console.log("rmove all", allair12);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 127) {
            setallair12(ImportAirc);
          } else {
            setallair12(uniq);
          }
          console.log("push all", allair12);
        } else if (uniq.length === 127 && uniq[0].mID !== 0) {
          setallair12([]);
          console.log("rmove all", allair12);
        } else {
          setallair12(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].air.CommonClauses = [...allair12];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handleselectallinst = (e, type, value) => {
    console.log(e, "reason");
    console.log(value, "reason");
    console.log(type, "reason");
    console.log(e.target.checked, "reason");
    if (type === "Marine Specific Voyage Import") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinst1(IMDMaster.Clauses[0].ExportImportAir[0].InstituteClauses);
          console.log("push all", inst1);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinst1(tarr);

          console.log("rmove all", inst1);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 7) {
            setinst1(IMDMaster.Clauses[0].ExportImportAir[0].InstituteClauses);
          } else {
            setinst1(uniq);
          }

          console.log("push all", inst1);
        } else if (uniq.length === 7 && uniq[0].mID !== 0) {
          setinst1([]);
          console.log("rmove all", inst1);
        } else {
          setinst1(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].air.InstituteClauses = [...inst1];
    } else if (type === "Marine Specific Voyage Export") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinst2(IMDMaster.Clauses[0].ExportImportAir[0].InstituteClauses);
          console.log("push all", inst2);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinst2(tarr);
          console.log("rmove all", inst2);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 7) {
            setinst2(IMDMaster.Clauses[0].ExportImportAir[0].InstituteClauses);
          } else {
            setinst2(uniq);
          }
          console.log("push all", inst2);
        } else if (uniq.length === 7 && uniq[0].mID !== 0) {
          setinst2([]);
          console.log("rmove all", inst2);
        } else {
          setinst2(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].air.InstituteClauses = [...inst2];
    } else if (type === "Marine Specifc Voyage Duty") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinst3(IMDMaster.Clauses[0].ExportImportAir[0].InstituteClauses);
          console.log("push all", inst3);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinst3(tarr);
          console.log("rmove all", inst3);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 7) {
            setinst3(IMDMaster.Clauses[0].ExportImportAir[0].InstituteClauses);
          } else {
            setinst3(uniq);
          }
          console.log("push all", inst3);
        } else if (uniq.length === 7 && uniq[0].mID !== 0) {
          setinst3([]);
          console.log("rmove all", inst3);
        } else {
          setinst3(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].air.InstituteClauses = [...inst3];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };
  const handleselectallinst1 = (e, type, value) => {
    console.log(e, "reason");
    console.log(value, "reason");
    console.log(type, "reason");
    console.log(e.target.checked, "reason");
    if (type === "Marine Specific Voyage Import") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinst4(IMDMaster.Clauses[0].ExportImportSea[0].InstituteClauses);
          console.log("push all", inst4);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinst4(tarr);

          console.log("rmove all", inst4);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 8) {
            setinst4(IMDMaster.Clauses[0].ExportImportSea[0].InstituteClauses);
          } else {
            setinst4(uniq);
          }

          console.log("push all", inst4);
        } else if (uniq.length === 8 && uniq[0].mID !== 0) {
          setinst4([]);
          console.log("rmove all", inst4);
        } else {
          setinst4(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].sea.InstituteClauses = [...inst4];
    } else if (type === "Marine Specific Voyage Export") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinst5(IMDMaster.Clauses[0].ExportImportSea[0].InstituteClauses);
          console.log("push all", inst5);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinst5(tarr);
          console.log("rmove all", inst5);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 8) {
            setinst5(IMDMaster.Clauses[0].ExportImportSea[0].InstituteClauses);
          } else {
            setinst5(uniq);
          }
          console.log("push all", inst5);
        } else if (uniq.length === 8 && uniq[0].mID !== 0) {
          setinst5([]);
          console.log("rmove all", inst5);
        } else {
          setinst5(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].sea.InstituteClauses = [...inst5];
    } else if (type === "Marine Specifc Voyage Duty") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinst6(IMDMaster.Clauses[0].ExportImportSea[0].InstituteClauses);
          console.log("push all", inst6);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinst6(tarr);
          console.log("rmove all", inst6);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 8) {
            setinst6(IMDMaster.Clauses[0].ExportImportSea[0].InstituteClauses);
          } else {
            setinst6(uniq);
          }
          console.log("push all", inst6);
        } else if (uniq.length === 8 && uniq[0].mID !== 0) {
          setinst6([]);
          console.log("rmove all", inst6);
        } else {
          setinst6(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].sea.InstituteClauses = [...inst6];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handlecheckedinlandrail = (row11) => {
    console.log(row11);

    if (row11 === "Marine Specific Voyage Import") {
      return allair15;
    }
    if (row11 === "Marine Specific Voyage Export") {
      return allair17;
    }
    if (row11 === "Marine Specific Voyage Export FOB") {
      return allair19;
    }
    if (row11 === "Marine Specific Voyage Inland") {
      return allair14;
    }
    if (row11 === "Marine Specifc Voyage Duty") {
      return allair21;
    }

    return null;
  };

  const handlecheckedinlandair4 = (row11) => {
    console.log(row11);

    if (row11 === "Marine Specific Voyage Import") {
      return allair23;
    }
    if (row11 === "Marine Specific Voyage Export") {
      return allair24;
    }
    if (row11 === "Marine Specific Voyage Export FOB") {
      return allair25;
    }
    if (row11 === "Marine Specific Voyage Inland") {
      return allair26;
    }
    if (row11 === "Marine Specifc Voyage Duty") {
      return allair27;
    }

    return null;
  };

  const handleselectallinlandrail = (e, type, value) => {
    if (type === "Marine Specific Voyage Import") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair15(ImportRailc);
          console.log("push all", allair15);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair15(tarr);
          console.log("rmove all", allair15);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair15(ImportRailc);
          } else {
            setallair15(uniq);
          }
          console.log("push all", allair15);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair15([]);
          console.log("rmove all", allair15);
        } else {
          setallair15(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir.CommonClauses = [
        ...allair15,
      ];
    } else if (type === "Marine Specific Voyage Export") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair17(ImportRailc);
          console.log("push all", allair17);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair17(tarr);
          console.log("rmove all", allair17);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair17(ImportRailc);
          } else {
            setallair17(uniq);
          }
          console.log("push all", allair17);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair17([]);
          console.log("rmove all", allair17);
        } else {
          setallair17(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir.CommonClauses = [
        ...allair17,
      ];
    } else if (type === "Marine Specific Voyage Export FOB") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair19(ImportRailc);
          console.log("push all", allair19);
        } else {
          const tarr = [...value];
          tarr.shift();
          setallair19(tarr);
          console.log("rmove all", allair19);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 126) {
            setallair19(ImportRailc);
          } else {
            setallair19(value);
          }
          console.log("push all", allair19);
        } else if (value.length === 126 && value[0].mID !== 0) {
          setallair19([]);
          console.log("rmove all", allair19);
        } else {
          setallair19(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir.CommonClauses = [
        ...allair19,
      ];
    } else if (type === "Marine Specific Voyage Inland") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair14(ImportRailc);
          console.log("push all", allair14);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair14(tarr);
          console.log("rmove all", allair14);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair14(ImportRailc);
          } else {
            setallair14(uniq);
          }
          console.log("push all", allair14);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair14([]);
          console.log("rmove all", allair14);
        } else {
          setallair14(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir.CommonClauses = [
        ...allair14,
      ];
    } else if (type === "Marine Specifc Voyage Duty") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair21(ImportRailc);
          console.log("push all", allair21);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair21(tarr);
          console.log("rmove all", allair21);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair21(ImportRailc);
          } else {
            setallair21(uniq);
          }
          console.log("push all", allair21);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair21([]);
          console.log("rmove all", allair21);
        } else {
          setallair21(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir.CommonClauses = [
        ...allair21,
      ];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handlecheckedExpoImpoInlandPostCourier = (row11, row12) => {
    console.log(row11, row12);

    if (row11 === "Marine Specific Voyage Import" && row12 === "Courier") {
      return expo1;
    }
    if (row11 === "Marine Specific Voyage Import" && row12 === "Parcel Post") {
      return expo2;
    }
    if (row11 === "Marine Specific Voyage Import" && row12 === "Registered POST") {
      return expo3;
    }
    if (row11 === "Marine Specific Voyage Export" && row12 === "Courier") {
      return expo4;
    }
    if (row11 === "Marine Specific Voyage Export" && row12 === "Parcel Post") {
      return expo5;
    }
    if (row11 === "Marine Specific Voyage Export" && row12 === "Registered POST") {
      return expo6;
    }

    if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Courier") {
      return expo7;
    }
    if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Parcel Post") {
      return expo8;
    }
    if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Registered POST") {
      return expo9;
    }

    if (row11 === "Marine Specific Voyage Inland" && row12 === "Courier") {
      return expo13;
    }
    if (row11 === "Marine Specific Voyage Inland" && row12 === "Parcel Post") {
      return expo14;
    }
    if (row11 === "Marine Specific Voyage Inland" && row12 === "Registered POST") {
      return expo15;
    }

    if (row11 === "Marine Specifc Voyage Duty" && row12 === "Courier") {
      return expo10;
    }
    if (row11 === "Marine Specifc Voyage Duty" && row12 === "Parcel Post") {
      return expo11;
    }
    if (row11 === "Marine Specifc Voyage Duty" && row12 === "Registered POST") {
      return expo12;
    }

    return null;
  };

  const handelAutoSelectClauses = (selectedvalue, row11, row12) => {
    let Autoflag = false;
    if (row11 === "Marine Specific Voyage Import" && row12 === "Courier") {
      expo1.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Import" && row12 === "Parcel Post") {
      expo2.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Import" && row12 === "Registered POST") {
      expo3.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export" && row12 === "Courier") {
      expo4.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export" && row12 === "Parcel Post") {
      expo5.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export" && row12 === "Registered POST") {
      expo6.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Courier") {
      expo7.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Parcel Post") {
      expo8.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Registered POST") {
      expo9.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Inland" && row12 === "Courier") {
      expo13.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Inland" && row12 === "Parcel Post") {
      expo14.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Inland" && row12 === "Registered POST") {
      expo15.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specifc Voyage Duty" && row12 === "Courier") {
      expo10.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specifc Voyage Duty" && row12 === "Parcel Post") {
      expo11.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specifc Voyage Duty" && row12 === "Registered POST") {
      expo12.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }

    return Autoflag;
  };

  const handelAutoSelectClauses1 = (selectedvalue, row11, row12) => {
    let Autoflag = false;
    if (row11 === "Marine Specific Voyage Import" && row12 === "Courier") {
      impo1.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Import" && row12 === "Parcel Post") {
      impo2.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Import" && row12 === "Registered POST") {
      impo3.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export" && row12 === "Courier") {
      impo4.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export" && row12 === "Parcel Post") {
      impo5.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export" && row12 === "Registered POST") {
      impo6.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Courier") {
      impo7.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Parcel Post") {
      impo8.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Registered POST") {
      impo9.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Inland" && row12 === "Courier") {
      impo13.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Inland" && row12 === "Parcel Post") {
      impo14.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Inland" && row12 === "Registered POST") {
      impo15.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specifc Voyage Duty" && row12 === "Courier") {
      impo10.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specifc Voyage Duty" && row12 === "Parcel Post") {
      impo11.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specifc Voyage Duty" && row12 === "Registered POST") {
      impo12.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }

    return Autoflag;
  };

  const handelAutoSelectClauses2 = (selectedvalue, row11, row12) => {
    let Autoflag = false;
    if (row11 === "Marine Specific Voyage Import" && row12 === "Courier") {
      inpo1.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Import" && row12 === "Parcel Post") {
      inpo2.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Import" && row12 === "Registered POST") {
      inpo3.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export" && row12 === "Courier") {
      inpo4.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export" && row12 === "Parcel Post") {
      inpo5.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export" && row12 === "Registered POST") {
      inpo6.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Courier") {
      inpo7.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Parcel Post") {
      inpo8.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Registered POST") {
      inpo9.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Inland" && row12 === "Courier") {
      inpo13.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Inland" && row12 === "Parcel Post") {
      inpo14.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specific Voyage Inland" && row12 === "Registered POST") {
      inpo15.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specifc Voyage Duty" && row12 === "Courier") {
      inpo10.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specifc Voyage Duty" && row12 === "Parcel Post") {
      inpo11.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (row11 === "Marine Specifc Voyage Duty" && row12 === "Registered POST") {
      inpo12.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }

    return Autoflag;
  };

  const ExpoImpoInlandPostCourier = (e, type, value, type1) => {
    if (type === "Marine Specific Voyage Import" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo1(ImportPostc);
          console.log("push all", expo1);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo1(tarr);
          console.log("rmove all", expo1);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo1(ImportPostc);
          } else {
            setexpo1(uniq);
          }
          console.log("push all", expo1);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo1([]);
          console.log("rmove all", expo1);
        } else {
          setexpo1(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses = [...expo1];
    } else if (type === "Marine Specific Voyage Import" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo2(ImportPostc);
          console.log("push all", expo2);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo2(tarr);
          console.log("rmove all", expo2);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo2(ImportPostc);
          } else {
            setexpo2(uniq);
          }
          console.log("push all", expo2);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo2([]);
          console.log("rmove all", expo2);
        } else {
          setexpo2(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].ParcelPost.CommonClauses = [...expo2];
    } else if (type === "Marine Specific Voyage Import" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo3(ImportPostc);
          console.log("push all", expo3);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo3(tarr);
          console.log("rmove all", expo3);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo3(ImportPostc);
          } else {
            setexpo3(uniq);
          }
          console.log("push all", expo3);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo3([]);
          console.log("rmove all", expo3);
        } else {
          setexpo3(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].RegisteredPost.CommonClauses = [
        ...expo3,
      ];
    } else if (type === "Marine Specific Voyage Export" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo4(ImportPostc);
          console.log("push all", expo4);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo4(tarr);
          console.log("rmove all", expo4);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo4(ImportPostc);
          } else {
            setexpo4(uniq);
          }
          console.log("push all", expo4);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo4([]);
          console.log("rmove all", expo4);
        } else {
          setexpo4(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].Courier.CommonClauses = [...expo4];
    } else if (type === "Marine Specific Voyage Export" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo5(ImportPostc);
          console.log("push all", expo5);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo5(tarr);
          console.log("rmove all", expo5);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo5(ImportPostc);
          } else {
            setexpo5(uniq);
          }
          console.log("push all", expo5);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo5([]);
          console.log("rmove all", expo5);
        } else {
          setexpo5(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].ParcelPost.CommonClauses = [...expo5];
    } else if (type === "Marine Specific Voyage Export" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo6(ImportPostc);
          console.log("push all", expo6);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo6(tarr);
          console.log("rmove all", expo6);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo6(ImportPostc);
          } else {
            setexpo6(uniq);
          }
          console.log("push all", expo6);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo6([]);
          console.log("rmove all", expo6);
        } else {
          setexpo6(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].RegisteredPost.CommonClauses = [
        ...expo6,
      ];
    } else if (type === "Marine Specific Voyage Export FOB" && type1 === "Courier") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo7(ImportPostc);
          console.log("push all", expo7);
        } else {
          const tarr = [...value];
          tarr.shift();
          setexpo7(tarr);
          console.log("rmove all", expo7);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 125) {
            setexpo7(ImportPostc);
          } else {
            setexpo7(value);
          }
          console.log("push all", expo7);
        } else if (value.length === 125 && value[0].mID !== 0) {
          setexpo7([]);
          console.log("rmove all", expo7);
        } else {
          setexpo7(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].Courier.CommonClauses = [...expo7];
    } else if (type === "Marine Specific Voyage Export FOB" && type1 === "Parcel Post") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo8(ImportPostc);
          console.log("push all", expo8);
        } else {
          const tarr = [...value];
          tarr.shift();
          setexpo8(tarr);
          console.log("rmove all", expo8);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 125) {
            setexpo8(ImportPostc);
          } else {
            setexpo8(value);
          }
          console.log("push all", expo8);
        } else if (value.length === 125 && value[0].mID !== 0) {
          setexpo8([]);
          console.log("rmove all", expo8);
        } else {
          setexpo8(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost.CommonClauses = [
        ...expo8,
      ];
    } else if (type === "Marine Specific Voyage Export FOB" && type1 === "Registered POST") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo9(ImportPostc);
          console.log("push all", expo9);
        } else {
          const tarr = [...value];
          tarr.shift();
          setexpo9(tarr);
          console.log("rmove all", expo9);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 125) {
            setexpo9(ImportPostc);
          } else {
            setexpo9(value);
          }
          console.log("push all", expo9);
        } else if (value.length === 125 && value[0].mID !== 0) {
          setexpo9([]);
          console.log("rmove all", expo9);
        } else {
          setexpo9(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost.CommonClauses = [
        ...expo9,
      ];
    } else if (type === "Marine Specific Voyage Inland" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo13(ImportPostc);
          console.log("push all", expo13);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo13(tarr);
          console.log("rmove all", expo13);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo13(ImportPostc);
          } else {
            setexpo13(uniq);
          }
          console.log("push all", expo13);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo13([]);
          console.log("rmove all", expo13);
        } else {
          setexpo13(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].Courier.CommonClauses = [...expo13];
    } else if (type === "Marine Specific Voyage Inland" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo14(ImportPostc);
          console.log("push all", expo14);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo14(tarr);
          console.log("rmove all", expo14);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo14(ImportPostc);
          } else {
            setexpo14(uniq);
          }
          console.log("push all", expo14);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo14([]);
          console.log("rmove all", expo14);
        } else {
          setexpo14(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].ParcelPost.CommonClauses = [...expo14];
    } else if (type === "Marine Specific Voyage Inland" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo15(ImportPostc);
          console.log("push all", expo15);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo15(tarr);
          console.log("rmove all", expo15);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo15(ImportPostc);
          } else {
            setexpo15(uniq);
          }
          console.log("push all", expo15);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo15([]);
          console.log("rmove all", expo15);
        } else {
          setexpo15(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].RegisteredPost.CommonClauses = [
        ...expo15,
      ];
    } else if (type === "Marine Specifc Voyage Duty" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo10(ImportPostc);
          console.log("push all", expo10);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo10(tarr);
          console.log("rmove all", expo10);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo10(ImportPostc);
          } else {
            setexpo10(uniq);
          }
          console.log("push all", expo10);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo10([]);
          console.log("rmove all", expo10);
        } else {
          setexpo10(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].Courier.CommonClauses = [...expo10];
    } else if (type === "Marine Specifc Voyage Duty" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo11(ImportPostc);
          console.log("push all", expo11);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo11(tarr);
          console.log("rmove all", expo11);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo11(ImportPostc);
          } else {
            setexpo11(uniq);
          }
          console.log("push all", expo11);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo11([]);
          console.log("rmove all", expo11);
        } else {
          setexpo11(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.CommonClauses = [...expo11];
    } else if (type === "Marine Specifc Voyage Duty" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setexpo12(ImportPostc);
          console.log("push all", expo12);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setexpo12(tarr);
          console.log("rmove all", expo12);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setexpo12(ImportPostc);
          } else {
            setexpo12(uniq);
          }
          console.log("push all", expo12);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setexpo12([]);
          console.log("rmove all", expo12);
        } else {
          setexpo12(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost.CommonClauses = [
        ...expo12,
      ];
    }

    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handlecheckedExpoImpoInlandPostCourier1 = (row11, row12) => {
    console.log(row11, row12);

    if (row11 === "Marine Specific Voyage Import" && row12 === "Courier") {
      return impo1;
    }
    if (row11 === "Marine Specific Voyage Import" && row12 === "Parcel Post") {
      return impo2;
    }
    if (row11 === "Marine Specific Voyage Import" && row12 === "Registered POST") {
      return impo3;
    }
    if (row11 === "Marine Specific Voyage Export" && row12 === "Courier") {
      return impo4;
    }
    if (row11 === "Marine Specific Voyage Export" && row12 === "Parcel Post") {
      return impo5;
    }
    if (row11 === "Marine Specific Voyage Export" && row12 === "Registered POST") {
      return impo6;
    }

    if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Courier") {
      return impo7;
    }
    if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Parcel Post") {
      return impo8;
    }
    if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Registered POST") {
      return impo9;
    }

    if (row11 === "Marine Specific Voyage Inland" && row12 === "Courier") {
      return impo13;
    }
    if (row11 === "Marine Specific Voyage Inland" && row12 === "Parcel Post") {
      return impo14;
    }
    if (row11 === "Marine Specific Voyage Inland" && row12 === "Registered POST") {
      return impo15;
    }

    if (row11 === "Marine Specifc Voyage Duty" && row12 === "Courier") {
      return impo10;
    }
    if (row11 === "Marine Specifc Voyage Duty" && row12 === "Parcel Post") {
      return impo11;
    }
    if (row11 === "Marine Specifc Voyage Duty" && row12 === "Registered POST") {
      return impo12;
    }

    return null;
  };

  const ExpoImpoInlandPostCourier1 = (e, type, value, type1) => {
    if (type === "Marine Specific Voyage Import" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo1(InlandAirt);
          console.log("push all", impo1);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo1(tarr);
          console.log("rmove all", impo1);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo1(InlandAirt);
          } else {
            setimpo1(uniq);
          }
          console.log("push all", impo1);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo1([]);
          console.log("rmove all", impo1);
        } else {
          setimpo1(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].Courier.InlandTransitClauses = [
        ...impo1,
      ];
    } else if (type === "Marine Specific Voyage Import" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo2(InlandAirt);
          console.log("push all", impo2);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo2(tarr);
          console.log("rmove all", impo2);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo2(InlandAirt);
          } else {
            setimpo2(uniq);
          }
          console.log("push all", impo2);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo2([]);
          console.log("rmove all", impo2);
        } else {
          setimpo2(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].ParcelPost.InlandTransitClauses = [
        ...impo2,
      ];
    } else if (type === "Marine Specific Voyage Import" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo3(InlandAirt);
          console.log("push all", impo3);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo3(tarr);
          console.log("rmove all", impo3);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo3(InlandAirt);
          } else {
            setimpo3(uniq);
          }
          console.log("push all", impo3);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo3([]);
          console.log("rmove all", impo3);
        } else {
          setimpo3(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].RegisteredPost.InlandTransitClauses = [
        ...impo3,
      ];
    } else if (type === "Marine Specific Voyage Export" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo4(InlandAirt);
          console.log("push all", impo4);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo4(tarr);
          console.log("rmove all", impo4);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo4(InlandAirt);
          } else {
            setimpo4(uniq);
          }
          console.log("push all", impo4);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo4([]);
          console.log("rmove all", impo4);
        } else {
          setimpo4(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].Courier.InlandTransitClauses = [
        ...impo4,
      ];
    } else if (type === "Marine Specific Voyage Export" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo5(InlandAirt);
          console.log("push all", impo5);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo5(tarr);
          console.log("rmove all", impo5);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo5(InlandAirt);
          } else {
            setimpo5(uniq);
          }
          console.log("push all", impo5);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo5([]);
          console.log("rmove all", impo5);
        } else {
          setimpo5(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].ParcelPost.InlandTransitClauses = [
        ...impo5,
      ];
    } else if (type === "Marine Specific Voyage Export" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo6(InlandAirt);
          console.log("push all", impo6);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo6(tarr);
          console.log("rmove all", impo6);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo6(InlandAirt);
          } else {
            setimpo6(uniq);
          }
          console.log("push all", impo6);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo6([]);
          console.log("rmove all", impo6);
        } else {
          setimpo6(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].RegisteredPost.InlandTransitClauses = [
        ...impo6,
      ];
    } else if (type === "Marine Specific Voyage Export FOB" && type1 === "Courier") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo7(InlandAirt);
          console.log("push all", impo7);
        } else {
          const tarr = [...value];
          tarr.shift();
          setimpo7(tarr);
          console.log("rmove all", impo7);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 126) {
            setimpo7(InlandAirt);
          } else {
            setimpo7(value);
          }
          console.log("push all", impo7);
        } else if (value.length === 126 && value[0].mID !== 0) {
          setimpo7([]);
          console.log("rmove all", impo7);
        } else {
          setimpo7(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].Courier.InlandTransitClauses = [
        ...impo7,
      ];
    } else if (type === "Marine Specific Voyage Export FOB" && type1 === "Parcel Post") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo8(InlandAirt);
          console.log("push all", impo8);
        } else {
          const tarr = [...value];
          tarr.shift();
          setimpo8(tarr);
          console.log("rmove all", impo8);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 126) {
            setimpo8(InlandAirt);
          } else {
            setimpo8(value);
          }
          console.log("push all", impo8);
        } else if (value.length === 126 && value[0].mID !== 0) {
          setimpo8([]);
          console.log("rmove all", impo8);
        } else {
          setimpo8(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost.InlandTransitClauses = [
        ...impo8,
      ];
    } else if (type === "Marine Specific Voyage Export FOB" && type1 === "Registered POST") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo9(InlandAirt);
          console.log("push all", impo9);
        } else {
          const tarr = [...value];
          tarr.shift();
          setimpo9(tarr);
          console.log("rmove all", impo9);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 126) {
            setimpo9(InlandAirt);
          } else {
            setimpo9(value);
          }
          console.log("push all", impo9);
        } else if (value.length === 126 && value[0].mID !== 0) {
          setimpo9([]);
          console.log("rmove all", impo9);
        } else {
          setimpo9(value);
        }
      }
      LPolicyDto.clauses[0][
        "Marine Specific Voyage Export FOB"
      ].RegisteredPost.InlandTransitClauses = [...impo9];
    } else if (type === "Marine Specific Voyage Inland" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo13(InlandAirt);
          console.log("push all", impo13);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo13(tarr);
          console.log("rmove all", impo13);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo13(InlandAirt);
          } else {
            setimpo13(uniq);
          }
          console.log("push all", impo13);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo13([]);
          console.log("rmove all", impo13);
        } else {
          setimpo13(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].Courier.InlandTransitClauses = [
        ...impo13,
      ];
    } else if (type === "Marine Specific Voyage Inland" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo14(InlandAirt);
          console.log("push all", impo14);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo14(tarr);
          console.log("rmove all", impo14);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo14(InlandAirt);
          } else {
            setimpo14(uniq);
          }
          console.log("push all", impo14);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo14([]);
          console.log("rmove all", impo14);
        } else {
          setimpo14(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].ParcelPost.InlandTransitClauses = [
        ...impo14,
      ];
    } else if (type === "Marine Specific Voyage Inland" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo15(InlandAirt);
          console.log("push all", impo15);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo15(tarr);
          console.log("rmove all", impo15);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo15(InlandAirt);
          } else {
            setimpo15(uniq);
          }
          console.log("push all", impo15);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo15([]);
          console.log("rmove all", impo15);
        } else {
          setimpo15(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].RegisteredPost.InlandTransitClauses = [
        ...impo15,
      ];
    } else if (type === "Marine Specifc Voyage Duty" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo10(InlandAirt);
          console.log("push all", impo10);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo10(tarr);
          console.log("rmove all", impo10);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo10(InlandAirt);
          } else {
            setimpo10(uniq);
          }
          console.log("push all", impo10);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo10([]);
          console.log("rmove all", impo10);
        } else {
          setimpo10(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].Courier.InlandTransitClauses = [
        ...impo10,
      ];
    } else if (type === "Marine Specifc Voyage Duty" && type1 === "Parcel Post") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo11(InlandAirt);
          console.log("push all", impo11);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo11(tarr);
          console.log("rmove all", impo11);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo11(InlandAirt);
          } else {
            setimpo11(uniq);
          }
          console.log("push all", impo11);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo11([]);
          console.log("rmove all", impo11);
        } else {
          setimpo11(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.InlandTransitClauses = [
        ...impo11,
      ];
    } else if (type === "Marine Specifc Voyage Duty" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setimpo12(InlandAirt);
          console.log("push all", impo12);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setimpo12(tarr);
          console.log("rmove all", impo12);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setimpo12(InlandAirt);
          } else {
            setimpo12(uniq);
          }
          console.log("push all", impo12);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setimpo12([]);
          console.log("rmove all", impo12);
        } else {
          setimpo12(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost.InlandTransitClauses = [
        ...impo12,
      ];
    }

    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const ExpoImpoInlandPostCourier2 = (e, type, value, type1) => {
    if (type === "Marine Specific Voyage Import" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo1(ImportPost);
          console.log("push all", inpo1);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo1(tarr);
          console.log("rmove all", inpo1);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo1(ImportPost);
          } else {
            setinpo1(uniq);
          }
          console.log("push all", inpo1);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo1([]);
          console.log("rmove all", inpo1);
        } else {
          setinpo1(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].Courier.NonInstituteClauses = [
        ...inpo1,
      ];
    } else if (type === "Marine Specific Voyage Import" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo2(ImportPost);
          console.log("push all", inpo2);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo2(tarr);
          console.log("rmove all", inpo2);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo2(ImportPost);
          } else {
            setinpo2(uniq);
          }
          console.log("push all", inpo2);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo2([]);
          console.log("rmove all", inpo2);
        } else {
          setinpo2(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].ParcelPost.NonInstituteClauses = [
        ...inpo2,
      ];
    } else if (type === "Marine Specific Voyage Import" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo3(ImportPost);
          console.log("push all", inpo3);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo3(tarr);
          console.log("rmove all", inpo3);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo3(ImportPost);
          } else {
            setinpo3(uniq);
          }
          console.log("push all", inpo3);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo3([]);
          console.log("rmove all", inpo3);
        } else {
          setinpo3(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].RegisteredPost.NonInstituteClauses = [
        ...inpo3,
      ];
    } else if (type === "Marine Specific Voyage Export" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo4(ImportPost);
          console.log("push all", inpo4);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo4(tarr);
          console.log("rmove all", inpo4);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo4(ImportPost);
          } else {
            setinpo4(uniq);
          }
          console.log("push all", inpo4);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo4([]);
          console.log("rmove all", inpo4);
        } else {
          setinpo4(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].Courier.NonInstituteClauses = [
        ...inpo4,
      ];
    } else if (type === "Marine Specific Voyage Export" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo5(ImportPost);
          console.log("push all", inpo5);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo5(tarr);
          console.log("rmove all", inpo5);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo5(ImportPost);
          } else {
            setinpo5(uniq);
          }
          console.log("push all", inpo5);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo5([]);
          console.log("rmove all", inpo5);
        } else {
          setinpo5(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].ParcelPost.NonInstituteClauses = [
        ...inpo5,
      ];
    } else if (type === "Marine Specific Voyage Export" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo6(ImportPost);
          console.log("push all", inpo6);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo6(tarr);
          console.log("rmove all", inpo6);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo6(ImportPost);
          } else {
            setinpo6(uniq);
          }
          console.log("push all", inpo6);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo6([]);
          console.log("rmove all", inpo6);
        } else {
          setinpo6(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].RegisteredPost.NonInstituteClauses = [
        ...inpo6,
      ];
    } else if (type === "Marine Specific Voyage Export FOB" && type1 === "Courier") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo7(ImportPost);
          console.log("push all", inpo7);
        } else {
          const tarr = [...value];
          tarr.shift();
          setinpo7(tarr);
          console.log("rmove all", inpo7);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 125) {
            setinpo7(ImportPost);
          } else {
            setinpo7(value);
          }
          console.log("push all", inpo7);
        } else if (value.length === 125 && value[0].mID !== 0) {
          setinpo7([]);
          console.log("rmove all", inpo7);
        } else {
          setinpo7(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].Courier.NonInstituteClauses = [
        ...inpo7,
      ];
    } else if (type === "Marine Specific Voyage Export FOB" && type1 === "Parcel Post") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo8(ImportPost);
          console.log("push all", inpo8);
        } else {
          const tarr = [...value];
          tarr.shift();
          setinpo8(tarr);
          console.log("rmove all", inpo8);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 125) {
            setinpo8(ImportPost);
          } else {
            setinpo8(value);
          }
          console.log("push all", inpo8);
        } else if (value.length === 125 && value[0].mID !== 0) {
          setinpo8([]);
          console.log("rmove all", inpo8);
        } else {
          setinpo8(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost.NonInstituteClauses = [
        ...inpo8,
      ];
    } else if (type === "Marine Specific Voyage Export FOB" && type1 === "Registered POST") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo9(ImportPost);
          console.log("push all", inpo9);
        } else {
          const tarr = [...value];
          tarr.shift();
          setinpo9(tarr);
          console.log("rmove all", inpo9);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 125) {
            setinpo9(ImportPost);
          } else {
            setinpo9(value);
          }
          console.log("push all", inpo9);
        } else if (value.length === 125 && value[0].mID !== 0) {
          setinpo9([]);
          console.log("rmove all", inpo9);
        } else {
          setinpo9(value);
        }
      }
      LPolicyDto.clauses[0][
        "Marine Specific Voyage Export FOB"
      ].RegisteredPost.NonInstituteClauses = [...inpo9];
    } else if (type === "Marine Specific Voyage Inland" && type1 === "Courier") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo13(ImportPost);
          console.log("push all", inpo13);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo13(tarr);
          console.log("rmove all", inpo13);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo13(ImportPost);
          } else {
            setinpo13(uniq);
          }
          console.log("push all", inpo13);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo13([]);
          console.log("rmove all", inpo13);
        } else {
          setinpo13(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].Courier.NonInstituteClauses = [
        ...inpo13,
      ];
    } else if (type === "Marine Specific Voyage Inland" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo14(ImportPost);
          console.log("push all", inpo14);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo14(tarr);
          console.log("rmove all", inpo14);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo14(ImportPost);
          } else {
            setinpo14(uniq);
          }
          console.log("push all", inpo14);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo14([]);
          console.log("rmove all", inpo14);
        } else {
          setinpo14(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].ParcelPost.NonInstituteClauses = [
        ...inpo14,
      ];
    } else if (type === "Marine Specific Voyage Inland" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo15(ImportPost);
          console.log("push all", inpo15);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo15(tarr);
          console.log("rmove all", inpo15);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo15(ImportPost);
          } else {
            setinpo15(uniq);
          }
          console.log("push all", inpo15);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo15([]);
          console.log("rmove all", inpo15);
        } else {
          setinpo15(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].RegisteredPost.NonInstituteClauses = [
        ...inpo15,
      ];
    } else if (type === "Marine Specifc Voyage Duty" && type1 === "Courier") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo10(ImportPost);
          console.log("push all", inpo10);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo10(tarr);
          console.log("rmove all", inpo10);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo10(ImportPost);
          } else {
            setinpo10(uniq);
          }
          console.log("push all", inpo10);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo10([]);
          console.log("rmove all", inpo10);
        } else {
          setinpo10(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].Courier.NonInstituteClauses = [...inpo10];
    } else if (type === "Marine Specifc Voyage Duty" && type1 === "Parcel Post") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo11(ImportPost);
          console.log("push all", inpo11);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo11(tarr);
          console.log("rmove all", inpo11);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo11(ImportPost);
          } else {
            setinpo11(uniq);
          }
          console.log("push all", inpo11);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo11([]);
          console.log("rmove all", inpo11);
        } else {
          setinpo11(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.NonInstituteClauses = [
        ...inpo11,
      ];
    } else if (type === "Marine Specifc Voyage Duty" && type1 === "Registered POST") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setinpo12(ImportPost);
          console.log("push all", inpo12);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setinpo12(tarr);
          console.log("rmove all", inpo12);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 125) {
            setinpo12(ImportPost);
          } else {
            setinpo12(uniq);
          }
          console.log("push all", inpo12);
        } else if (uniq.length === 125 && uniq[0].mID !== 0) {
          setinpo12([]);
          console.log("rmove all", inpo12);
        } else {
          setinpo12(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost.NonInstituteClauses = [
        ...inpo12,
      ];
    }

    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handlecheckedExpoImpoInlandPostCourier2 = (row11, row12) => {
    console.log(row11, row12);

    if (row11 === "Marine Specific Voyage Import" && row12 === "Courier") {
      return inpo1;
    }
    if (row11 === "Marine Specific Voyage Import" && row12 === "Parcel Post") {
      return inpo2;
    }
    if (row11 === "Marine Specific Voyage Import" && row12 === "Registered POST") {
      return inpo3;
    }
    if (row11 === "Marine Specific Voyage Export" && row12 === "Courier") {
      return inpo4;
    }
    if (row11 === "Marine Specific Voyage Export" && row12 === "Parcel Post") {
      return inpo5;
    }
    if (row11 === "Marine Specific Voyage Export" && row12 === "Registered POST") {
      return inpo6;
    }

    if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Courier") {
      return inpo7;
    }
    if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Parcel Post") {
      return inpo8;
    }
    if (row11 === "Marine Specific Voyage Export FOB" && row12 === "Registered POST") {
      return inpo9;
    }

    if (row11 === "Marine Specific Voyage Inland" && row12 === "Courier") {
      return inpo13;
    }
    if (row11 === "Marine Specific Voyage Inland" && row12 === "Parcel Post") {
      return inpo14;
    }
    if (row11 === "Marine Specific Voyage Inland" && row12 === "Registered POST") {
      return inpo15;
    }

    if (row11 === "Marine Specifc Voyage Duty" && row12 === "Courier") {
      return inpo10;
    }
    if (row11 === "Marine Specifc Voyage Duty" && row12 === "Parcel Post") {
      return inpo11;
    }
    if (row11 === "Marine Specifc Voyage Duty" && row12 === "Registered POST") {
      return inpo12;
    }

    return null;
  };

  const handleselectallinlandair2 = (e, type, value) => {
    if (type === "Marine Specific Voyage Inland") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair9(InlandSeac);
          console.log("push all", allair9);
        } else {
          const tarr = [...value];
          tarr.shift();
          setallair9(tarr);
          console.log("rmove all", allair9);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 128) {
            setallair9(InlandSeac);
          } else {
            setallair9(value);
          }
          console.log("push all", allair9);
        } else if (value.length === 128 && value[0].mID !== 0) {
          setallair9([]);
          console.log("rmove all", allair9);
        } else {
          setallair9(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].sea.CommonClauses = [...allair9];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };
  const handleselectallinlandair5 = (e, type, value) => {
    if (type === "Marine Specific Voyage Inland") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair28(InlandAirt);
          console.log("push all", allair28);
        } else {
          const tarr = [...value];
          tarr.shift();
          setallair28(tarr);
          console.log("rmove all", allair28);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 126) {
            setallair28(InlandAirt);
          } else {
            setallair28(value);
          }
          console.log("push all", allair28);
        } else if (value.length === 126 && value[0].mID !== 0) {
          setallair28([]);
          console.log("rmove all", allair28);
        } else {
          setallair28(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].sea.InlandTransitClauses = [
        ...allair28,
      ];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handleselectallinlandair3 = (e, type, value) => {
    if (type === "Marine Specific Voyage Inland") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair10(InlandSea);
          console.log("push all", allair10);
        } else {
          const tarr = [...value];
          tarr.shift();
          setallair10(tarr);
          console.log("rmove all", allair10);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 128) {
            setallair10(InlandSea);
          } else {
            setallair10(value);
          }
          console.log("push all", allair10);
        } else if (value.length === 128 && value[0].mID !== 0) {
          setallair10([]);
          console.log("rmove all", allair10);
        } else {
          setallair10(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].sea.NonInstituteClauses = [
        ...allair10,
      ];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handlecheckedinlandair2 = (row11) => {
    console.log(row11);

    if (row11 === "Marine Specific Voyage Inland") {
      return allair9;
    }

    return null;
  };
  const handlecheckedinlandair5 = (row11) => {
    console.log(row11);

    if (row11 === "Marine Specific Voyage Inland") {
      return allair28;
    }
    return null;
  };

  const handlecheckedinlandair3 = (row11) => {
    console.log(row11);

    if (row11 === "Marine Specific Voyage Inland") {
      return allair10;
    }

    return null;
  };

  const handlecheckedinlandair = (row11) => {
    console.log(row11);

    if (row11 === "Marine Specific Voyage Inland") {
      return allair7;
    }

    return null;
  };

  const handleselectallinlandair1 = (e, type, value) => {
    if (type === "Marine Specific Voyage Import") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair16(ImportRail);
          console.log("push all", allair16);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair16(tarr);
          console.log("rmove all", allair16);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair16(ImportRail);
          } else {
            setallair16(uniq);
          }
          console.log("push all", allair16);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair16([]);
          console.log("rmove all", allair16);
        } else {
          setallair16(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir.NonInstituteClauses =
        [...allair16];
    } else if (type === "Marine Specific Voyage Export") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair18(ImportRail);
          console.log("push all", allair18);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair18(tarr);
          console.log("rmove all", allair18);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair18(ImportRail);
          } else {
            setallair18(uniq);
          }
          console.log("push all", allair18);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair18([]);
          console.log("rmove all", allair18);
        } else {
          setallair18(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir.NonInstituteClauses =
        [...allair18];
    } else if (type === "Marine Specific Voyage Export FOB") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair20(ImportRail);
          console.log("push all", allair20);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair20(tarr);
          console.log("rmove all", allair20);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair20(ImportRail);
          } else {
            setallair20(uniq);
          }
          console.log("push all", allair20);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair20([]);
          console.log("rmove all", allair20);
        } else {
          setallair20(uniq);
        }
      }
      LPolicyDto.clauses[0][
        "Marine Specific Voyage Export FOB"
      ].InlandRailRoadAir.NonInstituteClauses = [...allair20];
    } else if (type === "Marine Specific Voyage Inland") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair8(ImportRail);
          console.log("push all", allair8);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair8(tarr);
          console.log("rmove all", allair8);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair8(ImportRail);
          } else {
            setallair8(uniq);
          }
          console.log("push all", allair8);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair8([]);
          console.log("rmove all", allair8);
        } else {
          setallair8(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir.NonInstituteClauses =
        [...allair8];
    } else if (type === "Marine Specifc Voyage Duty") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair22(ImportRail);
          console.log("push all", allair22);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair22(tarr);
          console.log("rmove all", allair22);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair22(ImportRail);
          } else {
            setallair22(uniq);
          }
          console.log("push all", allair22);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair22([]);
          console.log("rmove all", allair22);
        } else {
          setallair22(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir.NonInstituteClauses = [
        ...allair22,
      ];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handleselectallinlandair4 = (e, type, value) => {
    if (type === "Marine Specific Voyage Import") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }
      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair23(InlandAirt);
          console.log("push all", allair23);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair23(tarr);
          console.log("rmove all", allair23);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair23(InlandAirt);
          } else {
            setallair23(uniq);
          }
          console.log("push all", allair23);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair23([]);
          console.log("rmove all", allair23);
        } else {
          setallair23(uniq);
        }
      }
      LPolicyDto.clauses[0][
        "Marine Specific Voyage Import"
      ].InlandRailRoadAir.InlandTransitClauses = [...allair23];
    } else if (type === "Marine Specific Voyage Export") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair24(InlandAirt);
          console.log("push all", allair24);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair24(tarr);
          console.log("rmove all", allair24);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair24(InlandAirt);
          } else {
            setallair24(uniq);
          }
          console.log("push all", allair24);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair24([]);
          console.log("rmove all", allair24);
        } else {
          setallair24(uniq);
        }
      }
      LPolicyDto.clauses[0][
        "Marine Specific Voyage Export"
      ].InlandRailRoadAir.InlandTransitClauses = [...allair24];
    } else if (type === "Marine Specific Voyage Export FOB") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair25(InlandAirt);
          console.log("push all", allair25);
        } else {
          const tarr = [...value];
          tarr.shift();
          setallair25(tarr);
          console.log("rmove all", allair25);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 126) {
            setallair25(InlandAirt);
          } else {
            setallair25(value);
          }
          console.log("push all", allair25);
        } else if (value.length === 126 && value[0].mID !== 0) {
          setallair25([]);
          console.log("rmove all", allair25);
        } else {
          setallair25(value);
        }
      }
      LPolicyDto.clauses[0][
        "Marine Specific Voyage Export FOB"
      ].InlandRailRoadAir.InlandTransitClauses = [...allair25];
    } else if (type === "Marine Specific Voyage Inland") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair26(InlandAirt);
          console.log("push all", allair26);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair26(tarr);
          console.log("rmove all", allair26);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair26(InlandAirt);
          } else {
            setallair26(uniq);
          }
          console.log("push all", allair26);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair26([]);
          console.log("rmove all", allair26);
        } else {
          setallair26(uniq);
        }
      }
      LPolicyDto.clauses[0][
        "Marine Specific Voyage Inland"
      ].InlandRailRoadAir.InlandTransitClauses = [...allair26];
    } else if (type === "Marine Specifc Voyage Duty") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair27(InlandAirt);
          console.log("push all", allair27);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair27(tarr);
          console.log("rmove all", allair27);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 126) {
            setallair27(InlandAirt);
          } else {
            setallair27(uniq);
          }
          console.log("push all", allair27);
        } else if (uniq.length === 126 && uniq[0].mID !== 0) {
          setallair27([]);
          console.log("rmove all", allair27);
        } else {
          setallair27(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir.InlandTransitClauses = [
        ...allair27,
      ];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handlecheckedinlandair1 = (row11) => {
    console.log(row11);

    if (row11 === "Marine Specific Voyage Import") {
      return allair16;
    }
    if (row11 === "Marine Specific Voyage Export") {
      return allair18;
    }
    if (row11 === "Marine Specific Voyage Export FOB") {
      return allair20;
    }
    if (row11 === "Marine Specific Voyage Inland") {
      return allair8;
    }
    if (row11 === "Marine Specifc Voyage Duty") {
      return allair22;
    }

    return null;
  };

  const handlecheckedair = (row11) => {
    console.log(row11);
    if (row11 === "Marine Specific Voyage Import") {
      console.log(allair, "msviallair");
      return allair;
    }
    if (row11 === "Marine Specific Voyage Export") {
      console.log(allair2, "msviallair");
      return allair2;
    }
    // if (row11 === "Marine Specific Voyage Export FOB") {
    //   return allair2;
    // }
    if (row11 === "Marine Specifc Voyage Duty") {
      return allair12;
    }
    return null;
  };
  const handlecheckedinst = (row11) => {
    console.log(row11);
    if (row11 === "Marine Specific Voyage Import") {
      console.log(allair, "msviallair");
      return inst1;
    }
    if (row11 === "Marine Specific Voyage Export") {
      return inst2;
    }

    if (row11 === "Marine Specifc Voyage Duty") {
      return inst3;
    }
    return null;
  };
  const handlecheckedinst1 = (row11) => {
    console.log(row11);
    if (row11 === "Marine Specific Voyage Import") {
      console.log(allair, "msviallair");
      return inst4;
    }
    if (row11 === "Marine Specific Voyage Export") {
      return inst5;
    }

    if (row11 === "Marine Specifc Voyage Duty") {
      return inst6;
    }
    return null;
  };

  const handleselectallair1 = (e, type, value) => {
    console.log(e, "reason");
    console.log(value, "reason");
    console.log(type, "reason");
    console.log(e.target.checked, "reason");
    if (type === "Marine Specific Voyage Import") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair3(ImportAir);
          console.log("push all", allair3);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair3(tarr);
          console.log("rmove all", allair3);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 127) {
            setallair3(ImportAir);
          } else {
            setallair3(uniq);
          }
          console.log("push all", allair3);
        } else if (uniq.length === 127 && uniq[0].mID !== 0) {
          setallair3([]);
          console.log("rmove all", allair3);
        } else {
          setallair3(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].air.NonInstituteClauses = [...allair3];
    } else if (type === "Marine Specific Voyage Export") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair4(ImportAir);
          console.log("push all", allair4);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair4(tarr);
          console.log("rmove all", allair4);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 127) {
            setallair4(ImportAir);
          } else {
            setallair4(uniq);
          }
          console.log("push all", allair4);
        } else if (uniq.length === 127 && uniq[0].mID !== 0) {
          setallair4([]);
          console.log("rmove all", allair4);
        } else {
          setallair4(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].air.NonInstituteClauses = [...allair4];
    } else if (type === "Marine Specific Voyage Export FOB") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair5(ImportAir);
          console.log("push all", allair5);
        } else {
          const tarr = [...value];
          tarr.shift();
          setallair5(tarr);
          console.log("rmove all", allair5);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 127) {
            setallair5(ImportAir);
          } else {
            setallair5(value);
          }
          console.log("push all", allair5);
        } else if (value.length === 127 && value[0].mID !== 0) {
          setallair5([]);
          console.log("rmove all", allair5);
        } else {
          setallair5(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].air.NonInstituteClauses = [
        ...allair5,
      ];
    } else if (type === "Marine Specifc Voyage Duty") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallair13(ImportAir);
          console.log("push all", allair13);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallair13(tarr);
          console.log("rmove all", allair13);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 127) {
            setallair13(ImportAir);
          } else {
            setallair13(uniq);
          }
          console.log("push all", allair13);
        } else if (uniq.length === 127 && uniq[0].mID !== 0) {
          setallair13([]);
          console.log("rmove all", allair13);
        } else {
          setallair13(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].air.NonInstituteClauses = [...allair13];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handlecheckedair1 = (row11) => {
    console.log(row11);

    if (row11 === "Marine Specific Voyage Import") {
      return allair3;
    }
    if (row11 === "Marine Specific Voyage Export") {
      return allair4;
    }
    if (row11 === "Marine Specific Voyage Export FOB") {
      return allair5;
    }
    if (row11 === "Marine Specifc Voyage Duty") {
      return allair13;
    }
    return null;
  };

  const handleselectallsea = (e, type, value) => {
    if (type === "Marine Specific Voyage Import") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallsea(ImportSeac);
          console.log("push all", allsea);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallsea(tarr);
          console.log("rmove all", allsea);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 128) {
            setallsea(ImportSeac);
          } else {
            setallsea(uniq);
          }
          console.log("push all", allsea);
        } else if (uniq.length === 128 && uniq[0].mID !== 0) {
          setallsea([]);
          console.log("rmove all", allsea);
        } else {
          setallsea(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].sea.CommonClauses = [...allsea];
    } else if (type === "Marine Specific Voyage Export") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallsea1(ImportSeac);
          console.log("push all", allsea1);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallsea1(tarr);
          console.log("rmove all", allsea1);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 128) {
            setallsea1(ImportSeac);
          } else {
            setallsea1(uniq);
          }
          console.log("push all", allsea1);
        } else if (uniq.length === 128 && uniq[0].mID !== 0) {
          setallsea1([]);
          console.log("rmove all", allsea1);
        } else {
          setallsea1(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].sea.CommonClauses = [...allsea1];
    } else if (type === "Marine Specific Voyage Export FOB") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallsea2(ImportSeac);
          console.log("push all", allsea2);
        } else {
          const tarr = [...value];
          tarr.shift();
          setallsea2(tarr);
          console.log("rmove all", allsea2);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 128) {
            setallsea2(ImportSeac);
          } else {
            setallsea2(value);
          }
          console.log("push all", allsea2);
        } else if (value.length === 128 && value[0].mID !== 0) {
          setallsea2([]);
          console.log("rmove all", allsea2);
        } else {
          setallsea2(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].sea.CommonClauses = [...allsea2];
    } else if (type === "Marine Specifc Voyage Duty") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallsea6(ImportSeac);
          console.log("push all", allsea6);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallsea6(tarr);
          console.log("rmove all", allsea6);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 128) {
            setallsea6(ImportSeac);
          } else {
            setallsea6(uniq);
          }
          console.log("push all", allsea6);
        } else if (uniq.length === 128 && uniq[0].mID !== 0) {
          setallsea6([]);
          console.log("rmove all", allsea6);
        } else {
          setallsea6(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].sea.CommonClauses = [...allsea6];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handlecheckedsea = (row11) => {
    console.log(row11);

    if (row11 === "Marine Specific Voyage Import") {
      return allsea;
    }
    if (row11 === "Marine Specific Voyage Export") {
      return allsea1;
    }
    if (row11 === "Marine Specific Voyage Export FOB") {
      return allsea2;
    }
    if (row11 === "Marine Specifc Voyage Duty") {
      return allsea6;
    }

    return null;
  };

  const handleselectallsea1 = (e, type, value) => {
    if (type === "Marine Specific Voyage Import") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallsea3(ImportSea);
          console.log("push all", allsea3);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallsea3(tarr);
          console.log("rmove all", allsea3);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 128) {
            setallsea3(ImportSea);
          } else {
            setallsea3(uniq);
          }
          console.log("push all", allsea3);
        } else if (uniq.length === 128 && uniq[0].mID !== 0) {
          setallsea3([]);
          console.log("rmove all", allsea3);
        } else {
          setallsea3(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Import"].sea.NonInstituteClauses = [...allsea3];
    } else if (type === "Marine Specific Voyage Export") {
      let iairflag = false;
      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallsea4(ImportSea);
          console.log("push all", allsea4);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallsea4(tarr);
          console.log("rmove all", allsea4);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 128) {
            setallsea4(ImportSea);
          } else {
            setallsea4(uniq);
          }
          console.log("push all", allsea4);
        } else if (uniq.length === 128 && uniq[0].mID !== 0) {
          setallsea4([]);
          console.log("rmove all", allsea4);
        } else {
          setallsea4(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export"].sea.NonInstituteClauses = [...allsea4];
    } else if (type === "Marine Specific Voyage Export FOB") {
      let iairflag = false;
      value.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallsea15(ImportSea);
          console.log("push all", allsea15);
        } else {
          const tarr = [...value];
          tarr.shift();
          setallsea15(tarr);
          console.log("rmove all", allsea15);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (value.length === 128) {
            setallsea15(ImportSea);
          } else {
            setallsea15(value);
          }
          console.log("push all", allsea15);
        } else if (value.length === 128 && value[0].mID !== 0) {
          setallsea15([]);
          console.log("rmove all", allsea15);
        } else {
          setallsea15(value);
        }
      }
      LPolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].sea.NonInstituteClauses = [
        ...allsea15,
      ];
    } else if (type === "Marine Specifc Voyage Duty") {
      let iairflag = false;

      const strArr = value.map((obj) => JSON.stringify(obj));
      const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
      console.log(uniq, "reasonuniq");
      if (uniq.length !== value.length) {
        uniq.map((col) => {
          if (col.mValue === value[value.length - 1].mValue) {
            const index = uniq.indexOf(col);
            uniq.splice(index, 1);
            console.log(uniq, index, "reasontarr");
            console.log(uniq, index, value[value.length - 1], "reasontarr");
          }
          return null;
        });
      }

      uniq.map((col) => {
        if (col.mValue === "Select All") {
          console.log("reasoncargo", col.mValue);
          iairflag = true;
        }
        return null;
      });
      console.log(iairflag, "reasoncargo");
      if (iairflag === true) {
        if (e.target.checked === true) {
          setallsea7(ImportSea);
          console.log("push all", allsea7);
        } else {
          const tarr = [...uniq];
          tarr.shift();
          setallsea7(tarr);
          console.log("rmove all", allsea7);
        }
      } else if (iairflag === false) {
        if (e.target.checked === true) {
          if (uniq.length === 128) {
            setallsea7(ImportSea);
          } else {
            setallsea7(uniq);
          }
          console.log("push all", allsea7);
        } else if (uniq.length === 128 && uniq[0].mID !== 0) {
          setallsea7([]);
          console.log("rmove all", allsea7);
        } else {
          setallsea7(uniq);
        }
      }
      LPolicyDto.clauses[0]["Marine Specifc Voyage Duty"].sea.NonInstituteClauses = [...allsea7];
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const handlecheckedsea1 = (row11) => {
    console.log(row11);

    if (row11 === "Marine Specific Voyage Import") {
      return allsea3;
    }
    if (row11 === "Marine Specific Voyage Export") {
      return allsea4;
    }
    if (row11 === "Marine Specific Voyage Export FOB") {
      return allsea15;
    }
    if (row11 === "Marine Specifc Voyage Duty") {
      return allsea7;
    }
    return null;
  };
  // const handlecheckbox = (type, option, value) => {
  //   console.log("handlecheckbox", type, option, value);

  //   const currentIndex = checked1.indexOf(option);
  //   const newChecked = [...checked1];

  //   if (currentIndex === -1) {
  //     newChecked.push(option);
  //     // LPolicyDto.clauses[0][type].air.InstituteClauses.push(option);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //     // LPolicyDto.clauses[0][type].air.InstituteClauses.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  //   LPolicyDto.clauses[0][type].air.InstituteClauses = [...newChecked];
  //   setPolicyDto((prevState) => ({
  //     ...prevState,
  //     ...LPolicyDto,
  //   }));
  //   console.log(newChecked, PolicyDto, "handlecheckbox");
  // };

  // const handlecheckbox1 = (e, type, option, value) => {
  //   console.log("handlecheckbox", e, type, option, value);

  //   const currentIndex = checked2.indexOf(option);
  //   const newChecked = [...checked2];

  //   if (currentIndex === -1) {
  //     newChecked.push(option);
  //     LPolicyDto.clauses[0][type].sea.InstituteClauses.push(option);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //     LPolicyDto.clauses[0][type].sea.InstituteClauses.splice(currentIndex, 1);
  //   }

  //   setChecked1(newChecked);
  //   LPolicyDto.clauses[0][type].sea.InstituteClauses = [];

  //   setPolicyDto((prevState) => ({
  //     ...prevState,
  //     ...LPolicyDto,
  //   }));
  //   console.log(newChecked, "handlecheckbox");
  // };

  const handelAutoSelectair = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Import") {
      allair.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    } else if (type === "Marine Specific Voyage Export") {
      allair2.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    }
    // else if (type === "Marine Specific Voyage Export FOB") {
    //   allair2.forEach((x) => {
    //     if (x.mID === selectedvalue.mID) Autoflag = true;
    //   });
    // }
    else if (type === "Marine Specifc Voyage Duty") {
      allair12.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }
    return Autoflag;
  };
  const handelAutoSelectinst = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Import") {
      inst1.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    } else if (type === "Marine Specific Voyage Export") {
      inst2.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specifc Voyage Duty") {
      inst3.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }
    return Autoflag;
  };
  const handelAutoSelectinst1 = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Import") {
      inst4.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    } else if (type === "Marine Specific Voyage Export") {
      inst5.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specifc Voyage Duty") {
      inst6.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }
    return Autoflag;
  };

  const handelAutoSelectair1 = (selectedvalue, type) => {
    let Autoflag = false;
    if (type === "Marine Specific Voyage Import") {
      allair3.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specific Voyage Export") {
      allair4.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specific Voyage Export FOB") {
      allair5.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specifc Voyage Duty") {
      allair13.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }
    return Autoflag;
  };

  const handelAutoSelectair2 = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Inland") {
      allair7.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    }
    return Autoflag;
  };

  const handelAutoSelectair3 = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Inland") {
      inpo16.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    }
    return Autoflag;
  };
  const handelAutoSelectair4 = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Inland") {
      inpo17.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    }
    return Autoflag;
  };
  const handelAutoSelectsea2 = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Inland") {
      allair9.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    }
    return Autoflag;
  };
  const handelAutoSelectsea6 = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Inland") {
      allair10.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    }
    return Autoflag;
  };
  const handelAutoSelectsea3 = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Inland") {
      allair28.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    }
    return Autoflag;
  };

  const handelAutoSelectsea = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Import") {
      allsea.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    } else if (type === "Marine Specific Voyage Export") {
      allsea1.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specific Voyage Export FOB") {
      allsea2.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specifc Voyage Duty") {
      allsea6.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }
    return Autoflag;
  };

  const handelAutoSelectsea1 = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Import") {
      allsea3.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    } else if (type === "Marine Specific Voyage Export") {
      allsea4.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specific Voyage Export FOB") {
      allsea15.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specifc Voyage Duty") {
      allsea7.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }
    return Autoflag;
  };
  const handelAutoSelectrail = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Import") {
      allair15.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    } else if (type === "Marine Specific Voyage Export") {
      allair17.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specific Voyage Export FOB") {
      allair19.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specific Voyage Inland") {
      allair14.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specifc Voyage Duty") {
      allair21.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }
    return Autoflag;
  };
  const handelAutoSelectrail1 = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Import") {
      allair16.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    } else if (type === "Marine Specific Voyage Export") {
      allair18.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specific Voyage Export FOB") {
      allair20.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specific Voyage Inland") {
      allair8.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specifc Voyage Duty") {
      allair22.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }
    return Autoflag;
  };

  const handelAutoSelectrail2 = (selectedvalue, type) => {
    console.log("handelAutoSelectair", selectedvalue, type);
    let Autoflag = false;
    if (type === "Marine Specific Voyage Import") {
      allair23.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
      console.log("handelAutoSelectair", selectedvalue, type);
    } else if (type === "Marine Specific Voyage Export") {
      allair24.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specific Voyage Export FOB") {
      allair25.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specific Voyage Inland") {
      allair26.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "Marine Specifc Voyage Duty") {
      allair27.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }
    return Autoflag;
  };

  // const handlecheckboxAutoSelect = (selectedvalue, type) => {
  //   let Autoflag = false;
  //   if (type === "Marine Specific Voyage Import") {
  //     console.log("handelAutoSelectair", selectedvalue, type);
  //     PolicyDto.clauses[0]["Marine Specific Voyage Import"].air.InstituteClauses.forEach((x) => {
  //       if (x === selectedvalue) Autoflag = true;
  //     });
  //   } else if (type === "Marine Specific Voyage Export") {
  //     console.log("handelAutoSelectair", selectedvalue, type);
  //     PolicyDto.clauses[0]["Marine Specific Voyage Export"].air.InstituteClauses.forEach((x) => {
  //       if (x === selectedvalue) Autoflag = true;
  //     });
  //   } else if (type === "Marine Specifc Voyage Duty") {
  //     console.log("handelAutoSelectair", selectedvalue, type);
  //     PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].air.InstituteClauses.forEach((x) => {
  //       if (x === selectedvalue) Autoflag = true;
  //     });
  //   }
  //   return Autoflag;
  // };

  // const handlecheckboxAutoSelect1 = (selectedvalue, type) => {
  //   console.log("handelAutoSelectair", selectedvalue, type);
  //   let Autoflag = false;
  //   if (type === "Marine Specific Voyage Import") {
  //     PolicyDto.clauses[0]["Marine Specific Voyage Import"].sea.InstituteClauses.forEach((x) => {
  //       if (x === selectedvalue) Autoflag = true;
  //     });
  //     console.log("handelAutoSelectair", selectedvalue, type);
  //   } else if (type === "Marine Specific Voyage Export") {
  //     PolicyDto.clauses[0]["Marine Specific Voyage Export"].sea.InstituteClauses.forEach((x) => {
  //       if (x === selectedvalue) Autoflag = true;
  //     });
  //   } else if (type === "Marine Specific Voyage Export FOB") {
  //     PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].sea.InstituteClauses.forEach(
  //       (x) => {
  //         if (x === selectedvalue) Autoflag = true;
  //       }
  //     );
  //   }
  //   //  else if (type === "Marine Specifc Voyage Duty") {
  //   //   PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].sea.InstituteClauses.forEach((x) => {
  //   //     if (x === selectedvalue) Autoflag = true;
  //   //   });
  //   // }
  //   return Autoflag;
  // };

  console.log("rowwwss", row1, row2, selected2);
  if (
    row1 === "Marine Specific Voyage Import" ||
    row1 === "Marine Specific Voyage Export" ||
    row1 === "Marine Specific Voyage Export FOB" ||
    row1 === "Marine Specifc Voyage Duty"
  ) {
    if (row2 === "Air") {
      return (
        <>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
            <MDTypography>
              {row1}&nbsp;({row2})
            </MDTypography>
          </Grid>
          {/* <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {IMDMaster.Clauses[0].ExportImportAir[0].InstituteClauses.map((col) => (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
                <div key={col.mvalue}>
                  <Checkbox
                    // checked={PolicyDto.clauses[0][row1].air.InstituteClauses}
                    value={col.mvalue}
                    onChange={(e, value) => handlecheckbox(e, row1, col.mvalue, value)}
                    checked={handlecheckboxAutoSelect(col.mvalue, row1)}
                    // checked={PolicyDto.clauses[0][row1].air.InstituteClauses.includes(col.mvalue)}
                  />
                  <span>
                    {/* {col.Cover}({col.mvalue}) */}
          {/* {col.mvalue}
                  </span>{" "}
                </div>
              </Grid>
            ))}
          </Grid> */}
          <Grid container>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportAirc}
                disableCloseOnSelect
                value={handlecheckedair(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallair(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectair(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Common-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportAir}
                disableCloseOnSelect
                value={handlecheckedair1(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallair1(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectair1(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="NonInstitute-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={IMDMaster.Clauses[0].ExportImportAir[0].InstituteClauses}
                disableCloseOnSelect
                value={handlecheckedinst(row1)}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinst(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectinst(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Institute-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
          </Grid>
        </>
      );
    }
    if (row2 === "Sea") {
      return (
        <>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
            <MDTypography>
              {row1}&nbsp;({row2})
            </MDTypography>
          </Grid>
          {/* <Grid container xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {IMDMaster.Clauses[0].ExportImportSea[0].InstituteClauses.map((col) => (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
                <div key={col.mvalue}>
                  <Checkbox
                    value={col.mvalue}
                    // checked={handlecheckboxAutoSelect1(col.mvalue, row1)}
                    onChange={(e, value) => handlecheckbox1(e, row1, col.mvalue, value)}
                  />
                  <span>
                    {/* {col.Cover}({col.mvalue}) */}
          {/* {col.mvalue}
                  </span>{" "}
                </div>
              </Grid>
            ))}
          </Grid> */}
          <Grid container>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportSeac}
                disableCloseOnSelect
                value={handlecheckedsea(row1)}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallsea(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectsea(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Common-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportSea}
                disableCloseOnSelect
                value={handlecheckedsea1(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallsea1(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectsea1(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="NonInstitute-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={IMDMaster.Clauses[0].ExportImportSea[0].InstituteClauses}
                disableCloseOnSelect
                value={handlecheckedinst1(row1)}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinst1(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectinst1(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Institute-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
          </Grid>
        </>
      );
    }

    if (row2 === "Rail / Road") {
      return (
        <>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
            <MDTypography>
              {row1}&nbsp;({row2})
            </MDTypography>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportRailc}
                disableCloseOnSelect
                value={handlecheckedinlandrail(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinlandrail(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectrail(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Common-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={InlandAirt}
                disableCloseOnSelect
                value={handlecheckedinlandair4(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinlandair4(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectrail2(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="InlandTransit-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportRail}
                disableCloseOnSelect
                value={handlecheckedinlandair1(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinlandair1(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectrail1(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="NonInstitute-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
          </Grid>
        </>
      );
    }

    if (row2 === "Courier" || row2 === "Parcel Post" || row2 === "Registered POST") {
      return (
        <>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
            <MDTypography>
              {row1}&nbsp;({row2})
            </MDTypography>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportPostc}
                disableCloseOnSelect
                value={handlecheckedExpoImpoInlandPostCourier(row1, row2)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => ExpoImpoInlandPostCourier(e, row1, value, row2)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectClauses(option, row1, row2)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Common-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={InlandAirt}
                disableCloseOnSelect
                value={handlecheckedExpoImpoInlandPostCourier1(row1, row2)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => ExpoImpoInlandPostCourier1(e, row1, value, row2)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectClauses1(option, row1, row2)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="InlandTransit-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportPost}
                disableCloseOnSelect
                value={handlecheckedExpoImpoInlandPostCourier2(row1, row2)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => ExpoImpoInlandPostCourier2(e, row1, value, row2)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectClauses2(option, row1, row2)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Non Institute Clauses" placeholder="Select" />
                )}
              />
            </Grid>
          </Grid>
        </>
      );
    }
    if (row2 === "Others") {
      console.log("othersclauses");
      return null;
    }
  } else if (row1 === "Marine Specific Voyage Inland") {
    if (row2 === "Air") {
      return (
        <>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
            <MDTypography>
              {row1}&nbsp;({row2})
            </MDTypography>
          </Grid>

          <Grid container>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={InlandAirc}
                disableCloseOnSelect
                value={handlecheckedinlandair(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinlandair(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectair2(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Common-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={InlandAirt}
                disableCloseOnSelect
                value={handlecheckedtransitinlandair(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handletransitinlandair(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectair3(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="InlandTransit-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportRail}
                disableCloseOnSelect
                value={handlecheckedtransitinlandair1(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handletransitinlandair1(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectair4(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="NonInstitute-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
          </Grid>
        </>
      );
    }

    if (row2 === "Sea") {
      return (
        <>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
            <MDTypography>
              {row1}&nbsp;({row2})
            </MDTypography>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={InlandSeac}
                disableCloseOnSelect
                value={handlecheckedinlandair2(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinlandair2(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectsea2(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Common-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={InlandAirt}
                disableCloseOnSelect
                value={handlecheckedinlandair5(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinlandair5(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectsea3(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="InlandTransit-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={InlandSea}
                disableCloseOnSelect
                value={handlecheckedinlandair3(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinlandair3(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectsea6(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="NonInstitute Clauses" placeholder="Select" />
                )}
              />
            </Grid>
          </Grid>
        </>
      );
    }

    if (row2 === "Rail / Road") {
      return (
        <>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
            <MDTypography>
              {row1}&nbsp;({row2})
            </MDTypography>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportRailc}
                disableCloseOnSelect
                value={handlecheckedinlandrail(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinlandrail(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectrail(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Common-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={InlandAirt}
                disableCloseOnSelect
                value={handlecheckedinlandair4(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinlandair4(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectrail2(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="InlandTransit-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportRail}
                disableCloseOnSelect
                value={handlecheckedinlandair1(row1)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleselectallinlandair1(e, row1, value)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectrail1(option, row1)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="NonInstitute-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
          </Grid>
        </>
      );
    }

    if (row2 === "Courier" || row2 === "Parcel Post" || row2 === "Registered POST") {
      return (
        <>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
            <MDTypography>
              {row1}&nbsp;({row2})
            </MDTypography>
          </Grid>
          <Grid container>
            <Grid
              item
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportPostc}
                disableCloseOnSelect
                value={handlecheckedExpoImpoInlandPostCourier(row1, row2)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => ExpoImpoInlandPostCourier(e, row1, value, row2)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectClauses(option, row1, row2)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Common-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={InlandAirt}
                disableCloseOnSelect
                value={handlecheckedExpoImpoInlandPostCourier1(row1, row2)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => ExpoImpoInlandPostCourier1(e, row1, value, row2)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectClauses1(option, row1, row2)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="InlandTransit-Clauses" placeholder="Select" />
                )}
              />
            </Grid>
            <Grid
              xs={5}
              sm={5}
              md={5}
              lg={5}
              xl={5}
              xxl={5}
              sx={{ fontSize: "15px", mt: "3px", mr: "2px" }}
            >
              <Autocomplete
                multiple
                limitTags={5}
                id="checkboxes-tags-demo"
                options={ImportPost}
                disableCloseOnSelect
                value={handlecheckedExpoImpoInlandPostCourier2(row1, row2)}
                // fullWidth
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => ExpoImpoInlandPostCourier2(e, row1, value, row2)}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={handelAutoSelectClauses2(option, row1, row2)}
                    />
                    {option.mValue}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Non Institute Clauses" placeholder="Select" />
                )}
              />
            </Grid>
          </Grid>
        </>
      );
    }
    if (row2 === "Others") {
      return null;
    }
  }
  return null;
}

function generateUUID() {
  const ab = uuid();
  return ab;
}

function IMDProfileCreation() {
  const [allair, setallair] = useState([]);
  const [refNo, setrefNo] = useState();
  const [, dispatch] = useDataController();
  // const navigate = useNavigate();
  // const [id, setid] = useState(0);
  // const [indexing, setindexing] = useState(0);
  const [allair2, setallair2] = useState([]);
  const [allair7, setallair7] = useState([]);
  const [allair8, setallair8] = useState([]);
  const [allair9, setallair9] = useState([]);
  const [allair28, setallair28] = useState([]);
  const [allair3, setallair3] = useState([]);
  const [allair4, setallair4] = useState([]);
  const [allair5, setallair5] = useState([]);
  const [allair10, setallair10] = useState([]);
  const [allair12, setallair12] = useState([]);
  const [allair13, setallair13] = useState([]);
  const [allair14, setallair14] = useState([]);
  const [allair15, setallair15] = useState([]);
  const [allair16, setallair16] = useState([]);
  const [allair17, setallair17] = useState([]);
  const [allair19, setallair19] = useState([]);
  const [allair18, setallair18] = useState([]);
  const [allair20, setallair20] = useState([]);
  const [allair21, setallair21] = useState([]);
  const [allair22, setallair22] = useState([]);
  const [allair23, setallair23] = useState([]);
  const [allair24, setallair24] = useState([]);
  const [allair25, setallair25] = useState([]);
  const [allair26, setallair26] = useState([]);
  const [allair27, setallair27] = useState([]);
  const [expo1, setexpo1] = useState([]);
  const [expo2, setexpo2] = useState([]);
  const [expo3, setexpo3] = useState([]);
  const [expo4, setexpo4] = useState([]);
  const [expo5, setexpo5] = useState([]);
  const [expo6, setexpo6] = useState([]);
  const [expo7, setexpo7] = useState([]);
  const [expo8, setexpo8] = useState([]);
  const [expo9, setexpo9] = useState([]);
  const [expo10, setexpo10] = useState([]);
  const [expo11, setexpo11] = useState([]);
  const [expo12, setexpo12] = useState([]);
  const [expo13, setexpo13] = useState([]);
  const [expo14, setexpo14] = useState([]);
  const [expo15, setexpo15] = useState([]);
  const [impo1, setimpo1] = useState([]);
  const [impo2, setimpo2] = useState([]);
  const [impo3, setimpo3] = useState([]);
  const [impo4, setimpo4] = useState([]);
  const [impo5, setimpo5] = useState([]);
  const [impo6, setimpo6] = useState([]);
  const [impo7, setimpo7] = useState([]);
  const [impo8, setimpo8] = useState([]);
  const [impo9, setimpo9] = useState([]);
  const [impo10, setimpo10] = useState([]);
  const [impo11, setimpo11] = useState([]);
  const [impo12, setimpo12] = useState([]);
  const [impo13, setimpo13] = useState([]);
  const [impo14, setimpo14] = useState([]);
  const [impo15, setimpo15] = useState([]);
  const [inpo1, setinpo1] = useState([]);
  const [inpo2, setinpo2] = useState([]);
  const [inpo3, setinpo3] = useState([]);
  const [inpo4, setinpo4] = useState([]);
  const [inpo5, setinpo5] = useState([]);
  const [inpo6, setinpo6] = useState([]);
  const [inpo7, setinpo7] = useState([]);
  const [inpo8, setinpo8] = useState([]);
  const [inpo9, setinpo9] = useState([]);
  const [inpo10, setinpo10] = useState([]);
  const [inpo11, setinpo11] = useState([]);
  const [inpo12, setinpo12] = useState([]);
  const [inpo13, setinpo13] = useState([]);
  const [inpo14, setinpo14] = useState([]);
  const [inpo15, setinpo15] = useState([]);
  const [inpo16, setinpo16] = useState([]);
  const [inpo17, setinpo17] = useState([]);
  const [checked1, setChecked] = useState([]);
  const [checked2, setChecked1] = useState([]);
  const [inst1, setinst1] = useState([]);
  const [inst2, setinst2] = useState([]);
  const [inst3, setinst3] = useState([]);
  const [inst4, setinst4] = useState([]);
  const [inst5, setinst5] = useState([]);
  const [inst6, setinst6] = useState([]);
  const [Branch, setBranch] = useState([]);
  // const [ProfileInfo, setProfileInfo] = useState([]);
  // const [AgentCode, setAgentCode] = useState("");
  // const { search } = useLocation();
  const [allsea2, setallsea2] = useState([]);
  const [allsea1, setallsea1] = useState([]);
  const [allsea, setallsea] = useState([]);
  const [allsea3, setallsea3] = useState([]);
  const [allsea4, setallsea4] = useState([]);
  const [allsea15, setallsea15] = useState([]);
  const [allsea6, setallsea6] = useState([]);
  const [allsea7, setallsea7] = useState([]);
  const [TypeOfPolicy, setTypeOfPolicy] = useState([]);
  const [CargoTypee, setCargoTypee] = useState([]);
  const [ModeOfTransitt, setModeOfTransitt] = useState([]);
  const [Baseofvaluation, setBaseofvaluation] = useState([]);
  const [Risk, setRisk] = useState([]);
  const [Country, setCountry] = useState([]);
  // const [Country1] = useState([]);
  // const [ProfileTypeee, setProfileTypeee] = useState();
  const [newArray, setnewArray] = useState([]);
  const [PolicyDto, setPolicyDto] = useState(data);
  const [displayflag, setdisplayflag] = useState(null);
  const [createProfile, setCreateProfile] = useState(false);
  const [updateflag, setupdateflag] = useState(false);
  const [customflag, setCustomflag] = useState(false);
  const [display1, setdisplay1] = useState(true);
  const [RiskType, setRiskType] = useState([]);
  const [all, setall] = useState([]);
  const [all1, setall1] = useState([]);
  const [all2, setall2] = useState([]);
  const [flag, setFlag] = useState(false);
  const [modeflag, setmodeFlag] = useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [options] = useState([]);
  const [options1] = useState([]);
  const [options5] = useState([]);
  const [options2] = useState([]);
  const [options3] = useState([]);
  const [selected1, setSelected] = useState([]);
  // const [updateflag, setupdateflag] = useState(true);
  const Profiletypes = [
    { mID: 1, mValue: "Common Profile" },
    { mID: 2, mValue: "Custom Profile" },
  ];

  const [selected2, setSelected2] = useState([
    {
      mID: "Marine Specific Voyage Import",
      mvalue: [],
    },
    { mID: "Marine Specific Voyage Export", mvalue: [] },
    {
      mID: "Marine Specific Voyage Export FOB",
      mvalue: [],
    },
    {
      mID: "Marine Specific Voyage Inland",
      mvalue: [],
    },
    { mID: "Marine Specifc Voyage Duty", mvalue: [] },
  ]);
  const [selected3, setSelected3] = useState([]);
  const [selected4, setSelected4] = useState([]);
  const isAllSelected = options.length > 0 && selected1.length === options.length;
  // const isAllSelected1 = options1.length > 0 && selected2.length === options1.length;
  // const [isAllSelected1, setisAllSelected1] = useState(false);
  const isAllSelected2 = options2.length > 0 && selected3.length === options2.length;
  // const isAllSelected3 = options3.length > 0 && selected4.length === options3.length;
  const isAllSelected3 = RiskType.length > 0 && selected4.length === RiskType.length;
  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value);
    if (value === "all") {
      setSelected(selected1.length === options.length ? [] : options);
      return;
    }
    // added below code to update selected options
    const list = [...selected1];
    const index = list.indexOf(value);
    if (index === -1) {
      list.push(value);
    } else {
      list.splice(index, 1);
    }
    setSelected(list);
  };

  const envId = process.env.REACT_APP_EnvId;
  console.log(envId, "envirornmentid");

  const handlemodeoftransit = (ivalue, ioption) => {
    console.log("entered the loop handle mode of transit", selected2, ivalue, ioption);
    selected2.forEach((rowq, jj) => {
      if (rowq.mID === ivalue) {
        console.log(ioption, "ioption");
        console.log(
          rowq.mID,
          ivalue,
          selected2[jj].mvalue,
          selected2[jj].mvalue.includes(ioption),
          "index111111"
        );
        console.log(
          "entered the loop handle mode of transit",
          selected2[jj].mvalue.includes(ioption)
        );
        return selected2[jj].mvalue.includes(ioption);
        // console.log(jj, rowq.mID, ivalue, "index111111");
      }
      // console.log(rowq.mID, ivalue, "index111111no");
      return null;
    });
  };

  useEffect(() => {
    const abc = generateUUID();
    console.log("abc", abc, refNo);
    setrefNo(abc);
    if (false) {
      setLogo(dispatch, "USGILogo");
      setCustTheme(dispatch, "USGILogo");
    }
  }, []);
  const [selectedProfile, setSelectedProfile] = useState([]);
  console.log("selectedProfile", selectedProfile);
  const handleSetProfile = (e, value) => {
    // debugger;
    const selectedValues = value.map((option) => option.mValue);
    setSelectedProfile(selectedValues);
    PolicyDto.ProfileType = selectedValues;
    if (selectedValues.length === 1 && selectedValues[0] === "Common Profile") {
      PolicyDto.ProfileTypee = "Common Profile";
    }
    if (selectedValues.length === 1 && selectedValues[0] === "Custom Profile") {
      PolicyDto.ProfileTypee = "Custom Profile";
    }
    if (selectedValues.length === 2) {
      PolicyDto.ProfileTypee = "CommonCustom Profile";
      // PolicyDto.ProfileTypeee = "Custom Profile";
    }
    if (selectedValues.length === 0) {
      PolicyDto.ProfileTypee = "";
    }
    setPolicyDto({ ...PolicyDto });
    console.log("keerthi", PolicyDto);
  };

  const handlemodeoftransitAutoSelect = (selectedvalue, type) => {
    console.log("handlemodeoftransitAutoSelect", selectedvalue, type);

    let Autoflag = false;

    selected2.forEach((rowq, jj) => {
      if (rowq.mID === type) {
        if (selected2[jj].mvalue.includes(selectedvalue)) Autoflag = true;
        console.log("handlemodeoftransitAutoSelect", selected2[jj].mvalue, selectedvalue, Autoflag);
      }
    });
    return Autoflag;
  };

  const handleChange1 = (event, Unique, unique1, cstate) => {
    console.log(Unique, "Unique");
    console.log(unique1, "unique1");
    console.log(cstate, "cstate");

    const { value } = event.target;
    console.log(value);
    if (value === "all") {
      setSelected(selected1.length === options.length ? [] : options);
      return;
    }

    selected2.map((row, i) => {
      if (row.mID === unique1) {
        if (cstate === true) {
          selected2[i].mvalue.push(Unique);
        } else {
          console.log("aftersplice");
          selected2[i].mvalue.forEach((k, q) => {
            console.log("aftersplice", k, selected2[i].mvalue[q]);
            if (selected2[i].mvalue[q] === Unique) {
              selected2[i].mvalue.splice(q, 1);
              console.log(selected2, "aftersplice");
            }
          });
        }
      }
      return null;
    });
    setSelected2(selected2);
    console.log(selected2, "selected2");
    setPolicyDto(() => ({
      ...PolicyDto,
      ModeOfTransit1: selected2,
    }));

    if (cstate === false) {
      if (unique1 === "Marine Specific Voyage Export") {
        if (Unique === "Air") {
          setallair2([]);
          setallair4([]);
          setinst2([]);
        }
        if (Unique === "Sea") {
          setallsea1([]);
          setallsea4([]);
          setinst5([]);
        }
        if (Unique === "Rail / Road") {
          setallair17([]);
          setallair24([]);
          setallair18([]);
        }
        if (Unique === "Parcel Post") {
          setexpo5([]);
          setimpo5([]);
          setinpo5([]);
        }
        if (Unique === "Courier") {
          setexpo4([]);
          setimpo4([]);
          setinpo4([]);
        }
      }
      if (unique1 === "Marine Specific Voyage Import") {
        if (Unique === "Air") {
          setallair([]);
          setallair3([]);
          setinst1([]);
        }
        if (Unique === "Sea") {
          setallsea([]);
          setallsea3([]);
          setinst4([]);
        }
        if (Unique === "Rail / Road") {
          setallair15([]);
          setallair23([]);
          setallair16([]);
        }
        if (Unique === "Parcel Post") {
          setexpo2([]);
          setimpo2([]);
          setinpo2([]);
        }
        if (Unique === "Courier") {
          setexpo1([]);
          setimpo1([]);
          setinpo1([]);
        }
      }
      if (unique1 === "Marine Specific Voyage Inland") {
        if (Unique === "Air") {
          setallair7([]);
          setinpo16([]);
          setinpo17([]);
        }
        if (Unique === "Sea") {
          setallair9([]);
          setallair28([]);
          setallair10([]);
        }
        if (Unique === "Rail / Road") {
          setallair14([]);
          setallair26([]);
          setallair8([]);
        }
        if (Unique === "Parcel Post") {
          setexpo14([]);
          setimpo14([]);
          setinpo14([]);
        }
        if (Unique === "Courier") {
          setexpo13([]);
          setimpo13([]);
          setinpo13([]);
        }
        if (Unique === "Registered POST") {
          setexpo15([]);
          setimpo15([]);
          setinpo15([]);
        }
      }
      if (unique1 === "Marine Specifc Voyage Duty") {
        if (Unique === "Air") {
          setallair12([]);
          setallair13([]);
          setinst3([]);
        }
        if (Unique === "Sea") {
          setallsea6([]);
          setallsea7([]);
          setinst6([]);
        }
        if (Unique === "Rail / Road") {
          setallair21([]);
          setallair27([]);
          setallair22([]);
        }
        if (Unique === "Parcel Post") {
          setexpo11([]);
          setimpo11([]);
          setinpo11([]);
        }
        if (Unique === "Courier") {
          setexpo10([]);
          setimpo10([]);
          setinpo10([]);
        }
        if (Unique === "Registered POST") {
          setexpo12([]);
          setimpo12([]);
          setinpo12([]);
        }
      }
    }

    console.log(PolicyDto);
  };
  const handleChange2 = (event) => {
    const { value } = event.target;
    if (value === "all") {
      setSelected3(selected3.length === options2.length ? [] : options2);
      return;
    }
    // added below code to update selected options
    const list = [...selected3];
    const index = list.indexOf(value);
    if (index === -1) {
      list.push(value);
    } else {
      list.splice(index, 1);
    }
    setSelected3(list);
  };

  const [ImportAir, setImportAir] = useState([]);
  const [ImportAirc, setImportAirc] = useState([]);
  const [ImportSea, setImportSea] = useState([]);
  const [ImportSeac, setImportSeac] = useState([]);
  const [ImportRail, setImportRail] = useState([]);
  const [ImportRailc, setImportRailc] = useState([]);
  const [ImportPost, setImportPost] = useState([]);
  const [ImportPostc, setImportPostc] = useState([]);
  const [InlandAir, setInlandAir] = useState([]);
  const [InlandAirc, setInlandAirc] = useState([]);
  const [InlandSea, setInlandSea] = useState([]);
  const [InlandSeac, setInlandSeac] = useState([]);
  const [InlandAirt, setInlandAirt] = useState([]);

  useEffect(async () => {
    const jsonValue = {
      TransitId: "3",
    };
    const jsonValue1 = {
      TransitId: "2",
    };
    const jsonValue2 = {
      TransitId: "5",
    };
    const jsonValue3 = {
      TransitId: "4",
    };
    const jsonValue4 = {
      TransitId: "12",
    };
    const jsonValue5 = {
      TransitId: "10",
    };
    const PortNames = await ClauseData("NonInstituteClauses", jsonValue);
    const PortNames1 = await ClauseData("CommonClauses", jsonValue);
    const PortNames2 = await ClauseData("NonInstituteClauses", jsonValue1);
    const PortNames3 = await ClauseData("CommonClauses", jsonValue1);
    const PortNames4 = await ClauseData("NonInstituteClauses", jsonValue2);
    const PortNames5 = await ClauseData("CommonClauses", jsonValue2);
    const PortNames6 = await ClauseData("NonInstituteClauses", jsonValue3);
    const PortNames7 = await ClauseData("CommonClauses", jsonValue3);
    const PortNames8 = await ClauseData("NonInstituteClauses", jsonValue4);
    const PortNames9 = await ClauseData("CommonClauses", jsonValue4);
    const PortNames10 = await ClauseData("NonInstituteClauses", jsonValue5);
    const PortNames11 = await ClauseData("CommonClauses", jsonValue5);
    const PortNames12 = await ClauseData("InlandTransitClauses", jsonValue2);

    setImportAir([{ mID: 0, mValue: "Select All" }, ...PortNames]);
    setImportAirc([{ mID: 0, mValue: "Select All" }, ...PortNames1]);
    setImportSea([{ mID: 0, mValue: "Select All" }, ...PortNames2]);
    setImportSeac([{ mID: 0, mValue: "Select All" }, ...PortNames3]);
    setImportRail([{ mID: 0, mValue: "Select All" }, ...PortNames4]);
    setImportRailc([{ mID: 0, mValue: "Select All" }, ...PortNames5]);
    setImportPost([{ mID: 0, mValue: "Select All" }, ...PortNames6]);
    setImportPostc([{ mID: 0, mValue: "Select All" }, ...PortNames7]);
    setInlandAir([{ mID: 0, mValue: "Select All" }, ...PortNames8]);
    setInlandAirc([{ mID: 0, mValue: "Select All" }, ...PortNames9]);
    setInlandSea([{ mID: 0, mValue: "Select All" }, ...PortNames10]);
    setInlandSeac([{ mID: 0, mValue: "Select All" }, ...PortNames11]);
    setInlandAirt([{ mID: 0, mValue: "Select All" }, ...PortNames12]);

    console.log(ImportAir, PortNames1, "ImportAirImportAir");
  }, []);

  useEffect(() => {
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].air.CommonClauses = [...allair7];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].air.NonInstituteClauses = [...allair3];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].air.NonInstituteClauses = [...allair4];
    PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].air.NonInstituteClauses = [
      ...allair5,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].air.CommonClauses = [...allair2];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].air.CommonClauses = [...allair];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].air.NonInstituteClauses = [...allair13];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].air.NonInstituteClauses = [...inpo17];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].air.InlandTransitClauses = [...inpo16];

    PolicyDto.clauses[0]["Marine Specific Voyage Import"].sea.CommonClauses = [...allsea];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].sea.CommonClauses = [...allsea1];
    PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].sea.CommonClauses = [...allsea2];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].sea.CommonClauses = [...allsea6];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].sea.CommonClauses = [...allair9];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].sea.NonInstituteClauses = [...allsea3];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].sea.NonInstituteClauses = [...allsea4];
    PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].sea.NonInstituteClauses = [
      ...allsea15,
    ];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].sea.NonInstituteClauses = [...allsea7];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].sea.NonInstituteClauses = [...allair10];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].sea.InlandTransitClauses = [...allair28];

    PolicyDto.clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses = [...expo1];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].Courier.CommonClauses = [...expo4];
    PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].Courier.CommonClauses = [...expo7];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].Courier.CommonClauses = [...expo10];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].Courier.CommonClauses = [...expo13];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].Courier.NonInstituteClauses = [...inpo1];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].Courier.NonInstituteClauses = [...inpo4];
    PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].Courier.NonInstituteClauses = [
      ...inpo7,
    ];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].Courier.NonInstituteClauses = [...inpo10];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].Courier.NonInstituteClauses = [...inpo13];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].Courier.InlandTransitClauses = [...impo1];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].Courier.InlandTransitClauses = [...impo4];
    PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].Courier.InlandTransitClauses = [
      ...impo7,
    ];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].Courier.InlandTransitClauses = [...impo10];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].Courier.InlandTransitClauses = [
      ...impo13,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].ParcelPost.CommonClauses = [...expo2];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].ParcelPost.CommonClauses = [...expo5];
    PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost.CommonClauses = [...expo8];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.CommonClauses = [...expo11];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].ParcelPost.CommonClauses = [...expo14];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].ParcelPost.NonInstituteClauses = [
      ...inpo2,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].ParcelPost.NonInstituteClauses = [
      ...inpo5,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost.NonInstituteClauses = [
      ...inpo8,
    ];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.NonInstituteClauses = [...inpo11];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].ParcelPost.NonInstituteClauses = [
      ...inpo14,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].ParcelPost.InlandTransitClauses = [
      ...impo2,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].ParcelPost.InlandTransitClauses = [
      ...impo5,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost.InlandTransitClauses = [
      ...impo8,
    ];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.InlandTransitClauses = [
      ...impo11,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].ParcelPost.InlandTransitClauses = [
      ...impo14,
    ];

    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost.CommonClauses = [...expo12];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].RegisteredPost.CommonClauses = [
      ...expo15,
    ];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost.NonInstituteClauses = [
      ...inpo11,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].RegisteredPost.NonInstituteClauses = [
      ...inpo14,
    ];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost.InlandTransitClauses = [
      ...impo12,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].RegisteredPost.InlandTransitClauses = [
      ...impo15,
    ];

    PolicyDto.clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir.CommonClauses = [
      ...allair15,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir.CommonClauses = [
      ...allair17,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir.CommonClauses = [
      ...allair19,
    ];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir.CommonClauses = [
      ...allair21,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir.CommonClauses = [
      ...allair14,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir.NonInstituteClauses = [
      ...allair16,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir.NonInstituteClauses = [
      ...allair18,
    ];
    PolicyDto.clauses[0][
      "Marine Specific Voyage Export FOB"
    ].InlandRailRoadAir.NonInstituteClauses = [...allair20];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir.NonInstituteClauses = [
      ...allair22,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir.NonInstituteClauses = [
      ...allair8,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir.InlandTransitClauses = [
      ...allair23,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir.InlandTransitClauses = [
      ...allair24,
    ];
    PolicyDto.clauses[0][
      "Marine Specific Voyage Export FOB"
    ].InlandRailRoadAir.InlandTransitClauses = [...allair25];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir.InlandTransitClauses = [
      ...allair27,
    ];
    PolicyDto.clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir.InlandTransitClauses = [
      ...allair26,
    ];
    PolicyDto.FromCountry = [...all1];
    PolicyDto.ToCountry = [...all2];
    PolicyDto.CargoType = [...all];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].air.InstituteClauses = [...inst1];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].air.InstituteClauses = [...inst2];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].air.InstituteClauses = [...inst3];
    PolicyDto.clauses[0]["Marine Specific Voyage Import"].sea.InstituteClauses = [...inst4];
    PolicyDto.clauses[0]["Marine Specific Voyage Export"].sea.InstituteClauses = [...inst5];
    PolicyDto.clauses[0]["Marine Specifc Voyage Duty"].sea.InstituteClauses = [...inst6];
  });

  useEffect(() => {
    console.log("inpo111111", inpo1, expo1);
    console.log(ImportAir, "ImportAirImportAir2");
  });

  // const handleChange3 = (event) => {
  //   const { value } = event.target;
  //   if (value === "all") {
  //     setSelected4(selected4.length === options3.length ? [] : options3);
  //     return;
  //   }
  //   // added below code to update selected options
  //   const list = [...selected4];
  //   const index = list.indexOf(value);
  //   if (index === -1) {
  //     list.push(value);
  //   } else {
  //     list.splice(index, 1);
  //   }
  //   setSelected4(list);
  // };
  const handleChange3 = (event) => {
    const { value } = event.target;
    if (value === "all") {
      setSelected4(selected4.length === RiskType.length ? [] : RiskType.map((row) => row.mValue));
      return;
    }
    const list = [...selected4];
    const index = list.indexOf(value);
    if (index === -1) {
      list.push(value);
    } else {
      list.splice(index, 1);
    }
    setSelected4(list);
  };

  console.log(selected1);

  const listItem = options.map((option) => (
    <Grid sm={12} md={4} lg={4} xl={4} xxl={4} sx={{ fontSize: "15px" }}>
      <div key={option}>
        <Checkbox value={option} onChange={handleChange} checked={selected1.includes(option)} />
        <span>{option}</span>
      </div>
    </Grid>
  ));

  const listItem2 = options2.map((option) => (
    <Grid sm={12} md={4} lg={4} xl={4} xxl={4} sx={{ fontSize: "15px" }}>
      <div key={option}>
        <Checkbox value={option} onChange={handleChange2} checked={selected3.includes(option)} />
        <span>{option}</span>
      </div>
    </Grid>
  ));

  // const listItem3 = options3.map((option) => (
  //   <Grid sm={12} md={4} lg={4} xl={4} xxl={4} sx={{ fontSize: "15px" }}>
  //     <div key={option}>
  //       <Checkbox value={option} onChange={handleChange3} checked={selected4.includes(option)} />
  //       <span>{option}</span>
  //     </div>
  //   </Grid>
  // ));
  const listItem3 = RiskType.map((option) => (
    <Grid sm={12} md={4} lg={4} xl={4} xxl={4} sx={{ fontSize: "15px" }}>
      <div key={option.mValue}>
        <Checkbox
          value={option.mValue}
          onChange={handleChange3}
          checked={selected4.includes(option.mValue)}
        />
        <span>{option.mValue}</span>
      </div>
    </Grid>
  ));

  useEffect(() => {
    console.log("jsonObject");

    const jsonObject = newArray.map(JSON.stringify);

    console.log(jsonObject);

    const uniqueSet = new Set(jsonObject);
    const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

    console.log(uniqueArray, "uniqueArray");
    const temparr = [];
    // if (selected1.length > 0) {
    selected1.forEach((row) => {
      uniqueArray.forEach((qq) => {
        console.log(row, qq.mid, "temparr");

        if (row === qq.mid) {
          temparr.push(qq);
          console.log(temparr, "temparr");
        }
      });
    });
    // }
    console.log(temparr, "temparr1");
    // setSelected2(temparr);
    // console.log(selected2, "temparr1selected2");
  }, [newArray, selected1]);

  useEffect(() => {
    if (selected1.length > 0) {
      selected1.forEach((row) => {
        newArray.push({ mid: row, mvalue: [] });
      });
      setnewArray(newArray);
    }
    console.log(newArray, "newarray");
  }, [selected1]);

  console.log("selected1", selected1);
  useEffect(() => {
    console.log(TypeOfPolicy, "TypeOfPolicy123");
    if (TypeOfPolicy.length > 0) {
      TypeOfPolicy.map((row) => {
        options.push(row.mValue);
        console.log(options, "options123");
        return null;
      });
    }
  }, [TypeOfPolicy]);
  useEffect(() => {
    console.log(ModeOfTransitt, "ModeOfTransitt");
    if (ModeOfTransitt.length > 0) {
      ModeOfTransitt.map((row) => {
        options1.push(row.mValue);
        console.log(options1, "options123");
        return null;
      });
    }
    if (ModeOfTransitt.length > 0) {
      ModeOfTransitt.map((row) => {
        if (row.mValue === "Registered POST") {
          console.log(options5, "options123");
        } else {
          options5.push(row.mValue);
          console.log(options5, "options123");
        }

        return null;
      });
    }
  }, [ModeOfTransitt]);
  // useEffect(() => {
  //   console.log(Country, "Country123");
  //   Country.map((row) => {
  //     if ((row.mID >= 49 && row.mID <= 275) || (row.mID >= 453 && row.mID <= 488)) {
  //       Country1.push(row);
  //       console.log(row.mValue, "Country1234654");
  //     }
  //     return null;
  //   });

  //   console.log(Country1, "Country12345");
  // }, [Country]);
  useEffect(() => {
    console.log(Baseofvaluation, "Baseofvaluation");
    if (Baseofvaluation.length > 0) {
      Baseofvaluation.map((row) => {
        options2.push(row.mValue);
        console.log(options2, "options123");
        return null;
      });
    }
  }, [Baseofvaluation]);

  useEffect(() => {
    if (Risk.length > 0) {
      Risk.map((row) => {
        options3.push(row.mValue);
        console.log(options3, "options123");
        return null;
      });
    }
  }, [Risk]);

  useEffect(() => {
    PolicyDto.TypeOfPolicy = selected1;
    setPolicyDto(() => ({
      ...PolicyDto,
    }));
    const output = IMDMaster.TypeOfPolicy.filter(
      (obj) => PolicyDto.TypeOfPolicy.indexOf(obj) === -1
    );
    console.log(output, IMDMaster.TypeOfPolicy, PolicyDto.TypeOfPolicy, "outputt");
    output.map((row) => {
      if (row === "Marine Specific Voyage Export") {
        console.log(selected2, "outputt");
        setallair17([]);
        setallair18([]);
        setallair24([]);
        setexpo4([]);
        setexpo5([]);
        setexpo6([]);
        setinpo4([]);
        setinpo5([]);
        setinpo6([]);
        setallair2([]);
        setallair4([]);
        setinst2([]);
        setallsea1([]);
        setallsea4([]);
        setinst5([]);
        setimpo4([]);
        setimpo5([]);
        setimpo6([]);
        selected2[1].mvalue = [];
        setSelected2(selected2);
        console.log(PolicyDto, "policydto123");
      }
      if (row === "Marine Specific Voyage Import") {
        selected2[0].mvalue = [];
        setSelected2(selected2);
        setexpo1([]);
        setexpo2([]);
        setexpo3([]);
        setallair15([]);
        setallair16([]);
        setallair23([]);

        setimpo1([]);
        setimpo2([]);
        setimpo3([]);

        setinpo1([]);
        setinpo2([]);
        setinpo3([]);

        setallair3([]);
        setinst1([]);
        setallair([]);
        setallsea([]);
        setallsea3([]);
        setinst4([]);
      }
      if (row === "Marine Specific Voyage Export FOB") {
        selected2[2].mvalue = [];
        setSelected2(selected2);
      }
      if (row === "Marine Specific Voyage Inland") {
        selected2[3].mvalue = [];
        setSelected2(selected2);
        setexpo13([]);
        setexpo14([]);
        setexpo15([]);

        setinpo13([]);
        setinpo14([]);
        setinpo15([]);

        setallair14([]);
        setallair26([]);
        setallair8([]);

        setimpo13([]);
        setimpo14([]);
        setimpo15([]);

        setallair7([]);
        setinpo16([]);
        setinpo17([]);
        setallair9([]);
        setallair28([]);
        setallair10([]);
      }
      if (row === "Marine Specifc Voyage Duty") {
        setexpo10([]);
        setexpo11([]);
        setexpo12([]);

        setimpo10([]);
        setimpo11([]);
        setimpo12([]);

        setallair21([]);
        setallair22([]);
        setallair27([]);

        setinpo10([]);
        setinpo11([]);
        setinpo12([]);

        setallair13([]);
        setallair12([]);
        setinst3([]);
        setallsea6([]);
        setallsea7([]);
        setinst6([]);

        // selected2[4].mvalue = [];
        setSelected2(selected2);
      }
      return null;
    });
    setPolicyDto(() => ({
      ...PolicyDto,
      ModeOfTransit1: selected2,
    }));
    setPolicyDto(() => ({
      ...PolicyDto,
    }));
    console.log("outputt", selected2);
    console.log("policydto", PolicyDto);
  }, [selected1]);
  useEffect(() => {
    PolicyDto.BasisOfValuation = selected3;
    setPolicyDto(() => ({
      ...PolicyDto,
    }));
  }, [selected3]);
  useEffect(() => {
    PolicyDto.Risk = selected4;
    setPolicyDto(() => ({
      ...PolicyDto,
    }));
  }, [selected4]);

  // useEffect(async () => {
  //   Branch.pop();
  //   setBranch(Branch);
  //   PolicyDto.BranchName = "";
  //   setPolicyDto(() => ({
  //     ...PolicyDto,
  //   }));
  //   await fetchuser(`${PolicyDto.UserName}`).then(async (result) => {
  //     console.log("123456789result", result, result.data.partnerId);
  //     const partnerDetailssss = result.data.additionalDetails;
  //     console.log("123456789", partnerDetailssss);
  //     const partnerDetail = JSON.parse(partnerDetailssss);
  //     PolicyDto.AgentCode = partnerDetail.AdditionalDetails.IntermediaryCode;
  //     PolicyDto.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
  //     setPolicyDto(() => ({
  //       ...PolicyDto,
  //     }));
  //     console.log("branchusername", PolicyDto);
  //   });
  // }, [PolicyDto.UserName]);

  // useEffect(async () => {
  //   await fetchuser(`${PolicyDto.UserName}`).then(async (result1) => {
  //     if (result1 !== null) {
  //       PolicyDto.UserName = result1.data.userDetails[0].userName;
  //       // PolicyDto.BranchName = "";
  //       setPolicyDto((prevState) => ({
  //         ...prevState,
  //         ...PolicyDto,
  //       }));
  //     }
  //   });
  // }, []);

  useEffect(async () => {
    // Country.push({ mID: 0, mValue: "Select All" });
    const mdatalist = await getMasterDatalist();
    // const countryMaster = await getCountryMaster();
    const countryMaster = await ClauseData("CountryName", {});
    console.log(mdatalist, "mdatalist");
    console.log(countryMaster, "countryMaster");
    // // setCountry(countryMaster.data);
    setCountry([
      { mID: 0, mValue: "Select All" },
      ...countryMaster.sort((a, b) => a.mValue.localeCompare(b.mValue)),
    ]);
    console.log(Country, "Country123");

    mdatalist.data.map((md, i) => {
      if (md.mType === "MarinePolicyType") {
        setTypeOfPolicy([...mdatalist.data[i].mdata]);
      }
      if (md.mType === "CargoType") {
        setCargoTypee([{ mID: 0, mValue: "Select All" }, ...mdatalist.data[i].mdata]);
      }
      if (md.mType === "ModeofTransit") {
        setModeOfTransitt([...mdatalist.data[i].mdata]);
      }
      if (md.mType === "BasisofValuation") {
        setBaseofvaluation([...mdatalist.data[i].mdata]);
      }
      if (md.mType === "MSVRiskType") {
        setRiskType([...mdatalist.data[i].mdata]);
        console.log(RiskType, "5678");
      }
      return null;
    });

    // setTypeOfPolicy([...mdatalist.data[58].mdata]);
    // setCargoTypee([{ mID: 0, mValue: "Select All" }, ...mdatalist.data[12].mdata]);

    // setModeOfTransitt([...mdatalist.data[62].mdata]);
    // setBaseofvaluation([...mdatalist.data[6].mdata]);
    setRisk([...IMDMaster.Risk]);
    console.log(ModeOfTransitt, "ModeOfTransitt");
    console.log(TypeOfPolicy, "TypeOfPolicy");
    console.log(CargoTypee, "CargoTypee");
    console.log(mdatalist, "mdatalist");
  }, []);

  console.log(IMDMaster, "IMDMaster");

  const callCustomProfile = async () => {
    const FetchBranchName = {
      AgentCode: PolicyDto.AgentCode,
    };
    const BranchNames = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=872&MasterType=BranchName`,
      FetchBranchName
    );
    console.log("BranchNames123", BranchNames);
    const mIDValues = BranchNames.data.filter((item) => item.mValue === PolicyDto.BranchName);
    console.log("mID values:", mIDValues);
    const uniqueProfileNo = new Set();
    if (Array.isArray(mIDValues) && mIDValues.length > 0) {
      mIDValues.forEach((row) => {
        uniqueProfileNo.add(row.ProfileNo);
      });
      const uniqueProfileNoArray = Array.from(uniqueProfileNo);
      console.log("uniqueProfileNo1254", uniqueProfileNoArray);
      PolicyDto.ProfileNumber = uniqueProfileNoArray.toString();
      setPolicyDto(() => ({
        ...PolicyDto,
      }));
    }
    const obj = {
      AgentCode: PolicyDto.AgentCode,
      UserName: PolicyDto.UserName,
      BranchName: PolicyDto.BranchName,
      ProfileNumber: PolicyDto.ProfileNumber,
    };
    if (
      PolicyDto.ProfileTypee === "Custom Profile" ||
      PolicyDto.ProfileTypee === "CommonCustom Profile"
    ) {
      if (
        PolicyDto.UserName === "" ||
        PolicyDto.BranchName === "" ||
        PolicyDto.MaximumSumInsured === "" ||
        PolicyDto.MinimumRate === "" ||
        PolicyDto.MinimumPremium === "" ||
        PolicyDto.Markup === "" ||
        PolicyDto.Excess === "" ||
        PolicyDto.BackDate === "" ||
        PolicyDto.TypeOfPolicy.length === 0 ||
        PolicyDto.CargoType.length === 0 ||
        PolicyDto.FromCountry.length === 0 ||
        PolicyDto.ToCountry.length === 0 ||
        PolicyDto.BasisOfValuation.length === 0
      ) {
        setFlag(true);
        swal({
          icon: "error",
          text: "Please Enter the Required fields",
          buttons: "OK",
        });
      } else {
        setFlag(false);
        console.log("111", PolicyDto);
        await Saveprofile(
          obj.AgentCode,
          obj.UserName,
          obj.BranchName,
          obj.ProfileNumber,
          PolicyDto
        ).then((result) => {
          console.log("111", PolicyDto);
          console.log("Policy issued", result);
          if (result.status === 200) {
            if (envId === "1") {
              swal({
                text: "Profile Created Successfully",
                html: true,
                icon: "success",
                buttons: "ok",
              }).then(() => window.location.replace(`https://agencyforce.universalsompo.com/`));
            } else {
              swal({
                text: "Profile Created Successfully",
                html: true,
                icon: "success",
                buttons: "ok",
              }).then(() =>
                window.location.replace(`https://uatagency.universalsompo.com/Home/Dashboard`)
              );
            }
          }
        });
      }
    }
  };
  const [loader, setLoader] = useState(false);
  const clear = () => {
    console.log("clear");
    PolicyDto.UserName = "";
    PolicyDto.BranchName = "";
    setBranch([]);
    setPolicyDto((prevState) => ({
      ...prevState,
      ...PolicyDto,
    }));
  };
  const [displayflag2, setdisplayflag2] = useState(true);
  // const [ExistingProfileflag, setExistingProfileflag] = useState(false);
  // const handleprofiletypes = async () => {
  //   debugger;
  //   const FetchBranchCode1 = {
  //     LongDesc: PolicyDto.BranchName,
  //   };
  //   const BranchCodes1 = await postRequest(
  //     `Product/GetProdPartnermasterData?ProductId=872&MasterType=MasBranch`,
  //     FetchBranchCode1
  //   );
  //   console.log("BranchCodes", BranchCodes1);
  //   PolicyDto.BranchCode = BranchCodes1.data[0].mID;
  //   setPolicyDto(() => ({
  //     ...PolicyDto,
  //   }));
  //   if (PolicyDto.ProfileTypee === "" && PolicyDto.ProfileType === "") {
  //     // setFlag(true);
  //     swal({
  //       icon: "error",
  //       text: "Please Select Profile Type",
  //       buttons: "OK",
  //     });
  //   } else if (PolicyDto.ProfileTypee === "CommonCustom Profile") {
  //     setLoader(true);
  //     await fetchProfile(
  //       PolicyDto.AgentCode,
  //       PolicyDto.UserName,
  //       PolicyDto.BranchName,
  //       // PolicyDto.ProfileTypee,
  //       "Custom Profile",
  //       PolicyDto.BranchCode
  //     ).then((result) => {
  //       console.log("profileinformation1", result);
  //       if (result.data.length === 1) {
  //         setSelected2(result.data[0].ModeOfTransit1);
  //         setdisplayflag(false);
  //         setupdateflag(true);
  //         // setdisplay1(true);
  //         // setdisplay1(true);
  //         setSelected(result.data[0].TypeOfPolicy);
  //         setSelected3(result.data[0].BasisOfValuation);
  //         setSelected4(result.data[0].Risk);
  //         setall(result.data[0].CargoType);
  //         setall1(result.data[0].FromCountry);
  //         setall2(result.data[0].ToCountry);
  //         setallair(result.data[0].clauses[0]["Marine Specific Voyage Import"].air.CommonClauses);

  //         setallair2(result.data[0].clauses[0]["Marine Specific Voyage Export"].air.CommonClauses);
  //         setallair12(result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.CommonClauses);
  //         setallair5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].air
  //             .NonInstituteClauses,
  //         ]);
  //         setallair3([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].air.NonInstituteClauses,
  //         ]);
  //         setallair4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].air.NonInstituteClauses,
  //         ]);
  //         setallair5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].air
  //             .NonInstituteClauses,
  //         ]);
  //         setallair13([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.NonInstituteClauses,
  //         ]);

  //         setexpo1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses,
  //         ]);
  //         setinpo1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
  //             .NonInstituteClauses,
  //         ]);
  //         setallsea([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.CommonClauses,
  //         ]);

  //         setallsea3([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.NonInstituteClauses,
  //         ]);
  //         setallsea1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.CommonClauses,
  //         ]);

  //         setallsea4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.NonInstituteClauses,
  //         ]);
  //         setallsea2([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].sea.CommonClauses,
  //         ]);

  //         setallsea15([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].sea
  //             .NonInstituteClauses,
  //         ]);

  //         setallsea6([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.CommonClauses,
  //         ]);

  //         setallsea7([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.NonInstituteClauses,
  //         ]);

  //         setallair15([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
  //             .CommonClauses,
  //         ]);
  //         setallair17([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
  //             .CommonClauses,
  //         ]);
  //         setallair19([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
  //             .CommonClauses,
  //         ]);
  //         setallair14([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
  //             .CommonClauses,
  //         ]);
  //         setallair21([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
  //             .CommonClauses,
  //         ]);

  //         setallair23([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
  //             .InlandTransitClauses,
  //         ]);
  //         setallair24([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
  //             .InlandTransitClauses,
  //         ]);
  //         setallair25([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
  //             .InlandTransitClauses,
  //         ]);
  //         setallair26([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
  //             .InlandTransitClauses,
  //         ]);
  //         setallair27([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
  //             .InlandTransitClauses,
  //         ]);

  //         setallair16([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
  //             .NonInstituteClauses,
  //         ]);
  //         setallair18([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
  //             .NonInstituteClauses,
  //         ]);
  //         setallair20([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
  //             .NonInstituteClauses,
  //         ]);
  //         setallair8([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
  //             .NonInstituteClauses,
  //         ]);
  //         setallair22([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
  //             .NonInstituteClauses,
  //         ]);

  //         setexpo1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses,
  //         ]);
  //         setexpo4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier.CommonClauses,
  //         ]);
  //         setexpo7([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier.CommonClauses,
  //         ]);
  //         setexpo13([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier.CommonClauses,
  //         ]);
  //         setexpo10([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.CommonClauses,
  //         ]);

  //         setimpo1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo7([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo13([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo10([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.InlandTransitClauses,
  //         ]);

  //         setinpo1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo7([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo13([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo10([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.NonInstituteClauses,
  //         ]);

  //         setexpo2([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost.CommonClauses,
  //         ]);
  //         setexpo5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost.CommonClauses,
  //         ]);
  //         setexpo8([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
  //             .CommonClauses,
  //         ]);
  //         setexpo14([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost.CommonClauses,
  //         ]);
  //         setexpo11([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.CommonClauses,
  //         ]);

  //         setimpo2([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo8([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo14([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo11([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost
  //             .InlandTransitClauses,
  //         ]);

  //         setinpo2([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo8([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo14([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo11([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost
  //             .NonInstituteClauses,
  //         ]);

  //         setexpo3([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
  //             .CommonClauses,
  //         ]);
  //         setexpo6([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
  //             .CommonClauses,
  //         ]);
  //         setexpo9([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
  //             .CommonClauses,
  //         ]);
  //         setexpo15([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
  //             .CommonClauses,
  //         ]);
  //         setexpo12([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost.CommonClauses,
  //         ]);

  //         setimpo3([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo6([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo9([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo15([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo12([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
  //             .InlandTransitClauses,
  //         ]);

  //         setinpo3([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo6([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo9([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo15([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo12([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
  //             .NonInstituteClauses,
  //         ]);

  //         setallair7([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.CommonClauses,
  //         ]);
  //         setinpo17([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.NonInstituteClauses,
  //         ]);
  //         setinpo16([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.InlandTransitClauses,
  //         ]);

  //         setallair9([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.CommonClauses,
  //         ]);
  //         setallair10([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.NonInstituteClauses,
  //         ]);
  //         setallair28([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.InlandTransitClauses,
  //         ]);
  //         setinst1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].air.InstituteClauses,
  //         ]);
  //         setinst2([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].air.InstituteClauses,
  //         ]);
  //         setinst3([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.InstituteClauses,
  //         ]);
  //         setinst4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.InstituteClauses,
  //         ]);
  //         setinst5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.InstituteClauses,
  //         ]);
  //         setinst6([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.InstituteClauses,
  //         ]);
  //         setPolicyDto(result.data[0]);
  //         setLoader(false);
  //       } else {
  //         setdisplayflag(false);
  //         setCreateProfile(true);
  //         setCustomflag(false);
  //         setLoader(false);
  //       }
  //     });
  //   } else {
  //     setLoader(true);
  //     const FetchBranchCode = {
  //       LongDesc: PolicyDto.BranchName,
  //     };
  //     const BranchCodes = await postRequest(
  //       `Product/GetProdPartnermasterData?ProductId=872&MasterType=MasBranch`,
  //       FetchBranchCode
  //     );
  //     console.log("BranchCodes", BranchCodes);
  //     PolicyDto.BranchCode = BranchCodes.data[0].mID;
  //     setPolicyDto(() => ({
  //       ...PolicyDto,
  //     }));
  //     await fetchProfile(
  //       PolicyDto.AgentCode,
  //       PolicyDto.UserName,
  //       PolicyDto.BranchName,
  //       PolicyDto.ProfileTypee,
  //       PolicyDto.BranchCode
  //     ).then((result) => {
  //       console.log("profileinformation1", result);
  //       if (result.data.length === 1) {
  //         setSelected2(result.data[0].ModeOfTransit1);
  //         setdisplayflag(false);
  //         setupdateflag(true);
  //         // setdisplay1(true);
  //         // setdisplay1(true);
  //         setSelected(result.data[0].TypeOfPolicy);
  //         setSelected3(result.data[0].BasisOfValuation);
  //         setSelected4(result.data[0].Risk);
  //         setall(result.data[0].CargoType);
  //         setall1(result.data[0].FromCountry);
  //         setall2(result.data[0].ToCountry);
  //         setallair(result.data[0].clauses[0]["Marine Specific Voyage Import"].air.CommonClauses);

  //         setallair2(result.data[0].clauses[0]["Marine Specific Voyage Export"].air.CommonClauses);
  //         setallair12(result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.CommonClauses);
  //         setallair5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].air
  //             .NonInstituteClauses,
  //         ]);
  //         setallair3([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].air.NonInstituteClauses,
  //         ]);
  //         setallair4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].air.NonInstituteClauses,
  //         ]);
  //         setallair5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].air
  //             .NonInstituteClauses,
  //         ]);
  //         setallair13([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.NonInstituteClauses,
  //         ]);

  //         setexpo1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses,
  //         ]);
  //         setinpo1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
  //             .NonInstituteClauses,
  //         ]);
  //         setallsea([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.CommonClauses,
  //         ]);

  //         setallsea3([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.NonInstituteClauses,
  //         ]);
  //         setallsea1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.CommonClauses,
  //         ]);

  //         setallsea4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.NonInstituteClauses,
  //         ]);
  //         setallsea2([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].sea.CommonClauses,
  //         ]);

  //         setallsea15([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].sea
  //             .NonInstituteClauses,
  //         ]);

  //         setallsea6([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.CommonClauses,
  //         ]);

  //         setallsea7([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.NonInstituteClauses,
  //         ]);

  //         setallair15([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
  //             .CommonClauses,
  //         ]);
  //         setallair17([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
  //             .CommonClauses,
  //         ]);
  //         setallair19([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
  //             .CommonClauses,
  //         ]);
  //         setallair14([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
  //             .CommonClauses,
  //         ]);
  //         setallair21([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
  //             .CommonClauses,
  //         ]);

  //         setallair23([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
  //             .InlandTransitClauses,
  //         ]);
  //         setallair24([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
  //             .InlandTransitClauses,
  //         ]);
  //         setallair25([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
  //             .InlandTransitClauses,
  //         ]);
  //         setallair26([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
  //             .InlandTransitClauses,
  //         ]);
  //         setallair27([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
  //             .InlandTransitClauses,
  //         ]);

  //         setallair16([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
  //             .NonInstituteClauses,
  //         ]);
  //         setallair18([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
  //             .NonInstituteClauses,
  //         ]);
  //         setallair20([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
  //             .NonInstituteClauses,
  //         ]);
  //         setallair8([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
  //             .NonInstituteClauses,
  //         ]);
  //         setallair22([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
  //             .NonInstituteClauses,
  //         ]);

  //         setexpo1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses,
  //         ]);
  //         setexpo4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier.CommonClauses,
  //         ]);
  //         setexpo7([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier.CommonClauses,
  //         ]);
  //         setexpo13([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier.CommonClauses,
  //         ]);
  //         setexpo10([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.CommonClauses,
  //         ]);

  //         setimpo1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo7([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo13([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo10([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.InlandTransitClauses,
  //         ]);

  //         setinpo1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo7([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo13([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo10([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.NonInstituteClauses,
  //         ]);

  //         setexpo2([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost.CommonClauses,
  //         ]);
  //         setexpo5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost.CommonClauses,
  //         ]);
  //         setexpo8([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
  //             .CommonClauses,
  //         ]);
  //         setexpo14([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost.CommonClauses,
  //         ]);
  //         setexpo11([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.CommonClauses,
  //         ]);

  //         setimpo2([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo8([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo14([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo11([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost
  //             .InlandTransitClauses,
  //         ]);

  //         setinpo2([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo8([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo14([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo11([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost
  //             .NonInstituteClauses,
  //         ]);

  //         setexpo3([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
  //             .CommonClauses,
  //         ]);
  //         setexpo6([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
  //             .CommonClauses,
  //         ]);
  //         setexpo9([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
  //             .CommonClauses,
  //         ]);
  //         setexpo15([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
  //             .CommonClauses,
  //         ]);
  //         setexpo12([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost.CommonClauses,
  //         ]);

  //         setimpo3([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo6([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo9([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo15([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
  //             .InlandTransitClauses,
  //         ]);
  //         setimpo12([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
  //             .InlandTransitClauses,
  //         ]);

  //         setinpo3([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo6([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo9([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo15([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
  //             .NonInstituteClauses,
  //         ]);
  //         setinpo12([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
  //             .NonInstituteClauses,
  //         ]);

  //         setallair7([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.CommonClauses,
  //         ]);
  //         setinpo17([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.NonInstituteClauses,
  //         ]);
  //         setinpo16([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.InlandTransitClauses,
  //         ]);

  //         setallair9([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.CommonClauses,
  //         ]);
  //         setallair10([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.NonInstituteClauses,
  //         ]);
  //         setallair28([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.InlandTransitClauses,
  //         ]);
  //         setinst1([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].air.InstituteClauses,
  //         ]);
  //         setinst2([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].air.InstituteClauses,
  //         ]);
  //         setinst3([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.InstituteClauses,
  //         ]);
  //         setinst4([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.InstituteClauses,
  //         ]);
  //         setinst5([
  //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.InstituteClauses,
  //         ]);
  //         setinst6([
  //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.InstituteClauses,
  //         ]);
  //         setPolicyDto(result.data[0]);
  //         setLoader(false);
  //       } else {
  //         setdisplayflag(false);
  //         setCreateProfile(true);
  //         setCustomflag(false);
  //         setLoader(false);
  //       }
  //     });
  //   }
  //   // }
  // };
  const handleprofiletypes = async () => {
    const FetchBranchCode1 = {
      LongDesc: PolicyDto.BranchName,
    };
    const BranchCodes1 = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=872&MasterType=MasBranch`,
      FetchBranchCode1
    );
    console.log("BranchCodes", BranchCodes1);
    PolicyDto.BranchCode = BranchCodes1.data[0].mID;
    setPolicyDto(() => ({
      ...PolicyDto,
    }));
    if (PolicyDto.ProfileTypee === "") {
      // setFlag(true);
      swal({
        icon: "error",
        text: "Please Select Profile Type",
        buttons: "OK",
      });
    } else if (PolicyDto.ProfileTypee === "CommonCustom Profile") {
      setLoader(true);
      await fetchProfile(
        PolicyDto.AgentCode,
        PolicyDto.UserName,
        PolicyDto.BranchName,
        // PolicyDto.ProfileTypee,
        "Custom Profile",
        PolicyDto.BranchCode
      ).then((result) => {
        console.log("profileinformation1", result);
        if (result.data.length === 1) {
          setSelected2(result.data[0].ModeOfTransit1);
          setdisplayflag(false);
          setupdateflag(true);
          // setdisplay1(true);
          // setdisplay1(true);
          setSelected(result.data[0].TypeOfPolicy);
          setSelected3(result.data[0].BasisOfValuation);
          setSelected4(result.data[0].Risk);
          setall(result.data[0].CargoType);
          setall1(result.data[0].FromCountry);
          setall2(result.data[0].ToCountry);
          setallair(result.data[0].clauses[0]["Marine Specific Voyage Import"].air.CommonClauses);

          setallair2(result.data[0].clauses[0]["Marine Specific Voyage Export"].air.CommonClauses);
          setallair12(result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.CommonClauses);
          setallair5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].air
              .NonInstituteClauses,
          ]);
          setallair3([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].air.NonInstituteClauses,
          ]);
          setallair4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].air.NonInstituteClauses,
          ]);
          setallair5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].air
              .NonInstituteClauses,
          ]);
          setallair13([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.NonInstituteClauses,
          ]);

          setexpo1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses,
          ]);
          setinpo1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
              .NonInstituteClauses,
          ]);
          setallsea([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.CommonClauses,
          ]);

          setallsea3([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.NonInstituteClauses,
          ]);
          setallsea1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.CommonClauses,
          ]);

          setallsea4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.NonInstituteClauses,
          ]);
          setallsea2([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].sea.CommonClauses,
          ]);

          setallsea15([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].sea
              .NonInstituteClauses,
          ]);

          setallsea6([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.CommonClauses,
          ]);

          setallsea7([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.NonInstituteClauses,
          ]);

          setallair15([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
              .CommonClauses,
          ]);
          setallair17([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
              .CommonClauses,
          ]);
          setallair19([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
              .CommonClauses,
          ]);
          setallair14([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
              .CommonClauses,
          ]);
          setallair21([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
              .CommonClauses,
          ]);

          setallair23([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
              .InlandTransitClauses,
          ]);
          setallair24([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
              .InlandTransitClauses,
          ]);
          setallair25([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
              .InlandTransitClauses,
          ]);
          setallair26([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
              .InlandTransitClauses,
          ]);
          setallair27([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
              .InlandTransitClauses,
          ]);

          setallair16([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
              .NonInstituteClauses,
          ]);
          setallair18([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
              .NonInstituteClauses,
          ]);
          setallair20([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
              .NonInstituteClauses,
          ]);
          setallair8([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
              .NonInstituteClauses,
          ]);
          setallair22([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
              .NonInstituteClauses,
          ]);

          setexpo1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses,
          ]);
          setexpo4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier.CommonClauses,
          ]);
          setexpo7([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier.CommonClauses,
          ]);
          setexpo13([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier.CommonClauses,
          ]);
          setexpo10([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.CommonClauses,
          ]);

          setimpo1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
              .InlandTransitClauses,
          ]);
          setimpo4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier
              .InlandTransitClauses,
          ]);
          setimpo7([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
              .InlandTransitClauses,
          ]);
          setimpo13([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier
              .InlandTransitClauses,
          ]);
          setimpo10([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.InlandTransitClauses,
          ]);

          setinpo1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
              .NonInstituteClauses,
          ]);
          setinpo4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier
              .NonInstituteClauses,
          ]);
          setinpo7([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
              .NonInstituteClauses,
          ]);
          setinpo13([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier
              .NonInstituteClauses,
          ]);
          setinpo10([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.NonInstituteClauses,
          ]);

          setexpo2([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost.CommonClauses,
          ]);
          setexpo5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost.CommonClauses,
          ]);
          setexpo8([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
              .CommonClauses,
          ]);
          setexpo14([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost.CommonClauses,
          ]);
          setexpo11([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.CommonClauses,
          ]);

          setimpo2([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
              .InlandTransitClauses,
          ]);
          setimpo5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
              .InlandTransitClauses,
          ]);
          setimpo8([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
              .InlandTransitClauses,
          ]);
          setimpo14([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
              .InlandTransitClauses,
          ]);
          setimpo11([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost
              .InlandTransitClauses,
          ]);

          setinpo2([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
              .NonInstituteClauses,
          ]);
          setinpo5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
              .NonInstituteClauses,
          ]);
          setinpo8([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
              .NonInstituteClauses,
          ]);
          setinpo14([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
              .NonInstituteClauses,
          ]);
          setinpo11([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost
              .NonInstituteClauses,
          ]);

          setexpo3([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
              .CommonClauses,
          ]);
          setexpo6([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
              .CommonClauses,
          ]);
          setexpo9([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
              .CommonClauses,
          ]);
          setexpo15([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
              .CommonClauses,
          ]);
          setexpo12([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost.CommonClauses,
          ]);

          setimpo3([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
              .InlandTransitClauses,
          ]);
          setimpo6([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
              .InlandTransitClauses,
          ]);
          setimpo9([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
              .InlandTransitClauses,
          ]);
          setimpo15([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
              .InlandTransitClauses,
          ]);
          setimpo12([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
              .InlandTransitClauses,
          ]);

          setinpo3([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
              .NonInstituteClauses,
          ]);
          setinpo6([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
              .NonInstituteClauses,
          ]);
          setinpo9([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
              .NonInstituteClauses,
          ]);
          setinpo15([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
              .NonInstituteClauses,
          ]);
          setinpo12([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
              .NonInstituteClauses,
          ]);

          setallair7([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.CommonClauses,
          ]);
          setinpo17([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.NonInstituteClauses,
          ]);
          setinpo16([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.InlandTransitClauses,
          ]);

          setallair9([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.CommonClauses,
          ]);
          setallair10([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.NonInstituteClauses,
          ]);
          setallair28([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.InlandTransitClauses,
          ]);
          setinst1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].air.InstituteClauses,
          ]);
          setinst2([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].air.InstituteClauses,
          ]);
          setinst3([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.InstituteClauses,
          ]);
          setinst4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.InstituteClauses,
          ]);
          setinst5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.InstituteClauses,
          ]);
          setinst6([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.InstituteClauses,
          ]);
          setPolicyDto(result.data[0]);
          setLoader(false);
        } else {
          setdisplayflag(false);
          setCreateProfile(true);
          setCustomflag(false);
          setLoader(false);
        }
      });
    } else if (
      PolicyDto.ProfileTypee === "Custom Profile" ||
      PolicyDto.ProfileTypee === "Common Profile"
    ) {
      setLoader(true);
      await fetchProfile(
        PolicyDto.AgentCode,
        PolicyDto.UserName,
        PolicyDto.BranchName,
        PolicyDto.ProfileTypee,
        PolicyDto.BranchCode
      ).then((result) => {
        console.log("profileinformation1", result);
        if (result.data.length === 1) {
          setSelected2(result.data[0].ModeOfTransit1);
          setdisplayflag(false);
          setupdateflag(true);
          // setdisplay1(true);
          // setdisplay1(true);
          setSelected(result.data[0].TypeOfPolicy);
          setSelected3(result.data[0].BasisOfValuation);
          setSelected4(result.data[0].Risk);
          setall(result.data[0].CargoType);
          setall1(result.data[0].FromCountry);
          setall2(result.data[0].ToCountry);
          setallair(result.data[0].clauses[0]["Marine Specific Voyage Import"].air.CommonClauses);

          setallair2(result.data[0].clauses[0]["Marine Specific Voyage Export"].air.CommonClauses);
          setallair12(result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.CommonClauses);
          setallair5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].air
              .NonInstituteClauses,
          ]);
          setallair3([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].air.NonInstituteClauses,
          ]);
          setallair4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].air.NonInstituteClauses,
          ]);
          setallair5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].air
              .NonInstituteClauses,
          ]);
          setallair13([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.NonInstituteClauses,
          ]);

          setexpo1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses,
          ]);
          setinpo1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
              .NonInstituteClauses,
          ]);
          setallsea([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.CommonClauses,
          ]);

          setallsea3([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.NonInstituteClauses,
          ]);
          setallsea1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.CommonClauses,
          ]);

          setallsea4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.NonInstituteClauses,
          ]);
          setallsea2([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].sea.CommonClauses,
          ]);

          setallsea15([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].sea
              .NonInstituteClauses,
          ]);

          setallsea6([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.CommonClauses,
          ]);

          setallsea7([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.NonInstituteClauses,
          ]);

          setallair15([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
              .CommonClauses,
          ]);
          setallair17([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
              .CommonClauses,
          ]);
          setallair19([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
              .CommonClauses,
          ]);
          setallair14([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
              .CommonClauses,
          ]);
          setallair21([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
              .CommonClauses,
          ]);

          setallair23([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
              .InlandTransitClauses,
          ]);
          setallair24([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
              .InlandTransitClauses,
          ]);
          setallair25([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
              .InlandTransitClauses,
          ]);
          setallair26([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
              .InlandTransitClauses,
          ]);
          setallair27([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
              .InlandTransitClauses,
          ]);

          setallair16([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
              .NonInstituteClauses,
          ]);
          setallair18([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
              .NonInstituteClauses,
          ]);
          setallair20([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
              .NonInstituteClauses,
          ]);
          setallair8([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
              .NonInstituteClauses,
          ]);
          setallair22([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
              .NonInstituteClauses,
          ]);

          setexpo1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses,
          ]);
          setexpo4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier.CommonClauses,
          ]);
          setexpo7([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier.CommonClauses,
          ]);
          setexpo13([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier.CommonClauses,
          ]);
          setexpo10([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.CommonClauses,
          ]);

          setimpo1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
              .InlandTransitClauses,
          ]);
          setimpo4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier
              .InlandTransitClauses,
          ]);
          setimpo7([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
              .InlandTransitClauses,
          ]);
          setimpo13([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier
              .InlandTransitClauses,
          ]);
          setimpo10([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.InlandTransitClauses,
          ]);

          setinpo1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
              .NonInstituteClauses,
          ]);
          setinpo4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier
              .NonInstituteClauses,
          ]);
          setinpo7([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
              .NonInstituteClauses,
          ]);
          setinpo13([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier
              .NonInstituteClauses,
          ]);
          setinpo10([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.NonInstituteClauses,
          ]);

          setexpo2([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost.CommonClauses,
          ]);
          setexpo5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost.CommonClauses,
          ]);
          setexpo8([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
              .CommonClauses,
          ]);
          setexpo14([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost.CommonClauses,
          ]);
          setexpo11([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.CommonClauses,
          ]);

          setimpo2([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
              .InlandTransitClauses,
          ]);
          setimpo5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
              .InlandTransitClauses,
          ]);
          setimpo8([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
              .InlandTransitClauses,
          ]);
          setimpo14([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
              .InlandTransitClauses,
          ]);
          setimpo11([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost
              .InlandTransitClauses,
          ]);

          setinpo2([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
              .NonInstituteClauses,
          ]);
          setinpo5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
              .NonInstituteClauses,
          ]);
          setinpo8([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
              .NonInstituteClauses,
          ]);
          setinpo14([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
              .NonInstituteClauses,
          ]);
          setinpo11([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost
              .NonInstituteClauses,
          ]);

          setexpo3([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
              .CommonClauses,
          ]);
          setexpo6([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
              .CommonClauses,
          ]);
          setexpo9([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
              .CommonClauses,
          ]);
          setexpo15([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
              .CommonClauses,
          ]);
          setexpo12([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost.CommonClauses,
          ]);

          setimpo3([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
              .InlandTransitClauses,
          ]);
          setimpo6([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
              .InlandTransitClauses,
          ]);
          setimpo9([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
              .InlandTransitClauses,
          ]);
          setimpo15([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
              .InlandTransitClauses,
          ]);
          setimpo12([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
              .InlandTransitClauses,
          ]);

          setinpo3([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
              .NonInstituteClauses,
          ]);
          setinpo6([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
              .NonInstituteClauses,
          ]);
          setinpo9([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
              .NonInstituteClauses,
          ]);
          setinpo15([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
              .NonInstituteClauses,
          ]);
          setinpo12([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
              .NonInstituteClauses,
          ]);

          setallair7([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.CommonClauses,
          ]);
          setinpo17([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.NonInstituteClauses,
          ]);
          setinpo16([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.InlandTransitClauses,
          ]);

          setallair9([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.CommonClauses,
          ]);
          setallair10([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.NonInstituteClauses,
          ]);
          setallair28([
            ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.InlandTransitClauses,
          ]);
          setinst1([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].air.InstituteClauses,
          ]);
          setinst2([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].air.InstituteClauses,
          ]);
          setinst3([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.InstituteClauses,
          ]);
          setinst4([
            ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.InstituteClauses,
          ]);
          setinst5([
            ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.InstituteClauses,
          ]);
          setinst6([
            ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.InstituteClauses,
          ]);
          setPolicyDto(result.data[0]);
          setLoader(false);
        } else {
          setdisplayflag(false);
          setCreateProfile(true);
          setCustomflag(false);
          setLoader(false);
        }
      });
    } else {
      setdisplayflag(false);
      setCreateProfile(true);
      setCustomflag(false);
      setLoader(false);
    }
  };
  const searchbyuid = async () => {
    if (PolicyDto.UserName === "" || PolicyDto.BranchName === "" || PolicyDto.BranchName === null) {
      // setFlag(true);
      swal({
        icon: "error",
        text: "Please Enter the Required fields",
        buttons: "OK",
      });
    } else {
      await fetchuser(`${PolicyDto.UserName}`).then(async (result1) => {
        console.log("profileinformation1", result1);
        if (result1 !== null) {
          if (PolicyDto.UserName === "" || PolicyDto.BranchName === "") {
            setFlag(true);
            swal({
              icon: "error",
              text: "Please Enter the Required fields",
              buttons: "OK",
            });
          } else {
            // debugger;
            setLoader(true);
            await fetchProfile(
              PolicyDto.AgentCode,
              PolicyDto.UserName,
              PolicyDto.BranchName,
              "",
              ""
            ).then((result) => {
              console.log("profileinformation1", result);
              if (result.data.length !== 0) {
                // debugger;
                if (result.data[0].ProfileTypee !== "Common Profile") {
                  setdisplayflag2(false);
                  setdisplay1(false);
                  const newData = result.data[0];
                  newData.BranchName = PolicyDto.BranchName;
                  newData.AgentCode = PolicyDto.AgentCode;
                  newData.UserName = PolicyDto.UserName;
                  newData.ProfileNumber = PolicyDto.ProfileNumber;
                  // newData.BranchCode = PolicyDto.BranchCode;
                  newData.ProfileType = [];
                  newData.ProfileTypee = "";
                  setPolicyDto({ ...newData });
                  console.log("searchjson", PolicyDto);
                } else {
                  setdisplayflag2(false);
                  setdisplay1(false);
                  const newData = result.data[0];
                  newData.BranchName = PolicyDto.BranchName;
                  newData.AgentCode = PolicyDto.AgentCode;
                  newData.UserName = PolicyDto.UserName;
                  // newData.ProfileNumber = PolicyDto.ProfileNumber;
                  // newData.BranchCode = PolicyDto.BranchCode;
                  newData.ProfileType = [];
                  newData.ProfileTypee = "";
                  setPolicyDto({ ...newData });
                  console.log("searchjson", PolicyDto);
                }
                setLoader(false);
              } else {
                swal({
                  text: "Kindly create a new profile as there is no existing profile mapped to this IMD & Branch",
                  html: false,
                  buttons: "Create Profile",
                  icon: MarineProfileCreation,
                }).then(() => {
                  setdisplay1(false);
                });
              }
            });
          }
        } else {
          swal({
            icon: "error",
            text: "Please Enter Valid UserName",
            buttons: "OK",
          });
        }
      });
    }
  };

  const callSaveprofile1 = async () => {
    const FetchBranchName = {
      AgentCode: PolicyDto.AgentCode,
    };
    const BranchNames = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=872&MasterType=BranchName`,
      FetchBranchName
    );
    console.log("BranchNames123", BranchNames);
    const mIDValues = BranchNames.data.filter((item) => item.mValue === PolicyDto.BranchName);
    console.log("mID values:", mIDValues);
    const uniqueProfileNo = new Set();
    if (Array.isArray(mIDValues) && mIDValues.length > 0) {
      mIDValues.forEach((row) => {
        uniqueProfileNo.add(row.ProfileNo);
      });
      const uniqueProfileNoArray = Array.from(uniqueProfileNo);
      console.log("uniqueProfileNo1254", uniqueProfileNoArray);
      PolicyDto.ProfileNumber = uniqueProfileNoArray.toString();
      setPolicyDto(() => ({
        ...PolicyDto,
      }));
    }
    const obj = {
      AgentCode: PolicyDto.AgentCode,
      UserName: PolicyDto.UserName,
      BranchName: PolicyDto.BranchName,
      ProfileNumber: PolicyDto.ProfileNumber,
    };
    console.log("111", PolicyDto);
    if (
      (PolicyDto.TypeOfPolicy.includes("Marine Specific Voyage Import") === true &&
        PolicyDto.ModeOfTransit1[0].mvalue.length <= 0) ||
      (PolicyDto.TypeOfPolicy.includes("Marine Specific Voyage Export") === true &&
        PolicyDto.ModeOfTransit1[1].mvalue.length <= 0) ||
      (PolicyDto.TypeOfPolicy.includes("Marine Specific Voyage Inland") === true &&
        PolicyDto.ModeOfTransit1[3].mvalue.length <= 0) ||
      (PolicyDto.TypeOfPolicy.includes("Marine Specifc Voyage Duty") === true &&
        PolicyDto.ModeOfTransit1[4].mvalue.length <= 0)
    ) {
      setFlag(true);
      setmodeFlag(true);
      swal({
        icon: "error",
        text: "Please Select Mode of Transit",
        buttons: "OK",
      });
    } else if (
      PolicyDto.MaximumSumInsured === "" ||
      PolicyDto.MinimumRate === "" ||
      PolicyDto.MinimumPremium === "" ||
      PolicyDto.Markup === "" ||
      PolicyDto.Excess === "" ||
      PolicyDto.BackDate === "" ||
      PolicyDto.TypeOfPolicy.length === 0 ||
      PolicyDto.CargoType.length === 0 ||
      PolicyDto.FromCountry.length === 0 ||
      PolicyDto.ToCountry.length === 0 ||
      PolicyDto.BasisOfValuation.length === 0
    ) {
      setFlag(true);
      swal({
        icon: "error",
        text: "Please Enter the Required fields",
        buttons: "OK",
      });
    } else {
      if (PolicyDto.ProfileTypee === "Common Profile") {
        delete PolicyDto.BranchName;
        delete PolicyDto.UserName;
        delete PolicyDto.AgentCode;
        delete PolicyDto.ProfileNumber;
        delete PolicyDto.BranchCode;
        setPolicyDto({ ...PolicyDto });
      } else {
        PolicyDto.ProfileType = selectedProfile;
        setPolicyDto({ ...PolicyDto });
      }
      setFlag(false);
      setmodeFlag(false);
      await Saveprofile(
        obj.AgentCode,
        obj.UserName,
        obj.BranchName,
        obj.ProfileNumber,
        PolicyDto
      ).then((result) => {
        console.log("111", PolicyDto);
        console.log("Policy issued", result);
        if (result.status === 200) {
          if (envId === "1") {
            swal({
              text: "Profile Updated Successfully",
              html: true,
              icon: "success",
              buttons: "ok",
            }).then(() => window.location.replace(`https://agencyforce.universalsompo.com/`));
          } else {
            swal({
              text: "Profile Updated Successfully",
              html: true,
              icon: "success",
              buttons: "ok",
            }).then(() =>
              window.location.replace(`https://uatagency.universalsompo.com/Home/Dashboard`)
            );
          }
        }
      });
    }
    console.log("1111", modeflag);
  };

  console.log(PolicyDto);

  const handleInput = async (e) => {
    setBranch([]);
    // const handleInput = (e) => {
    if (
      // e.target.name === "UserName" ||
      e.target.name === "Total Packages" ||
      e.target.name === "Weight of Goods" ||
      e.target.name === "AdditionalCondition" ||
      e.target.name === "SpecialConditionExclusion" ||
      e.target.name === "BackDate"
    ) {
      console.log("&&&&");
      PolicyDto[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...PolicyDto,
      }));
    } else if (e.target.name === "UserName") {
      PolicyDto[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...PolicyDto,
      }));

      if (PolicyDto.UserName !== "") {
        await fetchuser(`${PolicyDto.UserName}`).then(async (result) => {
          console.log("123456789result", result, result.data.partnerId);
          const partnerDetailssss = result.data.additionalDetails;
          console.log("123456789", partnerDetailssss);
          const partnerDetail = JSON.parse(partnerDetailssss);
          PolicyDto.AgentCode = partnerDetail.AdditionalDetails.IntermediaryCode;
          // PolicyDto.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
          setPolicyDto(() => ({
            ...PolicyDto,
          }));
          const FetchBranchName = {
            AgentCode: PolicyDto.AgentCode,
          };
          const res = await postRequest(
            `Product/GetProdPartnermasterData?ProductId=872&MasterType=BranchName`,
            FetchBranchName
          );
          console.log("BranchDropDown", res.data);
          const uniqueBranches = new Set();
          if (Array.isArray(res.data) && res.data.length > 0) {
            res.data.forEach((row) => {
              uniqueBranches.add(row.mValue);
            });
            setBranch([...uniqueBranches]);
            console.log("BranchDropDown123", Branch);
          }
        });
      } else {
        setBranch([]);
      }
    } else if (
      e.target.name === "MinimumPremium" ||
      e.target.name === "MaximumSumInsured" ||
      // e.target.name === "MinimumRate" ||
      e.target.name === "Markup" ||
      e.target.name === "Excess"
    ) {
      const mobileRegex = /^[0-9]*$/;
      // const mobileRegex = /^[0-9]*(?:\.[0-9]{0,4})?$/;
      if (mobileRegex.test(e.target.value)) {
        PolicyDto[e.target.name] = e.target.value;
      } else {
        PolicyDto[e.target.name] = "";
      }
      setPolicyDto((prevState) => ({
        ...prevState,
        ...PolicyDto,
      }));
    } else if (e.target.name === "MinimumRate") {
      const mobileRegex = /^[0-9]*(?:\.[0-9]{0,8})?$/;
      if (mobileRegex.test(e.target.value)) {
        PolicyDto[e.target.name] = e.target.value;
      }
      setPolicyDto((prevState) => ({
        ...prevState,
        ...PolicyDto,
      }));
    }
  };

  const handelAutoSelect = (selectedvalue, type) => {
    let Autoflag = false;
    if (type === "CargoType") {
      all.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "FromCountry") {
      all1.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    } else if (type === "ToCountry") {
      all2.forEach((x) => {
        if (x.mID === selectedvalue.mID) Autoflag = true;
      });
    }
    return Autoflag;
  };

  const handleselectall1 = (e, type, value) => {
    console.log(e, "reason");
    console.log(value, "reason");
    console.log(type, "reason");
    console.log(e.target.checked, "reason");
    let cargoflag = false;

    const strArr = value.map((obj) => JSON.stringify(obj));
    const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
    console.log(uniq, "reasonuniq");
    if (uniq.length !== value.length) {
      uniq.map((col) => {
        if (col.mValue === value[value.length - 1].mValue) {
          const index = uniq.indexOf(col);
          uniq.splice(index, 1);
          console.log(uniq, index, "reasontarr");
          console.log(uniq, index, value[value.length - 1], "reasontarr");
        }
        return null;
      });
    }

    uniq.map((col) => {
      if (col.mValue === "Select All") {
        console.log("reasoncargo", col.mValue);
        cargoflag = true;
      }
      return null;
    });
    console.log(cargoflag, "reasoncargo");
    if (cargoflag === true) {
      if (e.target.checked === true) {
        setall(CargoTypee);
        console.log("push all", all);
      } else {
        const tarr = [...uniq];
        tarr.shift();
        setall(tarr);
        console.log("rmove all", all);
      }
    } else if (cargoflag === false) {
      if (e.target.checked === true) {
        if (uniq.length === 81) {
          setall(CargoTypee);
        } else {
          setall(uniq);
        }
        console.log("push all", all);
      } else if (uniq.length === 81 && uniq[0].mID !== 0) {
        setall([]);
        console.log("rmove all", all);
      } else {
        setall(uniq);
      }
    }
    setPolicyDto(() => ({
      ...PolicyDto,
      CargoType: all,
    }));
  };

  const handleselectall2 = (e, type, value) => {
    console.log(e, "reason");
    console.log(value, "reason");
    console.log(type, "reason");
    console.log(e.target.checked, "reason");

    const strArr = value.map((obj) => JSON.stringify(obj));
    const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
    console.log(uniq, "reasonuniq");

    if (uniq.length !== value.length) {
      uniq.map((col) => {
        if (col.mValue === value[value.length - 1].mValue) {
          const index = uniq.indexOf(col);
          uniq.splice(index, 1);
          console.log(uniq, index, "reasontarr");
          console.log(uniq, index, value[value.length - 1], "reasontarr");
        }
        return null;
      });
    }

    let tcountryflag = false;
    uniq.map((col) => {
      if (col.mValue === "Select All") {
        console.log("reasoncargo", col.mValue);
        tcountryflag = true;
      }
      return null;
    });
    console.log(tcountryflag, "reasoncargo");
    if (tcountryflag === true) {
      if (e.target.checked === true) {
        setall1(Country);
        console.log("push all", all1);
      } else {
        const tarr = [...uniq];
        tarr.shift();
        setall1(tarr);
        console.log("rmove all", all1);
      }
    } else if (tcountryflag === false) {
      if (e.target.checked === true) {
        if (uniq.length === 227) {
          setall1(Country);
        } else {
          setall1(uniq);
        }
        console.log("push all", all1);
      } else if (uniq.length === 227 && uniq[0].mID !== 0) {
        setall1([]);
        console.log("rmove all", all1);
      } else {
        setall1(uniq);
        console.log("rmove all1", all1, uniq);
      }
    }
    setPolicyDto(() => ({
      ...PolicyDto,
      FromCountry: all1,
    }));
  };

  const handleselectall = (e, type, value) => {
    console.log(e, "reason");
    console.log(value, "reason");
    console.log(type, "reason");
    console.log(e.target.checked, "reason");
    let tcountryflag = false;

    const strArr = value.map((obj) => JSON.stringify(obj));
    const uniq = [...new Set(strArr)].map((u) => JSON.parse(u));
    console.log(uniq, "reasonuniq");
    if (uniq.length !== value.length) {
      uniq.map((col) => {
        if (col.mValue === value[value.length - 1].mValue) {
          const index = uniq.indexOf(col);
          uniq.splice(index, 1);
          console.log(uniq, index, "reasontarr");
          console.log(uniq, index, value[value.length - 1], "reasontarr");
        }
        return null;
      });
    }

    uniq.map((col) => {
      if (col.mValue === "Select All") {
        console.log("reasoncargo", col.mValue);
        tcountryflag = true;
      }
      return null;
    });
    console.log(tcountryflag, "reasoncargo");
    if (tcountryflag === true) {
      if (e.target.checked === true) {
        setall2(Country);
        console.log("push all", all);
      } else {
        const tarr = [...uniq];
        tarr.shift();
        setall2(tarr);
        console.log("rmove all", all);
      }
    } else if (tcountryflag === false) {
      if (e.target.checked === true) {
        if (uniq.length === 227) {
          setall2(Country);
        } else {
          setall2(uniq);
        }
        console.log("push all", all2);
      } else if (uniq.length === 227 && uniq[0].mID !== 0) {
        setall2([]);
        console.log("rmove all", all2);
      } else {
        setall2(uniq);
      }
    }
    setPolicyDto(() => ({
      ...PolicyDto,
      ToCountry: all2,
    }));
  };

  const handleSetAutoComplete = async (e, value, name) => {
    console.log("value", value);
    console.log("567", name);
    if (name === "BranchName") {
      PolicyDto.BranchName = value;
      console.log("BNjson", PolicyDto);
      const FetchBranchName = {
        AgentCode: PolicyDto.AgentCode,
      };
      const FetchBranchCode = {
        LongDesc: PolicyDto.BranchName,
      };
      const BranchNames = await postRequest(
        `Product/GetProdPartnermasterData?ProductId=872&MasterType=BranchName`,
        FetchBranchName
      );
      console.log("BranchNames123", BranchNames);
      const mIDValues = BranchNames.data.filter((item) => item.mValue === value);
      console.log("mID values:", mIDValues);
      const uniqueProfileNo = new Set();
      if (Array.isArray(mIDValues) && mIDValues.length > 0) {
        mIDValues.forEach((row) => {
          uniqueProfileNo.add(row.ProfileNo);
        });
        const uniqueProfileNoArray = Array.from(uniqueProfileNo);
        console.log("uniqueProfileNo", uniqueProfileNoArray);
        PolicyDto.ProfileNumber = uniqueProfileNoArray.toString();
        setPolicyDto(() => ({
          ...PolicyDto,
        }));
      }
      const BranchCodes = await postRequest(
        `Product/GetProdPartnermasterData?ProductId=872&MasterType=MasBranch`,
        FetchBranchCode
      );
      console.log("BranchCodes", BranchCodes);
      PolicyDto.BranchCode = BranchCodes.data[0].mID;
      setPolicyDto(() => ({
        ...PolicyDto,
      }));
      console.log("BNjson", PolicyDto);
    }
    // if (name === "ExistingProfile") {
    //   PolicyDto.ExistingProfile = value;
    //   setPolicyDto(() => ({
    //     ...PolicyDto,
    //   }));
    // }
    // if (value === "Common Profile") {
    //   if (PolicyDto.ExistingProfile === "Common Profile") {
    //     setLoader(true);
    //     await fetchProfile("CommonProfile", "CommonProfile").then((result) => {
    //       console.log("profileinformation1", result);
    //       if (result.data.length !== 0) {
    //         console.log("profileinformation1", result);
    //         setLoader(false);
    //         // setdisplayflag2(true);
    //         setSelected2(result.data[0].ModeOfTransit1);
    //         setExistingProfileflag(true);
    //         setupdateflag(false);
    //         setCreateProfile(true);
    //         setdisplayflag(false);
    //         setdisplay1(false);
    //         setCustomflag(false);
    //         setSelected(result.data[0].TypeOfPolicy);
    //         setSelected3(result.data[0].BasisOfValuation);
    //         setSelected4(result.data[0].Risk);
    //         setall(result.data[0].CargoType);
    //         setall1(result.data[0].FromCountry);
    //         setall2(result.data[0].ToCountry);
    //         setallair(result.data[0].clauses[0]["Marine Specific Voyage Import"].air.CommonClauses);

    //         setallair2(
    //           result.data[0].clauses[0]["Marine Specific Voyage Export"].air.CommonClauses
    //         );
    //         setallair12(result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.CommonClauses);
    //         setallair5([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].air
    //             .NonInstituteClauses,
    //         ]);
    //         setallair3([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].air.NonInstituteClauses,
    //         ]);
    //         setallair4([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].air.NonInstituteClauses,
    //         ]);
    //         setallair5([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].air
    //             .NonInstituteClauses,
    //         ]);
    //         setallair13([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.NonInstituteClauses,
    //         ]);

    //         setexpo1([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses,
    //         ]);
    //         setinpo1([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
    //             .NonInstituteClauses,
    //         ]);
    //         setallsea([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.CommonClauses,
    //         ]);

    //         setallsea3([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.NonInstituteClauses,
    //         ]);
    //         setallsea1([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.CommonClauses,
    //         ]);

    //         setallsea4([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.NonInstituteClauses,
    //         ]);
    //         setallsea2([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].sea.CommonClauses,
    //         ]);

    //         setallsea15([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].sea
    //             .NonInstituteClauses,
    //         ]);

    //         setallsea6([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.CommonClauses,
    //         ]);

    //         setallsea7([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.NonInstituteClauses,
    //         ]);

    //         setallair15([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
    //             .CommonClauses,
    //         ]);
    //         setallair17([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
    //             .CommonClauses,
    //         ]);
    //         setallair19([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
    //             .CommonClauses,
    //         ]);
    //         setallair14([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
    //             .CommonClauses,
    //         ]);
    //         setallair21([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
    //             .CommonClauses,
    //         ]);

    //         setallair23([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
    //             .InlandTransitClauses,
    //         ]);
    //         setallair24([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
    //             .InlandTransitClauses,
    //         ]);
    //         setallair25([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
    //             .InlandTransitClauses,
    //         ]);
    //         setallair26([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
    //             .InlandTransitClauses,
    //         ]);
    //         setallair27([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
    //             .InlandTransitClauses,
    //         ]);

    //         setallair16([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].InlandRailRoadAir
    //             .NonInstituteClauses,
    //         ]);
    //         setallair18([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].InlandRailRoadAir
    //             .NonInstituteClauses,
    //         ]);
    //         setallair20([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].InlandRailRoadAir
    //             .NonInstituteClauses,
    //         ]);
    //         setallair8([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].InlandRailRoadAir
    //             .NonInstituteClauses,
    //         ]);
    //         setallair22([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].InlandRailRoadAir
    //             .NonInstituteClauses,
    //         ]);

    //         setexpo1([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier.CommonClauses,
    //         ]);
    //         setexpo4([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier.CommonClauses,
    //         ]);
    //         setexpo7([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
    //             .CommonClauses,
    //         ]);
    //         setexpo13([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier.CommonClauses,
    //         ]);
    //         setexpo10([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier.CommonClauses,
    //         ]);

    //         setimpo1([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo4([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo7([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo13([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo10([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier
    //             .InlandTransitClauses,
    //         ]);

    //         setinpo1([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].Courier
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo4([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].Courier
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo7([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].Courier
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo13([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].Courier
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo10([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].Courier
    //             .NonInstituteClauses,
    //         ]);

    //         setexpo2([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
    //             .CommonClauses,
    //         ]);
    //         setexpo5([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
    //             .CommonClauses,
    //         ]);
    //         setexpo8([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
    //             .CommonClauses,
    //         ]);
    //         setexpo14([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
    //             .CommonClauses,
    //         ]);
    //         setexpo11([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost.CommonClauses,
    //         ]);

    //         setimpo2([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo5([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo8([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo14([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo11([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost
    //             .InlandTransitClauses,
    //         ]);

    //         setinpo2([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].ParcelPost
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo5([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].ParcelPost
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo8([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].ParcelPost
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo14([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].ParcelPost
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo11([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].ParcelPost
    //             .NonInstituteClauses,
    //         ]);

    //         setexpo3([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
    //             .CommonClauses,
    //         ]);
    //         setexpo6([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
    //             .CommonClauses,
    //         ]);
    //         setexpo9([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
    //             .CommonClauses,
    //         ]);
    //         setexpo15([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
    //             .CommonClauses,
    //         ]);
    //         setexpo12([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
    //             .CommonClauses,
    //         ]);

    //         setimpo3([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo6([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo9([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo15([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
    //             .InlandTransitClauses,
    //         ]);
    //         setimpo12([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
    //             .InlandTransitClauses,
    //         ]);

    //         setinpo3([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].RegisteredPost
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo6([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].RegisteredPost
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo9([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export FOB"].RegisteredPost
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo15([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].RegisteredPost
    //             .NonInstituteClauses,
    //         ]);
    //         setinpo12([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].RegisteredPost
    //             .NonInstituteClauses,
    //         ]);

    //         setallair7([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.CommonClauses,
    //         ]);
    //         setinpo17([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air.NonInstituteClauses,
    //         ]);
    //         setinpo16([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].air
    //             .InlandTransitClauses,
    //         ]);

    //         setallair9([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.CommonClauses,
    //         ]);
    //         setallair10([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea.NonInstituteClauses,
    //         ]);
    //         setallair28([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Inland"].sea
    //             .InlandTransitClauses,
    //         ]);
    //         setinst1([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].air.InstituteClauses,
    //         ]);
    //         setinst2([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].air.InstituteClauses,
    //         ]);
    //         setinst3([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].air.InstituteClauses,
    //         ]);
    //         setinst4([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Import"].sea.InstituteClauses,
    //         ]);
    //         setinst5([
    //           ...result.data[0].clauses[0]["Marine Specific Voyage Export"].sea.InstituteClauses,
    //         ]);
    //         setinst6([
    //           ...result.data[0].clauses[0]["Marine Specifc Voyage Duty"].sea.InstituteClauses,
    //         ]);
    //         // setPolicyDto(result.data[0]);
    //         PolicyDto.AgentCode = "";

    //         PolicyDto.UserName = "";

    //         PolicyDto.BranchCode = "";

    //         setPolicyDto(PolicyDto);
    //       }
    //     });
    //   } else {
    //     setExistingProfileflag(true);
    //     setCustomflag(true);
    //     setdisplay1(false);
    //   }
    // } else if (value === "Custom Profile") {
    //   if (PolicyDto.ExistingProfile === "Custom Profile") {
    //     setExistingProfileflag(true);
    //     setCustomflag(true);
    //     setdisplay1(false);
    //   } else {
    //     setExistingProfileflag(true);
    //     setdisplayflag(false);
    //     setCustomflag(false);
    //     setdisplay1(false);
    //   }
    // }
  };

  // const HandleSelect = (e) => {
  //   const { checked } = e.target;
  //   if (checked) {
  //     console.log("true");
  //   }
  // };

  return (
    <MDBox pt={3}>
      {loader && <MDLoader loader={loader} />}
      <Card>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={3} mb={3}>
          <MDTypography>IMD-Profile Creation</MDTypography>
        </Grid>
        {display1 === true ? (
          <Grid container spacing={1} m={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="User Name"
                name="UserName"
                // disabled
                value={PolicyDto.UserName}
                onChange={handleInput}
                error={PolicyDto.UserName === "" ? flag : null}
              />
              {flag && PolicyDto.UserName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="BranchName"
                name="BranchName"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // value={masterArray.BranchName}
                value={PolicyDto.BranchName}
                disableClearable
                options={Branch || []}
                onChange={(e, value) => handleSetAutoComplete(e, value, "BranchName")}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Branch Name"
                    error={PolicyDto.BranchName === "" ? flag : null}
                    required
                  />
                )}
              />
              {/* <Autocomplete
                id="BranchName"
                name="BranchName"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={PolicyDto.BranchName}
                options={Branch || []}
                onChange={(e, value) => handleSetAutoComplete(e, value, "BranchName")}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Branch Name"
                    error={PolicyDto.BranchName === "" ? flag : null}
                    required
                  />
                )}
              /> */}
              {/* <MDInput
                label="Branch Name"
                name="BranchName"
                value={PolicyDto.BranchName}
                // disabled
                onChange={handleInput}
                error={PolicyDto.BranchName === "" ? flag : null}
              /> */}
              {flag && PolicyDto.BranchName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>

            <Grid ml={4} m="10px">
              {/* <MDButton onClick={callFetchprofile}>Search</MDButton> */}
              <MDButton onClick={searchbyuid}>Search</MDButton>
            </Grid>
            <Grid m="8px">
              <MDButton onClick={clear} variant="outlined" mr={7}>
                Clear
              </MDButton>
            </Grid>
          </Grid>
        ) : null}
        {/* {createprofile === true ? (
          <Grid container spacing={1} m={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                disabled
                id="CommonProfile"
                name="CommonProfile"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={PolicyDto.CommonProfile}
                options={["Common Profile"]}
                // options={CommonProfile}
                onChange={(e, value) => handleSetAutoComplete(e, "CommonProfile", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Existing Profile"
                    required
                    disabled
                    sx={redAsterisk}
                    error={PolicyDto.CommonProfile === "" ? flag : null}
                  />
                )}
              />
              {/* {flag && PolicyDto.CommonProfile === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please Select the Common Profile
                </MDTypography>
              ) : null} */}
        {/* </Grid> */}
        {/* {createprofile === true ? (
          <Grid container spacing={1} m={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="User Name"
                name="UserName"
                // disabled
                value={PolicyDto.UserName}
                onChange={handleInput}
                error={PolicyDto.UserName === "" ? flag : null}
              />
              {flag && PolicyDto.UserName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Branch Name"
                name="BranchName"
                value={PolicyDto.BranchName}
                // disabled
                onChange={handleInput}
                // error={PolicyDto.BranchName === "" ? flag : null}
              />
              {/* {flag && PolicyDto.BranchName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null} */}
        {/* </Grid> */}

        {/* <Grid ml={4} m="10px">
              <MDButton onClick={callCommonProfile}>Create Profile</MDButton>
            </Grid> */}
        {/* <Grid m="8px">
              <MDButton onClick={clear} variant="outlined" mr={7}>
                Clear
              </MDButton>
            </Grid> */}
        {/* </Grid> */}
        {/* ) : null} */}
        {/* {ExistingProfileflag === true ? (
          <Grid container spacing={1} m={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="User Name"
                name="UserName"
                disabled={PolicyDto.UserName !== ""}
                value={PolicyDto.UserName}
                // onChange={handleInput}
                error={PolicyDto.UserName === "" ? flag : null}
              /> */}
        {/* {flag && PolicyDto.UserName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid> */}

        {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                disabled
                id="BranchName"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={PolicyDto.BranchName} */}
        {/* // options={["Branch1", "Branch2", "Branch3"]}
                // onChange={(e, value) => handleSetAutoComplete(e, "BranchName", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Branch Name"
                    error={PolicyDto.BranchName === "" ? flag : null}
                    disabled
                  />
                )}
              /> */}
        {/* {flag && PolicyDto.BranchName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Agent Code/Name"
                name="AgentCode"
                value={PolicyDto.AgentCode}
                // onChange={handleInput}
                disabled={PolicyDto.AgentCode !== ""}
              /> */}
        {/* </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Branch Code/Name"
                sx={{ width: "240px" }}
                value={PolicyDto.BranchCode}
                disabled
                //   name="PAN"
                //   value={PolicyDto.ProposalData.PAN}
                //   onChange={handleSetProposer}
              />
            </Grid> */}
        {/* 
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="ExistingProfile"
                name="ExistingProfile"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={PolicyDto.ExistingProfile}
                options={["Common Profile", "Custom Profile"]}
                onChange={(e, value) => handleSetAutoComplete(e, value, "ExistingProfile")}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Profile Type"
                    // error={PolicyDto.ExistingProfile === "" ? flag : null}
                  />
                )} */}
        {/* />
              {/* {flag && PolicyDto.CommonProfile === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please Select the Common Profile
                </MDTypography>
              ) : null} */}
        {/* </Grid> */}
        {/* </Grid>
        ) : null} */}
        {customflag === true ? (
          <Grid container direction="row " ml={-10}>
            <Grid item md={12} lg={12} xl={12} xxl={12} ml={12}>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Type Of Policy
                  </MDTypography>
                  {flag && PolicyDto.TypeOfPolicy.length <= 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", ml: "10px" }}>
                      Please select type of policy
                    </MDTypography>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
                      <Checkbox value="all" onChange={handleChange} checked={isAllSelected} />
                      <span> Select All</span>
                    </Grid>
                    {listItem}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Mode of Transit
                  </MDTypography>
                  <Alert severity="info" sx={{ ml: "23px", mt: "-14px" }}>
                    Please select atleast one mode of transit under each selected Type Of Policy
                  </Alert>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    {PolicyDto.TypeOfPolicy.map((x) => (
                      <>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                          <MDTypography variant="h6">{x}</MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <Grid container spacing={1.5}>
                            {/* {selected2.forEach((rowq, jj) => {
                                if (rowq.mID === x) {
                                  console.log(jj, rowq.mID, x, "index111111");
                                } else console.log(rowq.mID, x, "index111111no");
                              })} */}

                            {x === "Marine Specific Voyage Inland" ||
                            x === "Marine Specifc Voyage Duty"
                              ? options1.map((option) => (
                                  <Grid
                                    sm={12}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    xxl={4}
                                    sx={{ fontSize: "15px" }}
                                  >
                                    <div key={option}>
                                      <Checkbox
                                        value={option}
                                        onChange={(e, value) => handleChange1(e, option, x, value)}
                                        checked={handlemodeoftransit(x, option)}

                                        // checked={selected2[i].mvalue.includes(option)}
                                      />
                                      <span>{option}</span>
                                    </div>
                                  </Grid>
                                ))
                              : options5.map((option) => (
                                  <Grid
                                    sm={12}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    xxl={4}
                                    sx={{ fontSize: "15px" }}
                                  >
                                    <div key={option}>
                                      <Checkbox
                                        value={option}
                                        onChange={(e, value) => handleChange1(e, option, x, value)}
                                        checked={handlemodeoftransit(x, option)}

                                        // checked={selected2[i].mvalue.includes(option)}
                                      />
                                      <span>{option}</span>
                                    </div>
                                  </Grid>
                                ))}

                            {/* {listItem1({ x })} */}
                          </Grid>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Cargo Type
                  </MDTypography>
                  {flag && all.length <= 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", ml: "10px" }}>
                      Please select Cargo type{" "}
                    </MDTypography>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {/* <Autocomplete
                          multiple
                          limitTags={5}
                          id="checkboxes-tags-demo"
                          options={CargoTypee}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.mValue}
                          value={all}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                                onChange={(e, value) =>
                                  handleselectall(e, "CargoType", value, option)
                                }
                              />
                              {option.mValue}
                            </li>
                          )}
                          fullWidth
                          renderInput={(params) => (
                            <TextField {...params} label="CargoType" placeholder="Select" />
                          )}
                        /> */}
                      <Autocomplete
                        multiple
                        limitTags={5}
                        id="checkboxes-tags-demo"
                        options={CargoTypee}
                        disableCloseOnSelect
                        value={all}
                        fullWidth
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handleselectall1(e, "CargoType", value)}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={handelAutoSelect(option, "CargoType")}
                            />
                            {option.mValue}
                          </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="CargoType"
                            placeholder="Select"
                            required
                            error={flag && all.length <= 0 ? flag : null}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Basis of Valuation
                  </MDTypography>
                  {flag && PolicyDto.BasisOfValuation.length <= 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", ml: "10px" }}>
                      Please select Basis of Valuation{" "}
                    </MDTypography>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Grid container spacing={1.5}>
                        <Grid sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
                          <Checkbox value="all" onChange={handleChange2} checked={isAllSelected2} />
                          <span> Select All</span>
                        </Grid>
                        {listItem2}
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    From Country
                  </MDTypography>

                  {flag && all1.length <= 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", ml: "10px" }}>
                      Please select From Country{" "}
                    </MDTypography>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      {/* <Autocomplete
                          multiple
                          limitTags={5}
                          id="checkboxes-tags-demo"
                          options={Country1}
                          // disableCloseOnSelect
                          getOptionLabel={(option) => option.mValue}
                          value={all1}
                          renderOption={(props, option) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={all1.includes(option)}
                                onChange={(e, value) =>
                                  handleselectall(e, "FromCountry", value, option)
                                }
                              />
                              {option.mValue}
                            </li>
                          )}
                          // style={{ width: 500 }}
                          fullWidth
                          renderInput={(params) => (
                            <TextField {...params} label="FromCountry" placeholder="Select" />
                          )}
                        /> */}
                      <Autocomplete
                        freeSolo
                        multiple
                        limitTags={5}
                        id="checkboxes-tags-demo"
                        options={Country}
                        disableCloseOnSelect
                        value={all1}
                        fullWidth
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handleselectall2(e, "FromCountry", value)}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={handelAutoSelect(option, "FromCountry")}
                            />
                            {option.mValue}
                          </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="FromCountry"
                            placeholder="Select"
                            required
                            error={flag && all1.length <= 0 ? flag : null}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    To Country
                  </MDTypography>
                  {flag && all2.length <= 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", ml: "10px" }}>
                      Please select To Country{" "}
                    </MDTypography>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      {/* <Autocomplete
                          multiple
                          id="checkboxes-tags-demo"
                          limitTags={5}
                          options={Country1}
                          // disableCloseOnSelect
                          getOptionLabel={(option) => option.mValue}
                          value={all2}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                                onChange={(e, value) =>
                                  handleselectall(e, "ToCountry", value, option)
                                }
                              />
                              {option.mValue}
                            </li>
                          )}
                          // style={{ width: 500 }}
                          fullwidth
                          renderInput={(params) => (
                            <TextField {...params} label="ToCountry" placeholder="Select" />
                          )}
                        /> */}
                      <Autocomplete
                        multiple
                        limitTags={5}
                        id="checkboxes-tags-demo"
                        options={Country}
                        // options={CargoTypee}
                        disableCloseOnSelect
                        value={all2}
                        fullWidth
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handleselectall(e, "ToCountry", value)}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={handelAutoSelect(option, "ToCountry")}
                            />
                            {option.mValue}
                          </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="ToCountry"
                            placeholder="Select"
                            required
                            error={flag && all2.length <= 0 ? flag : null}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Risk
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
                      <Checkbox value="all" onChange={handleChange3} checked={isAllSelected3} />
                      <span> Select All</span>
                    </Grid>
                    {listItem3}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Additional Condition
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDInput
                        label="Enter the Text Here"
                        name="AdditionalCondition"
                        onChange={handleInput}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h6" color="primary">
                        Clauses
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {selected2.map((row1) => (
                        <Grid container>
                          {row1.mvalue.map((row2) => (
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              xxl={12}
                              sx={{ fontSize: "15px", mt: "3px", mr: "10px" }}
                            >
                              {handleClause(
                                PolicyDto,
                                ImportAir,
                                ImportAirc,
                                ImportSea,
                                ImportSeac,
                                ImportRail,
                                ImportRailc,
                                ImportPost,
                                ImportPostc,
                                InlandAir,
                                InlandAirc,
                                InlandSea,
                                InlandSeac,
                                InlandAirt,
                                setInlandAirt,
                                inpo16,
                                setinpo16,
                                allair,
                                setallair,
                                allair2,
                                setallair2,
                                allair12,
                                setallair12,
                                allair3,
                                setallair3,
                                allair4,
                                setallair4,
                                allair5,
                                setallair5,
                                allair13,
                                setallair13,
                                allsea,
                                setallsea,
                                allsea1,
                                setallsea1,
                                allsea2,
                                setallsea2,
                                allsea6,
                                setallsea6,
                                allsea3,
                                setallsea3,
                                allsea4,
                                setallsea4,
                                allsea15,
                                setallsea15,
                                allsea7,
                                setallsea7,
                                allair14,
                                setallair14,
                                allair15,
                                setallair15,
                                allair17,
                                setallair17,
                                allair19,
                                setallair19,
                                allair21,
                                setallair21,
                                allair8,
                                setallair8,
                                allair16,
                                setallair16,
                                allair18,
                                setallair18,
                                allair20,
                                setallair20,
                                allair22,
                                setallair22,
                                allair23,
                                setallair23,
                                allair24,
                                setallair24,
                                allair25,
                                setallair25,
                                allair26,
                                setallair26,
                                allair27,
                                setallair27,
                                expo1,
                                setexpo1,
                                expo2,
                                setexpo2,
                                expo3,
                                setexpo3,
                                expo4,
                                setexpo4,
                                expo5,
                                setexpo5,
                                expo6,
                                setexpo6,
                                expo7,
                                setexpo7,
                                expo8,
                                setexpo8,
                                expo9,
                                setexpo9,
                                expo10,
                                setexpo10,
                                expo11,
                                setexpo11,
                                expo12,
                                setexpo12,
                                expo13,
                                setexpo13,
                                expo14,
                                setexpo14,
                                expo15,
                                setexpo15,
                                impo1,
                                setimpo1,
                                impo2,
                                setimpo2,
                                impo3,
                                setimpo3,
                                impo4,
                                setimpo4,
                                impo5,
                                setimpo5,
                                impo6,
                                setimpo6,
                                impo7,
                                setimpo7,
                                impo8,
                                setimpo8,
                                impo9,
                                setimpo9,
                                impo10,
                                setimpo10,
                                impo11,
                                setimpo11,
                                impo12,
                                setimpo12,
                                impo13,
                                setimpo13,
                                impo14,
                                setimpo14,
                                impo15,
                                setimpo15,
                                inpo1,
                                setinpo1,
                                inpo2,
                                setinpo2,
                                inpo3,
                                setinpo3,
                                inpo4,
                                setinpo4,
                                inpo5,
                                setinpo5,
                                inpo6,
                                setinpo6,
                                inpo7,
                                setinpo7,
                                inpo8,
                                setinpo8,
                                inpo9,
                                setinpo9,
                                inpo10,
                                setinpo10,
                                inpo11,
                                setinpo11,
                                inpo12,
                                setinpo12,
                                inpo13,
                                setinpo13,
                                inpo14,
                                setinpo14,
                                inpo15,
                                setinpo15,
                                allair7,
                                setallair7,
                                inpo17,
                                setinpo17,
                                allair9,
                                setallair9,
                                allair10,
                                setallair10,
                                allair28,
                                setallair28,
                                checked1,
                                setChecked,
                                checked2,
                                setChecked1,
                                inst1,
                                setinst1,
                                inst2,
                                setinst2,
                                inst3,
                                setinst3,
                                inst4,
                                setinst4,
                                inst5,
                                setinst5,
                                inst6,
                                setinst6,
                                setPolicyDto,
                                row1.mID,
                                row2,
                                selected2
                              )}
                            </Grid>
                          ))}
                        </Grid>
                      ))}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h6" color="primary">
                        SI & Premium Validations
                      </MDTypography>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDInput
                          label="Enter the Text Here"
                          name="SpecialConditionExclusion"
                          onChange={handleInput}
                        />
                      </Grid> */}

                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Maximum Sum Insured"
                        onChange={handleInput}
                        name="MaximumSumInsured"
                        required
                        error={PolicyDto.MaximumSumInsured === "" ? flag : null}
                        //   name="PAN"
                        //   value={PolicyDto.ProposalData.PAN}
                        //   onChange={handleSetProposer}
                      />
                      {flag && PolicyDto.MaximumSumInsured === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Minimum Rate"
                        onChange={handleInput}
                        name="MinimumRate"
                        required
                        error={PolicyDto.MinimumRate === "" ? flag : null}

                        //   value={PolicyDto.ProposalData.PAN}
                        //   onChange={handleSetProposer}
                      />
                      {flag && PolicyDto.MinimumRate === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Minimum Premium"
                        onChange={handleInput}
                        name="MinimumPremium"
                        required
                        error={PolicyDto.MinimumPremium === "" ? flag : null}

                        //   name="PAN"
                        //   value={PolicyDto.ProposalData.PAN}
                        //   onChange={handleSetProposer}
                      />
                      {flag && PolicyDto.MinimumPremium === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Markup%"
                        onChange={handleInput}
                        name="Markup"
                        required
                        //   name="PAN"
                        //   value={PolicyDto.ProposalData.PAN}
                        //   onChange={handleSetProposer}
                        error={PolicyDto.Markup === "" ? flag : null}
                      />
                      {flag && PolicyDto.Markup === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Stack direction="row" spacing={2}>
                        <MDTypography sx={{ color: "#000000", fontSize: "15px" }}>
                          Display Premium *
                        </MDTypography>
                        <RadioGroup row>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </Stack>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Excess"
                          onChange={handleInput}
                          name="Excess"
                          required
                          error={PolicyDto.Excess === "" ? flag : null}
                          //   name="PAN"
                          //   value={PolicyDto.ProposalData.PAN}
                          //   onChange={handleSetProposer}
                        />
                        {flag && PolicyDto.Excess === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                      </Grid> */}
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        type="number"
                        pattern="[0-9]*"
                        label="Back Date"
                        onChange={handleInput}
                        name="BackDate"
                        value={PolicyDto.BackDate}
                        error={PolicyDto.BackDate === "" ? flag : null}
                        //   name="PAN"
                        //   value={PolicyDto.ProposalData.PAN}
                        //   onChange={handleSetProposer}
                      />
                      {flag && PolicyDto.BackDate === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        ) : null}
        {displayflag2 === false ? (
          <Grid container spacing={1} m={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="User Name"
                name="UserName"
                disabled
                value={PolicyDto.UserName}
                // onChange={handleInput}
                error={PolicyDto.UserName === "" ? flag : null}
              />
              {flag && PolicyDto.UserName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                disabled
                id="BranchName"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={PolicyDto.BranchName}
                options={["Branch1", "Branch2", "Branch3"]}
                // onChange={(e, value) => handleSetAutoComplete(e, "BranchName", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Branch Name"
                    disabled
                    error={PolicyDto.BranchName === "" ? flag : null}
                  />
                )}
              />
              {flag && PolicyDto.BranchName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Agent Code/Name"
                name="AgentCode"
                value={PolicyDto.AgentCode}
                // onChange={handleInput}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Branch Code/Name"
                sx={{ width: "240px" }}
                value={PolicyDto.BranchCode}
                disabled
                //   name="PAN"
                //   value={PolicyDto.ProposalData.PAN}
                //   onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Profile Number"
                // sx={{ width: "240px" }}
                value={PolicyDto.ProfileNumber}
                disabled
                //   name="PAN"
                //   value={PolicyDto.ProposalData.PAN}
                //   onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={Profiletypes}
                disableCloseOnSelect
                disableClearable
                getOptionLabel={(option) => option.mValue}
                // value={PolicyDto?.ProfileType}
                // value={PolicyDto?.ProfileType?.map((x) => x.mValue)}
                value={selectedProfile.map((mValue) =>
                  Profiletypes.find((option) => option.mValue === mValue)
                )}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                onChange={(e, v) => handleSetProfile(e, v)}
                renderOption={(props, option, { selected }) => {
                  console.log("selected", selected);
                  return (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.mValue}
                    </li>
                  );
                }}
                // style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Profile Type"
                    placeholder="Select the Profile Type"
                  />
                )}
              />
              {/* {flag && PolicyDto.BranchName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid ml={4} m="10px">
              {/* <MDButton onClick={callFetchprofile}>Search</MDButton> */}
              <MDButton onClick={handleprofiletypes}>Search</MDButton>
            </Grid>
          </Grid>
        ) : null}
        {displayflag === false ? (
          <Grid container direction="row " ml={-10}>
            <Grid item md={12} lg={12} xl={12} xxl={12} ml={12}>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Type Of Policy
                  </MDTypography>
                  {flag && PolicyDto.TypeOfPolicy.length <= 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", ml: "10px" }}>
                      Please select type of policy{" "}
                    </MDTypography>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
                      <Checkbox value="all" onChange={handleChange} checked={isAllSelected} />
                      <span> Select All</span>
                    </Grid>
                    {listItem}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Mode of Transit
                  </MDTypography>
                  <Alert severity="info" sx={{ ml: "23px", mt: "-14px" }}>
                    Please select atleast one mode of transit under each selected Type Of Policy
                  </Alert>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    {PolicyDto.TypeOfPolicy.map((x) => (
                      <>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                          <MDTypography variant="h6">{x}</MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <Grid container spacing={1.5}>
                            {/* {selected2.forEach((rowq, jj) => {
                                if (rowq.mID === x) {
                                  console.log(jj, rowq.mID, x, "index111111");
                                  // setindexing(jj);
                                } else console.log(rowq.mID, x, "index111111no");
                              })} */}

                            {x === "Marine Specific Voyage Inland" ||
                            x === "Marine Specifc Voyage Duty"
                              ? options1.map((option) => (
                                  <Grid
                                    sm={12}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    xxl={4}
                                    sx={{ fontSize: "15px" }}
                                  >
                                    <div key={option}>
                                      <Checkbox
                                        value={option}
                                        onChange={(e, value) => handleChange1(e, option, x, value)}
                                        // checked={handlemodeoftransit(x, option)}
                                        checked={handlemodeoftransitAutoSelect(option, x)}
                                        // checked={selected2[i].mvalue.includes(option)}
                                      />
                                      <span>{option}</span>
                                    </div>
                                  </Grid>
                                ))
                              : options5.map((option) => (
                                  <Grid
                                    sm={12}
                                    md={4}
                                    lg={4}
                                    xl={4}
                                    xxl={4}
                                    sx={{ fontSize: "15px" }}
                                  >
                                    <div key={option}>
                                      <Checkbox
                                        value={option}
                                        onChange={(e, value) => handleChange1(e, option, x, value)}
                                        // checked={handlemodeoftransit(x, option)}
                                        checked={handlemodeoftransitAutoSelect(option, x)}

                                        // checked={selected2[i].mvalue.includes(option)}
                                      />
                                      <span>{option}</span>
                                    </div>
                                  </Grid>
                                ))}
                          </Grid>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Cargo Type
                  </MDTypography>
                  {flag && all.length <= 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", ml: "10px" }}>
                      Please select Cargo type{" "}
                    </MDTypography>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {/* <Autocomplete
                          multiple
                          limitTags={5}
                          id="checkboxes-tags-demo"
                          options={CargoTypee}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.mValue}
                          value={all}
                          // defaultValue={all}
                          renderOption={(props, option) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={handelAutoSelect(option, "CargoType")}
                                onChange={(e, value) =>
                                  handleselectall(e, "CargoType", value, option)
                                }
                              />
                              {option.mValue}
                            </li>
                          )}
                          fullWidth
                          renderInput={(params) => (
                            <TextField {...params} label="CargoType" placeholder="Select" />
                          )}
                        /> */}
                      <Autocomplete
                        multiple
                        limitTags={5}
                        id="checkboxes-tags-demo"
                        options={CargoTypee}
                        disableCloseOnSelect
                        value={all}
                        fullWidth
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handleselectall1(e, "CargoType", value)}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={handelAutoSelect(option, "CargoType")}
                            />
                            {option.mValue}
                          </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="CargoType"
                            placeholder="Select"
                            required
                            error={flag && all.length <= 0 ? flag : null}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Basis of Valuation
                  </MDTypography>
                  {flag && PolicyDto.BasisOfValuation.length <= 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", ml: "10px" }}>
                      Please select Basis of Valuation{" "}
                    </MDTypography>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Grid container spacing={1.5}>
                        <Grid sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
                          <Checkbox value="all" onChange={handleChange2} checked={isAllSelected2} />
                          <span> Select All</span>
                        </Grid>
                        {listItem2}
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    From Country
                  </MDTypography>
                  {flag && all1.length <= 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", ml: "10px" }}>
                      Please select From Country{" "}
                    </MDTypography>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      {/* <Autocomplete
                          multiple
                          limitTags={5}
                          id="checkboxes-tags-demo"
                          options={Country1}
                          // disableCloseOnSelect
                          getOptionLabel={(option) => option.mValue}
                          value={all1}
                          renderOption={(props, option) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={handelAutoSelect(option, "FromCountry")}
                                onChange={(e, value) =>
                                  handleselectall(e, "FromCountry", value, option)
                                }
                              />
                              {option.mValue}
                            </li>
                          )}
                          // style={{ width: 500 }}
                          fullWidth
                          renderInput={(params) => (
                            <TextField {...params} label="FromCountry" placeholder="Select" />
                          )}
                        /> */}
                      <Autocomplete
                        freeSolo
                        multiple
                        limitTags={5}
                        id="checkboxes-tags-demo"
                        options={Country}
                        disableCloseOnSelect
                        value={all1}
                        fullWidth
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handleselectall2(e, "FromCountry", value)}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={handelAutoSelect(option, "FromCountry")}
                            />
                            {option.mValue}
                          </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="FromCountry"
                            placeholder="Select"
                            required
                            error={flag && all1.length <= 0 ? flag : null}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    To Country
                  </MDTypography>
                  {flag && all2.length <= 0 ? (
                    <MDTypography sx={{ color: "red", fontSize: "15px", ml: "10px" }}>
                      Please select To Country{" "}
                    </MDTypography>
                  ) : null}
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      {/* <Autocomplete
                          multiple
                          id="checkboxes-tags-demo"
                          limitTags={5}
                          options={Country1}
                          // disableCloseOnSelect
                          getOptionLabel={(option) => option.mValue}
                          value={all2}
                          renderOption={(props, option) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                id="AutoCheck1"
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={handelAutoSelect(option, "ToCountry")}
                                onChange={(e, value) =>
                                  handleselectall(e, "ToCountry", value, option)
                                }
                              />
                              {option.mValue}
                            </li>
                          )}
                          // style={{ width: 500 }}
                          fullwidth
                          renderInput={(params) => (
                            <TextField {...params} label="ToCountry" placeholder="Select" />
                          )}
                        /> */}
                      <Autocomplete
                        multiple
                        limitTags={5}
                        id="checkboxes-tags-demo"
                        options={Country}
                        // options={CargoTypee}
                        disableCloseOnSelect
                        value={all2}
                        fullWidth
                        getOptionLabel={(option) => option.mValue}
                        onChange={(e, value) => handleselectall(e, "ToCountry", value)}
                        renderOption={(props, option) => (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={handelAutoSelect(option, "ToCountry")}
                            />
                            {option.mValue}
                          </li>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="ToCountry"
                            placeholder="Select"
                            required
                            error={flag && all2.length <= 0 ? flag : null}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Risk
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ fontSize: "15px" }}>
                      <Checkbox value="all" onChange={handleChange3} checked={isAllSelected3} />
                      <span> Select All</span>
                    </Grid>
                    {listItem3}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <MDTypography variant="h6" color="primary">
                    Additional Condition
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDInput
                        label="Enter the Text Here"
                        name="AdditionalCondition"
                        onChange={handleInput}
                        value={PolicyDto.AdditionalCondition}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h6" color="primary">
                        Clauses
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {selected2.map((row1) => (
                        <Grid container>
                          {row1.mvalue.map((row2) => (
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              xxl={12}
                              sx={{ fontSize: "15px", mt: "3px", mr: "10px" }}
                            >
                              {/* <MDTypography>
                                  {row2}
                                  {row1.mID}
                                </MDTypography> */}
                              {handleClause(
                                PolicyDto,
                                ImportAir,
                                ImportAirc,
                                ImportSea,
                                ImportSeac,
                                ImportRail,
                                ImportRailc,
                                ImportPost,
                                ImportPostc,
                                InlandAir,
                                InlandAirc,
                                InlandSea,
                                InlandSeac,
                                InlandAirt,
                                setInlandAirt,
                                inpo16,
                                setinpo16,
                                allair,
                                setallair,
                                allair2,
                                setallair2,
                                allair12,
                                setallair12,
                                allair3,
                                setallair3,
                                allair4,
                                setallair4,
                                allair5,
                                setallair5,
                                allair13,
                                setallair13,
                                allsea,
                                setallsea,
                                allsea1,
                                setallsea1,
                                allsea2,
                                setallsea2,
                                allsea6,
                                setallsea6,
                                allsea3,
                                setallsea3,
                                allsea4,
                                setallsea4,
                                allsea15,
                                setallsea15,
                                allsea7,
                                setallsea7,
                                allair14,
                                setallair14,
                                allair15,
                                setallair15,
                                allair17,
                                setallair17,
                                allair19,
                                setallair19,
                                allair21,
                                setallair21,
                                allair8,
                                setallair8,
                                allair16,
                                setallair16,
                                allair18,
                                setallair18,
                                allair20,
                                setallair20,
                                allair22,
                                setallair22,
                                allair23,
                                setallair23,
                                allair24,
                                setallair24,
                                allair25,
                                setallair25,
                                allair26,
                                setallair26,
                                allair27,
                                setallair27,
                                expo1,
                                setexpo1,
                                expo2,
                                setexpo2,
                                expo3,
                                setexpo3,
                                expo4,
                                setexpo4,
                                expo5,
                                setexpo5,
                                expo6,
                                setexpo6,
                                expo7,
                                setexpo7,
                                expo8,
                                setexpo8,
                                expo9,
                                setexpo9,
                                expo10,
                                setexpo10,
                                expo11,
                                setexpo11,
                                expo12,
                                setexpo12,
                                expo13,
                                setexpo13,
                                expo14,
                                setexpo14,
                                expo15,
                                setexpo15,
                                impo1,
                                setimpo1,
                                impo2,
                                setimpo2,
                                impo3,
                                setimpo3,
                                impo4,
                                setimpo4,
                                impo5,
                                setimpo5,
                                impo6,
                                setimpo6,
                                impo7,
                                setimpo7,
                                impo8,
                                setimpo8,
                                impo9,
                                setimpo9,
                                impo10,
                                setimpo10,
                                impo11,
                                setimpo11,
                                impo12,
                                setimpo12,
                                impo13,
                                setimpo13,
                                impo14,
                                setimpo14,
                                impo15,
                                setimpo15,
                                inpo1,
                                setinpo1,
                                inpo2,
                                setinpo2,
                                inpo3,
                                setinpo3,
                                inpo4,
                                setinpo4,
                                inpo5,
                                setinpo5,
                                inpo6,
                                setinpo6,
                                inpo7,
                                setinpo7,
                                inpo8,
                                setinpo8,
                                inpo9,
                                setinpo9,
                                inpo10,
                                setinpo10,
                                inpo11,
                                setinpo11,
                                inpo12,
                                setinpo12,
                                inpo13,
                                setinpo13,
                                inpo14,
                                setinpo14,
                                inpo15,
                                setinpo15,
                                allair7,
                                setallair7,
                                inpo17,
                                setinpo17,
                                allair9,
                                setallair9,
                                allair10,
                                setallair10,
                                allair28,
                                setallair28,
                                checked1,
                                setChecked,
                                checked2,
                                setChecked1,
                                inst1,
                                setinst1,
                                inst2,
                                setinst2,
                                inst3,
                                setinst3,
                                inst4,
                                setinst4,
                                inst5,
                                setinst5,
                                inst6,
                                setinst6,
                                setPolicyDto,
                                row1.mID,
                                row2,
                                selected2
                              )}
                            </Grid>
                          ))}
                        </Grid>
                      ))}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h6" color="primary">
                        SI & Premium Validations
                      </MDTypography>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDInput
                          label="Enter the Text Here"
                          name="SpecialConditionExclusion"
                          onChange={handleInput}
                          value={PolicyDto.SpecialConditionExclusion}
                        />
                      </Grid> */}

                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Maximum Sum Insured"
                        onChange={handleInput}
                        name="MaximumSumInsured"
                        required
                        value={PolicyDto.MaximumSumInsured}
                        error={PolicyDto.MaximumSumInsured === "" ? flag : null}
                      />
                      {flag && PolicyDto.MaximumSumInsured === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Minimum Rate"
                        onChange={handleInput}
                        name="MinimumRate"
                        required
                        error={PolicyDto.MinimumRate === "" ? flag : null}
                        value={PolicyDto.MinimumRate}
                      />
                      {flag && PolicyDto.MinimumRate === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Minimum Premium"
                        onChange={handleInput}
                        name="MinimumPremium"
                        required
                        error={PolicyDto.MinimumPremium === "" ? flag : null}
                        value={PolicyDto.MinimumPremium}
                      />
                      {flag && PolicyDto.MinimumPremium === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                      <MDInput
                        label="Markup%"
                        onChange={handleInput}
                        name="Markup"
                        required
                        value={PolicyDto.Markup}
                        error={PolicyDto.Markup === "" ? flag : null}
                      />
                      {flag && PolicyDto.Markup === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Stack direction="row" spacing={2}>
                        <MDTypography sx={{ color: "#000000", fontSize: "15px" }}>
                          Display Premium *
                        </MDTypography>
                        <RadioGroup row>
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </Stack>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        <MDInput
                          label="Excess"
                          onChange={handleInput}
                          name="Excess"
                          required
                          error={PolicyDto.Excess === "" ? flag : null}
                          value={PolicyDto.Excess}
                        />
                        {flag && PolicyDto.Excess === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                            Please fill this Field
                          </MDTypography>
                        ) : null}
                      </Grid> */}
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <MDInput
                        type="number"
                        pattern="[0-9]*"
                        label="Back Date"
                        onChange={handleInput}
                        name="BackDate"
                        value={PolicyDto.BackDate}
                        error={PolicyDto.BackDate === "" ? flag : null}
                      />
                      {flag && PolicyDto.BackDate === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                          Please fill this Field
                        </MDTypography>
                      ) : null}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        ) : // </Grid>
        null}
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {updateflag === true && (
            <MDButton alignContent="end" onClick={callSaveprofile1}>
              Update Profile
            </MDButton>
          )}
          {createProfile === true && (
            <MDButton alignContent="end" onClick={callCustomProfile}>
              Create Profile
            </MDButton>
          )}
        </Grid>
      </Card>
    </MDBox>
  );
}

export default IMDProfileCreation;
